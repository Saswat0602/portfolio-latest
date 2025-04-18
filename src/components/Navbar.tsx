import React, { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import TextAnimation from './TextAnimation';

const Navbar: React.FC = () => {
  const { theme, toggleTheme, isTransitioning } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md py-2 shadow-md' 
          : 'bg-transparent py-3'
      }`}
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
              className={`text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors 
                        font-medium text-sm animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
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
            style={{ animationDelay: `${navLinks.length * 0.1}s` }}
          >
            {theme === 'dark' ? (
              <FiSun size={20} className="transition-transform duration-300 hover:rotate-45" />
            ) : (
              <FiMoon size={20} className="transition-transform duration-300 hover:rotate-45" />
            )}
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
                className={`text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 
                          transition-colors px-3 py-2 rounded-md text-base font-medium`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 