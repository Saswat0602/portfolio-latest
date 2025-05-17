import React, { useMemo, useState } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import {
  SiReact, SiNodedotjs, SiMongodb, SiJavascript, SiCss3, SiHtml5,
  SiTailwindcss, SiBootstrap, SiExpress, SiGit, SiGithub, SiReactrouter,
  SiRedux, SiTypescript, SiNextdotjs, SiPython, SiGraphql, SiMysql,
  SiPostgresql, SiDjango, SiC, SiSwift
} from 'react-icons/si';
import { DiJava } from 'react-icons/di'; 
import { motion } from 'framer-motion';
import SkillCategory from '../widget/SkillCategory';
import { backendSkills, databaseSkills, frontendSkills, mobileSkills, programmingLanguages, versionControlSkills } from '../data/skillSet';
import BackgroundElements from '../widget/BackgroundElements';

// Predefine animation variants to reuse
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      duration: 0.6,
      delay: i * 0.1
    }
  })
};


SkillCategory.displayName = 'SkillCategory';

interface SkillsProps {
  isMobile?: boolean;
}

const Skills: React.FC<SkillsProps> = ({ isMobile }) => {
  const [showAll, setShowAll] = useState(false);

  const skillIcons = useMemo(() => ({
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
  }), []);

  const skillCategories = useMemo(() => {

    // Map skills to their respective categories with icons
    const getSkillsWithIcons = (skills: string[]) => {
      return skills.map(skill => ({
        name: skill,
        icon: skillIcons[skill as keyof typeof skillIcons] || null
      }));
    };
    
    return [
      {
        title: "Frontend",
        icon: <SiReact className="animate-spin-slow" />,
        color: "text-blue-500 dark:text-blue-400",
        skills: getSkillsWithIcons(frontendSkills)
      },
      {
        title: "Backend",
        icon: <SiNodedotjs className="animate-pulse" />,
        color: "text-green-500 dark:text-green-400",
        skills: getSkillsWithIcons(backendSkills)
      },
      {
        title: "Programming Languages",
        icon: <SiJavascript className="animate-bounce-slow" />,
        color: "text-yellow-500 dark:text-yellow-400",
        skills: getSkillsWithIcons(programmingLanguages)
      },
      {
        title: "Database",
        icon: <SiMongodb className="animate-pulse" />,
        color: "text-green-600 dark:text-green-500",
        skills: getSkillsWithIcons(databaseSkills)
      },
      {
        title: "Mobile Development",
        icon: <SiReact className="animate-spin-slow" />,
        color: "text-indigo-500 dark:text-indigo-400",
        skills: getSkillsWithIcons(mobileSkills)
      },
      {
        title: "Version Control",
        icon: <SiGit className="animate-pulse" />,
        color: "text-orange-500 dark:text-orange-400",
        skills: getSkillsWithIcons(versionControlSkills)
      }
    ].filter(category => category.skills.length > 0);
  }, [skillIcons]);

  // Limit categories for mobile
  const displayedCategories = isMobile && !showAll ? skillCategories.slice(0, 3) : skillCategories;

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-slate-900 overflow-hidden relative">
      <BackgroundElements />

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection className="mb-16 text-center">
          <h2 className="section-heading text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 relative inline-block group">
            Skills & Technologies
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

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {displayedCategories.map((category, index) => (
            <motion.div
              key={category.title}
              className="h-full"
              variants={itemVariants}
              custom={index}
              whileHover={{ scale: 1.02 }}
            >
              <SkillCategory
                title={category.title}
                icon={category.icon}
                skills={category.skills}
                color={category.color}
                delay={index * 0.1}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Show More button for mobile */}
        {isMobile && !showAll && skillCategories.length > 3 && (
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

export default React.memo(Skills);