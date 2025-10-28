/**
 * Export - Export presentation to various formats
 * @module utils/export
 */

/**
 * Export utility class
 */
class ExportUtil {
  constructor(presentation, config = {}) {
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
    const { currentSlide } = this.presentation.state;

    // Add print class to container
    this.presentation.container.classList.add('swd-print-mode');

    // Show all slides
    const slides = this.presentation.container.querySelectorAll('.swd-slide');
    slides.forEach((slide) => {
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
        slides.forEach((slide) => {
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
   * @returns {string} - HTML content
   */
  toHTML() {
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
    const script = this.getInlineScript();

    // Build complete HTML
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SWD Presentation</title>
  <style>
${styles}
  </style>
</head>
<body>
${containerHTML}
${script}
</body>
</html>`;

    this.presentation.emit('afterExportHTML', { html });

    return html;
  }

  /**
   * Download HTML file
   */
  downloadHTML() {
    const html = this.toHTML();
    if (!html) return;

    const blob = new Blob([html], { type: 'text/html' });
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
        aspectRatio: this.config.aspectRatio,
      },
      slides: this.presentation.state.slides.map((slide) => ({
        index: slide.index,
        layout: slide.layout,
        background: slide.background,
        overlay: slide.overlay,
        content: slide.content,
        attributes: slide.attributes,
      })),
      metadata: {
        totalSlides: this.presentation.state.slides.length,
        exportDate: new Date().toISOString(),
        version: '1.0.0',
      },
    };

    this.presentation.emit('afterExportJSON', { data });

    return data;
  }

  /**
   * Download JSON file
   */
  downloadJSON() {
    const data = this.toJSON();
    if (!data) return;

    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
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

    // Get styles from link tags
    const links = document.querySelectorAll('link[rel="stylesheet"]');
    links.forEach((link) => {
      if (link.href.includes('swd.css')) {
        // Would need to fetch and inline the CSS
        // For now, we'll use a placeholder
        styles += '/* SWD styles would be inlined here */\n';
      }
    });

    // Get inline styles
    const styleTags = document.querySelectorAll('style');
    styleTags.forEach((style) => {
      styles += `${style.textContent}\n`;
    });

    return styles;
  }

  /**
   * Get inline script
   * @returns {string} - Script content
   */
  getInlineScript() {
    const config = JSON.stringify(this.config, null, 2);

    return `<script>
  // SWD initialization
  (function() {
    const config = ${config};
    // SWD library would be inlined here
    console.log('SWD Presentation loaded');
  })();
</script>`;
  }

  /**
   * Create export UI (optional helper)
   * @returns {HTMLElement} - Export button container
   */
  createExportUI() {
    const container = document.createElement('div');
    container.className = 'swd-export-ui';
    container.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 20px;
      display: flex;
      gap: 10px;
      z-index: 1000;
    `;

    const buttonStyle = `
      padding: 10px 20px;
      background: #0066cc;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
    `;

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

export default ExportUtil;
