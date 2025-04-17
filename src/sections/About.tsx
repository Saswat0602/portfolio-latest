import React from 'react';
import AnimatedSection from '../components/AnimatedSection';
import userData from '../data/userData';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <AnimatedSection className="mb-16 text-center">
          <h2 className="section-heading text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">About Me</h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <AnimatedSection direction="right" className="order-2 md:order-1">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                {userData.about.current_position}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors duration-300">
                {userData.about.description}
              </p>
              
              <p className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors duration-300">
                {userData.about.description2}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="flex items-center group">
                  <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 mr-2 group-hover:bg-blue-800 dark:group-hover:bg-blue-300 transition-colors duration-300"></div>
                  <span className="text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{userData.about.location}</span>
                </div>
                <div className="flex items-center group">
                  <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 mr-2 group-hover:bg-blue-800 dark:group-hover:bg-blue-300 transition-colors duration-300"></div>
                  <span className="text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{userData.about.email}</span>
                </div>
                <div className="flex items-center group">
                  <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 mr-2 group-hover:bg-blue-800 dark:group-hover:bg-blue-300 transition-colors duration-300"></div>
                  <span className="text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {userData.about.education.undergraduate}
                  </span>
                </div>
                <div className="flex items-center group">
                  <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 mr-2 group-hover:bg-blue-800 dark:group-hover:bg-blue-300 transition-colors duration-300"></div>
                  <span className="text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {userData.about.education.postgraduate}
                  </span>
                </div>
              </div>

              <a 
                href="#contact" 
                className="inline-block mt-4 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full
                         transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              >
                Let's Talk
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="left" className="order-1 md:order-2">
            <div className="relative max-w-sm mx-auto md:max-w-xs">
              {/* Decorative shapes for visual interest */}
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-blue-200 dark:bg-blue-900/30 rounded-lg z-0 animate-spin-slow"></div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-purple-200 dark:bg-purple-900/30 rounded-lg z-0 animate-spin-slow" style={{ animationDirection: 'reverse' }}></div>
              
              {/* Profile image container with animated border */}
              <div className="relative z-10 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 p-1 shadow-xl transform transition duration-500 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 animate-pulse opacity-80" style={{ animationDuration: '3s' }}></div>
                <div className="relative aspect-square bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden">
                  {/* Replace with actual laptop image from Unsplash */}
                  <img 
                    src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop" 
                    alt="Laptop on desk"
                    className="w-full h-full object-cover"
                  />
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