"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CountdownDisplayItemProps {
  value: number;
  unit: string;
}

const CountdownDisplayItem: React.FC<CountdownDisplayItemProps> = ({ value, unit }) => {
  const [previousValue, setPreviousValue] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (value !== previousValue) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setPreviousValue(value);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [value, previousValue]);
  return (
    <Card className={`text-center shadow-lg bg-card/80 backdrop-blur-sm w-28 sm:w-36 countdown-card ${
      isAnimating ? 'pulse-glow' : ''
    }`}>
      <CardHeader className="pb-2 pt-4">
        <CardTitle className={`text-4xl sm:text-5xl font-bold text-primary tabular-nums transition-colors duration-300 hover:text-accent ${
          isAnimating ? 'number-change' : ''
        }`}>
          <span className={isAnimating ? 'flip-number' : ''}>
            {value.toString().padStart(2, '0')}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-sm sm:text-base text-muted-foreground uppercase tracking-wider transition-colors duration-300 hover:text-foreground">
          {unit}
        </p>
      </CardContent>
    </Card>
  );
};

export default CountdownDisplayItem;
