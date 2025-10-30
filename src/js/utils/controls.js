/**
 * Controls - Navigation controls UI
 * @module utils/controls
 */

/**
 * Controls class - Renders and manages navigation arrows
 */
class Controls {
  constructor(presentation, config = {}) {
    this.presentation = presentation;
    this.config = config;
    this.controlsElement = null;
  }

  /**
   * Initialize controls
   */
  init() {
    if (this.config.controls === false) {
      return;
    }

    this.render();
    this.attachEventListeners();
  }

  /**
   * Render controls UI
   */
  render() {
    const { wrapper } = this.presentation;
    if (!wrapper) return;

    // Create controls container
    this.controlsElement = document.createElement('div');
    this.controlsElement.className = 'swd-controls';

    // Get position from config
    const position = this.config.controlsPosition || 'bottom-right';
    this.controlsElement.setAttribute('data-position', position);

    // Create prev button
    const prevButton = document.createElement('button');
    prevButton.className = 'swd-control-prev';
    prevButton.setAttribute('aria-label', 'Previous slide');
    prevButton.innerHTML = `
      <svg viewBox="0 0 24 24" width="24" height="24">
        <path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
      </svg>
    `;

    // Create next button
    const nextButton = document.createElement('button');
    nextButton.className = 'swd-control-next';
    nextButton.setAttribute('aria-label', 'Next slide');
    nextButton.innerHTML = `
      <svg viewBox="0 0 24 24" width="24" height="24">
        <path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
      </svg>
    `;

    // Append buttons to controls
    this.controlsElement.appendChild(prevButton);
    this.controlsElement.appendChild(nextButton);

    // Append to wrapper
    wrapper.appendChild(this.controlsElement);
  }

  /**
   * Attach event listeners to control buttons
   */
  attachEventListeners() {
    if (!this.controlsElement) return;

    const prevButton = this.controlsElement.querySelector('.swd-control-prev');
    const nextButton = this.controlsElement.querySelector('.swd-control-next');

    if (prevButton) {
      prevButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.presentation.prev();
      });
    }

    if (nextButton) {
      nextButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.presentation.next();
      });
    }

    // Update button states on slide change
    this.presentation.on('afterSlideChange', () => {
      this.updateButtonStates();
    });

    // Initial update
    this.updateButtonStates();
  }

  /**
   * Update button states based on current slide
   */
  updateButtonStates() {
    if (!this.controlsElement) return;

    const { currentSlide, slides } = this.presentation.state;
    const prevButton = this.controlsElement.querySelector('.swd-control-prev');
    const nextButton = this.controlsElement.querySelector('.swd-control-next');

    // Disable/enable buttons based on position and loop setting
    if (!this.config.loop) {
      if (prevButton) {
        prevButton.disabled = currentSlide === 0;
        prevButton.setAttribute('aria-disabled', currentSlide === 0);
      }
      if (nextButton) {
        nextButton.disabled = currentSlide === slides.length - 1;
        nextButton.setAttribute('aria-disabled', currentSlide === slides.length - 1);
      }
    } else {
      // Enable all buttons when looping
      if (prevButton) {
        prevButton.disabled = false;
        prevButton.setAttribute('aria-disabled', 'false');
      }
      if (nextButton) {
        nextButton.disabled = false;
        nextButton.setAttribute('aria-disabled', 'false');
      }
    }
  }

  /**
   * Show controls
   */
  show() {
    if (this.controlsElement) {
      this.controlsElement.classList.remove('swd-controls-hidden');
    }
  }

  /**
   * Hide controls
   */
  hide() {
    if (this.controlsElement) {
      this.controlsElement.classList.add('swd-controls-hidden');
    }
  }

  /**
   * Cleanup
   */
  destroy() {
    if (this.controlsElement && this.controlsElement.parentNode) {
      this.controlsElement.parentNode.removeChild(this.controlsElement);
    }
    this.controlsElement = null;
  }
}

export default Controls;
