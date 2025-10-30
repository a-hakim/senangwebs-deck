# Markdown Format Guide

SenangWebs Deck uses HTML comments for slide metadata and column markers, providing a clean, unambiguous syntax.

## Basic Structure

```markdown
<!-- slide: layout-name -->
<!-- background: value -->

# Slide Content Here

---

<!-- slide: next-layout -->

Next slide content...
```

## Key Features

- **Slide Separator**: Use `---` (three dashes) to separate slides
- **Metadata**: Use HTML comments `<!-- key: value -->` for slide properties
- **Column Markers**: Use `<!-- column -->` to split content in multi-column layouts
- **Clean Preview**: HTML comments are invisible in markdown preview tools

## Available Metadata

### `slide` (Required for non-default layouts)

Specifies the slide layout.

```markdown
<!-- slide: cover -->
<!-- slide: two-cols -->
<!-- slide: center -->
```

**Available layouts**: `cover`, `default`, `center`, `two-cols`, `three-cols`, `section`, `quote`, `image-right`, `image-left`, `full-image`

### `background`

Sets the slide background (image URL, gradient, or color).

```markdown
<!-- background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) -->
<!-- background: ./images/bg.jpg -->
<!-- background: #2c3e50 -->
```

### `overlay`

Adds an overlay on the background.

```markdown
<!-- overlay: rgba(0, 0, 0, 0.5) -->
```

### Custom Metadata

You can add any custom metadata for your own use:

```markdown
<!-- author: John Doe -->
<!-- duration: 5 -->
<!-- notes: Remember to mention this point -->
```

## Layout Examples

### Cover Slide

```markdown
<!-- slide: cover -->
<!-- background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) -->

# Welcome to My Presentation
## Subtitle Goes Here

A brief description

---
```

### Default Slide

```markdown
<!-- slide: default -->

## Topic Title

Regular content with:
- Bullet points
- **Bold text**
- *Italic text*
- `Code snippets`

---
```

### Two-Column Layout

```markdown
<!-- slide: two-cols -->

## Left Column

Content for the left side:
- Point 1
- Point 2

<!-- column -->

## Right Column

Content for the right side:
```javascript
const code = 'example';
```

---

```

### Three-Column Layout

```markdown
<!-- slide: three-cols -->

### Column 1

First column content

<!-- column -->

### Column 2

Second column content

<!-- column -->

### Column 3

Third column content

---
```

### Center Layout

```markdown
<!-- slide: center -->

## Important Message

Centered content is perfect for emphasis

---
```

### Quote Layout

```markdown
<!-- slide: quote -->

The only way to do great work is to love what you do.

— Steve Jobs

---
```

### Section Divider

```markdown
<!-- slide: section -->

# New Section

---
```

### Image Layouts

```markdown
<!-- slide: image-right -->

## Content on Left

Text content appears on the left side.

![Image Description](./image.jpg)

---

<!-- slide: image-left -->

![Image Description](./image.jpg)

## Content on Right

Text content appears on the right side.

---

<!-- slide: full-image -->
<!-- background: ./hero-image.jpg -->
<!-- overlay: rgba(0, 0, 0, 0.3) -->

# Text Over Image

Centered text on full-screen background

---
```

## Complete Example

```markdown
<!-- slide: cover -->
<!-- background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) -->

# My Presentation
## A Modern Approach

Welcome!

---

<!-- slide: default -->

## Introduction

Let me introduce you to:
- Feature 1
- Feature 2
- Feature 3

---

<!-- slide: two-cols -->

## Comparison

### Traditional Approach
- Manual work
- Time consuming
- Error prone

<!-- column -->

### Our Solution
- Automated
- Fast
- Reliable

---

<!-- slide: center -->

## Key Takeaway

One important message here

---

<!-- slide: quote -->

Innovation distinguishes between a leader and a follower.

— Steve Jobs

---

<!-- slide: three-cols -->

### Fast

Lightning speed performance

<!-- column -->

### Secure

Bank-level security

<!-- column -->

### Reliable

99.9% uptime

---

<!-- slide: section -->

# Questions?

---

<!-- slide: cover -->

# Thank You!

contact@example.com
```

## Best Practices

1. **Always use `---` for slide separators** - Don't use `---` in your content
2. **Put metadata at the top of each slide** - For better readability
3. **Be consistent with indentation** - Makes the markdown easier to read
4. **Use descriptive image alt text** - For accessibility
5. **Preview your slides** - Test before presenting

## Tips

- HTML comments are invisible in GitHub/GitLab markdown preview
- You can use standard markdown syntax for content formatting
- Code blocks with syntax highlighting work perfectly
- Images can use relative or absolute URLs
- You can mix layouts freely within one presentation

## See Also

- [Getting Started Guide](getting-started.md)
- [API Documentation](api.md)
- [Example Presentations](../examples/)
