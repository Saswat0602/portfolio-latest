import React, { lazy, useEffect, useState, Suspense, memo } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

// Lazy load components
const StarryBackground = lazy(() => import('./components/StarryBackground'));
const Hero = lazy(() => import('./sections/Hero'));
const About = lazy(() => import('./sections/About'));
const Experience = lazy(() => import('./sections/Experience'));
const Skills = lazy(() => import('./sections/Skills'));
const Projects = lazy(() => import('./sections/Projects'));
const Contact = lazy(() => import('./sections/Contact'));
const SplashCursor = lazy(() => import('./reactbits/SplashCursor'));

// Component priority groups
const PRIORITY = {
  CRITICAL: 0,   // Load immediately
  HIGH: 1,       // Load right after initial render
  MEDIUM: 2,     // Load shortly after
  LOW: 3         // Load last
};

const App: React.FC = () => {
  // Use a single state object to track loading progress
  const [loadingStage, setLoadingStage] = useState(PRIORITY.CRITICAL);
  const [sectionsInView, setSectionsInView] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');

          if (entry.target.id) {
            setSectionsInView(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        }
      });
    }, { threshold: 0.1 });

    // Observe all elements with the scroll-animate class
    document.querySelectorAll('.scroll-animate').forEach((el) => {
      observer.observe(el);
    });

    // Observe sections for component loading
    document.querySelectorAll('section[id]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Progressive loading based on a stage approach
  useEffect(() => {
    if (loadingStage === PRIORITY.CRITICAL) {
      // Move to next stage after initial render
      requestAnimationFrame(() => {
        setLoadingStage(PRIORITY.HIGH);
      });
    } else if (loadingStage < PRIORITY.LOW) {
      // Progress through stages with minimal delay
      const timer = setTimeout(() => {
        setLoadingStage(prevStage => prevStage + 1);
      }, loadingStage * 200); // Increasing delay based on priority

      return () => clearTimeout(timer);
    }
  }, [loadingStage]);

  // Render components based on loading stage
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
      <div className="relative min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors dark-transition">

        {shouldRender.background && (
          <Suspense fallback={null}>
            <StarryBackground />
          </Suspense>
        )}

        <Navbar />

        {shouldRender.splashCursor && (
          <Suspense fallback={null}>
            <SplashCursor />
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
    </ThemeProvider>
  );
};

export default memo(App);