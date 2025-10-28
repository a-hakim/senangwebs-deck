/**
 * Fullscreen - Fullscreen mode support
 * @module utils/fullscreen
 */

/**
 * Fullscreen utility class
 */
class Fullscreen {
  constructor(presentation, config = {}) {
    this.presentation = presentation;
    this.config = config;
    this.isFullscreen = false;

    // Bind methods
    this.boundFullscreenChange = this.handleFullscreenChange.bind(this);
  }

  /**
   * Initialize fullscreen support
   */
  init() {
    if (this.config.fullscreen !== false && this.isSupported()) {
      // Listen for fullscreen change events
      document.addEventListener(
        'fullscreenchange',
        this.boundFullscreenChange
      );
      document.addEventListener(
        'webkitfullscreenchange',
        this.boundFullscreenChange
      );
      document.addEventListener(
        'mozfullscreenchange',
        this.boundFullscreenChange
      );
      document.addEventListener(
        'MSFullscreenChange',
        this.boundFullscreenChange
      );
    }
  }

  /**
   * Check if fullscreen is supported
   * @returns {boolean} - True if supported
   */
  isSupported() {
    return !!(
      document.fullscreenEnabled ||
      document.webkitFullscreenEnabled ||
      document.mozFullScreenEnabled ||
      document.msFullscreenEnabled
    );
  }

  /**
   * Check if currently in fullscreen mode
   * @returns {boolean} - True if fullscreen
   */
  isActive() {
    return !!(
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    );
  }

  /**
   * Enter fullscreen mode
   * @returns {Promise} - Fullscreen request promise
   */
  enter() {
    const { container } = this.presentation;

    if (!this.isSupported()) {
      console.warn('Fullscreen API not supported');
      return Promise.reject(new Error('Fullscreen not supported'));
    }

    if (this.isActive()) {
      return Promise.resolve();
    }

    // Request fullscreen using appropriate API
    if (container.requestFullscreen) {
      return container.requestFullscreen();
    }
    if (container.webkitRequestFullscreen) {
      return container.webkitRequestFullscreen();
    }
    if (container.mozRequestFullScreen) {
      return container.mozRequestFullScreen();
    }
    if (container.msRequestFullscreen) {
      return container.msRequestFullscreen();
    }

    return Promise.reject(new Error('Fullscreen method not found'));
  }

  /**
   * Exit fullscreen mode
   * @returns {Promise} - Exit fullscreen promise
   */
  exit() {
    if (!this.isActive()) {
      return Promise.resolve();
    }

    // Exit fullscreen using appropriate API
    if (document.exitFullscreen) {
      return document.exitFullscreen();
    }
    if (document.webkitExitFullscreen) {
      return document.webkitExitFullscreen();
    }
    if (document.mozCancelFullScreen) {
      return document.mozCancelFullScreen();
    }
    if (document.msExitFullscreen) {
      return document.msExitFullscreen();
    }

    return Promise.reject(new Error('Exit fullscreen method not found'));
  }

  /**
   * Toggle fullscreen mode
   * @returns {Promise} - Toggle promise
   */
  toggle() {
    if (this.isActive()) {
      return this.exit();
    }
    return this.enter();
  }

  /**
   * Handle fullscreen change event
   */
  handleFullscreenChange() {
    const wasFullscreen = this.isFullscreen;
    this.isFullscreen = this.isActive();

    // Update presentation state
    this.presentation.state.isFullscreen = this.isFullscreen;

    // Update container class
    if (this.isFullscreen) {
      this.presentation.container.classList.add('swd-fullscreen');
    } else {
      this.presentation.container.classList.remove('swd-fullscreen');
    }

    // Emit events
    if (this.isFullscreen && !wasFullscreen) {
      this.presentation.emit('enterFullscreen');
    } else if (!this.isFullscreen && wasFullscreen) {
      this.presentation.emit('exitFullscreen');
    }

    this.presentation.emit('fullscreenChange', {
      isFullscreen: this.isFullscreen,
    });
  }

  /**
   * Destroy fullscreen handler
   */
  destroy() {
    document.removeEventListener(
      'fullscreenchange',
      this.boundFullscreenChange
    );
    document.removeEventListener(
      'webkitfullscreenchange',
      this.boundFullscreenChange
    );
    document.removeEventListener(
      'mozfullscreenchange',
      this.boundFullscreenChange
    );
    document.removeEventListener(
      'MSFullscreenChange',
      this.boundFullscreenChange
    );

    // Exit fullscreen if active
    if (this.isActive()) {
      this.exit();
    }
  }
}

export default Fullscreen;
