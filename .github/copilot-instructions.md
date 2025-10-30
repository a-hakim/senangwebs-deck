# Copilot Instructions for SenangWebs Deck (SWD)

## Project Overview
SenangWebs Deck is a presentation library supporting three input formats (HTML, Markdown, JSON) with a modular architecture separating parsing, layout rendering, and presentation control.

## Architecture

### Core Pipeline (src/js/core/)
1. **Parser** (`parser.js`) - Factory that delegates to format-specific parsers
2. **HtmlParser/MarkdownParser/JsonParser** (`parsers/`) - Parse input → slideData array
3. **Renderer** (`renderer.js`) - Converts slideData → DOM using layout modules
4. **Navigation** (`navigation.js`) - Handles slide transitions and keyboard/touch controls

**Key Pattern**: Each parser returns an array of `slideData` objects with structure:
```javascript
{
  index: 0,
  layout: 'two-cols',    // matches key in layouts/index.js
  content: '...',         // raw HTML or parsed content
  columns: ['...', '...'], // for multi-column layouts (data-swd-column)
  quote: '...',           // for quote layout
  author: '...',          // for quote layout
  background: '...',      // background styling
  attributes: {}          // all data-swd-* attributes
}
```

### Layout System (src/js/layouts/)
Each layout exports a `render(slideData)` method returning an HTMLElement. Layouts check multiple data shapes for backward compatibility:
- **two-cols.js**: Checks `columns` array first, then `left`/`right` properties, then `::right::` marker
- **three-cols.js**: Checks `columns` array first, then `::col-N::` markers
- **quote.js**: Checks `quote`/`author` properties first, then raw `content`

**When adding layouts**: Register in `layouts/index.js` with kebab-case key and create matching CSS in `src/css/layouts/`.

### Auto-Initialization (src/js/swd.js)
Elements with `data-swd-id` auto-initialize on DOM load. The `readDataAttributes()` method maps:
- `data-swd-theme` → config.theme
- `data-swd-transition` → config.transition
- `data-swd-keyboard/controls/progress` → booleans (handles "true"/"false" strings)
- `data-swd-autoplay-delay` → parseInt for numbers

**No JS required pattern**:
```html
<div data-swd-id="deck" data-swd-theme="dark" data-swd-transition="fade">
  <div data-swd-page data-swd-layout="cover">...</div>
</div>
<script src="swd.js"></script> <!-- Auto-initializes! -->
```

## Development Workflows

### Building
```bash
npm run build          # Production build → dist/
npm run build:dev      # Development build with source maps
npm run dev            # Dev server with hot reload at localhost:8080
```

### Code Style
- **ESLint**: Airbnb base config + Prettier
- **Naming**: kebab-case for CSS classes/layouts, camelCase for JS, data-swd-* for HTML attributes
- **File structure**: Mirror CSS and JS structure (layouts/, themes/, components/)

## Critical Conventions

### HTML Attribute Pattern
- `data-swd-page` marks slides
- `data-swd-layout="name"` selects layout (must match layouts/index.js key)
- `data-swd-column` wraps column content (extracted by HtmlParser.parseColumns())
- `data-swd-background` applies inline styles/gradients

### Column Separation
Use `data-swd-column` wrapper divs (preferred) or text markers:
```html
<!-- Preferred -->
<div data-swd-layout="two-cols">
  <div data-swd-column>Left content</div>
  <div data-swd-column>Right content</div>
</div>

<!-- Fallback (backward compatible) -->
<div data-swd-layout="two-cols">
  Left content
  ::right::
  Right content
</div>
```

### Quote Layout Structure
JSON parser renders subtitle as `<h2>` not `<p>` (see json-parser.js line 172). Quote layout expects:
```html
<blockquote class="swd-quote-text">Quote text</blockquote>
<cite class="swd-quote-author">— Author</cite>
```

### CSS Organization
- `src/css/swd.css` is entry point with @imports
- `base/variables.css` defines CSS custom properties
- Themes apply via `.swd-theme-{name}` class on container
- Layouts scoped to `.swd-layout-{name}` class

## Common Patterns

### Adding a New Layout
1. Create `src/js/layouts/my-layout.js` with `render(slideData)` export
2. Add to `layouts/index.js` as `'my-layout': myLayout`
3. Create `src/css/layouts/my-layout.css` with `.swd-layout-my-layout` styles
4. Import CSS in `src/css/swd.css`

### Extending Parsers
Parser methods should be pure (no DOM manipulation). Return slideData objects; let Renderer handle DOM. Use `columns` array for multi-column content to work with all layouts.

### Event System
SWD extends EventEmitter (core/events.js). Key events: `beforeInit`, `afterInit`, `slideChanged`, `ready`. Subscribe via `deck.on('event', handler)`.

## Examples Location
`examples/` contains three demos showcasing identical content in different formats:
- `html-example.html` - Data attributes with auto-init
- `markdown-example.html` - Loads from `slides/demo.md`
- `json-example.html` - Loads from `data/demo.json`

Use these to verify cross-format consistency when changing parsers/layouts.
