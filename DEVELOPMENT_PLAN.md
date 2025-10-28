# SenangWebs Deck (SWD) - Development Plan

## Project Overview

**Library Name:** SenangWebs Deck (SWD)  
**Package:** `@senangwebs/deck`  
**Version:** 1.0.0  
**License:** MIT  
**Build System:** Webpack 5 + Babel

This document outlines the complete development roadmap for building the SenangWebs Deck presentation library from scratch.

---

## Phase 1: Project Setup & Infrastructure (Week 1)

### 1.1 Repository Initialization
- [x] Create Git repository structure
- [x] Initialize npm package (`npm init`)
- [x] Set up `.gitignore` for Node.js projects
- [x] Create basic `README.md`
- [x] Add `LICENSE` file (MIT)
- [ ] Set up GitHub repository with proper description

### 1.2 Development Dependencies Installation
```bash
npm install --save-dev webpack webpack-cli webpack-dev-server
npm install --save-dev @babel/core @babel/preset-env babel-loader
npm install --save-dev mini-css-extract-plugin css-loader
npm install --save-dev eslint eslint-config-airbnb-base
npm install --save-dev jest @testing-library/dom
npm install --save-dev prettier eslint-config-prettier
npm install --save-dev terser-webpack-plugin css-minimizer-webpack-plugin
```

### 1.3 Production Dependencies Installation
```bash
npm install marked prismjs
npm install dompurify
```

### 1.4 Configuration Files Setup
- [x] `webpack.config.js` - Build configuration
- [ ] `webpack.dev.js` - Development configuration
- [ ] `webpack.prod.js` - Production configuration
- [x] `.babelrc` - Babel transpilation settings
- [x] `.eslintrc.json` - Code linting rules
- [x] `.prettierrc` - Code formatting rules
- [x] `jest.config.js` - Testing configuration
- [ ] `tsconfig.json` (optional) - TypeScript definitions

### 1.5 Package.json Scripts
```json
{
  "scripts": {
    "dev": "webpack serve --mode development --open",
    "build": "webpack --mode production",
    "build:dev": "webpack --mode development",
    "test": "jest --coverage",
    "test:watch": "jest --watch",
    "lint": "eslint src/**/*.js",
    "lint:fix": "eslint src/**/*.js --fix",
    "format": "prettier --write \"src/**/*.{js,css}\"",
    "prepare": "npm run build"
  }
}
```

### 1.6 Directory Structure Creation
```
senangwebs-deck/
├── dist/                    # Build output (generated)
├── src/
│   ├── js/
│   │   ├── core/
│   │   │   ├── index.js
│   │   │   ├── parser.js
│   │   │   ├── renderer.js
│   │   │   ├── navigation.js
│   │   │   ├── events.js
│   │   │   └── config.js
│   │   ├── parsers/
│   │   │   ├── html-parser.js
│   │   │   ├── markdown-parser.js
│   │   │   └── json-parser.js
│   │   ├── layouts/
│   │   │   ├── cover.js
│   │   │   ├── default.js
│   │   │   ├── two-cols.js
│   │   │   ├── center.js
│   │   │   ├── quote.js
│   │   │   ├── image-right.js
│   │   │   ├── image-left.js
│   │   │   ├── full-image.js
│   │   │   ├── section.js
│   │   │   ├── three-cols.js
│   │   │   └── index.js
│   │   ├── plugins/
│   │   │   ├── plugin-manager.js
│   │   │   ├── notes.js
│   │   │   ├── timer.js
│   │   │   └── index.js
│   │   ├── utils/
│   │   │   ├── dom.js
│   │   │   ├── keyboard.js
│   │   │   ├── touch.js
│   │   │   ├── fullscreen.js
│   │   │   ├── export.js
│   │   │   └── helpers.js
│   │   └── swd.js           # Main entry point
│   └── css/
│       ├── base/
│       │   ├── reset.css
│       │   ├── typography.css
│       │   └── variables.css
│       ├── layouts/
│       │   ├── cover.css
│       │   ├── default.css
│       │   ├── two-cols.css
│       │   ├── center.css
│       │   ├── quote.css
│       │   ├── image-layouts.css
│       │   ├── section.css
│       │   └── three-cols.css
│       ├── themes/
│       │   ├── light.css
│       │   ├── dark.css
│       │   ├── gradient.css
│       │   ├── minimal.css
│       │   ├── corporate.css
│       │   ├── creative.css
│       │   └── academic.css
│       ├── components/
│       │   ├── controls.css
│       │   ├── progress.css
│       │   ├── slide-numbers.css
│       │   ├── overview.css
│       │   └── code-highlight.css
│       └── swd.css           # Main CSS entry
├── examples/
│   ├── html-example.html
│   ├── markdown-example.html
│   ├── json-example.html
│   ├── slides/
│   │   └── demo.md
│   └── data/
│       └── demo.json
├── tests/
│   ├── unit/
│   │   ├── parsers.test.js
│   │   ├── renderer.test.js
│   │   ├── navigation.test.js
│   │   └── layouts.test.js
│   ├── integration/
│   │   ├── lifecycle.test.js
│   │   └── plugins.test.js
│   └── e2e/
│       └── user-interactions.test.js
├── docs/
│   ├── api.md
│   ├── getting-started.md
│   └── examples/
├── .gitignore
├── .babelrc
├── .eslintrc.json
├── .prettierrc
├── jest.config.js
├── webpack.config.js
├── package.json
├── README.md
├── LICENSE
└── CHANGELOG.md
```

