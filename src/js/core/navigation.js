/**
 * Navigation - Slide navigation controller
 * @module core/navigation
 */

import KeyboardHandler from '../utils/keyboard.js';
import Fragments from '../utils/fragments.js';

/**
 * Navigation controller class
 */
class Navigation {
  constructor(presentation, config) {
    this.presentation = presentation;
    this.config = config;
    this.autoPlayInterval = null;
    this.keyboardHandler = null;
    this.isPausedByHover = false;
    this.boundHashChange = null;
    this.boundMouseEnter = null;
    this.boundMouseLeave = null;
    this.fragments = null;
    this.boundWheel = null;
    this.ariaLiveElement = null;
  }

  /**
   * Initialize navigation
   */
  init() {
    // Setup keyboard navigation
    if (this.config.keyboard) {
      this.keyboardHandler = new KeyboardHandler(this.presentation, this.config);
      this.keyboardHandler.init();
    }

    // Setup touch navigation
    if (this.config.touch) {
      this.setupTouch();
    }

    // Setup Fragments
    this.fragments = new Fragments(this.presentation, this.config);

    // Setup Accessibility announcements
    if (this.config.a11y && this.config.a11y.enabled !== false) {
      this.setupA11y();
    }

    // Setup Mouse Wheel scroll
    if (this.config.mouseWheel) {
      this.setupMouseWheel();
    }

    // Setup URL Hash navigation
    if (this.config.hash !== false) {
      this.setupHash();
    }

    // Show first slide
    if (this.presentation.getCurrentSlide() === 0 && window.location.hash) {
      this.readHash();
    } else {
      this.updateSlideDisplay(0);
    }

    // Start auto-play if configured
    if (this.config.autoSlide > 0) {
      this.startAutoPlay();

      // Setup hover pause
      if (this.config.autoSlideStoppable !== false) {
        this.setupHoverPause();
      }
    }
  }

  /**
   * Navigate to next slide
   */
  next() {
    const { currentSlide } = this.presentation.state;
    const { slides } = this.presentation.state;
    const slideElements = this.presentation.container.querySelectorAll('.swd-slide');
    const activeSlideElement = slideElements[currentSlide];

    // Check if we can advance within slide fragments
    if (this.fragments && this.fragments.next(activeSlideElement)) {
      return;
    }

    if (currentSlide < slides.length - 1) {
      this.goTo(currentSlide + 1);
    } else if (this.config.loop) {
      this.goTo(0);
    }
  }

  /**
   * Navigate to previous slide
   */
  prev() {
    const { currentSlide } = this.presentation.state;
    const { slides } = this.presentation.state;
    const slideElements = this.presentation.container.querySelectorAll('.swd-slide');
    const activeSlideElement = slideElements[currentSlide];

    // Check if we can revert slide fragments
    if (this.fragments && this.fragments.prev(activeSlideElement)) {
      return;
    }

    if (currentSlide > 0) {
      this.goTo(currentSlide - 1);
    } else if (this.config.loop) {
      this.goTo(slides.length - 1);
    }
  }

  /**
   * Go to specific slide
   * @param {number} index - Slide index
   */
  async goTo(index) {
    const { slides, currentSlide } = this.presentation.state;

    // Validate index
    if (index < 0 || index >= slides.length) {
      return;
    }

    if (index === currentSlide) {
      return;
    }

    // Don't navigate if currently transitioning
    if (this.presentation.transitions && this.presentation.transitions.isActive()) {
      return;
    }

    // Emit before change event
    this.presentation.emit('beforeSlideChange', {
      from: currentSlide,
      to: index,
    });

    // Update state
    const previousSlide = currentSlide;
    this.presentation.state.currentSlide = index;

    // Update DOM with transitions
    await this.updateSlideDisplay(index, previousSlide);

    // Emit after change event
    this.presentation.emit('afterSlideChange', {
      from: previousSlide,
      to: index,
    });
  }

