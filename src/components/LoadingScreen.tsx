import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  finishLoading: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ finishLoading }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState('');
  
  // Use fewer particles for mobile
  const isMobile = useMemo(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  }, []);
  
  // Generate particles once and memoize them
  const particles = useMemo(() => {
    const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];
    const particleCount = isMobile ? 10 : 30; // Fewer particles on mobile
    
    return Array.from({ length: particleCount }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100, 
      size: Math.random() * 6 + 2, // Slightly smaller particles
      speed: Math.random() * 1.2 + 0.5,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
  }, [isMobile]);

  // Use requestAnimationFrame for smoother progress updates
  const updateProgress = useCallback(() => {
    let startTime :any= null;
    let currentProgress = 0;
    
    const animate = (timestamp:any) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      
      // Total animation duration: 2000ms
      const duration = 2000;
      currentProgress = Math.min(100, (elapsed / duration) * 100);
      
      setProgress(currentProgress);
      
      if (currentProgress < 70) {
        setProgressText(currentProgress.toFixed(1));
      } else {
        setProgressText(Math.round(currentProgress).toString());
      }
      
      if (currentProgress < 100) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setIsLoading(false);
          setTimeout(finishLoading, 600);
        }, 200);
      }
    };
    
    requestAnimationFrame(animate);
  }, [finishLoading]);

  useEffect(() => {
    updateProgress();
  }, [updateProgress]);

  // Get loading message based on progress
  const loadingMessage = useMemo(() => {
    if (progress < 40) return "Initializing components...";
    if (progress < 75) return "Loading portfolio data...";
    if (progress < 95) return "Almost there...";
    return "Ready!";
  }, [progress]);

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
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };
  
  const progressVariants = {
    initial: { scaleX: 0 },
    animate: { 
      scaleX: progress / 100,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  // Simpler cube animation for mobile
  const cubeAnimation = isMobile ? {
    rotateY: 360,
    scale: 1, 
    opacity: 1,
    transition: {
      rotateY: { duration: 4, ease: "linear", repeat: Infinity },
      scale: { duration: 0.8, ease: "easeOut" },
      opacity: { duration: 0.8 }
    }
  } : {
    rotateY: 360, 
    scale: 1, 
    opacity: 1,
    transition: {
      rotateY: { duration: 3, ease: "linear", repeat: Infinity },
      scale: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.8 }
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-slate-900"
      variants={containerVariants}
      initial="initial"
      animate={!isLoading ? "exit" : "initial"}
      style={{ willChange: 'opacity' }} // Hardware acceleration hint
    >
      {/* Rendering fewer particles with simpler animations on mobile */}
      {particles.map((particle, i) => (
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
            willChange: 'transform, opacity' // Hardware acceleration hint
          }}
          animate={{
            y: [0, particle.speed * (isMobile ? 15 : 30), 0],
            x: [0, particle.speed * (isMobile ? 10 : 20), 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: (3 + particle.speed) * (isMobile ? 1.2 : 1),
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      ))}

      <div className="relative flex flex-col items-center text-center z-10">
        <motion.div
          initial={{ rotateY: 0, scale: 0.8, opacity: 0 }}
          animate={cubeAnimation}
          className="relative w-32 h-32 md:w-40 md:h-40 mb-8 md:mb-10"
          style={{ 
            transformStyle: "preserve-3d",
            willChange: 'transform' // Hardware acceleration hint
          }}
        >
          <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
            <div
              className="absolute inset-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600"
              style={{ transform: "translateZ(20px)" }}
            >
              <span className="text-white text-4xl font-bold">S</span>
            </div>
            
            <div
              className="absolute inset-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-pink-500"
              style={{ transform: "rotateY(180deg) translateZ(20px)" }}
            >
              <span className="text-white text-4xl font-bold">D</span>
            </div>
            
            <div
              className="absolute inset-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-teal-400"
              style={{ transform: "rotateY(90deg) translateZ(20px)" }}
            >
              <span className="text-white text-4xl font-bold">E</span>
            </div>
            
            <div
              className="absolute inset-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-blue-500"
              style={{ transform: "rotateY(-90deg) translateZ(20px)" }}
            >
              <span className="text-white text-4xl font-bold">V</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-4"
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ 
            opacity: 1, 
            filter: "blur(0px)", 
          }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{ willChange: 'opacity, filter' }}
        >
          {progressText}%
        </motion.div>

        <motion.h2
          variants={titleVariants}
          initial="initial"
          animate="animate"
          className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-6"
          style={{ willChange: 'transform, opacity' }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
            Saswat
          </span>.dev
        </motion.h2>
        
        <div className="w-56 md:w-64 h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
            variants={progressVariants}
            initial="initial"
            animate="animate"
            style={{ 
              originX: 0,
              willChange: 'transform'
            }}
          />
        </div>
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-4 text-sm text-gray-600 dark:text-gray-400"
          style={{ willChange: 'transform, opacity' }}
        >
          {loadingMessage}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default React.memo(LoadingScreen);