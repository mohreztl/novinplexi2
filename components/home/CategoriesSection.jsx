'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import axios from 'axios';

const CategoriesSection = () => {
  const [categories, setCategories] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories');
        setCategories(response.data.categories || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div className="py-20 text-center">در حال بارگذاری دسته‌بندی‌ها...</div>;
  }

  // دسته‌بندی‌های پیش‌فرض در صورت خالی بودن دیتابیس
  const defaultCategories = [
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
                <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                  <pattern id={`pattern-${category.id}`} x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                    <path d="M0 32V16l16-16 16 16v16L16 32 0 16" fill="none" stroke="currentColor" strokeWidth="1"/>
                  </pattern>
                  <rect width="100%" height="100%" fill={`url(#pattern-${category.id})`}/>
                </svg>
              </div>
              
              {/* محتوای اصلی */}
              <div className="relative p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                  <span className="text-white/80">{category.count} محصول</span>
                </div>
                <p className="text-white/90 mb-6">{category.description}</p>
                <div className="flex items-center text-white transition-transform transform group-hover:translate-x-2">
                  <span className="font-medium ml-2">مشاهده محصولات</span>
                  <FiArrowLeft className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
