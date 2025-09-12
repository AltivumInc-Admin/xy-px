import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { CursorCoordinates, CursorCoordinatesProps } from '../src/CursorCoordinates';

const Demo: React.FC = () => {
  const [config, setConfig] = useState<CursorCoordinatesProps>({
    showByDefault: true,
    position: 'top-right',
    opacity: 0.4,
    showViewportCoords: true,
    showPageCoords: true,
    showScrollPosition: true,
    enableAltTracking: true,
    enableCopyOnClick: true,
    theme: 'auto',
  });

  useEffect(() => {
    // Set up control listeners
    const showViewport = document.getElementById('showViewport') as HTMLInputElement;
    const showPage = document.getElementById('showPage') as HTMLInputElement;
    const showScroll = document.getElementById('showScroll') as HTMLInputElement;
    const enableAlt = document.getElementById('enableAlt') as HTMLInputElement;
    const enableCopy = document.getElementById('enableCopy') as HTMLInputElement;
    const position = document.getElementById('position') as HTMLSelectElement;
    const theme = document.getElementById('theme') as HTMLSelectElement;
    const opacity = document.getElementById('opacity') as HTMLInputElement;
    const opacityValue = document.getElementById('opacityValue');

    const updateConfig = () => {
      setConfig({
        ...config,
        showViewportCoords: showViewport.checked,
        showPageCoords: showPage.checked,
        showScrollPosition: showScroll.checked,
        enableAltTracking: enableAlt.checked,
        enableCopyOnClick: enableCopy.checked,
        position: position.value as any,
        theme: theme.value as any,
        opacity: parseInt(opacity.value) / 100,
      });
      
      if (opacityValue) {
        opacityValue.textContent = opacity.value;
      }
    };

    // Add event listeners
    showViewport?.addEventListener('change', updateConfig);
    showPage?.addEventListener('change', updateConfig);
    showScroll?.addEventListener('change', updateConfig);
    enableAlt?.addEventListener('change', updateConfig);
    enableCopy?.addEventListener('change', updateConfig);
    position?.addEventListener('change', updateConfig);
    theme?.addEventListener('change', updateConfig);
    opacity?.addEventListener('input', updateConfig);

    return () => {
      // Clean up event listeners
      showViewport?.removeEventListener('change', updateConfig);
      showPage?.removeEventListener('change', updateConfig);
      showScroll?.removeEventListener('change', updateConfig);
      enableAlt?.removeEventListener('change', updateConfig);
      enableCopy?.removeEventListener('change', updateConfig);
      position?.removeEventListener('change', updateConfig);
      theme?.removeEventListener('change', updateConfig);
      opacity?.removeEventListener('input', updateConfig);
    };
  }, [config]);

  return (
    <CursorCoordinates
      {...config}
      onCopy={(text) => console.log('Copied:', text)}
      onToggle={(visible) => console.log('Toggled:', visible)}
    />
  );
};

// Mount the demo app
const container = document.getElementById('cursor-tool');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(<Demo />);
}