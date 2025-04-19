import { useEffect, useRef, useState, memo } from 'react';
import { useTheme } from '../hooks/useTheme';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
}

const StarryBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isVisible, setIsVisible] = useState(true);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!ctx) return;

    // Set canvas size to match window
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();

    // Debounce resize for better performance
    let resizeTimeout: number;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        setCanvasSize();
        generateStars();
      }, 200);
    };

    window.addEventListener('resize', handleResize);

    // Create stars
    const stars: Star[] = [];
    
    const generateStars = () => {
      stars.length = 0; // Clear existing stars
      // Reduce star count for better performance
      const starCount = Math.min(
        Math.floor((window.innerWidth * window.innerHeight) / 3000),
        150 // Max stars - reduced from 300
      );

      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 0.01 + 0.005,
        });
      }
    };

    generateStars();
    
    let time = 0;

    // Use IntersectionObserver to only animate when visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );
    
    observer.observe(canvas);

    // Animation loop
    const animate = () => {
      if (!isVisible) {
        requestRef.current = requestAnimationFrame(animate);
        return;
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      time += 0.005; // Reduced animation speed for better performance
      
      stars.forEach((star) => {
        // Calculate twinkling effect
        const twinkle = Math.sin(time * star.twinkleSpeed * 10) * 0.5 + 0.5;
        let opacity = star.opacity * twinkle;
        
        // Lower opacity in light mode
        if (!isDark) {
          opacity *= 0.3;
        }
        
        // Use appropriate color based on theme
        const starColor = isDark ? 'rgba(255, 255, 255, ' : 'rgba(0, 0, 255, ';
        ctx.fillStyle = `${starColor}${opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      requestRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      observer.disconnect();
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isDark, isVisible]);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default memo(StarryBackground); 