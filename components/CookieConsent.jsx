"use client";

import { useState, useEffect } from 'react';
import { Cookie, X, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setTimeout(() => setShowBanner(true), 2000);
    }
  }, []);

  const handleAcceptAll = () => {
    const consent = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
      timestamp: Date.now()
    };
    localStorage.setItem('cookie-consent', JSON.stringify(consent));
    setShowBanner(false);
    
    // Initialize analytics if accepted
    if (consent.analytics && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted'
      });
    }
  };

  const handleRejectAll = () => {
    const consent = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
      timestamp: Date.now()
    };
    localStorage.setItem('cookie-consent', JSON.stringify(consent));
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    const consent = {
      ...preferences,
      timestamp: Date.now()
    };
    localStorage.setItem('cookie-consent', JSON.stringify(consent));
    setShowBanner(false);
    setShowSettings(false);

    // Update analytics consent
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: preferences.analytics ? 'granted' : 'denied',
        ad_storage: preferences.marketing ? 'granted' : 'denied',
        functionality_storage: preferences.functional ? 'granted' : 'denied'
      });
    }
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-2xl">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex items-start gap-3 flex-1">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Cookie className="w-5 h-5 text-amber-600" />
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">استفاده از کوکی‌ها</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  ما از کوکی‌ها برای بهبود تجربه کاربری، تجزیه و تحلیل ترافیک و ارائه محتوای شخصی‌سازی شده استفاده می‌کنیم. 
                  با ادامه استفاده از سایت، استفاده از کوکی‌ها را می‌پذیرید.
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSettings(true)}
              >
                <Settings className="w-4 h-4 mr-1" />
                تنظیمات
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRejectAll}
              >
                رد همه
              </Button>
              <Button
                size="sm"
                onClick={handleAcceptAll}
              >
                پذیرش همه
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Cookie Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold">تنظیمات کوکی</h2>
              <button
                onClick={() => setShowSettings(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Necessary Cookies */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">کوکی‌های ضروری</h3>
                  <p className="text-sm text-gray-600">
                    این کوکی‌ها برای عملکرد اساسی وبسایت ضروری هستند و نمی‌توان آن‌ها را غیرفعال کرد.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={true}
                  disabled
                  className="mt-1"
                />
              </div>

              {/* Analytics Cookies */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">کوکی‌های تحلیلی</h3>
                  <p className="text-sm text-gray-600">
                    به ما کمک می‌کند تا نحوه استفاده شما از وبسایت را درک کنیم و آن را بهبود دهیم.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences(prev => ({ ...prev, analytics: e.target.checked }))}
                  className="mt-1"
                />
              </div>

              {/* Marketing Cookies */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">کوکی‌های بازاریابی</h3>
                  <p className="text-sm text-gray-600">
                    برای نمایش تبلیغات مرتبط و اندازه‌گیری اثربخشی کمپین‌های تبلیغاتی استفاده می‌شود.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) => setPreferences(prev => ({ ...prev, marketing: e.target.checked }))}
                  className="mt-1"
                />
              </div>

              {/* Functional Cookies */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">کوکی‌های عملکردی</h3>
                  <p className="text-sm text-gray-600">
                    برای ذخیره تنظیمات شما و شخصی‌سازی تجربه کاربری استفاده می‌شود.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.functional}
                  onChange={(e) => setPreferences(prev => ({ ...prev, functional: e.target.checked }))}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="sticky bottom-0 bg-white p-6 border-t flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setShowSettings(false)}>
                انصراف
              </Button>
              <Button onClick={handleSavePreferences}>
                ذخیره تنظیمات
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
