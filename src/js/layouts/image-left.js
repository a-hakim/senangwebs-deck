/**
 * Image Left Layout - Image left, content right
 * @module layouts/image-left
 */

const imageLeftLayout = {
  /**
   * Render image-left layout
   * @param {Object} slideData - Slide data
   * @returns {HTMLElement} - Rendered content
   */
  render(slideData) {
    const content = document.createElement('div');
    content.className = 'swd-slide-content swd-layout-image-left';

    const imageCol = document.createElement('div');
    imageCol.className = 'swd-col swd-col-image';

    const textCol = document.createElement('div');
    textCol.className = 'swd-col swd-col-text';

    // Check if image and text are provided separately
    if (slideData.image) {
      const img = document.createElement('img');
      img.src = slideData.image;
      img.alt = slideData.imageAlt || '';
      imageCol.appendChild(img);

      textCol.innerHTML = slideData.content || '';
    } else {
      // Parse content for image tag
      const contentStr = slideData.content || '';
      const imgMatch = contentStr.match(/<img[^>]+>/);

      if (imgMatch) {
        const [imgTag] = imgMatch;
        imageCol.innerHTML = imgTag;
        const textContent = contentStr.replace(imgTag, '');
        textCol.innerHTML = textContent;
      } else {
        textCol.innerHTML = contentStr;
      }
    }

    content.appendChild(imageCol);
    content.appendChild(textCol);

    return content;
  },
};

export default imageLeftLayout;
