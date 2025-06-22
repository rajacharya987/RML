/**
 * Universal RML Content Script
 * Compatible with Chrome, Firefox, Opera, Edge, and other browsers
 */

(function() {
    'use strict';

    // Browser compatibility layer
    const browser = (() => {
        if (typeof chrome !== 'undefined' && chrome.runtime) {
            return chrome;
        }
        if (typeof browser !== 'undefined' && browser.runtime) {
            return browser;
        }
        return chrome; // Fallback
    })();

    // Detect browser capabilities
    const BrowserCapabilities = {
        supportsFileAPI: typeof File !== 'undefined' && typeof FileReader !== 'undefined',
        supportsMutationObserver: typeof MutationObserver !== 'undefined',
        supportsLocalStorage: typeof localStorage !== 'undefined',
        browserName: getBrowserName()
    };

    function getBrowserName() {
        const userAgent = navigator.userAgent;
        if (userAgent.includes('Firefox')) return 'firefox';
        if (userAgent.includes('Edg')) return 'edge';
        if (userAgent.includes('OPR') || userAgent.includes('Opera')) return 'opera';
        if (userAgent.includes('Chrome')) return 'chrome';
        if (userAgent.includes('Safari')) return 'safari';
        return 'unknown';
    }

    // Check if this is a .rml file
    function isRMLFile() {
        const url = window.location.href;
        return url.endsWith('.rml') || 
               (document.contentType && document.contentType.includes('text/plain') && url.includes('.rml')) ||
               document.querySelector('meta[name="content-type"][content*="rml"]');
    }

    // Check if the page contains RML content
    function hasRMLContent() {
        const bodyText = document.body ? document.body.textContent : '';
        return /\{[a-zA-Z][a-zA-Z0-9]*\}.*?\{\.[a-zA-Z][a-zA-Z0-9]*\}/.test(bodyText);
    }

    // Apply enhanced RML styles with cross-browser compatibility
    function applyRMLStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Universal RML Styles - Cross-Browser Compatible */
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                max-width: 900px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                color: #333333;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
            }
            
            /* Cross-browser heading styles */
            h1, h2, h3, h4, h5, h6 {
                color: #2c3e50;
                margin-top: 1.5em;
                margin-bottom: 0.5em;
                font-weight: 600;
            }
            
            h1 { font-size: 2.5rem; }
            h2 { font-size: 2rem; }
            h3 { font-size: 1.75rem; }
            h4 { font-size: 1.5rem; }
            h5 { font-size: 1.25rem; }
            h6 { font-size: 1rem; }
            
            p {
                margin-bottom: 1em;
                text-align: justify;
            }
            
            /* Educational Elements - Universal */
            .rml-lesson {
                background: #f8f9fa;
                border: 1px solid #dee2e6;
                border-radius: 8px;
                padding: 20px;
                margin: 20px 0;
                border-left: 4px solid #007bff;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            
            .rml-exercise {
                background: #fff3cd;
                border: 1px solid #ffeaa7;
                border-radius: 8px;
                padding: 20px;
                margin: 20px 0;
                border-left: 4px solid #ffc107;
                box-shadow: 0 2px 4px rgba(255,193,7,0.2);
            }
            
            .rml-question {
                background: #e3f2fd;
                border-left: 4px solid #2196f3;
                padding: 15px;
                margin: 10px 0;
                border-radius: 4px;
                font-weight: bold;
                position: relative;
            }
            
            .rml-question::before {
                content: "❓";
                margin-right: 8px;
            }
            
            .rml-answer {
                background: #f3e5f5;
                border-left: 4px solid #9c27b0;
                padding: 15px;
                margin: 10px 0;
                border-radius: 4px;
                position: relative;
            }
            
            .rml-answer::before {
                content: "💡";
                margin-right: 8px;
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
                font-size: 1.2em;
            }
            
            .rml-homework {
                background: #fff0f5;
                border: 2px dashed #dc3545;
                border-radius: 8px;
                padding: 20px;
                margin: 20px 0;
                position: relative;
            }
            
            .rml-homework::before {
                content: "📚 HOMEWORK";
                position: absolute;
                top: -12px;
                left: 20px;
                background: #dc3545;
                color: white;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 0.8em;
                font-weight: bold;
            }
            
            .rml-quiz {
                background: #f0f8ff;
                border: 1px solid #b3d9ff;
                border-radius: 8px;
                padding: 20px;
                margin: 20px 0;
                border-left: 4px solid #0066cc;
            }
            
            /* Message boxes with cross-browser support */
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
            
            .rml-tip {
                background-color: #e2e3e5;
                border: 1px solid #d6d8db;
                border-left: 4px solid #6c757d;
                padding: 15px;
                margin: 10px 0;
                border-radius: 4px;
            }
            
            .rml-tip::before {
                content: "💡 ";
            }
            
            .rml-note {
                background-color: #f8f9fa;
                border: 1px solid #e9ecef;
                border-left: 4px solid #6c757d;
                padding: 15px;
                margin: 10px 0;
                border-radius: 4px;
            }
            
            .rml-note::before {
                content: "📝 ";
            }
            
            .rml-card {
                background: white;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                padding: 20px;
                margin: 15px 0;
                border: 1px solid #e9ecef;
            }
            
            /* Cross-browser list styles */
            ul, ol {
                margin-bottom: 1em;
                padding-left: 30px;
            }
            
            li {
                margin-bottom: 0.5em;
            }
            
            /* Universal link styles */
            a {
                color: #3498db;
                text-decoration: none;
                transition: color 0.3s ease;
            }
            
            a:hover {
                text-decoration: underline;
                color: #2980b9;
            }
            
            /* Browser indicator */
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
            
            /* Cross-browser table styles */
            table {
                border-collapse: collapse;
                width: 100%;
                margin-bottom: 1em;
                border: 1px solid #dee2e6;
                border-radius: 8px;
                overflow: hidden;
            }
            
            th, td {
                border: 1px solid #dee2e6;
                padding: 12px;
                text-align: left;
            }
            
            th {
                background-color: #f8f9fa;
                font-weight: bold;
            }
            
            /* Media queries for responsiveness */
            @media (max-width: 768px) {
                body {
                    padding: 10px;
                    font-size: 14px;
                }
                
                .rml-lesson, .rml-exercise, .rml-tutorial {
                    padding: 15px;
                }
                
                .rml-indicator {
                    top: 5px;
                    right: 5px;
                    font-size: 11px;
                    padding: 6px 10px;
                }
            }
        `;
        
        // Add browser-specific styles
        if (BrowserCapabilities.browserName === 'firefox') {
            style.textContent += `
                /* Firefox-specific adjustments */
                body {
                    -moz-osx-font-smoothing: grayscale;
                }
            `;
        }
        
        document.head.appendChild(style);
    }

    // Add RML indicator with browser info
    function addRMLIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'rml-indicator';
        indicator.textContent = `🚀 RML (${BrowserCapabilities.browserName.toUpperCase()})`;
        document.body.appendChild(indicator);
        
        // Remove indicator after 3 seconds
        setTimeout(() => {
            if (indicator.parentNode) {
                indicator.style.animation = 'slideIn 0.3s ease-out reverse';
                setTimeout(() => indicator.remove(), 300);
            }
        }, 3000);
    }

    // Process RML content with cross-browser compatibility
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

            // Check if RMLParser is available
            if (typeof RMLParser === 'undefined') {
                console.error('RMLParser not found - check if rml-parser.js is loaded');
                return;
            }

            // Parse RML content
            const parser = new RMLParser();
            const htmlContent = parser.parse(content);

            // Replace the page content if parsing was successful
            if (htmlContent && htmlContent !== content) {
                document.body.innerHTML = htmlContent;
                
                // Apply RML styles
                applyRMLStyles();
                
                // Add browser-specific indicator
                addRMLIndicator();
                
                // Update page title if we have a heading
                const firstHeading = document.querySelector('h1, h2, h3');
                if (firstHeading && !document.title.includes(firstHeading.textContent)) {
                    document.title = firstHeading.textContent + ' - RML Document';
                }
                
                console.log(`RML content successfully rendered on ${BrowserCapabilities.browserName}!`);
            }
        } catch (error) {
            console.error('Error processing RML content:', error);
        }
    }

    // Initialize the extension with cross-browser support
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

    // Listen for messages from background script
    browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
        try {
            switch (request.action) {
                case 'parseRML':
                    if (request.selection) {
                        // Parse selected text as RML
                        const parser = new RMLParser();
                        const html = parser.parse(request.selection);
                        
                        // Create a temporary div to show the result
                        const resultDiv = document.createElement('div');
                        resultDiv.innerHTML = html;
                        resultDiv.style.cssText = `
                            position: fixed;
                            top: 20px;
                            right: 20px;
                            max-width: 400px;
                            background: white;
                            border: 2px solid #667eea;
                            border-radius: 8px;
                            padding: 15px;
                            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
                            z-index: 10001;
                        `;
                        document.body.appendChild(resultDiv);
                        
                        // Remove after 5 seconds
                        setTimeout(() => resultDiv.remove(), 5000);
                    } else {
                        processRMLContent();
                    }
                    sendResponse({ success: true });
                    break;
                    
                case 'viewSource':
                    // Show RML source in a modal
                    const modal = document.createElement('div');
                    modal.innerHTML = `
                        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 10002; display: flex; align-items: center; justify-content: center;">
                            <div style="background: white; border-radius: 8px; padding: 20px; max-width: 80%; max-height: 80%; overflow: auto;">
                                <h3>RML Source</h3>
                                <pre style="background: #f8f9fa; padding: 15px; border-radius: 4px; overflow: auto;">${document.body.textContent}</pre>
                                <button onclick="this.closest('div').parentNode.remove()" style="margin-top: 15px; padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">Close</button>
                            </div>
                        </div>
                    `;
                    document.body.appendChild(modal);
                    sendResponse({ success: true });
                    break;
                    
                case 'settingsChanged':
                    if (!request.enabled) {
                        // Reload page to remove RML rendering
                        location.reload();
                    }
                    sendResponse({ success: true });
                    break;
                    
                default:
                    sendResponse({ error: 'Unknown action' });
            }
        } catch (error) {
            console.error('Error handling message:', error);
            sendResponse({ error: error.message });
        }
    });

    // Start the extension
    init();

    // Listen for dynamic content changes (if supported)
    if (BrowserCapabilities.supportsMutationObserver) {
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

        // Start observing when body is available
        if (document.body) {
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    }

    console.log(`🚀 RML Universal Content Script loaded on ${BrowserCapabilities.browserName}!`);
})(); 