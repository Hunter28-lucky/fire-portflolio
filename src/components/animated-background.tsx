'use client';

import { useIsMobile } from '@/hooks/use-mobile';

export default function AnimatedBackground() {
  const isMobile = useIsMobile();

  return (
    <div 
      className="fixed left-0 top-0 -z-50 h-full w-full"
      style={{ 
        willChange: 'auto',
        transform: 'translateZ(0)', // GPU acceleration
      }}
    >
      {/* Simplified gradient on mobile for better performance */}
      {isMobile ? (
        <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,hsl(var(--primary)/0.2),#ffffff00)]"></div>
      ) : (
        <>
          <div className="absolute inset-0 -z-20 h-full w-full bg-background bg-[radial-gradient(#ffffff11_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,hsl(var(--primary)/0.3),#ffffff00)]"></div>
        </>
      )}
    </div>
  );
}
