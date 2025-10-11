'use client';

import { useEffect, useState } from 'react';
import { Download, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Only show on mobile devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (!isMobile) {
      return; // Don't show button on desktop
    }

    // Check if already installed
    const isInStandaloneMode = 
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone ||
      document.referrer.includes('android-app://');

    setIsInstalled(isInStandaloneMode);

    if (isInStandaloneMode) {
      return;
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowButton(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    if (iOS && !isInStandaloneMode) {
      setShowButton(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
      localStorage.setItem('pwa-installed', 'true');
      setIsInstalled(true);
    }
    
    setDeferredPrompt(null);
  };

  // Don't show if already installed or not available
  if (isInstalled || !showButton) {
    return null;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleInstallClick}
            variant="outline"
            size="sm"
            className="fixed bottom-6 right-6 z-50 rounded-full border-white/20 bg-black/80 px-4 py-6 text-white shadow-lg backdrop-blur-sm transition-all hover:bg-white/10 hover:scale-105"
          >
            <Download className="h-5 w-5 mr-2" />
            <span className="hidden sm:inline">Install App</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left" className="bg-black/90 text-white border-white/20">
          <p>Install for quick access</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
