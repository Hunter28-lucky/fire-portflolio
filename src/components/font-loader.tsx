'use client';

import { useEffect } from 'react';

export default function FontLoader() {
  useEffect(() => {
    // Load fonts asynchronously for better performance
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Space+Grotesk:wght@400;700&family=Source+Code+Pro:wght@400;700&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);
  }, []);

  return null;
}
