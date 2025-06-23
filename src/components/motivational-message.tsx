"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { MOTIVATIONAL_QUOTES, QUOTE_CATEGORIES, type MotivationalQuote } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Quote, RefreshCw, User } from 'lucide-react';

const MotivationalMessage: React.FC = () => {
  const [currentQuote, setCurrentQuote] = useState<MotivationalQuote | null>(null);

  const getWeightedRandomQuote = useCallback(() => {
    const totalWeight = QUOTE_CATEGORIES.reduce((sum, category) => sum + category.weight, 0);
    let random = Math.random() * totalWeight;

    let selectedCategory = QUOTE_CATEGORIES[0].id;
    for (const category of QUOTE_CATEGORIES) {
      random -= category.weight;
      if (random <= 0) {
        selectedCategory = category.id;
        break;
      }
    }

    const categoryQuotes = MOTIVATIONAL_QUOTES.filter(quote => quote.category === selectedCategory);
    const randomIndex = Math.floor(Math.random() * categoryQuotes.length);
    setCurrentQuote(categoryQuotes[randomIndex] || MOTIVATIONAL_QUOTES[0]);
  }, []);

  useEffect(() => {
    getWeightedRandomQuote();
  }, [getWeightedRandomQuote]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getWeightedRandomQuote();
    }, 30000);

    return () => clearInterval(intervalId);
  }, [getWeightedRandomQuote]);

  return (
    <Card className="my-8 shadow-lg bg-card/80 backdrop-blur-sm w-full max-w-2xl mx-auto transition-all duration-300 hover:shadow-2xl hover:bg-card/90 hover:scale-[1.02]">
      <CardContent className="p-6">
        <div className="flex items-start space-x-3">
          <Quote className="w-8 h-8 text-accent flex-shrink-0 mt-1 transition-all duration-300 hover:text-primary hover:scale-110" aria-hidden="true" />
          <div className="flex-1">
            <p className="text-lg italic text-foreground/90 min-h-[6em] transition-colors duration-300 hover:text-foreground" role="status" aria-live="polite">
              {currentQuote?.text || ''}
            </p>
            {currentQuote?.author && (
              <div className="flex items-center space-x-1 mt-3 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                <span className="font-medium">{currentQuote.author}</span>
              </div>
            )}
          </div>
        </div>
        <div className="text-right mt-4">
          <Button variant="ghost" size="sm" onClick={getWeightedRandomQuote} aria-label="Xem câu nói khác" className="transition-all duration-300 hover:scale-105">
            <RefreshCw className="w-4 h-4 mr-2 transition-transform duration-300 hover:rotate-180" />
            Câu nói khác
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MotivationalMessage;
