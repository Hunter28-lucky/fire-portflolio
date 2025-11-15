'use client';

import { useEffect } from 'react';

/**
 * Performance optimizer for mobile devices
 * Reduces unnecessary reflows and paints
 */
export default function PerformanceOptimizer() {
  useEffect(() => {
    // Detect if device is low-end mobile
    const isLowEndDevice = () => {
      if (typeof window === 'undefined') return false;
      
      // Check for mobile device
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      
      // Check for hardware concurrency (CPU cores)
      const cpuCores = navigator.hardwareConcurrency || 2;
      
      // Check for device memory (if available)
      const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory || 4;
      
      return isMobile && (cpuCores <= 4 || deviceMemory <= 4);
    };

    if (isLowEndDevice()) {
      // Add class to body for CSS optimizations
      document.body.classList.add('low-end-device');
      
      // Disable smooth scroll on low-end devices
      document.documentElement.style.scrollBehavior = 'auto';
      
      // Reduce motion if preferred
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        document.body.classList.add('reduce-motion');
      }
    }

    // Optimize scroll performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Throttle scroll events
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return null;
}
