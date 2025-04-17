import React, { createContext, useState, useEffect, ReactNode, useRef } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isTransitioning: boolean;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
  isTransitioning: false,
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem('theme');
    // Check if user's system prefers dark mode
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches 
      ? 'dark' 
      : 'light';
    
    return (savedTheme as Theme) || systemPreference;
  });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // Apply theme classes when the theme changes
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    if (isTransitioning) return; // Prevent multiple toggles during transition
    
    setIsTransitioning(true);
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    
    // Create overlay element that will first cover the screen entirely
    const createTransitionOverlay = () => {
      // Create overlay container
      const overlay = document.createElement('div');
      document.body.appendChild(overlay);
      
      // Set initial styles for full-screen overlay
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100vw';
      overlay.style.height = '100vh';
      overlay.style.backgroundColor = nextTheme === 'dark' ? '#0f172a' : '#f8fafc';
      overlay.style.opacity = '0';
      overlay.style.transition = 'opacity 400ms cubic-bezier(0.16, 1, 0.3, 1)';
      overlay.style.zIndex = '9999';
      overlay.style.pointerEvents = 'none';
      
      // Hide all theme-sensitive content
      const contentItems = document.querySelectorAll('.reveal-on-theme-change');
      contentItems.forEach(item => {
        const element = item as HTMLElement;
        element.style.opacity = '0';
        element.style.transition = 'opacity 600ms ease-in-out';
      });
      
      // Animation sequence:
      // 1. Fade in overlay (screen goes completely dark/light)
      requestAnimationFrame(() => {
        overlay.style.opacity = '1';
        
        // 2. Apply theme change when overlay is fully visible
        transitionTimeoutRef.current = window.setTimeout(() => {
          setTheme(nextTheme);
          
          // 3. Start fading out overlay
          transitionTimeoutRef.current = window.setTimeout(() => {
            overlay.style.opacity = '0';
            
            // 4. Start revealing content elements in sequence
            contentItems.forEach((item, index) => {
              const element = item as HTMLElement;
              element.style.transitionDelay = `${200 + (index * 50)}ms`;
              element.style.opacity = '1';
            });
            
            // 5. Remove overlay when animation completes
            transitionTimeoutRef.current = window.setTimeout(() => {
              document.body.removeChild(overlay);
              setIsTransitioning(false);
            }, 800);
          }, 400);
        }, 400);
      });
    };
    
    createTransitionOverlay();
  };
  
  // Clean up any pending animations on unmount
  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        window.clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isTransitioning }}>
      {children}
    </ThemeContext.Provider>
  );
}; 