---

## Phase 2: Core Foundation (Week 2-3)

### 2.1 Configuration System (`src/js/core/config.js`)
**Purpose:** Manage default settings and merge user configurations

```javascript
// Features to implement:
- Default configuration object
- Configuration validation
- Deep merge utility for nested configs
- Type checking for config values
- Error handling for invalid configs
```

**Tasks:**
- [ ] Create `DefaultConfig` object with all options from spec
- [ ] Implement `validateConfig()` function
- [ ] Implement `mergeConfig(defaults, userConfig)` function
- [ ] Add configuration error classes
- [ ] Write unit tests for config validation

### 2.2 Event System (`src/js/core/events.js`)
**Purpose:** Custom event emitter for presentation lifecycle events

```javascript
// Features to implement:
- Event registration (on/once)
- Event removal (off)
- Event emission (emit)
- Wildcard event listeners
- Event history tracking
```

**Tasks:**
- [ ] Create `EventEmitter` class
- [ ] Implement `on(event, handler)` method
- [ ] Implement `off(event, handler)` method
- [ ] Implement `emit(event, data)` method
- [ ] Implement `once(event, handler)` method
- [ ] Add event namespacing support
- [ ] Write unit tests for event system

### 2.3 DOM Utilities (`src/js/utils/dom.js`)
**Purpose:** Helper functions for DOM manipulation

```javascript
// Functions to implement:
- createElement(tag, attrs, children)
- addClass/removeClass/toggleClass
- getAttributes(element, prefix)
- sanitizeHTML(html)
- querySelector/querySelectorAll wrappers
- parseHTML(htmlString)
```

**Tasks:**
- [ ] Implement DOM creation helpers
- [ ] Implement class manipulation utilities
- [ ] Implement attribute parsing for `data-swd-*`
- [ ] Add HTML sanitization (integrate DOMPurify)
- [ ] Create safe DOM query functions
- [ ] Write unit tests for DOM utilities

### 2.4 Main SWD Class (`src/js/swd.js`)
**Purpose:** Primary API interface and presentation controller

```javascript
// Class structure:
class SWD {
  constructor(container, options)
  init()
  destroy()
  
  // Public API methods from spec
  next()
  prev()
  goTo(index)
  start()
  stop()
  // ... etc
}
```

**Tasks:**
- [ ] Create `SWD` class skeleton
- [ ] Implement constructor and initialization
- [ ] Set up instance properties (container, config, state)
- [ ] Implement `autoInit()` static method
- [ ] Create presentation state manager
- [ ] Add error boundary handling
- [ ] Write integration tests

---

## Phase 3: Content Parsers (Week 3-4)

