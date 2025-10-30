# API Documentation

Complete API reference for SenangWebs Deck (SWD).

## Table of Contents

- [Constructor](#constructor)
- [Configuration Options](#configuration-options)
- [Methods](#methods)
- [Events](#events)
- [Properties](#properties)
- [Layouts](#layouts)
- [Themes](#themes)
- [Data Formats](#data-formats)

## Constructor

### `new SWD(container, options)`

Creates a new presentation instance.

**Parameters:**

- `container` (string | HTMLElement) - CSS selector or DOM element for the presentation container
- `options` (Object) - Configuration options (see [Configuration Options](#configuration-options))

**Returns:** SWD instance

**Example:**

```javascript
const deck = new SWD('#presentation', {
  theme: 'gradient',
  transition: 'slide',
  controls: true
});
```

## Configuration Options

### Source Options

#### `source`
- **Type:** `string`
- **Default:** `'html'`
- **Values:** `'html'`, `'markdown'`, `'json'`
- **Description:** Specifies the input format for slides

#### `markdownUrl`
- **Type:** `string`
- **Default:** `null`
- **Description:** URL to external markdown file (when `source: 'markdown'`)

#### `jsonUrl`
- **Type:** `string`
- **Default:** `null`
- **Description:** URL to external JSON file (when `source: 'json'`)

#### `data`
- **Type:** `Object`
- **Default:** `null`
- **Description:** Inline JSON data (when `source: 'json'`)

### Appearance Options

#### `theme`
- **Type:** `string`
- **Default:** `'light'`
- **Values:** `'light'`, `'dark'`, `'gradient'`, `'minimal'`, `'corporate'`, `'creative'`, `'academic'`
- **Description:** Presentation theme

#### `transition`
- **Type:** `string`
- **Default:** `'slide'`
- **Values:** `'slide'`, `'fade'`, `'zoom'`, `'flip'`, `'none'`
- **Description:** Transition animation between slides

#### `transitionSpeed`
- **Type:** `string` or `number`
- **Default:** `'normal'`
- **Values:** `'fast'` (300ms), `'normal'` (500ms), `'slow'` (800ms), or custom number in milliseconds
- **Description:** Duration/speed of transitions

### UI Options

#### `controls`
- **Type:** `boolean`
- **Default:** `true`
- **Description:** Show navigation controls (arrows)

#### `progress`
- **Type:** `boolean`
- **Default:** `true`
- **Description:** Show progress bar at the bottom

#### `slideNumber`
- **Type:** `boolean`
- **Default:** `false`
- **Description:** Show slide numbers (e.g., "1/10")

### Navigation Options

#### `keyboard`
- **Type:** `boolean`
- **Default:** `true`
- **Description:** Enable keyboard navigation

#### `touch`
- **Type:** `boolean`
- **Default:** `true`
- **Description:** Enable touch/swipe gestures

#### `loop`
- **Type:** `boolean`
- **Default:** `false`
- **Description:** Loop back to first slide after last slide

#### `autoSlide`
- **Type:** `number`
- **Default:** `0`
- **Description:** Auto-advance interval in milliseconds (0 = disabled)

### Other Options

#### `autoInit`
- **Type:** `boolean`
- **Default:** `true`
- **Description:** Automatically initialize on creation

#### `history`
- **Type:** `boolean`
- **Default:** `false`
- **Description:** Push slide changes to browser history

#### `overview`
- **Type:** `boolean`
- **Default:** `true`
- **Description:** Enable overview mode

#### `dev`
- **Type:** `boolean`
- **Default:** `false`
- **Description:** Enable development mode with console logging

## Methods

### Navigation Methods

#### `next()`
Navigate to the next slide.

```javascript
deck.next();
```

#### `prev()`
Navigate to the previous slide.

```javascript
deck.prev();
```

#### `goTo(index)`
Navigate to a specific slide by index (0-based).

**Parameters:**
- `index` (number) - Target slide index

```javascript
deck.goTo(3); // Go to 4th slide
```

#### `first()`
Navigate to the first slide.

```javascript
deck.first();
```

#### `last()`
Navigate to the last slide.

```javascript
deck.last();
```

### State Methods

#### `getCurrentSlide()`
Get the current slide index.

**Returns:** `number` - Current slide index (0-based)

```javascript
const currentIndex = deck.getCurrentSlide();
console.log(`Currently on slide ${currentIndex + 1}`);
```

#### `getTotalSlides()`
Get the total number of slides.

**Returns:** `number` - Total slide count

```javascript
const total = deck.getTotalSlides();
console.log(`Presentation has ${total} slides`);
```

#### `getState()`
Get the current state object.

**Returns:** `Object` - State object

```javascript
const state = deck.getState();
console.log(state.currentSlide, state.isFullscreen, state.isPlaying);
```

### Display Methods

#### `toggleFullscreen()`
Toggle fullscreen mode.

```javascript
deck.toggleFullscreen();
```

#### `enterFullscreen()`
Enter fullscreen mode.

```javascript
deck.enterFullscreen();
```

#### `exitFullscreen()`
Exit fullscreen mode.

```javascript
deck.exitFullscreen();
```

#### `toggleOverview()`
Toggle overview mode (shows all slides in a grid).

```javascript
deck.toggleOverview();
```

### Playback Methods

#### `play()`
Start auto-playing slides (if `autoSlide` is configured).

```javascript
deck.play();
```

#### `pause()`
Pause auto-playing slides.

```javascript
deck.pause();
```

#### `togglePause()`
Toggle play/pause state.

```javascript
deck.togglePause();
```

### Export Methods

#### `exportToPDF()`
Export presentation to PDF.

**Returns:** `Promise<Blob>` - PDF blob

```javascript
deck.exportToPDF().then(blob => {
  // Download or save the PDF
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'presentation.pdf';
  a.click();
});
```

#### `exportToHTML()`
Export presentation to standalone HTML.

**Returns:** `string` - Complete HTML document

```javascript
const html = deck.exportToHTML();
// Save or download the HTML
```

#### `exportToJSON()`
Export presentation data to JSON.

**Returns:** `Object` - JSON data

```javascript
const json = deck.exportToJSON();
console.log(json);
```

### Lifecycle Methods

#### `init()`
Manually initialize the presentation (if `autoInit: false`).

**Returns:** `Promise<void>`

```javascript
const deck = new SWD('#presentation', {
  autoInit: false,
  theme: 'dark'
});

// Later...
await deck.init();
```

#### `destroy()`
Clean up and destroy the presentation instance.

```javascript
deck.destroy();
```

#### `reload()`
Reload the presentation (re-parse content and re-render).

**Returns:** `Promise<void>`

```javascript
await deck.reload();
```

### Configuration Methods

#### `configure(options)`
Update configuration options dynamically.

**Parameters:**
- `options` (Object) - Configuration options to update

```javascript
deck.configure({
  theme: 'dark',
  transition: 'fade',
  autoSlide: 5000
});
```

#### `getConfig()`
Get current configuration.

**Returns:** `Object` - Configuration object

```javascript
const config = deck.getConfig();
console.log(config.theme, config.transition);
```

## Events

Listen to events using the `on` method:

```javascript
deck.on('eventName', (data) => {
  // Handle event
});
```

### Available Events

#### `ready`
Fired when presentation is fully initialized and ready.

```javascript
deck.on('ready', () => {
  console.log('Presentation is ready!');
});
```

#### `beforeInit`
Fired before initialization starts.

```javascript
deck.on('beforeInit', (deck) => {
  console.log('About to initialize...');
});
```

#### `afterInit`
Fired after initialization completes.

```javascript
deck.on('afterInit', (deck) => {
  console.log('Initialization complete!');
});
```

#### `slideChanged`
Fired when the current slide changes.

**Data:**
- `currentSlide` (number) - New slide index
- `previousSlide` (number) - Previous slide index

```javascript
deck.on('slideChanged', (data) => {
  console.log(`Moved from slide ${data.previousSlide} to ${data.currentSlide}`);
});
```

#### `beforeSlideChange`
Fired before slide transition starts.

**Data:**
- `currentSlide` (number) - Current slide index
- `nextSlide` (number) - Next slide index

```javascript
deck.on('beforeSlideChange', (data) => {
  console.log(`About to change to slide ${data.nextSlide}`);
});
```

#### `afterSlideChange`
Fired after slide transition completes.

**Data:**
- `currentSlide` (number) - New slide index
- `previousSlide` (number) - Previous slide index

```javascript
deck.on('afterSlideChange', (data) => {
  console.log(`Transition complete!`);
});
```

#### `fullscreenChanged`
Fired when fullscreen state changes.

**Data:**
- `isFullscreen` (boolean) - New fullscreen state

```javascript
deck.on('fullscreenChanged', (data) => {
  console.log(`Fullscreen: ${data.isFullscreen}`);
});
```

#### `overviewChanged`
Fired when overview mode changes.

**Data:**
- `isOverview` (boolean) - New overview state

```javascript
deck.on('overviewChanged', (data) => {
  console.log(`Overview: ${data.isOverview}`);
});
```

#### `pauseChanged`
Fired when auto-play pause state changes.

**Data:**
- `isPaused` (boolean) - New pause state

```javascript
deck.on('pauseChanged', (data) => {
  console.log(`Paused: ${data.isPaused}`);
});
```

#### `error`
Fired when an error occurs.

**Data:**
- `error` (Error) - Error object

```javascript
deck.on('error', (error) => {
  console.error('Error:', error.message);
});
```

### Removing Event Listeners

```javascript
// Save reference to handler
const handler = (data) => {
  console.log(data);
};

// Add listener
deck.on('slideChanged', handler);

// Remove listener
deck.off('slideChanged', handler);
```

## Properties

### `state`
Current presentation state object.

```javascript
{
  initialized: false,      // Is presentation initialized?
  slides: [],             // Array of slide data
  currentSlide: 0,        // Current slide index
  isPlaying: false,       // Is auto-playing?
  isFullscreen: false,    // Is in fullscreen?
  isOverview: false       // Is in overview mode?
}
```

### `config`
Current configuration object.

```javascript
const config = deck.config;
console.log(config.theme);
```

### `container`
Container DOM element.

```javascript
const container = deck.container;
```

## Layouts

### Cover Layout
Full-screen title slide.

**Supported Fields:**
- `title` - Main heading
- `subtitle` - Secondary heading
- `content` - Additional content

**HTML Example:**
```html
<div data-swd-page data-swd-layout="cover">
  <h1>Title</h1>
  <h2>Subtitle</h2>
</div>
```

**Markdown Example:**
```markdown
---
layout: cover
---

# Title
## Subtitle
```

**JSON Example:**
```json
{
  "layout": "cover",
  "title": "Title",
  "subtitle": "Subtitle"
}
```

### Default Layout
Standard single-column content.

**HTML Example:**
```html
<div data-swd-page data-swd-layout="default">
  <h2>Heading</h2>
  <p>Content</p>
</div>
```

### Two Columns Layout
Split content into left and right columns.

**Supported Fields:**
- `left` - Left column content
- `right` - Right column content

**Markdown Example:**
```markdown
---
layout: two-cols
---

## Left Side
Content here

::right::

## Right Side
Content here
```

### Three Columns Layout
Three equal-width columns.

**Supported Fields:**
- `columns` - Array of three column contents

**Markdown Example:**
```markdown
---
layout: three-cols
---

::col-1::
Column 1 content

::col-2::
Column 2 content

::col-3::
Column 3 content
```

### Other Layouts
- `center` - Centered content
- `section` - Section divider
- `quote` - Large quote display
- `image-right` - Content left, image right
- `image-left` - Image left, content right
- `full-image` - Full-screen image with overlay

## Themes

Available themes:
- `light` - Clean, bright theme
- `dark` - Dark mode
- `gradient` - Colorful gradients
- `minimal` - Ultra-minimal
- `corporate` - Professional business
- `creative` - Bold and artistic
- `academic` - Traditional scholarly

Change theme dynamically:

```javascript
deck.configure({ theme: 'dark' });
```

## Data Formats

### HTML Format

```html
<div id="presentation">
  <div data-swd-page 
       data-swd-layout="cover"
       data-swd-background="gradient-blue">
    <h1>Title</h1>
  </div>
</div>
```

### Markdown Format

```markdown
---
layout: cover
background: gradient-blue
---

# Title
```

### JSON Format

```json
{
  "slides": [
    {
      "layout": "cover",
      "background": "gradient-blue",
      "title": "Title"
    }
  ]
}
```

## Advanced Usage

### Custom Plugins

```javascript
const myPlugin = {
  init(deck) {
    console.log('Plugin initialized');
    
    deck.on('slideChanged', (data) => {
      // Custom logic
    });
  }
};

const deck = new SWD('#presentation', {
  plugins: [myPlugin]
});
```

### Custom Themes

Add custom CSS:

```css
.swd-theme-custom {
  --swd-primary: #ff6b6b;
  --swd-background: #1a1a1a;
  --swd-text: #ffffff;
}
```

Use it:

```javascript
const deck = new SWD('#presentation', {
  theme: 'custom'
});
```

### Programmatic Slide Creation

```javascript
// Get current slides
const slides = deck.state.slides;

// Add new slide
slides.push({
  layout: 'default',
  content: '<h2>New Slide</h2>'
});

// Reload presentation
await deck.reload();
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## TypeScript Support

TypeScript definitions are included:

```typescript
import SWD, { SWDConfig, SWDState } from 'senangwebs-deck';

const config: SWDConfig = {
  theme: 'gradient',
  transition: 'slide'
};

const deck = new SWD('#presentation', config);
```

## See Also

- [Getting Started Guide](getting-started.md)
- [Examples](../examples/)