/**
 * Markdown Parser - Parse Markdown to slides
 * @module parsers/markdown-parser
 */

/**
 * Markdown Parser class
 */
class MarkdownParser {
  constructor(config) {
    this.config = config;
  }

  /**
   * Parse Markdown slides
   * @param {HTMLElement} _container - Container element
   * @returns {Promise<Array>} - Array of slide data
   */
  async parse(_container) {
    // Placeholder - will implement with marked.js
    const slides = [
      {
        index: 0,
        layout: 'cover',
        content: '<h1>Markdown Parser</h1><p>Coming soon...</p>',
      },
    ];

    return slides;
  }
}

export default MarkdownParser;