### 3.1 HTML Attribute Parser (`src/js/parsers/html-parser.js`)
**Purpose:** Parse declarative HTML with `data-swd-*` attributes

**Implementation Steps:**
1. [ ] Scan container for `[data-swd-page]` elements
2. [ ] Extract all `data-swd-*` attributes from each slide
3. [ ] Parse layout type (`data-swd-layout`)
4. [ ] Parse background settings (`data-swd-background`, `data-swd-overlay`)
5. [ ] Parse custom attributes (`data-swd-animation`, etc.)
6. [ ] Extract slide content (innerHTML)
7. [ ] Return normalized slide data structure
8. [ ] Handle nested slides (`data-swd-nested`)
9. [ ] Parse fragments (`data-swd-fragment`)
10. [ ] Write comprehensive tests

**Output Format:**
```javascript
[
  {
    index: 0,
    layout: 'cover',
    background: 'url.jpg',
    overlay: 0.5,
    content: '<h1>Title</h1>',
    attributes: { /* custom attrs */ }
  },
  // ... more slides
]
```

### 3.2 Markdown Parser (`src/js/parsers/markdown-parser.js`)
**Purpose:** Convert Markdown to slide data using `marked` library

**Implementation Steps:**
1. [ ] Install and configure `marked` library
2. [ ] Split markdown by slide delimiter (`---`)
3. [ ] Parse frontmatter (YAML-like attributes between `---`)
4. [ ] Extract layout and metadata from frontmatter
5. [ ] Process special markers:
   - `::right::` for two-column layout
   - `::col-1::`, `::col-2::`, `::col-3::` for multi-column
   - `{n}` for fragments
6. [ ] Convert markdown content to HTML
7. [ ] Handle code blocks with language syntax
8. [ ] Process inline images and videos
9. [ ] Support markdown tables
10. [ ] Return normalized slide data
11. [ ] Add support for loading external `.md` files
12. [ ] Write parser tests with various markdown inputs

**Markdown Slide Delimiter:**
```markdown
---
layout: cover
background: image.jpg
---

# Slide Content

---
layout: default
---

# Next Slide
```

### 3.3 JSON Parser (`src/js/parsers/json-parser.js`)
**Purpose:** Transform JSON data into slide structure

**Implementation Steps:**
1. [ ] Validate JSON structure
2. [ ] Support both inline objects and URL loading
3. [ ] Parse `slides` array
4. [ ] Map JSON fields to internal slide structure:
   - `layout` → layout type
   - `title` → heading content
   - `content` → body content (string or array)
   - `background` → background settings
   - `left/right/columns` → layout-specific content
5. [ ] Handle special content types:
   - `code`: { language, snippet }
   - `table`: { headers, rows }
   - `image`: { src, alt, width }
   - `video`: { src, autoplay, controls }
6. [ ] Fetch external JSON files if URL provided
7. [ ] Add JSON schema validation
8. [ ] Write comprehensive tests

**JSON Structure Example:**
```json
{
  "slides": [
    {
      "layout": "cover",
      "title": "Welcome",
      "background": "bg.jpg"
    }
  ]
}
```

### 3.4 Parser Factory (`src/js/core/parser.js`)
**Purpose:** Unified interface for all parsers

**Tasks:**
- [ ] Create `Parser` factory class
- [ ] Implement `parse(source, content)` method
- [ ] Route to appropriate parser based on source type
- [ ] Normalize output from all parsers
- [ ] Handle parsing errors gracefully
- [ ] Support async loading of external files
- [ ] Write integration tests

---

## Phase 4: Slide Renderer (Week 4-5)

### 4.1 Layout System (`src/js/layouts/`)
**Purpose:** Render different slide layouts

**For Each Layout:**
1. Create layout module (e.g., `cover.js`)
2. Export render function: `render(slideData) => HTMLElement`
3. Apply layout-specific CSS classes
4. Position content according to layout rules
5. Handle layout-specific options

**Layout Implementation Priority:**
- [ ] `default.js` - Single column content
- [ ] `cover.js` - Full-screen title slide
- [ ] `center.js` - Centered content
- [ ] `two-cols.js` - Split left/right columns
- [ ] `section.js` - Section divider
- [ ] `quote.js` - Large quote display
- [ ] `image-right.js` - Content left, image right
- [ ] `image-left.js` - Image left, content right
- [ ] `full-image.js` - Full-screen image with overlay
- [ ] `three-cols.js` - Three equal columns

