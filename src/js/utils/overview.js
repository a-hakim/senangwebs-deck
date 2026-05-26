/**
 * Overview - Overview grid mode
 * @module utils/overview
 */
class Overview {
  constructor(presentation, config = {}) {
    this.presentation = presentation;
    this.config = config;
    this.active = false;
    this.boundClick = this.handleClick.bind(this);
  }

  /**
   * Initialize overview mode listener
   */
  init() {
    if (this.config.overview !== false) {
      this.presentation.on('toggleOverview', () => this.toggle());
    }
  }

  /**
   * Toggle overview mode
   */
  toggle() {
    if (this.active) {
      this.deactivate();
    } else {
      this.activate();
    }
  }

  /**
   * Enter overview mode
   */
  activate() {
    if (this.active) return;
    this.active = true;
    this.presentation.state.isOverview = true;

    const { container, wrapper } = this.presentation;
    if (wrapper) {
      wrapper.classList.add('swd-overview-mode');
    }

    // Bind click listener to slides
    const slides = container.querySelectorAll('.swd-slide');
    slides.forEach((slide) => {
      slide.addEventListener('click', this.boundClick);
    });

    this.presentation.emit('enterOverview');
  }

  /**
   * Exit overview mode
   */
  deactivate() {
    if (!this.active) return;
    this.active = false;
    this.presentation.state.isOverview = false;

    const { container, wrapper } = this.presentation;
    if (wrapper) {
      wrapper.classList.remove('swd-overview-mode');
    }

    const slides = container.querySelectorAll('.swd-slide');
    slides.forEach((slide) => {
      slide.removeEventListener('click', this.boundClick);
    });

    this.presentation.emit('exitOverview');
  }

  /**
   * Handle slide click in overview mode
   * @param {Event} event - Click event
   */
  handleClick(event) {
    if (!this.active) return;

    const slideElement = event.currentTarget;
    const index = parseInt(slideElement.getAttribute('data-index'), 10);

    if (!isNaN(index)) {
      event.preventDefault();
      event.stopPropagation();
      this.presentation.goTo(index);
      this.deactivate();
    }
  }

  /**
   * Cleanup
   */
  destroy() {
    this.deactivate();
  }
}

export default Overview;
