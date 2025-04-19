import { useEffect, useState, useRef, memo } from 'react';
import { useTheme } from '../hooks/useTheme';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const { theme } = useTheme();
  const positionRef = useRef({ x: 0, y: 0 });
  const requestRef = useRef<number | undefined>(undefined);
  const lastUpdateTimeRef = useRef(0);
  const [isEnabled, setIsEnabled] = useState(true);
  
  // Check if device is touch-based
  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      setIsEnabled(false);
    }
  }, []);
  
  // Don't render on touch devices to improve performance
  if (!isEnabled) return null;
  
  // Smoother animation with RAF and throttling
  const animateCursor = () => {
    const now = performance.now();
    // Throttle updates to 60fps
    if (now - lastUpdateTimeRef.current > 16 && cursorRef.current) {
      // Use transform for better performance
      cursorRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0) translate(-50%, -50%)`;
      lastUpdateTimeRef.current = now;
    }
    requestRef.current = requestAnimationFrame(animateCursor);
  };

  useEffect(() => {
    if (!isEnabled) return;
    
    // Use passive event listener for better performance and throttle updates
    const updatePosition = (e: MouseEvent) => {
      positionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);
    
    // Use event delegation instead of attaching listeners to all elements
    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'A' || target.tagName === 'BUTTON' || 
          target.closest('a') || target.closest('button'))) {
        setLinkHovered(true);
      } else {
        setLinkHovered(false);
      }
    };

    // Start animation loop
    requestRef.current = requestAnimationFrame(animateCursor);
    
    // Add event listeners with passive option for better performance
    window.addEventListener('mousemove', updatePosition, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    return () => {
      // Clean up
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'auto';
    };
  }, [isEnabled]);

  const cursorSize = clicked ? 'w-6 h-6' : linkHovered ? 'w-12 h-12' : 'w-8 h-8';
  const cursorColor = theme === 'dark' ? 'border-blue-400' : 'border-blue-600';
  
  return (
    <div 
      ref={cursorRef}
      className={`fixed pointer-events-none z-50 rounded-full border-2 ${cursorColor} 
                  ${cursorSize} transition-[width,height] duration-150
                  flex items-center justify-center will-change-transform`}
      style={{ 
        left: 0,
        top: 0,
        mixBlendMode: theme === 'dark' ? 'exclusion' : 'normal' 
      }}
    >
      <div 
        className={`rounded-full bg-blue-400 dark:bg-blue-600 
                   ${clicked ? 'w-2 h-2' : linkHovered ? 'w-3 h-3' : 'w-1 h-1'} 
                   opacity-70 transition-all duration-150`} 
      />
    </div>
  );
};

export default memo(CustomCursor); 