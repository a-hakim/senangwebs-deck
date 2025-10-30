# Getting Started with SenangWebs Deck

Welcome to SenangWebs Deck (SWD)! This guide will help you create your first presentation.

## Table of Contents

- [Installation](#installation)
- [Creating Your First Presentation](#creating-your-first-presentation)
- [Input Formats](#input-formats)
- [Configuration Options](#configuration-options)
- [Navigation](#navigation)
- [Next Steps](#next-steps)

## Installation

### Option 1: NPM (Recommended)

```bash
npm install senangwebs-deck
```

Then import in your project:

```javascript
import SWD from 'senangwebs-deck';
import 'senangwebs-deck/dist/swd.css';
```

### Option 2: CDN

Include the CSS and JS files directly in your HTML:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/senangwebs-deck/dist/swd.css">
<script src="https://cdn.jsdelivr.net/npm/senangwebs-deck/dist/swd.js"></script>
```

### Option 3: Download

Download the latest release from [GitHub releases](https://github.com/senangwebs/deck/releases) and include the files:

```html
<link rel="stylesheet" href="path/to/swd.css">
<script src="path/to/swd.js"></script>
```

## Creating Your First Presentation

### Basic HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My First Presentation</title>
  <link rel="stylesheet" href="node_modules/senangwebs-deck/dist/swd.css">
</head>
<body>
  <div id="presentation">
    <!-- Your slides will go here -->
  </div>

  <script src="node_modules/senangwebs-deck/dist/swd.js"></script>
  <script>
    const deck = new SWD('#presentation', {
      theme: 'light',
      transition: 'slide'
    });
  </script>
</body>
</html>
```

## Input Formats

SWD supports three input formats. Choose the one that fits your workflow best!

### 1. HTML Attributes (Simple and Direct)

Perfect for when you want full control over your HTML structure.

```html
<div id="presentation">
  <!-- Cover Slide -->
  <div data-swd-page data-swd-layout="cover">
    <h1>My Presentation</h1>
    <p>Subtitle goes here</p>
  </div>

  <!-- Content Slide -->
  <div data-swd-page data-swd-layout="default">
    <h2>First Topic</h2>
    <ul>
      <li>Point one</li>
      <li>Point two</li>
      <li>Point three</li>
    </ul>
  </div>

  <!-- Two Column Slide -->
  <div data-swd-page data-swd-layout="two-cols">
    <div class="left">
      <h2>Left Side</h2>
      <p>Content on the left</p>
    </div>
    <div class="right">
      <h2>Right Side</h2>
      <p>Content on the right</p>
    </div>
  </div>
</div>

<script>
  const deck = new SWD('#presentation', {
    source: 'html',
    theme: 'gradient'
  });
</script>
```

### 2. Markdown (Quick and Easy)

Perfect for rapid prototyping and text-heavy presentations.

Create a `slides.md` file:

```markdown
<!-- slide: cover -->
<!-- background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) -->

# My Presentation
## Welcome to SWD

---

<!-- slide: default -->

## First Topic

- Point one
- Point two
- Point three

---

<!-- slide: two-cols -->

## Left Side

Content on the left

<!-- column -->

## Right Side

Content on the right

---

<!-- slide: center -->

## Thank You!
```

Load it in your HTML:

```html
<div id="presentation" data-swd-source="markdown"></div>

<script>
  const deck = new SWD('#presentation', {
    source: 'markdown',
    markdownUrl: './slides.md',
    theme: 'gradient'
  });
</script>
```

**Markdown Syntax:**

- `---` separates slides
- `<!-- slide: layout-name -->` defines the slide layout
- `<!-- background: value -->` sets the background
- `<!-- column -->` splits content in two-column and three-column layouts
- Standard markdown syntax for formatting (headings, lists, bold, italic, code, etc.)

For complete markdown format documentation, see the [Markdown Format Guide](markdown-format.md).

### 3. JSON (Data-Driven)

Perfect for programmatic generation and CMS integration.

```javascript
const slides = {
  slides: [
    {
      layout: 'cover',
      title: 'My Presentation',
      subtitle: 'Welcome to SWD',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      layout: 'default',
      title: 'First Topic',
      content: '<ul><li>Point one</li><li>Point two</li><li>Point three</li></ul>'
    },
    {
      layout: 'two-cols',
      left: '<h2>Left Side</h2><p>Content on the left</p>',
      right: '<h2>Right Side</h2><p>Content on the right</p>'
    }
  ]
};

const deck = new SWD('#presentation', {
  source: 'json',
  data: slides,
  theme: 'gradient'
});
```

Or load from an external file:

```javascript
const deck = new SWD('#presentation', {
  source: 'json',
  jsonUrl: './slides.json',
  theme: 'gradient'
});
```

## Configuration Options

Here are the most common configuration options:

```javascript
const deck = new SWD('#presentation', {
  // Source type: 'html', 'markdown', or 'json'
  source: 'html',
  
  // External file URLs
  markdownUrl: './slides.md',  // For markdown
  jsonUrl: './slides.json',    // For JSON
  
  // Theme: 'light', 'dark', 'gradient', 'minimal', 'corporate', 'creative', 'academic'
  theme: 'light',
  
  // Transition: 'slide', 'fade', 'zoom', 'flip', 'none'
  transition: 'slide',
  
  // Transition speed: 'fast' (300ms), 'normal' (500ms), 'slow' (800ms), or number in ms
  transitionSpeed: 'normal',
  
  // Show navigation controls
  controls: true,
  
  // Show progress bar
  progress: true,
  
  // Enable keyboard navigation
  keyboard: true,
  
  // Enable touch/swipe gestures
  touch: true,
  
  // Auto-slide interval (0 = disabled)
  autoSlide: 0,
  
  // Loop through slides
  loop: false,
  
  // Auto-initialize (set to false for manual init)
  autoInit: true
});
```

## Navigation

### Keyboard Shortcuts

- **Arrow Right / Space** - Next slide
- **Arrow Left** - Previous slide
- **Home** - First slide
- **End** - Last slide
- **F** - Toggle fullscreen
- **O** - Toggle overview mode
- **P** - Pause/resume auto-slide
- **Esc** - Exit fullscreen or overview

### Touch Gestures

- **Swipe Left** - Next slide
- **Swipe Right** - Previous slide
- **Pinch** - Toggle overview mode

### Programmatic Navigation

```javascript
// Navigate to specific slide
deck.goTo(3);

// Next slide
deck.next();

// Previous slide
deck.prev();

// Go to first slide
deck.first();

// Go to last slide
deck.last();

// Get current slide index
const currentIndex = deck.getCurrentSlide();

// Get total number of slides
const totalSlides = deck.getTotalSlides();
```

## Available Layouts

### Cover
Full-screen title slide with centered content.

```html
<div data-swd-page data-swd-layout="cover">
  <h1>Main Title</h1>
  <h2>Subtitle</h2>
</div>
```

### Default
Single column with standard content flow.

```html
<div data-swd-page data-swd-layout="default">
  <h2>Title</h2>
  <p>Content goes here</p>
</div>
```

### Center
Centered content, perfect for important messages.

```html
<div data-swd-page data-swd-layout="center">
  <h2>Centered Message</h2>
  <p>Important information</p>
</div>
```

### Two Columns
Split content into left and right sections.

```html
<div data-swd-page data-swd-layout="two-cols">
  <div class="left">Left content</div>
  <div class="right">Right content</div>
</div>
```

### Three Columns
Three equal-width columns.

```html
<div data-swd-page data-swd-layout="three-cols">
  <div class="col-1">Column 1</div>
  <div class="col-2">Column 2</div>
  <div class="col-3">Column 3</div>
</div>
```

### Quote
Large, prominent quote display.

```html
<div data-swd-page data-swd-layout="quote">
  <blockquote>The only way to do great work is to love what you do.</blockquote>
  <cite>Steve Jobs</cite>
</div>
```

### Section
Section divider slide.

```html
<div data-swd-page data-swd-layout="section">
  <h1>Section Title</h1>
</div>
```

### Image Layouts
`image-right`, `image-left`, and `full-image` for image-heavy slides.

```html
<div data-swd-page data-swd-layout="image-right" data-swd-background="url(image.jpg)">
  <h2>Content</h2>
  <p>Text appears on the left, image on the right</p>
</div>
```

## Backgrounds

Add backgrounds to any slide:

```html
<!-- Image background -->
<div data-swd-page data-swd-background="./images/bg.jpg">
  <!-- Content -->
</div>

<!-- Gradient background -->
<div data-swd-page data-swd-background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
  <!-- Content -->
</div>

<!-- Solid color background -->
<div data-swd-page data-swd-background="#2c3e50">
  <!-- Content -->
</div>
```

## Next Steps

Now that you've created your first presentation, explore more advanced features:

- [API Documentation](api.md) - Detailed API reference
- [Examples](../examples/) - Sample presentations

## Tips and Best Practices

1. **Keep it Simple** - Less is more. Don't overload slides with content.
2. **Use Layouts** - Leverage built-in layouts for consistency.
3. **Choose the Right Format** - HTML for control, Markdown for speed, JSON for data.
4. **Test Navigation** - Always test keyboard, mouse, and touch navigation.
5. **Responsive Design** - Test on different screen sizes.
6. **Accessibility** - Use semantic HTML and provide alt text for images.

## Troubleshooting

### Slides not appearing
- Check that the container element exists
- Verify the source type matches your content
- Check browser console for errors

### Transitions not working
- Ensure transitions are enabled in config
- Check that transition name is valid
- Verify CSS is loaded correctly

### Keyboard navigation not working
- Make sure `keyboard: true` in config
- Check that no other scripts are capturing keyboard events
- Verify the presentation container has focus

## Getting Help

- **Documentation**: Check our full [API documentation](api.md)
- **Examples**: Browse the [examples folder](../examples/)
