import React, { useState, useEffect } from 'react';

interface TextAnimationProps {
  text: string;
  className?: string;
  effect?: 'pressure' | 'typewriter' | 'wave' | 'glow';
  speed?: number;
  delay?: number;
  loop?: boolean;
}

const TextAnimation: React.FC<TextAnimationProps> = ({
  text,
  className = '',
  effect = 'pressure',
  speed = 30,
  delay = 0,
  loop = false
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Typewriter effect
  useEffect(() => {
    if (effect === 'typewriter') {
      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, speed);
        
        return () => clearTimeout(timeout);
      } else if (loop) {
        const timeout = setTimeout(() => {
          setDisplayedText('');
          setCurrentIndex(0);
        }, 2000);
        
        return () => clearTimeout(timeout);
      }
    }
  }, [currentIndex, effect, loop, speed, text]);

  // Initialize typewriter on mount
  useEffect(() => {
    if (effect === 'typewriter') {
      const timeout = setTimeout(() => {
        setDisplayedText('');
        setCurrentIndex(0);
      }, delay);
      
      return () => clearTimeout(timeout);
    }
  }, [delay, effect]);

  // Handle pressure effect
  const handleLetterHover = (index: number) => {
    if (effect === 'pressure') {
      setHoveredIndex(index);
    }
  };

  const handleLetterLeave = () => {
    if (effect === 'pressure') {
      setHoveredIndex(null);
    }
  };

  const renderPressureEffect = () => {
    return text.split('').map((letter, index) => (
      <span
        key={`${letter}-${index}`}
        className={`inline-block transition-all duration-200 ${
          hoveredIndex === index
            ? 'transform scale-150 text-blue-500 font-bold'
            : hoveredIndex !== null && Math.abs(hoveredIndex - index) === 1
            ? 'transform scale-125 text-blue-400'
            : hoveredIndex !== null && Math.abs(hoveredIndex - index) === 2
            ? 'transform scale-110 text-blue-300'
            : ''
        }`}
        onMouseEnter={() => handleLetterHover(index)}
        onMouseLeave={handleLetterLeave}
      >
        {letter === ' ' ? '\u00A0' : letter}
      </span>
    ));
  };

  const renderWaveEffect = () => {
    return text.split('').map((letter, index) => (
      <span
        key={`${letter}-${index}`}
        className="inline-block"
        style={{
          animation: `waveAnimation 1.5s ease-in-out infinite`,
          animationDelay: `${index * 0.1}s`,
        }}
      >
        {letter === ' ' ? '\u00A0' : letter}
      </span>
    ));
  };

  const renderGlowEffect = () => {
    return text.split('').map((letter, index) => (
      <span
        key={`${letter}-${index}`}
        className="inline-block hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 transition-all duration-300"
      >
        {letter === ' ' ? '\u00A0' : letter}
      </span>
    ));
  };

  const renderEffect = () => {
    switch (effect) {
      case 'pressure':
        return renderPressureEffect();
      case 'typewriter':
        return displayedText;
      case 'wave':
        return renderWaveEffect();
      case 'glow':
        return renderGlowEffect();
      default:
        return text;
    }
  };

  return <span className={className}>{renderEffect()}</span>;
};

export default TextAnimation; 