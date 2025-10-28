/**
 * Default Layout - Single column content
 * @module layouts/default
 */

const defaultLayout = {
  /**
   * Render default layout
   * @param {Object} slideData - Slide data
   * @returns {HTMLElement} - Rendered content
   */
  render(slideData) {
    const content = document.createElement('div');
    content.className = 'swd-slide-content swd-layout-default';
    content.innerHTML = slideData.content;
    return content;
  },
};

export default defaultLayout;
