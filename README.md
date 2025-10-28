# SenangWebs Deck (SWD)

[![npm version](https://img.shields.io/npm/v/@senangwebs/deck.svg)](https://www.npmjs.com/package/@senangwebs/deck)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

**A modern, lightweight JavaScript library for creating beautiful web-based presentations with multiple input formats (HTML, Markdown, JSON).**

---

## 🚀 Features

- **Multiple Input Formats**: Create slides using HTML attributes, Markdown, or JSON
- **10+ Built-in Layouts**: Cover, two-column, center, quote, image layouts, and more
- **7 Beautiful Themes**: Light, dark, gradient, minimal, corporate, creative, and academic
- **Smooth Transitions**: Slide, fade, zoom, flip animations
- **Keyboard & Touch Navigation**: Full keyboard shortcuts and swipe gestures
- **Syntax Highlighting**: Beautiful code blocks with Prism.js
- **Export Options**: Export to PDF, HTML, or JSON
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Plugin System**: Extend functionality with plugins (notes, timer, etc.)
- **Accessibility**: WCAG 2.1 compliant with full keyboard navigation

---

## 📦 Installation

### Via NPM
```bash
npm install @senangwebs/deck
```

### Via CDN
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@senangwebs/deck/dist/swd.css">
<script src="https://cdn.jsdelivr.net/npm/@senangwebs/deck/dist/swd.js"></script>
```

---

## 🎯 Quick Start

### HTML Attributes

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="node_modules/@senangwebs/deck/dist/swd.css">
</head>
<body>
  <div id="presentation">
    <div data-swd-page data-swd-layout="cover" data-swd-background="gradient-blue">
      <h1>Welcome to SWD</h1>
      <p>Beautiful presentations made easy</p>
    </div>
    
    <div data-swd-page data-swd-layout="default">
      <h2>Getting Started</h2>
      <p>Create amazing slides with minimal effort.</p>
    </div>
  </div>

  <script src="node_modules/@senangwebs/deck/dist/swd.js"></script>
  <script>
    const deck = new SWD('#presentation', {
      theme: 'light',
      transition: 'slide'
    });
  </script>
</body>
</html>
```

### Markdown

```html
<div id="presentation" data-swd-source="markdown">
---
layout: cover
background: gradient-blue
---

# Welcome to SWD
Beautiful presentations made easy

---
layout: default
---

## Getting Started
Create amazing slides with minimal effort.
</div>

<script>
  const deck = new SWD('#presentation');
</script>
```

### JSON

```javascript
const slides = {
  slides: [
    {
      layout: "cover",
      title: "Welcome to SWD",
      subtitle: "Beautiful presentations made easy",
      background: "gradient-blue"
    },
    {
      layout: "default",
      title: "Getting Started",
      content: "Create amazing slides with minimal effort."
    }
  ]
};

const deck = new SWD('#presentation', {
  source: 'json',
  data: slides
});
```

---

## 📖 Documentation

- [Getting Started Guide](docs/getting-started.md)
- [API Documentation](docs/api.md)
- [Examples](examples/)

---

## 🎨 Available Layouts

- `cover` - Full-screen title slide
- `default` - Single column content
- `center` - Centered content
- `two-cols` - Split left/right columns
- `three-cols` - Three equal columns
- `section` - Section divider
- `quote` - Large quote display
- `image-right` - Content left, image right
- `image-left` - Image left, content right
- `full-image` - Full-screen image with overlay

---

## 🎭 Available Themes

- `light` - Clean, bright theme
- `dark` - Dark mode
- `gradient` - Colorful gradients
- `minimal` - Ultra-minimal
- `corporate` - Professional business
- `creative` - Bold and artistic
- `academic` - Traditional scholarly

---

## ⌨️ Keyboard Shortcuts

- `→` / `Space` - Next slide
- `←` - Previous slide
- `Home` - First slide
- `End` - Last slide
- `F` - Toggle fullscreen
- `O` - Toggle overview mode
- `P` - Pause auto-slide
- `Esc` - Exit fullscreen/overview

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Marked.js](https://marked.js.org/) - Markdown parsing
- [Prism.js](https://prismjs.com/) - Syntax highlighting
- [DOMPurify](https://github.com/cure53/DOMPurify) - HTML sanitization

---

**Made with ❤️ by SenangWebs**
