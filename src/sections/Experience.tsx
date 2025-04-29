import React from 'react';
import AnimatedSection from '../components/AnimatedSection';
import userData from '../data/userData';
import BackgroundElements from '../widget/BackgroundElements';
import { useCodeSnippets } from '../hooks/useCodeSnippets';
import ExperienceItem from '../components/ExperienceItem';


const Experience: React.FC = () => {
  const codeSnippets = useCodeSnippets(true);


  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-slate-900 overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {codeSnippets}
      </div>

      <BackgroundElements />

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection className="mb-16 text-center">
          <h2 className="section-heading text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 relative inline-block group">
            Work Experience
            <span className="absolute -bottom-2 left-0 w-0 h-1 bg-blue-600 dark:bg-blue-400 group-hover:w-full transition-all duration-500"></span>
          </h2>
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