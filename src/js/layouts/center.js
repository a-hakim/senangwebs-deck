/**
 * Center Layout - Centered content
 * @module layouts/center
 */

const centerLayout = {
  /**
   * Render center layout
   * @param {Object} slideData - Slide data
   * @returns {HTMLElement} - Rendered content
   */
  render(slideData) {
    const content = document.createElement('div');
    content.className = 'swd-slide-content swd-layout-center';
    content.innerHTML = slideData.content;
    return content;
  },
};

export default centerLayout;
