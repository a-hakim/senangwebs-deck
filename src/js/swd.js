/**
 * SenangWebs Deck (SWD) - Main Entry Point
 * @module swd
 */

import EventEmitter from './core/events.js';
import { DefaultConfig, mergeConfig } from './core/config.js';
import Parser from './core/parser.js';
import Renderer from './core/renderer.js';
import Navigation from './core/navigation.js';
import TouchHandler from './utils/touch.js';
import Fullscreen from './utils/fullscreen.js';
import ExportUtil from './utils/export.js';
import Transitions from './utils/transitions.js';
import Controls from './utils/controls.js';
import Progress from './utils/progress.js';
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
    this.touchHandler = null;
    this.fullscreen = null;
    this.exportUtil = null;
    this.transitions = null;
    this.controls = null;
    this.progress = null;

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

      // Store wrapper reference for transitions and other utilities
      this.wrapper = this.container.querySelector('.swd-wrapper');

      // Initialize transitions
      this.transitions = new Transitions(this, this.config);
      this.transitions.init();

      // Initialize navigation
      this.navigation = new Navigation(this, this.config);
      this.navigation.init();

      // Initialize touch handler
      this.touchHandler = new TouchHandler(this, this.config);
      this.touchHandler.init();

      // Initialize fullscreen
      this.fullscreen = new Fullscreen(this, this.config);
      this.fullscreen.init();

      // Initialize controls
      this.controls = new Controls(this, this.config);
      this.controls.init();

      // Initialize progress bar
      this.progress = new Progress(this, this.config);
      this.progress.init();

      // Initialize export utility
      this.exportUtil = new ExportUtil(this, this.config);

      // Mark as initialized
      this.state.initialized = true;

      this.emit('afterInit', this);
      this.emit('ready', this);

      if (this.config.dev) {
        // console.log('SWD: Presentation initialized successfully');
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
    if (!this.state.initialized || !this.fullscreen) return;
    this.fullscreen.toggle();
  }

  /**
   * Enter fullscreen mode
   */
  enterFullscreen() {
    if (!this.state.initialized || !this.fullscreen) return;
    this.fullscreen.enter();
  }

  /**
   * Exit fullscreen mode
   */
  exitFullscreen() {
    if (!this.state.initialized || !this.fullscreen) return;
    this.fullscreen.exit();
  }

  /**
   * Set transition type
   * @param {string} type - Transition type ('none', 'slide', 'fade', 'zoom', 'flip')
   */
  setTransition(type) {
    if (!this.state.initialized || !this.transitions) return;
    this.transitions.setTransition(type);
  }

  /**
   * Set transition speed
   * @param {number|string} speed - Speed in ms or 'slow'/'normal'/'fast'
   */
  setTransitionSpeed(speed) {
    if (!this.state.initialized || !this.transitions) return;
    this.transitions.setSpeed(speed);
  }

  /**
   * Toggle overview mode
   */
  toggleOverview() {
    // Overview mode will be implemented in overview utility
    this.emit('toggleOverview');
  }

  /**
   * Export to PDF
   */
  exportPDF() {
    if (!this.state.initialized || !this.exportUtil) return;
    this.exportUtil.toPDF();
  }

  /**
   * Export to HTML
   */
  exportHTML() {
    if (!this.state.initialized || !this.exportUtil) return;
    this.exportUtil.toHTML();
  }

  /**
   * Export to JSON
   */
  exportJSON() {
    if (!this.state.initialized || !this.exportUtil) return;
    this.exportUtil.toJSON();
  }

  /**
   * Download HTML file
   */
  downloadHTML() {
    if (!this.state.initialized || !this.exportUtil) return;
    this.exportUtil.downloadHTML();
  }

  /**
   * Download JSON file
   */
  downloadJSON() {
    if (!this.state.initialized || !this.exportUtil) return;
    this.exportUtil.downloadJSON();
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

    // Cleanup touch handler
    if (this.touchHandler) {
      this.touchHandler.destroy();
    }

    // Cleanup fullscreen
    if (this.fullscreen) {
      this.fullscreen.destroy();
    }

    // Cleanup controls
    if (this.controls) {
      this.controls.destroy();
    }

    // Cleanup progress bar
    if (this.progress) {
      this.progress.destroy();
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
      // console.log('SWD: Presentation destroyed');
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
   * @param {string} selector - Container selector (default: '[data-swd-id]')
   * @param {Object} options - Default options for all presentations
   */
  static autoInit(selector = '[data-swd-id]', options = {}) {
    const containers = document.querySelectorAll(selector);
    const instances = [];

    containers.forEach((container) => {
      // Read configuration from data attributes
      const dataConfig = SWD.readDataAttributes(container);
      
      // Merge options: defaults < data attributes < passed options
      const config = { ...dataConfig, ...options };
      
      const instance = new SWD(container, config);
      instances.push(instance);
    });

    return instances;
  }

  /**
   * Read configuration from data attributes
   * @param {HTMLElement} element - Element to read attributes from
   * @returns {Object} - Configuration object
   */
  static readDataAttributes(element) {
    const config = {};
    const { dataset } = element;

    // Map data attributes to config properties
    if (dataset.swdTheme) config.theme = dataset.swdTheme;
    if (dataset.swdTransition) config.transition = dataset.swdTransition;
    if (dataset.swdSource) config.source = dataset.swdSource;
    if (dataset.swdMarkdownUrl) config.markdownUrl = dataset.swdMarkdownUrl;
    if (dataset.swdJsonUrl) config.jsonUrl = dataset.swdJsonUrl;
    
    // Boolean attributes
    if (dataset.swdKeyboard) config.keyboard = dataset.swdKeyboard !== 'false';
    if (dataset.swdControl || dataset.swdControls) {
      config.controls = (dataset.swdControl || dataset.swdControls) !== 'false';
    }
    if (dataset.swdProgress) config.progress = dataset.swdProgress !== 'false';
    if (dataset.swdLoop) config.loop = dataset.swdLoop !== 'false';
    if (dataset.swdAutoplay) config.autoplay = dataset.swdAutoplay !== 'false';
    
    // Numeric attributes
    if (dataset.swdAutoplayDelay) {
      config.autoplayDelay = parseInt(dataset.swdAutoplayDelay, 10);
    }
    if (dataset.swdTransitionSpeed) {
      config.transitionSpeed = parseInt(dataset.swdTransitionSpeed, 10);
    }

    return config;
  }
}

// Export for use in browser and modules
if (typeof window !== 'undefined') {
  window.SWD = SWD;
  
  // Auto-initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      SWD.autoInit();
    });
  } else {
    // DOM is already ready
    SWD.autoInit();
  }
}

export default SWD;
