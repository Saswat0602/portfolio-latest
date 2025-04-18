import React, { useState, useEffect } from 'react';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import AnimatedSection from '../components/AnimatedSection';
import userData from '../data/userData';
import { motion } from 'framer-motion';

// Define interfaces for the project data
interface ProjectItem {
  title: string;
  description: string;
  image: string;
  category: string;
  github?: string;
  demo?: string;
  technologies: string[];
}

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [codeSnippets, setCodeSnippets] = useState<React.ReactNode[]>([]);

  // Generate code snippets for background
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
            {`function getProject(id) {
  const projects = [
    { name: "Portfolio", tech: ["React", "TailwindCSS"] },
    { name: "E-commerce", tech: ["Next.js", "MongoDB"] },
    { name: "Dashboard", tech: ["Vue", "Firebase"] }
  ];
  return projects.find(p => p.id === id);
}`}
          </motion.pre>
        );
      }
      
      setCodeSnippets(snippets);
    };
    
    generateCodeSnippets();
  }, []);

  // Create mock projects from userData.Projects
  const mockProjects: ProjectItem[] = userData.Projects.map((project) => ({
    title: project.project_name,
    description: `${project.project_name} is a comprehensive application built with modern web technologies, showcasing best practices in development and user experience. This project demonstrates skills in responsive design, state management, and API integration.`,
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1000&auto=format&fit=crop",
    category: Math.random() > 0.5 ? "web" : "mobile",
    github: project.code_link,
    demo: Math.random() > 0.5 ? "https://example.com" : undefined,
    technologies: ["React", "JavaScript", "TailwindCSS"]
  }));

  // Filter projects based on active category
  const filteredProjects = mockProjects.filter(project => 
    activeFilter === 'all' || project.category === activeFilter
  );

  // Animation variants
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-slate-900 overflow-hidden relative">
      {/* Code background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {codeSnippets}
      </div>
      
      {/* Animated background elements */}
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
        
        {/* Animated particles */}
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
            Projects
            <span className="absolute -bottom-2 left-0 w-0 h-1 bg-blue-600 dark:bg-blue-400 group-hover:w-full transition-all duration-500"></span>
          </h2>
        </AnimatedSection>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center mb-12 gap-2 md:gap-4">
          {['all', 'web', 'mobile', 'design'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 md:px-6 md:py-2.5 text-sm md:text-base rounded-full capitalize transition-all duration-300 transform hover:scale-105
                ${activeFilter === filter 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden rounded-xl shadow-lg bg-white dark:bg-gray-800 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 h-[400px]"
              variants={itemVariants}
            >
              {/* Project thumbnail with description overlay */}
              <div className="relative h-64 overflow-hidden">
                {/* Image (shown by default) */}
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:opacity-0"
                />
                
                {/* Description overlay (shown on hover) */}
                <div className="absolute inset-0 bg-blue-600 p-6 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-sm overflow-y-auto max-h-full">
                    {project.description}
                  </p>
                </div>
                
                {/* Category badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-600/90 text-white">
                    {project.category}
                  </span>
                </div>
              </div>
              
              {/* Project details */}
              <div className="p-5 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  {project.title}
                </h3>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-2 py-1 text-xs rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* Project links */}
                <div className="flex space-x-3">
                  {project.github && (
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <FiGithub size={16} />
                      <span>Code</span>
                    </a>
                  )}
                  {project.demo && (
                    <a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <FiExternalLink size={16} />
                      <span>Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects; 