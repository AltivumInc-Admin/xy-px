export type Platform = 'mac' | 'windows' | 'ios' | 'android' | 'linux';

export interface PlatformInfo {
  platform: Platform;
  isMobile: boolean;
  isTouch: boolean;
  modifierKey: string;
  modifierSymbol: string;
  toggleShortcut: string;
  platformIcon: string;
}

export function detectPlatform(): Platform {
  const userAgent = navigator.userAgent.toLowerCase();
  const platform = navigator.platform?.toLowerCase() || '';
  
  // iOS detection (iPhone, iPad, iPod)
  if (/iphone|ipad|ipod/.test(userAgent) || 
      (platform === 'macintel' && navigator.maxTouchPoints > 1)) {
    return 'ios';
  }
  
  // Android detection
  if (/android/.test(userAgent)) {
    return 'android';
  }
  
  // macOS detection
  if (platform.startsWith('mac') || /macintosh/.test(userAgent)) {
    return 'mac';
  }
  
  // Windows detection
  if (platform.startsWith('win') || /windows/.test(userAgent)) {
    return 'windows';
  }
  
  // Linux detection
  if (platform.startsWith('linux') || /linux/.test(userAgent)) {
    return 'linux';
  }
  
  // Default to Windows for unknown platforms
  return 'windows';
}

export function getPlatformInfo(platform: Platform | 'auto'): PlatformInfo {
  const actualPlatform = platform === 'auto' ? detectPlatform() : platform;
  
  switch (actualPlatform) {
    case 'mac':
      return {
        platform: 'mac',
        isMobile: false,
        isTouch: false,
        modifierKey: 'Option',
        modifierSymbol: '⌥',
        toggleShortcut: 'Cmd+Shift+C',
        platformIcon: '🍎'
      };
      
    case 'ios':
      return {
        platform: 'ios',
        isMobile: true,
        isTouch: true,
        modifierKey: 'Touch',
        modifierSymbol: '👆',
        toggleShortcut: '',
        platformIcon: '📱'
      };
      
    case 'android':
      return {
        platform: 'android',
        isMobile: true,
        isTouch: true,
        modifierKey: 'Touch',
        modifierSymbol: '👆',
        toggleShortcut: '',
        platformIcon: '🤖'
      };
      
    case 'linux':
      return {
        platform: 'linux',
        isMobile: false,
        isTouch: false,
        modifierKey: 'Alt',
        modifierSymbol: 'Alt',
        toggleShortcut: 'Ctrl+Shift+C',
        platformIcon: '🐧'
      };
      
    case 'windows':
    default:
      return {
        platform: 'windows',
        isMobile: false,
        isTouch: false,
        modifierKey: 'Alt',
        modifierSymbol: 'Alt',
        toggleShortcut: 'Ctrl+Shift+C',
        platformIcon: '🪟'
      };
  }
}

export function isModifierKeyPressed(
  event: KeyboardEvent | MouseEvent,
  platform: Platform
): boolean {
  switch (platform) {
    case 'mac':
    case 'ios':
      return event.altKey; // Option key on Mac is the Alt key
    case 'windows':
    case 'linux':
    case 'android':
    default:
      return event.altKey;
  }
}

export function parseShortcut(shortcut: string, platform: Platform) {
  // Convert platform-specific shortcut notation to check keys
  let normalizedShortcut = shortcut.toLowerCase();
  
  if (platform === 'mac') {
    normalizedShortcut = normalizedShortcut
      .replace('cmd', 'meta')
      .replace('command', 'meta')
      .replace('option', 'alt');
  }
  
  const parts = normalizedShortcut.split('+').map(p => p.trim());
  const modifiers = {
    ctrl: false,
    meta: false,
    shift: false,
    alt: false
  };
  
  let key = '';
  
  parts.forEach(part => {
    if (part === 'ctrl') modifiers.ctrl = true;
    else if (part === 'meta') modifiers.meta = true;
    else if (part === 'shift') modifiers.shift = true;
    else if (part === 'alt') modifiers.alt = true;
    else key = part;
  });
  
  return { modifiers, key };
}

export function checkShortcut(
  event: KeyboardEvent,
  shortcut: string,
  platform: Platform
): boolean {
  const { modifiers, key } = parseShortcut(shortcut, platform);
  
  return (
    (!modifiers.ctrl || (platform !== 'mac' && event.ctrlKey)) &&
    (!modifiers.meta || (platform === 'mac' && event.metaKey)) &&
    (!modifiers.shift || event.shiftKey) &&
    (!modifiers.alt || event.altKey) &&
    event.key.toLowerCase() === key
  );
}