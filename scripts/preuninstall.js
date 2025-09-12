#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('\n🧹 xy-px: Cleaning up auto-injected imports...\n');

// Function to find files with xy-px imports
function findFilesWithImport() {
  const possibleFiles = [
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

  const filesToClean = [];
  
  for (const file of possibleFiles) {
    const fullPath = path.join(projectRoot, file);
    if (fs.existsSync(fullPath)) {
      try {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (content.includes('xy-px/auto') || content.includes('xy-px\'')) {
          filesToClean.push(fullPath);
        }
      } catch (error) {
        // Ignore read errors
      }
    }
  }
  
  return filesToClean;
}

// Remove import from files
function removeImports() {
  const files = findFilesWithImport();
  
  if (files.length === 0) {
    console.log('✅ No xy-px imports found to clean up\n');
    return;
  }

  for (const file of files) {
    try {
      let content = fs.readFileSync(file, 'utf8');
      const originalContent = content;
      
      // Remove the import line and any comment on the same line
      // Match various import styles
      const patterns = [
        /^import\s+['"]xy-px\/auto['"];?\s*\/\/.*$/gm,  // import "xy-px/auto"; // comment
        /^import\s+['"]xy-px\/auto['"];?\s*$/gm,        // import "xy-px/auto";
        /^import\s+['"]xy-px['"];?\s*\/\/.*$/gm,        // import "xy-px"; // comment
        /^import\s+['"]xy-px['"];?\s*$/gm,              // import "xy-px";
      ];
      
      for (const pattern of patterns) {
        content = content.replace(pattern, '');
      }
      
      // Clean up any double blank lines left behind
      content = content.replace(/\n\n\n+/g, '\n\n');
      
      // Remove leading blank lines if we removed the first import
      if (originalContent.trimStart() !== originalContent && content.trimStart() === content) {
        content = content.trimStart();
      }
      
      if (content !== originalContent) {
        fs.writeFileSync(file, content);
        console.log(`✅ Removed xy-px import from ${path.basename(file)}`);
      }
    } catch (error) {
      console.error(`⚠️  Could not clean ${path.basename(file)}: ${error.message}`);
    }
  }
  
  console.log('\n🎉 xy-px has been cleanly uninstalled\n');
}

// Only run if not in CI/CD environment
if (!process.env.CI && !process.env.CONTINUOUS_INTEGRATION && !process.env.XY_PX_SKIP_UNINSTALL) {
  removeImports();
} else if (process.env.XY_PX_SKIP_UNINSTALL) {
  console.log('⏭️  xy-px: Skipping cleanup (XY_PX_SKIP_UNINSTALL is set)\n');
}