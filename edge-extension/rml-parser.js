/**
 * RML (RazzMarkupLanguage) Parser - Enhanced Educational Version
 * Converts RML syntax to HTML with educational tags and RSS styling
 * 
 * RML Syntax: {tagname}content{.tagname}
 * RSS Styling: [property: value;]
 * HTML Equivalent: <tagname style="property: value;">content</tagname>
 */

class RMLParser {
    constructor() {
        // Complete mapping of RML tags to HTML tags with educational focus
        this.tagMapping = {
            // Basic HTML tags
            'head1': 'h1',
            'head2': 'h2', 
            'head3': 'h3',
            'head4': 'h4',
            'head5': 'h5',
            'head6': 'h6',
            'title': 'h1',
            'subtitle': 'h2',
            'para': 'p',
            'text': 'p',
            'bold': 'strong',
            'strong': 'strong',
            'italic': 'em',
            'em': 'em',
            'underline': 'u',
            'strike': 's',
            'code': 'code',
            'quote': 'blockquote',
            'link': 'a',
            'image': 'img',
            'picture': 'img',
            'video': 'video',
            'audio': 'audio',
            
            // Lists
            'list': 'ul',
            'orderedlist': 'ol',
            'item': 'li',
            'listitem': 'li',
            
            // Layout elements
            'div': 'div',
            'span': 'span',
            'container': 'div',
            'section': 'section',
            'header': 'header',
            'footer': 'footer',
            'nav': 'nav',
            'article': 'article',
            'aside': 'aside',
            'main': 'main',
            'card': 'div',
            'panel': 'div',
            'box': 'div',
            
            // Table elements
            'table': 'table',
            'row': 'tr',
            'cell': 'td',
            'headercell': 'th',
            
            // Form elements
            'form': 'form',
            'input': 'input',
            'button': 'button',
            'select': 'select',
            'option': 'option',
            'textarea': 'textarea',
            'label': 'label',
            'fieldset': 'fieldset',
            'legend': 'legend',
            
            // Educational tags - Core Learning
            'lesson': 'div',
            'tutorial': 'div',
            'course': 'div',
            'module': 'div',
            'unit': 'div',
            'chapter': 'div',
            'topic': 'div',
            'subject': 'div',
            
            // Educational tags - Interactive Elements
            'question': 'div',
            'answer': 'div',
            'exercise': 'div',
            'activity': 'div',
            'task': 'div',
            'homework': 'div',
            'assignment': 'div',
            'project': 'div',
            'quiz': 'div',
            'test': 'div',
            'exam': 'div',
            'assessment': 'div',
            
            // Educational tags - Learning Structure
            'step': 'div',
            'instruction': 'div',
            'explanation': 'div',
            'definition': 'div',
            'example': 'div',
            'demonstration': 'div',
            'practice': 'div',
            'review': 'div',
            'summary': 'div',
            'conclusion': 'div',
            'objective': 'div',
            'goal': 'div',
            'outcome': 'div',
            'requirement': 'div',
            'prerequisite': 'div',
            
            // Message boxes and notifications
            'success': 'div',
            'error': 'div',
            'warning': 'div',
            'info': 'div',
            'tip': 'div',
            'note': 'div',
            'alert': 'div',
            'notice': 'div',
            'highlight': 'div',
            'important': 'div',
            'caution': 'div',
            'reminder': 'div',
            
            // Academic elements
            'research': 'div',
            'reference': 'div',
            'citation': 'div',
            'bibliography': 'div',
            'footnote': 'div',
            'annotation': 'div',
            'comment': 'div',
            'discussion': 'div',
            'analysis': 'div',
            'conclusion': 'div',
            
            // Interactive elements
            'click': 'button',
            'hover': 'span',
            'toggle': 'button',
            'tab': 'div',
            'accordion': 'div',
            'dropdown': 'div',
            'modal': 'div',
            'popup': 'div',
            'tooltip': 'span',
            
            // Media and content
            'media': 'div',
            'gallery': 'div',
            'slideshow': 'div',
            'carousel': 'div',
            'timeline': 'div',
            'chart': 'div',
            'graph': 'div',
            'diagram': 'div'
        };

        // RSS (Razz Styling Style) property mappings
        this.rssPropertyMapping = {
            // Colors
            'color': 'color',
            'background': 'background-color',
            'bg': 'background-color',
            
            // Sizes and dimensions
            'size': 'font-size',
            'width': 'width',
            'height': 'height',
            'padding': 'padding',
            'margin': 'margin',
            
            // Text properties
            'align': 'text-align',
            'weight': 'font-weight',
            'style': 'font-style',
            'decoration': 'text-decoration',
            'transform': 'text-transform',
            'spacing': 'letter-spacing',
            'lineheight': 'line-height',
            
            // Layout
            'display': 'display',
            'position': 'position',
            'float': 'float',
            'overflow': 'overflow',
            
            // Border and effects
            'border': 'border',
            'radius': 'border-radius',
            'shadow': 'box-shadow',
            'opacity': 'opacity'
        };

        // Predefined color values
        this.colorValues = {
            'red': '#e74c3c',
            'blue': '#3498db', 
            'green': '#27ae60',
            'yellow': '#f1c40f',
            'purple': '#9b59b6',
            'orange': '#e67e22',
            'pink': '#e91e63',
            'cyan': '#1abc9c',
            'black': '#2c3e50',
            'white': '#ffffff',
            'gray': '#95a5a6',
            'grey': '#95a5a6',
            'lightred': '#ffebee',
            'lightblue': '#e3f2fd',
            'lightgreen': '#e8f5e8',
            'lightyellow': '#fffde7',
            'lightpurple': '#f3e5f5',
            'lightorange': '#fff3e0',
            'lightpink': '#fce4ec',
            'lightcyan': '#e0f2f1',
            'lightgray': '#f5f5f5',
            'lightgrey': '#f5f5f5',
            'darkred': '#c62828',
            'darkblue': '#1565c0',
            'darkgreen': '#2e7d32',
            'darkyellow': '#f57f17',
            'darkpurple': '#7b1fa2',
            'darkorange': '#ef6c00',
            'darkpink': '#ad1457',
            'darkcyan': '#00695c',
            'darkgray': '#37474f',
            'darkgrey': '#37474f'
        };

        // Predefined size values
        this.sizeValues = {
            'tiny': '10px',
            'small': '12px',
            'normal': '16px',
            'medium': '18px',
            'large': '24px',
            'huge': '32px',
            'giant': '48px',
            'massive': '64px'
        };
    }

