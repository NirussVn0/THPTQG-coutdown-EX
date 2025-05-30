"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CountdownDisplayItemProps {
  value: number;
  unit: string;
}

const CountdownDisplayItem: React.FC<CountdownDisplayItemProps> = ({ value, unit }) => {
  return (
    <Card className="text-center shadow-lg bg-card/80 backdrop-blur-sm w-28 sm:w-36 transition-all duration-300 hover:shadow-xl hover:bg-card/90 hover:scale-105 hover:-translate-y-1">
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-4xl sm:text-5xl font-bold text-primary tabular-nums transition-colors duration-300 hover:text-accent">
          {value.toString().padStart(2, '0')}
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-sm sm:text-base text-muted-foreground uppercase tracking-wider transition-colors duration-300 hover:text-foreground">{unit}</p>
      </CardContent>
    </Card>
  );
};

export default CountdownDisplayItem;
