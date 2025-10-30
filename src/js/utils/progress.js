/**
 * Progress Bar - Visual progress indicator
 * @module utils/progress
 */

/**
 * Progress class - Renders and updates progress bar
 */
class Progress {
  constructor(presentation, config = {}) {
    this.presentation = presentation;
    this.config = config;
    this.progressElement = null;
    this.progressBar = null;
  }

  /**
   * Initialize progress bar
   */
  init() {
    if (this.config.progress === false) {
      return;
    }

    this.render();
    this.attachEventListeners();
  }

  /**
   * Render progress bar UI
   */
  render() {
    const { wrapper } = this.presentation;
    if (!wrapper) return;

    // Create progress container
    this.progressElement = document.createElement('div');
    this.progressElement.className = 'swd-progress';

    // Get position from config
    const position = this.config.progressPosition || 'bottom';
    this.progressElement.setAttribute('data-position', position);

    // Create progress bar
    this.progressBar = document.createElement('div');
    this.progressBar.className = 'swd-progress-bar';
    this.progressBar.setAttribute('role', 'progressbar');
    this.progressBar.setAttribute('aria-valuemin', '0');
    this.progressBar.setAttribute('aria-valuemax', '100');

    // Append bar to container
    this.progressElement.appendChild(this.progressBar);

    // Append to wrapper
    wrapper.appendChild(this.progressElement);

    // Initial update
    this.update();
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    // Update progress on slide change
    this.presentation.on('afterSlideChange', () => {
      this.update();
    });

    // Update on initialization
    this.presentation.on('afterInit', () => {
      this.update();
    });
  }

  /**
   * Update progress bar based on current slide
   */
  update() {
    if (!this.progressBar) return;

    const { currentSlide, slides } = this.presentation.state;
    const totalSlides = slides.length;

    if (totalSlides === 0) return;

    // Calculate progress percentage
    const progress = ((currentSlide + 1) / totalSlides) * 100;

    // Update bar width
    this.progressBar.style.width = `${progress}%`;

    // Update ARIA attributes
    this.progressBar.setAttribute('aria-valuenow', Math.round(progress));
    this.progressBar.setAttribute('aria-valuetext', `Slide ${currentSlide + 1} of ${totalSlides}`);
  }

  /**
   * Show progress bar
   */
  show() {
    if (this.progressElement) {
      this.progressElement.classList.remove('swd-progress-hidden');
    }
  }

  /**
   * Hide progress bar
   */
  hide() {
    if (this.progressElement) {
      this.progressElement.classList.add('swd-progress-hidden');
    }
  }

  /**
   * Set progress manually (0-100)
   * @param {number} percentage - Progress percentage
   */
  setProgress(percentage) {
    if (!this.progressBar) return;

    const clampedProgress = Math.max(0, Math.min(100, percentage));
    this.progressBar.style.width = `${clampedProgress}%`;
    this.progressBar.setAttribute('aria-valuenow', Math.round(clampedProgress));
  }

  /**
   * Cleanup
   */
  destroy() {
    if (this.progressElement && this.progressElement.parentNode) {
      this.progressElement.parentNode.removeChild(this.progressElement);
    }
    this.progressElement = null;
    this.progressBar = null;
  }
}

export default Progress;
