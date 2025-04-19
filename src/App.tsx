import React, { lazy, useEffect, useState, Suspense, memo } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
// Lazy load heavy components
const StarryBackground = lazy(() => import('./components/StarryBackground'));
import Hero from './sections/Hero';
import About from './sections/About';
import Experience from './sections/Experience';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

// Using React.lazy with priority for code splitting
const withPriorityLoading = (importFn: () => Promise<any>, priority = 'low') => {
  return lazy(() => {
    // For low priority components, delay loading
    if (priority === 'low') {
      return new Promise(resolve => {
        // Wait until after first paint + 2 seconds
        setTimeout(() => {
          importFn().then(resolve);
        }, 2000);
      });
    }
    return importFn();
  });
};

const SplashCursor = withPriorityLoading(() => import("./reactbits/SplashCursor"), 'low');

const App: React.FC = () => {
  const [showSplashCursor, setShowSplashCursor] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Mark as loaded after initial render
  useEffect(() => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setIsLoaded(true);
      });
    });
  }, []);

  // Lazy load splash cursor after page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplashCursor(true);
    }, 3000); // Increase delay to 3 seconds for better initial performance
    return () => clearTimeout(timer);
  }, []);

  // Add scroll observer for animations
  useEffect(() => {
    if (!isLoaded) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    // Observe all elements with the scroll-animate class
    document.querySelectorAll('.scroll-animate').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll('.scroll-animate').forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, [isLoaded]);

  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors dark-transition">
        <CustomCursor />
        <Suspense fallback={null}>
          {isLoaded && <StarryBackground />}
        </Suspense>
        <Navbar />
        
        {showSplashCursor && (
          <Suspense fallback={null}>
            <SplashCursor 
              DENSITY_DISSIPATION={5}
              SIM_RESOLUTION={64} 
              DYE_RESOLUTION={512} 
            />
          </Suspense>
        )}
        
        <main className="relative z-10">
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Projects />
          <Contact />
        </main>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default memo(App); 