/**
 * Two Columns Layout - Split left/right content
 * @module layouts/two-cols
 */

const twoColsLayout = {
  /**
   * Render two columns layout
   * @param {Object} slideData - Slide data
   * @returns {HTMLElement} - Rendered content
   */
  render(slideData) {
    const content = document.createElement('div');
    content.className = 'swd-slide-content swd-layout-two-cols';

    // Check if content has columns array (from data-swd-column attributes)
    if (slideData.columns && Array.isArray(slideData.columns) && slideData.columns.length >= 2) {
      const [leftContent, rightContent] = slideData.columns;
      
      const leftCol = document.createElement('div');
      leftCol.className = 'swd-col swd-col-left';
      leftCol.innerHTML = leftContent;

      const rightCol = document.createElement('div');
      rightCol.className = 'swd-col swd-col-right';
      rightCol.innerHTML = rightContent;

      content.appendChild(leftCol);
      content.appendChild(rightCol);
    } else if (slideData.left && slideData.right) {
      // Check if content has left/right data
      const leftCol = document.createElement('div');
      leftCol.className = 'swd-col swd-col-left';
      leftCol.innerHTML = slideData.left;

      const rightCol = document.createElement('div');
      rightCol.className = 'swd-col swd-col-right';
      rightCol.innerHTML = slideData.right;

      content.appendChild(leftCol);
      content.appendChild(rightCol);
    } else {
      // Parse content for ::right:: marker
      const contentStr = slideData.content || '';
      const parts = contentStr.split('::right::');

      const leftCol = document.createElement('div');
      leftCol.className = 'swd-col swd-col-left';
      leftCol.innerHTML = parts[0] || '';

      const rightCol = document.createElement('div');
      rightCol.className = 'swd-col swd-col-right';
      rightCol.innerHTML = parts[1] || '';

      content.appendChild(leftCol);
      content.appendChild(rightCol);
    }

    return content;
  },
};

export default twoColsLayout;
