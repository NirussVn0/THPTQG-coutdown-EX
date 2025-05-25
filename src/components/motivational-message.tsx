"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { MOTIVATIONAL_QUOTES } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Quote, RefreshCw } from 'lucide-react';

const MotivationalMessage: React.FC = () => {
  const [currentQuote, setCurrentQuote] = useState<string>('');

  const getRandomQuote = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);
    setCurrentQuote(MOTIVATIONAL_QUOTES[randomIndex]);
  }, []);

  useEffect(() => {
    getRandomQuote();
  }, [getRandomQuote]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getRandomQuote();
    }, 30000); // Change quote every 30 seconds

    return () => clearInterval(intervalId);
  }, [getRandomQuote]);

  return (
    <Card className="my-8 shadow-lg bg-card/80 backdrop-blur-sm w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <div className="flex items-start space-x-3">
          <Quote className="w-8 h-8 text-accent flex-shrink-0 mt-1" aria-hidden="true" />
          <p className="text-lg italic text-foreground/90 min-h-[6em]" role="status" aria-live="polite">
            {currentQuote}
          </p>
        </div>
        <div className="text-right mt-4">
          <Button variant="ghost" size="sm" onClick={getRandomQuote} aria-label="Xem câu nói khác">
            <RefreshCw className="w-4 h-4 mr-2" />
            Câu nói khác
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MotivationalMessage;
