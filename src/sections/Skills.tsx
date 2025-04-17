import React from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { 
  FiCode, FiDatabase, FiLayout, FiServer, 
  FiGithub, FiSmartphone, FiGlobe, FiTool 
} from 'react-icons/fi';
import userData from '../data/userData';

interface SkillCategoryProps {
  title: string;
  icon: React.ReactNode;
  skills: string[];
  delay?: number;
}

const SkillCategory: React.FC<SkillCategoryProps> = ({ title, icon, skills, delay = 0 }) => {
  return (
    <AnimatedSection delay={delay} className="tech-card group">
      <div className="text-blue-600 dark:text-blue-400 mb-4 text-3xl transform transition-all duration-300 group-hover:scale-110 group-hover:text-purple-600 dark:group-hover:text-purple-400">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">{title}</h3>
      <div className="flex flex-wrap justify-center gap-2">
        {skills.map((skill, index) => (
          <span 
            key={index}
            className="px-3 py-1 text-sm bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-gray-200 rounded-full
                     transform transition-all duration-300 hover:scale-110 hover:bg-blue-200 dark:hover:bg-blue-800 hover:text-blue-800 dark:hover:text-blue-300 hover:shadow-md"
            style={{ transitionDelay: `${index * 30}ms` }}
          >
            {skill}
          </span>
        ))}
      </div>
    </AnimatedSection>
  );
};

const Skills: React.FC = () => {
  // Filter skills from userData into categories
  const allSkills = userData.about.skills;
  
  const skillCategories = [
    {
      title: "Frontend",
      icon: <FiLayout />,
      skills: allSkills.filter(skill => 
        ["HTML", "CSS", "JavaScript", "React", "Tailwind", "Bootstrap"].includes(skill)
      )
    },
    {
      title: "Backend",
      icon: <FiServer />,
      skills: allSkills.filter(skill => 
        ["Node.js", "Express.js", "MongoDB", "Django REST Framework"].includes(skill)
      )
    },
    {
      title: "Programming Languages",
      icon: <FiCode />,
      skills: allSkills.filter(skill => 
        ["JavaScript", "TypeScript", "Python", "Java (SE)", "C"].includes(skill)
      )
    },
    {
      title: "Database",
      icon: <FiDatabase />,
      skills: allSkills.filter(skill => 
        ["MongoDB", "MySQL", "PostgreSQL"].includes(skill)
      )
    },
    {
      title: "Mobile Development",
      icon: <FiSmartphone />,
      skills: allSkills.filter(skill => 
        ["React Native", "Swift"].includes(skill)
      )
    },
    {
      title: "Version Control",
      icon: <FiGithub />,
      skills: allSkills.filter(skill => 
        ["Git", "GitHub"].includes(skill)
      )
    }
  ].filter(category => category.skills.length > 0);

  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4">
        <AnimatedSection className="mb-16 text-center">
          <h2 className="section-heading text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
            Skills &amp; Technologies
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-4 hover:text-gray-800 dark:hover:text-white transition-colors duration-300">
            My technical toolkit that I've developed and continue to expand through projects and continuous learning
          </p>
        </AnimatedSection>

        {/* Moving background stripes */}
        <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
          <div className="absolute -top-96 -right-40 w-[800px] h-[1000px] rotate-45 bg-gradient-to-b from-transparent via-blue-200/50 dark:via-blue-900/10 to-transparent transform animate-[spin_60s_linear_infinite]"></div>
          <div className="absolute -bottom-96 -left-40 w-[800px] h-[1000px] rotate-45 bg-gradient-to-b from-transparent via-purple-200/50 dark:via-purple-900/10 to-transparent transform animate-[spin_60s_linear_infinite]" style={{animationDirection: 'reverse'}}></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {skillCategories.map((category, index) => (
            <div key={index} className="p-5 bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-blue-100 dark:hover:shadow-blue-900/20">
              <SkillCategory 
                title={category.title} 
                icon={category.icon} 
                skills={category.skills}
                delay={index * 0.1}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills; 