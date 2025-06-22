/**
 * RML (RazzMarkupLanguage) Parser
 * Converts RML syntax to HTML
 * 
 * RML Syntax: {tagname}content{.tagname}
 * HTML Equivalent: <tagname>content</tagname>
 */

class RMLParser {
    constructor() {
        // Define mapping of RML tags to HTML tags
        this.tagMapping = {
            'head1': 'h1',
            'head2': 'h2',
            'head3': 'h3',
            'head4': 'h4',
            'head5': 'h5',
            'head6': 'h6',
            'para': 'p',
            'bold': 'strong',
            'italic': 'em',
            'underline': 'u',
            'link': 'a',
            'image': 'img',
            'list': 'ul',
            'listitem': 'li',
            'orderedlist': 'ol',
            'div': 'div',
            'span': 'span',
            'code': 'code',
            'quote': 'blockquote',
            'table': 'table',
            'row': 'tr',
            'cell': 'td',
            'header': 'header',
            'footer': 'footer',
            'nav': 'nav',
            'section': 'section',
            'article': 'article',
            'aside': 'aside',
            'main': 'main'
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

        // Replace RML tags with HTML tags
        // Pattern: {tagname}...{.tagname} -> <htmltag>...</htmltag>
        const tagPattern = /\{([a-zA-Z][a-zA-Z0-9]*)\}(.*?)\{\.(\1)\}/gs;
        
        html = html.replace(tagPattern, (match, openTag, content, closeTag) => {
            // Get corresponding HTML tag
            const htmlTag = this.tagMapping[openTag.toLowerCase()] || openTag;
            
            // Handle special cases for self-closing tags
            if (htmlTag === 'img') {
                return this.parseImageTag(content);
            }
            
            // Handle links with href attribute
            if (htmlTag === 'a') {
                return this.parseLinkTag(content);
            }

            // Recursively parse nested content
            const parsedContent = this.parse(content);
            
            return `<${htmlTag}>${parsedContent}</${htmlTag}>`;
        });

        // Handle attributes syntax: {tag attr="value"}content{.tag}
        const tagWithAttributesPattern = /\{([a-zA-Z][a-zA-Z0-9]*)\s+([^}]+)\}(.*?)\{\.(\1)\}/gs;
        
        html = html.replace(tagWithAttributesPattern, (match, openTag, attributes, content, closeTag) => {
            const htmlTag = this.tagMapping[openTag.toLowerCase()] || openTag;
            const parsedContent = this.parse(content);
            
            return `<${htmlTag} ${attributes}>${parsedContent}</${htmlTag}>`;
        });

        return html;
    }

    /**
     * Parse image tag with src attribute
     * @param {string} content - The content containing image source
     * @returns {string} - HTML img tag
     */
    parseImageTag(content) {
        // Extract src and alt from content
        // Format: src="url" alt="description"
        const srcMatch = content.match(/src="([^"]+)"/);
        const altMatch = content.match(/alt="([^"]+)"/);
        
        const src = srcMatch ? srcMatch[1] : '';
        const alt = altMatch ? altMatch[1] : '';
        
        return `<img src="${src}" alt="${alt}">`;
    }

    /**
     * Parse link tag with href attribute
     * @param {string} content - The content containing link href and text
     * @returns {string} - HTML a tag
     */
    parseLinkTag(content) {
        // Format: href="url" text
        const hrefMatch = content.match(/href="([^"]+)"\s*(.*)/);
        
        if (hrefMatch) {
            const href = hrefMatch[1];
            const linkText = hrefMatch[2].trim();
            return `<a href="${href}">${linkText}</a>`;
        }
        
        return `<a>${content}</a>`;
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