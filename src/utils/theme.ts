interface ThemeContext {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

declare global {
  interface Window {
    __theme?: 'light' | 'dark';
    __onThemeChange?: (theme: 'light' | 'dark') => void;
  }
}

export function createThemeManager(): ThemeContext {
  // Get theme from localStorage or system preference
  function getInitialTheme(): 'light' | 'dark' {
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem('theme') as 'light' | 'dark' | null;
      if (stored === 'light' || stored === 'dark') return stored;
    }
    
    // Fallback to system preference
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    return 'dark'; // Default theme
  }

  function applyTheme(theme: 'light' | 'dark') {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
      
      // Add meta theme-color for mobile browsers
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', theme === 'dark' ? '#09090b' : '#ffffff');
      }
    }
  }

  function setTheme(theme: 'light' | 'dark') {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
    
    if (typeof window !== 'undefined') {
      window.__theme = theme;
      if (window.__onThemeChange) {
        window.__onThemeChange(theme);
      }
    }
    
    applyTheme(theme);
  }

  function toggleTheme() {
    const currentTheme = getInitialTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    return newTheme;
  }

  // Initialize theme on load
  const initialTheme = getInitialTheme();
  setTheme(initialTheme);

  return {
    theme: initialTheme,
    toggleTheme,
    setTheme
  };
}

export type { ThemeContext };