import React, { useState } from 'react';
import { FiGithub, FiExternalLink, FiArrowRight } from 'react-icons/fi';
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
                 transform transition-all duration-500 hover:-translate-y-2"
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
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <span className="text-gray-400 dark:text-gray-500">No Image</span>
            </div>
          )}
          
          {/* Overlay on hover */}
          <div 
            className={`absolute inset-0 bg-gradient-to-t from-blue-600/90 to-purple-600/80 transition-opacity duration-500 flex items-center justify-center p-6
                     ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          >
            <p className="text-white text-center">{description}</p>
          </div>
        </div>

        {/* Project details */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {title}
          </h3>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <span 
                key={index} 
                className="inline-block px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex justify-between items-center pt-2">
            <div className="flex space-x-3">
              <a 
                href={githubLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                aria-label="GitHub repository"
              >
                <FiGithub size={20} />
              </a>
              {liveLink && (
                <a 
                  href={liveLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
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
              <span>View Project</span>
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
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <AnimatedSection className="mb-16 text-center">
          <h2 className="section-heading text-gray-800 dark:text-white">My Projects</h2>
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