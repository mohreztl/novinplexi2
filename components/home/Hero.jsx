'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, Star, CheckCircle } from 'lucide-react';

const Hero = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: "کیفیت برتر محصولات",
      description: "استفاده از بهترین متریال‌های اکریلیک با گارانتی اصالت",
      icon: "💎",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "طراحی سفارشی",
      description: "ساخت محصولات منحصر به فرد مطابق با نیاز شما",
      icon: "🎨",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      title: "پشتیبانی ۲۴/۷",
      description: "همراهی و مشاوره تخصصی در تمام مراحل سفارش",
      icon: "🌟",
      color: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 pt-20 lg:pt-28 pb-16 lg:pb-20">
      {/* دکوراسیون پس‌زمینه با جلوه شیشه‌ای */}
      <div className="absolute inset-0 z-0">
        {/* نورپردازی پویا */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute top-20 left-1/4 h-64 w-64 rounded-full bg-blue-200 blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
          className="absolute bottom-10 right-1/3 h-80 w-80 rounded-full bg-indigo-200 blur-[100px]"
        />
        
        {/* الگوی هندسی شیشه‌ای */}
        <div className="absolute inset-0 opacity-10">
          <svg
            className="h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {/* اشکال هندسی */}
          </svg>
        </div>
      </div>

      {/* محتوای اصلی */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center flex-col-reverse lg:flex-row">
          {/* متن و دکمه‌ها */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-block"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm text-blue-600 ring-1 ring-blue-600/10">
                <span className="animate-pulse relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75 animate-ping"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                بهترین کیفیت در صنعت اکریلیک
              </span>
            </motion.div>

            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                <span className="block text-gray-900">خلاقیت در طراحی</span>
                <span className="relative mt-2 inline-block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  محصولات اکریلیک
                  <motion.span
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="absolute bottom-0 left-0 h-2 bg-blue-200/30"
                  ></motion.span>
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                در نوین پلکسی، هنر و تکنولوژی را با هم ترکیب می‌کنیم تا محصولات اکریلیک منحصر به فردی خلق کنیم که نه تنها زیبا هستند، بلکه کاربردی و با دوام نیز می‌باشند.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 lg:px-8 py-3 lg:py-4 text-sm lg:text-base font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl hover:shadow-blue-500/40"
                  >
                    مشاهده محصولات
                    <ChevronLeft className="h-5 w-5" />
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-xl border-2 border-blue-600 bg-transparent px-6 lg:px-8 py-3 lg:py-4 text-sm lg:text-base font-semibold text-blue-600 transition-all hover:bg-blue-50"
                  >
                    تماس با ما
                    <ChevronLeft className="h-5 w-5" />
                  </Link>
                </motion.div>
              </div>

              <div className="flex items-center gap-6 pt-6">
                <div className="flex -space-x-3 rtl:space-x-reverse">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-12 w-12 rounded-full border-2 border-white bg-gradient-to-br from-blue-100 to-indigo-100"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                  </div>
                  <p className="text-sm text-gray-600">+۱۰۰۰ مشتری راضی</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* تصویر قهرمان */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative h-[400px] lg:h-[600px] w-full">
              {/* قاب اصلی */}
              <motion.div
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-100/50 to-indigo-100/50 p-4 lg:p-8 backdrop-blur-xl shadow-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-2xl">
                  <Image 
                    src="/hero.webp"
                    alt="نوین پلکسی"
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-700 hover:scale-105"
                    onError={(e) => {
                      e.target.src = "https://placehold.co/1200x800?text=Novin+Plexi";
                    }}
                  />
                  
                  {/* اورلی گرادیان */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  
                  {/* نشانگرهای ویژگی */}
                  <AnimatePresence mode="wait">
                    {features.map((feature, index) => (
                      activeFeature === index && (
                        <motion.div
                          key={feature.title}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.3 }}
                          className="absolute"
                          style={{
                            top: `${20 + (index * 30)}%`,
                            left: index % 2 ? '20%' : '70%'
                          }}
                        >
                          <div className="flex items-start gap-3 rounded-xl bg-white/90 p-4 backdrop-blur-sm shadow-lg">
                            <span className="text-2xl">{feature.icon}</span>
                            <div>
                              <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                              <p className="text-sm text-gray-600">{feature.description}</p>
                            </div>
                          </div>
                        </motion.div>
                      )
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* دکمه‌های ویژگی */}
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 space-y-4">
                {features.map((feature, index) => (
                  <motion.button
                    key={index}
                    className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all
                      ${activeFeature === index 
                        ? 'border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-600/25' 
                        : 'border-gray-300 bg-white text-gray-400 hover:border-blue-600 hover:text-blue-600'
                      }`}
                    onClick={() => setActiveFeature(index)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {activeFeature === index ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : (
                      <span className="text-xl">{feature.icon}</span>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ویژگی‌های کلیدی */}
        <div className="mt-16 lg:mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="group relative rounded-2xl bg-white/80 p-6 backdrop-blur-sm shadow-lg transition-all hover:shadow-xl"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600/5 to-indigo-600/5 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} text-2xl text-white shadow-lg`}>
                    {feature.icon}
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
