import React from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { FiBriefcase, FiCalendar, FiMapPin, FiClock } from 'react-icons/fi';
import userData from '../data/userData';

interface ExperienceItemProps {
  title: string;
  company: string;
  duration: string;
  location: string;
  type: string;
  description: string;
  skills: string[];
  isLast?: boolean;
  delay?: number;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({
  title,
  company,
  duration,
  location,
  type,
  description,
  skills,
  isLast = false,
  delay = 0,
}) => {
  return (
    <AnimatedSection delay={delay} className="relative">
      {/* Timeline connector */}
      {!isLast && (
        <div className="absolute top-8 left-4 bottom-0 w-0.5 bg-blue-200 dark:bg-blue-900"></div>
      )}

      <div className="relative flex gap-6">
        {/* Timeline dot */}
        <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-400 shrink-0">
          <FiBriefcase className="w-4 h-4" />
        </div>

        {/* Content */}
        <div className="flex-1 p-6 bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-lg dark:shadow-blue-900/5 transform transition-all duration-300 hover:-translate-y-1">
          <div className="flex flex-col sm:flex-row sm:justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h3>
              <h4 className="text-lg font-medium text-blue-600 dark:text-blue-400">{company}</h4>
            </div>
            <div className="mt-2 sm:mt-0 text-right shrink-0">
              <div className="flex items-center mb-1 sm:justify-end text-gray-600 dark:text-gray-400">
                <FiCalendar className="mr-1" size={14} />
                <span className="text-sm">{duration}</span>
              </div>
              <div className="flex items-center sm:justify-end text-gray-600 dark:text-gray-400">
                <FiMapPin className="mr-1" size={14} />
                <span className="text-sm">{location}</span>
              </div>
              <div className="flex items-center mt-1 sm:justify-end text-gray-600 dark:text-gray-400">
                <FiClock className="mr-1" size={14} />
                <span className="text-sm">{type}</span>
              </div>
            </div>
          </div>

          <p className="mb-4 text-gray-600 dark:text-gray-300">{description}</p>
          
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span 
                key={index} 
                className="inline-block px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <AnimatedSection className="mb-16 text-center">
          <h2 className="section-heading text-gray-800 dark:text-white">Work Experience</h2>
        </AnimatedSection>

        <div className="max-w-3xl mx-auto space-y-12">
          {userData.experience.map((exp, index) => (
            <ExperienceItem 
              key={index}
              {...exp}
              isLast={index === userData.experience.length - 1}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience; 