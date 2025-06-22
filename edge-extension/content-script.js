/**
 * RML Chrome Extension Content Script
 * Detects .rml files and renders them using RMLParser
 */

(function() {
    'use strict';

    // Check if this is a .rml file
    function isRMLFile() {
        const url = window.location.href;
        return url.endsWith('.rml') || 
               document.contentType === 'text/plain' && url.includes('.rml') ||
               document.querySelector('meta[name="content-type"][content*="rml"]');
    }

    // Check if the page contains RML content
    function hasRMLContent() {
        const bodyText = document.body ? document.body.textContent : '';
        return /\{[a-zA-Z][a-zA-Z0-9]*\}.*?\{\.[a-zA-Z][a-zA-Z0-9]*\}/.test(bodyText);
    }

                // Apply enhanced RML styles with educational elements
            function applyRMLStyles() {
                const style = document.createElement('style');
                style.textContent = `
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                        line-height: 1.6;
                        max-width: 900px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #ffffff;
                        color: #333333;
                    }
                    
                    /* Educational Elements */
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
                    
                    .rml-answer {
                        background: #f3e5f5;
                        border-left: 4px solid #9c27b0;
                        padding: 15px;
                        margin: 10px 0;
                        border-radius: 4px;
                    }
                    
                    .rml-tutorial {
                        background: #e8f5e8;
                        border: 1px solid #c3e6c3;
                        border-radius: 8px;
                        padding: 20px;
                        margin: 20px 0;
                        border-left: 4px solid #28a745;
                    }
                    
                    .rml-step {
                        background: #f1f3f4;
                        padding: 15px;
                        margin: 10px 0;
                        border-radius: 6px;
                        border-left: 3px solid #6c757d;
                        position: relative;
                        padding-left: 40px;
                    }
                    
                    .rml-step::before {
                        content: "→";
                        position: absolute;
                        left: 15px;
                        top: 15px;
                        font-weight: bold;
                        color: #6c757d;
                    }
                    
                    .rml-homework {
                        background: #fff0f5;
                        border: 2px dashed #dc3545;
                        border-radius: 8px;
                        padding: 20px;
                        margin: 20px 0;
                    }
                    
                    .rml-quiz {
                        background: #f0f8ff;
                        border: 1px solid #b3d9ff;
                        border-radius: 8px;
                        padding: 20px;
                        margin: 20px 0;
                        border-left: 4px solid #0066cc;
                    }
            
            h1, h2, h3, h4, h5, h6 {
                color: #2c3e50;
                margin-top: 1.5em;
                margin-bottom: 0.5em;
            }
            
            p {
                margin-bottom: 1em;
            }
            
            blockquote {
                border-left: 4px solid #3498db;
                padding-left: 20px;
                margin: 20px 0;
                font-style: italic;
                background-color: #f8f9fa;
                padding: 15px 20px;
                border-radius: 4px;
            }
            
            code {
                background-color: #f1f2f6;
                padding: 2px 4px;
                border-radius: 3px;
                font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
                font-size: 0.9em;
            }
            
            ul, ol {
                margin-bottom: 1em;
                padding-left: 30px;
            }
            
            li {
                margin-bottom: 0.5em;
            }
            
            a {
                color: #3498db;
                text-decoration: none;
            }
            
            a:hover {
                text-decoration: underline;
            }
            
            table {
                border-collapse: collapse;
                width: 100%;
                margin-bottom: 1em;
            }
            
            th, td {
                border: 1px solid #ddd;
                padding: 8px 12px;
                text-align: left;
            }
            
            th {
                background-color: #f8f9fa;
                font-weight: bold;
            }
            
            img {
                max-width: 100%;
                height: auto;
                border-radius: 4px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }
            
            .rml-indicator {
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
                animation: slideIn 0.3s ease-out;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Add RML indicator
    function addRMLIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'rml-indicator';
        indicator.textContent = '🚀 Rendered with RML';
        document.body.appendChild(indicator);
        
        // Remove indicator after 3 seconds
        setTimeout(() => {
            if (indicator.parentNode) {
                indicator.style.animation = 'slideIn 0.3s ease-out reverse';
                setTimeout(() => indicator.remove(), 300);
            }
        }, 3000);
    }

    // Process RML content
    function processRMLContent() {
        try {
            // Get the current page content
            let content = '';
            
            if (document.body) {
                // If it's a plain text file, get the text content
                if (document.body.children.length === 1 && 
                    document.body.children[0].tagName === 'PRE') {
                    content = document.body.children[0].textContent;
                } else {
                    content = document.body.textContent;
                }
            }

            // Parse RML content
            const parser = new RMLParser();
            const htmlContent = parser.parse(content);

            // Replace the page content
            if (htmlContent && htmlContent !== content) {
                document.body.innerHTML = htmlContent;
                
                // Apply RML styles
                applyRMLStyles();
                
                // Add indicator
                addRMLIndicator();
                
                // Update page title if we have a heading
                const firstHeading = document.querySelector('h1, h2, h3');
                if (firstHeading && !document.title.includes(firstHeading.textContent)) {
                    document.title = firstHeading.textContent + ' - RML Document';
                }
                
                console.log('RML content successfully rendered!');
            }
        } catch (error) {
            console.error('Error processing RML content:', error);
        }
    }

    // Initialize the extension
    function init() {
        // Wait for the document to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        // Check if we should process this page
        if (isRMLFile() || hasRMLContent()) {
            processRMLContent();
        }
    }

    // Start the extension
    init();

    // Listen for dynamic content changes
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                // Check if new content might be RML
                for (const node of mutation.addedNodes) {
                    if (node.nodeType === Node.TEXT_NODE && hasRMLContent()) {
                        processRMLContent();
                        break;
                    }
                }
            }
        });
    });

    // Start observing
    if (document.body) {
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
})(); 