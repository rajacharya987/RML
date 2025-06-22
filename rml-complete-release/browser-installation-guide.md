# 🌐 RML Cross-Browser Installation Guide

Install RML (RazzMarkupLanguage) support on **all major browsers**! Choose your browser below for specific instructions.

---

## 🚀 Quick Browser Links

| Browser | Status | Installation |
|---------|--------|-------------|
| 🔵 **Chrome** | ✅ Full Support | [Install Chrome Extension](#chrome-installation) |
| 🦊 **Firefox** | ✅ Full Support | [Install Firefox Add-on](#firefox-installation) |
| 🔴 **Opera** | ✅ Full Support | [Install Opera Extension](#opera-installation) |
| 🔷 **Edge** | ✅ Full Support | [Install Edge Extension](#edge-installation) |
| 🧭 **Safari** | ⚠️ Manual Setup | [Safari Manual Setup](#safari-manual-setup) |
| 🌐 **Other Browsers** | 🔧 Custom Setup | [Universal Setup](#universal-setup) |

---

## 🔵 Chrome Installation

### Method 1: Developer Mode (Recommended)
1. **Download Files**:
   - Download the RML project folder
   - Navigate to the `chrome-extension` folder

2. **Open Chrome Extensions**:
   - Go to `chrome://extensions/`
   - Or: Menu → More Tools → Extensions

3. **Enable Developer Mode**:
   - Toggle "Developer mode" (top-right corner)

4. **Load Extension**:
   - Click "Load unpacked"
   - Select the `chrome-extension` folder
   - Extension should appear with RML icon

5. **Verify Installation**:
   - RML icon should appear in toolbar
   - Create a test file `test.rml` and open it

### Method 2: Chrome Web Store (Coming Soon)
- Extension will be published to Chrome Web Store
- One-click installation available soon

---

## 🦊 Firefox Installation

### Method 1: Developer Installation
1. **Download Files**:
   - Download the RML project
   - Use the `firefox-extension` folder

2. **Open Firefox Add-ons**:
   - Go to `about:addons`
   - Or: Menu → Add-ons and Themes

3. **Install from File**:
   - Click the gear icon ⚙️
   - Select "Install Add-on From File..."
   - Choose the `firefox-extension` folder

4. **Alternative: Temporary Installation**:
   - Go to `about:debugging`
   - Click "This Firefox"
   - Click "Load Temporary Add-on"
   - Select `manifest.json` from `firefox-extension` folder

### Method 2: Firefox Add-ons Store (Coming Soon)
- Extension will be published to Firefox AMO
- One-click installation available soon

### Firefox-Specific Features
- Full file:// URL support
- Enhanced privacy settings
- Firefox Developer Edition compatibility

---

## 🔴 Opera Installation

### Method 1: Chrome Extension Compatibility
1. **Enable Chrome Extensions**:
   - Go to `opera://extensions/`
   - Enable "Developer mode"

2. **Install Chrome Version**:
   - Use the `chrome-extension` folder
   - Click "Load unpacked"
   - Select the extension folder

### Method 2: Opera Addons (Coming Soon)
- Extension will be available on Opera Addons
- Native Opera integration

### Opera-Specific Benefits
- Built-in VPN compatibility
- Sidebar integration
- Workspaces support

---

## 🔷 Edge Installation

### Method 1: Edge Extensions Store
1. **Open Edge Add-ons**:
   - Go to `edge://extensions/`
   - Or: Menu → Extensions

2. **Developer Installation**:
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select `chrome-extension` folder (Edge uses Chrome extension format)

### Method 2: Microsoft Store (Coming Soon)
- Extension will be available on Microsoft Edge Add-ons
- Seamless integration with Edge features

### Edge-Specific Features
- Integration with Microsoft 365
- Enhanced security features
- Collections compatibility

---

## 🧭 Safari Manual Setup

Safari requires a different approach due to its extension system:

### Method 1: Safari App Extension (Advanced)
1. **Requirements**:
   - macOS with Xcode installed
   - Apple Developer account (optional for personal use)

2. **Create Safari Extension**:
   - Use the provided Safari project template
   - Build using Xcode
   - Install locally

### Method 2: UserScript (Recommended)
1. **Install Userscript Manager**:
   - Download Tampermonkey for Safari
   - Or use built-in Safari extensions

2. **Install RML UserScript**:
   - Use the provided `rml-userscript.js`
   - Manual installation through Tampermonkey

### Method 3: Manual File Rendering
1. **Download Files**:
   - Save `rml-parser.js` and `test-rml.html`
   - Create .rml files

2. **Local Testing**:
   - Open `test-rml.html` in Safari
   - Paste RML content for testing

---

## 🌐 Universal Setup (Any Browser)

For browsers not officially supported or custom setups:

### Method 1: Bookmarklet
1. **Create Bookmark**:
   ```javascript
   javascript:(function(){
       const script = document.createElement('script');
       script.src = 'https://yourdomain.com/rml-parser.js';
       document.head.appendChild(script);
       script.onload = function(){
           const parser = new RMLParser();
           document.body.innerHTML = parser.parse(document.body.textContent);
       };
   })();
   ```

2. **Usage**:
   - Save as bookmark
   - Click on any .rml file to render

### Method 2: Manual Integration
1. **Include Parser**:
   ```html
   <script src="rml-parser.js"></script>
   <script>
       const parser = new RMLParser();
       const rmlContent = '{title}Hello RML{.title}';
       document.body.innerHTML = parser.parse(rmlContent);
   </script>
   ```

---

## 🔧 Troubleshooting

### Common Issues

#### Extension Not Loading
- **Chrome/Edge**: Ensure Developer mode is enabled
- **Firefox**: Check temporary add-on installation
- **Opera**: Verify Chrome extension compatibility is enabled

#### RML Files Not Rendering
- **File Access**: Enable "Allow access to file URLs" in extension settings
- **File Extension**: Ensure files have `.rml` extension
- **Content Type**: Check that file is recognized as text

#### Styling Issues
- **Clear Cache**: Refresh the page or clear browser cache
- **Conflicting Styles**: Check for other extensions interfering
- **Browser Compatibility**: Some CSS features may vary between browsers

### Browser-Specific Solutions

#### Firefox Issues
```bash
# Enable file:// access
about:config → security.fileuri.strict_origin_policy → false
```

#### Safari Issues
- Allow JavaScript in Safari preferences
- Enable "Allow JavaScript from Apple Events"
- Check Safari security settings

#### Edge Issues
- Ensure Edge is updated to latest version
- Check Windows security settings
- Enable Developer features

---

## 📊 Browser Compatibility Matrix

| Feature | Chrome | Firefox | Opera | Edge | Safari |
|---------|--------|---------|-------|------|--------|
| Basic RML Parsing | ✅ | ✅ | ✅ | ✅ | ⚠️ |
| Educational Tags | ✅ | ✅ | ✅ | ✅ | ⚠️ |
| RSS Styling | ✅ | ✅ | ✅ | ✅ | ⚠️ |
| File:// URLs | ✅ | ✅ | ✅ | ✅ | ❌ |
| Context Menus | ✅ | ✅ | ✅ | ✅ | ❌ |
| Auto-detection | ✅ | ✅ | ✅ | ✅ | ❌ |
| Welcome Page | ✅ | ✅ | ✅ | ✅ | ⚠️ |

**Legend**: ✅ Full Support | ⚠️ Partial Support | ❌ Not Supported

---

## 🎯 Quick Start After Installation

1. **Test Installation**:
   ```rml
   {title}Testing RML{.title}
   {success}If you see this styled, RML is working!{.success}
   ```

2. **Save as `test.rml`** and open in your browser

3. **Create Your First Page**:
   - Use examples from the `examples/` folder
   - Start with `simple-lesson.rml`
   - Try the interactive welcome page

4. **Learn & Practice**:
   - Follow the built-in tutorials
   - Experiment with educational tags
   - Create your student portfolio

---

## 🚀 Coming Soon

### Official Store Releases
- **Chrome Web Store**: Under review
- **Firefox AMO**: Preparing submission
- **Microsoft Store**: Edge version ready
- **Opera Addons**: Coming Q2 2024

### Enhanced Features
- **Mobile browsers** support (Android Chrome, Firefox Mobile)
- **Chromebook** integration for schools
- **Progressive Web App** version for offline use

---

## 💬 Support & Community

### Get Help
- **GitHub Issues**: Report bugs and request features
- **Discord Community**: Join the RML learning community
- **Educational Forums**: Connect with teachers using RML

### Contribute
- **Browser Testing**: Help test on different browsers
- **Translation**: Translate RML for international students
- **Templates**: Create educational templates for teachers

---

**🎉 You're all set! Start creating amazing educational content with RML across any browser!**

*Choose your browser, follow the guide, and join the educational web development revolution.* 