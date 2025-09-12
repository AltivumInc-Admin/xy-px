// Auto-injection script for xy-px
// This automatically adds the cursor coordinate tool to any React app

import React from 'react';
import ReactDOM from 'react-dom/client';
import { CursorCoordinates } from './CursorCoordinates';
import './CursorCoordinates.css';

// Auto-inject on import
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  // Wait for DOM to be ready
  const inject = () => {
    // Check if already injected
    if (document.getElementById('xy-px-root')) {
      return;
    }

    // Create container
    const container = document.createElement('div');
    container.id = 'xy-px-root';
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '999999';
    document.body.appendChild(container);

    // Render component
    const root = ReactDOM.createRoot(container);
    root.render(
      <React.StrictMode>
        <div style={{ pointerEvents: 'auto' }}>
          <CursorCoordinates 
            showByDefault={true}
            position="top-right"
            opacity={0.9}
            theme="auto"
          />
        </div>
      </React.StrictMode>
    );

    console.log('📍 xy-px: Cursor coordinate tracker activated! Press Ctrl+Shift+C to toggle visibility.');
  };

  // Inject when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    // DOM already loaded
    setTimeout(inject, 0);
  }
}

// Also export the component for manual use
export { CursorCoordinates };
export type { CursorCoordinatesProps } from './CursorCoordinates';