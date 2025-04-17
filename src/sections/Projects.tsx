import React, { useState } from 'react';
import { FiGithub, FiExternalLink, FiArrowRight, FiCode } from 'react-icons/fi';
import AnimatedSection from '../components/AnimatedSection';
import userData from '../data/userData';

interface ProjectCardProps {
  title: string;
  description?: string;
  imageSrc?: string;
  tags?: string[];
  githubLink: string;
  liveLink?: string;
  delay?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description = "A project built with modern web technologies.",
  imageSrc,
  tags = ["Web", "Development"],
  githubLink,
  liveLink,
  delay = 0,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <AnimatedSection delay={delay} className="group">
      <div 
        className="relative overflow-hidden rounded-xl bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl dark:shadow-blue-900/5 
                 transform transition-all duration-500 hover:-translate-y-3 hover:shadow-blue-100 dark:hover:shadow-blue-900/20"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Project Image */}
        <div className="relative h-60 overflow-hidden">
          {imageSrc ? (
            <img 
              src={imageSrc} 
              alt={title}
              className="w-full h-full object-cover object-center transform transition-all duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center">
              <FiCode className="text-4xl text-blue-400 dark:text-blue-500 animate-pulse" />
            </div>
          )}
          
          {/* Overlay on hover */}
          <div 
            className={`absolute inset-0 bg-gradient-to-t from-blue-600/90 to-purple-600/80 transition-opacity duration-500 flex flex-col items-center justify-center p-6
                     ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          >
            <p className="text-white text-center mb-4">{description}</p>
            <div className="flex space-x-4">
              <a 
                href={githubLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-white/20 hover:bg-white/40 rounded-full transition-colors duration-300"
                aria-label="GitHub repository"
              >
                <FiGithub size={20} className="text-white" />
              </a>
              {liveLink && (
                <a 
                  href={liveLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-white/20 hover:bg-white/40 rounded-full transition-colors duration-300"
                  aria-label="Live site"
                >
                  <FiExternalLink size={20} className="text-white" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Project details */}
        <div className="p-6 relative">
          {/* Background hover effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/0 via-purple-50/0 to-blue-50/0 dark:from-blue-900/0 dark:via-purple-900/0 dark:to-blue-900/0 group-hover:from-blue-50 group-hover:via-purple-50/10 group-hover:to-blue-50 dark:group-hover:from-blue-900/5 dark:group-hover:via-purple-900/10 dark:group-hover:to-blue-900/5 transition-colors duration-500"></div>
          
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 relative">
            {title}
          </h3>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4 relative">
            {tags.map((tag, index) => (
              <span 
                key={index} 
                className="inline-block px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-md
                transition-all duration-300 transform hover:scale-105 hover:bg-blue-200 dark:hover:bg-blue-800 hover:shadow-sm"
                style={{transitionDelay: `${index * 50}ms`}}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex justify-between items-center pt-2 relative">
            <div className="flex space-x-3">
              <a 
                href={githubLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 transform hover:scale-110"
                aria-label="GitHub repository"
              >
                <FiGithub size={20} />
              </a>
              {liveLink && (
                <a 
                  href={liveLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 transform hover:scale-110"
                  aria-label="Live site"
                >
                  <FiExternalLink size={20} />
                </a>
              )}
            </div>
            
            <a 
              href={githubLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 font-medium flex items-center transition-all transform group-hover:translate-x-1"
              aria-label="View project details"
            >
              <span className="relative">
                View Project
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 group-hover:w-full transition-all duration-300"></span>
              </span>
              <FiArrowRight className="ml-1 transform transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

const Projects: React.FC = () => {
  // Map userData projects to the format needed by ProjectCard
  const projects = userData.Projects.map(project => ({
    title: project.project_name,
    description: "A project built with modern web technologies.",
    tags: ["React", "JavaScript", "Web Development"],
    githubLink: project.code_link,
  }));

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500 opacity-20 rounded-full filter blur-3xl"></div>
        <div className="absolute top-40 -right-20 w-60 h-60 bg-purple-500 opacity-20 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-20 left-20 w-40 h-40 bg-pink-500 opacity-20 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection className="mb-16 text-center">
          <h2 className="section-heading text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 relative inline-block group">
            My Projects
            <span className="absolute -bottom-2 left-0 w-0 h-1 bg-blue-600 dark:bg-blue-400 group-hover:w-full transition-all duration-500"></span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-4 hover:text-gray-800 dark:hover:text-white transition-colors duration-300">
            A showcase of my recent development work, personal projects, and coding experiments
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard 
              key={index} 
              {...project}
              delay={index * 0.1} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects; 