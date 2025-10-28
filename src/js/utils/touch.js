/**
 * Touch Handler - Touch and swipe gesture support
 * @module utils/touch
 */

/**
 * Touch Handler class
 */
class TouchHandler {
  constructor(presentation, config = {}) {
    this.presentation = presentation;
    this.config = config;
    this.enabled = true;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchEndX = 0;
    this.touchEndY = 0;
    this.touchStartTime = 0;
    this.isSwiping = false;

    // Gesture thresholds
    this.minSwipeDistance = config.minSwipeDistance || 50;
    this.maxSwipeTime = config.maxSwipeTime || 300;
    this.swipeVelocityThreshold = config.swipeVelocityThreshold || 0.3;

    // Bind methods
    this.boundTouchStart = this.handleTouchStart.bind(this);
    this.boundTouchMove = this.handleTouchMove.bind(this);
    this.boundTouchEnd = this.handleTouchEnd.bind(this);
  }

  /**
   * Initialize touch handler
   */
  init() {
    if (this.config.touch !== false && this.isTouchDevice()) {
      const { container } = this.presentation;

      container.addEventListener('touchstart', this.boundTouchStart, {
        passive: false,
      });
      container.addEventListener('touchmove', this.boundTouchMove, {
        passive: false,
      });
      container.addEventListener('touchend', this.boundTouchEnd, {
        passive: false,
      });
    }
  }

  /**
   * Check if device supports touch
   * @returns {boolean} - True if touch device
   */
  isTouchDevice() {
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  }

  /**
   * Handle touch start
   * @param {TouchEvent} event - Touch event
   */
  handleTouchStart(event) {
    if (!this.enabled) return;

    const touch = event.touches[0];
    this.touchStartX = touch.clientX;
    this.touchStartY = touch.clientY;
    this.touchStartTime = Date.now();
    this.isSwiping = false;

    // Emit touch start event
    this.presentation.emit('touchStart', {
      x: this.touchStartX,
      y: this.touchStartY,
    });
  }

  /**
   * Handle touch move
   * @param {TouchEvent} event - Touch event
   */
  handleTouchMove(event) {
    if (!this.enabled) return;

    const touch = event.touches[0];
    const deltaX = Math.abs(touch.clientX - this.touchStartX);
    const deltaY = Math.abs(touch.clientY - this.touchStartY);

    // Detect horizontal swipe
    if (deltaX > 10 && deltaX > deltaY) {
      this.isSwiping = true;
      event.preventDefault(); // Prevent scrolling
    }

    // Emit touch move event
    this.presentation.emit('touchMove', {
      x: touch.clientX,
      y: touch.clientY,
      deltaX,
      deltaY,
    });
  }

  /**
   * Handle touch end
   * @param {TouchEvent} event - Touch event
   */
  handleTouchEnd(event) {
    if (!this.enabled) return;

    const touch = event.changedTouches[0];
    this.touchEndX = touch.clientX;
    this.touchEndY = touch.clientY;

    const swipeDistance = this.getSwipeDistance();
    const swipeDirection = this.getSwipeDirection();
    const swipeTime = Date.now() - this.touchStartTime;
    const swipeVelocity = swipeDistance / swipeTime;

    // Emit touch end event
    this.presentation.emit('touchEnd', {
      x: this.touchEndX,
      y: this.touchEndY,
      distance: swipeDistance,
      direction: swipeDirection,
      time: swipeTime,
      velocity: swipeVelocity,
    });

    // Handle swipe gesture
    if (this.isSwiping) {
      this.handleSwipe(swipeDirection, swipeDistance, swipeVelocity);
    }

    // Reset
    this.isSwiping = false;
  }

  /**
   * Calculate swipe distance
   * @returns {number} - Distance in pixels
   */
  getSwipeDistance() {
    const deltaX = this.touchEndX - this.touchStartX;
    const deltaY = this.touchEndY - this.touchStartY;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  }

  /**
   * Determine swipe direction
   * @returns {string} - Direction: 'left', 'right', 'up', 'down', 'none'
   */
  getSwipeDirection() {
    const deltaX = this.touchEndX - this.touchStartX;
    const deltaY = this.touchEndY - this.touchStartY;

    // Determine if horizontal or vertical swipe
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      return deltaX > 0 ? 'right' : 'left';
    }
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      // Vertical swipe
      return deltaY > 0 ? 'down' : 'up';
    }

    return 'none';
  }

  /**
   * Handle swipe gesture
   * @param {string} direction - Swipe direction
   * @param {number} distance - Swipe distance
   * @param {number} velocity - Swipe velocity
   */
  handleSwipe(direction, distance, velocity) {
    // Check if swipe meets threshold
    if (
      distance < this.minSwipeDistance ||
      velocity < this.swipeVelocityThreshold
    ) {
      return;
    }

    // Emit swipe event
    this.presentation.emit('swipe', { direction, distance, velocity });

    // Perform navigation based on direction
    switch (direction) {
      case 'left':
        this.presentation.next();
        break;

      case 'right':
        this.presentation.prev();
        break;

      case 'up':
        // Could be used for vertical slide navigation if implemented
        this.presentation.emit('swipeUp');
        break;

      case 'down':
        // Could be used for vertical slide navigation if implemented
        this.presentation.emit('swipeDown');
        break;

      default:
        break;
    }
  }

  /**
   * Enable touch handler
   */
  enable() {
    this.enabled = true;
  }

  /**
   * Disable touch handler
   */
  disable() {
    this.enabled = false;
  }

  /**
   * Destroy touch handler
   */
  destroy() {
    const { container } = this.presentation;

    container.removeEventListener('touchstart', this.boundTouchStart);
    container.removeEventListener('touchmove', this.boundTouchMove);
    container.removeEventListener('touchend', this.boundTouchEnd);
  }
}

export default TouchHandler;
