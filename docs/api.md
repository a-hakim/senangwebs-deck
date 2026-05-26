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

#### `aspectRatio`
- **Type:** `string`
- **Default:** `'16:9'`
- **Values:** `'16:9'`, `'4:3'`, `'16:10'`
- **Description:** Slide aspect ratio

#### `parallax`
- **Type:** `boolean`
- **Default:** `false`
- **Description:** Enable parallax background effect (placeholder config)

#### `rtl`
- **Type:** `boolean`
- **Default:** `false`
- **Description:** Enable Right-to-Left (RTL) layout mode

### UI Options

#### `controls`
- **Type:** `boolean`
- **Default:** `true`
- **Description:** Show navigation controls (arrows)

#### `controlsPosition`
- **Type:** `string`
- **Default:** `'bottom-right'`
- **Values:** `'bottom-right'`, `'bottom-left'`, `'edges'`
- **Description:** Position of the navigation controls

#### `progress`
- **Type:** `boolean`
- **Default:** `true`
- **Description:** Show progress bar at the bottom

#### `progressPosition`
- **Type:** `string`
- **Default:** `'bottom'`
- **Values:** `'bottom'`, `'top'`
- **Description:** Position of the progress bar

#### `slideNumbers`
- **Type:** `boolean`
- **Default:** `true`
- **Description:** Show slide numbers (e.g., "1/10")

#### `slideNumberFormat`
- **Type:** `string`
- **Default:** `'h/v'`
- **Values:** `'h/v'` (horizontal/vertical), `'h.v'`, `'c/t'` (current/total), `'c'` (current only)
- **Description:** Format of the slide numbers

### Navigation Options

#### `keyboard`
- **Type:** `boolean`
- **Default:** `true`
- **Description:** Enable keyboard navigation

#### `keyboardShortcuts`
- **Type:** `Object`
- **Default:** `{}`
- **Description:** Map keys to custom actions (e.g., `{ 'Shift+Enter': 'next' }`)

#### `touch`
- **Type:** `boolean`
- **Default:** `true`
- **Description:** Enable touch/swipe gestures

#### `mouseWheel`
- **Type:** `boolean`
- **Default:** `false`
- **Description:** Enable mouse wheel scrolling to navigate slides

#### `loop`
- **Type:** `boolean`
- **Default:** `false`
- **Description:** Loop back to first slide after last slide

#### `autoSlide`
- **Type:** `number`
- **Default:** `0`
- **Description:** Auto-advance interval in milliseconds (0 = disabled)

#### `autoSlideStoppable`
- **Type:** `boolean`
- **Default:** `true`
- **Description:** Pause auto-sliding when hovering over container

#### `autoplay`
- **Type:** `boolean`
- **Default:** `false`
- **Description:** Enable autoplay on load (maps to autoSlide via autoplayDelay)

#### `autoplayDelay`
- **Type:** `number`
- **Default:** `3000`
- **Description:** Autoplay transition interval in milliseconds

#### `fragments`
- **Type:** `boolean`
- **Default:** `true`
- **Description:** Enable sequential step-by-step element rendering within slides

#### `fragmentStyle`
- **Type:** `string`
- **Default:** `'fade-in'`
- **Values:** `'fade-in'`, `'slide-in'`, `'zoom-in'`
- **Description:** Transition effect used for fragment reveals

#### `hash`
- **Type:** `boolean`
- **Default:** `true`
- **Description:** Update and read slide index from URL hash (e.g. `#/slide-2`)

#### `history`
- **Type:** `boolean`
- **Default:** `false`
- **Description:** Push slide changes to browser history (placeholder config)

### Other Options

#### `autoInit`
- **Type:** `boolean`
- **Default:** `true`
- **Description:** Automatically initialize on creation

#### `overview`
- **Type:** `boolean`
- **Default:** `true`
- **Description:** Enable slide overview/grid view mode

#### `fullscreen`
- **Type:** `boolean`
- **Default:** `true`
- **Description:** Enable fullscreen mode support

#### `a11y`
- **Type:** `Object`
- **Default:** `{ enabled: true, announceSlideChanges: true, focusVisible: true }`
- **Description:** Configure accessibility parameters

#### `export`
- **Type:** `Object`
- **Default:** `{ pdf: true, html: true, json: true }`
- **Description:** Enable or disable specific presentation export formats

#### `plugins`
- **Type:** `Array`
- **Default:** `[]`
- **Description:** List of plugins to initialize on load

#### `dev`
- **Type:** `boolean`
- **Default:** `false`
- **Description:** Enable development mode with console logging

## Methods

### Navigation Methods

#### `next()`
Navigate to the next slide or advance the current slide's fragments.

```javascript
deck.next();
```

#### `prev()`
Navigate to the previous slide or revert the current slide's fragments.

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

#### `goToFirst()`
Navigate to the first slide.

```javascript
deck.goToFirst();
```

#### `goToLast()`
Navigate to the last slide.

