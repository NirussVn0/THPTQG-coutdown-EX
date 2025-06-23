"use client";

import React from 'react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  animationType?: 'fadeInUp' | 'fadeIn' | 'slideInLeft' | 'slideInRight' | 'scaleIn';
  threshold?: number;
  delay?: number;
}

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  className = '',
  animationType = 'fadeInUp',
  threshold = 0.1,
  delay = 0,
}) => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    triggerOnce: true,
  });

  const getAnimationClass = () => {
    switch (animationType) {
      case 'fadeIn':
        return 'animate-fade-in';
      case 'slideInLeft':
        return 'animate-slide-in-left';
      case 'slideInRight':
        return 'animate-slide-in-right';
      case 'scaleIn':
        return 'animate-scale-in';
      default:
        return 'animate-fade-in-up';
    }
  };

  const getDelayClass = () => {
    if (delay <= 100) return 'animate-delay-100';
    if (delay <= 200) return 'animate-delay-200';
    if (delay <= 300) return 'animate-delay-300';
    if (delay <= 400) return 'animate-delay-400';
    if (delay <= 500) return 'animate-delay-500';
    if (delay <= 600) return 'animate-delay-600';
    return '';
  };

  return (
    <div
      ref={ref}
      className={`${
        isIntersecting ? getAnimationClass() : 'opacity-0 translate-y-8'
      } ${getDelayClass()} ${className}`}
      style={{ 
        animationFillMode: 'both',
        animationDelay: delay ? `${delay}ms` : undefined,
      }}
    >
      {children}
    </div>
  );
};

export default ScrollAnimation;
