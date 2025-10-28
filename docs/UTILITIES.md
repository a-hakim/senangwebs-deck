# SenangWebs Deck - Utilities Documentation

## Overview

SenangWebs Deck includes a comprehensive set of utility modules that enhance the presentation experience with advanced features like touch gestures, fullscreen support, export capabilities, and smooth transition animations.

---

## 1. Touch Handler (`touch.js`)

### Purpose
Enables touch and swipe gesture support for mobile devices and touch-enabled screens.

### Features
- **Swipe Detection**: Left, right, up, and down swipe gestures
- **Velocity Calculation**: Measures swipe speed for responsive interactions
- **Configurable Thresholds**: Customize minimum distance and velocity
- **Direction Detection**: Accurately determines swipe direction
- **Event Emission**: Integrates seamlessly with presentation events

### Configuration

```javascript
const deck = new SWD('#presentation', {
  touch: true, // Enable touch gestures (default: true)
  swipeThreshold: 50, // Minimum swipe distance in pixels
  swipeVelocity: 0.5 // Minimum swipe velocity
});
```

### API

The TouchHandler is automatically initialized when `touch: true` in configuration.

```javascript
// Touch events are emitted by the presentation
deck.on('swipe', (data) => {
  console.log('Swipe direction:', data.direction); // 'left', 'right', 'up', 'down'
  console.log('Distance:', data.distance);
  console.log('Velocity:', data.velocity);
});
```

### Implementation Details

- **Touch Points**: Tracks single touch interactions
- **Distance Calculation**: Uses Euclidean distance formula
- **Velocity Calculation**: Distance / time in milliseconds
- **Thresholds**:
  - Default minimum swipe distance: 50px
  - Default minimum swipe time: 300ms
  - Configurable velocity threshold

---

## 2. Fullscreen Utility (`fullscreen.js`)

### Purpose
Provides cross-browser fullscreen mode support with vendor prefix handling.

### Features
- **Cross-browser Compatibility**: Supports webkit, moz, and ms prefixes
- **State Management**: Tracks fullscreen state changes
- **Event Handling**: Emits fullscreen change events
- **Fallback Support**: Checks for API availability
- **CSS Integration**: Adds fullscreen classes to container

### Configuration

```javascript
const deck = new SWD('#presentation', {
  // Fullscreen is always available, no config needed
});
```

### API

```javascript
// Enter fullscreen
deck.enterFullscreen();

// Exit fullscreen
deck.exitFullscreen();

// Toggle fullscreen
deck.toggleFullscreen();

// Check if fullscreen is supported
if (deck.fullscreen.isSupported()) {
  console.log('Fullscreen is available');
}

// Check if currently in fullscreen
if (deck.fullscreen.isActive()) {
  console.log('Currently in fullscreen');
}

// Listen to fullscreen changes
deck.on('fullscreenChange', (data) => {
  console.log('Fullscreen:', data.isFullscreen);
});
```

### Browser Support

| Browser | API Prefix | Support |
|---------|-----------|---------|
| Chrome/Edge | Standard | ✅ |
| Firefox | moz | ✅ |
| Safari | webkit | ✅ |
| IE11 | ms | ✅ |

### CSS Classes

When in fullscreen mode:
- `.swd-wrapper.fullscreen` - Added to presentation wrapper
- `.swd-fullscreen-active` - Added to document body

---

## 3. Export Utility (`export.js`)

### Purpose
Enables exporting presentations to PDF, standalone HTML, or JSON format.

### Features
- **PDF Export**: Uses browser print API for PDF generation
- **HTML Export**: Creates standalone HTML file with inlined styles
- **JSON Export**: Exports presentation data structure
- **Download Support**: Automatic file download with proper naming
- **Print Optimization**: Special print stylesheet for clean PDFs

### API

```javascript
// Export to PDF (opens print dialog)
deck.exportPDF();

// Export to standalone HTML
const htmlContent = deck.exportHTML();
console.log(htmlContent); // Full HTML document

// Export to JSON
const jsonData = deck.exportJSON();
console.log(jsonData); // Presentation data structure

// Download HTML file
deck.downloadHTML(); // Downloads presentation.html

// Download JSON file
deck.downloadJSON(); // Downloads presentation.json
```

### Export Formats

#### PDF Export
- Opens native browser print dialog
- Applies print-optimized styles
- One slide per page
- Hides UI elements (controls, progress bar)
- Maintains layout and styling

#### HTML Export
- Complete standalone HTML file
- Inlined CSS styles
- All presentation data included
- Can be opened in any browser
- No external dependencies

#### JSON Export
```json
{
  "config": {
    "theme": "light",
    "transition": "slide",
    "transitionSpeed": "normal"
  },
  "slides": [
    {
      "layout": "cover",
      "content": "<h1>Title</h1>",
      "background": "image.jpg"
    }
  ]
}
```

