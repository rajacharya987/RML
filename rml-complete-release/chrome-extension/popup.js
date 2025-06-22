/**
 * RML Chrome Extension Popup Script
 */

document.addEventListener('DOMContentLoaded', function() {
    const statusDiv = document.getElementById('status');
    const toggleBtn = document.getElementById('toggleRML');
    const testBtn = document.getElementById('testRML');
    const welcomeBtn = document.getElementById('openWelcome');
    const testPageBtn = document.getElementById('openTest');
    
    // Check RML status
    chrome.runtime.sendMessage({action: 'getRMLStatus'}, function(response) {
        if (response && response.enabled !== false) {
            statusDiv.textContent = '✅ RML is active';
            toggleBtn.textContent = '🛑 Disable RML';
        } else {
            statusDiv.textContent = '❌ RML is disabled';
            toggleBtn.textContent = '🚀 Enable RML';
        }
    });
    
    // Toggle RML functionality
    toggleBtn.addEventListener('click', function() {
        chrome.runtime.sendMessage({action: 'getRMLStatus'}, function(response) {
            const currentStatus = response && response.enabled !== false;
            const newStatus = !currentStatus;
            
            chrome.runtime.sendMessage({
                action: 'toggleRML',
                enabled: newStatus
            }, function(response) {
                if (response && response.success) {
                    if (newStatus) {
                        statusDiv.textContent = '✅ RML is active';
                        toggleBtn.textContent = '🛑 Disable RML';
                    } else {
                        statusDiv.textContent = '❌ RML is disabled';
                        toggleBtn.textContent = '🚀 Enable RML';
                    }
                }
            });
        });
    });
    
    // Test RML on current page
    testBtn.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: 'parseRML',
                testContent: `{title}RML Test from Extension{.title}
{success}If you see this styled, RML is working perfectly!{.success}
{lesson}
  {question}Can you see educational tags?{.question}
  {answer}Yes! All RML features are functional.{.answer}
{.lesson}
{info}Extension popup test completed successfully!{.info}`
            });
        });
        
        // Close popup after test
        window.close();
    });
    
    // Open welcome/tutorial page
    welcomeBtn.addEventListener('click', function() {
        chrome.runtime.sendMessage({action: 'openWelcome'}, function(response) {
            window.close();
        });
    });
    
    // Open test page
    testPageBtn.addEventListener('click', function() {
        const testPageUrl = chrome.runtime.getURL('test-rml.html');
        chrome.tabs.create({url: testPageUrl}, function() {
            window.close();
        });
    });
    
    // Handle errors gracefully
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.error) {
            statusDiv.textContent = '⚠️ ' + request.error;
        }
    });
});

// Add some visual feedback
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON') {
        e.target.style.transform = 'scale(0.95)';
        setTimeout(() => {
            e.target.style.transform = '';
        }, 150);
    }
}); 