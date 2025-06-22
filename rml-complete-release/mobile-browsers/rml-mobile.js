/**
 * RML Mobile Browser Support
 * Optimized for Android Chrome, Firefox Mobile, Safari Mobile, and other mobile browsers
 */

(function() {
    'use strict';
    
    console.log('📱 RML Mobile Script loaded!');
    
    // Mobile detection
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTablet = /iPad|Android.*(?!.*Mobile)/i.test(navigator.userAgent);
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Mobile-optimized RML Parser
    class MobileRMLParser {
        constructor() {
            this.tagMappings = {
                // Essential tags for mobile
                'title': 'h1',
                'subtitle': 'h2',
                'text': 'p',
                'para': 'p',
                'bold': 'strong',
                'italic': 'em',
                'highlight': 'mark',
                'code': 'code',
                
                // Educational tags
                'lesson': 'div class="rml-lesson"',
                'exercise': 'div class="rml-exercise"',
                'question': 'div class="rml-question"',
                'answer': 'div class="rml-answer"',
                'tip': 'div class="rml-tip"',
                'note': 'div class="rml-note"',
                'success': 'div class="rml-success"',
                'warning': 'div class="rml-warning"',
                'error': 'div class="rml-error"',
                'info': 'div class="rml-info"',
                
                // Mobile-friendly layouts
                'card': 'div class="rml-card"',
                'section': 'section class="rml-section"',
                'container': 'div class="rml-container"',
                'item': 'li',
                'list': 'ul',
                'numlist': 'ol'
            };
        }
        
        parse(content) {
            if (!content) return '';
            
            let parsed = content;
            
            // Parse tags
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
            
            return parsed;
        }
    }
    
    // Mobile-optimized styles
    function applyMobileStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Mobile RML Styles */
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
                font-size: 16px;
                line-height: 1.6;
                margin: 0;
                padding: 10px;
                background-color: #ffffff;
                color: #333333;
                -webkit-text-size-adjust: 100%;
                -webkit-font-smoothing: antialiased;
            }
            
            /* Responsive typography */
            h1 {
                font-size: 1.8rem;
                margin: 1rem 0 0.5rem 0;
                color: #2c3e50;
                font-weight: 700;
            }
            
            h2 {
                font-size: 1.5rem;
                margin: 1rem 0 0.5rem 0;
                color: #34495e;
                font-weight: 600;
            }
            
            h3 {
                font-size: 1.3rem;
                margin: 0.8rem 0 0.4rem 0;
                color: #34495e;
                font-weight: 600;
            }
            
            p {
                margin: 0 0 1rem 0;
                font-size: 1rem;
                line-height: 1.6;
            }
            
            /* Mobile-optimized educational elements */
            .rml-lesson {
                background: #f8f9fa;
                border: 1px solid #dee2e6;
                border-radius: 8px;
                padding: 15px;
                margin: 15px 0;
                border-left: 4px solid #007bff;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            
            .rml-exercise {
                background: #fff3cd;
                border: 1px solid #ffeaa7;
                border-radius: 8px;
                padding: 15px;
                margin: 15px 0;
                border-left: 4px solid #ffc107;
                box-shadow: 0 2px 4px rgba(255,193,7,0.2);
            }
            
            .rml-question {
                background: #e3f2fd;
                border-left: 4px solid #2196f3;
                padding: 12px;
                margin: 10px 0;
                border-radius: 4px;
                font-weight: bold;
                position: relative;
                padding-left: 35px;
            }
            
            .rml-question::before {
                content: "❓";
                position: absolute;
                left: 12px;
                top: 12px;
                font-size: 1.2em;
            }
            
            .rml-answer {
                background: #f3e5f5;
                border-left: 4px solid #9c27b0;
                padding: 12px;
                margin: 10px 0;
                border-radius: 4px;
                position: relative;
                padding-left: 35px;
            }
            
            .rml-answer::before {
                content: "💡";
                position: absolute;
                left: 12px;
                top: 12px;
                font-size: 1.2em;
            }
            
            /* Mobile message boxes */
            .rml-success {
                background-color: #d4edda;
                border: 1px solid #c3e6cb;
                border-left: 4px solid #27ae60;
                padding: 12px;
                margin: 10px 0;
                border-radius: 4px;
                padding-left: 35px;
                position: relative;
            }
            
            .rml-success::before {
                content: "✅";
                position: absolute;
                left: 12px;
                top: 12px;
            }
            
            .rml-warning {
                background-color: #fff3cd;
                border: 1px solid #ffeaa7;
                border-left: 4px solid #fdcb6e;
                padding: 12px;
                margin: 10px 0;
                border-radius: 4px;
                padding-left: 35px;
                position: relative;
            }
            
            .rml-warning::before {
                content: "⚠️";
                position: absolute;
                left: 12px;
                top: 12px;
            }
            
            .rml-error {
                background-color: #f8d7da;
                border: 1px solid #f5c6cb;
                border-left: 4px solid #e74c3c;
                padding: 12px;
                margin: 10px 0;
                border-radius: 4px;
                padding-left: 35px;
                position: relative;
            }
            
            .rml-error::before {
                content: "❌";
                position: absolute;
                left: 12px;
                top: 12px;
            }
            
            .rml-info {
                background-color: #d1ecf1;
                border: 1px solid #bee5eb;
                border-left: 4px solid #3498db;
                padding: 12px;
                margin: 10px 0;
                border-radius: 4px;
                padding-left: 35px;
                position: relative;
            }
            
            .rml-info::before {
                content: "ℹ️";
                position: absolute;
                left: 12px;
                top: 12px;
            }
            
            .rml-tip {
                background-color: #e2e3e5;
                border: 1px solid #d6d8db;
                border-left: 4px solid #6c757d;
                padding: 12px;
                margin: 10px 0;
                border-radius: 4px;
                padding-left: 35px;
                position: relative;
            }
            
            .rml-tip::before {
                content: "💡";
                position: absolute;
                left: 12px;
                top: 12px;
            }
            
            .rml-note {
                background-color: #f8f9fa;
                border: 1px solid #e9ecef;
                border-left: 4px solid #6c757d;
                padding: 12px;
                margin: 10px 0;
                border-radius: 4px;
                padding-left: 35px;
                position: relative;
            }
            
            .rml-note::before {
                content: "📝";
                position: absolute;
                left: 12px;
                top: 12px;
            }
            
            /* Mobile cards */
            .rml-card {
                background: white;
                border-radius: 8px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                padding: 15px;
                margin: 15px 0;
                border: 1px solid #e9ecef;
                position: relative;
            }
            
            .rml-container {
                max-width: 100%;
                margin: 0;
                padding: 0;
            }
            
            .rml-section {
                margin: 15px 0;
                padding: 0;
            }
            
            /* Mobile lists */
            ul, ol {
                padding-left: 20px;
                margin: 0 0 1rem 0;
            }
            
            li {
                margin: 0.3rem 0;
                line-height: 1.5;
            }
            
            /* Mobile code */
            code {
                background-color: #f8f9fa;
                padding: 2px 4px;
                border-radius: 3px;
                font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
                font-size: 0.9em;
                word-break: break-word;
            }
            
            /* Mobile indicator */
            .rml-mobile-indicator {
                position: fixed;
                top: 10px;
                right: 10px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 6px 10px;
                border-radius: 15px;
                font-size: 11px;
                font-weight: bold;
                z-index: 10000;
                box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                animation: fadeInOut 3s ease-out;
            }
            
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translateX(100%); }
                20% { opacity: 1; transform: translateX(0); }
                80% { opacity: 1; transform: translateX(0); }
                100% { opacity: 0; transform: translateX(100%); }
            }
            
            /* Touch-friendly interactions */
            .rml-card:active,
            .rml-lesson:active,
            .rml-exercise:active {
                transform: scale(0.98);
                transition: transform 0.1s ease;
            }
            
            /* Dark mode support for mobile */
            @media (prefers-color-scheme: dark) {
                body {
                    background-color: #1a1a1a;
                    color: #e0e0e0;
                }
                
                .rml-card {
                    background: #2a2a2a;
                    border-color: #404040;
                }
                
                .rml-lesson {
                    background: #2a2a2a;
                    border-color: #404040;
                }
                
                .rml-exercise {
                    background: #2a2a2a;
                    border-color: #404040;
                }
            }
            
            /* Landscape tablet adjustments */
            @media (min-width: 768px) and (orientation: landscape) {
                body {
                    padding: 20px;
                    max-width: 900px;
                    margin: 0 auto;
                }
                
                .rml-lesson,
                .rml-exercise,
                .rml-card {
                    padding: 20px;
                }
            }
            
            /* Very small screens */
            @media (max-width: 320px) {
                body {
                    padding: 8px;
                    font-size: 14px;
                }
                
                h1 { font-size: 1.5rem; }
                h2 { font-size: 1.3rem; }
                h3 { font-size: 1.1rem; }
                
                .rml-lesson,
                .rml-exercise,
                .rml-card {
                    padding: 12px;
                    margin: 12px 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add mobile viewport meta tag if missing
    function ensureViewportMeta() {
        if (!document.querySelector('meta[name="viewport"]')) {
            const viewport = document.createElement('meta');
            viewport.name = 'viewport';
            viewport.content = 'width=device-width, initial-scale=1.0, user-scalable=yes';
            document.head.appendChild(viewport);
        }
    }
    
    // Check if page should be processed
    function shouldProcessPage() {
        const url = window.location.href;
        const hasRMLExtension = url.endsWith('.rml');
        const hasRMLContent = document.body && /\{[a-zA-Z][a-zA-Z0-9]*\}.*?\{\.[a-zA-Z][a-zA-Z0-9]*\}/.test(document.body.textContent);
        
        return hasRMLExtension || hasRMLContent;
    }
    
    // Process content for mobile
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
            
            const parser = new MobileRMLParser();
            const htmlContent = parser.parse(content);
            
            if (htmlContent && htmlContent !== content) {
                document.body.innerHTML = htmlContent;
                
                ensureViewportMeta();
                applyMobileStyles();
                
                // Add mobile indicator
                const indicator = document.createElement('div');
                indicator.className = 'rml-mobile-indicator';
                indicator.textContent = `📱 RML (${isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Touch'})`;
                document.body.appendChild(indicator);
                
                // Add touch feedback
                if (isTouch) {
                    document.body.style.touchAction = 'manipulation';
                }
                
                console.log('📱 RML content successfully rendered for mobile!');
            }
        } catch (error) {
            console.error('❌ Error processing RML content on mobile:', error);
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