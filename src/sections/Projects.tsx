import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import AnimatedSection from '../components/AnimatedSection';
import userData from '../data/userData';
import { motion, useReducedMotion } from 'framer-motion';

// Simplified interface that matches userData
interface ProjectItem {
  title: string;
  description: string;
  image: string;
  category: string;
  github?: string;
  demo?: string;
  technologies: string[];
}

interface ProjectsProps {
  isMobile?: boolean;
}

const Projects: React.FC<ProjectsProps> = ({ isMobile }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState<ProjectItem[]>([]);
  const prefersReducedMotion = useReducedMotion();
  const [showAll, setShowAll] = useState(false);

  // Transform userData.Projects to the format needed by the component (only once)
  const projects: ProjectItem[] = useMemo(() => {
    return userData.Projects.map(project => ({
      title: project.project_name,
      description: project.description,
      image: project.image,
      category: project.category,
      github: project.code_link,
      demo: project.demo_link,
      technologies: project.technologies
    }));
  }, []);

  // Get unique categories from projects for filter buttons
  const categories = useMemo(() => {
    const uniqueCategories = ['all', ...Array.from(new Set(projects.map(project => project.category)))];
    return uniqueCategories;
  }, [projects]);

  // Update filtered projects whenever activeFilter changes
  useEffect(() => {
    const filtered = activeFilter === 'all'
      ? projects
      : projects.filter(project => project.category === activeFilter);
    
    setFilteredProjects(filtered);
  }, [activeFilter, projects]);

  // Use useCallback for event handlers
  const handleFilterChange = useCallback((filter: string) => {
    setActiveFilter(filter);
  }, []);

  // Animation variants - simplified for better performance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.03, 
        duration: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: prefersReducedMotion ? 0 : 5, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "easeOut", 
        duration: 0.2,
      }
    }
  };

  // Limit projects for mobile
  const displayedProjects = isMobile && !showAll ? filteredProjects.slice(0, 3) : filteredProjects;

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-slate-900 overflow-hidden">
      <div className="container mx-auto px-4">
        <AnimatedSection className="mb-12 text-center">
          <h2 className="section-heading text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 relative inline-block group">
            Projects
            <span className="absolute -bottom-2 left-0 w-0 h-1 bg-blue-600 dark:bg-blue-400 group-hover:w-full transition-all duration-500"></span>
          </h2>
        </AnimatedSection>

        <div className="flex flex-wrap justify-center mb-12 gap-2 md:gap-4">
          {categories.map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterChange(filter)}
              className={`px-4 py-2 md:px-6 md:py-2.5 text-sm md:text-base rounded-full capitalize transition-colors duration-200
                ${activeFilter === filter 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Mobile: simple list, no overlays/hover, minimal DOM */}
        {isMobile ? (
          <div className="grid grid-cols-1 gap-6">
            {displayedProjects.map((project) => (
              <div key={project.title} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
                <img 
                  src={project.image} 
                  srcSet={`${project.image.replace(/\.(jpg|png)$/, '.webp')} 400w, ${project.image} 800w`}
                  sizes="100vw"
                  alt={project.title}
                  className="w-full h-40 object-cover rounded mb-2"
                  loading="lazy"
                  decoding="async"
                />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-3">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.technologies.slice(0, 2).map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-2 py-1 text-xs rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  {project.github && (
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 text-sm font-medium"
                      aria-label={`View code for ${project.title}`}
                    >
                      Code
                    </a>
                  )}
                  {project.demo && (
                    <a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 text-sm font-medium"
                      aria-label={`View demo for ${project.title}`}
                    >
                      Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          displayedProjects.length > 0 ? (
            <motion.div 
              key={activeFilter}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {displayedProjects.map((project) => (
                <motion.div
                  key={project.title}
                  className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md"
                  variants={itemVariants}
                  whileHover={{ 
                    y: prefersReducedMotion ? 0 : -5,
                    transition: { duration: 0.2 } 
                  }}
                >
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={project.image} 
                      srcSet={`${project.image.replace(/\.(jpg|png)$/, '.webp')} 600w, ${project.image} 1200w`}
                      sizes="(max-width: 600px) 100vw, 33vw"
                      alt={project.title}
                      className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    {/* Description overlay (shown on hover) */}
                    <div 
                      className="absolute inset-0 bg-blue-600 bg-opacity-90 p-5 flex items-center opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out transform translate-y-2 group-hover:translate-y-0"
                    >
                      <p className="text-white text-sm overflow-y-auto max-h-full">
                        {project.description}
                      </p>
                    </div>
                    {/* Category badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-600 text-white">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  {/* Project details */}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 transition-colors duration-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="px-2 py-1 text-xs rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 text-xs rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                    {/* Project links */}
                    <div className="flex space-x-4">
                      {project.github && (
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                          aria-label={`View code for ${project.title}`}
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
                          className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                          aria-label={`View demo for ${project.title}`}
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
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-300">No projects found for this category.</p>
            </div>
          )
        )}
        {/* Show More button for mobile */}
        {isMobile && !showAll && filteredProjects.length > 3 && (
          <div className="flex justify-center mt-6">
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-all"
              onClick={() => setShowAll(true)}
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;