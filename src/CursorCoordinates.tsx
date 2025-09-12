import React, { useState, useEffect, useCallback, useRef } from 'react';
import './CursorCoordinates.css';
import { Platform, getPlatformInfo, isModifierKeyPressed, checkShortcut } from './utils/platform';

interface Coordinates {
  x: number;
  y: number;
  pageX: number;
  pageY: number;
}

export interface CursorCoordinatesProps {
  // Display options
  showByDefault?: boolean;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  opacity?: number;
  
  // Platform settings
  platform?: 'auto' | Platform;
  showPlatformToggle?: boolean;
  
  // Feature toggles
  showViewportCoords?: boolean;
  showPageCoords?: boolean;
  showScrollPosition?: boolean;
  enableAltTracking?: boolean;
  enableCopyOnClick?: boolean;
  enableTouchTracking?: boolean;
  
  // Keyboard shortcuts
  toggleShortcut?: string; // Default varies by platform
  
  // Touch settings
  longPressDelay?: number; // milliseconds for long press on mobile
  
  // Styling
  theme?: 'dark' | 'light' | 'auto';
  customClassName?: string;
  
  // Callbacks
  onCopy?: (text: string) => void;
  onToggle?: (visible: boolean) => void;
  onPlatformChange?: (platform: Platform) => void;
}