**Layout Index (`src/js/layouts/index.js`):**
```javascript
import cover from './cover.js';
import defaultLayout from './default.js';
// ... import all layouts

export default {
  cover,
  default: defaultLayout,
  'two-cols': twoCols,
  // ... export all
};
```

### 4.2 Slide Renderer (`src/js/core/renderer.js`)
**Purpose:** Convert slide data to DOM elements

**Implementation Steps:**
1. [ ] Create `Renderer` class
2. [ ] Implement `render(slideData)` method
3. [ ] Look up layout renderer from layouts index
4. [ ] Create slide wrapper element
5. [ ] Apply theme classes
6. [ ] Apply background styles (image/color/gradient)
7. [ ] Apply overlay if specified
8. [ ] Render content using layout renderer
9. [ ] Process special content types:
   - Code blocks with Prism.js highlighting
   - Tables
   - Images with lazy loading
   - Videos with controls
10. [ ] Apply animations and transitions
11. [ ] Handle fragments for progressive reveal
12. [ ] Set up slide navigation attributes
13. [ ] Write unit tests for each layout

**Slide DOM Structure:**
```html
<div class="swd-slide" data-index="0" data-layout="cover">
  <div class="swd-slide-background">
    <div class="swd-slide-overlay"></div>
  </div>
  <div class="swd-slide-content">
    <!-- Layout-specific content -->
  </div>
</div>
```

### 4.3 Syntax Highlighting (`src/js/utils/code-highlight.js`)
**Purpose:** Integrate Prism.js for code syntax highlighting

**Tasks:**
- [ ] Import Prism.js library
- [ ] Configure supported languages from spec
- [ ] Implement `highlightCode(element)` function
- [ ] Apply theme from configuration
- [ ] Add line numbers plugin
- [ ] Support language autodetection
- [ ] Write tests with various code snippets

---

## Phase 5: Navigation System (Week 5-6)

### 5.1 Navigation Controller (`src/js/core/navigation.js`)
**Purpose:** Handle slide navigation logic

**Implementation Steps:**
1. [ ] Create `Navigation` class
2. [ ] Track current slide index
3. [ ] Implement `next()` method
4. [ ] Implement `prev()` method
5. [ ] Implement `goTo(index)` method with validation
6. [ ] Implement `goToFirst()` and `goToLast()`
7. [ ] Handle slide transitions
8. [ ] Support fragments (progressive reveal)
9. [ ] Emit navigation events (before/after change)
10. [ ] Handle nested/vertical slides
11. [ ] Implement loop mode
12. [ ] Add auto-slide functionality with pause
13. [ ] Write navigation tests

**State Management:**
```javascript
{
  currentSlide: 0,
  totalSlides: 10,
  currentFragment: 0,
  totalFragments: 3,
  direction: 'forward' | 'backward',
  isAutoPlaying: false
}
```

### 5.2 Keyboard Controls (`src/js/utils/keyboard.js`)
**Purpose:** Keyboard event handling for navigation

**Implementation Steps:**
1. [ ] Create keyboard event listener manager
2. [ ] Map keyboard shortcuts from spec:
   - Arrow keys (left/right)
   - Spacebar
   - Home/End
   - F (fullscreen)
   - O (overview)
   - P (pause)
   - Esc
   - Number + Enter
3. [ ] Implement shortcut handlers
4. [ ] Support modifier keys (Shift, Ctrl)
5. [ ] Allow custom keyboard mappings
6. [ ] Handle keyboard focus
7. [ ] Write keyboard interaction tests

### 5.3 Touch/Swipe Support (`src/js/utils/touch.js`)
**Purpose:** Touch gestures for mobile navigation

**Implementation Steps:**
1. [ ] Detect touch capability
2. [ ] Implement swipe detection (left/right)
3. [ ] Add pinch-to-zoom prevention
4. [ ] Support vertical swipe for nested slides
5. [ ] Add touch feedback animations
6. [ ] Configure swipe threshold and velocity
7. [ ] Handle multi-touch gestures
8. [ ] Write touch interaction tests

