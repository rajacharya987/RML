/**
 * RSS (Razz Styling Style) Parser
 * Beginner-friendly CSS alternative
 * 
 * RSS Syntax: [property: value;]
 * Block Syntax: selector { [prop: value;] [prop: value;] }
 */

class RSSParser {
    constructor() {
        // CSS property mappings - beginner friendly names to CSS
        this.propertyMap = {
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
            'transparent': 'opacity'
        };

        // Value mappings - easy names to CSS values
        this.valueMap = {
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
            'lightblue': '#add8e6',
            'lightgreen': '#90ee90',
            'lightyellow': '#ffffe0',
            'darkblue': '#00008b',
            'darkgreen': '#006400',
            'darkred': '#8b0000',
            
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
    }

    /**
     * Parse RSS content and convert to CSS
     * @param {string} rssContent - The RSS content to parse
     * @returns {string} - The converted CSS content
     */
    parse(rssContent) {
        if (!rssContent) return '';

        let css = '';
        
        // Parse single property syntax: [property: value;]
        const singlePropertyPattern = /\[([^:]+):\s*([^;]+);\s*\]/g;
        let match;
        
        // For single properties, apply to body by default
        const singleProperties = [];
        while ((match = singlePropertyPattern.exec(rssContent)) !== null) {
            const property = match[1].trim();
            const value = match[2].trim();
            const cssProperty = this.convertProperty(property, value);
            if (cssProperty) {
                singleProperties.push(cssProperty);
            }
        }
        
        if (singleProperties.length > 0) {
            css += `body {\n${singleProperties.map(p => `  ${p}`).join('\n')}\n}\n\n`;
        }

        // Parse block syntax: selector { [prop: value;] [prop: value;] }
        const blockPattern = /([^{]+)\s*\{\s*((?:\[[^:]+:[^;]+;\s*\][\s\n]*)*)\}/g;
        
        while ((match = blockPattern.exec(rssContent)) !== null) {
            const selector = this.normalizeSelector(match[1].trim());
            const properties = match[2];
            
            let blockCSS = '';
            const propPattern = /\[([^:]+):\s*([^;]+);\s*\]/g;
            let propMatch;
            
            while ((propMatch = propPattern.exec(properties)) !== null) {
                const cssProperty = this.convertProperty(propMatch[1].trim(), propMatch[2].trim());
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
     * Convert RSS property and value to CSS
     */
    convertProperty(property, value) {
        const cssProperty = this.propertyMap[property.toLowerCase()];
        if (!cssProperty) return null;

        const cssValue = this.convertValue(property.toLowerCase(), value);
        return `${cssProperty}: ${cssValue};`;
    }

    /**
     * Convert RSS values to CSS values
     */
    convertValue(property, value) {
        // Check for mapped values first
        const mappedValue = this.valueMap[value.toLowerCase()];
        if (mappedValue) return mappedValue;

        // Handle special cases
        if (property === 'rounded' || property === 'radius') {
            if (!value.includes('px') && !value.includes('%') && !value.includes('em')) {
                return value + 'px';
            }
        }
        
        if ((property === 'space' || property === 'innerspace' || property === 'outerspace') && 
            !value.includes('px') && !value.includes('%') && !value.includes('em')) {
            return value + 'px';
        }

        return value;
    }

    /**
     * Normalize selectors for RML tags
     */
    normalizeSelector(selector) {
        // Convert RML tag names to proper selectors
        const rmlSelectors = {
            'title': 'h1',
            'subtitle': 'h2',
            'text': 'p',
            'container': 'div',
            'card': '.rml-card',
            'warning': '.rml-warning',
            'success': '.rml-success',
            'error': '.rml-error',
            'info': '.rml-info'
        };

        // Remove curly braces if present
        let cleanSelector = selector.replace(/[{}]/g, '');
        
        // Check if it's an RML tag
        if (rmlSelectors[cleanSelector]) {
            return rmlSelectors[cleanSelector];
        }

        return cleanSelector;
    }

    /**
     * Get example RSS code for learning
     */
    getExamples() {
        return {
            basic: `[color: blue;]
[size: large;]
[background: yellow;]`,
            
            advanced: `{title} {
    [color: red;]
    [size: huge;]
    [align: center;]
}

{text} {
    [color: gray;]
    [size: normal;]
    [space: 10px;]
}`,
            
            educational: `{card} {
    [background: lightblue;]
    [rounded: 10px;]
    [innerspace: 20px;]
    [shadow: 5px;]
}

{warning} {
    [background: lightyellow;]
    [border: 2px solid orange;]
    [rounded: 5px;]
}`
        };
    }

    /**
     * Get available properties for learning
     */
    getAvailableProperties() {
        return Object.keys(this.propertyMap).sort();
    }

    /**
     * Get available values for learning
     */
    getAvailableValues() {
        return Object.keys(this.valueMap).sort();
    }
}

// Export for use in different environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RSSParser;
}
if (typeof window !== 'undefined') {
    window.RSSParser = RSSParser;
} 