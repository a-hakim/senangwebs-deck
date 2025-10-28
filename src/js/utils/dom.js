/**
 * DOM Utilities - Helper functions for DOM manipulation
 * @module utils/dom
 */

/**
 * Create a new element with attributes and children
 * @param {string} tag - HTML tag name
 * @param {Object} attrs - Element attributes
 * @param {Array|string} children - Child elements or text
 * @returns {HTMLElement} - Created element
 */
export function createElement(tag, attrs = {}, children = []) {
  const element = document.createElement(tag);

  // Set attributes
  Object.keys(attrs).forEach((key) => {
    if (key === 'className') {
      element.className = attrs[key];
    } else if (key === 'style' && typeof attrs[key] === 'object') {
      Object.assign(element.style, attrs[key]);
    } else if (key.startsWith('data-')) {
      element.setAttribute(key, attrs[key]);
    } else {
      element[key] = attrs[key];
    }
  });

  // Add children
  if (typeof children === 'string') {
    element.textContent = children;
  } else if (Array.isArray(children)) {
    children.forEach((child) => {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else if (child instanceof HTMLElement) {
        element.appendChild(child);
      }
    });
  }

  return element;
}

/**
 * Add class to element
 * @param {HTMLElement} element - Target element
 * @param {string} className - Class name to add
 */
export function addClass(element, className) {
  if (element && className) {
    element.classList.add(className);
  }
}

/**
 * Remove class from element
 * @param {HTMLElement} element - Target element
 * @param {string} className - Class name to remove
 */
export function removeClass(element, className) {
  if (element && className) {
    element.classList.remove(className);
  }
}

/**
 * Toggle class on element
 * @param {HTMLElement} element - Target element
 * @param {string} className - Class name to toggle
 * @returns {boolean} - True if class is now present
 */
export function toggleClass(element, className) {
  if (element && className) {
    return element.classList.toggle(className);
  }
  return false;
}

/**
 * Check if element has class
 * @param {HTMLElement} element - Target element
 * @param {string} className - Class name to check
 * @returns {boolean} - True if class is present
 */
export function hasClass(element, className) {
  if (element && className) {
    return element.classList.contains(className);
  }
  return false;
}

/**
 * Get data attributes with specific prefix
 * @param {HTMLElement} element - Target element
 * @param {string} prefix - Attribute prefix (e.g., 'swd')
 * @returns {Object} - Object with attribute names and values
 */
export function getAttributes(element, prefix = 'swd') {
  const attrs = {};
  const dataPrefix = `data-${prefix}-`;

  if (!element || !element.attributes) {
    return attrs;
  }

  Array.from(element.attributes).forEach((attr) => {
    if (attr.name.startsWith(dataPrefix)) {
      const key = attr.name.replace(dataPrefix, '');
      attrs[key] = attr.value;
    }
  });

  return attrs;
}

/**
 * Parse HTML string to DOM element
 * @param {string} html - HTML string
 * @returns {HTMLElement|null} - Parsed element
 */
export function parseHTML(html) {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content.firstChild;
}

/**
 * Query selector wrapper
 * @param {string} selector - CSS selector
 * @param {HTMLElement} context - Context element (default: document)
 * @returns {HTMLElement|null} - Found element
 */
export function $(selector, context = document) {
  return context.querySelector(selector);
}

/**
 * Query selector all wrapper
 * @param {string} selector - CSS selector
 * @param {HTMLElement} context - Context element (default: document)
 * @returns {Array<HTMLElement>} - Array of found elements
 */
export function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

/**
 * Add event listener with optional delegation
 * @param {HTMLElement} element - Target element
 * @param {string} event - Event name
 * @param {string|Function} selectorOrHandler - CSS selector for delegation or handler
 * @param {Function} handler - Event handler (if using delegation)
 */
export function on(element, event, selectorOrHandler, handler) {
  if (typeof selectorOrHandler === 'function') {
    element.addEventListener(event, selectorOrHandler);
  } else {
    element.addEventListener(event, (e) => {
      if (e.target.matches(selectorOrHandler)) {
        handler.call(e.target, e);
      }
    });
  }
}

/**
 * Remove event listener
 * @param {HTMLElement} element - Target element
 * @param {string} event - Event name
 * @param {Function} handler - Event handler
 */
export function off(element, event, handler) {
  element.removeEventListener(event, handler);
}

/**
 * Get element's offset from document
 * @param {HTMLElement} element - Target element
 * @returns {Object} - {top, left, width, height}
 */
export function getOffset(element) {
  const rect = element.getBoundingClientRect();
  return {
    top: rect.top + window.scrollY,
    left: rect.left + window.scrollX,
    width: rect.width,
    height: rect.height,
  };
}

/**
 * Check if element is visible in viewport
 * @param {HTMLElement} element - Target element
 * @returns {boolean} - True if visible
 */
export function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Get computed style property
 * @param {HTMLElement} element - Target element
 * @param {string} property - CSS property name
 * @returns {string} - Property value
 */
export function getStyle(element, property) {
  return window.getComputedStyle(element).getPropertyValue(property);
}

/**
 * Set multiple styles at once
 * @param {HTMLElement} element - Target element
 * @param {Object} styles - Style properties and values
 */
export function setStyles(element, styles) {
  Object.assign(element.style, styles);
}