### 5.4 Mouse Wheel Navigation (`src/js/utils/mouse-wheel.js`)
**Purpose:** Optional mouse wheel navigation

**Tasks:**
- [ ] Detect wheel events
- [ ] Debounce wheel events
- [ ] Map wheel direction to slide navigation
- [ ] Make it configurable (disabled by default)
- [ ] Write tests

---

## Phase 6: UI Components (Week 6-7)

### 6.1 Navigation Controls (`src/js/utils/controls.js`)
**Purpose:** Previous/Next arrow buttons

**Implementation:**
- [ ] Create control buttons HTML structure
- [ ] Position controls on slides
- [ ] Add click event handlers
- [ ] Show/hide based on configuration
- [ ] Update disabled state at first/last slide
- [ ] Add hover effects
- [ ] Support RTL layouts
- [ ] Write component tests

### 6.2 Progress Bar (`src/js/utils/progress.js`)
**Purpose:** Visual progress indicator

**Implementation:**
- [ ] Create progress bar element
- [ ] Calculate progress percentage
- [ ] Update on slide change
- [ ] Support custom positioning (top/bottom)
- [ ] Animate progress changes
- [ ] Make configurable
- [ ] Write tests

### 6.3 Slide Counter (`src/js/utils/slide-numbers.js`)
**Purpose:** Display current/total slide numbers

**Implementation:**
- [ ] Create slide counter element
- [ ] Format: "1 / 10" or custom format
- [ ] Update on navigation
- [ ] Support custom positioning
- [ ] Support different formats (fraction, percentage)
- [ ] Make configurable
- [ ] Write tests

### 6.4 Overview Mode (`src/js/utils/overview.js`)
**Purpose:** Grid view of all slides

**Implementation:**
- [ ] Create overview container
- [ ] Render thumbnails of all slides
- [ ] Implement grid layout
- [ ] Add click-to-navigate
- [ ] Highlight current slide
- [ ] Add enter/exit animations
- [ ] Handle keyboard navigation in overview
- [ ] Support different grid sizes
- [ ] Write overview tests

### 6.5 Fullscreen Mode (`src/js/utils/fullscreen.js`)
**Purpose:** Toggle fullscreen presentation

**Implementation:**
- [ ] Use Fullscreen API
- [ ] Handle vendor prefixes
- [ ] Add fullscreen toggle button
- [ ] Handle fullscreen change events
- [ ] Adjust layout for fullscreen
- [ ] Handle escape key
- [ ] Write fullscreen tests

---

## Phase 7: Theming System (Week 7-8)

### 7.1 CSS Architecture

**Base Styles (`src/css/base/`):**
- [ ] `reset.css` - Normalize browser defaults
- [ ] `variables.css` - CSS custom properties
- [ ] `typography.css` - Font styles and scales

**CSS Variables Structure:**
```css
:root {
  --swd-primary-bg: #ffffff;
  --swd-primary-text: #000000;
  --swd-accent-color: #0066cc;
  --swd-font-family: -apple-system, sans-serif;
  --swd-heading-font: Georgia, serif;
  --swd-code-bg: #f5f5f5;
  --swd-transition-speed: 0.3s;
  /* ... more variables */
}
```

### 7.2 Layout Styles (`src/css/layouts/`)

**For Each Layout:**
- [ ] Create dedicated CSS file
- [ ] Define grid/flexbox structure
- [ ] Set content positioning
- [ ] Add responsive breakpoints
- [ ] Style layout-specific elements

**Priority:**
- [ ] `cover.css`
- [ ] `default.css`
- [ ] `two-cols.css`
- [ ] `center.css`
- [ ] `quote.css`
- [ ] `image-layouts.css`
- [ ] `section.css`
- [ ] `three-cols.css`

### 7.3 Theme Styles (`src/css/themes/`)

**For Each Theme:**
1. [ ] Override CSS variables
2. [ ] Define color palette
3. [ ] Set typography
4. [ ] Configure backgrounds
5. [ ] Style code blocks
6. [ ] Add theme-specific effects

