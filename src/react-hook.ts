// Hook into React to auto-inject xy-px
// This file patches React's createElement to inject our component

import React from 'react';
import ReactDOM from 'react-dom/client';
import { CursorCoordinates } from './CursorCoordinates';
import './CursorCoordinates.css';

let injected = false;

// Store the original createElement
const originalCreateElement = React.createElement;

// Override React.createElement to inject our component
(React as any).createElement = function(...args: any[]) {
  // Call the original createElement
  const element = originalCreateElement.apply(React, args);
  
  // Inject our component on the first render of the app
  if (!injected && typeof window !== 'undefined' && document.body) {
    injected = true;
    
    setTimeout(() => {
      if (!document.getElementById('xy-px-root')) {
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

        const root = ReactDOM.createRoot(container);
        root.render(
          React.createElement('div', { style: { pointerEvents: 'auto' } },
            React.createElement(CursorCoordinates, {
              showByDefault: true,
              position: 'top-right',
              opacity: 0.9,
              theme: 'auto'
            })
          )
        );

        console.log('📍 xy-px: Cursor tracker activated! Press Ctrl+Shift+C to toggle.');
      }
    }, 100);
  }
  
  return element;
};

// Also export the component for manual usage
export { CursorCoordinates };
export type { CursorCoordinatesProps } from './CursorCoordinates';