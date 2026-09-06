/**
 * Export - Export presentation to various formats
 * @module utils/export
 */

/**
 * Export utility class
 */
class ExportUtil {
    constructor(presentation, config = {}) {
        this.presentation = presentation;
        this.config = config;
    }

    /**
     * Export presentation to PDF
     * Uses browser's print functionality
     */
    toPDF() {
        if (!this.config.export || this.config.export.pdf === false) {
            console.warn('PDF export is disabled');
            return;
        }

        // Store current state
        const { currentSlide } = this.presentation.state;

        // Add print class to container
        this.presentation.container.classList.add('swd-print-mode');

        // Show all slides
        const slides =
            this.presentation.container.querySelectorAll('.swd-slide');
        slides.forEach((slide) => {
            slide.classList.add('swd-print-slide');
            slide.classList.remove('past', 'future', 'active');
        });

        // Emit before export event
        this.presentation.emit('beforeExportPDF');

        // Trigger print dialog
        setTimeout(() => {
            window.print();

            // Restore state after print dialog closes
            setTimeout(() => {
                this.presentation.container.classList.remove('swd-print-mode');
                slides.forEach((slide) => {
                    slide.classList.remove('swd-print-slide');
                });

                // Restore current slide
                this.presentation.navigation.updateSlideDisplay(currentSlide);

                this.presentation.emit('afterExportPDF');
            }, 100);
        }, 100);
    }

    /**
     * Export presentation to standalone HTML
     * @returns {Promise<string>} - HTML content
     */
    async toHTML() {
        if (!this.config.export || this.config.export.html === false) {
            console.warn('HTML export is disabled');
            return null;
        }

        this.presentation.emit('beforeExportHTML');

        // Get container HTML; strip data-swd-id so the embedded library's
        // autoInit() cannot find it (prevents double initialization)
        const containerHTML = this.presentation.container.outerHTML.replace(
            /\s*data-swd-id=(["'])[^"']*\1/,
            ''
        );

        // Get all CSS
        const styles = this.getInlineStyles();

        // Get SWD script (simplified version)
        const script = await this.getInlineScript();

        // Build complete HTML
        const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SWD Presentation</title>
  <style>
${styles}
  </style>
</head>
<body>
${containerHTML}
${script}
</body>
</html>`;

        this.presentation.emit('afterExportHTML', { html });

        return html;
    }

    /**
     * Download HTML file
     */
    async downloadHTML() {
        const html = await this.toHTML();
        if (!html) return;

        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'presentation.html';
        link.click();

        // Defer revoking so the download has time to start
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

    /**
     * Export presentation data to JSON
     * @returns {Object} - JSON data
     */
    toJSON() {
        if (!this.config.export || this.config.export.json === false) {
            console.warn('JSON export is disabled');
            return null;
        }

        this.presentation.emit('beforeExportJSON');

        const data = {
            config: {
                theme: this.config.theme,
                transition: this.config.transition,
                transitionSpeed: this.config.transitionSpeed,
                aspectRatio: this.config.aspectRatio,
            },
            slides: this.presentation.state.slides.map((slide) => {
                const exported = {
                    index: slide.index,
                    layout: slide.layout,
                    background: slide.background,
                    overlay: slide.overlay,
                    content: slide.content,
                    attributes: slide.attributes,
                };

                // Preserve column/quote/image data so JSON export → re-import
                // round-trips without losing layout information
                if (slide.left !== undefined) exported.left = slide.left;
                if (slide.right !== undefined) exported.right = slide.right;
                if (slide.columns !== undefined) {
                    [exported.col1, exported.col2, exported.col3] =
                        slide.columns;
                }
                if (slide.quote !== undefined) exported.quote = slide.quote;
                if (slide.author !== undefined) exported.author = slide.author;
                if (slide.image !== undefined) exported.image = slide.image;
                if (slide.imageAlt !== undefined)
                    exported.imageAlt = slide.imageAlt;
                if (slide.textContent !== undefined) {
                    exported.textContent = slide.textContent;
                }
                if (slide.imageContent !== undefined) {
                    exported.imageContent = slide.imageContent;
                }

                return exported;
            }),
            metadata: {
                totalSlides: this.presentation.state.slides.length,
                exportDate: new Date().toISOString(),
                version: '1.0.0',
            },
        };

        this.presentation.emit('afterExportJSON', { data });

        return data;
    }

    /**
     * Download JSON file
     */
    downloadJSON() {
        const data = this.toJSON();
        if (!data) return;

        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'presentation.json';
        link.click();

        // Defer revoking so the download has time to start
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

    /**
     * Get inline styles from stylesheets
     * @returns {string} - CSS content
     */
    getInlineStyles() {
        let styles = '';

        try {
            Array.from(document.styleSheets).forEach((sheet) => {
                try {
                    // Inline rules if they belong to swd.css or same-origin styles
                    if (
                        !sheet.href ||
                        sheet.href.includes('swd.css') ||
                        sheet.href.startsWith(window.location.origin)
                    ) {
                        const rules = Array.from(sheet.cssRules || sheet.rules);
                        rules.forEach((rule) => {
                            styles += `${rule.cssText}\n`;
                        });
                    }
                } catch (e) {
                    // Silent catch for cross-origin sheet access constraints
                }
            });
        } catch (e) {
            console.warn('Error reading stylesheet rules:', e);
        }

        // Get inline style tags
        const styleTags = document.querySelectorAll('style');
        styleTags.forEach((style) => {
            styles += `${style.textContent}\n`;
        });

        return styles;
    }

    /**
     * Get inline script asynchronously
     * @returns {Promise<string>} - Script tag string
     */
    async getInlineScript() {
        const { source } = this.config;
        const isStatic = !source || source === 'html';
        const exportConfig = { ...this.config, autoInit: false };
        const config = JSON.stringify(exportConfig, (key, value) =>
            typeof value === 'function' ? undefined : value
        );
        let scriptContent = '';

        const swdScripts = Array.from(
            document.querySelectorAll('script')
        ).filter((script) => script.src && script.src.includes('swd.js'));

        const responses = await Promise.all(
            swdScripts.map(async (script) => {
                try {
                    const response = await fetch(script.src);
                    return response.ok ? await response.text() : '';
                } catch (e) {
                    // Fail gracefully to fallback
                    return '';
                }
            })
        );

        scriptContent = responses.find((content) => content) || '';

        if (!scriptContent) {
            scriptContent = `// SWD Library Fallback (Static view only)
console.warn('SWD library javascript was not inlined');`;
        }

        const initCode = isStatic
            ? `// Static snapshot export: slides are already rendered; no re-initialization`
            : `const deck = new SWD(container, ${config});
    deck.init().catch(function (e) { console.error('SWD export init failed:', e); });`;

        return `<script>
${scriptContent}
(function() {
  // data-swd-id is stripped from the exported container to prevent the
  // embedded library's autoInit() from creating a duplicate instance
  const wrapper = document.querySelector('.swd-wrapper');
  const container = wrapper ? wrapper.parentElement : null;
  if (container && typeof SWD !== 'undefined') {
    ${initCode}
  }
})();
</script>`;
    }
}

export default ExportUtil;
