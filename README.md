# XY-PX: Cursor Coordinates Tracker

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![npm version](https://img.shields.io/npm/v/xy-px.svg)](https://www.npmjs.com/package/xy-px)
[![React](https://img.shields.io/badge/React-17%2B-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-blue)](https://www.typescriptlang.org/)

A lightweight, cross-platform React component for tracking and displaying cursor/touch coordinates with real-time updates, platform-specific key bindings, and mobile support.

## ✨ Features

- 🎯 **Real-time Tracking** - Display viewport and page coordinates as you move
- 🖱️ **Multi-platform Support** - Automatic OS detection (Mac, Windows, Linux, iOS, Android)
- ⌨️ **Smart Key Bindings** - Platform-specific modifier keys (⌥ Option for Mac, Alt for Windows)
- 📱 **Touch Support** - Full mobile support with long-press detection
- 🎨 **Customizable Themes** - Light, dark, and auto theme options
- 📋 **Click to Copy** - Instant coordinate copying to clipboard
- 🔄 **Platform Toggle** - Manual OS switching with visual indicators
- 💾 **Persistent Preferences** - Saves user settings in localStorage
- 🎭 **Minimal UI** - Clean, unobtrusive heads-up display

## 📦 Installation

```bash
npm install xy-px
# or
yarn add xy-px
# or
pnpm add xy-px
```

## 🚀 Quick Start

```jsx
import React from 'react';
import { CursorCoordinates } from 'xy-px';
import 'xy-px/dist/index.css';

function App() {
  return (
    <div>
      <CursorCoordinates />
      {/* Your app content */}
    </div>
  );
}
```

## 🔧 Configuration

### Basic Usage with Options

```jsx
<CursorCoordinates
  position="top-right"
  theme="dark"
  opacity={0.4}
  showPlatformToggle={true}
/>
```

### Advanced Configuration

```jsx
<CursorCoordinates
  // Display options
  showByDefault={true}
  position="top-right"
  opacity={0.4}
  
  // Platform settings
  platform="auto" // 'auto' | 'mac' | 'windows' | 'ios' | 'android' | 'linux'
  showPlatformToggle={true}
  
  // Feature toggles
  showViewportCoords={true}
  showPageCoords={true}
  showScrollPosition={true}
  enableAltTracking={true}
  enableCopyOnClick={true}
  enableTouchTracking={true}
  
  // Touch settings
  longPressDelay={500} // milliseconds
  
  // Keyboard shortcuts
  toggleShortcut="Ctrl+Shift+C" // Custom shortcut
  
  // Styling
  theme="auto" // 'dark' | 'light' | 'auto'
  customClassName="my-custom-class"
  
  // Callbacks
  onCopy={(text) => console.log('Copied:', text)}
  onToggle={(visible) => console.log('Visible:', visible)}
  onPlatformChange={(platform) => console.log('Platform:', platform)}
/>
```

## 📖 API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showByDefault` | `boolean` | `true` | Show coordinates display on mount |
| `position` | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left'` | `'top-right'` | Corner position of the HUD |
| `opacity` | `number` | `0.4` | Opacity of the HUD (0-1) |
| `platform` | `'auto' \| 'mac' \| 'windows' \| 'ios' \| 'android' \| 'linux'` | `'auto'` | Platform for key bindings |
| `showPlatformToggle` | `boolean` | `true` | Show platform toggle button |
| `showViewportCoords` | `boolean` | `true` | Display viewport coordinates |
| `showPageCoords` | `boolean` | `true` | Display page coordinates |
| `showScrollPosition` | `boolean` | `true` | Display scroll position |
| `enableAltTracking` | `boolean` | `true` | Enable modifier key tracking |
| `enableCopyOnClick` | `boolean` | `true` | Enable click to copy |
| `enableTouchTracking` | `boolean` | `true` | Enable touch support on mobile |
| `longPressDelay` | `number` | `500` | Long press duration in ms |
| `toggleShortcut` | `string` | Platform-specific | Keyboard shortcut to toggle display |
| `theme` | `'dark' \| 'light' \| 'auto'` | `'auto'` | Color theme |
| `customClassName` | `string` | `''` | Additional CSS class |
| `onCopy` | `(text: string) => void` | - | Callback when coordinates are copied |
| `onToggle` | `(visible: boolean) => void` | - | Callback when display is toggled |
| `onPlatformChange` | `(platform: Platform) => void` | - | Callback when platform changes |

## ⌨️ Keyboard Shortcuts

### Default Shortcuts by Platform

| Platform | Show Coordinates | Toggle Display |
|----------|-----------------|----------------|
| **macOS** | Hold ⌥ Option | ⌘ Cmd + Shift + C |
| **Windows/Linux** | Hold Alt | Ctrl + Shift + C |
| **iOS/Android** | Long press (500ms) | - |

## 🎨 Theming

### Using Built-in Themes

```jsx
// Dark theme
<CursorCoordinates theme="dark" />

// Light theme
<CursorCoordinates theme="light" />

// Auto (follows system preference)
<CursorCoordinates theme="auto" />
```

### Custom Styling

```css
/* Override default styles */
.my-custom-class {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
}

.my-custom-class .coord-value {
  color: #ffd700;
}
```

## 📱 Mobile Support

The component automatically detects mobile devices and adjusts interactions:

- **iOS/Android**: Long press to show coordinates, tap to copy
- **Touch-optimized**: Larger touch targets and adjusted positioning
- **Responsive**: Adapts to different screen sizes

## 🔄 Platform Detection

The component automatically detects the user's platform and adjusts key bindings accordingly. Users can also manually switch platforms using the toggle button:

- 🍎 macOS
- 🪟 Windows  
- 🐧 Linux
- 📱 iOS
- 🤖 Android

## 💡 Examples

### Minimal Setup

```jsx
import { CursorCoordinates } from 'xy-px';
import 'xy-px/dist/index.css';

<CursorCoordinates />
```

### Custom Position and Theme

```jsx
<CursorCoordinates 
  position="bottom-left"
  theme="light"
  opacity={0.6}
/>
```

### Development Tool Configuration

```jsx
<CursorCoordinates
  showByDefault={process.env.NODE_ENV === 'development'}
  position="bottom-right"
  enableCopyOnClick={true}
  onCopy={(coords) => {
    console.log('Debugging coordinates:', coords);
  }}
/>
```

### Mobile-First Configuration

```jsx
<CursorCoordinates
  platform="auto"
  enableTouchTracking={true}
  longPressDelay={300}
  position="top-left"
/>
```

## 🛠️ Development

### Setup

```bash
# Clone the repository
git clone https://github.com/AltivumInc-Admin/xy-px.git
cd xy-px

# Install dependencies
npm install

# Start development server
npm run dev

# Run demo
npm run demo
```

### Scripts

- `npm run build` - Build the library
- `npm run dev` - Watch mode for development
- `npm run demo` - Run demo application
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

### Project Structure

```
xy-px/
├── src/
│   ├── CursorCoordinates.tsx    # Main component
│   ├── CursorCoordinates.css    # Component styles
│   ├── utils/
│   │   └── platform.ts          # Platform detection utilities
│   └── index.ts                 # Package entry
├── demo/                         # Demo application
├── dist/                         # Build output
└── package.json
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/) and [TypeScript](https://www.typescriptlang.org/)
- Bundled with [Rollup](https://rollupjs.org/)
- Styled with modern CSS

## 📮 Support

For issues and feature requests, please [create an issue](https://github.com/AltivumInc-Admin/xy-px/issues).

---

Made with ❤️ by [Altivum Inc](https://altivum.io)