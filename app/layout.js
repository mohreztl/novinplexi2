import AuthProvider from "@/components/AuthProvider";
import "./globals.css";
import localFont from 'next/font/local';
import { Toaster } from 'sonner';
import { GoogleAnalytics } from '@next/third-parties/google';
import { PWAPrompt } from '@/components/PWAPrompt';
import { CookieConsent } from '@/components/CookieConsent';
import ClientOnly from '@/components/ClientOnly';
import { OrganizationSchema, WebsiteSchema } from '@/components/SEO/StructuredData';
import NoSSR from '@/components/NoSSR';
import FontPreloader from '@/components/FontPreloader';

export const metadata = {
  title: {
    title: "فروش آنلاین ورق‌های پلکسی با کیفیت و قیمت مناسب | نوین پلکسی",
    default: "نوین پلکسی - فروش آنلاین ورق‌های پلکسی",
    template: "%s | نوین پلکسی"
  },
  description: "ورق‌های آکریلیک پلکسی گلاس را با بهترین قیمت‌ها و کیفیت عالی از نوین پلکسی تهیه کنید. ما انواع ورق‌های پلکسی گلاس را در رنگ‌ها و ضخامت‌های متنوع به شما ارائه می‌دهیم. تجربه‌ای مطمئن و راحت در خرید آنلاین را با ما تجربه کنید و به راحتی پروژه‌های خود را به واقعیت تبدیل کنید. از مشاوره رایگان ما بهره‌مند شوید و هر سوالی که دارید، بپرسید!نوین پلکسی، فروشگاه آنلاین دکوراسیون خانگی، ل شما. با کیفیت بالا و قیمت مناسب، خانه‌ای شیک و متفاوت بسازید. ارسال سریع و خدمات مشاوره تخصصی",
  keywords: ["ورق پلکسی ",
"پلکسی",
"ورق آکریلیک",
"پلکسی گلاس ارزان",
"خرید آنلاین پلکسی",
"فروش ورق پلکسی",
"قیمت ورق پلکسی",
"ورق‌های آکریلیک رنگی",
"ورق پلکسی گلاس شفاف",
"محصولات پلکسی",
"ورق‌های پلکسی صنعتی",
"کاربردهای آکریلیک",
"ورق‌های پلکسی برای دکوراسیون",
"ورق‌های آکریلیک برای ساخت"],
  authors: [{ name: "نوین پلکسی" }],
  creator: "نوین پلکسی",
  publisher: "نوین پلکسی",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://novinplexi.ir'),
  alternates: {
    canonical: '/',
    languages: {
      'fa-IR': '/',
    },
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: "https://novinplexi.ir",
    siteName: "نوین پلکسی",
    title: "فروش آنلاین ورق‌های پلکسی با کیفیت و قیمت مناسب | نوین پلکسی",
    description: "ورق‌های آکریلیک پلکسی گلاس را با بهترین قیمت‌ها و کیفیت عالی از نوین پلکسی تهیه کنید. ما انواع ورق‌های پلکسی گلاس را در رنگ‌ها و ضخامت‌های متنوع به شما ارائه می‌دهیم. تجربه‌ای مطمئن و راحت در خرید آنلاین را با ما تجربه کنید و به راحتی پروژه‌های خود را به واقعیت تبدیل کنید. از مشاوره رایگان ما بهره‌مند شوید و هر سوالی که دارید، بپرسید!",
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
   title: "فروش آنلاین ورق‌های پلکسی با کیفیت و قیمت مناسب | نوین پلکسی",
   description: "ورق‌های آکریلیک پلکسی گلاس را با بهترین قیمت‌ها و کیفیت عالی از نوین پلکسی تهیه کنید. ما انواع ورق‌های پلکسی گلاس را در رنگ‌ها و ضخامت‌های متنوع به شما ارائه می‌دهیم. تجربه‌ای مطمئن و راحت در خرید آنلاین را با ما تجربه کنید و به راحتی پروژه‌های خود را به واقعیت تبدیل کنید. از مشاوره رایگان ما بهره‌مند شوید و هر سوالی که دارید، بپرسید!",
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
        
        {/* SEO Schema Markup */}
        <OrganizationSchema />
        <WebsiteSchema />
      </body>      
    </html>
  );
}