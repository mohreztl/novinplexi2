
import "../globals.css";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/home/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import FloatingContactButton from "@/components/home/FloatingContactButton";
import NoSSR from '@/components/NoSSR';
import { OrganizationSchema, WebsiteSchema } from '@/components/SEO/StructuredData';

export const metadata = {
  title: {
    title: "فروش آنلاین ورق‌های پلکسی با کیفیت و قیمت مناسب | نوین پلکسی",
    default: "نوین پلکسی - فروش آنلاین ورق‌های پلکسی",
    template: "%s | نوین پلکسی"
  },
  description: "ورق‌های آکریلیک پلکسی گلاس را با بهترین قیمت‌ها و کیفیت عالی از نوین پلکسی تهیه کنید. ما انواع ورق‌های پلکسی گلاس را در رنگ‌ها و ضخامت‌های متنوع به شما ارائه می‌دهیم. تجربه‌ای مطمئن و راحت در خرید آنلاین را با ما تجربه کنید و به راحتی پروژه‌های خود را به واقعیت تبدیل کنید. از مشاوره رایگان ما بهره‌مند شوید و هر سوالی که دارید، بپرسید!نوین پلکسی، فروشگاه آنلاین دکوراسیون خانگی، ل شما. با کیفیت بالا و قیمت مناسب، خانه‌ای شیک و متفاوت بسازید. ارسال سریع و خدمات مشاوره تخصصی",
  keywords: ["ورق پلکسی ",
"پلکسی",
"خرید پلکسی",
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


export default function MainLayout({ children }) {
  return (
    <>
      <div className="flex flex-col min-h-screen mobile-safe-area">
        <Navbar />
        {/* add top padding to avoid content going under fixed navbar (mobile larger) */}
        <main className="flex-1 pt-24 md:pt-20">
          {children}
        </main>
        <Footer />
        <NoSSR>
          <MobileBottomNav />
          <FloatingContactButton />
        </NoSSR>
      </div>
      
      {/* SEO Schema Markup */}
      <OrganizationSchema />
      <WebsiteSchema />
    </>
  );
}