**Themes to Implement:**
- [ ] `light.css` - Clean, bright theme
- [ ] `dark.css` - Dark mode
- [ ] `gradient.css` - Colorful gradients
- [ ] `minimal.css` - Ultra-minimal
- [ ] `corporate.css` - Professional business
- [ ] `creative.css` - Bold and artistic
- [ ] `academic.css` - Traditional scholarly

### 7.4 Component Styles (`src/css/components/`)
- [ ] `controls.css` - Navigation arrows
- [ ] `progress.css` - Progress bar
- [ ] `slide-numbers.css` - Slide counter
- [ ] `overview.css` - Grid view
- [ ] `code-highlight.css` - Code blocks
- [ ] `transitions.css` - Slide animations

### 7.5 Theme Manager (`src/js/utils/theme-manager.js`)
**Purpose:** Dynamic theme switching and custom theme registration

**Implementation:**
- [ ] Load theme CSS dynamically
- [ ] Register custom themes
- [ ] Apply theme to presentation
- [ ] Store theme preference
- [ ] Support theme switching at runtime
- [ ] Write theme tests

---

## Phase 8: Transitions & Animations (Week 8)

### 8.1 Transition System (`src/js/utils/transitions.js`)
**Purpose:** Slide transition effects

**Transitions to Implement:**
- [ ] `slide` - Horizontal sliding
- [ ] `fade` - Fade in/out
- [ ] `zoom` - Scale in/out
- [ ] `flip` - 3D flip effect
- [ ] `none` - Instant change

**Implementation:**
- [ ] Create transition classes
- [ ] Apply CSS animations
- [ ] Configure transition speed (fast/normal/slow)
- [ ] Handle transition callbacks
- [ ] Support custom transitions
- [ ] Respect `prefers-reduced-motion`
- [ ] Write animation tests

### 8.2 Fragment Animations (`src/js/utils/fragments.js`)
**Purpose:** Progressive reveal of content

**Implementation:**
- [ ] Detect fragment elements
- [ ] Order fragments by index
- [ ] Show/hide fragments on navigation
- [ ] Support different animation types
- [ ] Update navigation to handle fragments
- [ ] Write fragment tests

### 8.3 Custom Animations (`src/js/utils/animations.js`)
**Purpose:** Element-level animations

**Implementation:**
- [ ] Parse animation attributes
- [ ] Apply CSS animations
- [ ] Support animation delays
- [ ] Trigger on slide enter
- [ ] Create animation presets
- [ ] Write animation tests

---

## Phase 9: Export Functionality (Week 9)

### 9.1 PDF Export (`src/js/utils/export.js`)
**Purpose:** Export presentation to PDF

**Implementation:**
1. [ ] Use browser print API
2. [ ] Create print-specific CSS
3. [ ] Render all slides in printable format
4. [ ] Handle page breaks
5. [ ] Preserve styling
6. [ ] Trigger browser print dialog
7. [ ] Add PDF export button
8. [ ] Write export tests

### 9.2 HTML Export
**Purpose:** Export as standalone HTML file

**Implementation:**
- [ ] Serialize current presentation
- [ ] Inline all CSS
- [ ] Inline JavaScript
- [ ] Bundle as single HTML file
- [ ] Handle external resources (images, fonts)
- [ ] Create download link
- [ ] Write export tests

### 9.3 JSON Export
**Purpose:** Export presentation structure

**Implementation:**
- [ ] Serialize slide data
- [ ] Include all metadata
- [ ] Format as JSON
- [ ] Create download link
- [ ] Write export tests

---

## Phase 10: Plugin System (Week 10)

### 10.1 Plugin Manager (`src/js/plugins/plugin-manager.js`)
**Purpose:** Load and manage plugins

**Implementation:**
- [ ] Create plugin registry
- [ ] Implement `registerPlugin(plugin)` method
- [ ] Load plugins on initialization
- [ ] Provide plugin hooks:
  - `init(presentation)`
  - `beforeSlideChange(current, next)`
  - `afterSlideChange(current, previous)`
  - `destroy()`
