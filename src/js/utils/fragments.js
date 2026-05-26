/**
 * Fragments - Sequential slide animations
 * @module utils/fragments
 */
class Fragments {
  constructor(presentation, config = {}) {
    this.presentation = presentation;
    this.config = config;
  }

  /**
   * Get sorted fragments of the slide
   * @param {HTMLElement} slideElement
   * @param {boolean} [visibleState] - If true, filter by visible fragments. If false, filter by invisible fragments. If undefined, return all.
   * @returns {Array<HTMLElement>}
   */
  getSortedFragments(slideElement, visibleState) {
    if (!slideElement) return [];
    const fragments = Array.from(slideElement.querySelectorAll('.fragment'));
    
    // Process fragments with DOM indexes and custom fragment-index attributes
    const mapped = fragments.map((el, domIndex) => {
      const attr = el.getAttribute('data-fragment-index');
      const hasAttr = attr !== null && attr !== '';
      const index = hasAttr ? parseInt(attr, 10) : null;
      return { el, domIndex, index, hasAttr };
    });

    // Assign sequential indexes to fragments without an explicit index
    let currentIndex = 0;
    mapped.forEach((item) => {
      if (!item.hasAttr) {
        item.index = currentIndex++;
      }
    });

    // Sort by calculated fragment index, and use DOM index as a tie breaker
    mapped.sort((a, b) => {
      if (a.index !== b.index) {
        return a.index - b.index;
      }
      return a.domIndex - b.domIndex;
    });

    // Extract elements
    const sortedElements = mapped.map(item => item.el);

    // Filter by visible status if specified
    if (visibleState === true) {
      return sortedElements.filter(el => el.classList.contains('visible'));
    } else if (visibleState === false) {
      return sortedElements.filter(el => !el.classList.contains('visible'));
    }

    return sortedElements;
  }

  /**
   * Get all fragment elements in the active slide
   * @param {HTMLElement} slideElement - Current slide element
   * @returns {Array<HTMLElement>}
   */
  getFragments(slideElement) {
    return this.getSortedFragments(slideElement);
  }

  /**
   * Get all active (already shown) fragments in the active slide
   * @param {HTMLElement} slideElement - Current slide element
   * @returns {Array<HTMLElement>}
   */
  getActiveFragments(slideElement) {
    return this.getSortedFragments(slideElement, true);
  }

  /**
   * Get all inactive (hidden) fragments in the active slide
   * @param {HTMLElement} slideElement - Current slide element
   * @returns {Array<HTMLElement>}
   */
  getInactiveFragments(slideElement) {
    return this.getSortedFragments(slideElement, false);
  }

  /**
   * Advance one fragment in the active slide
   * @param {HTMLElement} slideElement - Current slide element
   * @returns {boolean} - True if a fragment was revealed, false if no more fragments
   */
  next(slideElement) {
    if (this.config.fragments === false) return false;

    const inactive = this.getSortedFragments(slideElement, false);
    if (inactive.length === 0) return false;

    const nextFragment = inactive[0];
    nextFragment.classList.add('visible');
    
    // Apply styling based on config style or element attribute
    const style = nextFragment.getAttribute('data-fragment-style') || this.config.fragmentStyle || 'fade-in';
    nextFragment.classList.add(style);

    this.presentation.emit('fragmentShown', { fragment: nextFragment });
    return true;
  }

  /**
   * Hide one fragment in the active slide (backwards navigation)
   * @param {HTMLElement} slideElement - Current slide element
   * @returns {boolean} - True if a fragment was hidden, false if no more active fragments
   */
  prev(slideElement) {
    if (this.config.fragments === false) return false;

    const active = this.getSortedFragments(slideElement, true);
    if (active.length === 0) return false;

    const lastFragment = active[active.length - 1];
    lastFragment.classList.remove('visible');
    
    const style = lastFragment.getAttribute('data-fragment-style') || this.config.fragmentStyle || 'fade-in';
    lastFragment.classList.remove(style);

    this.presentation.emit('fragmentHidden', { fragment: lastFragment });
    return true;
  }
}

export default Fragments;
