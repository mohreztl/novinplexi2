import AuthProvider from "@/components/AuthProvider";
import "./globals.css";
import localFont from 'next/font/local';
import { Toaster } from 'sonner';
import { GoogleAnalytics } from '@next/third-parties/google';
import { PWAPrompt } from '@/components/PWAPrompt';
import { CookieConsent } from '@/components/CookieConsent';
import ClientOnly from '@/components/ClientOnly';
import NoSSR from '@/components/NoSSR';
import FontPreloader from '@/components/FontPreloader';



const yekanBakh = localFont({
  src: [
    {
      path: "../fonts/YekanBakh/IRANSansXFaNum-Regular.woff2",
      weight: '400',
      style: 'normal',
    },
    {
      path: "../fonts/YekanBakh/IRANSansXFaNum-Bold.woff2",
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-yekanbakh',
  display: 'swap',
  preload: true,
});

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" className={yekanBakh.variable}>
      <head>
        <FontPreloader />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://storage.c2.liara.space" crossOrigin="anonymous" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        
        {/* Favicon and Apple Touch Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Manifest */}
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Theme Color */}
        <meta name="theme-color" content="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        
        {/* Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      
      <body className={`${yekanBakh.variable} `}>
        <AuthProvider>
          {children}
          <Toaster position="top-center" richColors />
          <NoSSR>
            {/* Don't show PWA prompt or cookie consent on admin routes */}
            {/* usePathname is only available client-side via a small inline script wrapper in SSR layout, so we render them conditionally in a client wrapper below. */}
            <ClientOnly>
              {/* ClientOnly will mount on the client where window.location is available */}
              {typeof window !== 'undefined' && !window.location.pathname.startsWith('/adminnovin') && (
                <>
                  <PWAPrompt />
                  <CookieConsent />
                  {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
                    <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
                  )}
                </>
              )}
            </ClientOnly>
          </NoSSR>
        </AuthProvider>
      </body>      
    </html>
  );
}