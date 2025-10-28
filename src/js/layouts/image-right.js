/**
 * Image Right Layout - Content left, image right
 * @module layouts/image-right
 */

const imageRightLayout = {
  /**
   * Render image-right layout
   * @param {Object} slideData - Slide data
   * @returns {HTMLElement} - Rendered content
   */
  render(slideData) {
    const content = document.createElement('div');
    content.className = 'swd-slide-content swd-layout-image-right';

    const textCol = document.createElement('div');
    textCol.className = 'swd-col swd-col-text';

    const imageCol = document.createElement('div');
    imageCol.className = 'swd-col swd-col-image';

    // Check if image and text are provided separately
    if (slideData.image) {
      textCol.innerHTML = slideData.content || '';

      const img = document.createElement('img');
      img.src = slideData.image;
      img.alt = slideData.imageAlt || '';
      imageCol.appendChild(img);
    } else {
      // Parse content for image tag
      const contentStr = slideData.content || '';
      const imgMatch = contentStr.match(/<img[^>]+>/);

      if (imgMatch) {
        const textContent = contentStr.replace(imgMatch[0], '');
        textCol.innerHTML = textContent;
        imageCol.innerHTML = imgMatch[0];
      } else {
        textCol.innerHTML = contentStr;
      }
    }

    content.appendChild(textCol);
    content.appendChild(imageCol);

    return content;
  },
};

export default imageRightLayout;
