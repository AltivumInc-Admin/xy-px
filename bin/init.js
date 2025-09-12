#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const command = process.argv[2];

// Handle uninstall
if (command === 'uninstall' || command === 'remove') {
  console.log('\n🧹 Removing xy-px...\n');
  removeXYPX();
  execSync('npm uninstall xy-px', { stdio: 'inherit' });
  console.log('\n✅ xy-px has been removed\n');
  process.exit(0);
}

// Install/setup flow
console.log('\n📍 Setting up xy-px cursor tracker...\n');

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
  console.log('⚠️  Could not find entry file. Please add this import manually to your main file:');
  console.log('\n   import \'xy-px\';\n');
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

console.log('✅ xy-px has been set up successfully!\n');
console.log('🎯 Quick Guide:');
console.log('   • Tracker is now active in your app');
console.log('   • Press Ctrl+Shift+C (Cmd+Shift+C on Mac) to toggle visibility');
console.log('   • Hold Alt/Option for cursor-following display');
console.log('   • Click to copy coordinates\n');
console.log('💡 To remove: npx xy-px uninstall\n');

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