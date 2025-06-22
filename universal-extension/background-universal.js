/**
 * Universal RML Extension Background Script
 * Compatible with Chrome, Firefox, Opera, Edge, and other browsers
 */

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

// Cross-browser API wrapper
const BrowserAPI = {
    // Runtime API
    getManifest: () => browser.runtime.getManifest(),
    getURL: (path) => browser.runtime.getURL(path),
    
    // Storage API
    storage: {
        local: {
            get: (keys) => new Promise(resolve => {
                browser.storage.local.get(keys, resolve);
            }),
            set: (items) => new Promise(resolve => {
                browser.storage.local.set(items, resolve);
            })
        }
    },
    
    // Tabs API
    tabs: {
        query: (queryInfo) => new Promise(resolve => {
            browser.tabs.query(queryInfo, resolve);
        }),
        create: (createProperties) => new Promise(resolve => {
            browser.tabs.create(createProperties, resolve);
        }),
        sendMessage: (tabId, message) => new Promise((resolve, reject) => {
            try {
                browser.tabs.sendMessage(tabId, message, (response) => {
                    if (browser.runtime.lastError) {
                        reject(browser.runtime.lastError);
                    } else {
                        resolve(response);
                    }
                });
            } catch (error) {
                reject(error);
            }
        })
    },
    
    // Context Menus API
    contextMenus: {
        create: (createProperties) => {
            if (browser.contextMenus) {
                browser.contextMenus.create(createProperties);
            }
        },
        onClicked: {
            addListener: (callback) => {
                if (browser.contextMenus) {
                    browser.contextMenus.onClicked.addListener(callback);
                }
            }
        }
    },
    
    // Browser Action API (different between browsers)
    browserAction: (() => {
        // Chrome uses chrome.action in MV3, chrome.browserAction in MV2
        // Firefox uses browser.browserAction
        if (browser.action) {
            return browser.action; // Chrome MV3
        } else if (browser.browserAction) {
            return browser.browserAction; // Chrome MV2, Firefox
        }
        return null;
    })(),
    
    // Web Navigation API
    webNavigation: {
        onBeforeNavigate: {
            addListener: (callback) => {
                if (browser.webNavigation) {
                    browser.webNavigation.onBeforeNavigate.addListener(callback);
                }
            }
        }
    }
};

// Extension installation/update handler
browser.runtime.onInstalled.addListener(async (details) => {
    console.log('RML Extension installed/updated!', details);
    
    if (details.reason === 'install') {
        console.log('RML Extension installed for the first time!');
        
        // Set default settings
        await BrowserAPI.storage.local.set({
            rmlEnabled: true,
            autoDetect: true,
            theme: 'default',
            browser: getBrowserName()
        });
        
        // Open welcome page
        const welcomeUrl = BrowserAPI.getURL('welcome.html');
        await BrowserAPI.tabs.create({ url: welcomeUrl });
        
    } else if (details.reason === 'update') {
        const manifest = BrowserAPI.getManifest();
        console.log('RML Extension updated to version', manifest.version);
    }
    
    // Setup context menus
    setupContextMenus();
});

// Detect browser name
function getBrowserName() {
    const userAgent = navigator.userAgent;
    
    if (userAgent.includes('Firefox')) return 'firefox';
    if (userAgent.includes('Edg')) return 'edge';
    if (userAgent.includes('OPR') || userAgent.includes('Opera')) return 'opera';
    if (userAgent.includes('Chrome')) return 'chrome';
    if (userAgent.includes('Safari')) return 'safari';
    
    return 'unknown';
}

// Setup context menus
function setupContextMenus() {
    try {
        BrowserAPI.contextMenus.create({
            id: 'parseAsRML',
            title: 'Parse as RML',
            contexts: ['page', 'selection']
        });
        
        BrowserAPI.contextMenus.create({
            id: 'viewRMLSource',
            title: 'View RML Source',
            contexts: ['page']
        });
        
        BrowserAPI.contextMenus.create({
            id: 'rmlHelp',
            title: 'RML Help & Tutorial',
            contexts: ['page']
        });
    } catch (error) {
        console.log('Context menus not supported or failed to create:', error);
    }
}

// Handle context menu clicks
BrowserAPI.contextMenus.onClicked.addListener(async (info, tab) => {
    try {
        switch (info.menuItemId) {
            case 'parseAsRML':
                await BrowserAPI.tabs.sendMessage(tab.id, {
                    action: 'parseRML',
                    selection: info.selectionText
                });
                break;
                
            case 'viewRMLSource':
                await BrowserAPI.tabs.sendMessage(tab.id, {
                    action: 'viewSource'
                });
                break;
                
            case 'rmlHelp':
                const helpUrl = BrowserAPI.getURL('welcome.html');
                await BrowserAPI.tabs.create({ url: helpUrl });
                break;
        }
    } catch (error) {
        console.error('Error handling context menu click:', error);
    }
});

// Handle messages from content scripts and popup
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    handleMessage(request, sender).then(sendResponse).catch(console.error);
    return true; // Keep message channel open for async response
});

async function handleMessage(request, sender) {
    try {
        switch (request.action) {
            case 'getRMLStatus':
                const statusData = await BrowserAPI.storage.local.get(['rmlEnabled']);
                return { enabled: statusData.rmlEnabled !== false };
                
            case 'toggleRML':
                await BrowserAPI.storage.local.set({ rmlEnabled: request.enabled });
                
                // Notify all tabs about the change
                const tabs = await BrowserAPI.tabs.query({});
                for (const tab of tabs) {
                    try {
                        await BrowserAPI.tabs.sendMessage(tab.id, {
                            action: 'settingsChanged',
                            enabled: request.enabled
                        });
                    } catch (error) {
                        // Ignore errors for tabs that don't have content script
                    }
                }
                return { success: true };
                
            case 'openWelcome':
                const welcomeUrl = BrowserAPI.getURL('welcome.html');
                await BrowserAPI.tabs.create({ url: welcomeUrl });
                return { success: true };
                
            case 'getBrowserInfo':
                const manifest = BrowserAPI.getManifest();
                return {
                    browser: getBrowserName(),
                    version: manifest.version,
                    manifestVersion: manifest.manifest_version
                };
                
            default:
                return { error: 'Unknown action' };
        }
    } catch (error) {
        console.error('Error handling message:', error);
        return { error: error.message };
    }
}

// Handle file:// URL access notifications
BrowserAPI.webNavigation.onBeforeNavigate.addListener((details) => {
    if (details.frameId === 0 && details.url.startsWith('file://') && details.url.endsWith('.rml')) {
        // RML file detected
        if (BrowserAPI.browserAction) {
            if (BrowserAPI.browserAction.setBadgeText) {
                BrowserAPI.browserAction.setBadgeText({
                    text: 'RML',
                    tabId: details.tabId
                });
            }
            
            if (BrowserAPI.browserAction.setBadgeBackgroundColor) {
                BrowserAPI.browserAction.setBadgeBackgroundColor({
                    color: '#667eea',
                    tabId: details.tabId
                });
            }
        }
    }
});

// Clear badge when navigating away
BrowserAPI.webNavigation.onBeforeNavigate.addListener((details) => {
    if (details.frameId === 0 && !details.url.endsWith('.rml')) {
        if (BrowserAPI.browserAction && BrowserAPI.browserAction.setBadgeText) {
            BrowserAPI.browserAction.setBadgeText({
                text: '',
                tabId: details.tabId
            });
        }
    }
});

// Startup message
console.log('🚀 RML Universal Extension loaded!', {
    browser: getBrowserName(),
    manifest: BrowserAPI.getManifest().manifest_version
}); 