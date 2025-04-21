import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  finishLoading: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ finishLoading }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 10;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 150);

    // Show loading screen for at least 2.5 seconds for visual effect
    const minLoadingTime = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        finishLoading();
      }, 500); // Give time for exit animation
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(minLoadingTime);
    };
  }, [finishLoading]);

  const containerVariants = {
    initial: { opacity: 1 },
    exit: { 
      opacity: 0,
      transition: { duration: 0.5, ease: "easeInOut" }
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-900 transition-colors" 
      variants={containerVariants}
      initial="initial"
      animate={!isLoading ? "exit" : "initial"}
    >
      <div className="space-y-8 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-32 h-32 mx-auto"
        >
          <motion.div 
            className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }
            }}
          />
          <div className="absolute inset-2 rounded-full bg-gray-50 dark:bg-slate-900" />
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
              {Math.round(progress)}%
            </span>
          </motion.div>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white"
        >
          Loading Portfolio
        </motion.h2>
        
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="w-64 h-1 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
        />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex space-x-3 justify-center"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ y: [-5, 5, -5] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: "loop",
                delay: i * 0.2,
                ease: "easeInOut"
              }}
              className="w-3 h-3 rounded-full bg-blue-500"
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen; 