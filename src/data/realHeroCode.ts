export const realHeroCode1 = ` return (
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

export const realHeroCode2 = `const TextAnimation: React.FC<TextAnimationProps> = ({ 
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