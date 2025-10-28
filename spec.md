# SenangWebs Deck (SWD) - Library Specification

## Overview

**SenangWebs Deck** (SWD) is a lightweight, flexible JavaScript library for creating beautiful, interactive slide presentations programmatically. It supports three input formats: declarative HTML attributes, Markdown, and JSON, making it adaptable to various workflows and use cases.

**Package Name:** `senangwebs-deck` | `swd`  
**NPM Package:** `@senangwebs/deck`  
**Version:** 1.0.0  
**License:** MIT

---

## Core Features

- 🎨 Multiple input formats (HTML attributes, Markdown, JSON)
- 📱 Responsive design with configurable aspect ratios
- 🎭 Built-in themes and customizable styling
- ⌨️ Keyboard navigation (arrow keys, spacebar)
- 🖱️ Touch/swipe support for mobile devices
- 🎯 Multiple layout templates
- 💻 Syntax highlighting for code blocks
- 🔄 Smooth transitions and animations
- 📊 Support for tables, lists, quotes, and media
- 🎬 Presentation mode with fullscreen support
- 📍 Progress indicator and slide counter
- 🔗 Deep linking to specific slides
- 📤 Export capabilities (PDF, HTML)
- 🎨 Custom CSS classes and inline styles

---

## Installation

### NPM
```bash
npm install senangwebs-deck
# or
yarn add senangwebs-deck
# or
pnpm add senangwebs-deck
```

### CDN
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/senangwebs-deck@latest/dist/swd.min.css">
<script src="https://cdn.jsdelivr.net/npm/senangwebs-deck@latest/dist/swd.min.js"></script>
```

### Direct Download
Download `swd.js` and `swd.css` from the releases page and include them in your project.

---

## Usage Methods

### 1. Declarative HTML Attributes

The most straightforward approach using custom data attributes.

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="dist/swd.css">
    <script src="dist/swd.js"></script>
</head>
<body>
    <div data-swd 
         data-swd-aspect-ratio="16/9" 
         data-swd-theme="dark"
         data-swd-controls="true"
         data-swd-progress="true">
        
        <div data-swd-page data-swd-layout="cover" data-swd-background="url-to-image.jpg">
            <h1>Welcome to My Presentation</h1>
            <p>A subtitle or tagline</p>
        </div>
        
        <div data-swd-page data-swd-layout="default">
            <h1>First Topic</h1>
            <p>Content goes here</p>
        </div>
        
    </div>
    
    <script>
        SWD.autoInit(); // Automatically initializes all [data-swd] elements
    </script>
</body>
</html>
```

### 2. Programmatic Initialization with Markdown

Load presentation content from Markdown files or strings.

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="dist/swd.css">
    <script src="dist/swd.js"></script>
</head>
<body>
    <div id="presentation"></div>
    
    <script>
        const container = document.getElementById('presentation');
        
        // Option A: Inline Markdown
        const markdown = `
---
layout: cover
background: https://example.com/bg.jpg
---

# Welcome to the Presentation

This is the first slide

---
layout: default
---

# Agenda

- First topic
- Second topic
- Third topic
        `;
        
        const presentation = SWD.init(container, {
            source: 'markdown',
            content: markdown,
            theme: 'dark',
            aspectRatio: '16/9',
            controls: true,
            progress: true
        });
        
        // Option B: Load from file
        const presentation2 = SWD.init(container, {
            source: 'markdown',
            content: './slides/presentation.md', // URL to markdown file
            theme: 'light',
            aspectRatio: '4/3'
        });
    </script>
</body>
</html>
```

### 3. Programmatic Initialization with JSON

Define presentation structure using JSON data.

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="dist/swd.css">
    <script src="dist/swd.js"></script>
</head>
<body>
    <div id="presentation"></div>
    
    <script>
        const container = document.getElementById('presentation');
        
        const slidesData = {
            slides: [
                {
                    layout: "cover",
                    background: "https://example.com/cover.jpg",
                    title: "Welcome",
                    content: "Presentation subtitle"
                },
                {
                    layout: "default",
                    title: "Agenda",
                    content: ["Item 1", "Item 2", "Item 3"]
                }
            ]
        };
        
        const presentation = SWD.init(container, {
            source: 'json',
            content: slidesData, // Can also be a URL to JSON file
            theme: 'gradient',
            aspectRatio: '16/9'
        });
    </script>
</body>
</html>
```