- [ ] Pass presentation API to plugins
- [ ] Handle plugin errors
- [ ] Write plugin system tests

### 10.2 Built-in Plugins

**Notes Plugin (`src/js/plugins/notes.js`):**
- [ ] Create speaker notes panel
- [ ] Parse notes from slide data
- [ ] Show/hide notes panel
- [ ] Sync with current slide

**Timer Plugin (`src/js/plugins/timer.js`):**
- [ ] Display presentation timer
- [ ] Start/stop/reset functionality
- [ ] Countdown mode
- [ ] Time warnings

**Write tests for each plugin**

---

## Phase 11: Advanced Features (Week 11)

### 11.1 URL Hash Navigation
**Purpose:** Deep linking to specific slides

**Implementation:**
- [ ] Update URL hash on slide change
- [ ] Parse hash on page load
- [ ] Navigate to hashed slide
- [ ] Handle invalid hashes
- [ ] Write hash navigation tests

### 11.2 Auto-slide
**Purpose:** Automatic slide advancement

**Implementation:**
- [ ] Start auto-advance timer
- [ ] Navigate on timer complete
- [ ] Pause on hover (if configured)
- [ ] Stop on user interaction
- [ ] Resume functionality
- [ ] Write auto-slide tests

### 11.3 Responsive Design
**Purpose:** Adapt to different screen sizes

**Implementation:**
- [ ] Calculate slide dimensions based on aspect ratio
- [ ] Scale content for viewport
- [ ] Add responsive breakpoints
- [ ] Optimize for mobile devices
- [ ] Handle orientation changes
- [ ] Write responsive tests

### 11.4 RTL Support
**Purpose:** Right-to-left language support

**Implementation:**
- [ ] Detect RTL mode from config
- [ ] Flip navigation direction
- [ ] Adjust layout positioning
- [ ] Update CSS for RTL
- [ ] Write RTL tests

### 11.5 Accessibility (A11y)
**Purpose:** Make presentations accessible

**Implementation:**
- [ ] Add ARIA labels and roles
- [ ] Keyboard navigation
- [ ] Focus management
- [ ] Screen reader announcements
- [ ] High contrast support
- [ ] Respect `prefers-reduced-motion`
- [ ] Run accessibility audit
- [ ] Write a11y tests

---

## Phase 12: Testing Suite (Week 12)

### 12.1 Unit Tests (`tests/unit/`)

**Test Coverage:**
- [ ] `parsers.test.js` - All three parsers
- [ ] `renderer.test.js` - Slide rendering
- [ ] `navigation.test.js` - Navigation logic
- [ ] `layouts.test.js` - Each layout renderer
- [ ] `config.test.js` - Configuration system
- [ ] `events.test.js` - Event system
- [ ] `utils.test.js` - Utility functions
- [ ] `theme-manager.test.js` - Theme switching
- [ ] `export.test.js` - Export functions

**Target: 80%+ code coverage**

### 12.2 Integration Tests (`tests/integration/`)

**Test Scenarios:**
- [ ] `lifecycle.test.js` - Full initialization and cleanup
- [ ] `plugins.test.js` - Plugin loading and hooks
- [ ] `slide-change.test.js` - Navigation with all features
- [ ] `theme-switching.test.js` - Runtime theme changes
- [ ] `export-integration.test.js` - Full export workflows

### 12.3 E2E Tests (`tests/e2e/`)

**User Interaction Tests:**
- [ ] Keyboard navigation through slides
- [ ] Mouse/touch interactions
- [ ] Fullscreen mode
- [ ] Overview mode
- [ ] Theme switching
- [ ] Export functionality
- [ ] Cross-browser compatibility

**Test with:**
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

---

## Phase 13: Documentation (Week 13)

### 13.1 API Documentation (`docs/api.md`)
- [ ] Document all public methods
- [ ] Parameter descriptions
- [ ] Return value types
- [ ] Code examples for each method
- [ ] Event list with descriptions

### 13.2 Getting Started Guide (`docs/getting-started.md`)
- [ ] Installation instructions
- [ ] Quick start tutorial
- [ ] Basic examples
- [ ] Common use cases
- [ ] Troubleshooting section

