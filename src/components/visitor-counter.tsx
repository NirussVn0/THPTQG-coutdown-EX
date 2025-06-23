"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Eye, Users } from 'lucide-react';


const VisitorCounter: React.FC = () => {
  const [visitorCount, setVisitorCount] = useState<number>(0);
  const [isClient, setIsClient] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isNewVisitor, setIsNewVisitor] = useState(false);

  // Debug function to reset counter (remove in production)
  const resetCounter = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('thptqg-visitor-count');
      localStorage.removeItem('thptqg-last-visit');
      window.location.reload();
    }
  };

  useEffect(() => {
    setIsClient(true);

    // Get or initialize visitor count
    const getVisitorCount = () => {
      try {
      const stored = localStorage.getItem('thptqg-visitor-count');
      const lastVisit = localStorage.getItem('thptqg-last-visit');
      const today = new Date().toDateString();

      // Base count to make it look more realistic
      const baseCount = 1247;

      // If no stored count exists (first time ever), initialize with base count
      if (!stored) {
        const initialCount = baseCount + Math.floor(Math.random() * 50); // Add some randomness
        localStorage.setItem('thptqg-visitor-count', initialCount.toString());
        localStorage.setItem('thptqg-last-visit', today);

        // Mark as new visitor and animate
        setIsNewVisitor(true);
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 600);

        return initialCount;
      }

      const currentCount = parseInt(stored, 10);

      // If it's a new day, increment counter
      if (!lastVisit || lastVisit !== today) {
        const newCount = currentCount + Math.floor(Math.random() * 5) + 1; // Add 1-5 visitors

        localStorage.setItem('thptqg-visitor-count', newCount.toString());
        localStorage.setItem('thptqg-last-visit', today);

        // Mark as new visitor and animate
        setIsNewVisitor(true);
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 600);

        return newCount;
      }

      // Return existing count for same day
      return currentCount;
      } catch (error) {
        console.error('Error accessing localStorage:', error);
        // Fallback to a default count if localStorage fails
        return 1247 + Math.floor(Math.random() * 50);
      }
    };

    const count = getVisitorCount();
    setVisitorCount(count);
  }, []);

  const formatVisitorCount = (count: number): string => {
    // Handle invalid numbers
    if (isNaN(count) || count < 0) {
      return '---';
    }

    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  if (!isClient) {
    return (
      <div className="flex items-center space-x-2 px-3 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-border/30">
        <Eye className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-medium text-muted-foreground">---</span>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onDoubleClick={resetCounter}
            className={`flex items-center space-x-2 px-3 py-2 h-auto rounded-full bg-card/50 backdrop-blur-sm border border-border/30 transition-all duration-300 hover:bg-card/70 hover:scale-105 hover:shadow-lg hover:shadow-primary/10 group ${
              isNewVisitor ? 'animate-pulse bg-accent/20 border-accent/50' : ''
            }`}
            aria-label={`Website visitors: ${visitorCount}`}
            title="Double-click to reset counter (dev only)"
          >
            <Eye className={`w-4 h-4 text-primary transition-all duration-300 group-hover:text-accent eye-blink ${
              isAnimating ? 'animate-pulse scale-110' : ''
            }`} />
            <span className={`text-sm font-medium text-foreground transition-all duration-300 group-hover:text-accent ${
              isAnimating ? 'count-up' : ''
            }`}>
              {formatVisitorCount(visitorCount)}
            </span>
          </Button>
        </TooltipTrigger>
        <TooltipContent 
          side="bottom" 
          className="bg-card/95 backdrop-blur-md border border-border/50 shadow-xl"
        >
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>
              {visitorCount <= 1250
                ? 'Welcome! You are among our first visitors! 🎉'
                : `${visitorCount.toLocaleString()} total visitors`
              }
            </span>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default VisitorCounter;
