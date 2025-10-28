/**
 * Quote Layout - Large quote display
 * @module layouts/quote
 */

const quoteLayout = {
  /**
   * Render quote layout
   * @param {Object} slideData - Slide data
   * @returns {HTMLElement} - Rendered content
   */
  render(slideData) {
    const content = document.createElement('div');
    content.className = 'swd-slide-content swd-layout-quote';

    // Check if quote and author are provided separately
    if (slideData.quote) {
      const blockquote = document.createElement('blockquote');
      blockquote.className = 'swd-quote-text';
      blockquote.textContent = slideData.quote;
      content.appendChild(blockquote);

      if (slideData.author) {
        const cite = document.createElement('cite');
        cite.className = 'swd-quote-author';
        cite.textContent = `— ${slideData.author}`;
        content.appendChild(cite);
      }
    } else {
      // Use full content
      content.innerHTML = slideData.content;
    }

    return content;
  },
};

export default quoteLayout;
