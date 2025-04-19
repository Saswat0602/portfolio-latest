import { motion } from 'framer-motion';



const RealCodeSnippet: React.FC<{ code: string, opacity: number, top: number, left: number, width: number, fontSize: number }> = ({ 
  code, opacity, top, left, width, fontSize
}) => {
  return (
    <motion.pre 
      className="absolute font-mono opacity-0 text-blue-600/40 dark:text-blue-400/50 pointer-events-none overflow-hidden"
      style={{ 
        top: `${top}%`,
        left: `${left}%`,
        width: `${width}px`,
        lineHeight: '1.6',
        maxHeight: '400px',
        fontSize: `${fontSize}px`
      }}
      animate={{ 
        opacity: [0, opacity],
        y: [10, 0] 
      }}
      transition={{
        duration: 1,
        delay: Math.random() * 0.5,
      }}
    >
      {code}
    </motion.pre>
  );
};

export default RealCodeSnippet