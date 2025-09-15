# XY-PX: Stop Describing Pixels to Your AI

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![npm version](https://img.shields.io/npm/v/xy-px.svg)](https://www.npmjs.com/package/xy-px)
[![React](https://img.shields.io/badge/React-17%2B-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-blue)](https://www.typescriptlang.org/)

```bash
npm i xy-px && echo "Done. Your app has coordinates now."
```

**Finally, pixel-perfect UI with AI that actually understands where you're pointing.** XY-PX auto-injects into your React app in seconds. Just install, and boom - you're speaking coordinates to ChatGPT, Claude, Cursor, and Copilot like a pro.

🚀 **[Live Demo](https://altivuminc-admin.github.io/xy-px/)** | 📦 **[NPM Package](https://www.npmjs.com/package/xy-px)** | 💻 **[GitHub](https://github.com/AltivumInc-Admin/xy-px)**

<p align="center">
  <img src="https://img.shields.io/badge/Setup_Time-30_seconds-green?style=for-the-badge" alt="Setup Time" />
  <img src="https://img.shields.io/badge/Config_Required-Zero-blue?style=for-the-badge" alt="Zero Config" />
  <img src="https://img.shields.io/badge/Works_With-All_AI_Tools-purple?style=for-the-badge" alt="AI Compatible" />
</p>

## 🎯 Why XY-PX?

**Because "move it a bit to the left" isn't a coordinate.**

You're pair programming with AI, but explaining positioning is painful:
- ❌ "Put the button kinda... near the top right?"
- ❌ "Move it down like 20%... no wait, less"
- ❌ "Center it but slightly offset to the left"

**With XY-PX:**
- ✅ Alt+Click → "Put the button at [847, 234]" → Done.
- ✅ "Modal at [450, 320]" → Your AI writes perfect positioning
- ✅ "Align these at Y: 400" → Instant pixel-perfect layout

**30 seconds to install. 0 config. 100% more precise.**

## ⚡ The Vibe

- **Auto-injects on install** - No setup. It just works™
- **Invisible until you need it** - Hold Alt/⌥ Option to activate
- **Alt+Click = Copy** - Coordinates straight to clipboard
- **Cross-platform** - Mac, Windows, Linux, iOS, Android
- **Tiny footprint** - Won't slow your app down
- **Dark mode** - Obviously
- **Persistent settings** - Remembers your preferences
- **Clean uninstall** - One command removes everything

## 🚀 Get Started in 10 Seconds

```bash
npm install xy-px
```

**That's it. Seriously.** XY-PX auto-injects itself. Your app now has coordinates.

Press `Ctrl+Shift+C` (or `Cmd+Shift+C` on Mac) to toggle visibility.

## 💡 How It Works

1. **Install** → Auto-adds `import 'xy-px'` to your main file
2. **Run your app** → Coordinates appear in top-right
3. **Hold Alt** → See live coordinates follow your cursor
4. **Alt+Click** → Copy coordinates to clipboard
5. **Paste in AI** → "Put button at [523, 145]"
6. **Ship it** → Your AI writes pixel-perfect code

### Manual Setup (if needed)

```jsx
// Already done automatically, but if you need manual control:
import 'xy-px';  // That's it
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

### Real Developer Workflows

**Before XY-PX:**
```
You: "Move the button to the right side"
AI: "How far right?"
You: "Like... 80% across?"
AI: *Writes CSS*
You: "No, less. Maybe 70%?"
[10 minutes later...]
```

**With XY-PX:**
```
You: "Button at [812, 450]"
AI: *Writes perfect CSS*
You: *Ships*
[30 seconds total]
```

**Power Moves:**
- "Center modal at [960, 540]"
- "Align nav items at Y: 64 with X: [120, 240, 360, 480]"
- "Tooltip appears at [${copiedX + 10}, ${copiedY - 30}]"
- "Draw connection from [200, 300] to [800, 300]"

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

## 🎮 Pro Tips

**For Cursor/Windsurf users:**
- Keep XY-PX visible while coding
- Copy multiple coordinates, paste as array
- Use with Composer for instant layouts

**For Claude/ChatGPT users:**
- Screenshot + coordinates = perfect implementation
- "Make it responsive but anchor at [400, 300]"
- Works great with Claude Projects & GPT Canvas

**Uninstalling?**
```bash
npx xy-px uninstall  # Removes everything cleanly
```

---

**Built for developers who ship fast** ⚡ by [Altivum Inc](https://altivum.io)