export const CursorCoordinates: React.FC<CursorCoordinatesProps> = ({
  showByDefault = true,
  position = 'top-right',
  opacity = 0.4,
  platform = 'auto',
  showPlatformToggle = true,
  showViewportCoords = true,
  showPageCoords = true,
  showScrollPosition = true,
  enableAltTracking = true,
  enableCopyOnClick = true,
  enableTouchTracking = true,
  toggleShortcut,
  longPressDelay = 500,
  theme = 'auto',
  customClassName = '',
  onCopy,
  onToggle,
  onPlatformChange,
}) => {
  const [coords, setCoords] = useState<Coordinates>({ x: 0, y: 0, pageX: 0, pageY: 0 });
  const [isModifierPressed, setIsModifierPressed] = useState(false);
  const [showCoords, setShowCoords] = useState(showByDefault);
  const [copiedText, setCopiedText] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const [currentPlatform, setCurrentPlatform] = useState<Platform>(
    platform === 'auto' ? 'windows' : platform
  );
  const [isTouchActive, setIsTouchActive] = useState(false);
  const touchTimerRef = useRef<NodeJS.Timeout>();
  const platformInfo = getPlatformInfo(currentPlatform);
  const actualToggleShortcut = toggleShortcut || platformInfo.toggleShortcut;
  
  // Track mouse movement
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setCoords({
      x: e.clientX,
      y: e.clientY,
      pageX: e.pageX,
      pageY: e.pageY
    });
  }, []);
  
  // Track modifier key (Alt/Option)
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (enableAltTracking && isModifierKeyPressed(e, currentPlatform)) {
      setIsModifierPressed(true);
    }
    
    // Check for toggle shortcut
    if (actualToggleShortcut && checkShortcut(e, actualToggleShortcut, currentPlatform)) {
      e.preventDefault();
      const newState = !showCoords;
      setShowCoords(newState);
      localStorage.setItem('cursorCoords.visible', newState.toString());
      onToggle?.(newState);
    }
  }, [showCoords, actualToggleShortcut, enableAltTracking, onToggle, currentPlatform]);
  
  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    if (!isModifierKeyPressed(e, currentPlatform)) {
      setIsModifierPressed(false);
    }
  }, [currentPlatform]);
  
  // Track scroll position
  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);
  
  // Click to copy coordinates
  const handleClick = useCallback((e: MouseEvent) => {
    if (enableCopyOnClick && isModifierPressed) {
      const coordText = `X: ${e.pageX}, Y: ${e.pageY}`;
      navigator.clipboard.writeText(coordText);
      setCopiedText(coordText);
      onCopy?.(coordText);
      setTimeout(() => setCopiedText(''), 2000);
    }
  }, [isModifierPressed, enableCopyOnClick, onCopy]);
  
  // Touch event handlers for mobile
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (!enableTouchTracking || !platformInfo.isTouch) return;
    
    const touch = e.touches[0];
    setCoords({
      x: touch.clientX,
      y: touch.clientY,
      pageX: touch.pageX,
      pageY: touch.pageY
    });
    
    // Start long press timer
    touchTimerRef.current = setTimeout(() => {
      setIsTouchActive(true);
    }, longPressDelay);
  }, [enableTouchTracking, platformInfo.isTouch, longPressDelay]);
  
  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!enableTouchTracking || !platformInfo.isTouch) return;
    
    const touch = e.touches[0];
    setCoords({
      x: touch.clientX,
      y: touch.clientY,
      pageX: touch.pageX,
      pageY: touch.pageY
    });
    
    // Cancel long press if moving
    if (touchTimerRef.current) {
      clearTimeout(touchTimerRef.current);
      touchTimerRef.current = undefined;
    }
  }, [enableTouchTracking, platformInfo.isTouch]);
  
  const handleTouchEnd = useCallback(() => {
    if (!enableTouchTracking || !platformInfo.isTouch) return;
    
    // Clear long press timer
    if (touchTimerRef.current) {
      clearTimeout(touchTimerRef.current);
      touchTimerRef.current = undefined;
    }
    
    // Copy on tap if touch was active
    if (isTouchActive && enableCopyOnClick) {
      const coordText = `X: ${coords.pageX}, Y: ${coords.pageY}`;
      navigator.clipboard.writeText(coordText);
      setCopiedText(coordText);
      onCopy?.(coordText);
      setTimeout(() => setCopiedText(''), 2000);
    }
    
    setIsTouchActive(false);
  }, [enableTouchTracking, platformInfo.isTouch, isTouchActive, enableCopyOnClick, coords, onCopy]);
  
  // Platform toggle handler
  const togglePlatform = useCallback(() => {
    const platforms: Platform[] = ['mac', 'windows', 'ios', 'android', 'linux'];
    const currentIndex = platforms.indexOf(currentPlatform);
    const nextIndex = (currentIndex + 1) % platforms.length;
    const nextPlatform = platforms[nextIndex];
    
    setCurrentPlatform(nextPlatform);
    localStorage.setItem('cursorCoords.platform', nextPlatform);
    onPlatformChange?.(nextPlatform);
  }, [currentPlatform, onPlatformChange]);
  
  useEffect(() => {
    // Check localStorage for saved preferences
    const savedVisible = localStorage.getItem('cursorCoords.visible');
    if (savedVisible !== null) {
      setShowCoords(savedVisible === 'true');
    }
    
    const savedPlatform = localStorage.getItem('cursorCoords.platform');
    if (savedPlatform && platform === 'auto') {
      setCurrentPlatform(savedPlatform as Platform);
    } else if (platform === 'auto') {
      // Auto-detect platform
      import('./utils/platform').then(({ detectPlatform }) => {
        setCurrentPlatform(detectPlatform());
      });
    }
    
    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('click', handleClick);
    
    // Add touch listeners if needed
    if (platformInfo.isTouch && enableTouchTracking) {
      window.addEventListener('touchstart', handleTouchStart);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClick);
      
      if (platformInfo.isTouch && enableTouchTracking) {
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
      }
      
      if (touchTimerRef.current) {
        clearTimeout(touchTimerRef.current);
      }
    };
  }, [handleMouseMove, handleKeyDown, handleKeyUp, handleScroll, handleClick,
      handleTouchStart, handleTouchMove, handleTouchEnd, platform, platformInfo.isTouch,
      enableTouchTracking]);
  
  if (!showCoords) return null;
  
  const positionClass = `cursor-coords-position-${position}`;
  const themeClass = theme === 'auto' ? '' : `cursor-coords-theme-${theme}`;
  
  return (
    <>
      {/* Corner HUD - Always visible but subtle */}
      <div 
        className={`cursor-coords-hud ${positionClass} ${themeClass} ${customClassName}`}
        style={{ opacity }}
      >
        {showViewportCoords && (
          <div className="coords-viewport">
            <span className="coord-label">View</span>
            <span className="coord-value">{coords.x}, {coords.y}</span>
          </div>
        )}
        {showPageCoords && (
          <div className="coords-page">
            <span className="coord-label">Page</span>
            <span className="coord-value">{coords.pageX}, {coords.pageY}</span>
          </div>
        )}
        {showScrollPosition && (
          <div className="coords-scroll">
            <span className="coord-label">Scroll</span>
            <span className="coord-value">{scrollY}px</span>
          </div>
        )}
        {enableAltTracking && !platformInfo.isTouch && (
          <div className="coords-hint">
            Hold <kbd>{platformInfo.modifierSymbol}</kbd> for cursor tracking
          </div>
        )}
        {platformInfo.isTouch && enableTouchTracking && (
          <div className="coords-hint">
            Long press for tracking
          </div>
        )}
        {showPlatformToggle && (
          <button 
            className="coords-platform-toggle"
            onClick={togglePlatform}
            title={`Current: ${platformInfo.platform}. Click to switch.`}
            aria-label="Toggle platform"
          >
            {platformInfo.platformIcon}
          </button>
        )}
      </div>
      
      {/* Cursor-following display when modifier key is pressed or touch is active */}
      {((enableAltTracking && isModifierPressed) || (platformInfo.isTouch && isTouchActive)) && (
        <div 
          className="cursor-coords-follow"
          style={{
            left: coords.x + 15,
            top: coords.y - 35
          }}
        >
          <div className="coords-follow-content">
            <div className="coords-follow-main">
              [{coords.pageX}, {coords.pageY}]
            </div>
            {enableCopyOnClick && (
              <div className="coords-follow-hint">
                {platformInfo.isTouch ? 'Tap to copy' : 'Click to copy'}
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Copy confirmation */}
      {copiedText && (
        <div className="cursor-coords-copied">
          Copied: {copiedText}
        </div>
      )}
    </>
  );
};

// Export a vanilla JavaScript version for non-React apps
export function initCursorCoordinates(containerId: string, _options?: CursorCoordinatesProps) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with id "${containerId}" not found`);
    return;
  }
  
  // This would need React and ReactDOM to work
  // Implementation would go here for vanilla JS version
  console.warn('Vanilla JS implementation coming soon. Please use the React component for now.');
}