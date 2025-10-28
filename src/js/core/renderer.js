/**
 * Renderer - Slide renderer
 * @module core/renderer
 */

import layouts from '../layouts/index.js';

/**
 * Renderer class - converts slide data to DOM
 */
class Renderer {
  constructor(config) {
    this.config = config;
  }

  /**
   * Render all slides
   * @param {HTMLElement} container - Container element
   * @param {Array} slides - Array of slide data
   */
  render(container, slides) {
    // Clear container
    container.innerHTML = '';

    // Create slide wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'swd-wrapper';

    // Create slides container
    const slidesContainer = document.createElement('div');
    slidesContainer.className = 'swd-slides';

    // Render each slide
    slides.forEach((slideData, index) => {
      const slideElement = this.renderSlide(slideData, index);
      slidesContainer.appendChild(slideElement);
    });

    wrapper.appendChild(slidesContainer);
    container.appendChild(wrapper);

    // Apply theme
    container.classList.add(`swd-theme-${this.config.theme}`);
  }

  /**
   * Render a single slide
   * @param {Object} slideData - Slide data
   * @param {number} index - Slide index
   * @returns {HTMLElement} - Rendered slide element
   */
  renderSlide(slideData, index) {
    const slide = document.createElement('div');
    slide.className = 'swd-slide';
    slide.setAttribute('data-index', index);
    slide.setAttribute('data-layout', slideData.layout || 'default');

    // Add initial state classes
    if (index === 0) {
      slide.classList.add('swd-slide-active', 'active');
    } else {
      slide.classList.add('swd-slide-hidden', 'future');
    }

    // Apply background
    if (slideData.background) {
      const bg = document.createElement('div');
      bg.className = 'swd-slide-background';
      
      // Check if background is a URL or CSS value (gradient, color, etc.)
      if (slideData.background.match(/^(https?:\/\/|\.\/|\.\.\/|\/)/)) {
        // It's a URL, use backgroundImage
        bg.style.backgroundImage = `url(${slideData.background})`;
      } else {
        // It's a CSS value (gradient, color, etc.), use background
        bg.style.background = slideData.background;
      }
      
      slide.appendChild(bg);
    }

    // Get layout renderer
    const layoutName = slideData.layout || 'default';
    const layoutRenderer = layouts[layoutName];

    if (!layoutRenderer) {
      throw new Error(`Unknown layout: ${layoutName}`);
    }

    // Render layout content
    const content = layoutRenderer.render(slideData);
    slide.appendChild(content);

    return slide;
  }

  /**
   * Cleanup renderer
   */
  destroy() {
    // Cleanup code will be added as needed
  }
}

export default Renderer;
