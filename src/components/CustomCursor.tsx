import { useEffect, useState, useRef } from 'react';
import { useTheme } from '../hooks/useTheme';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const { theme } = useTheme();
  const positionRef = useRef({ x: 0, y: 0 });
  const requestRef = useRef<number | undefined>(undefined);
  
  // Smoother animation with RAF instead of state updates
  const animateCursor = () => {
    if (cursorRef.current) {
      // Use transform for better performance
      cursorRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0) translate(-50%, -50%)`;
    }
    requestRef.current = requestAnimationFrame(animateCursor);
  };

  useEffect(() => {
    // Use passive event listener for better performance
    const updatePosition = (e: MouseEvent) => {
      positionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);
    
    const handleLinkHoverEvents = () => {
      const elements = document.querySelectorAll('a, button');
      const handleEnter = () => setLinkHovered(true);
      const handleLeave = () => setLinkHovered(false);
      
      elements.forEach(el => {
        el.addEventListener('mouseenter', handleEnter, { passive: true });
        el.addEventListener('mouseleave', handleLeave, { passive: true });
      });
      
      return () => {
        elements.forEach(el => {
          el.removeEventListener('mouseenter', handleEnter);
          el.removeEventListener('mouseleave', handleLeave);
        });
      };
    };

    // Start animation loop
    requestRef.current = requestAnimationFrame(animateCursor);
    
    // Add event listeners with passive option for better performance
    window.addEventListener('mousemove', updatePosition, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    
    // Handle link/button hover events
    const cleanupHoverEvents = handleLinkHoverEvents();
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    return () => {
      // Clean up
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cleanupHoverEvents();
      document.body.style.cursor = 'auto';
    };
  }, []);

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

export default CustomCursor; 