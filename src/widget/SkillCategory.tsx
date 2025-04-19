import React from "react";
import { motion } from 'framer-motion';
import AnimatedSection from "../components/AnimatedSection";
interface SkillData {
    name: string;
    icon: React.ReactNode;
}

interface SkillCategoryProps {
    title: string;
    icon: React.ReactNode;
    skills: SkillData[];
    color: string;
    delay?: number;
}


const skillBadgeVariants = {
    hidden: { opacity: 0, y: 20 },
    show: (delay: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            delay,
            type: "spring",
            stiffness: 200,
            damping: 10
        }
    }),
    hover: {
        y: -5,
        boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.3)"
    }
};


const SkillCategory: React.FC<SkillCategoryProps> = React.memo(({
    title,
    icon,
    skills,
    color,
    delay = 0
}) => {
    return (
        <AnimatedSection delay={delay} className="tech-card group h-full bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className={`text-3xl mb-4 transform transition-all duration-300 group-hover:scale-110 ${color}`}>
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">{title}</h3>
            <div className="flex flex-wrap justify-center gap-2">
                {skills.map((skill, index) => (
                    <motion.span
                        key={`${title}-${skill.name}`}
                        className="px-3 py-2 text-sm bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-gray-200 rounded-full
                     transform transition-all duration-300 hover:scale-110 hover:bg-blue-200 dark:hover:bg-blue-800 hover:text-blue-800 dark:hover:text-blue-300 hover:shadow-md flex items-center gap-2"
                        variants={skillBadgeVariants}
                        custom={delay + index * 0.1}
                        initial="hidden"
                        animate="show"
                        whileHover="hover"
                    >
                        <span className={`text-lg ${color}`}>{skill.icon}</span>
                        {skill.name}
                    </motion.span>
                ))}
            </div>
        </AnimatedSection>
    );
});

export default SkillCategory