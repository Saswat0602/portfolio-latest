import { motion } from 'framer-motion';

const RealCodeSnippet: React.FC<{ 
  code: string, 
  opacity: number, 
  top: number, 
  left: number, 
  width: number, 
  fontSize: number,
  gradient: string
}> = ({ 
  code, opacity, top, left, width, fontSize, gradient 
}) => {
  return (
    <motion.pre 
      className={`absolute font-mono pointer-events-none overflow-hidden text-transparent bg-clip-text bg-gradient-to-r ${gradient}`}
      style={{ 
        top: `${top}%`,
        left: `${left}%`,
        width: `${width}px`,
        lineHeight: '1.6',
        maxHeight: '400px',
        fontSize: `${fontSize}px`,
        opacity,
      }}
      animate={{
        y: ['-100vh', '100vh'],
      }}
      transition={{
        duration: 20 + Math.random() * 10,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {code}
    </motion.pre>
  );
};


export default RealCodeSnippet;
