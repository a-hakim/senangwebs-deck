/**
 * SenangWebs Deck - Transitions Utility
 * Handles slide transition animations
 */

/**
 * Available transition types
 */
export const TransitionTypes = {
  NONE: 'none',
  SLIDE: 'slide',
  FADE: 'fade',
  ZOOM: 'zoom',
  FLIP: 'flip',
};

/**
 * Transition speeds in milliseconds
 */
export const TransitionSpeeds = {
  SLOW: 800,
  NORMAL: 500,
  FAST: 300,
};

/**
 * Transition Utility Class
 */
export default class Transitions {
  constructor(presentation, config) {
    this.presentation = presentation;
    this.config = config;
    this.isTransitioning = false;
    this.currentTransition = config.transition || TransitionTypes.SLIDE;
    this.transitionSpeed = config.transitionSpeed || TransitionSpeeds.NORMAL;
  }

  /**
   * Initialize transitions
   */
  init() {
    // Add transition classes to wrapper
    const { wrapper } = this.presentation;
    if (wrapper) {
      wrapper.classList.add('swd-transitions-enabled');
      wrapper.setAttribute('data-transition', this.currentTransition);
      wrapper.setAttribute('data-transition-speed', this.getSpeedClass());
    }
  }

  /**
   * Get speed class based on transition speed
   */
  getSpeedClass() {
    if (this.transitionSpeed <= TransitionSpeeds.FAST) return 'fast';
    if (this.transitionSpeed >= TransitionSpeeds.SLOW) return 'slow';
    return 'normal';
  }

  /**
   * Apply transition between slides
   * @param {HTMLElement} oldSlide - Previous slide element
   * @param {HTMLElement} newSlide - New slide element
   * @param {string} direction - 'forward' or 'backward'
   * @returns {Promise} Resolves when transition completes
   */
  async applyTransition(oldSlide, newSlide, direction = 'forward') {
    if (this.isTransitioning) {
      return Promise.resolve();
    }

    // No transition if type is 'none'
    if (this.currentTransition === TransitionTypes.NONE) {
      return this.noTransition(oldSlide, newSlide);
    }

    this.isTransitioning = true;
    this.presentation.emit('transitionStart', { oldSlide, newSlide, direction });

    try {
      // Apply transition based on type
      switch (this.currentTransition) {
        case TransitionTypes.SLIDE:
          await this.slideTransition(oldSlide, newSlide, direction);
          break;
        case TransitionTypes.FADE:
          await this.fadeTransition(oldSlide, newSlide);
          break;
        case TransitionTypes.ZOOM:
          await this.zoomTransition(oldSlide, newSlide, direction);
          break;
        case TransitionTypes.FLIP:
          await this.flipTransition(oldSlide, newSlide, direction);
          break;
        default:
          await this.slideTransition(oldSlide, newSlide, direction);
      }

      this.presentation.emit('transitionEnd', { oldSlide, newSlide, direction });
    } finally {
      this.isTransitioning = false;
    }

    return Promise.resolve();
  }

  /**
   * No transition - instant swap
   */
  noTransition(oldSlide, newSlide) {
    if (oldSlide) {
      oldSlide.classList.remove('swd-slide-active');
      oldSlide.classList.add('swd-slide-hidden');
    }

    if (newSlide) {
      newSlide.classList.remove('swd-slide-hidden');
      newSlide.classList.add('swd-slide-active');
    }

    return Promise.resolve();
  }

  /**
   * Slide transition
   */
  slideTransition(oldSlide, newSlide, direction) {
    return new Promise((resolve) => {
      const directionClass = direction === 'forward' ? 'slide-left' : 'slide-right';

      // Set initial states
      if (oldSlide) {
        oldSlide.classList.add('swd-transition-out', directionClass);
      }

      if (newSlide) {
        newSlide.classList.remove('swd-slide-hidden');
        newSlide.classList.add('swd-transition-in', directionClass);
      }

      // Wait for animation to complete
      setTimeout(() => {
        // Cleanup old slide
        if (oldSlide) {
          oldSlide.classList.remove('swd-slide-active', 'swd-transition-out', directionClass);
          oldSlide.classList.add('swd-slide-hidden');
        }

        // Activate new slide
        if (newSlide) {
          newSlide.classList.remove('swd-transition-in', directionClass);
          newSlide.classList.add('swd-slide-active');
        }

        resolve();
      }, this.transitionSpeed);
    });
  }

