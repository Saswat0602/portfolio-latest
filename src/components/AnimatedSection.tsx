import React, { ReactNode } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  threshold?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  id,
  direction = 'up',
  delay = 0,
  threshold = 0.1,
  duration = 0.7,
  distance = 50,
  once = true,
}) => {
  const { ref, isVisible } = useScrollAnimation({
    threshold,
    triggerOnce: once,
  });

  // Determine transform based on direction
  const getTransformInitial = () => {
    switch (direction) {
      case 'up':
        return `translateY(${distance}px)`;
      case 'down':
        return `translateY(-${distance}px)`;
      case 'left':
        return `translateX(${distance}px)`;
      case 'right':
        return `translateX(-${distance}px)`;
      default:
        return `translateY(${distance}px)`;
    }
  };

  const animationStyle = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translate3d(0, 0, 0)' : getTransformInitial(),
    transition: `opacity ${duration}s ease-out, transform ${duration}s ease-out`,
    transitionDelay: `${delay}s`,
  };

  return (
    <section 
      id={id} 
      ref={ref as React.RefObject<HTMLElement>}
      className={className}
      style={animationStyle}
    >
      {children}
    </section>
  );
};

export default AnimatedSection; 