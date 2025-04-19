import React, { lazy, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import StarryBackground from './components/StarryBackground';
import Hero from './sections/Hero';
import About from './sections/About';
import Experience from './sections/Experience';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

const withPriorityLoading = (importFn: () => Promise<any>) => {
  return lazy(() => {
    const prefetchPromise = importFn();
    return prefetchPromise;
  });
};
const SplashCursor = withPriorityLoading(() => import("./reactbits/SplashCursor"));

const App: React.FC = () => {
  // Add scroll observer for animations
  useEffect(() => {
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
  }, []);

  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors dark-transition">
        <CustomCursor />
        <StarryBackground />
        <Navbar />
        <SplashCursor/>
        
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

export default App; 