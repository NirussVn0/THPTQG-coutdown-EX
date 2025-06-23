"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Sun, Moon, Eye, Zap, Palette } from 'lucide-react';

export interface ThemeConfig {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

const THEMES: ThemeConfig[] = [
  {
    id: 'light',
    name: 'Sáng',
    icon: <Sun className="w-4 h-4" />,
    description: 'Giao diện sáng mặc định'
  },
  {
    id: 'dark',
    name: 'Tối',
    icon: <Moon className="w-4 h-4" />,
    description: 'Giao diện tối dễ nhìn'
  },
  {
    id: 'focus',
    name: 'Tập trung',
    icon: <Eye className="w-4 h-4" />,
    description: 'Màu sắc nhẹ nhàng, tập trung cao'
  },
  {
    id: 'energetic',
    name: 'Năng động',
    icon: <Zap className="w-4 h-4" />,
    description: 'Màu sắc sống động, tràn năng lượng'
  }
];

const ThemeToggle: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<string>('light');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedTheme = localStorage.getItem('thptqg-theme') || 'light';
    setCurrentTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (themeId: string) => {
    const root = document.documentElement;
    root.className = root.className.replace(/theme-\w+/g, '');
    root.classList.add(`theme-${themeId}`);
    
    if (themeId === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  const handleThemeChange = (themeId: string) => {
    setCurrentTheme(themeId);
    localStorage.setItem('thptqg-theme', themeId);
    applyTheme(themeId);
  };

  const getCurrentThemeConfig = () => {
    return THEMES.find(theme => theme.id === currentTheme) || THEMES[0];
  };

  if (!isClient) {
    return (
      <Button variant="ghost" size="sm" className="w-10 h-10 p-0">
        <Palette className="w-4 h-4" />
      </Button>
    );
  }

  const currentThemeConfig = getCurrentThemeConfig();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-10 h-10 p-0 transition-all duration-300 hover:scale-110 hover:bg-accent/20"
          aria-label="Chọn giao diện"
        >
          {currentThemeConfig.icon}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-56 bg-card/95 backdrop-blur-md border border-border/50 shadow-xl"
      >
        {THEMES.map((theme) => (
          <DropdownMenuItem
            key={theme.id}
            onClick={() => handleThemeChange(theme.id)}
            className={`flex items-center space-x-3 p-3 cursor-pointer transition-all duration-300 hover:bg-accent/20 ${
              currentTheme === theme.id ? 'bg-accent/10 border-l-2 border-l-accent' : ''
            }`}
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-background/50">
              {theme.icon}
            </div>
            <div className="flex-1">
              <div className="font-medium text-foreground">{theme.name}</div>
              <div className="text-xs text-muted-foreground">{theme.description}</div>
            </div>
            {currentTheme === theme.id && (
              <div className="w-2 h-2 rounded-full bg-accent"></div>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;
