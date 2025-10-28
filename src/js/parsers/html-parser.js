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
        attributes: this.parseAttributes(element),
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

    columnElements.forEach((col) => {
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
    const { attributes } = element;

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

export default HtmlParser;
