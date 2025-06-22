# RML Chrome Extension Installation Guide 🚀

Follow these simple steps to install and use the RML (RazzMarkupLanguage) Chrome extension.

## Prerequisites

- Google Chrome browser (version 88 or higher)
- Basic understanding of file systems (for creating .rml files)

## Installation Steps

### Method 1: Developer Mode Installation (Recommended)

1. **Download the Project**
   - Download or clone this repository to your computer
   - Extract the files if you downloaded a ZIP

2. **Open Chrome Extensions Page**
   - Open Google Chrome
   - Navigate to `chrome://extensions/`
   - Or click the three dots menu → More tools → Extensions

3. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top-right corner
   - This will show additional options

4. **Load the Extension**
   - Click "Load unpacked" button
   - Navigate to the `chrome-extension` folder in your downloaded project
   - Select the folder and click "Open"

5. **Verify Installation**
   - You should see "RML (RazzMarkupLanguage) Renderer" in your extensions list
   - The RML icon should appear in your Chrome toolbar
   - The extension should show as "Enabled"

### Method 2: Packed Extension (If Available)

1. Download the `.crx` file (if provided)
2. Drag and drop it onto the `chrome://extensions/` page
3. Click "Add extension" when prompted

## Testing the Installation

### Test 1: Extension Popup
1. Click the RML icon in your Chrome toolbar
2. You should see a popup with:
   - Extension status
   - Parse buttons
   - Quick syntax reference

### Test 2: Test Page
1. Open the `test-rml.html` file in Chrome
2. You should see a test interface with:
   - RML input area
   - Convert button
   - HTML output display
   - Rendered result

### Test 3: RML File Rendering
1. Create a new file called `test.rml`
2. Add this content:
   ```rml
   {head1}Hello RML!{.head1}
   {para}This is my first RML document.{.para}
   {list}
       {listitem}Feature 1{.listitem}
       {listitem}Feature 2{.listitem}
   {.list}
   ```
3. Save the file and open it in Chrome
4. The content should be automatically rendered with beautiful styling

## Troubleshooting

### Extension Not Working
- **Check Developer Mode**: Ensure developer mode is enabled
- **Reload Extension**: Go to `chrome://extensions/` and click the reload icon
- **Check Console**: Press F12 to open developer tools and check for errors

### RML Files Not Rendering
- **File Extension**: Make sure your file has the `.rml` extension
- **File Access**: Chrome may need permission to access local files
- **Content Detection**: The extension looks for RML syntax patterns

### Permission Issues
- **File URLs**: Go to `chrome://extensions/` → RML Extension → Details → "Allow access to file URLs"
- **Site Access**: Ensure the extension has permission for the sites you want to use it on

## File Access Setup

For the extension to work with local `.rml` files:

1. Go to `chrome://extensions/`
2. Find "RML (RazzMarkupLanguage) Renderer"
3. Click "Details"
4. Enable "Allow access to file URLs"

## Using the Extension

### Basic Usage
1. Create a `.rml` file with RML syntax
2. Open it in Chrome
3. The extension automatically detects and renders the content

### Manual Parsing
1. On any webpage, click the RML extension icon
2. Click "Parse Current Page" to convert any RML content found
3. Use right-click context menu for "Parse as RML" option

### Syntax Help
- Click the extension icon for quick syntax reference
- Click "View Documentation" for complete syntax guide
- Use the test page for experimenting with RML syntax

## Example RML Files

Try these sample files from the `examples/` folder:
- `sample.rml` - Basic syntax demonstration
- `blog-post.rml` - Real-world example

## Uninstallation

To remove the extension:
1. Go to `chrome://extensions/`
2. Find "RML (RazzMarkupLanguage) Renderer"
3. Click "Remove"
4. Confirm the removal

## Support and Issues

If you encounter any problems:
1. Check the troubleshooting section above
2. Verify your Chrome version is 88 or higher
3. Try disabling and re-enabling the extension
4. Check browser console for error messages

## Advanced Configuration

### Custom Styling
The extension applies default styling, but you can override it:
1. Add custom CSS to your RML documents using `{div style="..."}` tags
2. Modify the content script for global style changes

### Development Mode
For developers who want to modify the extension:
1. Make changes to files in the `chrome-extension/` folder
2. Go to `chrome://extensions/`
3. Click the reload icon for the RML extension
4. Test your changes

---

**Congratulations!** 🎉 You've successfully installed the RML Chrome extension. Start creating beautiful documents with RML syntax today! 