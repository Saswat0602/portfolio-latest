import React from 'react';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import AnimatedSection from '../components/AnimatedSection';
import userData from '../data/userData';
import BackgroundElements from '../widget/BackgroundElements';
import { useCodeSnippets } from '../hooks/useCodeSnippets';
import FormField from '../components/FormField';

const Contact: React.FC = () => {
  const codeSnippets = useCodeSnippets(true);


  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {codeSnippets}
      </div>

      <BackgroundElements />

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection className="mb-16 text-center">
          <h2 className="section-heading text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 relative inline-block group">
            Get In Touch
            <span className="absolute -bottom-2 left-0 w-0 h-1 bg-blue-600 dark:bg-blue-400 group-hover:w-full transition-all duration-500"></span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-4 hover:text-gray-800 dark:hover:text-white transition-colors duration-300">
            {userData.contact.message}
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          <AnimatedSection direction="right">
            <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-xl shadow-lg h-full hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-blue-100 dark:hover:shadow-blue-900/20 transform">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-6 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                Contact Information
              </h3>

              <div className="space-y-4 md:space-y-6">
                <div className="flex items-start group hover:bg-blue-50 dark:hover:bg-blue-900/10 p-3 rounded-lg transition-all duration-300">
                  <div className="shrink-0 bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full text-blue-600 dark:text-blue-400 mr-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/30 transition-colors duration-300 group-hover:scale-110 transform">
                    <FiMapPin size={18} className="group-hover:animate-bounce" />
                  </div>
                  <div>
                    <h4 className="text-base md:text-lg font-medium text-gray-800 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">Location</h4>
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">{userData.footer.contact.location}</p>
                  </div>
                </div>

                <div className="flex items-start group hover:bg-blue-50 dark:hover:bg-blue-900/10 p-3 rounded-lg transition-all duration-300">
                  <div className="shrink-0 bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full text-blue-600 dark:text-blue-400 mr-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/30 transition-colors duration-300 group-hover:scale-110 transform">
                    <FiMail size={18} className="group-hover:animate-bounce" />
                  </div>
                  <div>
                    <h4 className="text-base md:text-lg font-medium text-gray-800 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">Email</h4>
                    <a
                      href={`mailto:${userData.footer.contact.email}`}
                      className="text-sm md:text-base text-blue-600 dark:text-blue-400 hover:underline transition-all duration-300 relative group-hover:font-medium"
                    >
                      <span className="relative">
                        {userData.footer.contact.email}
                        <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 group-hover:w-full transition-all duration-500"></span>
                      </span>
                    </a>
                  </div>
                </div>

                <div className="flex items-start group hover:bg-blue-50 dark:hover:bg-blue-900/10 p-3 rounded-lg transition-all duration-300">
                  <div className="shrink-0 bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full text-blue-600 dark:text-blue-400 mr-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/30 transition-colors duration-300 group-hover:scale-110 transform">
                    <FiPhone size={18} className="group-hover:animate-bounce" />
                  </div>
                  <div>
                    <h4 className="text-base md:text-lg font-medium text-gray-800 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">Phone</h4>
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">{userData.footer.contact.phone}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 md:mt-12">
                <h4 className="text-base md:text-lg font-medium text-gray-800 dark:text-white mb-4 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">Follow Me</h4>
                <div className="flex space-x-4">
                  {/* Social links - could be replaced with actual icons */}
                  {userData.footer.socialLinks.slice(0, 3).map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 transition-all duration-300 transform hover:scale-110 hover:rotate-6 hover:shadow-lg"
                      aria-label={`Social link ${index + 1}`}
                    >
                      {index === 0 ? "Li" : index === 1 ? "Gh" : "Tw"}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          <FormField />
        </div>
      </div>
    </section>
  );
};

export default Contact; 