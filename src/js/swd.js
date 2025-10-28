/**
 * SenangWebs Deck (SWD) - Main Entry Point
 * @module swd
 */

import EventEmitter from './core/events.js';
import { DefaultConfig, mergeConfig } from './core/config.js';
import Parser from './core/parser.js';
import Renderer from './core/renderer.js';
import Navigation from './core/navigation.js';
import '../css/swd.css';

/**
 * Main SWD Class - Primary API interface
 */
class SWD extends EventEmitter {
  /**
   * Create a new presentation
   * @param {string|HTMLElement} container - Container selector or element
   * @param {Object} options - Configuration options
   */
  constructor(container, options = {}) {
    super();

    // Resolve container
    this.container =
      typeof container === 'string'
        ? document.querySelector(container)
        : container;

    if (!this.container) {
      throw new Error('SWD: Container element not found');
    }

    // Merge configuration
    this.config = mergeConfig(DefaultConfig, options);

    // Initialize state
    this.state = {
      initialized: false,
      slides: [],
      currentSlide: 0,
      isPlaying: false,
      isFullscreen: false,
      isOverview: false,
    };

    // Initialize components
    this.parser = null;
    this.renderer = null;
    this.navigation = null;

    // Auto-initialize if configured
    if (this.config.autoInit !== false) {
      this.init();
    }
  }

  /**
   * Initialize the presentation
   */
  async init() {
    if (this.state.initialized) {
      console.warn('SWD: Presentation already initialized');
      return;
    }

    try {
      this.emit('beforeInit', this);

      // Parse content
      this.parser = new Parser(this.config);
      this.state.slides = await this.parser.parse(
        this.config.source,
        this.container
      );

      // Initialize renderer
      this.renderer = new Renderer(this.config);
      this.renderer.render(this.container, this.state.slides);

      // Initialize navigation
      this.navigation = new Navigation(this, this.config);
      this.navigation.init();

      // Mark as initialized
      this.state.initialized = true;

      this.emit('afterInit', this);
      this.emit('ready', this);

      if (this.config.dev) {
        console.log('SWD: Presentation initialized successfully');
      }
    } catch (error) {
      this.emit('error', error);
      throw error;
    }
  }

  /**
   * Navigate to next slide
   */
  next() {
    if (!this.state.initialized) return;
    this.navigation.next();
  }

  /**
   * Navigate to previous slide
   */
  prev() {
    if (!this.state.initialized) return;
    this.navigation.prev();
  }

  /**
   * Go to specific slide
   * @param {number} index - Slide index
   */
  goTo(index) {
    if (!this.state.initialized) return;
    this.navigation.goTo(index);
  }

  /**
   * Go to first slide
   */
  goToFirst() {
    this.goTo(0);
  }

  /**
   * Go to last slide
   */
  goToLast() {
    this.goTo(this.state.slides.length - 1);
  }

  /**
   * Start auto-play mode
   */
  start() {
    if (!this.state.initialized) return;
    this.navigation.startAutoPlay();
  }

  /**
   * Stop auto-play mode
   */
  stop() {
    if (!this.state.initialized) return;
    this.navigation.stopAutoPlay();
  }

  /**
   * Toggle fullscreen mode
   */
  toggleFullscreen() {
    // Implementation will be added in fullscreen utility
    this.emit('toggleFullscreen');
  }

  /**
   * Toggle overview mode
   */
  toggleOverview() {
    // Implementation will be added in overview utility
    this.emit('toggleOverview');
  }

  /**
   * Destroy the presentation and cleanup
   */
  destroy() {
    if (!this.state.initialized) return;

    this.emit('beforeDestroy', this);

    // Cleanup navigation
    if (this.navigation) {
      this.navigation.destroy();
    }

    // Cleanup renderer
    if (this.renderer) {
      this.renderer.destroy();
    }

    // Clear container
    this.container.innerHTML = '';

    // Reset state
    this.state = {
      initialized: false,
      slides: [],
      currentSlide: 0,
      isPlaying: false,
      isFullscreen: false,
      isOverview: false,
    };

    // Remove all event listeners
    this.offAll();

    this.emit('afterDestroy');

    if (this.config.dev) {
      console.log('SWD: Presentation destroyed');
    }
  }

  /**
   * Get current slide index
   * @returns {number}
   */
  getCurrentSlide() {
    return this.state.currentSlide;
  }

  /**
   * Get total number of slides
   * @returns {number}
   */
  getTotalSlides() {
    return this.state.slides.length;
  }

  /**
   * Get presentation state
   * @returns {Object}
   */
  getState() {
    return { ...this.state };
  }

  /**
   * Auto-initialize all presentations on page
   * @param {string} selector - Container selector (default: '[data-swd]')
   * @param {Object} options - Default options for all presentations
   */
  static autoInit(selector = '[data-swd]', options = {}) {
    const containers = document.querySelectorAll(selector);
    const instances = [];

    containers.forEach((container) => {
      const instance = new SWD(container, options);
      instances.push(instance);
    });

    return instances;
  }
}

// Export for use in browser and modules
if (typeof window !== 'undefined') {
  window.SWD = SWD;
}

export default SWD;
