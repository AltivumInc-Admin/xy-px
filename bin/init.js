#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const command = process.argv[2];

// Handle uninstall
if (command === 'uninstall' || command === 'remove') {
  console.log('\n\x1b[36m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\x1b[0m');
console.log('\x1b[1m\x1b[36m🧹 Removing xy-px...\x1b[0m\n');
  removeXYPX();
  execSync('npm uninstall xy-px', { stdio: 'inherit' });
  console.log('\n\x1b[1m\x1b[32m✅ xy-px has been removed cleanly!\x1b[0m\n');
console.log('\x1b[36m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\x1b[0m\n');
  process.exit(0);
}

// Install/setup flow
console.log('\n\x1b[36m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\x1b[0m');
console.log('\x1b[1m\x1b[36m📍 Setting up xy-px cursor tracker...\x1b[0m\n');

const projectRoot = process.cwd();

// Find package.json
const packageJsonPath = path.join(projectRoot, 'package.json');
if (!fs.existsSync(packageJsonPath)) {
  console.error('❌ No package.json found. Please run this in your project root.');
  process.exit(1);
}

// Read package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Check if xy-px is installed
if (!packageJson.dependencies?.['xy-px'] && !packageJson.devDependencies?.['xy-px']) {
  console.log('📦 Installing xy-px...');
  execSync('npm install xy-px', { stdio: 'inherit' });
  console.log('');
}

// Find entry file
const possibleEntries = [
  'src/main.tsx',
  'src/main.ts',
  'src/main.jsx',
  'src/main.js',
  'src/index.tsx',
  'src/index.ts',
  'src/index.jsx',
  'src/index.js',
  'src/App.tsx',
  'src/App.ts',
  'src/App.jsx',
  'src/App.js'
];

let entryFile = null;
for (const entry of possibleEntries) {
  const fullPath = path.join(projectRoot, entry);
  if (fs.existsSync(fullPath)) {
    entryFile = fullPath;
    break;
  }
}

if (!entryFile) {
  console.log('\n\x1b[33m⚠️  Could not find your app\'s entry file automatically.\x1b[0m\n');
  console.log('\x1b[1mPlease add this line to your main file (e.g., src/main.tsx):\x1b[0m\n');
  console.log('   \x1b[32mimport \'xy-px\';\x1b[0m\n');
  console.log('\x1b[90mCommon entry files: src/main.tsx, src/index.tsx, src/App.tsx\x1b[0m\n');
  process.exit(0);
}

// Add import to entry file
let content = fs.readFileSync(entryFile, 'utf8');

if (content.includes('xy-px')) {
  console.log('✅ xy-px is already set up!');
  console.log('   Press Ctrl+Shift+C (Cmd+Shift+C on Mac) to toggle the tracker\n');
  process.exit(0);
}

// Add import after first import or at beginning  
const importStatement = 'import \'xy-px\'; // Cursor tracker - press Ctrl+Shift+C to toggle\n';

const lines = content.split('\n');
let inserted = false;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('import')) {
    lines.splice(i + 1, 0, importStatement.trim());
    inserted = true;
    break;
  }
}

if (!inserted) {
  lines.unshift(importStatement.trim());
}

content = lines.join('\n');
fs.writeFileSync(entryFile, content);

console.log('\x1b[1m\x1b[32m✅ xy-px has been activated!\x1b[0m\n');
console.log('\x1b[1m🎯 Quick Guide:\x1b[0m');
console.log('   • \x1b[32m✓\x1b[0m Tracker is now active in your app');
console.log('   • \x1b[36mPress\x1b[0m \x1b[1mCtrl+Shift+C\x1b[0m (\x1b[1mCmd+Shift+C\x1b[0m on Mac) to toggle');
console.log('   • \x1b[36mHold\x1b[0m \x1b[1mAlt/Option\x1b[0m for cursor-following display');
console.log('   • \x1b[36mClick\x1b[0m to copy coordinates\n');
console.log('\x1b[90m💡 To remove later: \x1b[0mnpx xy-px uninstall\n');
console.log('\x1b[36m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\x1b[0m\n');

function removeXYPX() {
  const possibleEntries = [
    'src/main.tsx', 'src/main.ts', 'src/main.jsx', 'src/main.js',
    'src/index.tsx', 'src/index.ts', 'src/index.jsx', 'src/index.js',
    'src/App.tsx', 'src/App.ts', 'src/App.jsx', 'src/App.js'
  ];

  for (const entry of possibleEntries) {
    const fullPath = path.join(projectRoot, entry);
    if (fs.existsSync(fullPath)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      // Remove any xy-px imports
      content = content.replace(/^import\s+['"]xy-px['"];?.*\n/gm, '');
      content = content.replace(/^import\s+['"]xy-px\/auto['"];?.*\n/gm, '');
      fs.writeFileSync(fullPath, content);
    }
  }
}