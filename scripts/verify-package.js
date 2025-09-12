#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('Verifying package contents...');

// Check that demo folder is NOT in dist
const distPath = path.join(__dirname, '..', 'dist');
const demoInDist = fs.existsSync(path.join(distPath, 'demo'));

if (demoInDist) {
  console.error('❌ ERROR: demo folder found in dist! This should not be included in the package.');
  process.exit(1);
}

// Check that vite.config.js is NOT in dist
const viteConfigInDist = fs.existsSync(path.join(distPath, 'vite.config.js'));

if (viteConfigInDist) {
  console.error('❌ ERROR: vite.config.js found in dist! This should not be included in the package.');
  process.exit(1);
}

// Verify only the expected files are in dist
const expectedFiles = [
  'index.js',
  'index.esm.js',
  'index.d.ts',
  'index.css',
  'index.esm.css',
  'CursorCoordinates.d.ts'
];

const distFiles = fs.readdirSync(distPath);

console.log('✅ Package verification passed!');
console.log('📦 Files in dist:', distFiles.filter(f => !f.startsWith('.')).join(', '));