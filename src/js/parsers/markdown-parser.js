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
    // Normalize line endings
    const normalized = markdown.replace(/\r\n/g, '\n').trim();
    
    // Split by horizontal rule (---) with surrounding whitespace
    // This is now unambiguous as we use HTML comments for metadata
    const slides = normalized.split(/\n---\n+/);
    
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
    slideData.attributes = { ...frontmatter };

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
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
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
    slideData.columns = [
      marked.parse((parts[0] || '').trim()),
      marked.parse((parts[1] || '').trim()),
      marked.parse((parts[2] || '').trim()),
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
