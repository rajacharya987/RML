/**
 * RML (RazzMarkupLanguage) & RSS (Razz Styling Style) Parser
 * Educational markup and styling language for beginners
 * 
 * RML Syntax: {tagname}content{.tagname}
 * RSS Syntax: [property: value;]
 */

class RMLParser {
    constructor() {
        // Basic HTML tag mappings - beginner friendly names
        this.tagMapping = {
            // Text and Headings
            'title': 'h1',
            'subtitle': 'h2', 
            'heading': 'h3',
            'subheading': 'h4',
            'smalltitle': 'h5',
            'tinytitle': 'h6',
            'text': 'p',
            'para': 'p',
            'paragraph': 'p',
            
            // Text Styling
            'bold': 'strong',
            'strong': 'strong',
            'italic': 'em',
            'emphasis': 'em',
            'underline': 'u',
            'strike': 's',
            'highlight': 'mark',
            'small': 'small',
            'big': 'big',
            'code': 'code',
            'keyboard': 'kbd',
            'sample': 'samp',
            'variable': 'var',
            
            // Layout and Structure
            'container': 'div',
            'box': 'div',
            'section': 'section',
            'article': 'article',
            'header': 'header',
            'footer': 'footer',
            'sidebar': 'aside',
            'navigation': 'nav',
            'main': 'main',
            'content': 'div',
            'wrapper': 'div',
            'panel': 'div',
            
            // Lists
            'list': 'ul',
            'orderedlist': 'ol',
            'numberlist': 'ol',
            'bulletlist': 'ul',
            'item': 'li',
            'listitem': 'li',
            'point': 'li',
            'definition': 'dl',
            'term': 'dt',
            'description': 'dd',
            
            // Media
            'image': 'img',
            'picture': 'img',
            'photo': 'img',
            'video': 'video',
            'audio': 'audio',
            'media': 'figure',
            'caption': 'figcaption',
            
            // Interactive Elements
            'link': 'a',
            'button': 'button',
            'click': 'button',
            'form': 'form',
            'input': 'input',
            'textbox': 'input',
            'textarea': 'textarea',
            'select': 'select',
            'option': 'option',
            'label': 'label',
            
            // Tables
            'table': 'table',
            'row': 'tr',
            'cell': 'td',
            'column': 'td',
            'headerrow': 'thead',
            'bodyrow': 'tbody',
            'footerrow': 'tfoot',
            'headercell': 'th',
            
            // Special Content
            'quote': 'blockquote',
            'citation': 'cite',
            'address': 'address',
            'time': 'time',
            'date': 'time',
            'progress': 'progress',
            'meter': 'meter',
            
            // Semantic Elements
            'important': 'strong',
            'warning': 'div',
            'error': 'div',
            'success': 'div',
            'info': 'div',
            'note': 'div',
            'tip': 'div',
            'alert': 'div',
            
            // Educational Elements
            'lesson': 'section',
            'exercise': 'div',
            'question': 'div',
            'answer': 'div',
            'example': 'div',
            'tutorial': 'article',
            'step': 'div',
            'homework': 'div',
            'quiz': 'div',
            
            // Creative Elements
            'card': 'div',
            'banner': 'header',
            'hero': 'header',
            'gallery': 'div',
            'grid': 'div',
            'flex': 'div',
            'column': 'div',
            'row': 'div'
        };

        // CSS class mappings for special elements
        this.classMapping = {
            'warning': 'rml-warning',
            'error': 'rml-error', 
            'success': 'rml-success',
            'info': 'rml-info',
            'note': 'rml-note',
            'tip': 'rml-tip',
            'alert': 'rml-alert',
            'card': 'rml-card',
            'hero': 'rml-hero',
            'gallery': 'rml-gallery',
            'grid': 'rml-grid',
            'exercise': 'rml-exercise',
            'question': 'rml-question',
            'answer': 'rml-answer',
            'lesson': 'rml-lesson',
            'tutorial': 'rml-tutorial',
            'step': 'rml-step'
        };

        // Default RSS (Razz Styling Style) properties
        this.defaultRSS = this.getDefaultRSS();
    }

