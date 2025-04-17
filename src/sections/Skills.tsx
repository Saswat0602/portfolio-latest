import React from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { 
  SiReact, SiNodedotjs, SiMongodb, SiJavascript, SiCss3, SiHtml5,
  SiTailwindcss, SiBootstrap, SiExpress, SiGit, SiGithub, SiReactrouter,
  SiRedux, SiTypescript, SiNextdotjs, SiPython, SiGraphql, SiMysql, 
  SiPostgresql, SiDjango, SiC, SiSwift
} from 'react-icons/si';
import { DiJava } from 'react-icons/di';
import userData from '../data/userData';
import { motion } from 'framer-motion';

interface SkillCategoryProps {
  title: string;
  icon: React.ReactNode;
  skillsWithIcons: { name: string; icon: React.ReactNode }[];
  color: string;
  delay?: number;
}

const SkillCategory: React.FC<SkillCategoryProps> = ({ 
  title, 
  icon, 
  skillsWithIcons,
  color, 
  delay = 0 
}) => {
  return (
    <AnimatedSection delay={delay} className="tech-card group h-full">
      <div className={`text-3xl mb-4 transform transition-all duration-300 group-hover:scale-110 ${color}`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">{title}</h3>
      <div className="flex flex-wrap justify-center gap-2">
        {skillsWithIcons.map((skill, index) => (
          <motion.span 
            key={index}
            className="px-3 py-2 text-sm bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-gray-200 rounded-full
                     transform transition-all duration-300 hover:scale-110 hover:bg-blue-200 dark:hover:bg-blue-800 hover:text-blue-800 dark:hover:text-blue-300 hover:shadow-md flex items-center gap-2"
            whileHover={{ 
              y: -5,
              boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.3)"
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: delay + index * 0.1,
              type: "spring",
              stiffness: 200,
              damping: 10
            }}
          >
            <span className={`text-lg ${color}`}>{skill.icon}</span>
            {skill.name}
          </motion.span>
        ))}
      </div>
    </AnimatedSection>
  );
};

const Skills: React.FC = () => {
  // Map skill names to their icons
  const skillIcons: { [key: string]: React.ReactNode } = {
    "HTML": <SiHtml5 />,
    "CSS": <SiCss3 />,
    "JavaScript": <SiJavascript />,
    "TypeScript": <SiTypescript />,
    "React": <SiReact />,
    "React Native": <SiReact />,
    "Node.js": <SiNodedotjs />,
    "Express.js": <SiExpress />,
    "MongoDB": <SiMongodb />,
    "MySQL": <SiMysql />,
    "PostgreSQL": <SiPostgresql />,
    "Tailwind": <SiTailwindcss />,
    "Bootstrap": <SiBootstrap />,
    "Git": <SiGit />,
    "GitHub": <SiGithub />,
    "Next.js": <SiNextdotjs />,
    "Python": <SiPython />,
    "Java (SE)": <DiJava />,
    "GraphQL": <SiGraphql />,
    "Redux": <SiRedux />,
    "React Router": <SiReactrouter />,
    "C": <SiC />,
    "Swift": <SiSwift />,
    "Django REST Framework": <SiDjango />
  };
  
  // Define unique skills for each category
  const frontendSkills = ["HTML", "CSS", "JavaScript", "React", "Tailwind", "Bootstrap", "Redux", "React Router"];
  const backendSkills = ["Node.js", "Express.js", "MongoDB", "Django REST Framework"];
  const programmingLanguages = ["JavaScript", "TypeScript", "Python", "Java (SE)", "C"];
  const databaseSkills = ["MongoDB", "MySQL", "PostgreSQL"];
  const mobileSkills = ["React Native", "Swift"];
  const versionControlSkills = ["Git", "GitHub"];
  
  // Get skills with icons helper function
  const getSkillsWithIcons = (skills: string[]) => {
    return skills.map(skill => ({
      name: skill,
      icon: skillIcons[skill] || null
    }));
  };
  
  const skillCategories = [
    {
      title: "Frontend",
      icon: <SiReact className="animate-spin-slow" />,
      color: "text-blue-500 dark:text-blue-400",
      skills: frontendSkills,
      skillsWithIcons: getSkillsWithIcons(frontendSkills)
    },
    {
      title: "Backend",
      icon: <SiNodedotjs className="animate-pulse" />,
      color: "text-green-500 dark:text-green-400",
      skills: backendSkills,
      skillsWithIcons: getSkillsWithIcons(backendSkills)
    },
    {
      title: "Programming Languages",
      icon: <SiJavascript className="animate-bounce-slow" />,
      color: "text-yellow-500 dark:text-yellow-400",
      skills: programmingLanguages,
      skillsWithIcons: getSkillsWithIcons(programmingLanguages)
    },
    {
      title: "Database",
      icon: <SiMongodb className="animate-pulse" />,
      color: "text-green-600 dark:text-green-500",
      skills: databaseSkills,
      skillsWithIcons: getSkillsWithIcons(databaseSkills)
    },
    {
      title: "Mobile Development",
      icon: <SiReact className="animate-spin-slow" />,
      color: "text-indigo-500 dark:text-indigo-400",
      skills: mobileSkills,
      skillsWithIcons: getSkillsWithIcons(mobileSkills)
    },
    {
      title: "Version Control",
      icon: <SiGit className="animate-pulse" />,
      color: "text-orange-500 dark:text-orange-400",
      skills: versionControlSkills,
      skillsWithIcons: getSkillsWithIcons(versionControlSkills)
    }
  ].filter(category => category.skills.length > 0);

  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4">
        <AnimatedSection className="mb-16 text-center">
          <h2 className="section-heading text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 relative inline-block group">
            Skills &amp; Technologies
            <span className="absolute -bottom-2 left-0 w-0 h-1 bg-blue-600 dark:bg-blue-400 group-hover:w-full transition-all duration-500"></span>
          </h2>
          <motion.p 
            className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-4 hover:text-gray-800 dark:hover:text-white transition-colors duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            My technical toolkit that I've developed and continue to expand through projects and continuous learning
          </motion.p>
        </AnimatedSection>

        {/* Moving background stripes with improved animations */}
        <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
          <motion.div 
            className="absolute -top-96 -right-40 w-[800px] h-[1000px] rotate-45 bg-gradient-to-b from-transparent via-blue-200/50 dark:via-blue-900/10 to-transparent"
            animate={{ 
              rotate: [45, 55, 45],
              x: [0, 100, 0],
              y: [0, -50, 0]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute -bottom-96 -left-40 w-[800px] h-[1000px] rotate-45 bg-gradient-to-b from-transparent via-purple-200/50 dark:via-purple-900/10 to-transparent"
            animate={{ 
              rotate: [45, 35, 45],
              x: [0, -100, 0],
              y: [0, 50, 0]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="hidden"
          animate="show"
        >
          {skillCategories.map((category, index) => (
            <motion.div 
              key={index} 
              className="p-5 bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-blue-100 dark:hover:shadow-blue-900/20 h-full"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    type: "spring",
                    duration: 0.6,
                    delay: index * 0.1
                  }
                }
              }}
              whileHover={{ scale: 1.02 }}
            >
              <SkillCategory 
                title={category.title} 
                icon={category.icon} 
                skillsWithIcons={category.skillsWithIcons}
                color={category.color}
                delay={index * 0.1}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills; 