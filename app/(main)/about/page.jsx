import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Star, TrendingUp, Users } from "lucide-react";
import ReviewImg from "@/public/profile.jpg";

const AboutPage = () => {
  const gallery = [
    "/novinplexi1.webp",
    "/novinplexi2.webp",
    "/novinplexi4.webp",
    "/novinplexi5.webp",
   
  ];

  return (
    <div className="bg-gray-50 text-slate-800">
      {/* HERO */}
      <header className="relative overflow-hidden">
        <div className="bg-gradient-to-r from-[#0ea5a4] to-[#2563eb] text-white">
          <div className="container mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                نوین پلکسی — تولید و عرضه ورق‌های آکریلیک (پلکسی)
              </h1>
              <p className="mt-4 text-lg md:text-xl text-white/90">
                تامین‌کنندهٔ تخصصی ورق آکریلیک و پلکسی برای تابلو، دکور، صنعتی و
                کاربردهای هنری — برش‌خورده، پولیش‌خورده و آمادهٔ اجرا.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link href="/products" className="inline-block bg-white text-[#0b72a8] font-semibold px-6 py-3 rounded-lg shadow hover:scale-[1.02] transition">
                  مشاهده محصولات
                </Link>
                <Link href="/contact" className="inline-block border border-white/30 text-white px-6 py-3 rounded-lg hover:bg-white/10 transition">
                  درخواست نمونه و مشاوره
                </Link>
              </div>
            </div>

            <div className="md:w-1/2 flex justify-center">
              <div className="w-[360px] h-[360px] rounded-2xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-sm">
                <Image src="/novinplexi1.webp" alt="ورق پلکسی نوین" width={720} height={720} className="object-cover w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* WHY CHOOSE US */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center">چرا نوین پلکسی؟</h2>
        <p className="mt-3 text-center text-slate-600 max-w-3xl mx-auto">
          تجربه، کیفیت مواد اولیه، برش دقیق CNC و خدمات پس از فروش تخصصی — ما
          همراه شما از نمونه تا اجرا هستیم.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow">
            <div className="flex items-center gap-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-[#0b72a8]" />
              </div>
              <div>
                <h3 className="font-semibold">تحویل سریع</h3>
                <p className="text-sm text-slate-500 mt-1">برش و ارسال در کمترین زمان ممکن</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow">
            <div className="flex items-center gap-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <Users className="w-6 h-6 text-[#0b72a8]" />
              </div>
              <div>
                <h3 className="font-semibold">پشتیبانی فنی</h3>
                <p className="text-sm text-slate-500 mt-1">راهنمای انتخاب ضخامت، رنگ و فرآیند پرداخت</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow">
            <div className="flex items-center gap-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-[#0b72a8]" />
              </div>
              <div>
                <h3 className="font-semibold">کیفیت تضمین‌شده</h3>
                <p className="text-sm text-slate-500 mt-1">ورق‌های با شفافیت بالا، مقاوم در برابر زردشدگی</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* APPLICATIONS */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-6">
          <h3 className="text-xl font-bold text-center">کاربردها</h3>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border">
              <h4 className="font-semibold">تابلو و تبلیغات</h4>
              <p className="text-sm text-slate-500 mt-2">رنگ‌پذیری عالی و نورپذیری مناسب برای تابلوهای نورانی</p>
            </div>
            <div className="p-6 rounded-xl border">
              <h4 className="font-semibold">دکوراسیون داخلی</h4>
              <p className="text-sm text-slate-500 mt-2">پنل‌ها، پارتیشن و المان‌های دکوراتیو با ظاهری مدرن</p>
            </div>
            <div className="p-6 rounded-xl border">
              <h4 className="font-semibold">صنعتی و حفاظتی</h4>
              <p className="text-sm text-slate-500 mt-2">محافظ محافظت از تجهیزات، پنل‌های شفاف و جزئیات صنعتی</p>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="container mx-auto px-6 py-12">
        <h3 className="text-xl font-bold text-center">نمونه‌های اجرا شده</h3>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
          {gallery.map((src, i) => (
            <div key={i} className="rounded-lg overflow-hidden shadow-lg bg-white">
              <Image src={src} alt={`نمونه ${i + 1}`} width={800} height={600} className="object-cover w-full h-44 md:h-56" />
            </div>
          ))}
        </div>
      </section>

      {/* STATS & TESTIMONIAL */}
      <section className="bg-gradient-to-r from-[#eff6ff] to-white py-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-6 text-center shadow">
                <h4 className="text-2xl font-bold">+10</h4>
                <p className="text-sm text-slate-500">سال تجربه در تولید پلکسی</p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow">
                <h4 className="text-2xl font-bold">+2000</h4>
                <p className="text-sm text-slate-500">پروژه اجرا شده</p>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 bg-white rounded-xl p-6 shadow">
            <div className="flex items-center gap-4">
              <Image src={ReviewImg} alt="نظرات مشتری" width={72} height={72} className="rounded-full object-cover" />
              <div>
                <h4 className="font-semibold">رضایت مشتریان</h4>
                <p className="text-sm text-slate-500">کیفیت، پاسخگویی و تحویل سریع از نقاط قوت ماست.</p>
              </div>
            </div>

            <blockquote className="mt-4 text-slate-700 italic">“محصولات با دقت و کیفیت بالا ارسال شد، پشتیبانی عالی.”</blockquote>

            <div className="mt-4 flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ & CTA */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-bold">سوالات متداول</h4>
            <div className="mt-4 space-y-3">
              <div className="p-4 border rounded-lg">
                <h5 className="font-medium">حداقل تیراژ سفارش چقدر است؟</h5>
                <p className="text-sm text-slate-500 mt-1">ما انعطاف‌پذیری بالایی داریم؛ برای برش‌های اختصاصی تماس بگیرید.</p>
              </div>

              <div className="p-4 border rounded-lg">
                <h5 className="font-medium">آیا امکان برش CNC وجود دارد؟</h5>
                <p className="text-sm text-slate-500 mt-1">بله، خدمات برش دقیق و فرز ارائه می‌شود.</p>
              </div>
            </div>
          </div>

          <div className="bg-[#0b72a8] text-white rounded-xl p-6 flex flex-col justify-between">
            <div>
              <h4 className="text-2xl font-bold">آماده‌اید پروژه‌تان را شروع کنید؟</h4>
              <p className="mt-2 text-white/90">از نمونه رایگان تا سفارشات بزرگ، ما همراه شما هستیم.</p>
            </div>
            <div className="mt-6">
              <Link href="/contact" className="inline-block bg-white text-[#0b72a8] px-5 py-3 rounded-lg font-semibold">درخواست مشاوره</Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-white py-8">
        <div className="container mx-auto px-6 text-center text-sm">
          © {new Date().getFullYear()} نوین پلکسی — کلیه حقوق محفوظ است.
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
