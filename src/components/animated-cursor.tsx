"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  char: string;
  opacity: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  color: string;
}

const CHARACTERS = "0123456789"; // Only numbers as requested "con số" in cursor
const PARTICLE_LIFESPAN = 50; 
const PARTICLE_FADE_SPEED = 1 / PARTICLE_LIFESPAN;
const MAX_PARTICLES = 30;
const EMIT_INTERVAL = 70; // ms

const COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--accent))',
  'hsl(var(--secondary-foreground))',
];

const AnimatedCursor: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const particleIdCounter = useRef(0);
  const lastEmitTime = useRef(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const addParticle = useCallback((x: number, y: number) => {
    const char = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
    const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    const newParticle: Particle = {
      id: particleIdCounter.current++,
      x,
      y,
      char,
      opacity: 0.8,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5 - 0.5, 
      life: PARTICLE_LIFESPAN + Math.random() * 20,
      size: 10 + Math.random() * 8,
      color: randomColor,
    };
    setParticles(prev => [newParticle, ...prev.slice(0, MAX_PARTICLES - 1)]);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const handleMouseMove = (event: MouseEvent) => {
      mousePos.current = { x: event.clientX, y: event.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isClient]);

  useEffect(() => {
    if (!isClient) return;

    let animationFrameId: number;
    const update = () => {
      const currentTime = Date.now();
      if (mousePos.current.x !== 0 && mousePos.current.y !== 0 && currentTime - lastEmitTime.current > EMIT_INTERVAL) {
        addParticle(mousePos.current.x, mousePos.current.y);
        lastEmitTime.current = currentTime;
      }

      setParticles(prevParticles =>
        prevParticles
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            opacity: Math.max(0, p.opacity - PARTICLE_FADE_SPEED),
            life: p.life - 1,
          }))
          .filter(p => p.life > 0 && p.opacity > 0)
      );
      animationFrameId = requestAnimationFrame(update);
    };
    animationFrameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrameId);
  }, [addParticle, isClient]);

  useEffect(() => {
    if (!isClient) return;
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden="true">
      {particles.map(p => (
        <span
          key={p.id}
          className="absolute font-mono select-none"
          style={{
            left: p.x,
            top: p.y,
            opacity: p.opacity,
            transform: 'translate(-50%, -50%)',
            fontSize: `${p.size}px`,
            color: p.color,
            textShadow: '0 0 5px hsla(var(--background), 0.5)',
          }}
        >
          {p.char}
        </span>
      ))}
       <div
        className="absolute w-2.5 h-2.5 rounded-full pointer-events-none ring-2 ring-offset-2 ring-offset-background ring-primary"
        style={{
            left: mousePos.current.x,
            top: mousePos.current.y,
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'hsl(var(--accent))', // Use accent for the dot itself
            transition: 'transform 0.1s ease-out', // Smooth follow
        }}
       />
    </div>
  );
};

export default AnimatedCursor;
