/**
 * Configuration System - Default settings and config management
 * @module core/config
 */

/**
 * Default configuration for SWD presentations
 */
export const DefaultConfig = {
  // Source type: 'html', 'markdown', 'json'
  source: 'html',

  // Data for JSON source
  data: null,

  // Markdown URL for external loading
  markdownUrl: null,

  // JSON URL for external loading
  jsonUrl: null,

  // Theme
  theme: 'light',

  // Slide transition
  transition: 'slide', // 'slide', 'fade', 'zoom', 'flip', 'none'

  // Transition speed
  transitionSpeed: 'normal', // 'fast', 'normal', 'slow'

  // Slide aspect ratio
  aspectRatio: '16:9', // '16:9', '4:3', '16:10'

  // Auto-slide interval (ms, 0 = disabled)
  autoSlide: 0,

  // Pause auto-slide on hover
  autoSlideStoppable: true,

  // Loop slides
  loop: false,

  // Enable keyboard navigation
  keyboard: true,

  // Enable touch/swipe navigation
  touch: true,

  // Enable mouse wheel navigation
  mouseWheel: false,

  // Show navigation controls
  controls: true,

  // Control arrow position
  controlsPosition: 'bottom-right', // 'bottom-right', 'bottom-left', 'edges'

  // Show progress bar
  progress: true,

  // Progress bar position
  progressPosition: 'bottom', // 'top', 'bottom'

  // Show slide numbers
  slideNumbers: true,

  // Slide number format
  slideNumberFormat: 'h/v', // 'h/v', 'h.v', 'c/t', 'c'

  // Enable overview mode
  overview: true,

  // Enable fullscreen
  fullscreen: true,

  // Enable URL hash navigation
  hash: true,

  // Enable history API
  history: false,

  // RTL mode
  rtl: false,

  // Fragment animations
  fragments: true,

  // Fragment animation style
  fragmentStyle: 'fade-in', // 'fade-in', 'slide-in', 'zoom-in'

  // Parallax background
  parallax: false,

  // Auto-initialize
  autoInit: true,

  // Plugins
  plugins: [],

  // Custom keyboard shortcuts
  keyboardShortcuts: {},

  // Accessibility
  a11y: {
    enabled: true,
    announceSlideChanges: true,
    focusVisible: true,
  },

  // Export options
  export: {
    pdf: true,
    html: true,
    json: true,
  },

  // Development mode
  dev: false,
};

/**
 * Validate configuration values
 * @param {Object} config - Configuration object
 * @throws {Error} - If configuration is invalid
 */
export function validateConfig(config) {
  if (!config || typeof config !== 'object') {
    throw new Error('Configuration must be an object');
  }

  // Validate source type
  if (config.source && !['html', 'markdown', 'json'].includes(config.source)) {
    throw new Error(
      'Invalid source type. Must be "html", "markdown", or "json"'
    );
  }

  // Validate transition
  const validTransitions = ['slide', 'fade', 'zoom', 'flip', 'none'];
  if (config.transition && !validTransitions.includes(config.transition)) {
    throw new Error(
      `Invalid transition. Must be one of: ${validTransitions.join(', ')}`
    );
  }

  // Validate transition speed
  const validSpeeds = ['fast', 'normal', 'slow'];
  if (config.transitionSpeed && !validSpeeds.includes(config.transitionSpeed)) {
    throw new Error(
      `Invalid transition speed. Must be one of: ${validSpeeds.join(', ')}`
    );
  }

  // Validate aspect ratio
  const validRatios = ['16:9', '4:3', '16:10'];
  if (config.aspectRatio && !validRatios.includes(config.aspectRatio)) {
    throw new Error(
      `Invalid aspect ratio. Must be one of: ${validRatios.join(', ')}`
    );
  }

  // Validate autoSlide
  if (config.autoSlide !== undefined && typeof config.autoSlide !== 'number') {
    throw new Error('autoSlide must be a number');
  }

  return true;
}

/**
 * Deep merge two objects
 * @param {Object} target - Target object
 * @param {Object} source - Source object
 * @returns {Object} - Merged object
 */
function deepMerge(target, source) {
  const result = { ...target };

  Object.keys(source).forEach((key) => {
    if (
      source[key] &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key])
    ) {
      result[key] = deepMerge(result[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  });

  return result;
}

/**
 * Merge user configuration with defaults
 * @param {Object} defaults - Default configuration
 * @param {Object} userConfig - User configuration
 * @returns {Object} - Merged configuration
 */
export function mergeConfig(defaults, userConfig = {}) {
  const merged = deepMerge(defaults, userConfig);
  validateConfig(merged);
  return merged;
}