    /**
     * Parse RML content and convert to HTML
     * @param {string} rmlContent - The RML content to parse
     * @returns {string} - The converted HTML content
     */
    parse(rmlContent) {
        if (!rmlContent) return '';

        let html = rmlContent;

        // First, handle typing shortcuts (markdown-like syntax)
        html = this.parseTypingShortcuts(html);

        // Parse RSS styling within tags
        html = this.parseRSSInlineStyling(html);

        // Replace RML tags with HTML tags
        const tagPattern = /\{([a-zA-Z][a-zA-Z0-9]*)\}(.*?)\{\.(\1)\}/gs;
        
        html = html.replace(tagPattern, (match, openTag, content, closeTag) => {
            // Get corresponding HTML tag
            const htmlTag = this.tagMapping[openTag.toLowerCase()] || 'div';
            
            // Handle special cases for self-closing tags
            if (htmlTag === 'img') {
                return this.parseImageTag(content);
            }
            
            // Handle links with href attribute
            if (htmlTag === 'a') {
                return this.parseLinkTag(content);
            }

            // Add CSS classes for educational elements
            const cssClass = this.getCSSClass(openTag.toLowerCase());
            const classAttr = cssClass ? ` class="${cssClass}"` : '';

            // Recursively parse nested content
            const parsedContent = this.parse(content);
            
            return `<${htmlTag}${classAttr}>${parsedContent}</${htmlTag}>`;
        });

        // Handle attributes syntax: {tag attr="value"}content{.tag}
        const tagWithAttributesPattern = /\{([a-zA-Z][a-zA-Z0-9]*)\s+([^}]+)\}(.*?)\{\.(\1)\}/gs;
        
        html = html.replace(tagWithAttributesPattern, (match, openTag, attributes, content, closeTag) => {
            const htmlTag = this.tagMapping[openTag.toLowerCase()] || 'div';
            const cssClass = this.getCSSClass(openTag.toLowerCase());
            const classAttr = cssClass ? ` class="${cssClass}"` : '';
            const parsedContent = this.parse(content);
            
            return `<${htmlTag} ${attributes}${classAttr}>${parsedContent}</${htmlTag}>`;
        });

