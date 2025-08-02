'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, Star, CheckCircle, Sparkles, Shield, Palette, HeartHandshake } from 'lucide-react';

const Hero = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [imageError, setImageError] = useState(false);

  // تغییر خودکار ویژگی‌ها
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      title: "کیفیت برتر محصولات",
      description: "استفاده از بهترین متریال‌های اکریلیک با گارانتی اصالت",
      icon: <Shield className="h-6 w-6" />,
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100"
    },
    {
      title: "طراحی سفارشی",
      description: "ساخت محصولات منحصر به فرد مطابق با نیاز شما",
      icon: <Palette className="h-6 w-6" />,
      color: "from-indigo-500 to-indigo-600",
      bgColor: "from-indigo-50 to-indigo-100"
    },
    {
      title: "پشتیبانی ۲۴/۷",
      description: "همراهی و مشاوره تخصصی در تمام مراحل سفارش",
      icon: <HeartHandshake className="h-6 w-6" />,
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100"
    }
  ];

  const stats = [
    { number: "1000+", label: "مشتری راضی" },
    { number: "500+", label: "پروژه موفق" },
    { number: "10+", label: "سال تجربه" }
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 font-vazir">
      {/* پترن پس‌زمینه */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
        
        {/* گوی‌های نورانی متحرک */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-blue-400 to-indigo-400 opacity-20 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 opacity-20 blur-3xl"
        />
      </div>

      {/* محتوای اصلی */}
      <div className="container relative z-10 mx-auto px-4 pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center" dir="rtl">
          {/* بخش متن - سمت چپ در دسکتاپ */}
          {/* بخش متن - سمت راست در دسکتاپ */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8 order-2 lg:order-2 lg:pr-8"
          >
            {/* برچسب */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 px-4 py-2 backdrop-blur-sm"
            >
              <Sparkles className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">پیشرو در صنعت اکریلیک ایران</span>
            </motion.div>

            {/* عنوان */}
            <div className="space-y-4">
              <h1 className="text-4xl font-black leading-tight text-gray-900 lg:text-6xl xl:text-7xl">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="block"
                >
                  خلاقیت در طراحی
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="relative block"
                >
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    محصولات اکریلیک
                  </span>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                  />
                </motion.span>
              </h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-lg leading-relaxed text-gray-600 lg:text-xl"
              >
                در نوین پلکسی، هنر و تکنولوژی را با هم ترکیب می‌کنیم تا محصولات اکریلیک منحصر به فردی خلق کنیم که نه تنها زیبا هستند، بلکه کاربردی و با دوام نیز می‌باشند.
              </motion.p>
            </div>

            {/* دکمه‌ها */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/products">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 font-semibold text-white shadow-2xl shadow-blue-500/25 transition-all hover:shadow-blue-500/40"
                >
                  <span className="relative z-10">مشاهده محصولات</span>
                  <ChevronLeft className="relative z-10 h-5 w-5 transition-transform group-hover:-translate-x-1" />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 transition-opacity group-hover:opacity-100" />
                </motion.button>
              </Link>

              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group inline-flex items-center gap-2 rounded-2xl border-2 border-gray-300 bg-white/80 px-8 py-4 font-semibold text-gray-700 backdrop-blur-sm transition-all hover:border-blue-600 hover:bg-blue-50 hover:text-blue-700"
                >
                  <span>تماس با ما</span>
                  <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                </motion.button>
              </Link>
            </motion.div>

            {/* آمار */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-3 gap-6 pt-8"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1, type: "spring" }}
                    className="text-2xl font-black text-gray-900 lg:text-3xl"
                  >
                    {stat.number}
                  </motion.div>
                  <div className="mt-1 text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* بخش تصویر - سمت راست در دسکتاپ */}
          {/* بخش تصویر - سمت چپ در دسکتاپ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
            className="relative order-1 lg:order-1 flex justify-center"
          >
            <div className="relative aspect-[4/5] lg:aspect-square drop-shadow-2xl w-full max-w-[400px] lg:max-w-[480px] xl:max-w-[520px]">
              {/* قاب شیشه‌ای */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/30 to-white/10 p-4 lg:p-8 backdrop-blur-2xl shadow-2xl border border-white/40">
                <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-blue-100/60 to-indigo-100/60">
                  {!imageError ? (
                    <Image
                      src="/hero.webp"
                      alt="محصولات اکریلیک نوین پلکسی"
                      fill
                      priority
                      quality={100}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 hover:scale-105 rounded-2xl shadow-2xl border-4 border-white/60"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl">
                      <div className="text-center text-white">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5, type: 'spring' }}
                          className="mb-6 inline-block rounded-full bg-white/20 p-6 backdrop-blur-sm"
                        >
                          <Sparkles className="h-16 w-16" />
                        </motion.div>
                        <h3 className="mb-2 text-2xl font-bold">نوین پلکسی</h3>
                        <p className="text-white/80">پیشرو در صنعت اکریلیک</p>
                      </div>
                    </div>
                  )}
                  {/* اورلی گرادیان */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none rounded-2xl" />
                </div>
              </div>

              {/* نقاط ویژگی متحرک */}
              <AnimatePresence mode="wait">
                {features.map((feature, index) => (
                  activeFeature === index && (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -20 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="absolute z-20"
                      style={{
                        top: `${25 + (index * 25)}%`,
                        left: index % 2 ? 'auto' : '-28px',
                        right: index % 2 ? '-28px' : 'auto',
                      }}
                    >
                      <div className="flex items-center gap-3 rounded-2xl bg-white/95 p-4 shadow-2xl border border-blue-100/60">
                        <div className={`rounded-xl bg-gradient-to-br ${feature.bgColor} p-3 shadow-md`}>
                          <div className={`text-transparent bg-gradient-to-br ${feature.color} bg-clip-text`}>{feature.icon}</div>
                        </div>
                        <div className="max-w-[200px]">
                          <h4 className="font-bold text-gray-900">{feature.title}</h4>
                          <p className="text-xs text-gray-600">{feature.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>

              {/* نشانگرهای ویژگی */}
              <div className="absolute -bottom-7 right-1/2 flex translate-x-1/2 gap-2">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveFeature(index)}
                    className={`h-2 transition-all duration-300 ${
                      activeFeature === index
                        ? 'w-8 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg'
                        : 'w-2 bg-gray-300 hover:bg-gray-400'
                    } rounded-full`}
                    aria-label={`نمایش ویژگی ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, #8882 1px, transparent 1px),
            linear-gradient(to bottom, #8882 1px, transparent 1px);
          background-size: 50px 50px;
        }
        .font-vazir {
          font-family: Vazirmatn, YekanBakh, Tahoma, Arial, sans-serif;
        }
      `}</style>
    </section>
  );
};

export default Hero;