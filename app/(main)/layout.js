
import "../globals.css";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/home/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import AuthProvider from "@/components/AuthProvider";
import FloatingContactButton from "@/components/home/FloatingContactButton";

export const metadata = {
  title: "نوین پلکسی",
  description: "نوین پلکسی، فروشگاه آنلاین دکوراسیون خانگی، ارائه‌دهنده انواع کاغذ دیواری، موکت تایلی، کفپوش و دیگر محصولات دکوراتیو برای ایجاد فضایی زیبا و مدرن در منزل شما. با کیفیت بالا و قیمت مناسب، خانه‌ای شیک و متفاوت بسازید. ارسال سریع و خدمات مشاوره تخصصی",
  openGraph: {
    type: "website",
    url: "https://novinplexi.ir",
    siteName: "نوین پلکسی",
  },
};

export default function RootLayout({ children }) {
  return (
   
      
      <body className= "bg-[#FFFFFF] !overflow-x-hidden font-yekanbakh " 
      suppressContentEditableWarning
      suppressHydrationWarning>
     
        <AuthProvider>
          <Navbar />
          <main>
            {children}
          </main>
          <Footer className="p-0" />
          <FloatingContactButton/>
          <MobileBottomNav />
        </AuthProvider>
      </body>
  
  );
}
