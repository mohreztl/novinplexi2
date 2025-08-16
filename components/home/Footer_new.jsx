import React from 'react';
import Link from 'next/link';
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiYoutube,
  FiLinkedin,
  FiClock,
  FiAward,
  FiShield
} from 'react-icons/fi';

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        {/* Header Section with floating elements */}
        <div className="relative mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-indigo-500/10 rounded-3xl blur-3xl" />
          <div className="relative text-center pb-12">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-4">
              نوین پلکسی - پیشرو در صنعت اکریلیک
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              با بیش از ۱۵ سال تجربه در طراحی و تولید محصولات اکریلیک، ما متعهد به ارائه بهترین کیفیت و خدمات هستیم
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* ستون 1: درباره ما */}
          <div className="relative">
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-full blur-xl" />
            
            <div className="relative">
              <div className="flex items-center mb-6">
                <div className="relative">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 p-1 shadow-2xl">
                    <div className="flex h-full w-full items-center justify-center rounded-xl bg-white/90 backdrop-blur-sm">
                      <div className="h-6 w-6 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-md"></div>
                    </div>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse" />
                </div>
                <span className="mr-3 text-xl font-bold">نوین پلکسی</span>
              </div>
              
              <p className="text-gray-400 mb-6 leading-relaxed">
                تخصص ما در طراحی و تولید محصولات با کیفیت از جنس Plexiglas/Acrylic. 
                ما با استفاده از جدیدترین تکنولوژی‌ها و تیم متخصص، بهترین راه‌حل‌های اکریلیک را ارائه می‌دهیم.
              </p>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full">
                  <FiAward className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-medium">۱۵+ سال تجربه</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-full">
                  <FiShield className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-medium">ضمانت کیفیت</span>
                </div>
              </div>
              
              <div className="flex space-x-3">
                {[
                  { icon: FiFacebook, href: "#", label: "Facebook" },
                  { icon: FiInstagram, href: "#", label: "Instagram" },
                  { icon: FiTwitter, href: "#", label: "Twitter" },
                  { icon: FiYoutube, href: "#", label: "Youtube" },
                  { icon: FiLinkedin, href: "#", label: "LinkedIn" }
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    className="group relative bg-gray-800/50 hover:bg-gradient-to-br hover:from-blue-500 hover:to-indigo-600 w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg backdrop-blur-sm"
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5 group-hover:text-white transition-colors" />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400/0 to-indigo-400/0 group-hover:from-blue-400/20 group-hover:to-indigo-400/20 transition-all duration-300" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ستون 2: لینک‌های سریع */}
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full ml-3" />
              لینک‌های سریع
            </h3>
            <ul className="space-y-3">
              {[
                { name: "صفحه اصلی", href: "/" },
                { name: "محصولات", href: "/products" },
                { name: "دسته‌بندی‌ها", href: "/products/categories" },
                { name: "پروژه‌ها", href: "/projects" },
                { name: "مقالات", href: "/blog" },
                { name: "درباره ما", href: "/about" },
                { name: "تماس با ما", href: "/contact" },
                { name: "سوالات متداول", href: "/faq" }
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="group flex items-center text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1"
                  >
                    <span className="w-2 h-2 bg-gray-600 rounded-full ml-3 group-hover:bg-blue-500 transition-colors" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ستون 3: محصولات */}
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full ml-3" />
              محصولات پرطرفدار
            </h3>
            <ul className="space-y-3">
              {[
                { name: "تابلوهای تبلیغاتی", href: "/products/category/advertising" },
                { name: "ویترین و دکوراسیون", href: "/products/category/showcase" },
                { name: "مبلمان اکریلیک", href: "/products/category/furniture" },
                { name: "آثار هنری", href: "/products/category/art" },
                { name: "کاربردهای صنعتی", href: "/products/category/industrial" },
                { name: "سیستم‌های نورپردازی", href: "/products/category/lighting" },
                { name: "ورق‌های اکریلیک", href: "/products/category/sheets" },
                { name: "قطعات سفارشی", href: "/products/category/custom" }
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="group flex items-center text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1"
                  >
                    <span className="w-2 h-2 bg-gray-600 rounded-full ml-3 group-hover:bg-blue-500 transition-colors" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ستون 4: تماس با ما */}
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full ml-3" />
              تماس با ما
            </h3>
            
            <div className="space-y-4 mb-8">
              <div className="group flex items-start p-3 rounded-xl bg-gray-800/30 hover:bg-gray-800/50 transition-all duration-300">
                <div className="p-2 bg-blue-500/20 rounded-lg ml-3 group-hover:bg-blue-500/30 transition-colors">
                  <FiMapPin className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-medium mb-1">آدرس دفتر مرکزی</p>
                  <p className="text-gray-400 text-sm">تهران، میدان آزادی، خیابان اکریلیک، پلاک ۱۲۳</p>
                </div>
              </div>
              
              <div className="group flex items-center p-3 rounded-xl bg-gray-800/30 hover:bg-gray-800/50 transition-all duration-300">
                <div className="p-2 bg-emerald-500/20 rounded-lg ml-3 group-hover:bg-emerald-500/30 transition-colors">
                  <FiPhone className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-white font-medium mb-1">شماره تماس</p>
                  <a href="tel:+982112345678" className="text-gray-400 hover:text-white transition-colors">۰۲۱-۱۲۳۴۵۶۷۸</a>
                </div>
              </div>
              
              <div className="group flex items-center p-3 rounded-xl bg-gray-800/30 hover:bg-gray-800/50 transition-all duration-300">
                <div className="p-2 bg-indigo-500/20 rounded-lg ml-3 group-hover:bg-indigo-500/30 transition-colors">
                  <FiMail className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <p className="text-white font-medium mb-1">ایمیل</p>
                  <a href="mailto:info@novinplexi.ir" className="text-gray-400 hover:text-white transition-colors">info@novinplexi.ir</a>
                </div>
              </div>
              
              <div className="group flex items-center p-3 rounded-xl bg-gray-800/30 hover:bg-gray-800/50 transition-all duration-300">
                <div className="p-2 bg-orange-500/20 rounded-lg ml-3 group-hover:bg-orange-500/30 transition-colors">
                  <FiClock className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <p className="text-white font-medium mb-1">ساعت کاری</p>
                  <p className="text-gray-400 text-sm">شنبه تا پنج‌شنبه: ۸:۰۰ - ۱۸:۰۰</p>
                </div>
              </div>
            </div>

            {/* نمادهای اعتماد */}
            <div className="mt-8">
              <h4 className="font-medium mb-4 text-white">نمادهای اعتماد</h4>
              <div className="flex gap-3 items-center flex-wrap">
                {/* نماد اینماد */}
                <a 
                  referrerPolicy='origin' 
                  target='_blank' 
                  href='https://trustseal.enamad.ir/?id=631147&Code=rzDsl9LN8ttEpjJRMeYembqF0rv7PF9o'
                  className="bg-white/90 hover:bg-white p-2 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    referrerPolicy='origin' 
                    src='https://trustseal.enamad.ir/logo.aspx?id=631147&Code=rzDsl9LN8ttEpjJRMeYembqF0rv7PF9o' 
                    alt='نماد اعتماد الکترونیک' 
                    className="h-12 w-auto cursor-pointer"
                    code='rzDsl9LN8ttEpjJRMeYembqF0rv7PF9o'
                  />
                </a>
                
                {/* نمادهای اضافی */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 flex items-center justify-center hover:bg-gray-700/50 transition-all duration-300">
                  <div className="flex items-center gap-2">
                    <FiShield className="w-5 h-5 text-green-400" />
                    <span className="text-xs font-medium text-white">گواهی کیفیت</span>
                  </div>
                </div>
                
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 flex items-center justify-center hover:bg-gray-700/50 transition-all duration-300">
                  <div className="flex items-center gap-2">
                    <FiAward className="w-5 h-5 text-blue-400" />
                    <span className="text-xs font-medium text-white">تولید داخلی</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* جداکننده با گرادیان */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600" />
          </div>
          <div className="relative flex justify-center">
            <div className="bg-gray-800 px-6 py-2 rounded-full">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse" />
            </div>
          </div>
        </div>

        {/* کپی رایت */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-indigo-500/5 rounded-2xl" />
          <div className="relative flex flex-col md:flex-row justify-between items-center p-6">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">©</span>
              </div>
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} نوین پلکسی. تمامی حقوق محفوظ است.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-6 text-center md:text-right">
              {[
                { name: "حریم خصوصی", href: "/privacy-policy" },
                { name: "قوانین و مقررات", href: "/terms" },
                { name: "گارانتی و خدمات", href: "/warranty" },
                { name: "راهنمای خرید", href: "/shipping-returns" }
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-500 hover:text-blue-400 text-sm transition-colors duration-300 hover:underline decoration-blue-400 underline-offset-4"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        {/* شعار پایانی */}
        <div className="text-center mt-8 pt-6 border-t border-gray-700/50">
          <p className="text-gray-500 text-sm italic">
            &ldquo;کیفیت در هر جزئیات - نوآوری در هر طراحی&rdquo;
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
