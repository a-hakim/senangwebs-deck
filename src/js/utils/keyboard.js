/**
 * Keyboard Handler - Keyboard event management
 * @module utils/keyboard
 */

/**
 * Default keyboard shortcuts
 */
export const defaultShortcuts = {
  ArrowRight: 'next',
  ArrowDown: 'next',
  ArrowLeft: 'prev',
  ArrowUp: 'prev',
  Space: 'next',
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
  Escape: 'escape',
};

/**
 * Keyboard Handler class
 */
class KeyboardHandler {
  constructor(presentation, config = {}) {
    this.presentation = presentation;
    this.config = config;
    this.enabled = true;
    this.shortcuts = { ...defaultShortcuts, ...config.keyboardShortcuts };
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
    const tagName = target.tagName.toLowerCase();
    return (
      tagName === 'input' ||
      tagName === 'textarea' ||
      tagName === 'select' ||
      target.isContentEditable
    );
  }

  /**
   * Get key identifier from event
   * @param {KeyboardEvent} event - Keyboard event
   * @returns {string} - Key identifier
   */
  getKeyIdentifier(event) {
    // Handle special keys with modifiers
    if (event.shiftKey && event.key !== 'Shift') {
      return `Shift+${event.key}`;
    }
    if (event.ctrlKey && event.key !== 'Control') {
      return `Ctrl+${event.key}`;
    }
    if (event.altKey && event.key !== 'Alt') {
      return `Alt+${event.key}`;
    }
    if (event.metaKey && event.key !== 'Meta') {
      return `Meta+${event.key}`;
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
        this.presentation.emit('keyboardAction', { action, event });
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

export default KeyboardHandler;