```javascript
deck.goToLast();
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

#### `setTransition(type)`
Change transition animation type dynamically.

**Parameters:**
- `type` (string) - Transition name: `'slide'`, `'fade'`, `'zoom'`, `'flip'`, or `'none'`

```javascript
deck.setTransition('fade');
```

#### `setTransitionSpeed(speed)`
Change transition duration dynamically.

**Parameters:**
- `speed` (number | string) - Duration in ms or speed name: `'fast'`, `'normal'`, or `'slow'`

```javascript
deck.setTransitionSpeed('fast');
```

### Playback Methods

#### `start()`
Start auto-playing slides (uses `autoSlide` interval).

```javascript
deck.start();
```

#### `stop()`
Stop/pause auto-playing slides.

```javascript
deck.stop();
```

### Export Methods

#### `exportPDF()`
Export presentation to PDF by triggering the browser print dialog (requires print CSS configuration).

```javascript
deck.exportPDF();
```

#### `exportHTML()`
Export presentation to standalone HTML string.

**Returns:** `Promise<string>` - Standalone HTML document

```javascript
deck.exportHTML().then(html => {
  console.log(html);
});
```

#### `exportJSON()`
Export presentation structure and content as a JSON object.

**Returns:** `Object` - Presentation data

```javascript
const data = deck.exportJSON();
console.log(data);
```

#### `downloadHTML()`
Generate and download the standalone HTML presentation file.

```javascript
deck.downloadHTML();
```

#### `downloadJSON()`
Generate and download the JSON data of the presentation.

```javascript
deck.downloadJSON();
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
Clean up and destroy the presentation instance, restoring the container and removing listeners.

```javascript
deck.destroy();
```

## Events

Listen to events using the custom `EventEmitter` methods:

```javascript
// Register a callback for an event
deck.on('eventName', (data) => { ... });

// Register a one-time callback
deck.once('eventName', (data) => { ... });

// Remove a specific callback
deck.off('eventName', handlerReference);

// Remove all callbacks for an event (or all events if argument is omitted)
deck.offAll('eventName');
```

### Available Events

#### Lifecycle Events

##### `beforeInit`
Fired before initialization starts.

##### `afterInit`
Fired after initialization completes.

##### `ready`
Fired when presentation is fully initialized and ready.

##### `beforeDestroy`
Fired before destruction cleanup starts.

##### `afterDestroy`
Fired after destruction is complete.

##### `error`
Fired when an initialization or runtime error occurs.
- **Data:** `Error` - The error object.

```javascript
deck.on('error', (err) => {
  console.error('SWD Error:', err.message);
});
```

#### Slide Navigation Events

##### `beforeSlideChange`
Fired before a slide transition starts.
- **Data:** `{ from: number, to: number }`

##### `afterSlideChange`
Fired after a slide transition completes.
- **Data:** `{ from: number, to: number }`

```javascript
deck.on('afterSlideChange', (data) => {
  console.log(`Now viewing slide index: ${data.to}`);
});
```

#### Display & View Mode Events

##### `fullscreenChange`
Fired when fullscreen state changes.
- **Data:** `{ isFullscreen: boolean }`

##### `enterFullscreen`
Fired when entering fullscreen mode.

##### `exitFullscreen`
Fired when exiting fullscreen mode.

##### `enterOverview`
Fired when entering slide overview/grid mode.

##### `exitOverview`
Fired when exiting slide overview/grid mode.

##### `transitionStart`
Fired when a slide transition starts.
- **Data:** `{ oldSlide: HTMLElement, newSlide: HTMLElement, direction: 'forward'|'backward' }`

##### `transitionEnd`
Fired when a slide transition completes.
- **Data:** `{ oldSlide: HTMLElement, newSlide: HTMLElement, direction: 'forward'|'backward' }`

##### `transitionChanged`
Fired when the transition animation type is updated dynamically.
- **Data:** `{ type: string }`

##### `transitionSpeedChanged`
Fired when the transition speed is updated dynamically.
- **Data:** `{ speed: number|string }`

#### Interactions & Navigation Events

##### `touchStart`
Fired when user begins a touch gesture.

##### `touchMove`
Fired when user moves finger in touch gesture.

##### `touchEnd`
Fired when user ends touch gesture.

##### `swipe`
Fired when user triggers a swipe gesture.
- **Data:** `{ direction: 'left'|'right'|'up'|'down', distance: number, velocity: number }`

##### `swipeUp`
Fired on a swipe up gesture.

##### `swipeDown`
Fired on a swipe down gesture.

##### `fragmentShown`
Fired when a slide fragment is revealed/shown.
- **Data:** `{ fragment: HTMLElement }`

##### `fragmentHidden`
Fired when a slide fragment is hidden/reverted.
- **Data:** `{ fragment: HTMLElement }`

##### `keyboardAction`
Fired when custom keyboard action triggers.
- **Data:** `{ action: string, event: KeyboardEvent }`

#### Export Events

##### `beforeExportPDF` / `afterExportPDF`
Fired before/after exporting slides to PDF (using print utility).

##### `beforeExportHTML` / `afterExportHTML`
Fired before/after exporting slides to standalone HTML.
- **Data on `afterExportHTML`:** `{ html: string }`

##### `beforeExportJSON` / `afterExportJSON`
Fired before/after exporting slide data to JSON.
- **Data on `afterExportJSON`:** `{ data: Object }`

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