---

## Configuration Options

### Global Configuration Object

```javascript
const config = {
    // Source Configuration
    source: 'html' | 'markdown' | 'json',  // Input format (default: 'html')
    content: String | Object,               // Content string/object or URL to file
    
    // Display Options
    theme: 'light' | 'dark' | 'gradient' | 'minimal' | 'custom',  // Theme name
    aspectRatio: '16/9' | '4/3' | '3/2' | '16/10',               // Slide dimensions
    backgroundColor: '#ffffff',                                   // Background color
    textColor: '#000000',                                         // Default text color
    
    // UI Controls
    controls: true,              // Show navigation arrows
    progress: true,              // Show progress bar
    slideNumbers: true,          // Show slide counter
    hash: true,                  // Enable URL hash navigation
    keyboard: true,              // Enable keyboard shortcuts
    touch: true,                 // Enable touch/swipe gestures
    mouseWheel: false,           // Navigate with mouse wheel
    
    // Transitions
    transition: 'slide' | 'fade' | 'zoom' | 'flip' | 'none',  // Transition type
    transitionSpeed: 'fast' | 'normal' | 'slow',              // Transition duration
    
    // Code Highlighting
    highlightTheme: 'monokai' | 'github' | 'dracula' | 'vs',  // Code theme
    highlightLanguages: ['javascript', 'python', 'html'],      // Supported languages
    
    // Presentation Mode
    fullscreen: true,            // Enable fullscreen toggle
    overview: true,              // Enable overview mode (grid view)
    
    // Export Options
    exportable: true,            // Enable export functionality
    exportFormats: ['pdf', 'html'],  // Available export formats
    
    // Callbacks
    onSlideChange: (current, previous) => {},    // Fired on slide change
    onInit: (presentation) => {},                 // Fired when initialized
    onReady: (presentation) => {},                // Fired when fully loaded
    
    // Advanced
    rtl: false,                  // Right-to-left support
    loop: false,                 // Loop back to first slide
    autoSlide: 0,                // Auto-advance interval (ms, 0=disabled)
    pauseOnHover: true,          // Pause auto-slide on hover
    customCSS: '',               // Additional CSS string
    plugins: []                  // Array of plugin objects
};

const presentation = SWD.init(container, config);
```

---

## Slide Layouts

### 1. **Cover Layout**
Full-screen title slide with optional background image.

**HTML Attributes:**
```html
<div data-swd-page 
     data-swd-layout="cover" 
     data-swd-background="image-url.jpg"
     data-swd-overlay="0.5">
    <h1>Main Title</h1>
    <p>Subtitle or tagline</p>
</div>
```

**Markdown:**
```markdown
---
layout: cover
background: image-url.jpg
overlay: 0.5
---

# Main Title

Subtitle or tagline
```

**JSON:**
```json
{
    "layout": "cover",
    "background": "image-url.jpg",
    "overlay": 0.5,
    "title": "Main Title",
    "content": "Subtitle or tagline"
}
```

### 2. **Default Layout**
Standard single-column content layout.

**HTML Attributes:**
```html
<div data-swd-page data-swd-layout="default">
    <h1>Slide Title</h1>
    <p>Body content with text, lists, etc.</p>
    <ul>
        <li>Point 1</li>
        <li>Point 2</li>
    </ul>
</div>
```

**Markdown:**
```markdown
---
layout: default
---

# Slide Title

Body content with text, lists, etc.

- Point 1
- Point 2
```

**JSON:**
```json
{
    "layout": "default",
    "title": "Slide Title",
    "content": "Body content",
    "list": ["Point 1", "Point 2"]
}
```

### 3. **Two Columns Layout**
Split content into left and right columns.

