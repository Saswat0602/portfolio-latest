import { useEffect, useState, useRef, memo } from 'react';
import { useTheme } from '../hooks/useTheme';

const CustomCursor = () => {
  const cursorOuterRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  
  const [cursorState, setCursorState] = useState({
    clicked: false,
    hovered: false,
    enabled: true,
    x: 0,
    y: 0
  });
  
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const shouldDisable = 
      'ontouchstart' in window || 
      navigator.maxTouchPoints > 0 || 
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (shouldDisable) {
      setCursorState(prev => ({ ...prev, enabled: false }));
    }
    
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    if (!cursorState.enabled) return;
    
    document.documentElement.style.cursor = 'none';
    
    const updateCursorPosition = (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      
      rafRef.current = requestAnimationFrame(() => {
        setCursorState(prev => ({ ...prev, x: e.clientX, y: e.clientY }));
        
        if (cursorOuterRef.current) {
          cursorOuterRef.current.style.transform = 
            `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
        }
      });
    };
    
    const handleMouseDown = () => setCursorState(prev => ({ ...prev, clicked: true }));
    const handleMouseUp = () => setCursorState(prev => ({ ...prev, clicked: false }));
    
    // Use event delegation for hover detection
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('[role="button"]');
      
      setCursorState(prev => {
        if (prev.hovered !== !!isInteractive) {
          return { ...prev, hovered: !!isInteractive };
        }
        return prev;
      });
    };
    
    // Add event listeners with passive option
    window.addEventListener('mousemove', updateCursorPosition, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    
    // Clean up
    return () => {
      document.documentElement.style.cursor = '';
      window.removeEventListener('mousemove', updateCursorPosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [cursorState.enabled]);

  // Don't render anything if disabled
  if (!cursorState.enabled) return null;

  // Dynamic cursor classes based on state
  const { clicked, hovered } = cursorState;
  const cursorSize = clicked ? 'w-5 h-5' : hovered ? 'w-10 h-10' : 'w-7 h-7';
  const dotSize = clicked ? 'w-1.5 h-1.5' : hovered ? 'w-2.5 h-2.5' : 'w-1 h-1';
  const cursorColor = theme === 'dark' ? 'border-blue-400' : 'border-blue-600';
  
  return (
    <div 
      ref={cursorOuterRef}
      className={`fixed pointer-events-none z-50 rounded-full border-2 ${cursorColor} ${cursorSize} 
                  flex items-center justify-center transition-[width,height] duration-200`}
      style={{ 
        transform: `translate3d(${cursorState.x}px, ${cursorState.y}px, 0) translate(-50%, -50%)`,
        mixBlendMode: theme === 'dark' ? 'exclusion' : 'normal',
        willChange: 'transform'
      }}
    >
      <div 
        ref={cursorDotRef}
        className={`rounded-full bg-blue-400 dark:bg-blue-600 ${dotSize} transition-all duration-200`}
      />
    </div>
  );
};

export default memo(CustomCursor);