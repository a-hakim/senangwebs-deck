/**
 * Navigation - Slide navigation controller
 * @module core/navigation
 */

import KeyboardHandler from '../utils/keyboard.js';

/**
 * Navigation controller class
 */
class Navigation {
  constructor(presentation, config) {
    this.presentation = presentation;
    this.config = config;
    this.autoPlayInterval = null;
    this.keyboardHandler = null;
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

    // Show first slide
    this.updateSlideDisplay(0);

    // Start auto-play if configured
    if (this.config.autoSlide > 0) {
      this.startAutoPlay();
    }
  }

  /**
   * Navigate to next slide
   */
  next() {
    const { currentSlide } = this.presentation.state;
    const { slides } = this.presentation.state;

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
  goTo(index) {
    const { slides, currentSlide } = this.presentation.state;

    // Validate index
    if (index < 0 || index >= slides.length) {
      return;
    }

    if (index === currentSlide) {
      return;
    }

    // Emit before change event
    this.presentation.emit('beforeSlideChange', {
      from: currentSlide,
      to: index,
    });

    // Update state
    this.presentation.state.currentSlide = index;

    // Update DOM
    this.updateSlideDisplay(index);

    // Emit after change event
    this.presentation.emit('afterSlideChange', {
      from: currentSlide,
      to: index,
    });
  }

  /**
   * Update slide display
   * @param {number} index - Current slide index
   */
  updateSlideDisplay(index) {
    const slides = this.presentation.container.querySelectorAll('.swd-slide');

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
   * Cleanup navigation
   */
  destroy() {
    this.stopAutoPlay();

    // Cleanup keyboard handler
    if (this.keyboardHandler) {
      this.keyboardHandler.destroy();
    }
  }
}

export default Navigation;
