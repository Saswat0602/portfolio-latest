import React, { useRef, useEffect, useState } from 'react';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import AnimatedSection from '../components/AnimatedSection';
import TextAnimation from '../components/TextAnimation';
import { useTheme } from '../hooks/useTheme';
import LaptopAnimation from '../components/LaptopAnimation';
import MatrixCodeRain from '../components/MatrixCodeRain';
import userData from '../data/userData';
import { motion } from 'framer-motion';

// Real code from components for the background
const realHeroCode1 = `import React, { useRef, useEffect } from 'react';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import AnimatedSection from '../components/AnimatedSection';
import TextAnimation from '../components/TextAnimation';
import { useTheme } from '../hooks/useTheme';
import LaptopAnimation from '../components/LaptopAnimation';
import MatrixCodeRain from '../components/MatrixCodeRain';
import userData from '../data/userData';

const Hero: React.FC = () => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
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
          
          element.style.transform = \`translate(\${offsetX}px, \${offsetY}px)\`;
        });
      }
    };`;

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
  
  useEffect(() => {
    // Generate code snippets
    const snippets = [];
    const snippetCount = 10;
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
  }, []);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
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
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Generate random string for glitch effect
  const generateRandomString = (length: number) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };
  
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
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {codeSnippets}
      </div>
      
      {/* Matrix Code Rain */}
      {theme === 'dark' && <MatrixCodeRain speed={0.8} opacity={0.15} />}
      
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
        
        {/* New animated particles */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(25)].map((_, index) => (
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
                <span 
                  className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400 glitch-effect reveal-on-theme-change" 
                  data-text={userData.name}
                >
                  {userData.name}
                </span>
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={0.1} duration={0.8}>
              <h2 className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 reveal-on-theme-change">
                <TextAnimation 
                  text={userData.introduction}
                  effect="wave"
                />
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.2} duration={0.8}>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-xl mb-6 sm:mb-8 reveal-on-theme-change">
                <TextAnimation 
                  text={window.innerWidth < 640 ? 
                    userData.about.description : 
                    `${userData.about.description} ${userData.about.description2}`}
                  effect="typewriter"
                  speed={15}
                />
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.3} duration={0.8}>
              <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8 justify-center md:justify-start">
                <button 
                  onClick={scrollToProjects}
                  className="px-6 sm:px-8 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-medium rounded-full
                              transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg 
                              relative overflow-hidden group reveal-on-theme-change"
                >
                  <span className="relative z-10">View My Work</span>
                  <span className="absolute top-0 left-0 w-full h-0 bg-blue-800 transition-all duration-300 
                                 group-hover:h-full z-0"></span>
                </button>
                <a 
                  href="#contact" 
                  className="px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400
                           text-sm sm:text-base font-medium rounded-full hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-slate-900
                             transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg
                             relative overflow-hidden group reveal-on-theme-change"
                >
                  <span className="relative z-10">Contact Me</span>
                  <span className="absolute top-0 left-0 w-0 h-full bg-blue-600 dark:bg-blue-400 transition-all duration-300 
                                 group-hover:w-full z-0"></span>
                </a>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4} duration={0.8}>
              <div className="flex space-x-6 justify-center md:justify-start reveal-on-theme-change">
                <a 
                  href={userData.footer.socialLinks[0].href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 
                            transition-all duration-300 transform hover:scale-125"
                  aria-label="GitHub"
                >
                  <FiGithub size={22} />
                </a>
                <a 
                  href={userData.footer.socialLinks[1].href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 
                            transition-all duration-300 transform hover:scale-125"
                  aria-label="LinkedIn"
                >
                  <FiLinkedin size={22} />
                </a>
                <a 
                  href={`mailto:${userData.about.email}`} 
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 
                            transition-all duration-300 transform hover:scale-125"
                  aria-label="Email"
                >
                  <FiMail size={22} />
                </a>
              </div>
            </AnimatedSection>
          </div>
          
          {/* Laptop Animation - Hidden on very small screens, smaller on mobile */}
          <div className="flex-1 w-full max-w-[280px] sm:max-w-none reveal-on-theme-change">
            <AnimatedSection direction="right" delay={0.5} duration={1.2}>
              <LaptopAnimation />
            </AnimatedSection>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce reveal-on-theme-change">
        <div className="w-5 h-8 sm:w-6 sm:h-10 rounded-full border-2 border-gray-400 dark:border-gray-600 flex justify-center
                      transition-all duration-300 hover:border-blue-500 dark:hover:border-blue-400">
          <div className="w-1 h-2 sm:h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2 animate-pulse
                         transition-all duration-300 hover:bg-blue-500 dark:hover:bg-blue-400"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 