### 13.3 Example Projects (`examples/`)
- [ ] `html-example.html` - Full HTML attributes demo
- [ ] `markdown-example.html` - Markdown loading demo
- [ ] `json-example.html` - JSON data demo
- [ ] `advanced-example.html` - All features demo
- [ ] Sample content files in `examples/slides/` and `examples/data/`

### 13.4 README.md
- [ ] Project overview
- [ ] Features list
- [ ] Installation methods
- [ ] Quick usage examples
- [ ] Links to documentation
- [ ] Contributing guidelines
- [ ] License information

### 13.5 Code Comments
- [ ] JSDoc comments for all functions/classes
- [ ] Inline comments for complex logic
- [ ] TypeScript definitions (`.d.ts` files)

---

## Development Tools & Dependencies

### Core Dependencies
```json
{
  "dependencies": {
    "marked": "^11.0.0",        // Markdown parsing
    "prismjs": "^1.29.0",       // Syntax highlighting
    "dompurify": "^3.0.6"       // HTML sanitization
  }
}
```

### Development Dependencies
```json
{
  "devDependencies": {
    "@babel/core": "^7.23.0",
    "@babel/preset-env": "^7.23.0",
    "babel-loader": "^9.1.3",
    "webpack": "^5.89.0",
    "webpack-cli": "^5.1.4",
    "webpack-dev-server": "^4.15.1",
    "css-loader": "^6.8.1",
    "mini-css-extract-plugin": "^2.7.6",
    "terser-webpack-plugin": "^5.3.9",
    "css-minimizer-webpack-plugin": "^5.0.1",
    "jest": "^29.7.0",
    "@testing-library/dom": "^9.3.3",
    "@testing-library/jest-dom": "^6.1.4",
    "eslint": "^8.52.0",
    "eslint-config-airbnb-base": "^15.0.0",
    "eslint-config-prettier": "^9.0.0",
    "prettier": "^3.0.3",
    "webpack-bundle-analyzer": "^4.10.1"
  }
}
```

---

## Quality Assurance Checklist

### Code Quality
- [ ] All code follows ESLint rules
- [ ] Code formatted with Prettier
- [ ] No console.log in production
- [ ] Proper error handling throughout
- [ ] JSDoc comments on public API
- [ ] TypeScript definitions provided

### Testing
- [ ] 80%+ unit test coverage
- [ ] All integration tests pass
- [ ] E2E tests for critical paths
- [ ] Cross-browser testing complete
- [ ] Mobile device testing complete
- [ ] Performance benchmarks met

### Documentation
- [ ] API fully documented
- [ ] Getting started guide complete
- [ ] All examples working
- [ ] README comprehensive
- [ ] CHANGELOG up to date

### Performance
- [ ] Bundle size < 100KB gzipped
- [ ] First paint < 1s
- [ ] Smooth 60fps animations
- [ ] Handles 100+ slides without lag
- [ ] Lighthouse score > 90

### Accessibility
- [ ] WCAG 2.1 Level AA compliant
- [ ] Keyboard navigation complete
- [ ] Screen reader compatible
- [ ] High contrast mode support
- [ ] Focus indicators visible

### Browser Compatibility
- [ ] Chrome (latest 2 versions)
- [ ] Firefox (latest 2 versions)
- [ ] Safari (latest 2 versions)
- [ ] Edge (latest 2 versions)
- [ ] iOS Safari 12+
- [ ] Chrome Android 80+

---

## Conclusion

This development plan provides a comprehensive roadmap for building the SenangWebs Deck library from the ground up. By following this structured approach, the team can deliver a high-quality, well-tested, and well-documented presentation library that meets the specification requirements.

**Next Steps:**
1. Review and approve this plan
2. Set up development environment
3. Begin Phase 1: Project Setup
4. Establish weekly progress reviews
5. Adjust timeline as needed based on progress

**Key to Success:**
- Follow the plan but remain flexible
- Test continuously throughout development
- Document as you code
- Seek feedback early and often
- Maintain high code quality standards

---

*This document should be updated regularly as development progresses and requirements evolve.*
