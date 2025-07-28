'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Hero = () => {
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
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {/* اشکال هندسی */}
          </svg>
        </div>
      </div>

      {/* محتوای اصلی */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* متن و دکمه‌ها */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              نوین پلکسی، برترین تولیدکننده محصولات اکریلیک
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              طراحی و تولید انواع محصولات اکریلیک با بهترین کیفیت و قیمت مناسب. از تابلوهای تبلیغاتی گرفته تا دکوراسیون داخلی، همه را با ضمانت کیفیت در نوین پلکسی بیابید.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
              >
                مشاهده محصولات
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3 rounded-lg border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition-all"
              >
                تماس با ما
              </Link>
            </div>
          </motion.div>

          {/* تصویر قهرمان */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/3] relative">
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                {/* نمونه محصولات */}
                <div className="grid grid-cols-2 gap-4 p-4">
                  {[1, 2, 3, 4].map((index) => (
                    <div
                      key={index}
                      className="aspect-square rounded-lg bg-white/30 backdrop-blur-sm p-2 shadow-lg"
                    >
                      {/* محتوای کارت */}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ویژگی‌های کلیدی */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {[
            {
              icon: "🎨",
              title: "طراحی سفارشی",
              description: "محصولات را مطابق نیاز شما طراحی می‌کنیم"
            },
            {
              icon: "✨",
              title: "کیفیت برتر",
              description: "استفاده از بهترین مواد اولیه و تجهیزات مدرن"
            },
            {
              icon: "🚀",
              title: "تحویل سریع",
              description: "ارسال سریع به تمام نقاط کشور"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg"
            >
              <span className="text-3xl mb-4 block">{feature.icon}</span>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
