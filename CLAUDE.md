# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React component library that provides a customizable cursor coordinates tracking tool. The component displays real-time cursor position, viewport information, and scroll position with features like Alt-key tracking and copy-to-clipboard functionality.

## Development Commands

### Build & Development
- `npm run build` - Build the library using Rollup (outputs to dist/)
- `npm run dev` - Build in watch mode for development
- `npm run demo` - Run the Vite demo server to test the component
- `npm run demo:build` - Build the demo for production

### Code Quality
- `npm run lint` - Run ESLint on all TypeScript files in src/
- `npm run typecheck` - Run TypeScript compiler type checking without emitting files
- `npm test` - Run Jest tests (test configuration not yet set up)

### Publishing
- `npm run prepublishOnly` - Automatically runs build before publishing to npm

## Architecture

### Build System
- **Rollup** for library bundling with dual output formats:
  - CommonJS (`dist/index.js`)
  - ES Module (`dist/index.esm.js`)
  - TypeScript definitions (`dist/index.d.ts`)
- **Vite** for demo development and preview
- CSS is extracted and minified separately during build

### Component Structure
- Main component: `src/CursorCoordinates.tsx` - React component with hooks for event tracking
- Styles: `src/CursorCoordinates.css` - Component styling with BEM-like naming convention
- Entry point: `src/index.ts` - Exports component and types

### Key Dependencies
- React 17+ or 18+ (peer dependency)
- TypeScript for type safety
- PostCSS for CSS processing
- Development tools: ESLint, Jest, Rollup plugins

## TypeScript Configuration
- Target: ES2020
- Strict mode enabled
- Module resolution: Node
- Generates declaration files and source maps
- Isolated modules for better tree-shaking

## Component Features
The `CursorCoordinates` component tracks:
- Viewport coordinates (clientX/Y)
- Page coordinates (pageX/Y)  
- Scroll position
- Alt-key state for cursor-following display
- Persistent user preferences via localStorage
- Keyboard shortcut toggling (default: Ctrl+Shift+C)

## Testing Approach
- Jest is configured but tests not yet implemented
- Component can be manually tested using `npm run demo`