  /**
   * Fade transition
   */
  fadeTransition(oldSlide, newSlide) {
    return new Promise((resolve) => {
      // Set initial states
      if (oldSlide) {
        oldSlide.classList.add('swd-fade-out');
      }

      if (newSlide) {
        newSlide.classList.remove('swd-slide-hidden');
        newSlide.classList.add('swd-fade-in');
      }

      // Wait for animation to complete
      setTimeout(() => {
        // Cleanup old slide
        if (oldSlide) {
          oldSlide.classList.remove('swd-slide-active', 'swd-fade-out');
          oldSlide.classList.add('swd-slide-hidden');
        }

        // Activate new slide
        if (newSlide) {
          newSlide.classList.remove('swd-fade-in');
          newSlide.classList.add('swd-slide-active');
        }

        resolve();
      }, this.transitionSpeed);
    });
  }

  /**
   * Zoom transition
   */
  zoomTransition(oldSlide, newSlide, direction) {
    return new Promise((resolve) => {
      const zoomClass = direction === 'forward' ? 'zoom-in' : 'zoom-out';

      // Set initial states
      if (oldSlide) {
        oldSlide.classList.add('swd-zoom-out');
      }

      if (newSlide) {
        newSlide.classList.remove('swd-slide-hidden');
        newSlide.classList.add(`swd-${zoomClass}`);
      }

      // Wait for animation to complete
      setTimeout(() => {
        // Cleanup old slide
        if (oldSlide) {
          oldSlide.classList.remove('swd-slide-active', 'swd-zoom-out');
          oldSlide.classList.add('swd-slide-hidden');
        }

        // Activate new slide
        if (newSlide) {
          newSlide.classList.remove(`swd-${zoomClass}`);
          newSlide.classList.add('swd-slide-active');
        }

        resolve();
      }, this.transitionSpeed);
    });
  }

  /**
   * Flip transition
   */
  flipTransition(oldSlide, newSlide, direction) {
    return new Promise((resolve) => {
      const flipClass = direction === 'forward' ? 'flip-left' : 'flip-right';

      // Set initial states
      if (oldSlide) {
        oldSlide.classList.add('swd-flip-out', flipClass);
      }

      if (newSlide) {
        newSlide.classList.remove('swd-slide-hidden');
        newSlide.classList.add('swd-flip-in', flipClass);
      }

      // Wait for animation to complete
      setTimeout(() => {
        // Cleanup old slide
        if (oldSlide) {
          oldSlide.classList.remove('swd-slide-active', 'swd-flip-out', flipClass);
          oldSlide.classList.add('swd-slide-hidden');
        }

        // Activate new slide
        if (newSlide) {
          newSlide.classList.remove('swd-flip-in', flipClass);
          newSlide.classList.add('swd-slide-active');
        }

        resolve();
      }, this.transitionSpeed);
    });
  }

  /**
   * Set transition type
   * @param {string} type - Transition type from TransitionTypes
   */
  setTransition(type) {
    if (Object.values(TransitionTypes).includes(type)) {
      this.currentTransition = type;
      const { wrapper } = this.presentation;
      if (wrapper) {
        wrapper.setAttribute('data-transition', type);
      }
      this.presentation.emit('transitionChanged', { type });
    }
  }

  /**
   * Set transition speed
   * @param {number|string} speed - Speed in ms or 'slow'/'normal'/'fast'
   */
  setSpeed(speed) {
    if (typeof speed === 'string') {
      this.transitionSpeed = TransitionSpeeds[speed.toUpperCase()] || TransitionSpeeds.NORMAL;
    } else if (typeof speed === 'number') {
      this.transitionSpeed = speed;
    }

    const { wrapper } = this.presentation;
    if (wrapper) {
      wrapper.setAttribute('data-transition-speed', this.getSpeedClass());
      wrapper.style.setProperty('--swd-transition-speed', `${this.transitionSpeed}ms`);
    }

    this.presentation.emit('transitionSpeedChanged', { speed: this.transitionSpeed });
  }

  /**
   * Get current transition type
   */
  getTransition() {
    return this.currentTransition;
  }

  /**
   * Get current transition speed
   */
  getSpeed() {
    return this.transitionSpeed;
  }

  /**
   * Check if currently transitioning
   */
  isActive() {
    return this.isTransitioning;
  }

  /**
   * Cleanup
   */
  destroy() {
    this.isTransitioning = false;
  }
}
