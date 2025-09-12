#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('\n📍 xy-px: Auto-injection setup starting...\n');

// Function to find the main app entry file
function findAppEntry() {
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
    'src/App.js',
    'index.tsx',
    'index.ts',
    'index.jsx',
    'index.js'
  ];

  // Get the project root (where package.json is)
  let projectRoot = process.cwd();
  
  // If we're in node_modules, go up to the project root
  if (projectRoot.includes('node_modules')) {
    const parts = projectRoot.split('node_modules');
    projectRoot = parts[0].replace(/[\/\\]$/, ''); // Remove trailing slash
  }

  console.log('🔍 Searching for entry file in:', projectRoot);

  for (const entry of possibleEntries) {
    const fullPath = path.join(projectRoot, entry);
    if (fs.existsSync(fullPath)) {
      console.log('✅ Found entry file:', entry);
      return fullPath;
    }
  }
  
  return null;
}

// Add import to the app
function addImportToApp() {
  const appEntry = findAppEntry();
  
  if (!appEntry) {
    console.log('\n⚠️  xy-px: Could not find app entry file automatically.\n');
    console.log('📝 To enable xy-px, add this import to your main entry file:');
    console.log('\n   import "xy-px/auto";\n');
    console.log('Common entry files: src/main.tsx, src/index.tsx, src/App.tsx\n');
    return false;
  }

  try {
    let content = fs.readFileSync(appEntry, 'utf8');
    
    // Check if already imported
    if (content.includes('xy-px/auto') || content.includes('xy-px\'')) {
      console.log('\n✅ xy-px: Already set up in', path.basename(appEntry));
      console.log('   Press Ctrl+Shift+C (Cmd+Shift+C on Mac) to toggle visibility\n');
      return true;
    }

    // Add import at the top of the file, after the first import
    const importStatement = 'import \'xy-px/auto\'; // Auto-injected cursor tracker (press Ctrl+Shift+C to toggle)\n';
    
    // Find the best place to insert
    let inserted = false;
    
    // Try to add after the second line if it's an import
    const lines = content.split('\n');
    for (let i = 0; i < Math.min(10, lines.length); i++) {
      if (lines[i].includes('import')) {
        // Found an import, add after it
        lines.splice(i + 1, 0, importStatement.trim());
        content = lines.join('\n');
        inserted = true;
        break;
      }
    }
    
    // If no imports found, add at the beginning
    if (!inserted) {
      content = importStatement + content;
    }

    fs.writeFileSync(appEntry, content);
    console.log('\n✅ xy-px: Successfully added auto-import to', path.basename(appEntry));
    console.log('\n🎯 Quick Guide:');
    console.log('   • Tracker is now active in your app');
    console.log('   • Press Ctrl+Shift+C (Cmd+Shift+C on Mac) to toggle visibility');
    console.log('   • Hold Alt/Option to see cursor-following display');
    console.log('   • Click to copy coordinates to clipboard');
    console.log('\n💡 To remove: delete the import "xy-px/auto" line from', path.basename(appEntry), '\n');
    return true;
  } catch (error) {
    console.error('\n❌ xy-px: Error modifying file:', error.message);
    console.log('\n📝 Please manually add this import to your entry file:');
    console.log('\n   import "xy-px/auto";\n');
    return false;
  }
}

// Only run if not in CI/CD environment
if (!process.env.CI && !process.env.CONTINUOUS_INTEGRATION && !process.env.XY_PX_SKIP_POSTINSTALL) {
  const success = addImportToApp();
  if (!success) {
    console.log('ℹ️  For manual setup instructions, visit: https://npmjs.com/package/xy-px\n');
  }
} else if (process.env.XY_PX_SKIP_POSTINSTALL) {
  console.log('⏭️  xy-px: Skipping auto-setup (XY_PX_SKIP_POSTINSTALL is set)\n');
}