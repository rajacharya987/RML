/**
 * RML Chrome Extension Popup Script
 */

document.addEventListener('DOMContentLoaded', function() {
    const statusDiv = document.getElementById('status');
    const toggleBtn = document.getElementById('toggleRML');
    const testBtn = document.getElementById('testRML');
    const tutorialBtn = document.getElementById('openTutorial');
    const portfolioBtn = document.getElementById('openPortfolio');
    const welcomeBtn = document.getElementById('openWelcome');
    
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
    
    // Open Test Page button
    if (testBtn) {
        testBtn.addEventListener('click', function() {
            const testPageUrl = chrome.runtime.getURL('test-rml.html');
            chrome.tabs.create({url: testPageUrl}, function() {
                window.close();
            });
        });
    }
    
    // Open Tutorial button
    if (tutorialBtn) {
        tutorialBtn.addEventListener('click', function() {
            const tutorialUrl = chrome.runtime.getURL('tutorial.html');
            chrome.tabs.create({url: tutorialUrl}, function() {
                window.close();
            });
        });
    }
    
    // Open Portfolio Example button
    if (portfolioBtn) {
        portfolioBtn.addEventListener('click', function() {
            // Load portfolio.rml content into test page
            const testPageUrl = chrome.runtime.getURL('test-rml.html');
            chrome.tabs.create({url: testPageUrl}, function(tab) {
                // Wait for page to load, then load portfolio content
                setTimeout(() => {
                    chrome.tabs.sendMessage(tab.id, {
                        action: 'loadPortfolio'
                    });
                }, 1000);
                window.close();
            });
        });
    }
    
    // Open welcome/tutorial page
    if (welcomeBtn) {
        welcomeBtn.addEventListener('click', function() {
            const welcomeUrl = chrome.runtime.getURL('welcome.html');
            chrome.tabs.create({url: welcomeUrl}, function() {
                window.close();
            });
        });
    }
    
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