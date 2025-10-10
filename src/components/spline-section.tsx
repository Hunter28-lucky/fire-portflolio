'use client';

import { useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

export default function SplineSection() {
  const isMobile = useIsMobile();
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Delay loading on mobile for better initial performance
    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, isMobile ? 1500 : 0);

    return () => clearTimeout(timer);
  }, [isMobile]);

  // Don't render 3D on very small screens or until ready
  if (!shouldLoad || (typeof window !== 'undefined' && window.innerWidth < 640)) {
    return (
      <section className="relative h-[200px] w-full md:h-[600px] -mt-12 md:-mt-48 flex items-center justify-center">
        <div className="text-center text-muted-foreground text-sm">
          {!shouldLoad ? 'Loading 3D experience...' : ''}
        </div>
      </section>
    );
  }

  return (
    <section 
      className="relative h-[300px] w-full md:h-[600px] -mt-24 md:-mt-48"
      style={{ contentVisibility: 'auto' }}
    >
      <spline-viewer
        loading-anim-type="spinner-small-dark"
        url="https://prod.spline.design/XVb4L3YwyNlw6ppz/scene.splinecode"
      />
    </section>
  );
}
