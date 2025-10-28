/**
 * Markdown Parser - Parse Markdown to slides
 * @module parsers/markdown-parser
 */

import { marked } from 'marked';

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
      mangle: false,
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
    const slides = slideTexts.map((slideText, index) =>
      this.parseSlide(slideText, index)
    );

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
        throw new Error(`Failed to load markdown: ${response.statusText}`);
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
    // Split by horizontal rule (---)
    const slides = markdown.split(/\n---\n/);
    return slides.filter((slide) => slide.trim().length > 0);
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
      attributes: {},
    };

    // Parse frontmatter if present
    const { frontmatter, content } = this.parseFrontmatter(slideText);

    // Apply frontmatter data
    if (frontmatter.layout) {
      slideData.layout = frontmatter.layout;
    }
    if (frontmatter.background) {
      slideData.background = frontmatter.background;
    }
    if (frontmatter.overlay) {
      slideData.overlay = frontmatter.overlay;
    }

    // Copy all frontmatter to attributes
    slideData.attributes = { ...frontmatter };

    // Parse content based on layout
    if (slideData.layout === 'two-cols') {
      this.parseTwoColumns(content, slideData);
    } else if (slideData.layout === 'three-cols') {
      this.parseThreeColumns(content, slideData);
    } else if (slideData.layout === 'quote') {
      this.parseQuote(content, slideData);
    } else if (slideData.layout === 'image-right' || slideData.layout === 'image-left') {
      this.parseImageLayout(content, slideData);
    } else {
      // Default: convert markdown to HTML
      slideData.content = marked.parse(content);
    }

    return slideData;
  }

  /**
   * Parse frontmatter from slide text
   * @param {string} slideText - Slide text with optional frontmatter
   * @returns {Object} - { frontmatter, content }
   */
  parseFrontmatter(slideText) {
    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = slideText.match(frontmatterRegex);

    if (match) {
      const frontmatterText = match[1];
      const content = match[2];
      const frontmatter = this.parseFrontmatterYAML(frontmatterText);
      return { frontmatter, content };
    }

    return { frontmatter: {}, content: slideText };
  }

  /**
   * Parse YAML-like frontmatter
   * @param {string} text - Frontmatter text
   * @returns {Object} - Parsed frontmatter
   */
  parseFrontmatterYAML(text) {
    const frontmatter = {};
    const lines = text.split('\n');

    lines.forEach((line) => {
      const match = line.match(/^(\w+):\s*(.+)$/);
      if (match) {
        const key = match[1];
        let value = match[2].trim();

        // Remove quotes if present
        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1);
        }

        frontmatter[key] = value;
      }
    });

    return frontmatter;
  }

  /**
   * Parse two-column content
   * @param {string} content - Slide content
   * @param {Object} slideData - Slide data object to modify
   */
  parseTwoColumns(content, slideData) {
    // Support both ::right:: and :: right formats
    const parts = content.split(/::(\s*)right(\s*)::/i);
    slideData.left = marked.parse(parts[0] || '');
    slideData.right = marked.parse(parts[parts.length - 1] || '');
    // Don't include the marker in content
    slideData.content = '';
  }

  /**
   * Parse three-column content
   * @param {string} content - Slide content
   * @param {Object} slideData - Slide data object to modify
   */
  parseThreeColumns(content, slideData) {
    // Support formats like ::col-1::, ::col-2::, ::col-3:: or :: col-1, etc.
    const parts = content.split(/::(\s*)col-[123](\s*)::/i);
    // Filter out empty parts and capture group matches
    const filteredParts = parts.filter(part => 
      part && part.trim() && !part.match(/^\s*$/)
    );
    
    slideData.columns = [
      marked.parse(filteredParts[0] || ''),
      marked.parse(filteredParts[1] || ''),
      marked.parse(filteredParts[2] || ''),
    ];
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

    lines.forEach((line) => {
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

export default MarkdownParser;
