import { FiBriefcase, FiCalendar, FiChevronRight, FiClock, FiMapPin } from "react-icons/fi";
import AnimatedSection from "./AnimatedSection";
import React, { useState } from "react";

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

    const [showAllSkills, setShowAllSkills] = useState(false);
    const visibleSkills = showAllSkills ? skills : skills.slice(0, 3);
    const hiddenSkillCount = skills.length - 3;


    return (
        <AnimatedSection delay={delay} className="relative">
            {!isLast && (
                <div className="absolute top-8 left-4 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-purple-500 dark:from-blue-600 dark:to-purple-700"></div>
            )}

            <div className="relative flex gap-6">
                <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-400 shrink-0 transition duration-300 hover:scale-110 hover:border-purple-500 hover:text-purple-600 dark:hover:border-purple-400 dark:hover:text-purple-400 group">
                    <FiBriefcase className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
                </div>

                <div className="flex-1 p-6 bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-xl dark:shadow-blue-900/5 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-blue-200 dark:hover:shadow-blue-900/20 relative group">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 dark:group-hover:from-blue-500/10 dark:group-hover:to-purple-500/10 transition-opacity duration-500 opacity-0 group-hover:opacity-100"></div>

                    <div className="flex flex-col sm:flex-row sm:justify-between mb-4 relative z-10">
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                {title}
                                <FiChevronRight className="hidden group-hover:inline-block ml-1 transition-transform duration-300 animate-pulse" />
                            </h3>
                            <h4 className="text-lg font-medium text-blue-600 dark:text-blue-400">{company}</h4>
                        </div>
                        <div className="mt-2 sm:mt-0 text-right shrink-0">
                            <div className="flex items-center mb-1 sm:justify-end text-gray-600 dark:text-gray-400 group">
                                <FiCalendar className="mr-1 group-hover:text-blue-500 dark:group-hover:text-blue-300 transition-colors duration-300" size={14} />
                                <span className="text-sm group-hover:text-blue-500 dark:group-hover:text-blue-300 transition-colors duration-300">{duration}</span>
                            </div>
                            <div className="flex items-center sm:justify-end text-gray-600 dark:text-gray-400 group">
                                <FiMapPin className="mr-1 group-hover:text-blue-500 dark:group-hover:text-blue-300 transition-colors duration-300" size={14} />
                                <span className="text-sm group-hover:text-blue-500 dark:group-hover:text-blue-300 transition-colors duration-300">{location}</span>
                            </div>
                            <div className="flex items-center mt-1 sm:justify-end text-gray-600 dark:text-gray-400 group">
                                <FiClock className="mr-1 group-hover:text-blue-500 dark:group-hover:text-blue-300 transition-colors duration-300" size={14} />
                                <span className="text-sm group-hover:text-blue-500 dark:group-hover:text-blue-300 transition-colors duration-300">{type}</span>
                            </div>
                        </div>
                    </div>

                    <p className="mb-4 text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-white transition-colors duration-300 relative z-10">{description}</p>

                    <div className="flex flex-wrap gap-2 relative z-10">
                        {visibleSkills.map((skill, index) => (
                            <span
                                key={index}
                                className="inline-block px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full
      transition-all duration-300 hover:bg-blue-200 dark:hover:bg-blue-800 hover:transform hover:scale-105 hover:shadow-sm"
                            >
                                {skill}
                            </span>
                        ))}

                        {hiddenSkillCount > 0 && (
                            <button
                                onClick={() => setShowAllSkills(!showAllSkills)}
                                className="inline-block px-3 py-1 text-xs bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full hover:scale-105 transition-transform"
                            >
                                {showAllSkills ? "Show less" : `+${hiddenSkillCount} more`}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
};



export default ExperienceItem;  