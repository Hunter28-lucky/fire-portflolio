'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isMobile || !mounted) return;

    // Add class to body to hide default cursor
    document.body.classList.add('custom-cursor-loaded');

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).getPropertyValue('cursor') === 'pointer'
      );
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.classList.remove('custom-cursor-loaded');
    };
  }, [isMobile, mounted]);

  if (isMobile || !mounted) {
    return null;
  }

  return (
    <div
      className={cn(
        'pointer-events-none fixed z-[9999] rounded-full bg-primary/50 shadow-lg shadow-primary/50 ring-2 ring-primary/70 backdrop-blur-sm transition-transform duration-200 ease-in-out',
        isPointer ? 'h-8 w-8 -translate-x-4 -translate-y-4' : 'h-4 w-4 -translate-x-2 -translate-y-2'
      )}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
}
