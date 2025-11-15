'use client';

import { useEffect, useState } from 'react';
import { X, Download } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);

  useEffect(() => {
    // Only show on mobile devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (!isMobile) {
      return; // Don't show on desktop
    }

    // Check if already installed (standalone mode)
    const isInStandaloneMode = 
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone ||
      document.referrer.includes('android-app://');

    setIsStandalone(isInStandaloneMode);

    // Check if iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as Window & { MSStream?: unknown }).MSStream;
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
      
      // Show banner immediately (no delay)
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // For iOS, show banner immediately if not in standalone mode
    if (iOS && !isInStandaloneMode && !hasSeenPrompt && !hasInstalled) {
      setShowPrompt(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      // For iOS, toggle instructions
      setShowIOSInstructions(!showIOSInstructions);
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
        setShowPrompt(false);
      } else {
        console.log('User dismissed the install prompt');
        localStorage.setItem('pwa-prompt-dismissed', 'true');
        setShowPrompt(false);
      }
      
      setDeferredPrompt(null);
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
    <>
      {/* Subtle bottom banner - no blur, no blocking overlay */}
      <div className="fixed bottom-0 left-0 right-0 z-[9999] animate-in slide-in-from-bottom-4 duration-500">
        <div className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
          <div className="relative rounded-lg border border-primary/20 bg-gray-900/95 backdrop-blur-md shadow-lg">
            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="absolute right-2 top-2 rounded-full p-1 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Content */}
            <div className="flex items-center gap-3 p-3 pr-10">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
                  <Download className="h-5 w-5 text-white" />
                </div>
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white">
                  Install App
                </p>
                <p className="text-xs text-gray-300">
                  {isIOS ? "Add to home screen for quick access" : "Get faster access & offline mode"}
                </p>
              </div>

              {/* Action button */}
              <button
                onClick={handleInstallClick}
                className="flex-shrink-0 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 text-sm font-medium text-white transition-all hover:from-purple-700 hover:to-pink-700 active:scale-95"
              >
                {isIOS ? "How?" : "Install"}
              </button>
            </div>

            {/* iOS Instructions (expandable) */}
            {isIOS && showIOSInstructions && (
              <div className="border-t border-white/10 bg-blue-500/10 p-3 animate-in slide-in-from-top-2 duration-300">
                <p className="mb-2 text-xs font-semibold text-blue-400">
                  📱 How to install:
                </p>
                <ol className="space-y-1 text-xs text-gray-300 pl-4">
                  <li>1. Tap the <strong>Share</strong> button at the bottom</li>
                  <li>2. Scroll and tap <strong>&ldquo;Add to Home Screen&rdquo;</strong></li>
                  <li>3. Tap <strong>&ldquo;Add&rdquo;</strong> at the top right</li>
                </ol>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
