# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**XY-PX** is a React component library for tracking and displaying cursor/touch coordinates with real-time updates. The tool's primary use case is enabling precise coordinate communication with LLMs (ChatGPT, Claude, Copilot) during AI-assisted development.

### Key Features
- Real-time cursor coordinate display (viewport & page coordinates)
- Cross-platform support with OS-specific key bindings
- Touch support for mobile devices (iOS/Android)
- Copy coordinates to clipboard with Alt+Click
- Platform detection and manual override
- Persistent user preferences via localStorage
- Beautiful HUD display with light/dark themes

### Live Demo & Links
- **Live Demo**: https://altivuminc-admin.github.io/xy-px/
- **NPM Package**: https://www.npmjs.com/package/xy-px
- **GitHub Repo**: https://github.com/AltivumInc-Admin/xy-px

## Development Commands

### Build & Development
- `npm run build` - Build the library using Rollup (outputs to dist/)
- `npm run dev` - Build in watch mode for development
- `npm run demo` - Run the Vite demo server to test the component (port 5173)
- `npm run demo:build` - Build the demo for GitHub Pages deployment (outputs to docs/)

### Code Quality
- `npm run lint` - Run ESLint on all TypeScript files in src/
- `npm run typecheck` - Run TypeScript compiler type checking without emitting files
- `npm test` - Run Jest tests (test configuration not yet set up)

### Publishing
- `npm run prepublishOnly` - Automatically runs build before publishing to npm
- `npm version patch/minor/major` - Bump version and create git tag
- `npm publish` - Publish to npm (requires OTP)

## Architecture

### Build System
- **Rollup** for library bundling with dual output formats:
  - CommonJS (`dist/index.js`)
  - ES Module (`dist/index.esm.js`)
  - TypeScript definitions (`dist/index.d.ts`)
- **Vite** for demo development and GitHub Pages deployment
- CSS is extracted and minified separately during build
- GitHub Pages serves from `docs/` folder on main branch

### Component Structure
```
src/
├── CursorCoordinates.tsx    # Main React component with hooks
├── CursorCoordinates.css    # Component styling (BEM-like naming)
├── utils/
│   └── platform.ts          # Platform detection & key binding logic
└── index.ts                 # Package entry point & exports
```

### Key Dependencies
- React 17+ (supports 17, 18, 19+)
- TypeScript for type safety
- PostCSS for CSS processing
- Development tools: ESLint, Jest, Rollup plugins

## TypeScript Configuration
- Target: ES2020
- Strict mode enabled
- Module resolution: Node
- Generates declaration files and source maps
- Isolated modules for better tree-shaking

## Component API

### Main Props
```typescript
interface CursorCoordinatesProps {
  // Display
  showByDefault?: boolean
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  opacity?: number
  
  // Platform
  platform?: 'auto' | 'mac' | 'windows' | 'ios' | 'android' | 'linux'
  showPlatformToggle?: boolean
  
  // Features
  showViewportCoords?: boolean
  showPageCoords?: boolean
  showScrollPosition?: boolean
  enableAltTracking?: boolean
  enableCopyOnClick?: boolean
  enableTouchTracking?: boolean
  
  // Touch
  longPressDelay?: number
  
  // Keyboard
  toggleShortcut?: string
  
  // Styling
  theme?: 'dark' | 'light' | 'auto'
  customClassName?: string
  
  // Callbacks
  onCopy?: (text: string) => void
  onToggle?: (visible: boolean) => void
  onPlatformChange?: (platform: Platform) => void
}
```

### Platform-Specific Behavior
- **macOS**: Hold ⌥ Option, toggle with ⌘+Shift+C
- **Windows/Linux**: Hold Alt, toggle with Ctrl+Shift+C
- **iOS/Android**: Long press (500ms) to show, tap to copy

## Publishing & Deployment

### NPM Publishing (Manual)
1. Update version: `npm version patch/minor/major`
2. Build: `npm run build`
3. Publish: `npm publish` (requires OTP)
4. Push tags: `git push origin main --tags`

### Automated Publishing (GitHub Actions)
The project uses OIDC trusted publishing with GitHub Actions:

1. **Automatic on tag push**:
   ```bash
   npm version patch
   git push origin main --tags
   # GitHub Actions automatically publishes to npm
   ```

2. **Manual trigger**: 
   - Go to Actions tab on GitHub
   - Run "Publish with OIDC" workflow

### OIDC Configuration
- **Trusted Publisher**: Configured on npm for `AltivumInc-Admin/xy-px`
- **Workflow**: `.github/workflows/publish-oidc.yml`
- **Benefits**: Token-less publishing, provenance badge, supply chain security

### GitHub Pages Deployment
1. Demo is built to `docs/` folder: `npm run demo:build`
2. Commit and push to main branch
3. GitHub Pages automatically serves from `docs/`
4. Live at: https://altivuminc-admin.github.io/xy-px/

## Version History
- **1.0.0** - Initial release with core functionality
- **1.0.1** - Added React 19 support
- **1.0.2** - Emphasized LLM communication features, updated marketing

## Testing Approach
- Component can be manually tested using `npm run demo`
- Jest is configured but tests not yet implemented
- Live demo available for user testing

## Important Notes for AI Assistants

### When Making Changes
1. **Always run after changes**: `npm run lint` and `npm run typecheck`
2. **Test locally**: Use `npm run demo` to verify changes work
3. **Update version**: Use `npm version` commands, not manual edits
4. **Preserve platform detection**: Don't break cross-platform compatibility
5. **Keep LLM focus**: This tool's main value is AI communication

### Common Tasks
- **Add new feature**: Update component, test in demo, bump minor version
- **Fix bug**: Make fix, test thoroughly, bump patch version
- **Update demo**: Run `npm run demo:build`, commit docs folder
- **Update dependencies**: Test compatibility, especially with React versions

### Git Workflow
1. Make changes
2. Test with `npm run demo`
3. Run `npm run lint` and `npm run typecheck`
4. Commit with descriptive message
5. Use `npm version` for releases
6. Push with `--tags` for auto-publishing

### Key Files
- `src/CursorCoordinates.tsx` - Main component logic
- `src/utils/platform.ts` - Platform detection
- `vite.config.js` - Demo & GitHub Pages config
- `rollup.config.js` - Library build config
- `.github/workflows/publish-oidc.yml` - Automated publishing

## Support & Maintenance
- **Author**: Altivum Inc (admin@altivum.io)
- **License**: MIT
- **Issues**: https://github.com/AltivumInc-Admin/xy-px/issues
- **NPM**: https://www.npmjs.com/package/xy-px