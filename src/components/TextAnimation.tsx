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
  const intervalRef = useRef<number | null>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(effect !== 'typewriter');

  // Only run typewriter if visible
  useEffect(() => {
    if (effect !== 'typewriter') return;
    const handleScroll = () => {
      if (!spanRef.current) return;
      const rect = spanRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [effect]);

  // Typewriter effect only if visible
  useEffect(() => {
    if (effect !== 'typewriter' || !isVisible) return;
    let index = 0;
    setDisplayedText('');
    const startTyping = () => {
      intervalRef.current = window.setInterval(() => {
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
  }, [text, speed, delay, effect, loop, isVisible]);

  // CSS-only pressure effect
  const renderPressureEffect = () =>
    text.split('').map((letter, index) => (
      <span
        key={index}
        className={`inline-block pressure-effect`}
        style={{ transitionDelay: `${index * 0.01}s` }}
      >
        {letter === ' ' ? '\u00A0' : letter}
      </span>
    ));

  // CSS-only wave effect
  const renderWaveEffect = () =>
    text.split('').map((letter, index) => (
      <span
        key={index}
        className="inline-block wave-effect"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        {letter === ' ' ? '\u00A0' : letter}
      </span>
    ));

  // CSS-only glow effect
  const renderGlowEffect = () =>
    text.split('').map((letter, index) => (
      <span
        key={index}
        className="inline-block glow-effect"
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

  return <span ref={spanRef} className={className}>{renderEffect()}</span>;
};

export default TextAnimation;
