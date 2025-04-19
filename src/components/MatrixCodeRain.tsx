import React, { useEffect, useState, memo, useRef } from 'react';

interface MatrixRainProps {
  speed?: number;
  density?: number;
  opacity?: number;
}

const MatrixCodeRain: React.FC<MatrixRainProps> = ({ 
  speed = 1,
  density = 30,
  opacity = 0.2
}) => {
  const [columns, setColumns] = useState<React.ReactNode[]>([]);
  const columnsRef = useRef<React.ReactNode[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Use IntersectionObserver to only render when visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );
    
    observer.observe(container);
    
    // Matrix characters (using tech-related symbols and characters)
    const chars = '01</>{}()[]#!?ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    
    // Create matrix rain columns
    const createRain = () => {
      if (!container) return;
      
      const screenWidth = window.innerWidth;
      // Increase density (reduce column count) for better performance
      const actualDensity = density * 1.5;
      // Limit maximum columns
      const maxColumns = Math.min(Math.floor(screenWidth / actualDensity), 50);
      
      const newColumns = [];
      
      for (let i = 0; i < maxColumns; i++) {
        // Random delay for staggered effect
        const delay = Math.random() * 8;
        // Random duration for varied speeds
        const duration = (5 + Math.random() * 5) / speed;
        // Random x position
        const xPos = (i * actualDensity) + Math.random() * 20;
        
        const column = (
          <div 
            key={i}
            className="code-rain"
            style={{
              position: 'absolute',
              left: `${xPos}px`,
              top: '-100px',
              fontFamily: 'monospace',
              fontSize: '12px',
              color: '#60a5fa',
              animation: `matrixRain ${duration}s linear ${delay}s infinite`,
              opacity: opacity,
              willChange: 'transform',
            }}
          >
            {/* Reduce character count per column */}
            {Array.from({ length: Math.min(8 + Math.floor(Math.random() * 12), 15) }, (_, j) => {
              // Get random character for each position
              const char = chars[Math.floor(Math.random() * chars.length)];
              // Lighter color for first character (head of the rain)
              const isHead = j === 0;
              
              return (
                <div 
                  key={j}
                  style={{ 
                    opacity: isHead ? 1 : 0.5 - (j * 0.03),
                    color: isHead ? '#ffffff' : undefined,
                    textShadow: isHead ? '0 0 8px #60a5fa, 0 0 12px #60a5fa' : undefined
                  }}
                >
                  {char}
                </div>
              );
            })}
          </div>
        );
        
        newColumns.push(column);
      }
      
      columnsRef.current = newColumns;
      setColumns(newColumns);
    };
    
    createRain();
    
    // Debounce resize event for better performance
    let resizeTimeout: number;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(createRain, 300);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [density, speed, opacity]);
  
  // Don't render when not visible
  if (!isVisible) {
    return <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none z-10"></div>;
  }
  
  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none z-10">
      {columns}
      
      {/* Add CSS animation */}
      <style>
        {`
        @keyframes matrixRain {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(100vh);
          }
        }
        `}
      </style>
    </div>
  );
};

export default memo(MatrixCodeRain); 