import React from 'react';
import AnimatedSection from '../components/AnimatedSection';
import userData from '../data/userData';
import { motion } from 'framer-motion';
import { FiMapPin, FiMail, FiBook, FiAward } from 'react-icons/fi';
import BackgroundElements from '../widget/BackgroundElements';
import { useCodeSnippets } from '../hooks/useCodeSnippets';
import AnimatedDecorative from '../components/AnimatedDecorative';

const About: React.FC = () => {
  const codeSnippets = useCodeSnippets(true);
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
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {codeSnippets}
      </div>

      <BackgroundElements />

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
                  className=" cursor-pointer flex items-center group hover:bg-blue-50 dark:hover:bg-blue-900/10 p-2 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  whileHover={{ y: -5 }}
                  onClick={() => window.open('https://www.google.com/maps/place/Bhubaneswar', '_blank')}

                >
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/30 transition-colors duration-300 group-hover:rotate-12 transform">
                    <FiMapPin className="group-hover:animate-pulse" />
                  </div>
                  <span className="text-sm md:text-base text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {userData.about.location}
                  </span>
                </motion.div>
                <motion.div
                  className="flex items-center group ... cursor-pointer"
                  whileHover={{ y: -5 }}
                  onClick={() =>
                    window.open(
                      `https://mail.google.com/mail/?view=cm&fs=1&to=${userData.about.email}`,
                      '_blank'
                    )
                  }
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
          <AnimatedDecorative />

        </div>
      </div>
    </section>
  );
};

export default About;