        return html;
    }

    /**
     * Parse typing shortcuts (markdown-like syntax)
     * @param {string} content - Content to parse
     * @returns {string} - Parsed content
     */
    parseTypingShortcuts(content) {
        let parsed = content;

        // **bold** -> {bold}bold{.bold}
        parsed = parsed.replace(/\*\*(.*?)\*\*/g, '{bold}$1{.bold}');
        
        // *italic* -> {italic}italic{.italic}
        parsed = parsed.replace(/\*(.*?)\*/g, '{italic}$1{.italic}');
        
        // __underline__ -> {underline}underline{.underline}
        parsed = parsed.replace(/__(.*?)__/g, '{underline}$1{.underline}');
        
        // ~~strike~~ -> {strike}strike{.strike}
        parsed = parsed.replace(/~~(.*?)~~/g, '{strike}$1{.strike}');
        
        // `code` -> {code}code{.code}
        parsed = parsed.replace(/`(.*?)`/g, '{code}$1{.code}');
        
        // - item -> {item}item{.item}
        parsed = parsed.replace(/^- (.+)$/gm, '{item}$1{.item}');

        return parsed;
    }

    /**
     * Parse RSS inline styling [property: value;]
     * @param {string} content - Content to parse
     * @returns {string} - Parsed content with inline styles
     */
    parseRSSInlineStyling(content) {
        // Handle RSS styling within RML tags: {tag}[style: value;]content{.tag}
        const tagWithRSSPattern = /(\{[a-zA-Z][a-zA-Z0-9]*\})(\[([^\]]+)\])(.*?)(\{\.([a-zA-Z][a-zA-Z0-9]*)\})/gs;
        
        return content.replace(tagWithRSSPattern, (match, openTag, rssBlock, rssContent, content, closeTag, tagName) => {
            const styles = this.parseRSSStyles(rssContent);
            if (styles) {
                // Extract tag name from openTag (remove curly braces)
                const tag = openTag.slice(1, -1);
                return `{${tag} style="${styles}"}${content}{.${tag}}`;
            }
            return match;
        });
    }

    /**
     * Parse RSS styles and convert to CSS
     * @param {string} rssStyles - RSS style content
     * @returns {string} - CSS styles
     */
    parseRSSStyles(rssStyles) {
        const styles = [];
        const declarations = rssStyles.split(';').filter(decl => decl.trim());

        declarations.forEach(declaration => {
            const [property, value] = declaration.split(':').map(s => s.trim());
            
            if (property && value) {
                const cssProperty = this.rssPropertyMapping[property.toLowerCase()] || property;
                let cssValue = value;

                // Convert predefined color names
                if (property.toLowerCase() === 'color' || property.toLowerCase() === 'background' || property.toLowerCase() === 'bg') {
                    cssValue = this.colorValues[value.toLowerCase()] || value;
                }

                // Convert predefined size names
                if (property.toLowerCase() === 'size') {
                    cssValue = this.sizeValues[value.toLowerCase()] || value;
                }

                styles.push(`${cssProperty}: ${cssValue}`);
            }
        });

        return styles.join('; ');
    }

    /**
     * Get CSS class for educational elements
     * @param {string} tagName - RML tag name
     * @returns {string} - CSS class name
     */
    getCSSClass(tagName) {
        const educationalClasses = {
            'lesson': 'rml-lesson',
            'tutorial': 'rml-tutorial',
            'question': 'rml-question',
            'answer': 'rml-answer',
            'exercise': 'rml-exercise',
            'activity': 'rml-activity',
            'homework': 'rml-homework',
            'quiz': 'rml-quiz',
            'success': 'rml-success',
            'error': 'rml-error', 
            'warning': 'rml-warning',
            'info': 'rml-info',
            'tip': 'rml-tip',
            'note': 'rml-note',
            'important': 'rml-important',
            'highlight': 'rml-highlight',
            'container': 'rml-container',
            'card': 'rml-card',
            'panel': 'rml-panel'
        };

        return educationalClasses[tagName] || null;
    }

    /**
     * Parse image tag with src attribute
     * @param {string} content - The content containing image source
     * @returns {string} - HTML img tag
     */
    parseImageTag(content) {
        const srcMatch = content.match(/src="([^"]+)"/);
        const altMatch = content.match(/alt="([^"]+)"/);
        
        const src = srcMatch ? srcMatch[1] : '';
        const alt = altMatch ? altMatch[1] : '';
        
        return `<img src="${src}" alt="${alt}" class="rml-image">`;
    }

    /**
     * Parse link tag with href attribute
     * @param {string} content - The content containing link href and text
     * @returns {string} - HTML a tag
     */
    parseLinkTag(content) {
        const hrefMatch = content.match(/href="([^"]+)"\s*(.*)/);
        
        if (hrefMatch) {
            const href = hrefMatch[1];
            const linkText = hrefMatch[2].trim();
            return `<a href="${href}" class="rml-link">${linkText}</a>`;
        }
        
        return `<a class="rml-link">${content}</a>`;
    }

    /**
     * Convert HTML back to RML (for editing purposes)
     * @param {string} htmlContent - The HTML content to convert
     * @returns {string} - The converted RML content
     */
    htmlToRml(htmlContent) {
        let rml = htmlContent;

        // Reverse mapping from HTML to RML
        const reverseMapping = {};
        Object.keys(this.tagMapping).forEach(rmlTag => {
            reverseMapping[this.tagMapping[rmlTag]] = rmlTag;
        });

        // Convert HTML tags back to RML syntax
        const htmlTagPattern = /<([a-zA-Z][a-zA-Z0-9]*)\s*([^>]*)>(.*?)<\/\1>/gs;
        
        rml = rml.replace(htmlTagPattern, (match, htmlTag, attributes, content) => {
            const rmlTag = reverseMapping[htmlTag] || htmlTag;
            const parsedContent = this.htmlToRml(content);
            
            if (attributes.trim()) {
                return `{${rmlTag} ${attributes.trim()}}${parsedContent}{.${rmlTag}}`;
            } else {
                return `{${rmlTag}}${parsedContent}{.${rmlTag}}`;
            }
        });

        return rml;
    }
}

// Export for use in different environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RMLParser;
}
if (typeof window !== 'undefined') {
    window.RMLParser = RMLParser;
} 