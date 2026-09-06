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

        // Set RTL if configured
        if (this.config.rtl) {
            wrapper.setAttribute('dir', 'rtl');
            wrapper.classList.add('swd-rtl');
        }

        // Apply aspect ratio if configured
        if (this.config.aspectRatio) {
            wrapper.setAttribute('data-aspect-ratio', this.config.aspectRatio);
        }

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

        // Get layout renderer (fall back to default layout for unknown names)
        const layoutName = slideData.layout || 'default';
        let layoutRenderer = layouts[layoutName];

        if (!layoutRenderer) {
            // eslint-disable-next-line no-console
            console.warn(
                `SWD: Unknown layout "${layoutName}" on slide ${index}. Falling back to "default".`
            );
            layoutRenderer = layouts.default;
        }

        // Render layout content
        const content = layoutRenderer.render(slideData);
        slide.appendChild(content);

        // Apply overlay (parsed from all sources, rendered on top of background)
        if (slideData.overlay) {
            const overlay = document.createElement('div');
            overlay.className = 'swd-slide-overlay';
            overlay.innerHTML = slideData.overlay;
            slide.appendChild(overlay);
        }

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
