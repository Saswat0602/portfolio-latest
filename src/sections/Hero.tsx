import React, { useRef, useEffect } from 'react';
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
        <div className="flex flex-col md:flex-row items-center">
          {/* Text content */}
          <div className="flex-1 text-center md:text-left mb-8 md:mb-0">
            <AnimatedSection direction="down" duration={0.8}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 relative inline-block reveal-on-theme-change">
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
              <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 reveal-on-theme-change">
                <TextAnimation 
                  text={userData.introduction}
                  effect="wave"
                />
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.2} duration={0.8}>
              <p className="text-gray-600 dark:text-gray-400 max-w-xl mb-10 reveal-on-theme-change">
                <TextAnimation 
                  text={`${userData.about.description} ${userData.about.description2}`}
                  effect="typewriter"
                  speed={15}
                />
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.3} duration={0.8}>
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <button 
                  onClick={scrollToProjects}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full
                            transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg 
                            relative overflow-hidden group reveal-on-theme-change"
                >
                  <span className="relative z-10">View My Work</span>
                  <span className="absolute top-0 left-0 w-full h-0 bg-blue-800 transition-all duration-300 
                                 group-hover:h-full z-0"></span>
                </button>
                <a 
                  href="#contact" 
                  className="px-8 py-3 border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400
                           font-medium rounded-full hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-slate-900
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
                  <FiGithub size={24} />
                </a>
                <a 
                  href={userData.footer.socialLinks[1].href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 
                            transition-all duration-300 transform hover:scale-125"
                  aria-label="LinkedIn"
                >
                  <FiLinkedin size={24} />
                </a>
                <a 
                  href={`mailto:${userData.about.email}`} 
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 
                            transition-all duration-300 transform hover:scale-125"
                  aria-label="Email"
                >
                  <FiMail size={24} />
                </a>
              </div>
            </AnimatedSection>
          </div>
          
          {/* Laptop Animation */}
          <div className="flex-1 reveal-on-theme-change">
            <AnimatedSection direction="right" delay={0.5} duration={1.2}>
              <LaptopAnimation />
            </AnimatedSection>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce reveal-on-theme-change">
        <div className="w-6 h-10 rounded-full border-2 border-gray-400 dark:border-gray-600 flex justify-center
                      transition-all duration-300 hover:border-blue-500 dark:hover:border-blue-400">
          <div className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2 animate-pulse
                         transition-all duration-300 hover:bg-blue-500 dark:hover:bg-blue-400"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 