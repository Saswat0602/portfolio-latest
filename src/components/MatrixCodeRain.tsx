import React, { useEffect, useState } from 'react';

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
  
  useEffect(() => {
    // Matrix characters (using tech-related symbols and characters)
    const chars = '01</>{}()[]#!?ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    
    // Create matrix rain columns
    const createRain = () => {
      const screenWidth = window.innerWidth;
      const numberOfColumns = Math.floor(screenWidth / density);
      
      const newColumns = [];
      
      for (let i = 0; i < numberOfColumns; i++) {
        // Random delay for staggered effect
        const delay = Math.random() * 8;
        // Random duration for varied speeds
        const duration = (5 + Math.random() * 5) / speed;
        // Random x position
        const xPos = (i * density) + Math.random() * 20;
        
        const column = (
          <div 
            key={i}
            className="code-rain"
            style={{
              left: `${xPos}px`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
              opacity: opacity
            }}
          >
            {Array.from({ length: 10 + Math.floor(Math.random() * 20) }, (_, j) => {
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
      
      setColumns(newColumns);
    };
    
    createRain();
    
    // Re-create on window resize
    window.addEventListener('resize', createRain);
    return () => window.removeEventListener('resize', createRain);
  }, [density, speed, opacity]);
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-10">
      {columns}
    </div>
  );
};

export default MatrixCodeRain; 