**HTML Attributes:**
```html
<div data-swd-page data-swd-layout="two-cols">
    <h1>Two Column Layout</h1>
    <div>
        <p>Left column content</p>
    </div>
    <div data-swd-right>
        <p>Right column content</p>
    </div>
</div>
```

**Markdown:**
```markdown
---
layout: two-cols
---

# Two Column Layout

Left column content

::right::

Right column content
```

**JSON:**
```json
{
    "layout": "two-cols",
    "title": "Two Column Layout",
    "left": "Left column content",
    "right": "Right column content"
}
```

### 4. **Center Layout**
Vertically and horizontally centered content.

**HTML Attributes:**
```html
<div data-swd-page data-swd-layout="center">
    <h1>Centered Title</h1>
    <p>Centered content text</p>
</div>
```

**Markdown:**
```markdown
---
layout: center
---

# Centered Title

Centered content text
```

**JSON:**
```json
{
    "layout": "center",
    "title": "Centered Title",
    "content": "Centered content text"
}
```

### 5. **Quote Layout**
Large quote display with attribution.

**HTML Attributes:**
```html
<div data-swd-page data-swd-layout="quote">
    <h1>"The quote text goes here"</h1>
    <p>— Attribution</p>
</div>
```

**Markdown:**
```markdown
---
layout: quote
---

# "The quote text goes here"

— Attribution
```

**JSON:**
```json
{
    "layout": "quote",
    "quote": "The quote text goes here",
    "author": "Attribution"
}
```

### 6. **Image Right Layout**
Content on left, image on right.

**HTML Attributes:**
```html
<div data-swd-page 
     data-swd-layout="image-right" 
     data-swd-background="image-url.jpg">
    <h1>Content Title</h1>
    <ul>
        <li>Point 1</li>
        <li>Point 2</li>
    </ul>
</div>
```

**Markdown:**
```markdown
---
layout: image-right
background: image-url.jpg
---

# Content Title

- Point 1
- Point 2
```

**JSON:**
```json
{
    "layout": "image-right",
    "background": "image-url.jpg",
    "title": "Content Title",
    "content": ["Point 1", "Point 2"]
}
```

### 7. **Image Left Layout**
Image on left, content on right.

**HTML Attributes:**
```html
<div data-swd-page 
     data-swd-layout="image-left" 
     data-swd-background="image-url.jpg">
    <h1>Content Title</h1>
    <p>Content on the right side</p>
</div>
```

**Markdown:**
```markdown
---
layout: image-left
background: image-url.jpg
---

# Content Title

Content on the right side
```

**JSON:**
```json
{
    "layout": "image-left",
    "background": "image-url.jpg",
    "title": "Content Title",
    "content": "Content on the right side"
}
```

### 8. **Full Image Layout**
Full-screen image with optional overlay text.

**HTML Attributes:**
```html
<div data-swd-page 
     data-swd-layout="full-image" 
     data-swd-background="image-url.jpg"
     data-swd-overlay="0.3">
    <h1>Optional Overlay Text</h1>
</div>
```

**Markdown:**
```markdown
---
layout: full-image
background: image-url.jpg
overlay: 0.3
---

# Optional Overlay Text
```

**JSON:**
```json
{
    "layout": "full-image",
    "background": "image-url.jpg",
    "overlay": 0.3,
    "title": "Optional Overlay Text"
}
```

### 9. **Section Layout**
Section divider slide.

**HTML Attributes:**
```html
<div data-swd-page data-swd-layout="section" data-swd-background="#4a90e2">
    <h1>Section Title</h1>
    <p>Section number or description</p>
</div>
```

**Markdown:**
```markdown
---
layout: section
background: '#4a90e2'
---

# Section Title

Section number or description
```

**JSON:**
```json
{
    "layout": "section",
    "background": "#4a90e2",
    "title": "Section Title",
    "content": "Section number or description"
}
```

### 10. **Three Columns Layout**
Split content into three equal columns.

**HTML Attributes:**
```html
<div data-swd-page data-swd-layout="three-cols">
    <h1>Three Columns</h1>
    <div data-swd-col="1">Column 1</div>
    <div data-swd-col="2">Column 2</div>
    <div data-swd-col="3">Column 3</div>
</div>
```

