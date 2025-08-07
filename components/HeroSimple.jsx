'use client';

import React from 'react';

const HeroSimple = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
      {/* محتوای اصلی */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* عنوان اصلی */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight">
              <span className="block">پیشرو در صنعت</span>
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
                ورق‌های اکریلیک
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              با بیش از یک دهه تجربه، نوین پلکسی ارائه‌دهنده 
              <span className="font-semibold text-blue-600"> بهترین کیفیت </span>
              ورق‌های اکریلیک و خدمات تخصصی در سراسر کشور
            </p>
          </div>

          {/* دکمه‌های اکشن */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              مشاهده محصولات
            </button>
            <button className="px-8 py-4 bg-white text-blue-600 font-semibold border-2 border-blue-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-blue-50">
              تماس با ما
            </button>
          </div>

          {/* ویژگی‌ها */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">+1000</div>
              <div className="text-gray-600">پروژه موفق</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">10+</div>
              <div className="text-gray-600">سال تجربه</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">مشتری راضی</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">24/7</div>
              <div className="text-gray-600">پشتیبانی</div>
            </div>
          </div>

        </div>
      </div>

      {/* پس‌زمینه تزئینی */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* اورب‌های رنگی */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
      </div>
    </section>
  );
};

export default HeroSimple;
