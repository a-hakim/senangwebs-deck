---
name: senangwebs-deck
description: Web-based presentations from HTML, Markdown, or JSON with themes, layouts, transitions, and export.
version: 1.0.2
package: senangwebs-deck
---

# SenangWebs Deck (SWD)

## Quick Reference

- **Purpose**: Multi-format slide deck engine with keyboard nav, touch, and export
- **Entry**: `dist/swd.js` (main), `dist/swd.esm.js` (module)
- **Dependencies**: `core-js`, `dompurify`, `marked`
- **Scripts**: `npm run dev`, `npm run build`, `npm run lint`, `npm run lint:fix`, `npm run format`, `npm run test`, `npm run prepare`

## Workflow

Start in `C:\wamp64\www\sw-libraries\senangwebs-deck`. Read `README.md`, `package.json`, and touched source files. Match existing patterns, CSS prefix `swd-`.

## HTML Data Attributes

### Presentation container
| Attribute | Values | Default |
|---|---|---|
| `data-swd-id` | container identifier | — |
| `data-swd-theme` | `light`, `dark`, `gradient`, `minimal`, `corporate`, `creative`, `academic`, `ocean`, `forest`, `mono` | `light` |
| `data-swd-transition` | `slide`, `fade`, `zoom`, `flip`, `none` | `slide` |
| `data-swd-transition-speed` | `fast` (300ms), `normal` (500ms), `slow` (800ms), or custom ms | `normal` |
| `data-swd-keyboard` | `true` / `false` | `true` |
| `data-swd-controls` | `true` / `false` | `true` |
| `data-swd-progress` | `true` / `false` | `true` |
| `data-swd-loop` | `true` / `false` | `false` |
| `data-swd-autoplay` | `true` / `false` | `false` |
| `data-swd-autoplay-delay` | ms | `3000` |
| `data-swd-source` | `html`, `markdown`, `json` | `html` |
| `data-swd-markdown-url` | path to .md file | — |
| `data-swd-json-url` | path to .json file | — |

### Slide-level
| Attribute | Values |
|---|---|
| `data-swd-page` | slide flag |
| `data-swd-layout` | `cover`, `default`, `center`, `two-cols`, `three-cols`, `section`, `quote`, `image-right`, `image-left`, `full-image` |
| `data-swd-background` | color or gradient name |

## JavaScript API

```js
const deck = new SWD('#presentation', {
  theme, transition, transitionSpeed, keyboard, controls, progress,
  loop, autoplay, autoplayDelay, autoSlide, source, markdownUrl, jsonUrl, data
})
```

`transitionSpeed` accepts `fast`, `normal`, `slow`, or a non-negative number of milliseconds. HTML data attributes preserve named speeds and convert numeric strings such as `data-swd-transition-speed="650"` to `650`.

## Focus Areas

- Markdown parsing via `marked`, HTML sanitization via `DOMPurify`
- Transition speed normalization across JS options, data attributes, CSS variables, and transition timers
- Built-in themes live in `src/css/themes/`; keep `src/css/swd.css`, README, API docs, and examples aligned when adding themes
- Slide fragment stepping within slides
- Keyboard shortcuts: arrows, Space, PageUp/Down, Home, End, F (fullscreen), O (overview), P (pause), Esc
- Export: PDF, HTML, JSON
- Responsive slide framing, mobile touch/swipe
- WCAG 2.1 accessibility compliance

## Implementation Guidance

- Preserve backward compatibility for all attributes and API
- Always sanitize user HTML with DOMPurify before rendering
- Update README and docs/ when API changes
- Test keyboard nav, touch, and export on real pages

## Validation

```bash
npm run lint
npm run build
npm test        # when available
```
