/**
 * Full Image Layout - Full-screen image with optional overlay text
 * @module layouts/full-image
 */

const fullImageLayout = {
  /**
   * Render full-image layout
   * @param {Object} slideData - Slide data
   * @returns {HTMLElement} - Rendered content
   */
  render(slideData) {
    const content = document.createElement('div');
    content.className = 'swd-slide-content swd-layout-full-image';

    // Add overlay text if provided
    if (slideData.content && slideData.content.trim()) {
      const overlay = document.createElement('div');
      overlay.className = 'swd-image-overlay-text';
      overlay.innerHTML = slideData.content;
      content.appendChild(overlay);
    }

    return content;
  },
};

export default fullImageLayout;
