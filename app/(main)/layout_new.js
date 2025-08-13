import "../globals.css";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/home/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import FloatingContactButton from "@/components/home/FloatingContactButton";

export const metadata = {
 title: "فروش آنلاین ورق‌های پلکسی با کیفیت و قیمت مناسب | نوین پلکسی",
description: "ورق‌های آکریلیک پلکسی گلاس را با بهترین قیمت‌ها و کیفیت عالی از نوین پلکسی تهیه کنید. ما انواع ورق‌های پلکسی گلاس را در رنگ‌ها و ضخامت‌های متنوع به شما ارائه می‌دهیم. تجربه‌ای مطمئن و راحت در خرید آنلاین را با ما تجربه کنید و به راحتی پروژه‌های خود را به واقعیت تبدیل کنید. از مشاوره رایگان ما بهره‌مند شوید و هر سوالی که دارید، بپرسید!",
    type: "website",
    url: "https://novinplexi.ir",
    siteName: "نوین پلکسی",
  };

export default function MainLayout({ children }) {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
      <MobileBottomNav />
      <FloatingContactButton />
    </div>
  );
}
