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
    const slides = data.slides.map((slideData, index) =>
      this.parseSlide(slideData, index)
    );

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
        throw new Error(`Failed to load JSON: ${response.statusText}`);
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
      attributes: {},
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
        normalized.content = `${normalized.left}::right::${normalized.right}`;
        break;

      case 'three-cols':
        normalized.columns = [
          this.buildContent(slideData.col1),
          this.buildContent(slideData.col2),
          this.buildContent(slideData.col3),
        ];
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
    Object.keys(slideData).forEach((key) => {
      if (
        ![
          'layout',
          'content',
          'background',
          'overlay',
          'left',
          'right',
          'col1',
          'col2',
          'col3',
          'quote',
          'author',
          'image',
          'imageAlt',
        ].includes(key)
      ) {
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
      html += `<h1>${this.escapeHTML(slideData.title)}</h1>`;
    }
    if (slideData.subtitle) {
      html += `<p>${this.escapeHTML(slideData.subtitle)}</p>`;
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
    let html = `<blockquote>${this.escapeHTML(normalized.quote)}</blockquote>`;
    if (normalized.author) {
      html += `<cite>${this.escapeHTML(normalized.author)}</cite>`;
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
      return this.escapeHTML(content);
    }

    if (Array.isArray(content)) {
      // Array of strings/objects
      return content.map((item) => this.buildContentItem(item)).join('');
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
      return `<p>${this.escapeHTML(item)}</p>`;
    }

    if (item.type === 'heading') {
      const level = item.level || 2;
      return `<h${level}>${this.escapeHTML(item.text)}</h${level}>`;
    }

    if (item.type === 'paragraph') {
      return `<p>${this.escapeHTML(item.text)}</p>`;
    }

    if (item.type === 'list') {
      const tag = item.ordered ? 'ol' : 'ul';
      const items = (item.items || [])
        .map((li) => `<li>${this.escapeHTML(li)}</li>`)
        .join('');
      return `<${tag}>${items}</${tag}>`;
    }

    if (item.type === 'code') {
      const lang = item.language || '';
      return `<pre><code class="language-${lang}">${this.escapeHTML(
        item.code
      )}</code></pre>`;
    }

    if (item.type === 'image') {
      const alt = this.escapeHTML(item.alt || '');
      return `<img src="${this.escapeHTML(item.src)}" alt="${alt}">`;
    }

    if (item.type === 'video') {
      const controls = item.controls ? 'controls' : '';
      const autoplay = item.autoplay ? 'autoplay' : '';
      return `<video src="${this.escapeHTML(
        item.src
      )}" ${controls} ${autoplay}></video>`;
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
      tableData.headers.forEach((header) => {
        html += `<th>${this.escapeHTML(header)}</th>`;
      });
      html += '</tr></thead>';
    }

    if (tableData.rows) {
      html += '<tbody>';
      tableData.rows.forEach((row) => {
        html += '<tr>';
        row.forEach((cell) => {
          html += `<td>${this.escapeHTML(cell)}</td>`;
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
}

export default JsonParser;