**Markdown:**
```markdown
---
layout: three-cols
---

# Three Columns

::col-1::
Column 1

::col-2::
Column 2

::col-3::
Column 3
```

**JSON:**
```json
{
    "layout": "three-cols",
    "title": "Three Columns",
    "columns": ["Column 1", "Column 2", "Column 3"]
}
```

---

## Special Content Types

### Code Blocks

**HTML:**
```html
<pre><code class="language-javascript">
function hello() {
    console.log('Hello World');
}
</code></pre>
```

**Markdown:**
```markdown
```javascript
function hello() {
    console.log('Hello World');
}
```
```

**JSON:**
```json
{
    "code": {
        "language": "javascript",
        "snippet": "function hello() {\n    console.log('Hello World');\n}"
    }
}
```

### Tables

**HTML:**
```html
<table>
    <thead>
        <tr><th>Header 1</th><th>Header 2</th></tr>
    </thead>
    <tbody>
        <tr><td>Cell 1</td><td>Cell 2</td></tr>
    </tbody>
</table>
```

**Markdown:**
```markdown
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
```

**JSON:**
```json
{
    "table": {
        "headers": ["Header 1", "Header 2"],
        "rows": [["Cell 1", "Cell 2"]]
    }
}
```

### Images

**HTML:**
```html
<img src="image.jpg" alt="Description" data-swd-width="80%">
```

**Markdown:**
```markdown
![Description](image.jpg)
```

**JSON:**
```json
{
    "image": {
        "src": "image.jpg",
        "alt": "Description",
        "width": "80%"
    }
}
```

### Videos

**HTML:**
```html
<video data-swd-autoplay="false" data-swd-controls="true">
    <source src="video.mp4" type="video/mp4">
</video>
```

**Markdown:**
```markdown
![video](video.mp4)
```

**JSON:**
```json
{
    "video": {
        "src": "video.mp4",
        "autoplay": false,
        "controls": true
    }
}
```

---

## API Methods

### Initialization

```javascript
// Auto-initialize all [data-swd] elements
SWD.autoInit();

// Manual initialization
const presentation = SWD.init(container, options);
```

### Navigation

```javascript
presentation.next();           // Go to next slide
presentation.prev();           // Go to previous slide
presentation.goTo(index);      // Go to specific slide (0-based)
presentation.goToFirst();      // Go to first slide
presentation.goToLast();       // Go to last slide
```

### Presentation Control

```javascript
presentation.start();          // Enter presentation mode
presentation.stop();           // Exit presentation mode
presentation.toggleFullscreen(); // Toggle fullscreen
presentation.toggleOverview();   // Toggle overview mode
presentation.play();           // Start auto-slide
presentation.pause();          // Pause auto-slide
```

### State

```javascript
presentation.getCurrentSlide();     // Get current slide index
presentation.getTotalSlides();      // Get total number of slides
presentation.isFullscreen();        // Check fullscreen state
presentation.isPaused();            // Check if auto-slide is paused
```

### Export

```javascript
presentation.exportToPDF();         // Export as PDF
presentation.exportToHTML();        // Export as standalone HTML
presentation.exportToJSON();        // Export structure as JSON
```

### Updates

```javascript
presentation.reload();              // Reload presentation content
presentation.update(newConfig);     // Update configuration
presentation.destroy();             // Clean up and remove presentation
```

### Events

```javascript
presentation.on('slidechange', (current, previous) => {
    console.log(`Changed from ${previous} to ${current}`);
});

presentation.on('ready', () => {
    console.log('Presentation is ready');
});

presentation.on('fullscreenchange', (isFullscreen) => {
    console.log('Fullscreen:', isFullscreen);
});

presentation.off('slidechange', handler); // Remove event listener
```

---

## Themes

### Built-in Themes

1. **Light** - Clean, bright theme with dark text
2. **Dark** - Dark background with light text
3. **Gradient** - Colorful gradient backgrounds
4. **Minimal** - Ultra-minimalist design
5. **Corporate** - Professional business theme
6. **Creative** - Bold, artistic theme
7. **Academic** - Traditional scholarly style

