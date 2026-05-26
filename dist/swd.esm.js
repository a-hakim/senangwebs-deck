import 'core-js/modules/web.dom-collections.iterator.js';
import 'core-js/modules/es.regexp.exec.js';
import 'core-js/modules/es.string.replace.js';
import 'core-js/modules/es.string.trim.js';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import 'core-js/modules/es.array.sort.js';
import 'core-js/modules/web.url.js';
import 'core-js/modules/web.url.to-json.js';
import 'core-js/modules/web.url-search-params.js';

function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r] = t, e;
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}

/**
 * Event Emitter - Custom event system for SWD
 * @module core/events
 */

/**
 * EventEmitter class for managing custom events
 */
class EventEmitter {
  constructor() {
    this.events = {};
    this.onceEvents = {};
  }

  /**
   * Register an event listener
   * @param {string} event - Event name
   * @param {Function} handler - Event handler function
   * @returns {EventEmitter} - Returns this for chaining
   */
  on(event, handler) {
    if (typeof handler !== 'function') {
      throw new TypeError('Event handler must be a function');
    }
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(handler);
    return this;
  }

  /**
   * Register a one-time event listener
   * @param {string} event - Event name
   * @param {Function} handler - Event handler function
   * @returns {EventEmitter} - Returns this for chaining
   */
  once(event, handler) {
    if (typeof handler !== 'function') {
      throw new TypeError('Event handler must be a function');
    }
    if (!this.onceEvents[event]) {
      this.onceEvents[event] = [];
    }
    this.onceEvents[event].push(handler);
    return this;
  }

  /**
   * Remove an event listener
   * @param {string} event - Event name
   * @param {Function} handler - Event handler function to remove
   * @returns {EventEmitter} - Returns this for chaining
   */
  off(event, handler) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(h => h !== handler);
    }
    if (this.onceEvents[event]) {
      this.onceEvents[event] = this.onceEvents[event].filter(h => h !== handler);
    }
    return this;
  }

  /**
   * Remove all listeners for an event, or all events if no event specified
   * @param {string} [event] - Event name (optional)
   * @returns {EventEmitter} - Returns this for chaining
   */
  offAll(event) {
    if (event) {
      delete this.events[event];
      delete this.onceEvents[event];
    } else {
      this.events = {};
      this.onceEvents = {};
    }
    return this;
  }

  /**
   * Emit an event with data
   * @param {string} event - Event name
   * @param {...*} args - Arguments to pass to handlers
   * @returns {EventEmitter} - Returns this for chaining
   */
  emit(event) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    // Call regular event handlers
    if (this.events[event]) {
      this.events[event].forEach(handler => {
        try {
          handler(...args);
        } catch (error) {
          console.error("Error in event handler for \"".concat(event, "\":"), error);
        }
      });
    }

    // Call once event handlers and then remove them
    if (this.onceEvents[event]) {
      const handlers = [...this.onceEvents[event]];
      delete this.onceEvents[event];
      handlers.forEach(handler => {
        try {
          handler(...args);
        } catch (error) {
          console.error("Error in once event handler for \"".concat(event, "\":"), error);
        }
      });
    }
    return this;
  }

  /**
   * Get all listeners for an event
   * @param {string} event - Event name
   * @returns {Array<Function>} - Array of handler functions
   */
  listeners(event) {
    const regular = this.events[event] || [];
    const once = this.onceEvents[event] || [];
    return [...regular, ...once];
  }

  /**
   * Check if event has listeners
   * @param {string} event - Event name
   * @returns {boolean} - True if event has listeners
   */
  hasListeners(event) {
    return this.listeners(event).length > 0;
  }
}

/**
 * Configuration System - Default settings and config management
 * @module core/config
 */

/**
 * Default configuration for SWD presentations
 */
const DefaultConfig = {
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
  transition: 'slide',
  // 'slide', 'fade', 'zoom', 'flip', 'none'

  // Transition speed
  transitionSpeed: 'normal',
  // 'fast', 'normal', 'slow'

  // Slide aspect ratio
  aspectRatio: '16:9',
  // '16:9', '4:3', '16:10'

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
  controlsPosition: 'bottom-right',
  // 'bottom-right', 'bottom-left', 'edges'

  // Show progress bar
  progress: true,
  // Progress bar position
  progressPosition: 'bottom',
  // 'top', 'bottom'

  // Show slide numbers
  slideNumbers: true,
  // Slide number format
  slideNumberFormat: 'h/v',
  // 'h/v', 'h.v', 'c/t', 'c'

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
  fragmentStyle: 'fade-in',
  // 'fade-in', 'slide-in', 'zoom-in'

  // Parallax background
  parallax: false,
  // Auto-initialize
  autoInit: true,
  // Auto-play options (for data attributes mapping)
  autoplay: false,
  autoplayDelay: 3000,
  // Plugins
  plugins: [],
  // Custom keyboard shortcuts
  keyboardShortcuts: {},
  // Accessibility
  a11y: {
    enabled: true,
    announceSlideChanges: true,
    focusVisible: true
  },
  // Export options
  export: {
    pdf: true,
    html: true,
    json: true
  },
  // Development mode
  dev: false
};

/**
 * Validate configuration values
 * @param {Object} config - Configuration object
 * @throws {Error} - If configuration is invalid
 */
