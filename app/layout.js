import AuthProvider from "@/components/AuthProvider";
import "./globals.css";
import localFont from 'next/font/local';
import { Toaster } from 'sonner';
import Script from 'next/script';

export const metadata = {
  title: "-نوین پلکسی",
  description: "نوین پلکسی، فروشگاه آنلاین دکوراسیون خانگی، ارائه‌دهنده انواع کاغذ دیواری، موکت تایلی، کفپوش و دیگر محصولات دکوراتیو برای ایجاد فضایی زیبا و مدرن در منزل شما. با کیفیت بالا و قیمت مناسب، خانه‌ای شیک و متفاوت بسازید. ارسال سریع و خدمات مشاوره تخصصی",
  openGraph: {
    type: "website",
    url: "https://nikodecor.com",
    siteName: "نوین پلکسی",
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
});



export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" className={yekanBakh.variable}>
      
      <head>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      
       <body className={yekanBakh.variable}>
         <AuthProvider>
           <div >
           
             <main>
               {children}
             </main>
           </div>
           <Toaster position="top-center" richColors />
         </AuthProvider>
       </body>      
    </html>
  );
}