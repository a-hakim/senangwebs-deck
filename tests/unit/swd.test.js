import SWD from '../../src/js/swd.js';

describe('SenangWebs Deck (SWD) Tests', () => {
  let container;

  beforeEach(() => {
    // Setup mock DOM container
    container = document.createElement('div');
    container.id = 'presentation';
    document.body.appendChild(container);
  });

  afterEach(() => {
    // Cleanup DOM and hash
    document.body.innerHTML = '';
    window.location.hash = '';
  });

  test('Should throw error if container not found', () => {
    expect(() => {
      new SWD('#nonexistent-container');
    }).toThrow('SWD: Container element not found');
  });

  test('Should initialize presentation successfully from HTML pages', async () => {
    // Add mock slides
    container.innerHTML = `
      <div data-swd-page data-swd-layout="cover">
        <h1>Slide 1 Title</h1>
      </div>
      <div data-swd-page data-swd-layout="default">
        <h2>Slide 2 Title</h2>
      </div>
    `;

    const deck = new SWD(container, {
      source: 'html',
      autoInit: false,
      hash: false,
    });

    await deck.init();

    expect(deck.state.initialized).toBe(true);
    expect(deck.state.slides.length).toBe(2);
    expect(deck.getCurrentSlide()).toBe(0);

    const firstSlide = container.querySelector('.swd-slide[data-index="0"]');
    expect(firstSlide.classList.contains('swd-slide-active')).toBe(true);
    expect(firstSlide.querySelector('h1').textContent).toBe('Slide 1 Title');

    deck.destroy();
  });

  test('Should navigate to next/prev slides using API', async () => {
    container.innerHTML = `
      <div data-swd-page>Slide 1</div>
      <div data-swd-page>Slide 2</div>
    `;

    const deck = new SWD(container, {
      transition: 'none',
      hash: false,
      autoInit: false,
    });
    await deck.init();

    expect(deck.getCurrentSlide()).toBe(0);

    // Go next
    deck.next();
    expect(deck.getCurrentSlide()).toBe(1);

    // Go prev
    deck.prev();
    expect(deck.getCurrentSlide()).toBe(0);

    deck.destroy();
  });

  test('Should navigate using keyboard event triggers', async () => {
    container.innerHTML = `
      <div data-swd-page>Slide 1</div>
      <div data-swd-page>Slide 2</div>
      <div data-swd-page>Slide 3</div>
    `;

    const deck = new SWD(container, {
      keyboard: true,
      transition: 'none',
      hash: false,
      autoInit: false,
    });
    await deck.init();

    expect(deck.getCurrentSlide()).toBe(0);

    // Simulate ArrowRight key press
    const arrowRightEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    document.dispatchEvent(arrowRightEvent);
    expect(deck.getCurrentSlide()).toBe(1);

    // Simulate Spacebar key press (fixes the spacebar key navigation bug)
    const spacebarEvent = new KeyboardEvent('keydown', { key: ' ' });
    document.dispatchEvent(spacebarEvent);
    expect(deck.getCurrentSlide()).toBe(2);

    // Simulate ArrowLeft key press
    const arrowLeftEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
    document.dispatchEvent(arrowLeftEvent);
    expect(deck.getCurrentSlide()).toBe(1);

    deck.destroy();
  });

  test('Should handle fragments sequentially using sorted indexes', async () => {
    container.innerHTML = `
      <div data-swd-page>
        <h1>Slide 1</h1>
        <div class="fragment" data-fragment-index="1">Frag B</div>
        <div class="fragment">Frag A</div>
        <div class="fragment" data-fragment-style="zoom-in" data-fragment-index="2">Frag C</div>
      </div>
    `;

    const deck = new SWD(container, {
      transition: 'none',
      hash: false,
      autoInit: false,
    });
    await deck.init();

    const slide = container.querySelector('.swd-slide');
    const fragments = slide.querySelectorAll('.fragment');

    // Initially fragments are hidden
    expect(fragments[0].classList.contains('visible')).toBe(false);
    expect(fragments[1].classList.contains('visible')).toBe(false);
    expect(fragments[2].classList.contains('visible')).toBe(false);

    // First next() should trigger Frag A (index 0, since no explicit index defaults to 0)
    deck.next();
    expect(fragments[1].classList.contains('visible')).toBe(true);
    expect(fragments[0].classList.contains('visible')).toBe(false);

    // Second next() should trigger Frag B (index 1)
    deck.next();
    expect(fragments[0].classList.contains('visible')).toBe(true);
    expect(fragments[2].classList.contains('visible')).toBe(false);

    // Third next() should trigger Frag C (index 2 with zoom-in style)
    deck.next();
    expect(fragments[2].classList.contains('visible')).toBe(true);
    expect(fragments[2].classList.contains('zoom-in')).toBe(true);

    // Prev should hide Frag C (index 2)
    deck.prev();
    expect(fragments[2].classList.contains('visible')).toBe(false);

    deck.destroy();
  });

  test('Should support RTL direction, control rotation and touch swipes inversion', async () => {
    container.innerHTML = `
      <div data-swd-page>Slide 1</div>
      <div data-swd-page>Slide 2</div>
    `;

    const deck = new SWD(container, {
      rtl: true,
      transition: 'none',
      hash: false,
      autoInit: false,
    });
    await deck.init();

    // Verify RTL elements and attributes
    const wrapper = container.querySelector('.swd-wrapper');
    expect(wrapper.getAttribute('dir')).toBe('rtl');
    expect(wrapper.classList.contains('swd-rtl')).toBe(true);

    // Verify swipe inversion on RTL
    // Swipe left should go to prev (but we are at 0, so no-op)
    deck.touchHandler.handleSwipe('left', 100, 1.0);
    expect(deck.getCurrentSlide()).toBe(0);

    // Swipe right should go to next
    deck.touchHandler.handleSwipe('right', 100, 1.0);
    expect(deck.getCurrentSlide()).toBe(1);

    // Swipe left should go back to prev (0)
    deck.touchHandler.handleSwipe('left', 100, 1.0);
    expect(deck.getCurrentSlide()).toBe(0);

    deck.destroy();
  });

  test('Should announce slide changes for screen readers and format slide numbers', async () => {
    container.innerHTML = `
      <div data-swd-page><h1>First Slide Title</h1></div>
      <div data-swd-page><h2>Second Slide Title</h2></div>
    `;

    const deck = new SWD(container, {
      transition: 'none',
      hash: false,
      autoInit: false,
      slideNumbers: true,
      slideNumberFormat: 'c/t',
      a11y: {
        announceSlideChanges: true
      }
    });
    await deck.init();

    const slideNumberEl = container.querySelector('.swd-slide-number');
    expect(slideNumberEl).toBeTruthy();
    expect(slideNumberEl.textContent).toBe('1 / 2');

    const liveRegion = container.querySelector('.swd-aria-live');
    expect(liveRegion).toBeTruthy();
    expect(liveRegion.getAttribute('aria-live')).toBe('polite');

    // Navigate to slide 2
    await deck.goTo(1);
    expect(slideNumberEl.textContent).toBe('2 / 2');
    expect(liveRegion.textContent).toBe('Slide 2. Second Slide Title');

    deck.destroy();
  });

  test('Should support throttled mouse wheel navigation', async () => {
    container.innerHTML = `
      <div data-swd-page>Slide 1</div>
      <div data-swd-page>Slide 2</div>
    `;

    const deck = new SWD(container, {
      mouseWheel: true,
      transition: 'none',
      hash: false,
      autoInit: false,
    });
    await deck.init();

    expect(deck.getCurrentSlide()).toBe(0);

    // Mock Date.now to control throttling
    const realDateNow = Date.now;
    let mockTime = 1000000;
    Date.now = () => mockTime;

    // Simulate mouse wheel down (deltaY > 30)
    const wheelDownEvent = new WheelEvent('wheel', { deltaY: 50 });
    deck.container.dispatchEvent(wheelDownEvent);
    expect(deck.getCurrentSlide()).toBe(1);

    // Advance time by 1000ms to clear throttle interval
    mockTime += 1000;

    // Simulate mouse wheel up (deltaY < -30)
    const wheelUpEvent = new WheelEvent('wheel', { deltaY: -50 });
    deck.container.dispatchEvent(wheelUpEvent);
    expect(deck.getCurrentSlide()).toBe(0);

    // Restore real Date.now
    Date.now = realDateNow;

    deck.destroy();
  });
});
