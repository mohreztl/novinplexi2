"use client";

import { useState, useEffect } from 'react';
import { X, Download, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function PWAPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if running as PWA
    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);
    
    // Check if iOS
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent));

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      // Don't show if already dismissed
      if (!localStorage.getItem('pwa-dismissed')) {
        setShowPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // For iOS devices
    if (isIOS && !isStandalone && !localStorage.getItem('pwa-dismissed')) {
      setTimeout(() => setShowPrompt(true), 3000);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, [isIOS, isStandalone]);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      setDeferredPrompt(null);
    }
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-dismissed', 'true');
  };

  if (!showPrompt || isStandalone) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96">
      <div className="bg-white rounded-xl shadow-2xl border p-6 relative">
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <Smartphone className="w-6 h-6 text-white" />
          </div>
          
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-2">نصب نوین پلکسی</h3>
            <p className="text-gray-600 text-sm mb-4">
              {isIOS 
                ? 'برای نصب اپلیکیشن، روی دکمه "اشتراک‌گذاری" و سپس "Add to Home Screen" کلیک کنید.'
                : 'نوین پلکسی را روی دستگاه خود نصب کنید تا دسترسی سریع‌تری داشته باشید.'
              }
            </p>
            
            {!isIOS && (
              <Button onClick={handleInstallClick} className="w-full">
                <Download className="w-4 h-4 mr-2" />
                نصب اپلیکیشن
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
