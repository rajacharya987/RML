/**
 * RML Test Page JavaScript
 * Separated from HTML to comply with Chrome Extension CSP
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🧪 RML Test Page loaded!');
    
    // Initialize the page
    initializeTestPage();
    
    // Set up event listeners
    setupEventListeners();
    
    // Set up tab switching
    setupTabSwitching();
    
    // Run initial tests
    runInitialTests();
});

function initializeTestPage() {
    // Update page title
    document.title = 'RML Interactive Test Page - Chrome Extension';
    
    // Add extension indicator
    const indicator = document.createElement('div');
    indicator.style.cssText = `
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
    `;
    indicator.textContent = '🔥 Chrome Extension Mode';
    document.body.appendChild(indicator);
    
    // Remove indicator after 4 seconds
    setTimeout(() => {
        if (indicator.parentNode) {
            indicator.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => indicator.remove(), 300);
        }
    }, 4000);
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        .toggle.active {
            background: #667eea !important;
        }
    `;
    document.head.appendChild(style);
}

function setupEventListeners() {
    // Parse RML button
    const parseBtn = document.getElementById('parseBtn');
    if (parseBtn) {
        parseBtn.addEventListener('click', parseRMLContent);
    }
    
    // Clear output button
    const clearBtn = document.getElementById('clearBtn');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearOutput);
    }
    
    // Load example buttons
    const exampleBtns = document.querySelectorAll('[data-example]');
    exampleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            loadExample(this.getAttribute('data-example'));
        });
    });
    
    // Try RSS styling button
    const rssBtn = document.getElementById('tryRSSBtn');
    if (rssBtn) {
        rssBtn.addEventListener('click', tryRSSStyling);
    }
    
    // Real-time parsing toggle - FIXED
    const realtimeToggle = document.getElementById('realtimeToggle');
    if (realtimeToggle) {
        // Initialize real-time as disabled
        window.realtimeEnabled = false;
        
        realtimeToggle.addEventListener('change', function() {
            window.realtimeEnabled = this.checked;
            const toggleContainer = this.closest('.toggle');
            
            if (this.checked) {
                toggleContainer.classList.add('active');
                showInfo('⚡ Real-time parsing enabled - changes will appear instantly!');
                parseRMLContent(); // Parse current content immediately
            } else {
                toggleContainer.classList.remove('active');
                showInfo('⏸️ Real-time parsing disabled - click Parse button to update');
            }
        });
    }
    
    // Input textarea changes - FIXED
    const input = document.getElementById('rmlInput');
    if (input) {
        input.addEventListener('input', function() {
            if (window.realtimeEnabled) {
                debounceParseRML();
            }
        });
        
        // Also handle paste events
        input.addEventListener('paste', function() {
            if (window.realtimeEnabled) {
                setTimeout(debounceParseRML, 100); // Small delay for paste to complete
            }
        });
    }
}

function setupTabSwitching() {
    const tabs = document.querySelectorAll('.tab');
    const preview = document.getElementById('preview');
    const htmlOutput = document.getElementById('htmlOutput');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show/hide content
            if (this.dataset.tab === 'preview') {
                preview.style.display = 'block';
                htmlOutput.style.display = 'none';
            } else {
                preview.style.display = 'none';
                htmlOutput.style.display = 'block';
            }
        });
    });
}

function runInitialTests() {
    // Check if RMLParser is available
    if (typeof RMLParser === 'undefined') {
        showError('RMLParser not found! Make sure rml-parser.js is loaded.');
        return;
    }
    
    // Show success message
    showSuccess('✅ RML Parser loaded successfully! Ready for testing.');
    
    // Parse the default content
    parseRMLContent();
}

function parseRMLContent() {
    const input = document.getElementById('rmlInput');
    const output = document.getElementById('htmlOutput');
    const preview = document.getElementById('preview');
    
    if (!input || !output || !preview) {
        showError('Required elements not found on page');
        return;
    }
    
    const rmlContent = input.value.trim();
    
    if (!rmlContent) {
        showWarning('Please enter some RML content to parse');
        return;
    }
    
    try {
        // Check if RMLParser exists
        if (typeof RMLParser === 'undefined') {
            throw new Error('RMLParser not available');
        }
        
        // Parse the RML content
        const parser = new RMLParser();
        const htmlResult = parser.parse(rmlContent);
        
        // Update outputs
        output.textContent = htmlResult;
        preview.innerHTML = htmlResult;
        
        // Show success
        showSuccess('✅ RML parsed successfully!');
        
        // Update statistics
        updateStats(rmlContent, htmlResult);
        
        console.log('✅ RML parsing completed successfully');
        
    } catch (error) {
        console.error('❌ RML parsing error:', error);
        showError('Parse error: ' + error.message);
        output.textContent = 'Error: ' + error.message;
        preview.innerHTML = '<div style="color: red;">Parse Error: ' + error.message + '</div>';
    }
}

function clearOutput() {
    const input = document.getElementById('rmlInput');
    const output = document.getElementById('htmlOutput');
    const preview = document.getElementById('preview');
    
    if (input) input.value = '';
    if (output) output.textContent = '';
    if (preview) preview.innerHTML = '';
    
    clearMessages();
    showInfo('📝 Ready for new RML content');
}

function loadExample(exampleType) {
    const input = document.getElementById('rmlInput');
    if (!input) return;
    
    const examples = {
        basic: `{title}Welcome to RML!{.title}
{text}This is a basic example of RML (RazzMarkupLanguage).{.text}
{success}If you see this styled, RML is working perfectly!{.success}`,
        
        educational: `{lesson}
  {title}Introduction to Web Development{.title}
  
  {question}What is a web page?{.question}
  {answer}A web page is a document that can be displayed in a web browser.{.answer}
  
  {exercise}
    Try creating your own RML content using the examples above.
  {.exercise}
  
  {tip}Remember: RML uses {curly} braces instead of <angle> brackets!{.tip}
{.lesson}`,
        
        styling: `{title}[color: blue;][size: large;]Styled RML Title{.title}
{text}[background: yellow;]This text has a yellow background{.text}
{text}[color: red;][size: small;]Small red text{.text}
{success}[color: green;]Green success message{.success}`,
        
        advanced: `{container}
  {header}
    {title}My Student Portfolio{.title}
    {subtitle}Created with RML{.subtitle}
  {.header}
  
  {section}
    {subtitle}About Me{.subtitle}
    {text}I'm learning web development with RML!{.text}
    
    {list}
      {item}Student at [Your School]{.item}
      {item}Interested in technology{.item}
      {item}Learning RML and web development{.item}
    {.list}
  {.section}
  
  {footer}
    {info}Created with RML - the educational markup language{.info}
  {.footer}
{.container}`
    };
    
    if (examples[exampleType]) {
        input.value = examples[exampleType];
        parseRMLContent(); // Auto-parse the example
        showInfo('📚 Loaded ' + exampleType + ' example');
    }
}

function tryRSSStyling() {
    const input = document.getElementById('rmlInput');
    if (!input) return;
    
    const rssExample = `{title}[color: purple;][size: huge;]RSS Styling Demo{.title}

{text}[color: blue;]This text is blue{.text}
{text}[color: red;][size: large;]Large red text{.text}
{text}[background: yellow;][color: black;]Yellow background with black text{.text}

{success}[size: small;]Small success message{.success}
{warning}[color: orange;]Orange warning{.warning}
{error}[background: lightred;]Error with light red background{.error}

{info}Available colors: red, blue, green, yellow, purple, orange{.info}
{tip}Available sizes: tiny, small, normal, large, huge, giant{.tip}`;
    
    input.value = rssExample;
    parseRMLContent();
    showInfo('🎨 Loaded RSS styling example');
}

// Debounced parsing for real-time mode
let parseTimeout;
function debounceParseRML() {
    clearTimeout(parseTimeout);
    parseTimeout = setTimeout(parseRMLContent, 500);
}

function updateStats(rmlContent, htmlResult) {
    const statsDiv = document.getElementById('stats');
    if (!statsDiv) return;
    
    const rmlLines = rmlContent.split('\n').length;
    const rmlChars = rmlContent.length;
    const htmlChars = htmlResult.length;
    const tags = (rmlContent.match(/\{[^}]+\}/g) || []).length;
    
    statsDiv.innerHTML = `
        <strong>📊 Statistics:</strong><br>
        Lines: ${rmlLines} | Characters: ${rmlChars} | HTML output: ${htmlChars} chars | RML tags: ${tags}
    `;
}

function showSuccess(message) {
    showMessage(message, 'success');
}

function showError(message) {
    showMessage(message, 'error');
}

function showWarning(message) {
    showMessage(message, 'warning');
}

function showInfo(message) {
    showMessage(message, 'info');
}

function showMessage(message, type) {
    const messagesDiv = document.getElementById('messages');
    if (!messagesDiv) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;
    
    // Style the message
    messageDiv.style.cssText = `
        padding: 10px;
        margin: 5px 0;
        border-radius: 4px;
        animation: fadeIn 0.3s ease-out;
    `;
    
    // Set background color based on type
    const colors = {
        success: '#d4edda',
        error: '#f8d7da',
        warning: '#fff3cd',
        info: '#d1ecf1'
    };
    
    messageDiv.style.backgroundColor = colors[type] || colors.info;
    
    messagesDiv.appendChild(messageDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => messageDiv.remove(), 300);
        }
    }, 5000);
}

function clearMessages() {
    const messagesDiv = document.getElementById('messages');
    if (messagesDiv) {
        messagesDiv.innerHTML = '';
    }
}

// Export functions for global access if needed
window.RMLTest = {
    parseRMLContent,
    clearOutput,
    loadExample,
    tryRSSStyling,
    toggleRealtimeParsing
}; 