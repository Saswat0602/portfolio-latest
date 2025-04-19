import React, { useRef, useEffect, useState, lazy, Suspense } from 'react';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import AnimatedSection from '../components/AnimatedSection';
import TextAnimation from '../components/TextAnimation';
import { useTheme } from '../hooks/useTheme';
import LaptopAnimation from '../components/LaptopAnimation';
// Lazy load heavy components
const MatrixCodeRain = lazy(() => import('../components/MatrixCodeRain'));
import userData from '../data/userData';
import { realHeroCode1, realHeroCode2 } from '../data/realHeroCode';
import RealCodeSnippet from '../widget/RealCodeSnippet';



const Hero: React.FC = () => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [codeSnippets, setCodeSnippets] = useState<React.ReactNode[]>([]);
  const [showMatrixRain, setShowMatrixRain] = useState(false);
  const [isClientSide, setIsClientSide] = useState(false);
  
  // Set client-side rendering flag
  useEffect(() => {
    setIsClientSide(true);
    
    // Delay loading matrix rain for better performance
    const timer = setTimeout(() => {
      setShowMatrixRain(true);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (!isClientSide) return;
    
    const snippets = [];
    const snippetsPerRow = 5; 
    const rowCount = 2;        
    const codes = [realHeroCode1, realHeroCode2];
    
    for (let row = 0; row < rowCount; row++) {
      const baseTop = 15 + (row * 30); 
      
      for (let i = 0; i < snippetsPerRow; i++) {
        const baseLeft = (i / snippetsPerRow) * 85; 
        
        const top = baseTop + (Math.random() * 10 - 5); 
        const left = baseLeft + (Math.random() * 10 - 5); 
        const opacity = 0.2 + Math.random() * 0.15;
        const width = 150 + Math.random() * 400;
        const fontSize = 8 + Math.random() * 2;
        const code = codes[(row * snippetsPerRow + i) % codes.length];
        
        snippets.push(
          <RealCodeSnippet 
            key={`${row}-${i}`} 
            code={code}
            opacity={opacity} 
            top={top} 
            left={left}
            width={width}
            fontSize={fontSize}
          />
        );
      }
    }
    
    setCodeSnippets(snippets);
  }, [isClientSide]);
  
  useEffect(() => {
    if (!isClientSide) return;
    
    // Throttle mouse move events for better performance
    let isThrottled = false;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (isThrottled) return;
      isThrottled = true;
      
      setTimeout(() => {
        isThrottled = false;
        
        if (containerRef.current) {
          mouseRef.current = {
            x: e.clientX / window.innerWidth,
            y: e.clientY / window.innerHeight,
          };
          
          const elements = containerRef.current.querySelectorAll('.floating-blob');
          elements.forEach((el) => {
            const element = el as HTMLElement;
            const speed = parseFloat(element.getAttribute('data-speed') || '0.05');
            const offsetX = (mouseRef.current.x - 0.5) * speed * 100;
            const offsetY = (mouseRef.current.y - 0.5) * speed * 100;
            
            element.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
          });
        }
      }, 16); // Approximately 60fps
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isClientSide]);
  
  
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-slate-900 dark:text-white reveal-on-theme-change"
    >
      {/* Code background */}
      {isClientSide && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {codeSnippets}
        </div>
      )}
      
      {/* Matrix Code Rain - lazy loaded */}
      {isClientSide && showMatrixRain && theme === 'dark' && (
        <Suspense fallback={null}>
          <MatrixCodeRain speed={0.8} opacity={0.15} />
        </Suspense>
      )}
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="floating-blob absolute top-1/4 -left-20 w-80 h-80 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float reveal-on-theme-change"
          data-speed="0.05"
        ></div>
        <div 
          className="floating-blob absolute top-3/4 -right-20 w-96 h-96 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float reveal-on-theme-change" 
          style={{ animationDelay: '2s' }}
          data-speed="0.08"
        ></div>
        <div 
          className="floating-blob absolute top-1/2 left-1/3 w-64 h-64 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float reveal-on-theme-change" 
          style={{ animationDelay: '4s' }}
          data-speed="0.06"
        ></div>
        
        {/* Reduced animated particles */}
        {isClientSide && (
          <div className="absolute inset-0 opacity-30">
            {[...Array(12)].map((_, index) => (
              <div
                key={index}
                className={`absolute w-1 h-1 rounded-full ${
                  theme === 'dark' ? 'bg-white' : 'bg-blue-600'
                } reveal-on-theme-change`}
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `floatParticle ${3 + Math.random() * 5}s infinite ease-in-out`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col-reverse md:flex-row items-center">
          {/* Text content */}
          <div className="flex-1 text-center md:text-left mt-6 md:mt-0 md:mb-0">
            <AnimatedSection direction="down" duration={0.8}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4 relative inline-block reveal-on-theme-change">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
                  <TextAnimation 
                    text="Hi, I'm " 
                    effect="pressure"
                  />
                </span>
                <TextAnimation 
                  text={userData.name}
                  effect="pressure"
                  delay={0.8}
                />
              </h1>
              <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-4 reveal-on-theme-change">
                <TextAnimation 
                  text={userData.introduction}
                  effect="wave"
                  delay={1.3}
                />
              </h2>
           
              
              <div className="flex gap-4 flex-wrap justify-center md:justify-start">
                <a 
                  href="#contact" 
                  className="inline-block px-6 py-3 text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition-all hover:scale-105 transform-gpu active:scale-95 reveal-on-theme-change"
                >
                  Get in Touch
                </a>
                <button
                  onClick={scrollToProjects}
                  className="inline-block px-6 py-3 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 rounded-lg shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all hover:scale-105 transform-gpu active:scale-95 reveal-on-theme-change"
                >
                  View My Work
                </button>
              </div>
              
              <div className="flex gap-6 mt-8 justify-center md:justify-start reveal-on-theme-change">
                <a 
                  href={userData.footer.socialLinks[0].href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-2xl transition-colors"
                  aria-label="GitHub"
                >
                  <FiGithub />
                </a>
                <a 
                  href={userData.footer.socialLinks[1].href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-2xl transition-colors"
                  aria-label="LinkedIn"
                >
                  <FiLinkedin />
                </a>
                <a 
                  href={`mailto:${userData.about.email}`}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-2xl transition-colors"
                  aria-label="Email"
                >
                  <FiMail />
                </a>
              </div>
            </AnimatedSection>
          </div>
          
          {/* Right side - Laptop animation */}
          <div className="flex-1 md:pl-8 flex justify-center">
            <LaptopAnimation />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 