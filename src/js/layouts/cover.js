/**
 * Cover Layout - Full-screen title slide
 * @module layouts/cover
 */

const coverLayout = {
  /**
   * Render cover layout
   * @param {Object} slideData - Slide data
   * @returns {HTMLElement} - Rendered content
   */
  render(slideData) {
    const content = document.createElement('div');
    content.className = 'swd-slide-content swd-layout-cover';
    content.innerHTML = slideData.content;
    return content;
  },
};

export default coverLayout;
