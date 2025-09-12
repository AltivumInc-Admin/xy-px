#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// This script wraps the dev command to auto-inject xy-px

const projectRoot = process.cwd();

// Find and modify the entry file to include xy-px
function injectXYPX() {
  const possibleEntries = [
    'src/main.tsx', 'src/main.ts', 'src/main.jsx', 'src/main.js',
    'src/index.tsx', 'src/index.ts', 'src/index.jsx', 'src/index.js'
  ];

  for (const entry of possibleEntries) {
    const fullPath = path.join(projectRoot, entry);
    if (fs.existsSync(fullPath)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (!content.includes('xy-px')) {
        // Add import at the top
        content = `import 'xy-px/auto'; // Auto-injected\n${content}`;
        fs.writeFileSync(fullPath, content);
        
        // Set up cleanup on exit
        process.on('exit', () => {
          // Remove the import when dev server stops
          content = fs.readFileSync(fullPath, 'utf8');
          content = content.replace(/^import ['"]xy-px\/auto['"];.*\n/m, '');
          fs.writeFileSync(fullPath, content);
        });
        
        process.on('SIGINT', () => process.exit());
        process.on('SIGTERM', () => process.exit());
      }
      break;
    }
  }
}

// Inject xy-px
injectXYPX();

// Run the original dev command
const child = spawn('vite', process.argv.slice(2), {
  stdio: 'inherit',
  shell: true
});

child.on('exit', (code) => {
  process.exit(code);
});