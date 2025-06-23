"use client";

import React, { useEffect, useState } from 'react';

interface PageAnimationsProps {
  children: React.ReactNode;
  className?: string;
  animationType?: 'fadeInUp' | 'fadeIn' | 'slideInLeft' | 'slideInRight' | 'scaleIn';
  delay?: number;
}

const PageAnimations: React.FC<PageAnimationsProps> = ({ 
  children, 
  className = '', 
  animationType = 'fadeInUp',
  delay = 0 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

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
      className={`${isVisible ? getAnimationClass() : 'opacity-0'} ${getDelayClass()} ${className}`}
      style={{ animationFillMode: 'both' }}
    >
      {children}
    </div>
  );
};

export default PageAnimations;
