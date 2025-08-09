import AuthProvider from "@/components/AuthProvider";
import "./globals.css";
import localFont from 'next/font/local';
import { Toaster } from 'sonner';
import { GoogleAnalytics } from '@next/third-parties/google';
import { PWAPrompt } from '@/components/PWAPrompt';
import { CookieConsent } from '@/components/CookieConsent';
import { OrganizationSchema, WebsiteSchema } from '@/components/SEO/StructuredData';

export const metadata = {
  title: {
    default: "نوین پلکسی - فروشگاه آنلاین دکوراسیون خانگی",
    template: "%s | نوین پلکسی"
  },
  description: "نوین پلکسی، فروشگاه آنلاین دکوراسیون خانگی، ارائه‌دهنده انواع کاغذ دیواری، موکت تایلی، کفپوش و دیگر محصولات دکوراتیو برای ایجاد فضایی زیبا و مدرن در منزل شما. با کیفیت بالا و قیمت مناسب، خانه‌ای شیک و متفاوت بسازید. ارسال سریع و خدمات مشاوره تخصصی",
  keywords: ["کاغذ دیواری", "موکت تایلی", "کفپوش", "دکوراسیون خانگی", "طراحی داخلی", "نوین پلکسی", "فروشگاه آنلاین", "دکوراسیون مدرن"],
  authors: [{ name: "نوین پلکسی" }],
  creator: "نوین پلکسی",
  publisher: "نوین پلکسی",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://nikodecor.com'),
  alternates: {
    canonical: '/',
    languages: {
      'fa-IR': '/',
    },
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: "https://nikodecor.com",
    siteName: "نوین پلکسی",
    title: "نوین پلکسی - فروشگاه آنلاین دکوراسیون خانگی",
    description: "نوین پلکسی، فروشگاه آنلاین دکوراسیون خانگی، ارائه‌دهنده انواع کاغذ دیواری، موکت تایلی، کفپوش و دیگر محصولات دکوراتیو",
    images: [
      {
        url: '/logo.svg',
        width: 1200,
        height: 630,
        alt: 'نوین پلکسی',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "نوین پلکسی - فروشگاه آنلاین دکوراسیون خانگی",
    description: "نوین پلکسی، فروشگاه آنلاین دکوراسیون خانگی، ارائه‌دهنده انواع کاغذ دیواری، موکت تایلی، کفپوش",
    images: ['/logo.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
};

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
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://nikoodecor.storage.c2.liara.space" />
        
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
      
      <body className={`${yekanBakh.variable} antialiased`}>
        <AuthProvider>
          <div className="min-h-screen">
            <main>
              {children}
            </main>
          </div>
          <Toaster position="top-center" richColors />
          <PWAPrompt />
          <CookieConsent />
        </AuthProvider>
        
        {/* SEO Schema Markup */}
        <OrganizationSchema />
        <WebsiteSchema />
        
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
      </body>      
    </html>
  );
}