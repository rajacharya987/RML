/**
 * RML Chrome Extension Popup Script
 */

document.addEventListener('DOMContentLoaded', function() {
    const statusText = document.getElementById('statusText');
    const parseBtn = document.getElementById('parseBtn');
    const toggleBtn = document.getElementById('toggleBtn');
    const helpBtn = document.getElementById('helpBtn');

    // Check current tab status
    function checkCurrentPageStatus() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            const currentTab = tabs[0];
            
            if (currentTab.url.endsWith('.rml')) {
                statusText.textContent = '✅ RML file detected!';
                statusText.style.color = '#4CAF50';
            } else if (currentTab.url.startsWith('file://')) {
                statusText.textContent = '📄 Local file - check if it\'s RML';
                statusText.style.color = '#FF9800';
            } else {
                statusText.textContent = '🌐 Regular webpage';
                statusText.style.color = '#FFF';
            }
        });
    }

    // Parse current page
    parseBtn.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: 'parseRML'}, function(response) {
                if (chrome.runtime.lastError) {
                    statusText.textContent = '❌ Could not communicate with page';
                    statusText.style.color = '#f44336';
                } else {
                    statusText.textContent = '✅ RML parsing triggered!';
                    statusText.style.color = '#4CAF50';
                    setTimeout(checkCurrentPageStatus, 2000);
                }
            });
        });
    });

    // Toggle RML rendering
    toggleBtn.addEventListener('click', function() {
        chrome.storage.local.get(['rmlEnabled'], function(result) {
            const newState = !result.rmlEnabled;
            chrome.storage.local.set({rmlEnabled: newState}, function() {
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        action: 'toggleRML',
                        enabled: newState
                    });
                });
                
                toggleBtn.textContent = newState ? 'Disable RML' : 'Enable RML';
                statusText.textContent = newState ? '✅ RML enabled' : '❌ RML disabled';
                statusText.style.color = newState ? '#4CAF50' : '#f44336';
            });
        });
    });

    // Open help documentation
    helpBtn.addEventListener('click', function() {
        const helpContent = `
# RML (RazzMarkupLanguage) Syntax Guide

## Basic Tags
- {head1}Large Title{.head1} → <h1>Large Title</h1>
- {head2}Subtitle{.head2} → <h2>Subtitle</h2>
- {para}Paragraph text{.para} → <p>Paragraph text</p>
- {bold}Bold text{.bold} → <strong>Bold text</strong>
- {italic}Italic text{.italic} → <em>Italic text</em>

## Links and Images
- {link href="https://example.com"}Click here{.link}
- {image src="image.jpg" alt="Description"}{.image}

## Lists
- {list}
    {listitem}Item 1{.listitem}
    {listitem}Item 2{.listitem}
  {.list}

## Advanced
- {quote}This is a quote{.quote}
- {code}console.log('hello'){.code}
- {div class="container"}Content{.div}

## File Extension
Save your files with .rml extension for automatic detection!
        `;
        
        chrome.tabs.create({
            url: 'data:text/plain;charset=utf-8,' + encodeURIComponent(helpContent)
        });
    });

    // Initialize toggle button state
    chrome.storage.local.get(['rmlEnabled'], function(result) {
        const enabled = result.rmlEnabled !== false; // Default to true
        toggleBtn.textContent = enabled ? 'Disable RML' : 'Enable RML';
    });

    // Check status on popup open
    checkCurrentPageStatus();
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'updateStatus') {
        const statusText = document.getElementById('statusText');
        statusText.textContent = request.message;
        statusText.style.color = request.color || '#FFF';
    }
}); 