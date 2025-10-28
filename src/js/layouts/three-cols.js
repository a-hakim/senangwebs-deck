/**
 * Three Columns Layout - Three equal columns
 * @module layouts/three-cols
 */

const threeColsLayout = {
  /**
   * Render three columns layout
   * @param {Object} slideData - Slide data
   * @returns {HTMLElement} - Rendered content
   */
  render(slideData) {
    const content = document.createElement('div');
    content.className = 'swd-slide-content swd-layout-three-cols';

    // Check if content has columns array
    if (slideData.columns && Array.isArray(slideData.columns)) {
      slideData.columns.forEach((colContent, index) => {
        const col = document.createElement('div');
        col.className = `swd-col swd-col-${index + 1}`;
        col.innerHTML = colContent;
        content.appendChild(col);
      });
    } else {
      // Parse content for ::col-N:: markers
      const contentStr = slideData.content || '';
      const parts = contentStr.split(/::col-[123]::/);

      // Create three columns
      for (let i = 0; i < 3; i += 1) {
        const col = document.createElement('div');
        col.className = `swd-col swd-col-${i + 1}`;
        col.innerHTML = parts[i + 1] || '';
        content.appendChild(col);
      }
    }

    return content;
  },
};

export default threeColsLayout;