function validateConfig(config) {
  if (!config || typeof config !== 'object') {
    throw new Error('Configuration must be an object');
  }

  // Validate source type
  if (config.source && !['html', 'markdown', 'json'].includes(config.source)) {
    throw new Error('Invalid source type. Must be "html", "markdown", or "json"');
  }

  // Validate transition
  const validTransitions = ['slide', 'fade', 'zoom', 'flip', 'none'];
  if (config.transition && !validTransitions.includes(config.transition)) {
    throw new Error("Invalid transition. Must be one of: ".concat(validTransitions.join(', ')));
  }

  // Validate transition speed
  const validSpeeds = ['fast', 'normal', 'slow'];
  if (config.transitionSpeed && !validSpeeds.includes(config.transitionSpeed)) {
    throw new Error("Invalid transition speed. Must be one of: ".concat(validSpeeds.join(', ')));
  }

  // Validate aspect ratio
  const validRatios = ['16:9', '4:3', '16:10'];
  if (config.aspectRatio && !validRatios.includes(config.aspectRatio)) {
    throw new Error("Invalid aspect ratio. Must be one of: ".concat(validRatios.join(', ')));
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
  const result = _objectSpread2({}, target);
  Object.keys(source).forEach(key => {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
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
function mergeConfig(defaults) {
  let userConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const merged = deepMerge(defaults, userConfig);
  validateConfig(merged);
  return merged;
}

/**
 * HTML Parser - Parse HTML with data-swd-* attributes
 * @module parsers/html-parser
 */

/**
 * HTML Parser class
 */
class HtmlParser {
  constructor(config) {
    this.config = config;
  }

  /**
   * Parse HTML slides
   * @param {HTMLElement} container - Container element
   * @returns {Array} - Array of slide data
   */
  parse(container) {
    const slides = [];
    const slideElements = container.querySelectorAll('[data-swd-page]');
    slideElements.forEach((element, index) => {
      const slideData = {
        index,
        layout: element.getAttribute('data-swd-layout') || 'default',
        background: element.getAttribute('data-swd-background'),
        overlay: element.getAttribute('data-swd-overlay'),
        content: element.innerHTML,
        attributes: this.parseAttributes(element)
      };

      // Parse columns for multi-column layouts
      const columns = this.parseColumns(element);
      if (columns.length > 0) {
        slideData.columns = columns;
      }
      slides.push(slideData);
    });
    return slides;
  }

  /**
   * Parse columns from slide element
   * @param {HTMLElement} element - Slide element
   * @returns {Array} - Array of column HTML strings
   */
  parseColumns(element) {
    const columns = [];
    const columnElements = element.querySelectorAll('[data-swd-column]');
    columnElements.forEach(col => {
      columns.push(col.innerHTML);
    });
    return columns;
  }

  /**
   * Parse custom attributes from element
   * @param {HTMLElement} element - Slide element
   * @returns {Object} - Parsed attributes
   */
  parseAttributes(element) {
    const attrs = {};
    const {
      attributes
    } = element;
    for (let i = 0; i < attributes.length; i += 1) {
      const attr = attributes[i];
      if (attr.name.startsWith('data-swd-')) {
        const key = attr.name.replace('data-swd-', '');
        attrs[key] = attr.value;
      }
    }
    return attrs;
  }
}

/**
 * Markdown Parser class
 */
class MarkdownParser {
  constructor(config) {
    this.config = config;
    this.setupMarked();
  }

  /**
   * Setup marked configuration
   */
  setupMarked() {
    marked.setOptions({
      breaks: true,
      gfm: true,
      headerIds: false,
      mangle: false
    });
  }

  /**
   * Parse Markdown slides
   * @param {HTMLElement} container - Container element
   * @returns {Promise<Array>} - Array of slide data
   */
  async parse(container) {
    let markdown = '';

    // Get markdown content
    if (this.config.markdownUrl) {
      // Load from external file
      markdown = await this.loadMarkdown(this.config.markdownUrl);
    } else {
      // Get from container
      markdown = container.textContent || container.innerText || '';
    }

    // Split into slides
    const slideTexts = this.splitSlides(markdown);

    // Parse each slide
    const slides = slideTexts.map((slideText, index) => this.parseSlide(slideText, index));
    return slides;
  }

  /**
   * Load markdown from URL
   * @param {string} url - Markdown file URL
   * @returns {Promise<string>} - Markdown content
   */
  async loadMarkdown(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to load markdown: ".concat(response.statusText));
      }
      return await response.text();
    } catch (error) {
      console.error('Error loading markdown:', error);
      throw error;
    }
  }

  /**
   * Split markdown into individual slides
   * @param {string} markdown - Full markdown content
   * @returns {Array<string>} - Array of slide markdown
   */
  splitSlides(markdown) {
    const normalized = markdown.replace(/\r\n/g, '\n');
    const lines = normalized.split('\n');
    const slides = [];
    let currentSlide = [];
    let inCodeBlock = false;
    lines.forEach(line => {
      const trimmed = line.trim();

      // Toggle code block state
      if (trimmed.startsWith('```')) {
        inCodeBlock = !inCodeBlock;
      }

      // Slide separator: --- on a line by itself, outside code blocks
      const isSeparator = !inCodeBlock && /^---$/.test(trimmed);
      if (isSeparator) {
        if (currentSlide.length > 0) {
          slides.push(currentSlide.join('\n'));
          currentSlide = [];
        }
      } else {
        currentSlide.push(line);
      }
    });
    if (currentSlide.length > 0) {
      slides.push(currentSlide.join('\n'));
    }
    return slides.filter(slide => slide.trim().length > 0);
  }

  /**
   * Parse a single slide
   * @param {string} slideText - Slide markdown
   * @param {number} index - Slide index
   * @returns {Object} - Slide data
   */
  parseSlide(slideText, index) {
    const slideData = {
      index,
      layout: 'default',
      content: '',
      attributes: {}
    };

    // Parse metadata from HTML comments (but keep original text for column parsing)
    const frontmatter = this.extractMetadata(slideText);

    // Apply frontmatter data
    if (frontmatter.layout) {
      slideData.layout = frontmatter.layout;
    }
    if (frontmatter.slide) {
      // Support both 'slide:' and 'layout:' for backwards compatibility
      slideData.layout = frontmatter.slide;
    }
    if (frontmatter.background) {
      slideData.background = frontmatter.background;
    }
    if (frontmatter.overlay) {
      slideData.overlay = frontmatter.overlay;
    }

    // Copy all frontmatter to attributes
    slideData.attributes = _objectSpread2({}, frontmatter);

    // Parse content based on layout
    // For column layouts, parse BEFORE removing comments
    if (slideData.layout === 'two-cols') {
      this.parseTwoColumns(slideText, slideData);
    } else if (slideData.layout === 'three-cols') {
      this.parseThreeColumns(slideText, slideData);
    } else {
      // For other layouts, remove metadata comments and parse
      const content = this.cleanMetadata(slideText);
      if (slideData.layout === 'quote') {
        this.parseQuote(content, slideData);
      } else if (slideData.layout === 'image-right' || slideData.layout === 'image-left') {
        this.parseImageLayout(content, slideData);
      } else {
        // Default: convert markdown to HTML
        slideData.content = marked.parse(content);
      }
    }
    return slideData;
  }

  /**
   * Extract metadata from HTML comments
   * @param {string} slideText - Slide text with HTML comments
   * @returns {Object} - Metadata object
   */
  extractMetadata(slideText) {
    const metadata = {};

    // Extract all HTML comment metadata
    // Pattern: <!-- key: value -->
    const metadataRegex = /<!--\s*(\w+):\s*(.+?)\s*-->/g;
    let match;

    // eslint-disable-next-line no-cond-assign
    while ((match = metadataRegex.exec(slideText)) !== null) {
      const key = match[1];
      let value = match[2].trim();

      // Remove quotes if present
      if (value.startsWith('"') && value.endsWith('"') || value.startsWith("'") && value.endsWith("'")) {
        value = value.slice(1, -1);
      }
      metadata[key] = value;
    }
    return metadata;
  }

  /**
   * Remove metadata HTML comments from content
   * @param {string} slideText - Slide text with HTML comments
   * @returns {string} - Clean content
   */
  cleanMetadata(slideText) {
    // Remove metadata comments (<!-- key: value -->)
    return slideText.replace(/<!--\s*\w+:\s*.+?\s*-->/g, '').trim();
  }

  /**
   * Remove column marker comments from content
   * @param {string} text - Text with column markers
   * @returns {string} - Clean content
   */
  cleanColumnMarkers(text) {
    // Remove <!-- column --> markers
    return text.replace(/<!--\s*column\s*-->/gi, '').trim();
  }

  /**
   * Parse two-column content
   * @param {string} slideText - Slide content with HTML comments
   * @param {Object} slideData - Slide data object to modify
   */
  parseTwoColumns(slideText, slideData) {
    // First, remove metadata comments but keep column markers
    const contentWithMarkers = this.cleanMetadata(slideText);

    // Split by <!-- column --> marker
    const parts = contentWithMarkers.split(/<!--\s*column\s*-->/i);
    if (parts.length >= 2) {
      slideData.left = marked.parse(parts[0].trim() || '');
      slideData.right = marked.parse(parts[1].trim() || '');
    } else {
      // Fallback: if no marker, use all as left
      slideData.left = marked.parse(contentWithMarkers);
      slideData.right = '';
    }

    // Don't include the marker in content
    slideData.content = '';
  }

  /**
   * Parse three-column content
   * @param {string} slideText - Slide content with HTML comments
   * @param {Object} slideData - Slide data object to modify
   */
  parseThreeColumns(slideText, slideData) {
    // First, remove metadata comments but keep column markers
    const contentWithMarkers = this.cleanMetadata(slideText);

    // Split by <!-- column --> markers
    const parts = contentWithMarkers.split(/<!--\s*column\s*-->/i);

    // We expect 3 parts for three columns
    slideData.columns = [marked.parse((parts[0] || '').trim()), marked.parse((parts[1] || '').trim()), marked.parse((parts[2] || '').trim())];

    // Don't include the markers in content
    slideData.content = '';
  }

  /**
   * Parse quote content
   * @param {string} content - Slide content
   * @param {Object} slideData - Slide data object to modify
   */
  parseQuote(content, slideData) {
    // Look for quote and author pattern
    const lines = content.trim().split('\n');
    const quoteLines = [];
    let author = '';
    lines.forEach(line => {
      if (line.startsWith('—') || line.startsWith('--')) {
        author = line.replace(/^[—-]+\s*/, '').trim();
      } else if (line.trim()) {
        quoteLines.push(line);
      }
    });
    slideData.quote = quoteLines.join(' ').replace(/^["']|["']$/g, '');
    if (author) {
      slideData.author = author;
    }

    // Also set content as HTML
    slideData.content = marked.parse(content);
  }

  /**
   * Parse image layout content
   * @param {string} content - Slide content
   * @param {Object} slideData - Slide data object to modify
   */
  parseImageLayout(content, slideData) {
    // Look for image markdown pattern
    const imgRegex = /!\[([^\]]*)\]\(([^)]+)\)/;
    const match = content.match(imgRegex);
    if (match) {
      const [, imageAlt, image] = match;
      slideData.image = image;
      slideData.imageAlt = imageAlt;
      // Remove image from content
      const textContent = content.replace(imgRegex, '');
      slideData.content = marked.parse(textContent);
    } else {
      slideData.content = marked.parse(content);
    }
  }
}

/**
 * JSON Parser - Parse JSON to slides
 * @module parsers/json-parser
 */


/**
 * JSON Parser class
 */
class JsonParser {
  constructor(config) {
    this.config = config;
  }

  /**
   * Parse JSON slides
   * @param {HTMLElement} container - Container element
   * @returns {Promise<Array>} - Array of slide data
   */
  async parse(container) {
    let data = null;

    // Get JSON data
    if (this.config.data) {
      // Use provided data
      data = this.config.data;
    } else if (this.config.jsonUrl) {
      // Load from external file
      data = await this.loadJSON(this.config.jsonUrl);
    } else {
      // Try to parse from container
      const jsonText = container.textContent || container.innerText || '';
      try {
        data = JSON.parse(jsonText);
      } catch (error) {
        throw new Error('Invalid JSON content in container');
      }
    }

    // Validate data structure
    if (!data || !data.slides || !Array.isArray(data.slides)) {
      throw new Error('JSON data must have a "slides" array');
    }

    // Parse each slide
    const slides = data.slides.map((slideData, index) => this.parseSlide(slideData, index));
    return slides;
  }

  /**
   * Load JSON from URL
   * @param {string} url - JSON file URL
   * @returns {Promise<Object>} - JSON data
   */
  async loadJSON(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to load JSON: ".concat(response.statusText));
      }
      return await response.json();
    } catch (error) {
      console.error('Error loading JSON:', error);
      throw error;
    }
  }

  /**
   * Parse a single slide from JSON
   * @param {Object} slideData - Slide JSON data
   * @param {number} index - Slide index
   * @returns {Object} - Normalized slide data
   */
  parseSlide(slideData, index) {
    const normalized = {
      index,
      layout: slideData.layout || 'default',
      content: '',
      attributes: {}
    };

    // Copy basic properties
    if (slideData.background) {
      normalized.background = slideData.background;
    }
    if (slideData.overlay) {
      normalized.overlay = slideData.overlay;
    }

    // Parse content based on layout
    switch (normalized.layout) {
      case 'cover':
        normalized.content = this.buildCoverContent(slideData);
        break;
      case 'two-cols':
        normalized.left = this.buildContent(slideData.left);
        normalized.right = this.buildContent(slideData.right);
        normalized.content = "".concat(normalized.left, "::right::").concat(normalized.right);
        break;
      case 'three-cols':
        normalized.columns = [this.buildContent(slideData.col1), this.buildContent(slideData.col2), this.buildContent(slideData.col3)];
        normalized.content = normalized.columns.join('');
        break;
      case 'quote':
        normalized.quote = slideData.quote || slideData.content;
        normalized.author = slideData.author || '';
        normalized.content = this.buildQuoteContent(normalized);
        break;
      case 'image-right':
      case 'image-left':
        normalized.image = slideData.image;
        normalized.imageAlt = slideData.imageAlt || '';
        normalized.content = this.buildContent(slideData.content);
        break;
      case 'full-image':
        normalized.content = this.buildContent(slideData.content);
        break;
      default:
        normalized.content = this.buildContent(slideData.content);
        break;
    }

    // Copy any additional attributes
    Object.keys(slideData).forEach(key => {
      if (!['layout', 'content', 'background', 'overlay', 'left', 'right', 'col1', 'col2', 'col3', 'quote', 'author', 'image', 'imageAlt'].includes(key)) {
        normalized.attributes[key] = slideData[key];
      }
    });
    return normalized;
  }

  /**
   * Build cover content
   * @param {Object} slideData - Slide data
   * @returns {string} - HTML content
   */
  buildCoverContent(slideData) {
    let html = '';
    if (slideData.title) {
      html += "<h1>".concat(this.sanitizeHTML(slideData.title), "</h1>");
    }
    if (slideData.subtitle) {
      html += "<h2>".concat(this.sanitizeHTML(slideData.subtitle), "</h2>");
    }
    if (slideData.content) {
      html += this.buildContent(slideData.content);
    }
    return html;
  }

  /**
   * Build quote content
   * @param {Object} normalized - Normalized slide data
   * @returns {string} - HTML content
   */
  buildQuoteContent(normalized) {
    let html = "<blockquote>".concat(this.sanitizeHTML(normalized.quote), "</blockquote>");
    if (normalized.author) {
      html += "<cite>".concat(this.sanitizeHTML(normalized.author), "</cite>");
    }
    return html;
  }

  /**
   * Build content from various input types
   * @param {*} content - Content (string, array, object)
   * @returns {string} - HTML content
   */
  buildContent(content) {
    if (!content) return '';
    if (typeof content === 'string') {
      return this.sanitizeHTML(content);
    }
    if (Array.isArray(content)) {
      // Array of strings/objects
      return content.map(item => this.buildContentItem(item)).join('');
    }
    if (typeof content === 'object') {
      return this.buildContentItem(content);
    }
    return '';
  }

  /**
   * Build content item from object
   * @param {Object|string} item - Content item
   * @returns {string} - HTML content
   */
  buildContentItem(item) {
    if (typeof item === 'string') {
      return "<p>".concat(this.sanitizeHTML(item), "</p>");
    }
    if (item.type === 'heading') {
      const level = item.level || 2;
      return "<h".concat(level, ">").concat(this.sanitizeHTML(item.text), "</h").concat(level, ">");
    }
    if (item.type === 'paragraph') {
      return "<p>".concat(this.sanitizeHTML(item.text), "</p>");
    }
    if (item.type === 'list') {
      const tag = item.ordered ? 'ol' : 'ul';
      const items = (item.items || []).map(li => "<li>".concat(this.sanitizeHTML(li), "</li>")).join('');
      return "<".concat(tag, ">").concat(items, "</").concat(tag, ">");
    }
    if (item.type === 'code') {
      const lang = item.language || '';
      return "<pre><code class=\"language-".concat(lang, "\">").concat(this.escapeHTML(item.code), "</code></pre>");
    }
    if (item.type === 'image') {
      const alt = this.escapeHTML(item.alt || '');
      return "<img src=\"".concat(this.escapeHTML(item.src), "\" alt=\"").concat(alt, "\">");
    }
    if (item.type === 'video') {
      const controls = item.controls ? 'controls' : '';
      const autoplay = item.autoplay ? 'autoplay' : '';
      return "<video src=\"".concat(this.escapeHTML(item.src), "\" ").concat(controls, " ").concat(autoplay, "></video>");
    }
    if (item.type === 'table') {
      return this.buildTable(item);
    }
    return '';
  }

  /**
   * Build table HTML
   * @param {Object} tableData - Table data
   * @returns {string} - HTML table
   */
  buildTable(tableData) {
    let html = '<table>';
    if (tableData.headers) {
      html += '<thead><tr>';
      tableData.headers.forEach(header => {
        html += "<th>".concat(this.sanitizeHTML(header), "</th>");
      });
      html += '</tr></thead>';
    }
    if (tableData.rows) {
      html += '<tbody>';
      tableData.rows.forEach(row => {
        html += '<tr>';
        row.forEach(cell => {
          html += "<td>".concat(this.sanitizeHTML(cell), "</td>");
        });
        html += '</tr>';
      });
      html += '</tbody>';
    }
    html += '</table>';
    return html;
  }

  /**
   * Escape HTML special characters
   * @param {string} text - Text to escape
   * @returns {string} - Escaped text
   */
  escapeHTML(text) {
    if (typeof text !== 'string') return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Sanitize HTML securely using DOMPurify
   * @param {string} text - HTML string to sanitize
   * @returns {string} - Sanitized HTML string
   */
  sanitizeHTML(text) {
    if (typeof text !== 'string') return '';
    return DOMPurify.sanitize(text);
  }
}

/**
 * Parser - Content parser factory
 * @module core/parser
 */


/**
 * Parser factory class
 */
class Parser {
  constructor(config) {
    this.config = config;
  }

  /**
   * Parse content based on source type
   * @param {string} source - Source type ('html', 'markdown', 'json')
   * @param {HTMLElement} container - Container element
   * @returns {Promise<Array>} - Array of slide data
   */
  async parse(source, container) {
    let parser;
    switch (source) {
      case 'html':
        parser = new HtmlParser(this.config);
        return parser.parse(container);
      case 'markdown':
        parser = new MarkdownParser(this.config);
        return parser.parse(container);
      case 'json':
        parser = new JsonParser(this.config);
        return parser.parse(container);
      default:
        throw new Error("Unknown source type: ".concat(source));
    }
  }
}

/**
 * Default Layout - Single column content
 * @module layouts/default
 */

const defaultLayout = {
  /**
   * Render default layout
   * @param {Object} slideData - Slide data
   * @returns {HTMLElement} - Rendered content
   */
  render(slideData) {
    const content = document.createElement('div');
    content.className = 'swd-slide-content swd-layout-default';
    content.innerHTML = slideData.content;
    return content;
  }
};

/**
 * Cover Layout - Full-screen title slide
 * @module layouts/cover
 */

const coverLayout = {
  /**
   * Render cover layout
   * @param {Object} slideData - Slide data
   * @returns {HTMLElement} - Rendered content
   */
  render(slideData) {
    const content = document.createElement('div');
    content.className = 'swd-slide-content swd-layout-cover';
    content.innerHTML = slideData.content;
    return content;
  }
};

/**
 * Center Layout - Centered content
 * @module layouts/center
 */

const centerLayout = {
  /**
   * Render center layout
   * @param {Object} slideData - Slide data
   * @returns {HTMLElement} - Rendered content
   */
  render(slideData) {
    const content = document.createElement('div');
    content.className = 'swd-slide-content swd-layout-center';
    content.innerHTML = slideData.content;
    return content;
  }
};

/**
 * Two Columns Layout - Split left/right content
 * @module layouts/two-cols
 */

const twoColsLayout = {
  /**
   * Render two columns layout
   * @param {Object} slideData - Slide data
   * @returns {HTMLElement} - Rendered content
   */
  render(slideData) {
    const content = document.createElement('div');
    content.className = 'swd-slide-content swd-layout-two-cols';

    // Check if content has columns array (from data-swd-column attributes)
    if (slideData.columns && Array.isArray(slideData.columns) && slideData.columns.length >= 2) {
      const [leftContent, rightContent] = slideData.columns;
      const leftCol = document.createElement('div');
      leftCol.className = 'swd-col swd-col-left';
      leftCol.innerHTML = leftContent;
      const rightCol = document.createElement('div');
      rightCol.className = 'swd-col swd-col-right';
      rightCol.innerHTML = rightContent;
      content.appendChild(leftCol);
      content.appendChild(rightCol);
    } else if (slideData.left && slideData.right) {
      // Check if content has left/right data
      const leftCol = document.createElement('div');
      leftCol.className = 'swd-col swd-col-left';
      leftCol.innerHTML = slideData.left;
      const rightCol = document.createElement('div');
      rightCol.className = 'swd-col swd-col-right';
      rightCol.innerHTML = slideData.right;
      content.appendChild(leftCol);
      content.appendChild(rightCol);
    } else {
      // Parse content for ::right:: marker
      const contentStr = slideData.content || '';
      const parts = contentStr.split('::right::');
      const leftCol = document.createElement('div');
      leftCol.className = 'swd-col swd-col-left';
      leftCol.innerHTML = parts[0] || '';
      const rightCol = document.createElement('div');
      rightCol.className = 'swd-col swd-col-right';
      rightCol.innerHTML = parts[1] || '';
      content.appendChild(leftCol);
      content.appendChild(rightCol);
    }
    return content;
  }
};

/**
 * Three Columns Layout - Three equal columns
 * @module layouts/three-cols
 */

const threeColsLayout = {
  /**
   * Render three columns layout
   * @param {Object} slideData - Slide data
   * @returns {HTMLElement} - Rendered content
   */
  render(slideData) {
    const content = document.createElement('div');
    content.className = 'swd-slide-content swd-layout-three-cols';

    // Check if content has columns array
    if (slideData.columns && Array.isArray(slideData.columns)) {
      slideData.columns.forEach((colContent, index) => {
        const col = document.createElement('div');
        col.className = "swd-col swd-col-".concat(index + 1);
        col.innerHTML = colContent;
        content.appendChild(col);
      });
    } else {
      // Parse content for ::col-N:: markers
      const contentStr = slideData.content || '';
      const parts = contentStr.split(/::col-[123]::/);

      // Create three columns
      for (let i = 0; i < 3; i += 1) {
        const col = document.createElement('div');
        col.className = "swd-col swd-col-".concat(i + 1);
        col.innerHTML = parts[i + 1] || '';
        content.appendChild(col);
      }
    }
    return content;
  }
};

/**
 * Quote Layout - Large quote display
 * @module layouts/quote
 */

const quoteLayout = {
  /**
   * Render quote layout
   * @param {Object} slideData - Slide data
   * @returns {HTMLElement} - Rendered content
   */
  render(slideData) {
    const content = document.createElement('div');
    content.className = 'swd-slide-content swd-layout-quote';

    // Check if quote and author are provided separately
    if (slideData.quote) {
      const blockquote = document.createElement('blockquote');
      blockquote.className = 'swd-quote-text';
      blockquote.textContent = slideData.quote;
      content.appendChild(blockquote);
      if (slideData.author) {
        const cite = document.createElement('cite');
        cite.className = 'swd-quote-author';
        cite.textContent = "\u2014 ".concat(slideData.author);
        content.appendChild(cite);
      }
    } else {
      // Use full content
      content.innerHTML = slideData.content;
    }
    return content;
  }
};

/**
 * Section Layout - Section divider slide
 * @module layouts/section
 */

const sectionLayout = {
  /**
   * Render section layout
   * @param {Object} slideData - Slide data
   * @returns {HTMLElement} - Rendered content
   */
  render(slideData) {
    const content = document.createElement('div');
    content.className = 'swd-slide-content swd-layout-section';
    content.innerHTML = slideData.content;
    return content;
  }
};

/**
 * Image Right Layout - Content left, image right
 * @module layouts/image-right
 */

const imageRightLayout = {
  /**
   * Render image-right layout
   * @param {Object} slideData - Slide data
   * @returns {HTMLElement} - Rendered content
   */
  render(slideData) {
    const content = document.createElement('div');
    content.className = 'swd-slide-content swd-layout-image-right';
    const textCol = document.createElement('div');
    textCol.className = 'swd-col swd-col-text';
    const imageCol = document.createElement('div');
    imageCol.className = 'swd-col swd-col-image';

    // Check if image and text are provided separately
    if (slideData.image) {
      textCol.innerHTML = slideData.content || '';
      const img = document.createElement('img');
      img.src = slideData.image;
      img.alt = slideData.imageAlt || '';
      imageCol.appendChild(img);
    } else {
      // Parse content for image tag
      const contentStr = slideData.content || '';
      const imgMatch = contentStr.match(/<img[^>]+>/);
      if (imgMatch) {
        const [imgTag] = imgMatch;
        const textContent = contentStr.replace(imgTag, '');
        textCol.innerHTML = textContent;
        imageCol.innerHTML = imgTag;
      } else {
        textCol.innerHTML = contentStr;
      }
    }
    content.appendChild(textCol);
    content.appendChild(imageCol);
    return content;
  }
};

/**
 * Image Left Layout - Image left, content right
 * @module layouts/image-left
 */

const imageLeftLayout = {
  /**
   * Render image-left layout
   * @param {Object} slideData - Slide data
   * @returns {HTMLElement} - Rendered content
   */
  render(slideData) {
    const content = document.createElement('div');
    content.className = 'swd-slide-content swd-layout-image-left';
    const imageCol = document.createElement('div');
    imageCol.className = 'swd-col swd-col-image';
    const textCol = document.createElement('div');
    textCol.className = 'swd-col swd-col-text';

    // Check if image and text are provided separately
    if (slideData.image) {
      const img = document.createElement('img');
      img.src = slideData.image;
      img.alt = slideData.imageAlt || '';
      imageCol.appendChild(img);
      textCol.innerHTML = slideData.content || '';
    } else {
      // Parse content for image tag
      const contentStr = slideData.content || '';
      const imgMatch = contentStr.match(/<img[^>]+>/);
      if (imgMatch) {
        const [imgTag] = imgMatch;
        imageCol.innerHTML = imgTag;
        const textContent = contentStr.replace(imgTag, '');
        textCol.innerHTML = textContent;
      } else {
        textCol.innerHTML = contentStr;
      }
    }
    content.appendChild(imageCol);
    content.appendChild(textCol);
    return content;
  }
};

/**
 * Full Image Layout - Full-screen image with optional overlay text
 * @module layouts/full-image
 */

const fullImageLayout = {
  /**
   * Render full-image layout
   * @param {Object} slideData - Slide data
   * @returns {HTMLElement} - Rendered content
   */
  render(slideData) {
    const content = document.createElement('div');
    content.className = 'swd-slide-content swd-layout-full-image';

    // Add overlay text if provided
    if (slideData.content && slideData.content.trim()) {
      const overlay = document.createElement('div');
      overlay.className = 'swd-image-overlay-text';
      overlay.innerHTML = slideData.content;
      content.appendChild(overlay);
    }
    return content;
  }
};

/**
 * Layouts Index - Export all layouts
 * @module layouts
 */

var layouts = {
  default: defaultLayout,
  cover: coverLayout,
  center: centerLayout,
  'two-cols': twoColsLayout,
  'three-cols': threeColsLayout,
  quote: quoteLayout,
  section: sectionLayout,
  'image-right': imageRightLayout,
  'image-left': imageLeftLayout,
  'full-image': fullImageLayout
};

/**
 * Renderer class - converts slide data to DOM
 */
class Renderer {
  constructor(config) {
    this.config = config;
  }

  /**
   * Render all slides
   * @param {HTMLElement} container - Container element
   * @param {Array} slides - Array of slide data
   */
  render(container, slides) {
    // Clear container
    container.innerHTML = '';

    // Create slide wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'swd-wrapper';

    // Set RTL if configured
    if (this.config.rtl) {
      wrapper.setAttribute('dir', 'rtl');
      wrapper.classList.add('swd-rtl');
    }

    // Create slides container
    const slidesContainer = document.createElement('div');
    slidesContainer.className = 'swd-slides';

    // Render each slide
    slides.forEach((slideData, index) => {
      const slideElement = this.renderSlide(slideData, index);
      slidesContainer.appendChild(slideElement);
    });
    wrapper.appendChild(slidesContainer);
    container.appendChild(wrapper);

    // Apply theme
    container.classList.add("swd-theme-".concat(this.config.theme));
  }

  /**
   * Render a single slide
   * @param {Object} slideData - Slide data
   * @param {number} index - Slide index
   * @returns {HTMLElement} - Rendered slide element
   */
  renderSlide(slideData, index) {
    const slide = document.createElement('div');
    slide.className = 'swd-slide';
    slide.setAttribute('data-index', index);
    slide.setAttribute('data-layout', slideData.layout || 'default');

    // Add initial state classes
    if (index === 0) {
      slide.classList.add('swd-slide-active', 'active');
    } else {
      slide.classList.add('swd-slide-hidden', 'future');
    }

    // Apply background
    if (slideData.background) {
      const bg = document.createElement('div');
      bg.className = 'swd-slide-background';

      // Check if background is a URL or CSS value (gradient, color, etc.)
      if (slideData.background.match(/^(https?:\/\/|\.\/|\.\.\/|\/)/)) {
        // It's a URL, use backgroundImage
        bg.style.backgroundImage = "url(".concat(slideData.background, ")");
      } else {
        // It's a CSS value (gradient, color, etc.), use background
        bg.style.background = slideData.background;
      }
      slide.appendChild(bg);
    }

    // Get layout renderer
    const layoutName = slideData.layout || 'default';
    const layoutRenderer = layouts[layoutName];
    if (!layoutRenderer) {
      throw new Error("Unknown layout: ".concat(layoutName));
    }

    // Render layout content
    const content = layoutRenderer.render(slideData);
    slide.appendChild(content);
    return slide;
  }

  /**
   * Cleanup renderer
   */
  destroy() {
    // Cleanup code will be added as needed
  }
}

/**
 * Keyboard Handler - Keyboard event management
 * @module utils/keyboard
 */

/**
 * Default keyboard shortcuts
 */
const defaultShortcuts = {
  ArrowRight: 'next',
  ArrowDown: 'next',
  ArrowLeft: 'prev',
  ArrowUp: 'prev',
  Space: 'next',
  ' ': 'next',
  PageDown: 'next',
  PageUp: 'prev',
  Home: 'first',
  End: 'last',
  f: 'fullscreen',
  F: 'fullscreen',
  o: 'overview',
  O: 'overview',
  p: 'pause',
  P: 'pause',
  Escape: 'escape'
};

/**
 * Keyboard Handler class
 */
class KeyboardHandler {
  constructor(presentation) {
    let config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    this.presentation = presentation;
    this.config = config;
    this.enabled = true;
    this.shortcuts = _objectSpread2(_objectSpread2({}, defaultShortcuts), config.keyboardShortcuts);
    this.boundHandleKeydown = this.handleKeydown.bind(this);
  }

  /**
   * Initialize keyboard handler
   */
  init() {
    if (this.config.keyboard !== false) {
      document.addEventListener('keydown', this.boundHandleKeydown);
    }
  }

  /**
   * Handle keydown events
   * @param {KeyboardEvent} event - Keyboard event
   */
  handleKeydown(event) {
    if (!this.enabled) return;

    // Skip if user is typing in an input field
    if (this.isTypingContext(event.target)) {
      return;
    }
    const key = this.getKeyIdentifier(event);
    const action = this.shortcuts[key];
    if (action) {
      event.preventDefault();
      this.executeAction(action, event);
    }
  }

  /**
   * Check if target is an input context
   * @param {HTMLElement} target - Event target
   * @returns {boolean} - True if typing context
   */
  isTypingContext(target) {
    if (!target || !target.tagName) return false;
    const tagName = target.tagName.toLowerCase();
    return tagName === 'input' || tagName === 'textarea' || tagName === 'select' || target.isContentEditable;
  }

  /**
   * Get key identifier from event
   * @param {KeyboardEvent} event - Keyboard event
   * @returns {string} - Key identifier
   */
  getKeyIdentifier(event) {
    // Handle special keys with modifiers
    if (event.shiftKey && event.key !== 'Shift') {
      return "Shift+".concat(event.key);
    }
    if (event.ctrlKey && event.key !== 'Control') {
      return "Ctrl+".concat(event.key);
    }
    if (event.altKey && event.key !== 'Alt') {
      return "Alt+".concat(event.key);
    }
    if (event.metaKey && event.key !== 'Meta') {
      return "Meta+".concat(event.key);
    }
    return event.key;
  }

  /**
   * Execute keyboard action
   * @param {string} action - Action name
   * @param {KeyboardEvent} event - Keyboard event
   */
  executeAction(action, event) {
    switch (action) {
      case 'next':
        this.presentation.next();
        break;
      case 'prev':
        this.presentation.prev();
        break;
      case 'first':
        this.presentation.goToFirst();
        break;
      case 'last':
        this.presentation.goToLast();
        break;
      case 'fullscreen':
        this.presentation.toggleFullscreen();
        break;
      case 'overview':
        this.presentation.toggleOverview();
        break;
      case 'pause':
        if (this.presentation.state.isPlaying) {
          this.presentation.stop();
        } else {
          this.presentation.start();
        }
        break;
      case 'escape':
        // Handle escape key
        if (this.presentation.state.isFullscreen) {
          this.presentation.toggleFullscreen();
        } else if (this.presentation.state.isOverview) {
          this.presentation.toggleOverview();
        }
        break;
      default:
        // Custom action
        this.presentation.emit('keyboardAction', {
          action,
          event
        });
        break;
    }
  }

  /**
   * Add custom keyboard shortcut
   * @param {string} key - Key identifier
   * @param {string} action - Action name
   */
  addShortcut(key, action) {
    this.shortcuts[key] = action;
  }

  /**
   * Remove keyboard shortcut
   * @param {string} key - Key identifier
   */
  removeShortcut(key) {
    delete this.shortcuts[key];
  }

  /**
   * Enable keyboard handler
   */
  enable() {
    this.enabled = true;
  }

  /**
   * Disable keyboard handler
   */
  disable() {
    this.enabled = false;
  }

  /**
   * Destroy keyboard handler
   */
  destroy() {
    document.removeEventListener('keydown', this.boundHandleKeydown);
  }
}

/**
 * Fragments - Sequential slide animations
 * @module utils/fragments
 */
class Fragments {
  constructor(presentation) {
    let config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    this.presentation = presentation;
    this.config = config;
  }

  /**
   * Get sorted fragments of the slide
   * @param {HTMLElement} slideElement
   * @param {boolean} [visibleState] - If true, filter by visible fragments. If false, filter by invisible fragments. If undefined, return all.
   * @returns {Array<HTMLElement>}
   */
  getSortedFragments(slideElement, visibleState) {
    if (!slideElement) return [];
    const fragments = Array.from(slideElement.querySelectorAll('.fragment'));

    // Process fragments with DOM indexes and custom fragment-index attributes
    const mapped = fragments.map((el, domIndex) => {
      const attr = el.getAttribute('data-fragment-index');
      const hasAttr = attr !== null && attr !== '';
      const index = hasAttr ? parseInt(attr, 10) : null;
      return {
        el,
        domIndex,
        index,
        hasAttr
      };
    });

    // Assign sequential indexes to fragments without an explicit index
    let currentIndex = 0;
    mapped.forEach(item => {
      if (!item.hasAttr) {
        item.index = currentIndex++;
      }
    });

    // Sort by calculated fragment index, and use DOM index as a tie breaker
    mapped.sort((a, b) => {
      if (a.index !== b.index) {
        return a.index - b.index;
      }
      return a.domIndex - b.domIndex;
    });

    // Extract elements
    const sortedElements = mapped.map(item => item.el);

    // Filter by visible status if specified
    if (visibleState === true) {
      return sortedElements.filter(el => el.classList.contains('visible'));
    } else if (visibleState === false) {
      return sortedElements.filter(el => !el.classList.contains('visible'));
    }
    return sortedElements;
  }

  /**
   * Get all fragment elements in the active slide
   * @param {HTMLElement} slideElement - Current slide element
   * @returns {Array<HTMLElement>}
   */
  getFragments(slideElement) {
    return this.getSortedFragments(slideElement);
  }

  /**
   * Get all active (already shown) fragments in the active slide
   * @param {HTMLElement} slideElement - Current slide element
   * @returns {Array<HTMLElement>}
   */
  getActiveFragments(slideElement) {
    return this.getSortedFragments(slideElement, true);
  }

  /**
   * Get all inactive (hidden) fragments in the active slide
   * @param {HTMLElement} slideElement - Current slide element
   * @returns {Array<HTMLElement>}
   */
  getInactiveFragments(slideElement) {
    return this.getSortedFragments(slideElement, false);
  }

  /**
   * Advance one fragment in the active slide
   * @param {HTMLElement} slideElement - Current slide element
   * @returns {boolean} - True if a fragment was revealed, false if no more fragments
   */
  next(slideElement) {
    if (this.config.fragments === false) return false;
    const inactive = this.getSortedFragments(slideElement, false);
    if (inactive.length === 0) return false;
    const nextFragment = inactive[0];
    nextFragment.classList.add('visible');

    // Apply styling based on config style or element attribute
    const style = nextFragment.getAttribute('data-fragment-style') || this.config.fragmentStyle || 'fade-in';
    nextFragment.classList.add(style);
    this.presentation.emit('fragmentShown', {
      fragment: nextFragment
    });
    return true;
  }

  /**
   * Hide one fragment in the active slide (backwards navigation)
   * @param {HTMLElement} slideElement - Current slide element
   * @returns {boolean} - True if a fragment was hidden, false if no more active fragments
   */
  prev(slideElement) {
    if (this.config.fragments === false) return false;
    const active = this.getSortedFragments(slideElement, true);
    if (active.length === 0) return false;
    const lastFragment = active[active.length - 1];
    lastFragment.classList.remove('visible');
    const style = lastFragment.getAttribute('data-fragment-style') || this.config.fragmentStyle || 'fade-in';
    lastFragment.classList.remove(style);
    this.presentation.emit('fragmentHidden', {
      fragment: lastFragment
    });
    return true;
  }
}

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
    const {
      currentSlide
    } = this.presentation.state;
    const {
      slides
    } = this.presentation.state;
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
    const {
      currentSlide
    } = this.presentation.state;
    const {
      slides
    } = this.presentation.state;
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
    const {
      slides,
      currentSlide
    } = this.presentation.state;

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
      to: index
    });

    // Update state
    const previousSlide = currentSlide;
    this.presentation.state.currentSlide = index;

    // Update DOM with transitions
    await this.updateSlideDisplay(index, previousSlide);

    // Emit after change event
    this.presentation.emit('afterSlideChange', {
      from: previousSlide,
      to: index
    });
  }

  /**
   * Update slide display
   * @param {number} index - Current slide index
   * @param {number} previousIndex - Previous slide index
   */
  async updateSlideDisplay(index) {
    let previousIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
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
    this.presentation.on('afterSlideChange', _ref => {
      let {
        to
      } = _ref;
      if (this.config.hash !== false && !this.presentation.state.isOverview) {
        window.location.hash = "/slide-".concat(to + 1);
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
    const {
      container
    } = this.presentation;
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
    const {
      wrapper
    } = this.presentation;
    if (wrapper) {
      wrapper.appendChild(this.ariaLiveElement);
    }
    this.presentation.on('afterSlideChange', _ref2 => {
      let {
        to
      } = _ref2;
      const isAnnounceEnabled = this.config.a11y && (this.config.a11y === true || this.config.a11y.announceSlideChanges !== false);
      if (isAnnounceEnabled && this.ariaLiveElement) {
        const slides = this.presentation.container.querySelectorAll('.swd-slide');
        const activeSlide = slides[to];
        const heading = activeSlide ? activeSlide.querySelector('h1, h2, h3, h4') : null;
        const headingText = heading ? heading.textContent : '';
        this.ariaLiveElement.textContent = "Slide ".concat(to + 1, ". ").concat(headingText);
      }
    });
  }

  /**
   * Setup Mouse Wheel navigation
   */
  setupMouseWheel() {
    let lastWheelTime = 0;
    this.boundWheel = event => {
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
    this.presentation.container.addEventListener('wheel', this.boundWheel, {
      passive: true
    });
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
      const {
        container
      } = this.presentation;
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

/**
 * Touch Handler - Touch and swipe gesture support
 * @module utils/touch
 */

/**
 * Touch Handler class
 */
class TouchHandler {
  constructor(presentation) {
    let config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    this.presentation = presentation;
    this.config = config;
    this.enabled = true;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchEndX = 0;
    this.touchEndY = 0;
    this.touchStartTime = 0;
    this.isSwiping = false;

    // Gesture thresholds
    this.minSwipeDistance = config.minSwipeDistance || 50;
    this.maxSwipeTime = config.maxSwipeTime || 300;
    this.swipeVelocityThreshold = config.swipeVelocityThreshold || 0.3;

    // Bind methods
    this.boundTouchStart = this.handleTouchStart.bind(this);
    this.boundTouchMove = this.handleTouchMove.bind(this);
    this.boundTouchEnd = this.handleTouchEnd.bind(this);
  }

  /**
   * Initialize touch handler
   */
  init() {
    if (this.config.touch !== false) {
      const {
        container
      } = this.presentation;
      container.addEventListener('touchstart', this.boundTouchStart, {
        passive: false
      });
      container.addEventListener('touchmove', this.boundTouchMove, {
        passive: false
      });
      container.addEventListener('touchend', this.boundTouchEnd, {
        passive: false
      });
    }
  }

  /**
   * Check if device supports touch
   * @returns {boolean} - True if touch device
   */
  isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  }

  /**
   * Handle touch start
   * @param {TouchEvent} event - Touch event
   */
  handleTouchStart(event) {
    if (!this.enabled) return;
    const touch = event.touches[0];
    this.touchStartX = touch.clientX;
    this.touchStartY = touch.clientY;
    this.touchStartTime = Date.now();
    this.isSwiping = false;

    // Emit touch start event
    this.presentation.emit('touchStart', {
      x: this.touchStartX,
      y: this.touchStartY
    });
  }

  /**
   * Handle touch move
   * @param {TouchEvent} event - Touch event
   */
  handleTouchMove(event) {
    if (!this.enabled) return;
    const touch = event.touches[0];
    const deltaX = Math.abs(touch.clientX - this.touchStartX);
    const deltaY = Math.abs(touch.clientY - this.touchStartY);

    // Detect horizontal swipe
    if (deltaX > 10 && deltaX > deltaY) {
      this.isSwiping = true;
      event.preventDefault(); // Prevent scrolling
    }

    // Emit touch move event
    this.presentation.emit('touchMove', {
      x: touch.clientX,
      y: touch.clientY,
      deltaX,
      deltaY
    });
  }

  /**
   * Handle touch end
   * @param {TouchEvent} event - Touch event
   */
  handleTouchEnd(event) {
    if (!this.enabled) return;
    const touch = event.changedTouches[0];
    this.touchEndX = touch.clientX;
    this.touchEndY = touch.clientY;
    const swipeDistance = this.getSwipeDistance();
    const swipeDirection = this.getSwipeDirection();
    const swipeTime = Date.now() - this.touchStartTime;
    const swipeVelocity = swipeDistance / swipeTime;

    // Emit touch end event
    this.presentation.emit('touchEnd', {
      x: this.touchEndX,
      y: this.touchEndY,
      distance: swipeDistance,
      direction: swipeDirection,
      time: swipeTime,
      velocity: swipeVelocity
    });

    // Handle swipe gesture
    if (this.isSwiping) {
      this.handleSwipe(swipeDirection, swipeDistance, swipeVelocity);
    }

    // Reset
    this.isSwiping = false;
  }

  /**
   * Calculate swipe distance
   * @returns {number} - Distance in pixels
   */
  getSwipeDistance() {
    const deltaX = this.touchEndX - this.touchStartX;
    const deltaY = this.touchEndY - this.touchStartY;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  }

  /**
   * Determine swipe direction
   * @returns {string} - Direction: 'left', 'right', 'up', 'down', 'none'
   */
  getSwipeDirection() {
    const deltaX = this.touchEndX - this.touchStartX;
    const deltaY = this.touchEndY - this.touchStartY;

    // Determine if horizontal or vertical swipe
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      return deltaX > 0 ? 'right' : 'left';
    }
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      // Vertical swipe
      return deltaY > 0 ? 'down' : 'up';
    }
    return 'none';
  }

  /**
   * Handle swipe gesture
   * @param {string} direction - Swipe direction
   * @param {number} distance - Swipe distance
   * @param {number} velocity - Swipe velocity
   */
  handleSwipe(direction, distance, velocity) {
    // Check if swipe meets threshold
    if (distance < this.minSwipeDistance || velocity < this.swipeVelocityThreshold) {
      return;
    }

    // Emit swipe event
    this.presentation.emit('swipe', {
      direction,
      distance,
      velocity
    });
    const isRtl = this.config.rtl === true;

    // Perform navigation based on direction
    switch (direction) {
      case 'left':
        if (isRtl) {
          this.presentation.prev();
        } else {
          this.presentation.next();
        }
        break;
      case 'right':
        if (isRtl) {
          this.presentation.next();
        } else {
          this.presentation.prev();
        }
        break;
      case 'up':
        // Could be used for vertical slide navigation if implemented
        this.presentation.emit('swipeUp');
        break;
      case 'down':
        // Could be used for vertical slide navigation if implemented
        this.presentation.emit('swipeDown');
        break;
    }
  }

  /**
   * Enable touch handler
   */
  enable() {
    this.enabled = true;
  }

  /**
   * Disable touch handler
   */
  disable() {
    this.enabled = false;
  }

  /**
   * Destroy touch handler
   */
  destroy() {
    const {
      container
    } = this.presentation;
    container.removeEventListener('touchstart', this.boundTouchStart);
    container.removeEventListener('touchmove', this.boundTouchMove);
    container.removeEventListener('touchend', this.boundTouchEnd);
  }
}

/**
 * Fullscreen - Fullscreen mode support
 * @module utils/fullscreen
 */

/**
 * Fullscreen utility class
 */
class Fullscreen {
  constructor(presentation) {
    let config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
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
      document.addEventListener('fullscreenchange', this.boundFullscreenChange);
      document.addEventListener('webkitfullscreenchange', this.boundFullscreenChange);
      document.addEventListener('mozfullscreenchange', this.boundFullscreenChange);
      document.addEventListener('MSFullscreenChange', this.boundFullscreenChange);
    }
  }

  /**
   * Check if fullscreen is supported
   * @returns {boolean} - True if supported
   */
  isSupported() {
    return !!(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled);
  }

  /**
   * Check if currently in fullscreen mode
   * @returns {boolean} - True if fullscreen
   */
  isActive() {
    return !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
  }

  /**
   * Enter fullscreen mode
   * @returns {Promise} - Fullscreen request promise
   */
  enter() {
    const {
      container
    } = this.presentation;
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
      isFullscreen: this.isFullscreen
    });
  }

  /**
   * Destroy fullscreen handler
   */
  destroy() {
    document.removeEventListener('fullscreenchange', this.boundFullscreenChange);
    document.removeEventListener('webkitfullscreenchange', this.boundFullscreenChange);
    document.removeEventListener('mozfullscreenchange', this.boundFullscreenChange);
    document.removeEventListener('MSFullscreenChange', this.boundFullscreenChange);

    // Exit fullscreen if active
    if (this.isActive()) {
      this.exit();
    }
  }
}

