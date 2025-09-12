#!/usr/bin/env node

// Only show in actual installs, not in CI or when installing deps
if (process.env.npm_config_production === 'false' || 
    process.env.CI || 
    process.env.CONTINUOUS_INTEGRATION ||
    process.env.npm_lifecycle_event !== 'postinstall') {
  process.exit(0);
}

const isUpdate = process.env.npm_config_save === 'false';

console.log('\n\x1b[36m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\x1b[0m');
console.log('\x1b[1m\x1b[36m📍 xy-px installed successfully!\x1b[0m\n');

if (!isUpdate) {
  console.log('\x1b[1m\x1b[33m👉 To activate the cursor tracker, run:\x1b[0m\n');
  console.log('   \x1b[1m\x1b[32mnpx xy-px\x1b[0m\n');
  console.log('\x1b[90m   This will add the tracker to your app automatically.\x1b[0m');
  console.log('\x1b[90m   Press Ctrl+Shift+C (Cmd+Shift+C on Mac) to toggle visibility.\x1b[0m\n');
  console.log('\x1b[90m   To remove later: \x1b[0mnpx xy-px uninstall\n');
}

console.log('\x1b[36m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\x1b[0m\n');