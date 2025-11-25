# ROPL - Run On Page Load

A Microsoft Edge/Chrome extension that allows you to inject and run custom JavaScript code on specific websites when they load.

## Features

- Built-in code editor with syntax highlighting
- Auto-run scripts on page reload
- Configurable delay before script execution
- Per-domain script storage
- Keyboard shortcut (Ctrl+S) to save
- Domain-specific script management

## Installation

1. Clone or download this repository
2. Open Microsoft Edge/Chrome and navigate to `edge://extensions/` or `chrome://extensions/`
3. Enable "Developer mode" (toggle in top-right corner)
4. Click "Load unpacked"
5. Select the `ropl` folder

## Usage

1. Click the ROPL extension icon in your browser toolbar
2. Type or paste your JavaScript code in the editor
3. Check "Run Code" to enable auto-execution on page load
4. (Optional) Set a delay in milliseconds before the code runs
5. Click "Save" or press `Ctrl+S` to save your script

Scripts are saved per domain, so each website can have its own custom code.

## Permissions

- `tabs` - Read active tab URL
- `webNavigation` - Detect page load events

## Development

The extension uses:
- Manifest V3
- Chrome Storage API (localStorage)
- Chrome Tabs API
- Chrome Web Navigation API