/**
 * Export - Export presentation to various formats
 * @module utils/export
 */

/**
 * Export utility class
 */
class ExportUtil {
  constructor(presentation) {
    let config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    this.presentation = presentation;
    this.config = config;
  }

  /**
   * Export presentation to PDF
   * Uses browser's print functionality
   */
  toPDF() {
    if (!this.config.export || this.config.export.pdf === false) {
      console.warn('PDF export is disabled');
      return;
    }

    // Store current state
    const {
      currentSlide
    } = this.presentation.state;

    // Add print class to container
    this.presentation.container.classList.add('swd-print-mode');

    // Show all slides
    const slides = this.presentation.container.querySelectorAll('.swd-slide');
    slides.forEach(slide => {
      slide.classList.add('swd-print-slide');
      slide.classList.remove('past', 'future', 'active');
    });

    // Emit before export event
    this.presentation.emit('beforeExportPDF');

    // Trigger print dialog
    setTimeout(() => {
      window.print();

      // Restore state after print dialog closes
      setTimeout(() => {
        this.presentation.container.classList.remove('swd-print-mode');
        slides.forEach(slide => {
          slide.classList.remove('swd-print-slide');
        });

        // Restore current slide
        this.presentation.navigation.updateSlideDisplay(currentSlide);
        this.presentation.emit('afterExportPDF');
      }, 100);
    }, 100);
  }