### Custom Theme

```javascript
SWD.registerTheme('myTheme', {
    backgroundColor: '#1a1a2e',
    textColor: '#eaeaea',
    accentColor: '#16213e',
    fontFamily: 'Arial, sans-serif',
    headingColor: '#0f3460',
    linkColor: '#e94560',
    codeBackground: '#0f3460',
    codeColor: '#eaeaea'
});

const presentation = SWD.init(container, {
    theme: 'myTheme'
});
```

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `→` or `Space` | Next slide |
| `←` | Previous slide |
| `Home` | First slide |
| `End` | Last slide |
| `F` | Toggle fullscreen |
| `O` | Toggle overview mode |
| `P` | Pause/resume auto-slide |
| `Esc` | Exit fullscreen/overview |
| `Number + Enter` | Jump to slide number |

---

## Use Cases

### 1. **Technical Documentation**
```javascript
// Load from markdown file for easy documentation
SWD.init(document.getElementById('docs'), {
    source: 'markdown',
    content: './docs/api-documentation.md',
    theme: 'academic',
    highlightTheme: 'github'
});
```

### 2. **Product Pitch Deck**
```javascript
// JSON-based slides for dynamic content
const pitchData = await fetch('/api/pitch-deck').then(r => r.json());
SWD.init(document.getElementById('pitch'), {
    source: 'json',
    content: pitchData,
    theme: 'gradient',
    transition: 'zoom'
});
```

### 3. **Educational Course**
```javascript
// HTML attributes for course materials
SWD.autoInit(); // Initializes all [data-swd] elements
// Course content in HTML with data attributes
```

### 4. **Conference Talk**
```javascript
// Full-featured presentation
SWD.init(container, {
    source: 'markdown',
    content: './talk.md',
    theme: 'dark',
    controls: true,
    progress: true,
    slideNumbers: true,
    fullscreen: true,
    overview: true,
    exportable: true
});
```

### 5. **Portfolio Showcase**
```javascript
// Visual-heavy presentation
SWD.init(container, {
    source: 'json',
    content: portfolioData,
    theme: 'creative',
    transition: 'fade',
    aspectRatio: '16/9',
    loop: true,
    autoSlide: 5000
});
```

---

## Plugins System

### Creating a Plugin

```javascript
const myPlugin = {
    name: 'myPlugin',
    version: '1.0.0',
    
    init: function(presentation) {
        // Plugin initialization
        console.log('Plugin initialized');
    },
    
    beforeSlideChange: function(current, next) {
        // Hook before slide change
    },
    
    afterSlideChange: function(current, previous) {
        // Hook after slide change
    },
    
    destroy: function() {
        // Cleanup when presentation is destroyed
    }
};

// Register plugin
SWD.registerPlugin(myPlugin);

// Use in presentation
const presentation = SWD.init(container, {
    plugins: ['myPlugin']
});
```

### Built-in Plugins

1. **Notes** - Speaker notes panel
2. **Timer** - Presentation timer
3. **Laser Pointer** - Virtual laser pointer
4. **Drawing** - Draw on slides
5. **Recording** - Record presentation
6. **Analytics** - Track slide views
7. **Collaboration** - Real-time collaboration

---

## Advanced Features

### Slide Fragments (Progressive Reveal)

**HTML:**
```html
<ul>
    <li data-swd-fragment="1">Appears first</li>
    <li data-swd-fragment="2">Appears second</li>
    <li data-swd-fragment="3">Appears third</li>
</ul>
```

**Markdown:**
```markdown
- {1} Appears first
- {2} Appears second
- {3} Appears third
```

### Nested Slides (Vertical Navigation)

```html
<div data-swd-page>
    <h1>Main Slide</h1>
</div>

<div data-swd-page data-swd-nested="true">
    <h1>Nested Slide (↓)</h1>
</div>
```

### Custom Animations

```html
<div data-swd-page data-swd-animation="slide-up">
    <h1 data-swd-animation="fade-in" data-swd-animation-delay="0.5s">
        Animated Title
    </h1>
</div>
```

### Media Queries & Responsive Slides

