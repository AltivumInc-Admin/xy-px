#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('📍 xy-px: Setting up cursor coordinate tracker...');

// Function to find the main app entry file
function findAppEntry() {
  const possibleEntries = [
    'src/index.js',
    'src/index.jsx', 
    'src/index.ts',
    'src/index.tsx',
    'src/main.js',
    'src/main.jsx',
    'src/main.ts', 
    'src/main.tsx',
    'src/App.js',
    'src/App.jsx',
    'src/App.ts',
    'src/App.tsx'
  ];

  // Get the project root (where package.json is)
  let projectRoot = process.cwd();
  
  // If we're in node_modules, go up to the project root
  if (projectRoot.includes('node_modules')) {
    projectRoot = projectRoot.split('node_modules')[0];
  }

  for (const entry of possibleEntries) {
    const fullPath = path.join(projectRoot, entry);
    if (fs.existsSync(fullPath)) {
      return fullPath;
    }
  }
  
  return null;
}

// Add import to the app
function addImportToApp() {
  const appEntry = findAppEntry();
  
  if (!appEntry) {
    console.log('⚠️  xy-px: Could not find app entry file. Please import manually:');
    console.log('   import "xy-px/auto";');
    return;
  }

  try {
    let content = fs.readFileSync(appEntry, 'utf8');
    
    // Check if already imported
    if (content.includes('xy-px/auto')) {
      console.log('✅ xy-px: Already set up!');
      return;
    }

    // Add import at the top of the file
    const importStatement = 'import "xy-px/auto"; // Auto-injected cursor tracker (press Ctrl+Shift+C to toggle)\n';
    
    // Handle different import styles
    if (content.includes('import React')) {
      // Add after React import
      content = content.replace(
        /(import React.*?;\n)/,
        `$1${importStatement}`
      );
    } else if (content.includes('import')) {
      // Add after first import
      content = content.replace(
        /(import.*?;\n)/,
        `$1${importStatement}`
      );
    } else {
      // Add at the very beginning
      content = importStatement + content;
    }

    fs.writeFileSync(appEntry, content);
    console.log(`✅ xy-px: Auto-import added to ${path.basename(appEntry)}`);
    console.log('   Press Ctrl+Shift+C (Cmd+Shift+C on Mac) to toggle the tracker');
    console.log('   To remove: delete the import "xy-px/auto" line or uninstall xy-px');
  } catch (error) {
    console.log('⚠️  xy-px: Could not auto-add import. Please add manually:');
    console.log('   import "xy-px/auto";');
  }
}

// Only run if not in CI/CD environment
if (!process.env.CI && !process.env.CONTINUOUS_INTEGRATION) {
  addImportToApp();
}