### Print Stylesheet

The print CSS (`print.css`) includes:
- Page breaks between slides
- Hidden navigation controls
- Hidden progress bar
- Optimized dimensions
- Clean margins and padding

---

## 4. Transition Animations (`transitions.js`)

### Purpose
Provides smooth, professional transition animations between slides.

### Available Transitions

1. **Slide** (default)
   - Horizontal sliding animation
   - Direction-aware (left/right)
   - Classic presentation feel

2. **Fade**
   - Cross-fade between slides
   - Subtle and elegant
   - Good for minimal designs

3. **Zoom**
   - Zoom in/out effect
   - Creates depth perception
   - Dramatic and engaging

4. **Flip**
   - 3D flip animation
   - Playful and modern
   - Uses CSS 3D transforms

5. **None**
   - Instant slide change
   - No animation
   - Maximum performance

### Configuration

```javascript
const deck = new SWD('#presentation', {
  transition: 'slide', // 'slide', 'fade', 'zoom', 'flip', 'none'
  transitionSpeed: 'normal' // 'fast', 'normal', 'slow'
});
```

### API

```javascript
// Change transition type
deck.setTransition('fade');

// Change transition speed
deck.setTransitionSpeed('fast'); // or 300 (milliseconds)

// Get current transition
const currentTransition = deck.transitions.getTransition();
console.log(currentTransition); // 'fade'

// Get current speed
const speed = deck.transitions.getSpeed();
console.log(speed); // 300

// Check if transitioning
if (deck.transitions.isActive()) {
  console.log('Currently transitioning');
}

// Listen to transition events
deck.on('transitionStart', (data) => {
  console.log('Transition started:', data.direction);
});

deck.on('transitionEnd', (data) => {
  console.log('Transition completed');
});
```

### Transition Speeds

| Speed | Duration | Use Case |
|-------|----------|----------|
| Fast | 300ms | Quick presentations, energetic content |
| Normal | 500ms | Default, balanced feel |
| Slow | 800ms | Dramatic effect, emphasis |
| Custom | Any ms | Fine-tuned control |

### Performance Optimization

All transitions use:
- **GPU Acceleration**: `transform` and `opacity` properties
- **Hardware Acceleration**: `translateZ(0)` trick
- **Will-change**: Hints browser for optimization
- **Backface Visibility**: Prevents flickering
- **RequestAnimationFrame**: Smooth 60 FPS

### Accessibility

#### Reduced Motion Support
Respects `prefers-reduced-motion` media query:

```css
@media (prefers-reduced-motion: reduce) {
  .swd-slide {
    transition: none !important;
    animation: none !important;
  }
}
```

Users with motion sensitivity preferences will see instant transitions automatically.

#### Mobile Optimization
- Faster default transitions (350ms)
- Simplified complex transitions on low-end devices
- Touch-optimized timing

---

## 5. DOM Utilities (`dom.js`)

### Purpose
Provides helper functions for common DOM operations.

### API

```javascript
import { 
  createElement, 
  addClass, 
  removeClass, 
  toggleClass,
  getAttributes,
  $,
  $$,
  on,
  off
} from './utils/dom.js';

// Create element
const div = createElement('div', 'my-class', { 'data-id': '123' });

// Class manipulation
addClass(element, 'active');
removeClass(element, 'active');
toggleClass(element, 'active');

// Query shortcuts
const el = $('#myId'); // document.querySelector
const els = $$('.myClass'); // document.querySelectorAll

// Event handling
on(element, 'click', handler);
off(element, 'click', handler);

// Get data attributes
const attrs = getAttributes(element);
console.log(attrs); // { layout: 'cover', theme: 'dark' }
```

---

## 6. Keyboard Handler (`keyboard.js`)

### Purpose
Advanced keyboard navigation with customizable shortcuts.

### Default Shortcuts

| Key | Action |
|-----|--------|
| Arrow Right, Space, Page Down | Next slide |
| Arrow Left, Page Up | Previous slide |
| Home | First slide |
| End | Last slide |
| F | Toggle fullscreen |
| Esc | Exit fullscreen |
| P | Pause/resume auto-play |

### API

```javascript
// Add custom shortcut
deck.navigation.keyboardHandler.addShortcut('g', () => {
  deck.goTo(5); // Go to slide 6
}, { description: 'Go to slide 6' });

// Add shortcut with modifiers
deck.navigation.keyboardHandler.addShortcut('s', () => {
  deck.exportPDF();
}, { 
  ctrl: true, // Ctrl+S
  description: 'Save as PDF' 
});

// Remove shortcut
deck.navigation.keyboardHandler.removeShortcut('f');

// Disable keyboard temporarily
deck.navigation.keyboardHandler.disable();

// Re-enable keyboard
deck.navigation.keyboardHandler.enable();
```

