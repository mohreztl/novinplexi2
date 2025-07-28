// components/AcrylicHeroSection.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const AcrylicHeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 pt-24 pb-32">
      {/* دکوراسیون پس‌زمینه با جلوه شیشه‌ای */}
      <div className="absolute inset-0 z-0">
        {/* نورپردازی */}
        <div className="absolute top-20 left-1/4 h-64 w-64 rounded-full bg-blue-200 blur-[100px] opacity-40"></div>
        <div className="absolute bottom-10 right-1/3 h-80 w-80 rounded-full bg-indigo-200 blur-[100px] opacity-40"></div>
        
        {/* الگوی هندسی شیشه‌ای */}
        <div className="absolute inset-0 opacity-10">
          <svg
            className="h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern id="hexagons" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <polygon points="5,0 10,5 5,10 0,5" fill="none" stroke="#3b82f6" strokeWidth="0.3" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#hexagons)" />
          </svg>
        </div>
      </div>
      
      <div className="md:container relative z-10 mx-auto px-8">
        <div className="flex flex-col-reverse items-center justify-between gap-8 lg:flex-row-reverse">
          {/* محتوای متنی */}
          <div className="flex max-w-2xl flex-col items-center text-center lg:items-start lg:text-right lg:ml-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl md:mt-6"
            >
              <span className="block">خلاقیت در</span>
              <span className="relative mt-2 inline-block bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent text-center">
                طراحی اکریلیک
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="absolute bottom-0 left-0 z-0 h-2 bg-blue-400/30"
                ></motion.span>
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 max-w-xl text-xl leading-relaxed text-gray-700"
            >
              با استفاده از ورق‌های Plexiglas با کیفیت، محصولات منحصر به فرد و شفاف با دوام بالا خلق کنید. از دکوراسیون داخلی تا تابلوهای تبلیغاتی، هر طرحی را به واقعیت تبدیل نمایید.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10 flex flex-wrap justify-center gap-4"
            >
              <Link href="/products">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-4 font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:from-blue-700 hover:to-indigo-800 hover:shadow-xl"
                >
                  مشاهده محصولات
                </motion.button>
              </Link>
              
              <Link href="/custom-order">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-lg border-2 border-blue-600 bg-transparent px-8 py-4 font-bold text-blue-700 transition-all hover:bg-blue-600/10"
                >
                  سفارش اختصاصی
                </motion.button>
              </Link>
            </motion.div>
            
            {/* ویژگی‌های مواد */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-16 grid grid-cols-3 gap-6 sm:grid-cols-3"
            >
              {[
                { title: "شفافیت بالا", icon: "🔍" },
                { title: "مقاومت عالی", icon: "🛡️" },
                { title: "وزن سبک", icon: "⚖️" },
                { title: "انعطاف پذیری", icon: "🌀" },
                { title: "مقاوم در برابر UV", icon: "☀️" },
                { title: "قالب‌پذیری آسان", icon: "🔥" },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                  className="flex flex-col items-center justify-center rounded-xl bg-white/50 p-4 backdrop-blur-sm"
                >
                  <div className="text-2xl">{feature.icon}</div>
                  <div className="mt-2 text-sm font-medium text-gray-800">{feature.title}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {/* نمایش محصولات اکریلیک */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative lg:mr-4"
          >
            {/* قاب اصلی با جلوه شیشه‌ای */}
            <div className="relative rounded-3xl bg-gradient-to-br from-blue-100/50 to-indigo-100/50 p-8 backdrop-blur-xl shadow-2xl shadow-blue-200/50">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-blue-300/20 to-indigo-300/20 backdrop-blur-3xl"></div>
              
              {/* محتوای شیشه‌ای */}
              <div className="relative z-10 overflow-hidden rounded-2xl">
                <div className="relative h-[450px] w-[350px] overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50/80 to-indigo-50/80 border border-white/50">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full h-full">
                      {/* تابلو اکریلیک شناور */}
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 6,
                          ease: "easeInOut",
                        }}
                        className="absolute left-1/2 top-1/4 transform -translate-x-1/2 z-20"
                      >
                        <div className="relative w-48 h-32 bg-gradient-to-br from-blue-400/30 to-indigo-500/30 border border-white/50 rounded-lg backdrop-blur-sm shadow-lg">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-white font-bold text-lg drop-shadow">Acrylic Art</span>
                          </div>
                          <div className="absolute -inset-2 border border-white/30 rounded-lg"></div>
                        </div>
                      </motion.div>
                      
                      {/* اشکال هندسی اکریلیک */}
                      <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2">
                        <div className="w-24 h-24 rounded-full border-4 border-blue-400/50 bg-blue-300/20 backdrop-blur-sm shadow-lg"></div>
                      </div>
                      
                      <div className="absolute top-1/3 right-1/4 transform">
                        <div className="w-16 h-16 rotate-45 bg-gradient-to-br from-indigo-400/40 to-blue-500/40 backdrop-blur-sm border border-white/30 shadow-lg"></div>
                      </div>
                      
                      {/* نمونه محصول - پایه نگهدارنده */}
                      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500/60 to-indigo-600/60 rounded-t-full backdrop-blur-sm"></div>
                          <div className="w-4 h-24 bg-gradient-to-b from-blue-400/50 to-indigo-500/50 backdrop-blur-sm"></div>
                          <div className="w-16 h-4 bg-gradient-to-br from-blue-500/60 to-indigo-600/60 rounded-full backdrop-blur-sm"></div>
                        </div>
                      </div>
                      
                      {/* نورپردازی */}
                      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white/50 to-transparent"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* دکوراسیون اضافی */}
              <div className="absolute -bottom-6 -left-6 z-0 h-32 w-32 rounded-full bg-blue-300/20 blur-xl"></div>
              <div className="absolute -right-6 -top-6 z-0 h-24 w-24 rounded-full bg-indigo-300/20 blur-xl"></div>
            </div>
            
            {/* برچسب ویژگی‌ها */}
            <motion.div
              animate={{ rotate: [0, 3, 0] }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
              }}
              className="absolute -left-8 top-1/4 z-20"
            >
              <div className="flex flex-col items-center p-3 rounded-lg bg-white/90 backdrop-blur-sm shadow-lg border border-blue-100">
                <div className="text-blue-600 font-bold">ضد خش</div>
                <div className="text-xs text-gray-600 mt-1">سطح مقاوم</div>
              </div>
            </motion.div>
            
            <motion.div
              animate={{ rotate: [0, -3, 0] }}
              transition={{
                repeat: Infinity,
                duration: 5,
                ease: "easeInOut",
                delay: 0.5
              }}
              className="absolute -right-8 bottom-1/4 z-20"
            >
              <div className="flex flex-col items-center p-3 rounded-lg bg-white/90 backdrop-blur-sm shadow-lg border border-blue-100">
                <div className="text-indigo-600 font-bold">۱۰۰% شفاف</div>
                <div className="text-xs text-gray-600 mt-1">مانند شیشه</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* موج پایین با جلوه شیشه‌ای */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-full md:h-32"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff"
            fillOpacity="0.8"
            d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,74.7C1120,75,1280,53,1360,42.7L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default AcrylicHeroSection;