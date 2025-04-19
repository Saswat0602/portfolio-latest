import React, { useRef, useEffect, useState, lazy, Suspense } from 'react';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import AnimatedSection from '../components/AnimatedSection';
import TextAnimation from '../components/TextAnimation';
import { useTheme } from '../hooks/useTheme';
import LaptopAnimation from '../components/LaptopAnimation';
// Lazy load heavy components
const MatrixCodeRain = lazy(() => import('../components/MatrixCodeRain'));
import userData from '../data/userData';
import { motion } from 'framer-motion';

// Real code from components for the background
const realHeroCode1 = ` return (
    <nav 
       'bg-transparent py-3'
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <a 
          href="#" 
          className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center"
        >
          <TextAnimation 
            text="Saswat.dev" 
            effect="pressure"
            className="animate-slide-in" 
          />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
        
              <TextAnimation 
                text={link.name} 
                effect="glow"
              />
            </a>
          ))}

          {/* Theme Toggle Button */}
          <button
            id="theme-toggle"
            onClick={toggleTheme}
            disabled={isTransitioning}
            className="p-2 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-gray-200 
                      hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors animate-fade-in"
            aria-label="Toggle theme"
          >
            
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <button
            id="theme-toggle-mobile"
            onClick={toggleTheme}
            disabled={isTransitioning}
            className="p-1.5 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-gray-200 
                    hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <FiSun size={18} className="transition-transform duration-300 hover:rotate-45" />
            ) : (
              <FiMoon size={18} className="transition-transform duration-300 hover:rotate-45" />
            )}
          </button>

          <button
            onClick={toggleMobileMenu}
            className="p-1.5 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-gray-200 
                    hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[56px] left-0 w-full h-auto max-h-[calc(100vh-56px)] overflow-auto 
                      bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg py-3 px-4 
                      animate-slide-up border-t border-gray-200 dark:border-slate-800 z-40">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );`;

const realHeroCode2 = `const TextAnimation: React.FC<TextAnimationProps> = ({ 
  text, 
  effect = "none",
  delay = 0,
  duration = 0.5,
  speed = 30,
  className = ""
}) => {
  const characters = Array.from(text);
  
  // Different animation variants based on effect
  const getVariants = () => {
    switch (effect) {
      case "fade":
        return {
          hidden: { opacity: 0 },
          visible: (i: number) => ({
            opacity: 1,
            transition: {
              delay: delay + i * 0.1,
              duration: 0.5
            }
          })
        };
      case "wave":
        return {
          hidden: { y: 0 },
          visible: (i: number) => ({
            y: [0, -10, 0],
            transition: {
              delay: delay + i * 0.05,
              duration: 0.8,
              times: [0, 0.5, 1],
              ease: "easeInOut"
            }
          })
        };`;

// Real code snippet component for Hero
const RealCodeSnippet: React.FC<{ code: string, opacity: number, top: number, left: number, width: number, fontSize: number }> = ({ 
  code, opacity, top, left, width, fontSize
}) => {
  return (
    <motion.pre 
      className="absolute font-mono opacity-0 text-blue-600/40 dark:text-blue-400/50 pointer-events-none overflow-hidden"
      style={{ 
        top: `${top}%`,
        left: `${left}%`,
        width: `${width}px`,
        lineHeight: '1.2',
        maxHeight: '400px',
        fontSize: `${fontSize}px`
      }}
      animate={{ 
        opacity: [0, opacity],
        y: [10, 0] 
      }}
      transition={{
        duration: 1,
        delay: Math.random() * 0.5,
      }}
    >
      {code}
    </motion.pre>
  );
};

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
    
    // Generate code snippets - reduce count for better performance
    const snippets = [];
    const snippetCount = 15; // Reduced from 10
    const codes = [realHeroCode1, realHeroCode2];
    
    for (let i = 0; i < snippetCount; i++) {
      const top = 5 + Math.random() * 80;
      const left = 5 + Math.random() * 90;
      const opacity = 0.2 + Math.random() * 0.15;
      const width = 150 + Math.random() * 200;
      const fontSize = 8 + Math.random() * 2;
      const code = codes[i % codes.length];
      
      snippets.push(
        <RealCodeSnippet 
          key={i} 
          code={code}
          opacity={opacity} 
          top={top} 
          left={left}
          width={width}
          fontSize={fontSize}
        />
      );
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