### Smart Context Detection

Keyboard shortcuts are automatically disabled when:
- User is typing in an input field
- User is typing in a textarea
- User is typing in a contenteditable element

This prevents accidental navigation while editing.

---

## Integration Example

Here's a complete example using all utilities:

```javascript
const deck = new SWD('#presentation', {
  // Source
  source: 'markdown',
  markdownUrl: 'slides.md',
  
  // Theme
  theme: 'gradient',
  
  // Transitions
  transition: 'slide',
  transitionSpeed: 'normal',
  
  // Navigation
  keyboard: true,
  touch: true,
  controls: true,
  progress: true,
  loop: true,
  
  // Auto-play
  autoSlide: 5000,
  autoSlideStoppable: true
});

// Add custom keyboard shortcut
deck.navigation.keyboardHandler.addShortcut('t', () => {
  // Cycle through transitions
  const transitions = ['slide', 'fade', 'zoom', 'flip'];
  const current = deck.transitions.getTransition();
  const currentIndex = transitions.indexOf(current);
  const next = transitions[(currentIndex + 1) % transitions.length];
  deck.setTransition(next);
  console.log(`Transition: ${next}`);
});

// Listen to events
deck.on('afterSlideChange', ({ from, to }) => {
  console.log(`Navigated from slide ${from} to ${to}`);
});

deck.on('swipe', ({ direction, velocity }) => {
  console.log(`Swiped ${direction} with velocity ${velocity}`);
});

deck.on('fullscreenChange', ({ isFullscreen }) => {
  console.log(`Fullscreen: ${isFullscreen}`);
});

deck.on('transitionStart', ({ direction }) => {
  console.log(`Transition starting: ${direction}`);
});

// Export functions
document.getElementById('exportPDF').addEventListener('click', () => {
  deck.exportPDF();
});

document.getElementById('exportHTML').addEventListener('click', () => {
  deck.downloadHTML();
});

document.getElementById('exportJSON').addEventListener('click', () => {
  deck.downloadJSON();
});

// Fullscreen toggle
document.getElementById('fullscreen').addEventListener('click', () => {
  deck.toggleFullscreen();
});

// Dynamic transition changes
document.getElementById('transitionType').addEventListener('change', (e) => {
  deck.setTransition(e.target.value);
});

document.getElementById('transitionSpeed').addEventListener('change', (e) => {
  deck.setTransitionSpeed(e.target.value);
});
```

---

## Browser Compatibility

| Feature | Chrome | Firefox | Safari | Edge | IE11 |
|---------|--------|---------|--------|------|------|
| Touch Gestures | ✅ | ✅ | ✅ | ✅ | ✅ |
| Fullscreen | ✅ | ✅ | ✅ | ✅ | ✅ |
| Export PDF | ✅ | ✅ | ✅ | ✅ | ✅ |
| Export HTML | ✅ | ✅ | ✅ | ✅ | ✅ |
| Export JSON | ✅ | ✅ | ✅ | ✅ | ✅ |
| Transitions | ✅ | ✅ | ✅ | ✅ | ⚠️* |

*IE11 supports basic transitions but 3D transforms (flip) may have limited support.

---

## Performance Tips

1. **Use appropriate transitions**: Simple transitions (fade, slide) perform better than complex ones (flip, zoom)
2. **Adjust speed for content**: Slower transitions for text-heavy slides, faster for simple visuals
3. **Disable on low-end devices**: Use `transition: 'none'` for maximum performance
4. **Respect reduced motion**: Browser automatically disables animations for users who prefer reduced motion
5. **Optimize images**: Large images can slow down transitions

---

## Troubleshooting

### Touch gestures not working
- Ensure `touch: true` in configuration
- Check if touch events are supported: `'ontouchstart' in window`
- Verify no other touch handlers are preventing events

### Fullscreen not entering
- Check browser support: `deck.fullscreen.isSupported()`
- User interaction required: Fullscreen must be triggered by user action
- Check browser console for errors

### Export not working
- **PDF**: Ensure print dialog has permission to show
- **HTML/JSON**: Check browser allows file downloads
- Verify no popup blockers are interfering

### Transitions stuttering
- Reduce transition speed
- Check if too many elements on slide
- Verify GPU acceleration is working
- Check browser performance

---

## Next Steps

See the following files for working examples:
- `examples/html-example.html` - Basic HTML presentation
- `examples/markdown-example.html` - Markdown-based slides
- `examples/json-example.html` - JSON data source
- `examples/transitions-demo.html` - Interactive transition showcase

For more information, see:
- `DEVELOPMENT_PLAN.md` - Complete development roadmap
- `spec.md` - Full specification
- `README.md` - Getting started guide
