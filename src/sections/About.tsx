import React, { useState, useEffect } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import userData from '../data/userData';
import { motion } from 'framer-motion';
import { FiMapPin, FiMail, FiBook, FiAward } from 'react-icons/fi';

const About: React.FC = () => {
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [codeSnippets, setCodeSnippets] = useState<React.ReactNode[]>([]);

  // Generate code snippets similar to Hero section
  useEffect(() => {
    const generateCodeSnippets = () => {
      const snippets = [];
      const snippetCount = 6;
      
      for (let i = 0; i < snippetCount; i++) {
        const top = 5 + Math.random() * 80;
        const left = 5 + Math.random() * 90;
        const opacity = 0.1 + Math.random() * 0.1;
        const width = 150 + Math.random() * 200;
        const fontSize = 8 + Math.random() * 2;
        
        snippets.push(
          <motion.pre 
            key={i}
            className="absolute font-mono opacity-0 text-blue-600/40 dark:text-blue-400/50 pointer-events-none overflow-hidden"
            style={{ 
              top: `${top}%`,
              left: `${left}%`,
              width: `${width}px`,
              lineHeight: '1.2',
              maxHeight: '300px',
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
            {`function aboutMe() {
  return {
    name: "${userData.name}",
    skills: ["React", "TypeScript", "UI/UX"],
    interests: ["Web Dev", "Design", "Technology"]
  };
}`}
          </motion.pre>
        );
      }
      
      setCodeSnippets(snippets);
    };
    
    generateCodeSnippets();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-slate-900 overflow-hidden relative">
      {/* Code background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {codeSnippets}
      </div>
      
      {/* Animated background elements similar to Hero */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
          {[...Array(15)].map((_, index) => (
            <div
              key={index}
              className="absolute w-1 h-1 rounded-full bg-blue-600 dark:bg-white reveal-on-theme-change"
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

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection className="mb-16 text-center">
          <h2 className="section-heading text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 relative inline-block group">
            About Me
            <span className="absolute -bottom-2 left-0 w-0 h-1 bg-blue-600 dark:bg-blue-400 group-hover:w-full transition-all duration-500"></span>
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <AnimatedSection direction="right" className="order-2 md:order-1">
            <motion.div 
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h3 
                className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 relative inline-block"
                variants={itemVariants}
              >
                {userData.about.current_position}
              </motion.h3>
              
              <motion.p 
                className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors duration-300"
                variants={itemVariants}
              >
                {userData.about.description}
              </motion.p>
              
              <motion.p 
                className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors duration-300"
                variants={itemVariants}
              >
                {userData.about.description2}
              </motion.p>

              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6"
                variants={itemVariants}
              >
                <motion.div 
                  className="flex items-center group hover:bg-blue-50 dark:hover:bg-blue-900/10 p-2 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  whileHover={{ y: -5 }}
                >
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/30 transition-colors duration-300 group-hover:rotate-12 transform">
                    <FiMapPin className="group-hover:animate-pulse" />
                  </div>
                  <span className="text-sm md:text-base text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {userData.about.location}
                  </span>
                </motion.div>
                <motion.div 
                  className="flex items-center group hover:bg-blue-50 dark:hover:bg-blue-900/10 p-2 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  whileHover={{ y: -5 }}
                >
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/30 transition-colors duration-300 group-hover:rotate-12 transform">
                    <FiMail className="group-hover:animate-pulse" />
                  </div>
                  <span className="text-sm md:text-base text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {userData.about.email}
                  </span>
                </motion.div>
                <motion.div 
                  className="flex items-center group hover:bg-blue-50 dark:hover:bg-blue-900/10 p-2 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  whileHover={{ y: -5 }}
                >
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/30 transition-colors duration-300 group-hover:rotate-12 transform">
                    <FiBook className="group-hover:animate-pulse" />
                  </div>
                  <span className="text-sm md:text-base text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {userData.about.education.undergraduate}
                  </span>
                </motion.div>
                <motion.div 
                  className="flex items-center group hover:bg-blue-50 dark:hover:bg-blue-900/10 p-2 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  whileHover={{ y: -5 }}
                >
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/30 transition-colors duration-300 group-hover:rotate-12 transform">
                    <FiAward className="group-hover:animate-pulse" />
                  </div>
                  <span className="text-sm md:text-base text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {userData.about.education.postgraduate}
                  </span>
                </motion.div>
              </motion.div>

              <motion.a 
                href="#contact" 
                className="inline-block mt-6 px-6 md:px-8 py-2 md:py-3 bg-blue-600 text-white font-medium rounded-full
                        transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg group relative overflow-hidden"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                <span className="relative z-10">Let's Talk</span>
              </motion.a>
            </motion.div>
          </AnimatedSection>

          <AnimatedSection direction="left" className="order-1 md:order-2">
            <div className="relative max-w-xs mx-auto md:max-w-sm overflow-visible">
              {/* Animated decorative elements */}
              <motion.div 
                className="absolute -top-6 -left-6 w-16 md:w-20 h-16 md:h-20 bg-blue-200 dark:bg-blue-900/30 rounded-lg z-0" 
                animate={{ 
                  rotate: [0, 360], 
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              ></motion.div>
              <motion.div 
                className="absolute -bottom-6 -right-6 w-16 md:w-20 h-16 md:h-20 bg-purple-200 dark:bg-purple-900/30 rounded-lg z-0" 
                animate={{ 
                  rotate: [0, -360], 
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              ></motion.div>
              <motion.div 
                className="absolute top-1/4 -right-4 md:-right-8 w-8 md:w-12 h-8 md:h-12 bg-green-200 dark:bg-green-900/30 rounded-full z-0" 
                animate={{ 
                  y: [0, 15, 0],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              ></motion.div>
              <motion.div 
                className="absolute bottom-1/4 -left-4 md:-left-8 w-8 md:w-12 h-8 md:h-12 bg-pink-200 dark:bg-pink-900/30 rounded-full z-0" 
                animate={{ 
                  y: [0, -15, 0],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 3
                }}
              ></motion.div>
              
              {/* Profile image container with enhanced animated border */}
              <motion.div 
                className="relative z-10 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 p-1.5 shadow-xl"
                onMouseEnter={() => setIsImageHovered(true)}
                onMouseLeave={() => setIsImageHovered(false)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  rotate: [0, 2, 0, -2, 0],
                }}
                transition={{
                  duration: 0.6,
                  scale: { duration: 0.6 },
                  rotate: {
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                whileHover={{ scale: 1.03 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 animate-pulse opacity-80" 
                  style={{ animationDuration: '3s' }}
                ></motion.div>
                <div className="relative aspect-square bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden">
                  {/* Laptop image from Unsplash */}
                  <img 
                    src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop" 
                    alt="Laptop on desk"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay on hover */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-blue-600/90 to-purple-600/80 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isImageHovered ? 0.9 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.span 
                      className="text-white font-medium text-lg"
                      initial={{ scale: 0 }}
                      animate={{ scale: isImageHovered ? 1 : 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    >
                      Web Developer
                    </motion.span>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default About; 