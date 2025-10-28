/**
 * Section Layout - Section divider slide
 * @module layouts/section
 */

const sectionLayout = {
  /**
   * Render section layout
   * @param {Object} slideData - Slide data
   * @returns {HTMLElement} - Rendered content
   */
  render(slideData) {
    const content = document.createElement('div');
    content.className = 'swd-slide-content swd-layout-section';
    content.innerHTML = slideData.content;
    return content;
  },
};

export default sectionLayout;
