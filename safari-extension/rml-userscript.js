// ==UserScript==
// @name         RML (RazzMarkupLanguage) Renderer
// @namespace    https://razzmarkup.dev
// @version      1.0.0
// @description  Render .rml files using RazzMarkupLanguage syntax - educational web development for Safari!
// @author       RazzMarkup Team
// @match        file:///*.rml
// @match        http://*.rml
// @match        https://*.rml
// @match        *://*/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    
    console.log('🚀 RML UserScript loaded for Safari!');
    
    // RML Parser implementation (embedded)
    class RMLParser {
        constructor() {
            this.tagMappings = {
                // Basic text tags
                'title': 'h1',
                'head1': 'h1',
                'head2': 'h2',
                'head3': 'h3',
                'head4': 'h4',
                'head5': 'h5',
                'head6': 'h6',
                'subtitle': 'h2',
                'subhead': 'h3',
                'para': 'p',
                'text': 'p',
                'line': 'br',
                'break': 'br',
                
                // Formatting tags
                'bold': 'strong',
                'strong': 'strong',
                'italic': 'em',
                'emphasis': 'em',
                'underline': 'u',
                'strike': 'del',
                'highlight': 'mark',
                'code': 'code',
                'pre': 'pre',
                'quote': 'blockquote',
                'cite': 'cite',
                
                // Educational tags
                'lesson': 'div class="rml-lesson"',
                'exercise': 'div class="rml-exercise"',
                'question': 'div class="rml-question"',
                'answer': 'div class="rml-answer"',
                'homework': 'div class="rml-homework"',
                'quiz': 'div class="rml-quiz"',
                'tutorial': 'div class="rml-tutorial"',
                'step': 'div class="rml-step"',
                'example': 'div class="rml-example"',
                'practice': 'div class="rml-practice"',
                
                // Message boxes
                'warning': 'div class="rml-warning"',
                'error': 'div class="rml-error"',
                'success': 'div class="rml-success"',
                'info': 'div class="rml-info"',
                'tip': 'div class="rml-tip"',
                'note': 'div class="rml-note"',
                'alert': 'div class="rml-alert"',
                
                // Lists
                'list': 'ul',
                'numlist': 'ol',
                'item': 'li',
                
                // Links and media
                'link': 'a',
                'image': 'img',
                'video': 'video',
                'audio': 'audio',
                
                // Layout
                'container': 'div class="rml-container"',
                'section': 'section',
                'header': 'header',
                'footer': 'footer',
                'card': 'div class="rml-card"',
                'box': 'div class="rml-box"'
            };
        }
        
        parse(content) {
            if (!content || typeof content !== 'string') {
                return '';
            }
            
            let parsed = content;
            
            // Parse RML tags
            for (const [rmlTag, htmlTag] of Object.entries(this.tagMappings)) {
                const openTag = new RegExp(`\\{${rmlTag}\\}`, 'g');
                const closeTag = new RegExp(`\\{\\.${rmlTag}\\}`, 'g');
                
                if (htmlTag.includes('class=')) {
                    parsed = parsed.replace(openTag, `<${htmlTag}>`);
                } else {
                    parsed = parsed.replace(openTag, `<${htmlTag}>`);
                }
                parsed = parsed.replace(closeTag, `</${htmlTag.split(' ')[0]}>`);
            }
            
            // Handle RSS styling
            parsed = this.parseRSSStyles(parsed);
            
            return parsed;
        }
        
        parseRSSStyles(content) {
            // Convert [property: value;] to CSS styles
            return content.replace(/\[([^:]+):\s*([^;]+);\]/g, (match, property, value) => {
                const cssProperty = this.mapRSSProperty(property.trim());
                const cssValue = this.mapRSSValue(value.trim());
                return `style="${cssProperty}: ${cssValue};"`;
            });
        }
        
        mapRSSProperty(property) {
            const propertyMap = {
                'color': 'color',
                'size': 'font-size',
                'background': 'background-color',
                'width': 'width',
                'height': 'height',
                'padding': 'padding',
                'margin': 'margin',
                'border': 'border'
            };
            return propertyMap[property] || property;
        }
        
        mapRSSValue(value) {
            const valueMap = {
                'tiny': '10px',
                'small': '12px',
                'normal': '14px',
                'large': '18px',
                'huge': '24px',
                'giant': '32px',
                'red': '#e74c3c',
                'blue': '#3498db',
                'green': '#27ae60',
                'yellow': '#f1c40f',
                'purple': '#9b59b6',
                'orange': '#e67e22'
            };
            return valueMap[value] || value;
        }
    }
    
    // Safari-specific styles
    function applySafariStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Safari RML Styles */
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
                line-height: 1.6;
                max-width: 900px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                color: #333333;
            }
            
            h1, h2, h3, h4, h5, h6 {
                color: #2c3e50;
                margin-top: 1.5em;
                margin-bottom: 0.5em;
                font-weight: 600;
            }
            
            .rml-lesson {
                background: #f8f9fa;
                border: 1px solid #dee2e6;
                border-radius: 8px;
                padding: 20px;
                margin: 20px 0;
                border-left: 4px solid #007bff;
            }
            
            .rml-exercise {
                background: #fff3cd;
                border: 1px solid #ffeaa7;
                border-radius: 8px;
                padding: 20px;
                margin: 20px 0;
                border-left: 4px solid #ffc107;
            }
            
            .rml-question {
                background: #e3f2fd;
                border-left: 4px solid #2196f3;
                padding: 15px;
                margin: 10px 0;
                border-radius: 4px;
                font-weight: bold;
            }
            
            .rml-question::before {
                content: "❓ ";
            }
            
            .rml-answer {
                background: #f3e5f5;
                border-left: 4px solid #9c27b0;
                padding: 15px;
                margin: 10px 0;
                border-radius: 4px;
            }
            
            .rml-answer::before {
                content: "💡 ";
            }
            
            .rml-success {
                background-color: #d4edda;
                border: 1px solid #c3e6cb;
                border-left: 4px solid #27ae60;
                padding: 15px;
                margin: 10px 0;
                border-radius: 4px;
            }
            
            .rml-success::before {
                content: "✅ ";
            }
            
            .rml-warning {
                background-color: #fff3cd;
                border: 1px solid #ffeaa7;
                border-left: 4px solid #fdcb6e;
                padding: 15px;
                margin: 10px 0;
                border-radius: 4px;
            }
            
            .rml-warning::before {
                content: "⚠️ ";
            }
            
            .rml-error {
                background-color: #f8d7da;
                border: 1px solid #f5c6cb;
                border-left: 4px solid #e74c3c;
                padding: 15px;
                margin: 10px 0;
                border-radius: 4px;
            }
            
            .rml-error::before {
                content: "❌ ";
            }
            
            .rml-info {
                background-color: #d1ecf1;
                border: 1px solid #bee5eb;
                border-left: 4px solid #3498db;
                padding: 15px;
                margin: 10px 0;
                border-radius: 4px;
            }
            
            .rml-info::before {
                content: "ℹ️ ";
            }
            
            .rml-card {
                background: white;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                padding: 20px;
                margin: 15px 0;
                border: 1px solid #e9ecef;
            }
            
            .rml-safari-indicator {
                position: fixed;
                top: 10px;
                right: 10px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 8px 12px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: bold;
                z-index: 10000;
                box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            }
        `;
        document.head.appendChild(style);
    }
    
    // Check if this page should be processed
    function shouldProcessPage() {
        const url = window.location.href;
        const hasRMLExtension = url.endsWith('.rml');
        const hasRMLContent = document.body && /\{[a-zA-Z][a-zA-Z0-9]*\}.*?\{\.[a-zA-Z][a-zA-Z0-9]*\}/.test(document.body.textContent);
        
        return hasRMLExtension || hasRMLContent;
    }
    
    // Process RML content
    function processRMLContent() {
        try {
            let content = '';
            
            if (document.body) {
                if (document.body.children.length === 1 && 
                    document.body.children[0].tagName === 'PRE') {
                    content = document.body.children[0].textContent;
                } else {
                    content = document.body.textContent;
                }
            }
            
            const parser = new RMLParser();
            const htmlContent = parser.parse(content);
            
            if (htmlContent && htmlContent !== content) {
                document.body.innerHTML = htmlContent;
                applySafariStyles();
                
                // Add Safari indicator
                const indicator = document.createElement('div');
                indicator.className = 'rml-safari-indicator';
                indicator.textContent = '🍎 RML (Safari)';
                document.body.appendChild(indicator);
                
                // Remove indicator after 3 seconds
                setTimeout(() => indicator.remove(), 3000);
                
                console.log('✅ RML content successfully rendered in Safari!');
            }
        } catch (error) {
            console.error('❌ Error processing RML content:', error);
        }
    }
    
    // Initialize
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }
        
        if (shouldProcessPage()) {
            processRMLContent();
        }
    }
    
    // Start processing
    init();
    
})(); 