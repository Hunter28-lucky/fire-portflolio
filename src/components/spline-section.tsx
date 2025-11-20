'use client';

import { useEffect, useState, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

export default function SplineSection() {
  const isMobile = useIsMobile();
  const [shouldLoad, setShouldLoad] = useState(false);
  const viewerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Delay loading on mobile for better initial performance
    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, isMobile ? 1500 : 0);

    return () => clearTimeout(timer);
  }, [isMobile]);

  useEffect(() => {
    if (!shouldLoad) return;

    // Remove Spline branding after viewer loads
    const removeSplineBranding = () => {
      const viewer = viewerRef.current;
      if (!viewer) return;

      // Access shadow DOM
      const shadowRoot = (viewer as any).shadowRoot;
      if (shadowRoot) {
        const logo = shadowRoot.querySelector('#logo');
        if (logo) {
          (logo as HTMLElement).style.display = 'none';
        }
      }
    };

    // Try multiple times as the viewer might load asynchronously
    const intervals = [500, 1000, 2000, 3000];
    const timers = intervals.map(delay => 
      setTimeout(removeSplineBranding, delay)
    );

    return () => timers.forEach(clearTimeout);
  }, [shouldLoad]);

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
        ref={viewerRef as any}
        loading-anim-type="spinner-small-dark"
        url="https://prod.spline.design/XVb4L3YwyNlw6ppz/scene.splinecode"
      />
    </section>
  );
}
