// components/CategoriesSection.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

const CategoriesSection = () => {
  // دسته‌بندی‌های محصولات اکریلیک
  const categories = [
    {
      id: 'signage',
      title: 'تابلوهای تبلیغاتی',
      description: 'تابلوهای نئون، حروف برجسته و سه بعدی',
      count: 24,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'display',
      title: 'ویترین و دکوراسیون',
      description: 'پارتیشن اداری، ویترین فروشگاهی و اجسام دکوراتیو',
      count: 18,
      color: 'from-purple-500 to-indigo-700'
    },
    {
      id: 'furniture',
      title: 'مبلمان اکریلیک',
      description: 'میزهای شفاف، صندلی طراحی و پایه بار',
      count: 12,
      color: 'from-cyan-500 to-blue-600'
    },
    {
      id: 'art',
      title: 'آثار هنری',
      description: 'مجسمه‌ها، نقوش برجسته و آثار تعاملی',
      count: 8,
      color: 'from-violet-500 to-purple-600'
    },
    {
      id: 'industrial',
      title: 'کاربردهای صنعتی',
      description: 'پوشش ماشین‌آلات، محافظ تجهیزات و قطعات فنی',
      count: 15,
      color: 'from-teal-500 to-cyan-600'
    },
    {
      id: 'lighting',
      title: 'سیستم‌های نورپردازی',
      description: 'پنل‌های نوری، پایه‌های LED و نورپردازی محیطی',
      count: 10,
      color: 'from-pink-500 to-rose-600'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="mx-auto px-4">
        {/* عنوان بخش */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            دسته‌بندی <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">محصولات</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            محصولات متنوع ما را در دسته‌بندی‌های تخصصی کشف کنید و مناسب‌ترین گزینه را برای نیاز خود بیابید
          </motion.p>
        </div>

        {/* دسته‌بندی‌ها */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              {/* پس‌زمینه گرادیانت */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-90`}></div>
              
              {/* جلوه شیشه‌ای */}
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
              
              {/* الگوی هندسی */}
              <div className="absolute inset-0 opacity-20">
                <svg
                  className="h-full w-full"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <pattern id="hexagons" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                      <polygon points="5,0 10,5 5,10 0,5" fill="none" stroke="white" strokeWidth="0.3" />
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill="url(#hexagons)" />
                </svg>
              </div>
              
              {/* محتوای دسته‌بندی */}
              <div className="relative z-10 p-8 h-64 flex flex-col justify-between">
                <div>
                  <div className="mb-16">
                    <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full mb-3">
                      <span className="text-sm font-medium text-white">
                        {category.count} محصول
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">{category.title}</h3>
                  <p className="text-blue-100">{category.description}</p>
                </div>
                
                <div className="flex justify-between items-center">
                  <button className="text-white font-medium flex items-center group">
                    مشاهده محصولات
                    <FiArrowLeft className="mr-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  {/* نماد دسته‌بندی */}
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <div className="w-6 h-6 bg-gradient-to-br from-white to-blue-100 rounded-sm"></div>
                  </div>
                </div>
              </div>
              
              {/* تصویر نمونه محصول */}
              <div className="absolute top-6 right-6 w-24 h-24 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-white/30 to-transparent backdrop-blur-sm rounded-lg border border-white/20"></div>
                </div>
              </div>
              
              {/* افکت هوردر */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-white/10 backdrop-blur-lg"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* دسته‌بندی‌های ویژه */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-black p-8 h-96">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 right-0 w-full h-full bg-[url('/pattern.svg')] bg-cover"></div>
            </div>
            
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="inline-block bg-gradient-to-r from-blue-600 to-indigo-700 px-4 py-1 rounded-full mb-4">
                  <span className="text-sm font-medium text-white">پیشنهاد ویژه</span>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3">سفارشات اختصاصی</h3>
                <p className="text-gray-300 max-w-md">
                  محصولات اختصاصی خود را با طراحی منحصر به فرد و متناسب با نیازهای خاص خود سفارش دهید
                </p>
              </div>
              
              <div>
                <button className="bg-white text-gray-900 font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                  ثبت سفارش اختصاصی
                </button>
              </div>
            </div>
            
            {/* تصویر نمونه */}
            <div className="absolute bottom-0 left-0 w-64 h-64">
              <div className="absolute bottom-10 left-10 w-48 h-48 rounded-xl bg-gradient-to-br from-blue-500/30 to-indigo-600/30 backdrop-blur-sm border border-white/20">
                <div className="absolute inset-4 bg-gradient-to-br from-blue-600/20 to-indigo-700/20 backdrop-blur-sm rounded-lg border border-white/20"></div>
              </div>
            </div>
          </div>
          
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 p-8 h-96 border border-blue-100">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-full h-full bg-[url('/pattern.svg')] bg-cover"></div>
            </div>
            
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="inline-block bg-gradient-to-r from-blue-500 to-cyan-600 px-4 py-1 rounded-full mb-4">
                  <span className="text-sm font-medium text-white">جدیدترین محصولات</span>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3">محصولات جدید</h3>
                <p className="text-gray-700 max-w-md">
                  جدیدترین محصولات اکریلیک با آخرین تکنولوژی‌های تولید و طراحی را کشف کنید
                </p>
              </div>
              
              <div className="flex justify-between items-center">
                <button className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold px-6 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all">
                  مشاهده محصولات جدید
                </button>
                
                <div className="flex space-x-2">
                  <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-blue-50 transition-colors border border-blue-200">
                    <FiArrowLeft className="text-gray-700" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-blue-50 transition-colors border border-blue-200">
                    <FiArrowRight className="text-gray-700" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* تصویر نمونه */}
            <div className="absolute bottom-0 right-0 w-64 h-64">
              <div className="absolute bottom-10 right-10 w-48 h-48 rounded-xl bg-gradient-to-br from-blue-400/10 to-indigo-500/10 backdrop-blur-sm border border-blue-200">
                <div className="absolute inset-4 bg-gradient-to-br from-blue-500/10 to-indigo-600/10 backdrop-blur-sm rounded-lg border border-blue-200"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* دکوراسیون پس‌زمینه */}
      <div className="absolute inset-x-0 bottom-0 -z-10 h-64 bg-gradient-to-t from-blue-100/50 to-transparent"></div>
      <div className="absolute top-1/4 left-10 -z-10 w-64 h-64 rounded-full bg-blue-200/30 blur-3xl"></div>
      <div className="absolute bottom-1/3 right-10 -z-10 w-48 h-48 rounded-full bg-indigo-200/30 blur-3xl"></div>
    </section>
  );
};

export default CategoriesSection;