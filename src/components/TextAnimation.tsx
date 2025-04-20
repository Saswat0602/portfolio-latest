import React, { useState, useEffect, useRef } from 'react';

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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Combined typewriter effect in one useEffect
  useEffect(() => {
    if (effect !== 'typewriter') return;

    let index = 0;

    const startTyping = () => {
      intervalRef.current = setInterval(() => {
        index += 1;
        setDisplayedText(text.slice(0, index));

        if (index >= text.length) {
          clearInterval(intervalRef.current!);
          if (loop) {
            setTimeout(() => {
              setDisplayedText('');
              startTyping();
              index = 0;
            }, 2000);
          }
        }
      }, speed);
    };

    const delayTimer = setTimeout(() => {
      startTyping();
    }, delay);

    return () => {
      clearTimeout(delayTimer);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, speed, delay, effect, loop]);

  const handleLetterHover = (index: number) => {
    if (effect === 'pressure') setHoveredIndex(index);
  };

  const handleLetterLeave = () => {
    if (effect === 'pressure') setHoveredIndex(null);
  };

  const renderPressureEffect = () =>
    text.split('').map((letter, index) => {
      let styleClass = '';
      if (hoveredIndex !== null) {
        const distance = Math.abs(hoveredIndex - index);
        if (distance === 0) styleClass = 'transform scale-150 text-blue-500 font-bold';
        else if (distance === 1) styleClass = 'transform scale-125 text-blue-400';
        else if (distance === 2) styleClass = 'transform scale-110 text-blue-300';
      }

      return (
        <span
          key={index}
          className={`inline-block transition-all duration-200 ${styleClass}`}
          onMouseEnter={() => handleLetterHover(index)}
          onMouseLeave={handleLetterLeave}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      );
    });

  const renderWaveEffect = () =>
    text.split('').map((letter, index) => (
      <span
        key={index}
        className="inline-block"
        style={{
          animation: `waveAnimation 1.5s ease-in-out infinite`,
          animationDelay: `${index * 0.1}s`,
        }}
      >
        {letter === ' ' ? '\u00A0' : letter}
      </span>
    ));

  const renderGlowEffect = () =>
    text.split('').map((letter, index) => (
      <span
        key={index}
        className="inline-block hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 transition-all duration-300"
      >
        {letter === ' ' ? '\u00A0' : letter}
      </span>
    ));

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
