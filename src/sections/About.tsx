import React, { useState } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import userData from '../data/userData';
import { motion } from 'framer-motion';
import { FiMapPin, FiMail, FiBook, FiAward } from 'react-icons/fi';

const About: React.FC = () => {
  const [isImageHovered, setIsImageHovered] = useState(false);

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
    <section id="about" className="py-20 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4">
        <AnimatedSection className="mb-16 text-center">
          <h2 className="section-heading text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 relative inline-block group">
            About Me
            <span className="absolute -bottom-2 left-0 w-0 h-1 bg-blue-600 dark:bg-blue-400 group-hover:w-full transition-all duration-500"></span>
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <AnimatedSection direction="right" className="order-2 md:order-1">
            <motion.div 
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h3 
                className="text-2xl font-bold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 relative inline-block"
                variants={itemVariants}
              >
                {userData.about.current_position}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 hover:w-full transition-all duration-500"></span>
              </motion.h3>
              
              <motion.p 
                className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors duration-300 group cursor-default relative"
                variants={itemVariants}
              >
                {userData.about.description}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-100 dark:bg-blue-900/50 group-hover:w-full transition-all duration-700"></span>
              </motion.p>
              
              <motion.p 
                className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors duration-300 group cursor-default relative"
                variants={itemVariants}
              >
                {userData.about.description2}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-100 dark:bg-blue-900/50 group-hover:w-full transition-all duration-700"></span>
              </motion.p>

              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6"
                variants={itemVariants}
              >
                <div className="flex items-center group hover:bg-blue-50 dark:hover:bg-blue-900/10 p-2 rounded-lg transition-all duration-300 transform hover:scale-105">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/30 transition-colors duration-300 group-hover:rotate-12 transform">
                    <FiMapPin className="group-hover:animate-pulse" />
                  </div>
                  <span className="text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 relative">
                    {userData.about.location}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </div>
                <div className="flex items-center group hover:bg-blue-50 dark:hover:bg-blue-900/10 p-2 rounded-lg transition-all duration-300 transform hover:scale-105">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/30 transition-colors duration-300 group-hover:rotate-12 transform">
                    <FiMail className="group-hover:animate-pulse" />
                  </div>
                  <span className="text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 relative">
                    {userData.about.email}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </div>
                <div className="flex items-center group hover:bg-blue-50 dark:hover:bg-blue-900/10 p-2 rounded-lg transition-all duration-300 transform hover:scale-105">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/30 transition-colors duration-300 group-hover:rotate-12 transform">
                    <FiBook className="group-hover:animate-pulse" />
                  </div>
                  <span className="text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 relative">
                    {userData.about.education.undergraduate}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </div>
                <div className="flex items-center group hover:bg-blue-50 dark:hover:bg-blue-900/10 p-2 rounded-lg transition-all duration-300 transform hover:scale-105">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/30 transition-colors duration-300 group-hover:rotate-12 transform">
                    <FiAward className="group-hover:animate-pulse" />
                  </div>
                  <span className="text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 relative">
                    {userData.about.education.postgraduate}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </div>
              </motion.div>

              <motion.a 
                href="#contact" 
                className="inline-block mt-4 px-8 py-3 bg-blue-600 text-white font-medium rounded-full
                        transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg group relative overflow-hidden"
                variants={itemVariants}
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                <span className="relative z-10">Let's Talk</span>
              </motion.a>
            </motion.div>
          </AnimatedSection>

          <AnimatedSection direction="left" className="order-1 md:order-2">
            <div className="relative max-w-sm mx-auto md:max-w-xs">
              {/* Animated decorative elements */}
              <motion.div 
                className="absolute -top-4 -left-4 w-16 h-16 bg-blue-200 dark:bg-blue-900/30 rounded-lg z-0" 
                animate={{ 
                  rotate: [0, 360], 
                  scale: [1, 1.1, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              ></motion.div>
              <motion.div 
                className="absolute -bottom-4 -right-4 w-16 h-16 bg-purple-200 dark:bg-purple-900/30 rounded-lg z-0" 
                animate={{ 
                  rotate: [0, -360], 
                  scale: [1, 1.1, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              ></motion.div>
              
              {/* Profile image container with animated border */}
              <div 
                className="relative z-10 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 p-1 shadow-xl transform transition duration-500 hover:scale-105 group"
                onMouseEnter={() => setIsImageHovered(true)}
                onMouseLeave={() => setIsImageHovered(false)}
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
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/90 to-purple-600/80 opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-medium text-lg scale-0 group-hover:scale-100 transition-transform duration-300">Web Developer</span>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default About; 