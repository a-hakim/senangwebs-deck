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
      this.events[event] = this.events[event].filter((h) => h !== handler);
    }

    if (this.onceEvents[event]) {
      this.onceEvents[event] = this.onceEvents[event].filter(
        (h) => h !== handler
      );
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
  emit(event, ...args) {
    // Call regular event handlers
    if (this.events[event]) {
      this.events[event].forEach((handler) => {
        try {
          handler(...args);
        } catch (error) {
          console.error(`Error in event handler for "${event}":`, error);
        }
      });
    }

    // Call once event handlers and then remove them
    if (this.onceEvents[event]) {
      const handlers = [...this.onceEvents[event]];
      delete this.onceEvents[event];

      handlers.forEach((handler) => {
        try {
          handler(...args);
        } catch (error) {
          console.error(`Error in once event handler for "${event}":`, error);
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

export default EventEmitter;
