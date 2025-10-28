/**
 * Parser - Content parser factory
 * @module core/parser
 */

import HtmlParser from '../parsers/html-parser.js';
import MarkdownParser from '../parsers/markdown-parser.js';
import JsonParser from '../parsers/json-parser.js';

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
        throw new Error(`Unknown source type: ${source}`);
    }
  }
}

export default Parser;
