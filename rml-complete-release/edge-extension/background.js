/**
 * RML Chrome Extension Background Script
 */

// Extension installation/update handler
chrome.runtime.onInstalled.addListener(function(details) {
    if (details.reason === 'install') {
        console.log('RML Extension installed!');
        
        // Set default settings
        chrome.storage.local.set({
            rmlEnabled: true,
            autoDetect: true,
            theme: 'default'
        });
        
        // Open welcome page
        chrome.tabs.create({
            url: chrome.runtime.getURL('welcome.html')
        });
    } else if (details.reason === 'update') {
        console.log('RML Extension updated to version', chrome.runtime.getManifest().version);
    }
});

// Handle messages from content scripts and popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'getRMLStatus') {
        chrome.storage.local.get(['rmlEnabled'], function(result) {
            sendResponse({enabled: result.rmlEnabled !== false});
        });
        return true; // Keep message channel open for async response
    }
    
    if (request.action === 'toggleRML') {
        chrome.storage.local.set({rmlEnabled: request.enabled}, function() {
            // Notify all tabs about the change
            chrome.tabs.query({}, function(tabs) {
                tabs.forEach(tab => {
                    chrome.tabs.sendMessage(tab.id, {
                        action: 'settingsChanged',
                        enabled: request.enabled
                    }).catch(() => {
                        // Ignore errors for tabs that don't have content script
                    });
                });
            });
            sendResponse({success: true});
        });
        return true;
    }
    
    if (request.action === 'openOptionsPage') {
        chrome.runtime.openOptionsPage();
        sendResponse({success: true});
    }
});

// Handle context menu (right-click) actions
chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        id: 'parseAsRML',
        title: 'Parse as RML',
        contexts: ['page', 'selection']
    });
    
    chrome.contextMenus.create({
        id: 'viewRMLSource',
        title: 'View RML Source',
        contexts: ['page']
    });
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === 'parseAsRML') {
        chrome.tabs.sendMessage(tab.id, {
            action: 'parseRML',
            selection: info.selectionText
        });
    } else if (info.menuItemId === 'viewRMLSource') {
        chrome.tabs.sendMessage(tab.id, {
            action: 'viewSource'
        });
    }
});

// Handle file:// URL access notifications
chrome.webNavigation.onBeforeNavigate.addListener(function(details) {
    if (details.frameId === 0 && details.url.startsWith('file://') && details.url.endsWith('.rml')) {
        // RML file detected
        chrome.action.setBadgeText({
            text: 'RML',
            tabId: details.tabId
        });
        chrome.action.setBadgeBackgroundColor({
            color: '#667eea',
            tabId: details.tabId
        });
    }
});

// Clear badge when navigating away
chrome.webNavigation.onBeforeNavigate.addListener(function(details) {
    if (details.frameId === 0 && !details.url.endsWith('.rml')) {
        chrome.action.setBadgeText({
            text: '',
            tabId: details.tabId
        });
    }
}); 