  /**
   * Update slide display
   * @param {number} index - Current slide index
   * @param {number} previousIndex - Previous slide index
   */
  async updateSlideDisplay(index, previousIndex = -1) {
    const slides = this.presentation.container.querySelectorAll('.swd-slide');
    
    if (slides.length === 0) return;

    const oldSlide = previousIndex >= 0 ? slides[previousIndex] : null;
    const newSlide = slides[index];
    const direction = index > previousIndex ? 'forward' : 'backward';

    // Apply transition if available
    if (this.presentation.transitions && oldSlide) {
      await this.presentation.transitions.applyTransition(oldSlide, newSlide, direction);
    } else {
      // Fallback: simple class toggle without transition
      slides.forEach((slide, i) => {
        if (i === index) {
          slide.classList.add('swd-slide-active');
          slide.classList.remove('swd-slide-hidden');
        } else {
          slide.classList.remove('swd-slide-active');
          slide.classList.add('swd-slide-hidden');
        }
      });
    }

    // Update past/future classes
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add('active');
        slide.classList.remove('past', 'future');
      } else if (i < index) {
        slide.classList.add('past');
        slide.classList.remove('active', 'future');
      } else {
        slide.classList.add('future');
        slide.classList.remove('active', 'past');
      }
    });
  }

  /**
   * Setup keyboard navigation
   */
  setupKeyboard() {
    // Keyboard handling is now done by KeyboardHandler utility
    // This method is kept for backwards compatibility
  }

  /**
   * Setup touch navigation
   */
  setupTouch() {
    // Touch navigation will be implemented in touch utility
  }

  /**
   * Start auto-play
   */
  startAutoPlay() {
    if (this.config.autoSlide <= 0) return;

    this.stopAutoPlay();

    this.autoPlayInterval = setInterval(() => {
      this.next();
    }, this.config.autoSlide);

    this.presentation.state.isPlaying = true;
  }

  /**
   * Stop auto-play
   */
  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
    this.presentation.state.isPlaying = false;
  }

  /**
   * Setup URL Hash navigation
   */
  setupHash() {
    this.boundHashChange = this.handleHashChange.bind(this);
    window.addEventListener('hashchange', this.boundHashChange);

    // Update URL hash on slide changes
    this.presentation.on('afterSlideChange', ({ to }) => {
      if (this.config.hash !== false && !this.presentation.state.isOverview) {
        window.location.hash = `/slide-${to + 1}`;
      }
    });
  }

  /**
   * Parse slide index from URL hash
   */
  readHash() {
    const hash = window.location.hash;
    const match = hash.match(/\/slide-(\d+)/);
    if (match) {
      const index = parseInt(match[1], 10) - 1;
      if (!isNaN(index) && index >= 0 && index < this.presentation.getTotalSlides()) {
        this.goTo(index);
      }
    }
  }

  /**
   * Handle hashchange event
   */
  handleHashChange() {
    this.readHash();
  }

  /**
   * Setup autoplay pause on container hover
   */
  setupHoverPause() {
    const { container } = this.presentation;

    this.boundMouseEnter = () => {
      if (this.presentation.state.isPlaying) {
        this.isPausedByHover = true;
        this.stopAutoPlay();
        // Maintain state as playing, just temporarily suspended
        this.presentation.state.isPlaying = true;
      }
    };

    this.boundMouseLeave = () => {
      if (this.isPausedByHover) {
        this.isPausedByHover = false;
        this.startAutoPlay();
      }
    };

    container.addEventListener('mouseenter', this.boundMouseEnter);
    container.addEventListener('mouseleave', this.boundMouseLeave);
  }

  /**
   * Cleanup navigation
   */
  /**
   * Setup Accessibility live announcements
   */
  setupA11y() {
    this.ariaLiveElement = document.createElement('div');
    this.ariaLiveElement.className = 'swd-aria-live';
    this.ariaLiveElement.setAttribute('aria-live', 'polite');
    this.ariaLiveElement.setAttribute('aria-atomic', 'true');
    this.ariaLiveElement.style.cssText = 'position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); border: 0;';
    
    const { wrapper } = this.presentation;
    if (wrapper) {
      wrapper.appendChild(this.ariaLiveElement);
    }

    this.presentation.on('afterSlideChange', ({ to }) => {
      const isAnnounceEnabled = this.config.a11y && 
        (this.config.a11y === true || this.config.a11y.announceSlideChanges !== false);

      if (isAnnounceEnabled && this.ariaLiveElement) {
        const slides = this.presentation.container.querySelectorAll('.swd-slide');
        const activeSlide = slides[to];
        const heading = activeSlide ? activeSlide.querySelector('h1, h2, h3, h4') : null;
        const headingText = heading ? heading.textContent : '';
        this.ariaLiveElement.textContent = `Slide ${to + 1}. ${headingText}`;
      }
    });
  }

  /**
   * Setup Mouse Wheel navigation
   */
  setupMouseWheel() {
    let lastWheelTime = 0;
    this.boundWheel = (event) => {
      if (this.presentation.state.isOverview) return;

      const now = Date.now();
      if (now - lastWheelTime < 800) return;

      const delta = event.deltaY;
      if (delta > 30) {
        this.next();
        lastWheelTime = now;
      } else if (delta < -30) {
        this.prev();
        lastWheelTime = now;
      }
    };

    this.presentation.container.addEventListener('wheel', this.boundWheel, { passive: true });
  }

  /**
   * Cleanup navigation
   */
  destroy() {
    this.stopAutoPlay();

    // Cleanup keyboard handler
    if (this.keyboardHandler) {
      this.keyboardHandler.destroy();
    }

    // Cleanup hash change event listener
    if (this.boundHashChange) {
      window.removeEventListener('hashchange', this.boundHashChange);
    }

    // Cleanup hover pause listeners
    if (this.boundMouseEnter) {
      const { container } = this.presentation;
      container.removeEventListener('mouseenter', this.boundMouseEnter);
      container.removeEventListener('mouseleave', this.boundMouseLeave);
    }

    // Cleanup Mouse Wheel scroll listener
    if (this.boundWheel) {
      this.presentation.container.removeEventListener('wheel', this.boundWheel);
    }

    // Cleanup Accessibility Live region
    if (this.ariaLiveElement && this.ariaLiveElement.parentNode) {
      this.ariaLiveElement.parentNode.removeChild(this.ariaLiveElement);
    }
  }
}

export default Navigation;
