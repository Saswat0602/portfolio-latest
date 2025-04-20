import React, { useEffect, useRef, useState, memo } from 'react';
import { useTheme } from '../hooks/useTheme';

const LaptopAnimation: React.FC = () => {
  const { theme, isTransitioning } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const codeElementsRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  
  // Reduced array of tech words for better performance
  const techWords = [
    'React', 'TypeScript', 'Node.js', 'JavaScript',
    'HTML5', 'CSS3', 'Tailwind', 'Next.js'
  ];
  
  // Track if laptop is in viewport for animations
  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
    
    observer.observe(containerRef.current);
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  // Handle laptop rotation based on mouse movement
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isInView) return;
    
    let rotationX = 0;
    let rotationY = 0;
    const maxRotation = 5; // Reduced max degrees to rotate
    let lastUpdateTime = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      // Don't animate during theme transition
      if (isTransitioning) return;
      
      const now = performance.now();
      // Throttle mouse move updates to 30fps for better performance
      if (now - lastUpdateTime < 33) {
        return;
      }
      lastUpdateTime = now;
      
      // Calculate mouse position relative to the center of the container
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate rotation based on mouse position
      rotationY = ((e.clientX - centerX) / (rect.width / 2)) * maxRotation;
      rotationX = -((e.clientY - centerY) / (rect.height / 2)) * maxRotation;
      
      // Apply rotation to laptop
      const laptop = container.querySelector('.laptop') as HTMLElement;
      if (laptop) {
        laptop.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
      }
      
      // Move code elements in opposite direction slightly for parallax effect
      // Only update if in view
      const codeElements = codeElementsRef.current;
      if (codeElements) {
        const codeBlocks = codeElements.querySelectorAll('.code-block');
        codeBlocks.forEach((block, index) => {
          const el = block as HTMLElement;
          const factor = 1 + (index % 3) * 0.1; // Reduced movement factors
          const xOffset = -rotationY * factor * 0.3; // Reduced movement multiplier
          const yOffset = -rotationX * factor * 0.3;
          el.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
      }
    };
    
    // Reduced event handler with passive option for better performance
    if (isInView) {
      document.addEventListener('mousemove', handleMouseMove, { passive: true });
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isTransitioning, isInView]);
  
  // Create glowing tech words that animate around the laptop
  const renderTechWords = () => {
    // Reduce number of rendered words
    return techWords.map((word, index) => {
      const delay = index * 0.5;
      const duration = 15 + Math.random() * 20;
      const size = 0.6 + Math.random() * 0.5;
      
      return (
        <div
          key={word}
          className={`absolute whitespace-nowrap text-xs font-mono font-semibold rounded px-2 py-1
                    ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} 
                    opacity-0 animate-float-word`}
          style={{
            animation: `floatWord ${duration}s ease-in-out infinite, fadeInOut ${duration}s ease-in-out infinite`,
            animationDelay: `${delay}s`,
            transform: `scale(${size})`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            textShadow: theme === 'dark' 
              ? '0 0 5px rgba(96, 165, 250, 0.7)' 
              : '0 0 5px rgba(37, 99, 235, 0.7)',
          }}
        >
          {word}
        </div>
      );
    });
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full max-w-md h-80 mx-auto perspective-1000 mt-8 mb-10 transition-opacity duration-500
                 ${isInView ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Floating code elements - only render when in view */}
      {isInView && (
        <div 
          ref={codeElementsRef}
          className="absolute inset-0 overflow-hidden pointer-events-none"
        >
          {/* Reduced number of code blocks */}
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`code-block absolute rounded-md p-2 text-xs font-mono
                        ${theme === 'dark' ? 'bg-slate-800/40' : 'bg-gray-100/70'} 
                        backdrop-blur-sm shadow-lg border-l-2
                        ${theme === 'dark' ? 'border-blue-500' : 'border-blue-600'}
                        transition-colors duration-300`}
              style={{
                left: `${15 + Math.random() * 70}%`,
                top: `${15 + Math.random() * 70}%`,
                width: `${80 + Math.random() * 100}px`,
                height: `${30 + Math.random() * 30}px`,
                transform: 'translateZ(0px)',
                zIndex: i % 2 === 0 ? -1 : 10,
                opacity: 0.7 + Math.random() * 0.3,
                transitionDelay: `${i * 50}ms`,
                willChange: 'transform',
              }}
            >
              <div className={`${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} transition-colors duration-300`}>
                {'{'}
                <span className={`${theme === 'dark' ? 'text-green-400' : 'text-green-600'} transition-colors duration-300`}>code</span>
                {'}'}
              </div>
            </div>
          ))}
          
          {/* Tech words that float around */}
          {renderTechWords()}
        </div>
      )}

      {/* Laptop container with 3D effect */}
      <div className="laptop preserve-3d transition-all duration-300 ease-out" style={{ transformStyle: 'preserve-3d' }}>
        {/* Laptop screen */}
        <div className={`relative rounded-t-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-300'} w-full aspect-video p-2 preserve-3d transition-colors duration-300`}
             style={{ transformStyle: 'preserve-3d', transform: 'translateZ(20px)' }}>
          {/* Screen content */}
          <div className={`w-full h-full rounded overflow-hidden ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'} relative transition-colors duration-300`}>
            {/* Code editor style screen */}
            <div className="absolute top-0 left-0 w-full h-8 flex items-center px-2 space-x-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            
            <div className="mt-8 p-4 text-xs font-mono h-full overflow-hidden">
              <div className={`${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} transition-colors duration-300`}>
                <span className={`${theme === 'dark' ? 'text-pink-400' : 'text-pink-600'} transition-colors duration-300`}>const</span> Portfolio = () =&gt; {'{'}
              </div>
              <div className="ml-4 mt-1">
                <span className={`${theme === 'dark' ? 'text-pink-400' : 'text-pink-600'} transition-colors duration-300`}>return</span> (
              </div>
              <div className="ml-8 mt-1">
                &lt;<span className={`${theme === 'dark' ? 'text-green-400' : 'text-green-600'} transition-colors duration-300`}>div</span> 
                <span className={`${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'} transition-colors duration-300`}> className</span>=
                <span className={`${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} transition-colors duration-300`}>"container"</span>&gt;
              </div>
              <div className="ml-12 mt-1">
                &lt;<span className={`${theme === 'dark' ? 'text-green-400' : 'text-green-600'} transition-colors duration-300`}>h1</span>&gt;
                <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} animate-pulse transition-colors duration-300`}>Hello World!</span>
                &lt;/<span className={`${theme === 'dark' ? 'text-green-400' : 'text-green-600'} transition-colors duration-300`}>h1</span>&gt;
              </div>
              <div className="ml-12 mt-1">
                &lt;<span className={`${theme === 'dark' ? 'text-green-400' : 'text-green-600'} transition-colors duration-300`}>p</span>&gt;
                <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>Welcome to my portfolio</span>
                &lt;/<span className={`${theme === 'dark' ? 'text-green-400' : 'text-green-600'} transition-colors duration-300`}>p</span>&gt;
              </div>
              <div className="ml-8 mt-1">
                &lt;/<span className={`${theme === 'dark' ? 'text-green-400' : 'text-green-600'} transition-colors duration-300`}>div</span>&gt;
              </div>
              <div className="ml-4 mt-1">);</div>
              <div className="mt-1">{'};'}</div>
              <div className="mt-4">
                <span className={`${theme === 'dark' ? 'text-pink-400' : 'text-pink-600'} transition-colors duration-300`}>export default</span> Portfolio;
              </div>
            </div>
            
            {/* Cursor */}
            <div className="absolute bottom-10 left-[220px] w-2 h-4 bg-blue-500 opacity-70 animate-cursor-blink"></div>
          </div>
        </div>
        
        {/* Laptop base */}
        <div 
          className={`rounded-b-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} w-full h-3 origin-top transition-colors duration-300`}
          style={{ transform: 'rotateX(-60deg) translateZ(10px) translateY(3px)', transformStyle: 'preserve-3d' }}
        >
          {/* Laptop base details */}
          <div className="w-8 h-1 rounded-full mx-auto my-1 bg-gray-600"></div>
        </div>
        
        {/* Reduced shadow intensity */}
        <div className={`absolute -bottom-8 left-0 w-full h-6 bg-gradient-to-t from-transparent 
                        ${theme === 'dark' ? 'to-blue-500/5' : 'to-black/5'}
                        rounded-full blur-md transform scale-75 transition-colors duration-300`}></div>
      </div>
    </div>
  );
};

export default memo(LaptopAnimation); 