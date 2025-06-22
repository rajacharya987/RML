/**
 * RML Test Page JavaScript
 * Separated from HTML to comply with Chrome Extension CSP
 */

// Portfolio content for loading
const portfolioContent = `{container}
  {header}[background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);][color: white;][padding: 40px;][align: center;]
    {title}[size: giant;][weight: bold;]John Smith{.title}
    {subtitle}[size: large;][margin: 10px 0;]Full Stack Developer & UI/UX Designer{.subtitle}
    {text}[size: medium;][opacity: 0.9;]Passionate about creating beautiful and functional web experiences{.text}
  {.header}

  {nav}[background: white;][padding: 20px;][align: center;][shadow: 0 2px 10px rgba(0,0,0,0.1);]
    {link href="#about"}[color: #667eea;][padding: 15px;][weight: bold;]About{.link}
    {link href="#skills"}[color: #667eea;][padding: 15px;][weight: bold;]Skills{.link}
    {link href="#projects"}[color: #667eea;][padding: 15px;][weight: bold;]Projects{.link}
    {link href="#contact"}[color: #667eea;][padding: 15px;][weight: bold;]Contact{.link}
  {.nav}

  {main}[padding: 40px 20px;][background: #f8f9fa;]
    
    {section id="about"}[margin: 40px 0;]
      {card}[background: white;][padding: 30px;][radius: 15px;][shadow: 0 5px 20px rgba(0,0,0,0.1);]
        {title}[color: #667eea;][size: huge;][margin: 0 0 20px 0;]About Me{.title}
        {text}[size: medium;][lineheight: 1.6;]
          I'm a passionate Full Stack Developer with over 5 years of experience creating innovative web solutions. 
          I specialize in modern JavaScript frameworks, responsive design, and user experience optimization.
        {.text}
      {.card}
    {.section}

    {section id="skills"}[margin: 40px 0;]
      {card}[background: white;][padding: 30px;][radius: 15px;][shadow: 0 5px 20px rgba(0,0,0,0.1);]
        {title}[color: #667eea;][size: huge;][margin: 0 0 30px 0;]Technical Skills{.title}
        
        {card}[background: #e3f2fd;][padding: 20px;][radius: 10px;][margin: 10px;]
          {subtitle}[color: #1976d2;][weight: bold;]Frontend Development{.subtitle}
          {list}
            {item}[margin: 5px 0;]React.js & Next.js{.item}
            {item}[margin: 5px 0;]Vue.js & Angular{.item}
            {item}[margin: 5px 0;]HTML5 & CSS3{.item}
            {item}[margin: 5px 0;]JavaScript ES6+{.item}
            {item}[margin: 5px 0;]TypeScript{.item}
          {.list}
        {.card}
        
        {card}[background: #f3e5f5;][padding: 20px;][radius: 10px;][margin: 10px;]
          {subtitle}[color: #7b1fa2;][weight: bold;]Backend Development{.subtitle}
          {list}
            {item}[margin: 5px 0;]Node.js & Express{.item}
            {item}[margin: 5px 0;]Python & Django{.item}
            {item}[margin: 5px 0;]RESTful APIs{.item}
            {item}[margin: 5px 0;]GraphQL{.item}
            {item}[margin: 5px 0;]Microservices{.item}
          {.list}
        {.card}
      {.card}
    {.section}

    {section id="projects"}[margin: 40px 0;]
      {card}[background: white;][padding: 30px;][radius: 15px;][shadow: 0 5px 20px rgba(0,0,0,0.1);]
        {title}[color: #667eea;][size: huge;][margin: 0 0 30px 0;]Featured Projects{.title}
        
        {card}[background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);][color: white;][padding: 25px;][radius: 12px;][margin: 15px;]
          {subtitle}[size: large;][weight: bold;][margin: 0 0 10px 0;]E-Commerce Platform{.subtitle}
          {text}[margin: 10px 0;][opacity: 0.9;]
            Full-stack e-commerce solution built with React, Node.js, and MongoDB. 
            Features include real-time inventory management and payment integration.
          {.text}
          {text}[size: small;][margin: 15px 0 0 0;]
            Technologies: React, Node.js, MongoDB, Stripe API
          {.text}
        {.card}
        
        {card}[background: linear-gradient(135deg, #2196f3 0%, #21cbf3 100%);][color: white;][padding: 25px;][radius: 12px;][margin: 15px;]
          {subtitle}[size: large;][weight: bold;][margin: 0 0 10px 0;]Task Management App{.subtitle}
          {text}[margin: 10px 0;][opacity: 0.9;]
            Collaborative project management tool with real-time updates and team chat. 
            Built for remote teams and agile workflows.
          {.text}
          {text}[size: small;][margin: 15px 0 0 0;]
            Technologies: Vue.js, Express.js, PostgreSQL, Socket.io
          {.text}
        {.card}
      {.card}
    {.section}

    {section id="contact"}[margin: 40px 0;]
      {card}[background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);][color: white;][padding: 40px;][radius: 15px;][align: center;]
        {title}[size: huge;][margin: 0 0 20px 0;]Let's Work Together!{.title}
        {text}[size: large;][margin: 20px 0;][opacity: 0.9;]
          I'm always interested in new opportunities and exciting projects. 
          Let's discuss how we can bring your ideas to life!
        {.text}
        
        {container}[margin: 30px 0;][align: center;]
          {text}[background: white;][color: #667eea;][padding: 15px 30px;][radius: 25px;][weight: bold;][margin: 10px;]
            📧 john.smith@email.com
          {.text}
          {text}[background: rgba(255,255,255,0.2);][color: white;][padding: 15px 30px;][radius: 25px;][weight: bold;][margin: 10px;]
            📱 +1 (555) 123-4567
          {.text}
        {.container}
      {.card}
    {.section}

  {.main}

  {footer}[background: #2c3e50;][color: white;][padding: 30px;][align: center;]
    {text}[margin: 10px 0;]© 2024 John Smith. All rights reserved.{.text}
    {text}[size: small;][opacity: 0.7;]Built with ❤️ using RML (RazzMarkupLanguage) and RSS Styling{.text}
  {.footer}

{.container}`;

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
    
    // Listen for portfolio loading request
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.action === 'loadPortfolio') {
            loadPortfolioExample();
            sendResponse({success: true});
        }
    });
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

function loadPortfolioExample() {
    const input = document.getElementById('rmlInput');
    if (input) {
        input.value = portfolioContent;
        parseRMLContent();
        showSuccess('📄 Portfolio example loaded! This demonstrates a complete website built with RML and RSS styling.');
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