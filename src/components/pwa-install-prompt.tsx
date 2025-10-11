'use client';

import { useEffect, useState } from 'react';
import { X, Download, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Only show on mobile devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (!isMobile) {
      return; // Don't show popup on desktop
    }

    // Check if already installed (standalone mode)
    const isInStandaloneMode = 
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone ||
      document.referrer.includes('android-app://');

    setIsStandalone(isInStandaloneMode);

    // Check if iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(iOS);

    // Check if user has already dismissed or installed
    const hasSeenPrompt = localStorage.getItem('pwa-prompt-dismissed');
    const hasInstalled = localStorage.getItem('pwa-installed');

    if (isInStandaloneMode) {
      localStorage.setItem('pwa-installed', 'true');
      return;
    }

    if (hasInstalled || hasSeenPrompt) {
      return;
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show prompt after a short delay (2 seconds) for better UX
      setTimeout(() => {
        setShowPrompt(true);
      }, 2000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // For iOS, show prompt after delay if not in standalone mode
    if (iOS && !isInStandaloneMode && !hasSeenPrompt && !hasInstalled) {
      setTimeout(() => {
        setShowPrompt(true);
      }, 2000);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt && !isIOS) {
      return;
    }

    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt();
      
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
        localStorage.setItem('pwa-installed', 'true');
      } else {
        console.log('User dismissed the install prompt');
        localStorage.setItem('pwa-prompt-dismissed', 'true');
      }
      
      setDeferredPrompt(null);
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-prompt-dismissed', 'true');
  };

  // Don't show anything if already installed or shouldn't show
  if (isStandalone || !showPrompt) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-300 overflow-y-auto">
      <div className="relative w-full max-w-sm my-auto rounded-2xl border border-white/10 bg-gradient-to-br from-gray-900 via-black to-gray-900 p-5 shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute right-3 top-3 rounded-full p-1.5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Icon */}
        <div className="mb-3 flex justify-center">
          <div className="rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-3">
            <Smartphone className="h-6 w-6 text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="text-center">
          <h3 className="mb-2 text-lg font-bold text-white">
            Install Krish Goswami
          </h3>
          <p className="mb-4 text-xs text-gray-300">
            {isIOS
              ? "Add to your home screen for quick access!"
              : "Install for quick access and offline use!"}
          </p>

          {/* Features - More compact */}
          <div className="mb-4 space-y-1.5 text-left">
            <div className="flex items-center gap-2 text-xs text-gray-300">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/20">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
              </div>
              <span>⚡ Lightning fast</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-300">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/20">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              </div>
              <span>📱 Works offline</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-300">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-500/20">
                <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
              </div>
              <span>🎯 Native experience</span>
            </div>
          </div>

          {/* iOS Instructions - More compact */}
          {isIOS && (
            <div className="mb-4 rounded-lg bg-blue-500/10 p-3 text-left">
              <p className="mb-1.5 text-xs font-semibold text-blue-400">
                How to install:
              </p>
              <ol className="space-y-0.5 text-[10px] leading-relaxed text-gray-300">
                <li>1. Tap Share button (bottom)</li>
                <li>2. Tap "Add to Home Screen"</li>
                <li>3. Tap "Add" (top right)</li>
              </ol>
            </div>
          )}

          {/* Buttons - More compact */}
          <div className="flex flex-col gap-2">
            {!isIOS && deferredPrompt && (
              <Button
                onClick={handleInstallClick}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 h-10 text-sm"
              >
                <Download className="mr-2 h-4 w-4" />
                Install App
              </Button>
            )}
            <Button
              onClick={handleDismiss}
              variant="outline"
              className="w-full border-white/10 text-gray-300 hover:bg-white/5 h-9 text-xs"
            >
              Maybe Later
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