    /**
     * Parse RML content and convert to HTML
     * @param {string} rmlContent - The RML content to parse
     * @param {string} rssStyles - Optional RSS styling
     * @returns {string} - The converted HTML content
     */
    parse(rmlContent, rssStyles = '') {
        if (!rmlContent) return '';

        // First, extract and process RSS styles
        const processedRSS = this.parseRSS(rssStyles);
        
        let html = rmlContent;

        // Handle simple syntax patterns first
        html = this.parseSimpleSyntax(html);

        // Replace RML tags with HTML tags
        // Pattern: {tagname}...{.tagname} -> <htmltag>...</htmltag>
        const tagPattern = /\{([a-zA-Z][a-zA-Z0-9]*)\}(.*?)\{\.(\1)\}/gs;
        
        html = html.replace(tagPattern, (match, openTag, content, closeTag) => {
            return this.processRMLTag(openTag, content);
        });

        // Handle attributes syntax: {tag attr="value"}content{.tag}
        const tagWithAttributesPattern = /\{([a-zA-Z][a-zA-Z0-9]*)\s+([^}]+)\}(.*?)\{\.(\1)\}/gs;
        
        html = html.replace(tagWithAttributesPattern, (match, openTag, attributes, content, closeTag) => {
            const htmlTag = this.tagMapping[openTag.toLowerCase()] || openTag;
            const parsedContent = this.parse(content);
            
            // Add special classes if needed
            let finalAttributes = attributes;
            if (this.classMapping[openTag.toLowerCase()]) {
                const className = this.classMapping[openTag.toLowerCase()];
                if (!attributes.includes('class=')) {
                    finalAttributes += ` class="${className}"`;
                } else {
                    finalAttributes = finalAttributes.replace(/class="([^"]*)"/, `class="$1 ${className}"`);
                }
            }
            
            return `<${htmlTag} ${finalAttributes}>${parsedContent}</${htmlTag}>`;
        });

        // Add RSS styling if provided
        if (processedRSS) {
            html = `<style>${processedRSS}</style>\n${html}`;
        }

        return html;
    }

    /**
     * Parse simple beginner-friendly syntax shortcuts
     */
    parseSimpleSyntax(content) {
        let html = content;

        // Simple shortcuts for beginners
        html = html.replace(/\*\*(.*?)\*\*/g, '{bold}$1{.bold}'); // **bold**
        html = html.replace(/\*(.*?)\*/g, '{italic}$1{.italic}'); // *italic*
        html = html.replace(/__(.*?)__/g, '{underline}$1{.underline}'); // __underline__
        html = html.replace(/~~(.*?)~~/g, '{strike}$1{.strike}'); // ~~strike~~
        html = html.replace(/`(.*?)`/g, '{code}$1{.code}'); // `code`

        // Simple list syntax
        html = html.replace(/^- (.*$)/gm, '{item}$1{.item}'); // - item
        html = html.replace(/^\d+\. (.*$)/gm, '{item}$1{.item}'); // 1. item

        return html;
    }

    /**
     * Process individual RML tags
     */
    processRMLTag(tagName, content) {
        const htmlTag = this.tagMapping[tagName.toLowerCase()] || tagName;
        
        // Handle special cases
        if (htmlTag === 'img') {
            return this.parseImageTag(content);
        }
        
        if (htmlTag === 'a') {
            return this.parseLinkTag(content);
        }

        if (htmlTag === 'video') {
            return this.parseVideoTag(content);
        }

        if (htmlTag === 'audio') {
            return this.parseAudioTag(content);
        }

        // Recursively parse nested content
        const parsedContent = this.parse(content);
        
        // Add special classes for educational elements
        let classAttr = '';
        if (this.classMapping[tagName.toLowerCase()]) {
            classAttr = ` class="${this.classMapping[tagName.toLowerCase()]}"`;
        }
        
        return `<${htmlTag}${classAttr}>${parsedContent}</${htmlTag}>`;
    }

    /**
     * Parse RSS (Razz Styling Style) - Beginner-friendly CSS
     */
    parseRSS(rssContent) {
        if (!rssContent) return '';

        let css = '';
        
        // RSS uses simple syntax: [property: value;]
        const rssPattern = /\[([^:]+):\s*([^;]+);\s*\]/g;
        
        let match;
        let currentSelector = 'body';
        
        while ((match = rssPattern.exec(rssContent)) !== null) {
            const property = match[1].trim();
            const value = match[2].trim();
            
            // Convert RSS properties to CSS
            const cssProperty = this.convertRSSProperty(property, value);
            if (cssProperty) {
                css += `${currentSelector} { ${cssProperty} }\n`;
            }
        }

        // Also parse block syntax: selector { [prop: value;] [prop: value;] }
        const blockPattern = /([^{]+)\s*\{\s*((?:\[[^:]+:[^;]+;\s*\][\s\n]*)*)\}/g;
        
        while ((match = blockPattern.exec(rssContent)) !== null) {
            const selector = match[1].trim();
            const properties = match[2];
            
            let blockCSS = '';
            const propPattern = /\[([^:]+):\s*([^;]+);\s*\]/g;
            let propMatch;
            
            while ((propMatch = propPattern.exec(properties)) !== null) {
                const cssProperty = this.convertRSSProperty(propMatch[1].trim(), propMatch[2].trim());
                if (cssProperty) {
                    blockCSS += `  ${cssProperty}\n`;
                }
            }
            
            if (blockCSS) {
                css += `${selector} {\n${blockCSS}}\n\n`;
            }
        }

        return css;
    }

    /**
     * Convert RSS properties to CSS properties (beginner-friendly names)
     */
    convertRSSProperty(property, value) {
        const propertyMap = {
            // Colors (beginner-friendly)
            'color': 'color',
            'textcolor': 'color',
            'background': 'background-color',
            'bgcolor': 'background-color',
            'backgroundcolor': 'background-color',
            
            // Sizes
            'size': 'font-size',
            'textsize': 'font-size',
            'fontsize': 'font-size',
            'width': 'width',
            'height': 'height',
            
            // Spacing
            'margin': 'margin',
            'padding': 'padding',
            'space': 'margin',
            'innerspace': 'padding',
            'outerspace': 'margin',
            
            // Text
            'font': 'font-family',
            'fontfamily': 'font-family',
            'weight': 'font-weight',
            'fontweight': 'font-weight',
            'style': 'font-style',
            'fontstyle': 'font-style',
            'align': 'text-align',
            'textalign': 'text-align',
            'decoration': 'text-decoration',
            'textdecoration': 'text-decoration',
            
            // Layout
            'display': 'display',
            'position': 'position',
            'float': 'float',
            'clear': 'clear',
            
            // Border
            'border': 'border',
            'bordercolor': 'border-color',
            'borderwidth': 'border-width',
            'borderstyle': 'border-style',
            'radius': 'border-radius',
            'borderradius': 'border-radius',
            'rounded': 'border-radius',
            
            // Shadow and Effects
            'shadow': 'box-shadow',
            'textshadow': 'text-shadow',
            'opacity': 'opacity',
            'transparent': 'opacity',
            
            // Flexbox (simplified)
            'flex': 'display',
            'direction': 'flex-direction',
            'wrap': 'flex-wrap',
            'justify': 'justify-content',
            'items': 'align-items',
            'content': 'align-content'
        };

        const cssProperty = propertyMap[property.toLowerCase()];
        if (!cssProperty) return null;

        // Handle special value conversions
        let cssValue = this.convertRSSValue(property.toLowerCase(), value);
        
        return `${cssProperty}: ${cssValue};`;
    }

    /**
     * Convert RSS values to CSS values (with beginner-friendly shortcuts)
     */
    convertRSSValue(property, value) {
        const valueMap = {
            // Colors
            'red': '#ff0000',
            'blue': '#0000ff', 
            'green': '#008000',
            'yellow': '#ffff00',
            'purple': '#800080',
            'orange': '#ffa500',
            'pink': '#ffc0cb',
            'black': '#000000',
            'white': '#ffffff',
            'gray': '#808080',
            'grey': '#808080',
            
            // Sizes
            'tiny': '10px',
            'small': '12px',
            'normal': '16px',
            'medium': '18px',
            'large': '24px',
            'huge': '32px',
            'giant': '48px',
            
            // Text alignment
            'left': 'left',
            'center': 'center',
            'right': 'right',
            'middle': 'center',
            
            // Font weights
            'thin': '100',
            'light': '300',
            'normal': '400',
            'bold': '700',
            'thick': '900',
            
            // Display values
            'show': 'block',
            'hide': 'none',
            'flex': 'flex',
            'inline': 'inline',
            'block': 'block'
        };

        // Check for mapped values first
        const mappedValue = valueMap[value.toLowerCase()];
        if (mappedValue) return mappedValue;

        // Handle special cases
        if (property === 'flex' && value.toLowerCase() === 'yes') {
            return 'flex';
        }
        
        if (property === 'rounded' || property === 'radius') {
            if (!value.includes('px') && !value.includes('%')) {
                return value + 'px';
            }
        }

        return value;
    }

    /**
     * Get default RSS styling for educational elements
     */
    getDefaultRSS() {
        return `
        .rml-warning {
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            border-left: 4px solid #fdcb6e;
            padding: 15px;
            margin: 10px 0;
            border-radius: 4px;
        }
        
        .rml-error {
            background-color: #f8d7da;
            border: 1px solid #f5c6cb;
            border-left: 4px solid #e74c3c;
            padding: 15px;
            margin: 10px 0;
            border-radius: 4px;
        }
        
        .rml-success {
            background-color: #d4edda;
            border: 1px solid #c3e6cb;
            border-left: 4px solid #27ae60;
            padding: 15px;
            margin: 10px 0;
            border-radius: 4px;
        }
        
        .rml-info {
            background-color: #d1ecf1;
            border: 1px solid #bee5eb;
            border-left: 4px solid #3498db;
            padding: 15px;
            margin: 10px 0;
            border-radius: 4px;
        }
        
        .rml-card {
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            padding: 20px;
            margin: 15px 0;
        }
        
        .rml-exercise {
            background: #f8f9fa;
            border: 2px dashed #6c757d;
            padding: 20px;
            margin: 15px 0;
            border-radius: 8px;
        }
        
        .rml-question {
            background: #e3f2fd;
            border-left: 4px solid #2196f3;
            padding: 15px;
            margin: 10px 0;
            font-weight: bold;
        }
        
        .rml-answer {
            background: #f3e5f5;
            border-left: 4px solid #9c27b0;
            padding: 15px;
            margin: 10px 0;
        }
        `;
    }

    /**
     * Enhanced media tag parsing
     */
    parseVideoTag(content) {
        const srcMatch = content.match(/src="([^"]+)"/);
        const src = srcMatch ? srcMatch[1] : '';
        return `<video controls src="${src}">${content}</video>`;
    }

    parseAudioTag(content) {
        const srcMatch = content.match(/src="([^"]+)"/);
        const src = srcMatch ? srcMatch[1] : '';
        return `<audio controls src="${src}">${content}</audio>`;
    }

    /**
     * Enhanced image tag parsing
     */
    parseImageTag(content) {
        const srcMatch = content.match(/src="([^"]+)"/);
        const altMatch = content.match(/alt="([^"]+)"/);
        const widthMatch = content.match(/width="([^"]+)"/);
        const heightMatch = content.match(/height="([^"]+)"/);
        
        const src = srcMatch ? srcMatch[1] : '';
        const alt = altMatch ? altMatch[1] : '';
        const width = widthMatch ? ` width="${widthMatch[1]}"` : '';
        const height = heightMatch ? ` height="${heightMatch[1]}"` : '';
        
        return `<img src="${src}" alt="${alt}"${width}${height}>`;
    }

    /**
     * Enhanced link tag parsing
     */
    parseLinkTag(content) {
        const hrefMatch = content.match(/href="([^"]+)"\s*(.*)/);
        const targetMatch = content.match(/target="([^"]+)"/);
        
        if (hrefMatch) {
            const href = hrefMatch[1];
            const linkText = hrefMatch[2].replace(/target="[^"]*"/, '').trim();
            const target = targetMatch ? ` target="${targetMatch[1]}"` : '';
            return `<a href="${href}"${target}>${linkText}</a>`;
        }
        
        return `<a>${content}</a>`;
    }

    /**
     * Educational helper: Convert HTML back to RML
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

    /**
     * Educational helper: Get available tags
     */
    getAvailableTags() {
        return Object.keys(this.tagMapping).sort();
    }

    /**
     * Educational helper: Get tag description
     */
    getTagDescription(tagName) {
        const descriptions = {
            'title': 'Main page title (biggest heading)',
            'subtitle': 'Section title (second biggest)',
            'text': 'Regular paragraph text',
            'bold': 'Make text bold and strong',
            'italic': 'Make text slanted/emphasized', 
            'link': 'Create a clickable link',
            'image': 'Show a picture',
            'list': 'Create a bulleted list',
            'card': 'Create a styled box/card',
            'warning': 'Show a warning message',
            'success': 'Show a success message',
            'exercise': 'Create an exercise box',
            'question': 'Ask a question',
            'answer': 'Provide an answer'
        };
        
        return descriptions[tagName] || 'Custom HTML element';
    }
}

// Export for use in different environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RMLParser;
}
if (typeof window !== 'undefined') {
    window.RMLParser = RMLParser;
} 