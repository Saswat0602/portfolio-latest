import React, { lazy, useEffect, useState, Suspense, memo } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './sections/Footer';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
// import SplashCursor from './reactbits/SplashCursor';

const StarryBackground = lazy(() => import('./components/StarryBackground'));
const Hero = lazy(() => import('./sections/Hero'));
const About = lazy(() => import('./sections/About'));
const Experience = lazy(() => import('./sections/Experience'));
const Skills = lazy(() => import('./sections/Skills'));
const Projects = lazy(() => import('./sections/Projects'));
const Contact = lazy(() => import('./sections/Contact'));

const PRIORITY = {
  CRITICAL: 0,
  HIGH: 1,
  MEDIUM: 2,
  LOW: 3
};

const App: React.FC = () => {
  const [loadingStage, setLoadingStage] = useState(PRIORITY.CRITICAL);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (loadingStage === PRIORITY.CRITICAL) {
      requestAnimationFrame(() => {
        setLoadingStage(PRIORITY.HIGH);
      });
    } else if (loadingStage < PRIORITY.LOW) {
      const timer = setTimeout(() => {
        setLoadingStage(prevStage => prevStage + 1);
      }, loadingStage * 150);
      
      return () => clearTimeout(timer);
    } else if (loadingStage === PRIORITY.LOW) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [loadingStage]);

  useEffect(() => {
    const preloadComponents = async () => {
      try {
        await Promise.all([
          import('./sections/Hero'),
          import('./sections/About')
        ]);
        
        Promise.all([
          import('./components/StarryBackground'),
          import('./sections/Experience'),
          import('./sections/Skills'),
          import('./sections/Projects'),
          import('./sections/Contact')
        ]);
      } catch (error) {
        console.error('Error preloading components:', error);
      }
    };
    
    preloadComponents();
  }, []);

  const shouldRender = {
    hero: loadingStage >= PRIORITY.HIGH,
    about: loadingStage >= PRIORITY.HIGH,
    experience: loadingStage >= PRIORITY.MEDIUM,
    background: loadingStage >= PRIORITY.MEDIUM,
    skills: loadingStage >= PRIORITY.MEDIUM,
    projects: loadingStage >= PRIORITY.MEDIUM,
    contact: loadingStage >= PRIORITY.LOW,
    splashCursor: loadingStage >= PRIORITY.LOW
  };

  return (
    <ThemeProvider>
      {isLoading ? (
        <LoadingScreen finishLoading={() => setIsLoading(false)} />
      ) : (
        <div className="relative min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors dark-transition">
          {shouldRender.background && (
            <Suspense fallback={null}>
              <StarryBackground />
            </Suspense>
          )}

          <Navbar />

          {shouldRender.splashCursor && (
            <Suspense fallback={null}>
              {/* <SplashCursor/> */}
              <CustomCursor />
            </Suspense>
          )}

          <main className="relative z-10">
            <Suspense fallback={<div className="h-screen"></div>}>
              {shouldRender.hero && <Hero />}
            </Suspense>

            <Suspense fallback={null}>
              {shouldRender.about && <About />}
            </Suspense>

            <Suspense fallback={null}>
              {shouldRender.experience && <Experience />}
            </Suspense>

            <Suspense fallback={null}>
              {shouldRender.skills && <Skills />}
            </Suspense>

            <Suspense fallback={null}>
              {shouldRender.projects && <Projects />}
            </Suspense>

            <Suspense fallback={null}>
              {shouldRender.contact && <Contact />}
            </Suspense>
          </main>

          <Footer />
        </div>
      )}
    </ThemeProvider>
  );
};

export default memo(App);
