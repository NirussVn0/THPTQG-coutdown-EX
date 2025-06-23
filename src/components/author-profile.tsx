"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Github, ExternalLink } from 'lucide-react';

const AuthorProfile: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleProfileClick = () => {
    window.open('https://github.com/NirussVn0/', '_blank', 'noopener,noreferrer');
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleProfileClick}
            className="relative w-10 h-10 p-0 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/25 group overflow-hidden"
            aria-label="Visit NirussVn0's GitHub Profile"
          >
            {!imageError ? (
              <div className="relative w-full h-full">
                <img
                  src="https://github.com/NirussVn0.png"
                  alt="NirussVn0 GitHub Avatar"
                  className={`w-full h-full rounded-full object-cover transition-all duration-300 ${
                    imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  } group-hover:scale-110 group-hover:brightness-110`}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-primary/30 transition-colors duration-300" />
                {/* GitHub icon overlay on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 rounded-full">
                  <ExternalLink className="w-4 h-4 text-white drop-shadow-lg" />
                </div>
              </div>
            ) : (
              <div className="w-full h-full rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Github className="w-5 h-5 text-primary-foreground" />
              </div>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent 
          side="bottom" 
          className="bg-card/95 backdrop-blur-md border border-border/50 shadow-xl"
        >
          <div className="flex items-center space-x-2">
            <Github className="w-4 h-4" />
            <span>Visit NirussVn0's GitHub</span>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AuthorProfile;
