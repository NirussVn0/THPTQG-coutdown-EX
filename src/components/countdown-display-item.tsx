"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CountdownDisplayItemProps {
  value: number;
  unit: string;
}

const CountdownDisplayItem: React.FC<CountdownDisplayItemProps> = ({ value, unit }) => {
  return (
    <Card className="text-center shadow-lg bg-card/80 backdrop-blur-sm w-28 sm:w-36">
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-4xl sm:text-5xl font-bold text-primary tabular-nums">
          {value.toString().padStart(2, '0')}
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-sm sm:text-base text-muted-foreground uppercase tracking-wider">{unit}</p>
      </CardContent>
    </Card>
  );
};

export default CountdownDisplayItem;
