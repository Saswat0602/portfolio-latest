import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  finishLoading: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ finishLoading }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState('');
  const progressRef = useRef<number>(0);
  const particlesRef = useRef<Array<{ x: number, y: number, size: number, speed: number, color: string }>>([]);
  
  // Generate random particles for the background
  useEffect(() => {
    const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];
    
    particlesRef.current = Array.from({ length: 30 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100, 
      size: Math.random() * 8 + 2,
      speed: Math.random() * 1.5 + 0.5,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
  }, []);

  // Loading progress simulation
  useEffect(() => {
    // Accelerated loading progress simulation
    const interval = setInterval(() => {
      setProgress(prev => {
        const increment = Math.random() * 15;
        const newProgress = prev + increment > 100 ? 100 : prev + increment;
        progressRef.current = newProgress;
        
        // Format to show decimal places at the beginning, then round near the end
        if (newProgress < 70) {
          setProgressText(newProgress.toFixed(1));
        } else {
          setProgressText(Math.round(newProgress).toString());
        }
        
        return newProgress;
      });
    }, 150);

    // Determine loading messages based on progress
    const messageInterval = setInterval(() => {
      const currentProgress = progressRef.current;
      
      if (currentProgress >= 100) {
        clearInterval(messageInterval);
      }
    }, 500);

    // Show loading screen for minimum time for visual appeal
    const minLoadingTime = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        finishLoading();
      }, 600); // Give time for exit animation
    }, 2200); // Still keeps it relatively fast

    return () => {
      clearInterval(interval);
      clearInterval(messageInterval);
      clearTimeout(minLoadingTime);
    };
  }, [finishLoading]);

  // Animation variants
  const containerVariants = {
    initial: { opacity: 1 },
    exit: { 
      opacity: 0,
      transition: { duration: 0.6, ease: "easeInOut" }
    }
  };
  
  const titleVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] // Custom spring-like easing
      }
    }
  };
  
  const progressVariants = {
    initial: { scaleX: 0 },
    animate: { 
      scaleX: progress / 100,
      transition: { 
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-slate-900 hardware-accelerated"
      variants={containerVariants}
      initial="initial"
      animate={!isLoading ? "exit" : "initial"}
    >
      {/* Background particles */}
      {particlesRef.current.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: 0.6,
          }}
          animate={{
            y: [0, particle.speed * 30, 0],
            x: [0, particle.speed * 20, 0],
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 3 + particle.speed,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      ))}

      {/* 3D loading animation container */}
      <div className="relative flex flex-col items-center text-center z-10 perspective-1000">
        {/* Animated logo */}
        <motion.div
          initial={{ rotateY: 0, scale: 0.8, opacity: 0 }}
          animate={{ 
            rotateY: 360, 
            scale: 1, 
            opacity: 1,
            transition: {
              rotateY: {
                duration: 3,
                ease: "linear",
                repeat: Infinity
              },
              scale: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
              },
              opacity: {
                duration: 0.8
              }
            }
          }}
          className="relative w-40 h-40 mb-10 preserve-3d"
        >
          {/* 3D rotating cube */}
          <motion.div 
            className="absolute inset-0"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Front face */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600"
              style={{ transform: "translateZ(20px)" }}
            >
              <span className="text-white text-4xl font-bold">S</span>
            </motion.div>
            
            {/* Back face */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-pink-500"
              style={{ transform: "rotateY(180deg) translateZ(20px)" }}
            >
              <span className="text-white text-4xl font-bold">D</span>
            </motion.div>
            
            {/* Right face */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-teal-400"
              style={{ transform: "rotateY(90deg) translateZ(20px)" }}
            >
              <span className="text-white text-4xl font-bold">E</span>
            </motion.div>
            
            {/* Left face */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-blue-500"
              style={{ transform: "rotateY(-90deg) translateZ(20px)" }}
            >
              <span className="text-white text-4xl font-bold">V</span>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Percentage display with glow effect */}
        <motion.div 
          className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-4"
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ 
            opacity: 1, 
            filter: "blur(0px)", 
            textShadow: "0 0 10px rgba(59, 130, 246, 0.5)" 
          }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {progressText}%
        </motion.div>

        {/* Title */}
        <motion.h2
          variants={titleVariants}
          initial="initial"
          animate="animate"
          className="text-2xl font-bold text-gray-800 dark:text-white mb-6"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
            Saswat
          </span>.dev
        </motion.h2>
        
        {/* Modernized progress bar */}
        <div className="w-64 h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
            variants={progressVariants}
            initial="initial"
            animate="animate"
            style={{ 
              originX: 0,
              boxShadow: "0 0 10px rgba(59, 130, 246, 0.7)" 
            }}
          />
        </div>
        
        {/* Loading message */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-4 text-sm text-gray-600 dark:text-gray-400"
        >
          {progress < 40 ? "Initializing components..." : 
           progress < 75 ? "Loading portfolio data..." : 
           progress < 95 ? "Almost there..." : 
           "Ready!"}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen; 