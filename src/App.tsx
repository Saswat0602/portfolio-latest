import { lazy, useEffect, useState, Suspense, memo } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './sections/Footer';
import LoadingScreen from './components/LoadingScreen';

// Lazy-loaded components
const Hero = lazy(() => import('./sections/Hero'));
const About = lazy(() => import('./sections/About'));
const Experience = lazy(() => import('./sections/Experience'));
const Skills = lazy(() => import('./sections/Skills'));
const Projects = lazy(() => import('./sections/Projects'));
const Contact = lazy(() => import('./sections/Contact'));

// Component loading priority
const PRIORITY = {
  CRITICAL: 0,
  HIGH: 1,
  MEDIUM: 2,
  LOW: 3
};

// Detect mobile once on component mount rather than on every render
const App = () => {
  const [loadingStage, setLoadingStage] = useState(PRIORITY.CRITICAL);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [componentsReady, setComponentsReady] = useState(false);

  // Set mobile state once on mount
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    
    // Add resize listener for orientation changes
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Preload critical components and handle loading stages
  useEffect(() => {
    // Preload components in order of priority
    const preloadComponents = async () => {
      try {
        // Preload critical components first
        await Promise.all([
          import('./sections/Hero'),
          import('./sections/About')
        ]);
        setComponentsReady(true);
        
        // Then preload other components
        Promise.all([
          import('./sections/Experience'),
          import('./sections/Skills'),
          import('./sections/Projects'),
          import('./sections/Contact')
        ]);
      } catch (error) {
        console.error('Error preloading components:', error);
        // Still mark components as ready even if there's an error to prevent endless loading
        setComponentsReady(true);
      }
    };
    
    preloadComponents();
  }, []);

  // Progressive loading stage management
  useEffect(() => {
    if (loadingStage === PRIORITY.CRITICAL) {
      // Start loading immediately
      requestAnimationFrame(() => {
        setLoadingStage(PRIORITY.HIGH);
      });
    } else if (loadingStage < PRIORITY.LOW) {
      // Progress through loading stages with increasing delays
      const timer = setTimeout(() => {
        setLoadingStage(prevStage => prevStage + 1);
      }, loadingStage * 150);
      
      return () => clearTimeout(timer);
    }
  }, [loadingStage]);

  // Handle loading completion
  const handleFinishLoading = () => {
    // Only finish loading if critical components are ready
    if (componentsReady) {
      setIsLoading(false);
    } else {
      // If components aren't ready yet, wait a bit and check again
      const checkReadyInterval = setInterval(() => {
        if (componentsReady) {
          setIsLoading(false);
          clearInterval(checkReadyInterval);
        }
      }, 100);
      
      // Safety timeout to prevent infinite loading
      setTimeout(() => {
        clearInterval(checkReadyInterval);
        setIsLoading(false);
      }, 3000);
    }
  };

  // Determine which components should render based on loading stage
  const shouldRender = {
    hero: loadingStage >= PRIORITY.HIGH,
    about: loadingStage >= PRIORITY.HIGH,
    experience: loadingStage >= PRIORITY.MEDIUM,
    skills: loadingStage >= PRIORITY.MEDIUM,
    projects: loadingStage >= PRIORITY.MEDIUM,
    contact: loadingStage >= PRIORITY.LOW
  };

  return (
    <ThemeProvider>
      {isLoading ? (
        <LoadingScreen finishLoading={handleFinishLoading} />
      ) : (
        <div className="relative min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors dark-transition">
          <Navbar />

          <main className="relative z-10">
            <Suspense fallback={<div className="h-screen flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>}>
              {shouldRender.hero && <Hero isMobile={isMobile} />}
            </Suspense>

            <Suspense fallback={<div className="h-32"></div>}>
              {shouldRender.about && <About />}
            </Suspense>

            <Suspense fallback={<div className="h-32"></div>}>
              {shouldRender.experience && <Experience />}
            </Suspense>

            <Suspense fallback={<div className="h-32"></div>}>
              {shouldRender.skills && <Skills isMobile={isMobile} />}
            </Suspense>

            <Suspense fallback={<div className="h-32"></div>}>
              {shouldRender.projects && <Projects isMobile={isMobile} />}
            </Suspense>

            <Suspense fallback={<div className="h-32"></div>}>
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