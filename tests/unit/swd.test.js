import SWD from '../../src/js/swd.js';
import MarkdownParser from '../../src/js/parsers/markdown-parser.js';
import JsonParser from '../../src/js/parsers/json-parser.js';
import KeyboardHandler from '../../src/js/utils/keyboard.js';

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

  test('Should normalize named and numeric transition speeds', async () => {
    container.innerHTML = `
      <div data-swd-page>Slide 1</div>
      <div data-swd-page>Slide 2</div>
    `;

    const deck = new SWD(container, {
      transitionSpeed: 650,
      hash: false,
      autoInit: false,
    });
    await deck.init();

    const wrapper = container.querySelector('.swd-wrapper');
    expect(deck.transitions.getSpeed()).toBe(650);
    expect(wrapper.style.getPropertyValue('--swd-transition-speed')).toBe('650ms');

    deck.setTransitionSpeed('slow');
    expect(deck.transitions.getSpeed()).toBe(800);
    expect(wrapper.getAttribute('data-transition-speed')).toBe('slow');
    expect(wrapper.style.getPropertyValue('--swd-transition-speed')).toBe('800ms');

    deck.destroy();
  });

  test('Should read named and numeric transition speed data attributes', () => {
    container.setAttribute('data-swd-transition-speed', 'slow');
    expect(SWD.readDataAttributes(container).transitionSpeed).toBe('slow');

    container.setAttribute('data-swd-transition-speed', '650');
    expect(SWD.readDataAttributes(container).transitionSpeed).toBe(650);
  });

  test('Should split markdown slides and extract metadata comments', async () => {
    const markdown = [
      '<!-- layout: cover -->',
      '',
      '# Cover Title',
      '',
      '---',
      '',
      '<!-- layout: two-cols -->',
      '',
      'Left content',
      '',
      '<!-- column -->',
      '',
      'Right content',
    ].join('\n');

    const mdContainer = document.createElement('div');
    mdContainer.textContent = markdown;

    const parser = new MarkdownParser({});
    const slides = await parser.parse(mdContainer);

    expect(slides.length).toBe(2);
    expect(slides[0].layout).toBe('cover');
    expect(slides[0].content).toContain('Cover Title');

    expect(slides[1].layout).toBe('two-cols');
    expect(slides[1].left).toContain('Left content');
    expect(slides[1].right).toContain('Right content');
  });

  test('Should sanitize markdown HTML output to prevent XSS', async () => {
    const markdown = '# Title\n\n<img src="x" onerror="alert(1)">\n<script>alert(2)</script>';

    const mdContainer = document.createElement('div');
    mdContainer.textContent = markdown;

    const parser = new MarkdownParser({});
    const slides = await parser.parse(mdContainer);

    expect(slides[0].content).not.toContain('onerror');
    expect(slides[0].content).not.toContain('<script');
  });

  test('Should parse JSON slides with sanitization and column data', async () => {
    const jsonContainer = document.createElement('div');

    const parser = new JsonParser({
      data: {
        slides: [
          {
            layout: 'default',
            content: '<p>Safe</p><script>alert(1)</script>',
          },
          {
            layout: 'two-cols',
            left: '<p>Left</p>',
            right: '<p>Right</p>',
          },
          {
            layout: 'quote',
            quote: 'Hello',
            author: 'World',
          },
        ],
      },
    });

    const slides = await parser.parse(jsonContainer);

    expect(slides.length).toBe(3);
    expect(slides[0].content).toContain('Safe');
    expect(slides[0].content).not.toContain('<script');

    expect(slides[1].left).toContain('Left');
    expect(slides[1].right).toContain('Right');

    expect(slides[2].quote).toBe('Hello');
    expect(slides[2].author).toBe('World');
  });

  test('Should fall back to default layout for unknown layout names', async () => {
    container.innerHTML = `
      <div data-swd-page data-swd-layout="two-column-typo">
        <h2>Fallback Content</h2>
      </div>
    `;

    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    const deck = new SWD(container, {
      transition: 'none',
      hash: false,
      autoInit: false,
    });
    await deck.init();

    expect(deck.state.slides.length).toBe(1);
    const slide = container.querySelector('.swd-slide');
    expect(slide.querySelector('h2').textContent).toBe('Fallback Content');

    warnSpy.mockRestore();
    deck.destroy();
  });

  test('Should render overlay content when provided', async () => {
    container.innerHTML = `
      <div data-swd-page data-swd-overlay="<h2>Overlay Text</h2>">Slide</div>
    `;

    const deck = new SWD(container, {
      transition: 'none',
      hash: false,
      autoInit: false,
    });
    await deck.init();

    const overlay = container.querySelector('.swd-slide-overlay');
    expect(overlay).toBeTruthy();
    expect(overlay.textContent).toContain('Overlay Text');

    deck.destroy();
  });

  test('Should parse data-swd-column, data-swd-content and data-swd-image zones', async () => {
    container.innerHTML = `
      <div data-swd-page data-swd-layout="two-cols">
        <div data-swd-column><p>Left</p></div>
        <div data-swd-column><p>Right</p></div>
      </div>
      <div data-swd-page data-swd-layout="image-right">
        <div data-swd-content><h2>Text Zone</h2></div>
        <div data-swd-image><div class="img-standin"></div></div>
      </div>
    `;

    const deck = new SWD(container, {
      transition: 'none',
      hash: false,
      autoInit: false,
    });
    await deck.init();

    expect(deck.state.slides.length).toBe(2);

    const colsSlide = container.querySelector('.swd-slide[data-index="0"]');
    expect(colsSlide.querySelectorAll('.swd-col').length).toBe(2);
    expect(colsSlide.querySelector('.swd-col-left').textContent).toBe('Left');
    expect(colsSlide.querySelector('.swd-col-right').textContent).toBe('Right');

    const imageSlide = container.querySelector('.swd-slide[data-index="1"]');
    expect(imageSlide.querySelector('.swd-col-text h2').textContent).toBe('Text Zone');
    expect(imageSlide.querySelector('.swd-col-image .img-standin')).toBeTruthy();

    deck.destroy();
  });

  test('Should apply aspect ratio attribute to the wrapper', async () => {
    container.innerHTML = `<div data-swd-page>Slide 1</div>`;

    const deck = new SWD(container, {
      transition: 'none',
      hash: false,
      autoInit: false,
      aspectRatio: '4:3',
    });
    await deck.init();

    const wrapper = container.querySelector('.swd-wrapper');
    expect(wrapper.getAttribute('data-aspect-ratio')).toBe('4:3');

    deck.destroy();
  });

  test('Should pause autoplay on hover and resume on leave', async () => {
    jest.useFakeTimers();

    container.innerHTML = `
      <div data-swd-page>Slide 1</div>
      <div data-swd-page>Slide 2</div>
    `;

    const deck = new SWD(container, {
      transition: 'none',
      hash: false,
      autoInit: false,
      autoSlide: 100,
      autoSlideStoppable: true,
    });
    await deck.init();

    expect(deck.state.isPlaying).toBe(true);

    // Hover: autoplay suspends but state remembers it is enabled
    deck.navigation.boundMouseEnter();
    expect(deck.state.isPlaying).toBe(false);

    jest.advanceTimersByTime(500);
    expect(deck.getCurrentSlide()).toBe(0);

    // Leave: autoplay resumes
    deck.navigation.boundMouseLeave();
    expect(deck.state.isPlaying).toBe(true);

    jest.advanceTimersByTime(150);
    expect(deck.getCurrentSlide()).toBe(1);

    deck.stop();
    expect(deck.state.isPlaying).toBe(false);

    jest.useRealTimers();
    deck.destroy();
  });

  test('Should restore original container markup and theme on destroy', async () => {
    container.innerHTML = `
      <div data-swd-page><h2>Original</h2></div>
    `;

    const deck = new SWD(container, {
      theme: 'dark',
      transition: 'none',
      hash: false,
      autoInit: false,
    });
    await deck.init();

    expect(container.querySelector('.swd-wrapper')).toBeTruthy();
    expect(container.classList.contains('swd-theme-dark')).toBe(true);

    deck.destroy();

    expect(container.querySelector('[data-swd-page]')).toBeTruthy();
    expect(container.querySelector('.swd-wrapper')).toBeNull();
    expect(container.classList.contains('swd-theme-dark')).toBe(false);
  });

  test('Should reload the presentation and apply new config', async () => {
    container.innerHTML = `
      <div data-swd-page><h2>Original</h2></div>
      <div data-swd-page><h2>Second</h2></div>
    `;

    const deck = new SWD(container, {
      transition: 'none',
      hash: false,
      autoInit: false,
    });
    await deck.init();
    expect(deck.state.slides.length).toBe(2);

    await deck.reload({ transition: 'fade' });

    expect(deck.state.initialized).toBe(true);
    expect(deck.state.slides.length).toBe(2);
    expect(deck.config.transition).toBe('fade');
    expect(container.querySelector('.swd-wrapper')).toBeTruthy();

    deck.destroy();
  });

  test('Should export JSON with layout fields preserved for round-trip', async () => {
    const jsonContainer = document.createElement('div');
    const parser = new JsonParser({
      data: {
        slides: [
          { layout: 'two-cols', left: '<p>L</p>', right: '<p>R</p>' },
          {
            layout: 'three-cols',
            col1: '<p>One</p>',
            col2: '<p>Two</p>',
            col3: '<p>Three</p>',
          },
          { layout: 'quote', quote: 'Hi', author: 'Me' },
        ],
      },
    });
    const slides = await parser.parse(jsonContainer);

    const deck = new SWD(container, {
      source: 'json',
      data: { slides: [] },
      transition: 'none',
      hash: false,
      autoInit: false,
    });
    await deck.init();
    // Inject parsed slides directly to exercise the export mapping
    deck.state.slides = slides;

    const exported = deck.exportJSON();
    expect(exported.slides[0].left).toContain('L');
    expect(exported.slides[0].right).toContain('R');
    expect(exported.slides[1].col1).toContain('One');
    expect(exported.slides[1].col3).toContain('Three');
    expect(exported.slides[2].quote).toBe('Hi');
    expect(exported.slides[2].author).toBe('Me');
  });

  test('Should map shifted letter keys without prefixing (F/O/P shortcuts)', () => {
    const handler = new KeyboardHandler({});

    expect(handler.getKeyIdentifier({ key: 'f', shiftKey: false })).toBe('f');
    expect(handler.getKeyIdentifier({ key: 'F', shiftKey: true })).toBe('F');
    expect(handler.getKeyIdentifier({ key: 'Enter', shiftKey: true })).toBe(
      'Shift+Enter'
    );
    expect(handler.getKeyIdentifier({ key: ' ', shiftKey: false })).toBe(' ');
  });
});
