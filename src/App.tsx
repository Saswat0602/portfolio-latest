import { lazy, useEffect, useState, Suspense, memo, useMemo } from 'react';
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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [componentsReady, setComponentsReady] = useState(false);
  const [fadeOutLoading, setFadeOutLoading] = useState(false);
  const [mainVisible, setMainVisible] = useState(false);

  // Combine background color and resize/preload logic
  useEffect(() => {
    document.body.style.backgroundColor = '#f8fafc';
    document.body.classList.add('transition-colors');
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    // Preload critical components
    const preload = async () => {
      try {
        await Promise.all([
          import('./sections/Hero'),
          import('./sections/About')
        ]);
        setComponentsReady(true);
        setTimeout(() => {
          import('./sections/Experience');
          import('./sections/Skills');
          import('./sections/Projects');
          import('./sections/Contact');
        }, 0);
      } catch {
        setComponentsReady(true);
      }
    };
    preload();
    return () => {
      document.body.style.backgroundColor = '';
      document.body.classList.remove('transition-colors');
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Loading stage management
  useEffect(() => {
    if (loadingStage === PRIORITY.CRITICAL) {
      requestAnimationFrame(() => setLoadingStage(PRIORITY.HIGH));
    } else if (loadingStage < PRIORITY.LOW) {
      const timer = setTimeout(() => setLoadingStage(prev => prev + 1), loadingStage * 150);
      return () => clearTimeout(timer);
    }
  }, [loadingStage]);

  // Handle loading completion with fade out
  const handleFinishLoading = () => {
    if (componentsReady) {
      setFadeOutLoading(true);
      setTimeout(() => setIsLoading(false), 400);
    } else {
      const checkReadyInterval = setInterval(() => {
        if (componentsReady) {
          setFadeOutLoading(true);
          setTimeout(() => setIsLoading(false), 400);
          clearInterval(checkReadyInterval);
        }
      }, 100);
      setTimeout(() => {
        clearInterval(checkReadyInterval);
        setFadeOutLoading(true);
        setTimeout(() => setIsLoading(false), 400);
      }, 2000);
    }
  };

  // Memoize shouldRender
  const shouldRender = useMemo(() => ({
    hero: loadingStage >= PRIORITY.HIGH,
    about: loadingStage >= PRIORITY.HIGH,
    experience: loadingStage >= PRIORITY.MEDIUM,
    skills: loadingStage >= PRIORITY.MEDIUM,
    projects: loadingStage >= PRIORITY.MEDIUM,
    contact: loadingStage >= PRIORITY.LOW
  }), [loadingStage]);

  // Show main content and footer together after loading
  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => setMainVisible(true), 50); // slight delay for fade
    } else {
      setMainVisible(false);
    }
  }, [isLoading]);

  return (
    <ThemeProvider>
      <main className="relative min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors dark-transition">
        {isLoading && (
          <div className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gray-50 dark:bg-slate-900 transition-opacity duration-400 ${fadeOutLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <LoadingScreen finishLoading={handleFinishLoading} />
          </div>
        )}
        {!isLoading && (
          <div className={`transition-opacity duration-500 ${mainVisible ? 'opacity-100' : 'opacity-0'}`}>
            <Navbar />
            <Suspense fallback={<div className="h-16 flex items-center justify-center"><div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>}>
              {shouldRender.hero && <Hero isMobile={isMobile} />}
            </Suspense>
            <Suspense fallback={<div className="h-8"></div>}>
              {shouldRender.about && <About />}
            </Suspense>
            <Suspense fallback={<div className="h-8"></div>}>
              {shouldRender.experience && <Experience />}
            </Suspense>
            <Suspense fallback={<div className="h-8"></div>}>
              {shouldRender.skills && <Skills isMobile={isMobile} />}
            </Suspense>
            <Suspense fallback={<div className="h-8"></div>}>
              {shouldRender.projects && <Projects isMobile={isMobile} />}
            </Suspense>
            <Suspense fallback={<div className="h-8"></div>}>
              {shouldRender.contact && <Contact />}
            </Suspense>
            <Footer />
          </div>
        )}
      </main>
    </ThemeProvider>
  );
};

export default memo(App);