  /**
   * Export presentation to standalone HTML
   * @returns {Promise<string>} - HTML content
   */
  async toHTML() {
    if (!this.config.export || this.config.export.html === false) {
      console.warn('HTML export is disabled');
      return null;
    }
    this.presentation.emit('beforeExportHTML');

    // Get container HTML
    const containerHTML = this.presentation.container.outerHTML;

    // Get all CSS
    const styles = this.getInlineStyles();

    // Get SWD script (simplified version)
    const script = await this.getInlineScript();

    // Build complete HTML
    const html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>SWD Presentation</title>\n  <style>\n".concat(styles, "\n  </style>\n</head>\n<body>\n").concat(containerHTML, "\n").concat(script, "\n</body>\n</html>");
    this.presentation.emit('afterExportHTML', {
      html
    });
    return html;
  }

  /**
   * Download HTML file
   */
  async downloadHTML() {
    const html = await this.toHTML();
    if (!html) return;
    const blob = new Blob([html], {
      type: 'text/html'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'presentation.html';
    link.click();
    URL.revokeObjectURL(url);
  }

  /**
   * Export presentation data to JSON
   * @returns {Object} - JSON data
   */
  toJSON() {
    if (!this.config.export || this.config.export.json === false) {
      console.warn('JSON export is disabled');
      return null;
    }
    this.presentation.emit('beforeExportJSON');
    const data = {
      config: {
        theme: this.config.theme,
        transition: this.config.transition,
        transitionSpeed: this.config.transitionSpeed,
        aspectRatio: this.config.aspectRatio
      },
      slides: this.presentation.state.slides.map(slide => ({
        index: slide.index,
        layout: slide.layout,
        background: slide.background,
        overlay: slide.overlay,
        content: slide.content,
        attributes: slide.attributes
      })),
      metadata: {
        totalSlides: this.presentation.state.slides.length,
        exportDate: new Date().toISOString(),
        version: '1.0.0'
      }
    };
    this.presentation.emit('afterExportJSON', {
      data
    });
    return data;
  }

  /**
   * Download JSON file
   */
  downloadJSON() {
    const data = this.toJSON();
    if (!data) return;
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'presentation.json';
    link.click();
    URL.revokeObjectURL(url);
  }

  /**
   * Get inline styles from stylesheets
   * @returns {string} - CSS content
   */
  getInlineStyles() {
    let styles = '';
    try {
      Array.from(document.styleSheets).forEach(sheet => {
        try {
          // Inline rules if they belong to swd.css or same-origin styles
          if (!sheet.href || sheet.href.includes('swd.css') || sheet.href.startsWith(window.location.origin)) {
            const rules = Array.from(sheet.cssRules || sheet.rules);
            rules.forEach(rule => {
              styles += "".concat(rule.cssText, "\n");
            });
          }
        } catch (e) {
          // Silent catch for cross-origin sheet access constraints
        }
      });
    } catch (e) {
      console.warn('Error reading stylesheet rules:', e);
    }

    // Get inline style tags
    const styleTags = document.querySelectorAll('style');
    styleTags.forEach(style => {
      styles += "".concat(style.textContent, "\n");
    });
    return styles;
  }

  /**
   * Get inline script asynchronously
   * @returns {Promise<string>} - Script tag string
   */
  async getInlineScript() {
    const config = JSON.stringify(this.config, null, 2);
    let scriptContent = '';
    const scripts = document.querySelectorAll('script');
    for (const script of Array.from(scripts)) {
      if (script.src && script.src.includes('swd.js')) {
        try {
          const response = await fetch(script.src);
          if (response.ok) {
            scriptContent = await response.text();
            break;
          }
        } catch (e) {
          // Fail gracefully to fallback
        }
      }
    }
    if (!scriptContent) {
      scriptContent = "// SWD Library Fallback (Static view only)\nconsole.warn('SWD library javascript was not inlined');";
    }
    return "<script>\n".concat(scriptContent, "\n(function() {\n  const container = document.querySelector('[data-swd-id]') || document.body.firstElementChild;\n  if (container && typeof SWD !== 'undefined') {\n    new SWD(container, ").concat(config, ");\n  }\n})();\n</script>");
  }

  /**
   * Create export UI (optional helper)
   * @returns {HTMLElement} - Export button container
   */
  createExportUI() {
    const container = document.createElement('div');
    container.className = 'swd-export-ui';
    container.style.cssText = "\n      position: fixed;\n      bottom: 20px;\n      left: 20px;\n      display: flex;\n      gap: 10px;\n      z-index: 1000;\n    ";
    const buttonStyle = "\n      padding: 10px 20px;\n      background: #0066cc;\n      color: white;\n      border: none;\n      border-radius: 5px;\n      cursor: pointer;\n      font-size: 14px;\n    ";

    // PDF export button
    const pdfBtn = document.createElement('button');
    pdfBtn.textContent = 'Export to PDF';
    pdfBtn.style.cssText = buttonStyle;
    pdfBtn.onclick = () => this.toPDF();
    container.appendChild(pdfBtn);

    // HTML export button
    const htmlBtn = document.createElement('button');
    htmlBtn.textContent = 'Export to HTML';
    htmlBtn.style.cssText = buttonStyle;
    htmlBtn.onclick = () => this.downloadHTML();
    container.appendChild(htmlBtn);

    // JSON export button
    const jsonBtn = document.createElement('button');
    jsonBtn.textContent = 'Export to JSON';
    jsonBtn.style.cssText = buttonStyle;
    jsonBtn.onclick = () => this.downloadJSON();
    container.appendChild(jsonBtn);
    return container;
  }
}

/**
 * SenangWebs Deck - Transitions Utility
 * Handles slide transition animations
 */

/**
 * Available transition types
 */
const TransitionTypes = {
  NONE: 'none',
  SLIDE: 'slide',
  FADE: 'fade',
  ZOOM: 'zoom',
  FLIP: 'flip'
};

/**
 * Transition speeds in milliseconds
 */
const TransitionSpeeds = {
  SLOW: 800,
  NORMAL: 500,
  FAST: 300
};

/**
 * Transition Utility Class
 */
class Transitions {
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
    const {
      wrapper
    } = this.presentation;
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
  async applyTransition(oldSlide, newSlide) {
    let direction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'forward';
    if (this.isTransitioning) {
      return Promise.resolve();
    }

    // No transition if type is 'none'
    if (this.currentTransition === TransitionTypes.NONE) {
      return this.noTransition(oldSlide, newSlide);
    }
    this.isTransitioning = true;
    this.presentation.emit('transitionStart', {
      oldSlide,
      newSlide,
      direction
    });
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
      this.presentation.emit('transitionEnd', {
        oldSlide,
        newSlide,
        direction
      });
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
    return new Promise(resolve => {
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
    return new Promise(resolve => {
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
    return new Promise(resolve => {
      const zoomClass = direction === 'forward' ? 'zoom-in' : 'zoom-out';

      // Set initial states
      if (oldSlide) {
        oldSlide.classList.add('swd-zoom-out');
      }
      if (newSlide) {
        newSlide.classList.remove('swd-slide-hidden');
        newSlide.classList.add("swd-".concat(zoomClass), 'swd-transition-in');
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
          newSlide.classList.remove("swd-".concat(zoomClass), 'swd-transition-in');
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
    return new Promise(resolve => {
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
      const {
        wrapper
      } = this.presentation;
      if (wrapper) {
        wrapper.setAttribute('data-transition', type);
      }
      this.presentation.emit('transitionChanged', {
        type
      });
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
    const {
      wrapper
    } = this.presentation;
    if (wrapper) {
      wrapper.setAttribute('data-transition-speed', this.getSpeedClass());
      wrapper.style.setProperty('--swd-transition-speed', "".concat(this.transitionSpeed, "ms"));
    }
    this.presentation.emit('transitionSpeedChanged', {
      speed: this.transitionSpeed
    });
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

/**
 * Controls - Navigation controls UI
 * @module utils/controls
 */

/**
 * Controls class - Renders and manages navigation arrows
 */
class Controls {
  constructor(presentation) {
    let config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
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
    const {
      wrapper
    } = this.presentation;
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
    prevButton.innerHTML = "\n      <svg viewBox=\"0 0 24 24\" width=\"24\" height=\"24\">\n        <path fill=\"currentColor\" d=\"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z\"/>\n      </svg>\n    ";

    // Create next button
    const nextButton = document.createElement('button');
    nextButton.className = 'swd-control-next';
    nextButton.setAttribute('aria-label', 'Next slide');
    nextButton.innerHTML = "\n      <svg viewBox=\"0 0 24 24\" width=\"24\" height=\"24\">\n        <path fill=\"currentColor\" d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\"/>\n      </svg>\n    ";

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
      prevButton.addEventListener('click', e => {
        e.preventDefault();
        this.presentation.prev();
      });
    }
    if (nextButton) {
      nextButton.addEventListener('click', e => {
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
    const {
      currentSlide,
      slides
    } = this.presentation.state;
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

/**
 * Progress Bar - Visual progress indicator
 * @module utils/progress
 */

/**
 * Progress class - Renders and updates progress bar
 */
class Progress {
  constructor(presentation) {
    let config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    this.presentation = presentation;
    this.config = config;
    this.progressElement = null;
    this.progressBar = null;
    this.slideNumberElement = null;
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
    const {
      wrapper
    } = this.presentation;
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

    // Create slide numbers element if configured
    if (this.config.slideNumbers !== false) {
      this.slideNumberElement = document.createElement('div');
      this.slideNumberElement.className = 'swd-slide-number';
      wrapper.appendChild(this.slideNumberElement);
    }

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
    const {
      currentSlide,
      slides
    } = this.presentation.state;
    const totalSlides = slides.length;
    if (totalSlides === 0) return;

    // Calculate progress percentage
    const progress = (currentSlide + 1) / totalSlides * 100;

    // Update progress bar width
    this.progressBar.style.width = "".concat(progress, "%");

    // Update ARIA attributes
    this.progressBar.setAttribute('aria-valuenow', Math.round(progress));
    this.progressBar.setAttribute('aria-valuetext', "Slide ".concat(currentSlide + 1, " of ").concat(totalSlides));

    // Update slide number UI
    if (this.slideNumberElement) {
      const format = this.config.slideNumberFormat || 'h/v';
      let text = '';
      switch (format) {
        case 'c/t':
        case 'h/v':
          text = "".concat(currentSlide + 1, " / ").concat(totalSlides);
          break;
        case 'c':
          text = "".concat(currentSlide + 1);
          break;
        case 'h.v':
          text = "".concat(currentSlide + 1, ".").concat(totalSlides);
          break;
        default:
          text = "".concat(currentSlide + 1, " / ").concat(totalSlides);
      }
      this.slideNumberElement.textContent = text;
    }
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
    this.progressBar.style.width = "".concat(clampedProgress, "%");
    this.progressBar.setAttribute('aria-valuenow', Math.round(clampedProgress));
  }

  /**
   * Cleanup
   */
  destroy() {
    if (this.progressElement && this.progressElement.parentNode) {
      this.progressElement.parentNode.removeChild(this.progressElement);
    }
    if (this.slideNumberElement && this.slideNumberElement.parentNode) {
      this.slideNumberElement.parentNode.removeChild(this.slideNumberElement);
    }
    this.progressElement = null;
    this.progressBar = null;
    this.slideNumberElement = null;
  }
}

/**
 * Overview - Overview grid mode
 * @module utils/overview
 */
class Overview {
  constructor(presentation) {
    let config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
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
    const {
      container,
      wrapper
    } = this.presentation;
    if (wrapper) {
      wrapper.classList.add('swd-overview-mode');
    }

    // Bind click listener to slides
    const slides = container.querySelectorAll('.swd-slide');
    slides.forEach(slide => {
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
    const {
      container,
      wrapper
    } = this.presentation;
    if (wrapper) {
      wrapper.classList.remove('swd-overview-mode');
    }
    const slides = container.querySelectorAll('.swd-slide');
    slides.forEach(slide => {
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

/**
 * Main SWD Class - Primary API interface
 */
class SWD extends EventEmitter {
  /**
   * Create a new presentation
   * @param {string|HTMLElement} container - Container selector or element
   * @param {Object} options - Configuration options
   */
  constructor(container) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    super();

    // Resolve container
    this.container = typeof container === 'string' ? document.querySelector(container) : container;
    if (!this.container) {
      throw new Error('SWD: Container element not found');
    }

    // Merge configuration
    this.config = mergeConfig(DefaultConfig, options);

    // Map autoplay data attributes to autoSlide
    if (this.config.autoplay && this.config.autoSlide === 0) {
      this.config.autoSlide = this.config.autoplayDelay || 3000;
    }

    // Initialize state
    this.state = {
      initialized: false,
      slides: [],
      currentSlide: 0,
      isPlaying: false,
      isFullscreen: false,
      isOverview: false
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
    this.overview = null;

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
      this.state.slides = await this.parser.parse(this.config.source, this.container);

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

      // Initialize overview utility
      this.overview = new Overview(this, this.config);
      this.overview.init();

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
    return this.navigation.goTo(index);
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
    if (!this.state.initialized || !this.exportUtil) return null;
    return this.exportUtil.toHTML();
  }

  /**
   * Export to JSON
   */
  exportJSON() {
    if (!this.state.initialized || !this.exportUtil) return null;
    return this.exportUtil.toJSON();
  }

  /**
   * Download HTML file
   */
  downloadHTML() {
    if (!this.state.initialized || !this.exportUtil) return null;
    return this.exportUtil.downloadHTML();
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

    // Cleanup overview mode
    if (this.overview) {
      this.overview.destroy();
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
      isOverview: false
    };

    // Remove all event listeners
    this.offAll();
    this.emit('afterDestroy');
    if (this.config.dev) ;
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
    return _objectSpread2({}, this.state);
  }

  /**
   * Auto-initialize all presentations on page
   * @param {string} selector - Container selector (default: '[data-swd-id]')
   * @param {Object} options - Default options for all presentations
   */
  static autoInit() {
    let selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '[data-swd-id]';
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const containers = document.querySelectorAll(selector);
    const instances = [];
    containers.forEach(container => {
      // Read configuration from data attributes
      const dataConfig = SWD.readDataAttributes(container);

      // Merge options: defaults < data attributes < passed options
      const config = _objectSpread2(_objectSpread2({}, dataConfig), options);
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
    const {
      dataset
    } = element;

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

export { SWD as default };
//# sourceMappingURL=swd.esm.js.map