```html
<div data-swd-page>
    <div data-swd-show="desktop">Desktop Content</div>
    <div data-swd-show="mobile">Mobile Content</div>
</div>
```

---

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari 12+, Chrome Android 80+

---

## Performance Considerations

- Lazy-load images and videos
- Limit number of slides for optimal performance (recommended: <100 slides)
- Use WebP format for images when possible
- Minify and compress assets
- Use CDN for external resources
- Implement virtual scrolling for large presentations

---

## Accessibility

- Full keyboard navigation support
- ARIA labels and roles
- Screen reader compatible
- High contrast mode support
- Focus management
- Reduced motion support (respects `prefers-reduced-motion`)

---

## File Structure

```
senangwebs-deck/
├── dist/
│   ├── swd.js              # Main library
│   ├── swd.min.js          # Minified version
│   ├── swd.css             # Styles
│   └── swd.min.css         # Minified styles
├── src/
│   ├── core/
│   │   ├── parser.js       # Content parser
│   │   ├── renderer.js     # Slide renderer
│   │   └── navigation.js   # Navigation logic
│   ├── layouts/
│   │   └── *.js            # Layout templates
│   ├── themes/
│   │   └── *.css           # Theme styles
│   └── plugins/
│       └── *.js            # Plugin modules
├── examples/
│   ├── html-example.html
│   ├── markdown-example.html
│   └── json-example.html
└── docs/
    └── api.md
```

---

## Development Workflow

### Building the Library

```bash
npm install
npm run build          # Build production version
npm run dev            # Development mode with hot reload
npm run test           # Run tests
npm run lint           # Lint code
```

### Example Development Setup

```javascript
// main.js
import SWD from './src/index.js';

const presentation = SWD.init(document.getElementById('app'), {
    source: 'markdown',
    content: './slides.md',
    theme: 'dark',
    onSlideChange: (current) => {
        console.log('Current slide:', current);
    }
});
```

---

## Testing Requirements

### Unit Tests
- Parser functions (HTML, Markdown, JSON)
- Layout rendering
- Navigation logic
- Theme application
- Configuration handling

### Integration Tests
- Full presentation lifecycle
- Plugin integration
- Event handling
- Export functionality

### E2E Tests
- User interactions (keyboard, mouse, touch)
- Slide transitions
- Fullscreen mode
- Overview mode
- Cross-browser compatibility

---

## Error Handling

```javascript
try {
    const presentation = SWD.init(container, config);
} catch (error) {
    if (error instanceof SWD.ParseError) {
        console.error('Failed to parse content:', error.message);
    } else if (error instanceof SWD.ConfigError) {
        console.error('Invalid configuration:', error.message);
    } else {
        console.error('Unexpected error:', error);
    }
}
```

---

## Migration Guide

### From Reveal.js
```javascript
// Reveal.js
Reveal.initialize({ /* config */ });

// SenangWebs Deck
SWD.init(container, { /* config */ });
```

### From Swiper
```javascript
// Swiper
new Swiper('.swiper', { /* config */ });

// SenangWebs Deck
SWD.init(container, {
    transition: 'slide',
    loop: true
});
```

---

## Contributing Guidelines

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## Roadmap

### Version 1.1
- [ ] Video background support
- [ ] PDF viewer integration
- [ ] Live code editing
- [ ] Collaborative editing

### Version 1.2
- [ ] 3D transitions
- [ ] WebGL backgrounds
- [ ] AR presentation mode
- [ ] Voice control

### Version 2.0
- [ ] WYSIWYG editor
- [ ] Cloud storage integration
- [ ] Real-time collaboration
- [ ] Mobile app

---

## License

MIT License - See LICENSE file for details

---

## Credits

- Inspired by Reveal.js, Slidev, and Impress.js
- Icons from Lucide Icons
- Code highlighting by Prism.js
- Markdown parsing by Marked.js

---

## Support

- Documentation: https://senangwebs.dev/deck/docs
- GitHub Issues: https://github.com/senangwebs/deck/issues
- Discord Community: https://discord.gg/senangwebs
- Email: support@senangwebs.dev

---