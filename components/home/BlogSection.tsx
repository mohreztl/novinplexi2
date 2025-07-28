// components/BlogSection.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiUser, FiArrowRight, FiSearch, FiTag } from 'react-icons/fi';

const BlogSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  // دسته‌بندی‌های مقالات
  const categories = [
    { id: 'all', name: 'همه مقالات' },
    { id: 'tips', name: 'نکات فنی' },
    { id: 'design', name: 'طراحی' },
    { id: 'installation', name: 'نصب و نگهداری' },
    { id: 'innovations', name: 'تکنولوژی‌های جدید' },
  ];
  
  // مقالات نمونه
  const articles = [
    {
      id: 1,
      title: '۱۰ نکته برش و پرداخت اکریلیک برای مبتدیان',
      excerpt: 'در این مقاله به بررسی تکنیک‌های حرفه‌ای برش و پرداخت ورق‌های اکریلیک می‌پردازیم و نکات کلیدی برای جلوگیری از ترک خوردگی را بررسی می‌کنیم.',
      category: 'tips',
      date: '۱۴۰۲/۰۵/۱۲',
      author: 'محمد حسینی',
      readTime: '۵ دقیقه',
      image: 'bg-gradient-to-br from-blue-100 to-indigo-200'
    },
    {
      id: 2,
      title: 'کاربردهای خلاقانه اکریلیک در دکوراسیون داخلی',
      excerpt: 'اکریلیک با قابلیت‌های منحصر به فرد خود تحولی در طراحی داخلی ایجاد کرده است. در این مقاله جدیدترین ایده‌ها را بررسی می‌کنیم.',
      category: 'design',
      date: '۱۴۰۲/۰۴/۲۸',
      author: 'فاطمه محمدی',
      readTime: '۷ دقیقه',
      image: 'bg-gradient-to-br from-purple-100 to-indigo-200'
    },
    {
      id: 3,
      title: 'راهنمای کامل انتخاب ضخامت مناسب ورق‌های Plexiglas',
      excerpt: 'انتخاب ضخامت مناسب برای هر پروژه چالش برانگیز است. در این راهنما معیارهای انتخاب ضخامت بهینه را بررسی می‌کنیم.',
      category: 'tips',
      date: '۱۴۰۲/۰۴/۱۵',
      author: 'رضا احمدی',
      readTime: '۸ دقیقه',
      image: 'bg-gradient-to-br from-cyan-100 to-blue-200'
    },
    {
      id: 4,
      title: 'نصب حرفه‌ای تابلوهای اکریلیک: از صفر تا صد',
      excerpt: 'نصب صحیح تابلوهای اکریلیک کلید ماندگاری و زیبایی آن‌هاست. در این مقاله مراحل نصب حرفه‌ای را آموزش می‌دهیم.',
      category: 'installation',
      date: '۱۴۰۲/۰۳/۳۰',
      author: 'علی کریمی',
      readTime: '۱۰ دقیقه',
      image: 'bg-gradient-to-br from-indigo-100 to-purple-200'
    },
    {
      id: 5,
      title: 'اکریلیک ضد خش: تکنولوژی جدید در صنعت پلیمرها',
      excerpt: 'جدیدترین نوآوری در صنعت اکریلیک، ورق‌های ضد خش با دوام ۵ برابری. این مقاله به بررسی این تکنولوژی انقلابی می‌پردازد.',
      category: 'innovations',
      date: '۱۴۰۲/۰۳/۱۸',
      author: 'زهرا امینی',
      readTime: '۶ دقیقه',
      image: 'bg-gradient-to-br from-blue-200 to-cyan-200'
    },
    {
      id: 6,
      title: 'طراحی مبلمان اکریلیک: ترکیب زیبایی و عملکرد',
      excerpt: 'چگونه با استفاده از اکریلیک مبلمان مدرن و کاربردی طراحی کنیم؟ در این مقاله اصول طراحی مبلمان اکریلیک را بررسی می‌کنیم.',
      category: 'design',
      date: '۱۴۰۲/۰۳/۰۵',
      author: 'حسن رضایی',
      readTime: '۹ دقیقه',
      image: 'bg-gradient-to-br from-violet-100 to-purple-200'
    }
  ];
  
  // فیلتر کردن مقالات بر اساس دسته‌بندی
  const filteredArticles = activeCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === activeCategory);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className=" mx-auto px-4">
        {/* عنوان بخش */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            دانش تخصصی <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">اکریلیک</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            جدیدترین مقالات، راهنماها و نوآوری‌ها در زمینه Plexiglas/Acrylic را در اینجا کشف کنید
          </motion.p>
        </div>
        
        {/* نوار جستجو و فیلترها */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 mb-12"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* دسته‌بندی‌ها */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-white text-gray-700 hover:bg-blue-50 border border-blue-100'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
            
            {/* جستجو */}
            <div className="relative w-full md:w-auto">
              <input
                type="text"
                placeholder="جستجو در مقالات..."
                className="w-full md:w-64 rounded-full border border-blue-200 bg-white py-2 pl-10 pr-4 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none"
              />
              <FiSearch className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </motion.div>
        
        {/* مقالات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-xl border border-blue-100 hover:shadow-2xl transition-all duration-300"
            >
              {/* تصویر مقاله */}
              <div className={`h-48 ${article.image} relative overflow-hidden`}>
                {/* برچسب دسته‌بندی */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {categories.find(c => c.id === article.category)?.name}
                  </div>
                </div>
                
                {/* دکمه مطالعه */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white text-blue-700 font-medium px-4 py-2 rounded-lg flex items-center">
                    مطالعه مقاله
                    <FiArrowRight className="mr-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
              
              {/* محتوای مقاله */}
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <div className="flex items-center mr-4">
                    <FiCalendar className="mr-1" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center">
                    <FiUser className="mr-1" />
                    <span>{article.author}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {article.excerpt}
                </p>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{article.readTime} مطالعه</span>
                  
                  <button className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                    ادامه مطلب
                    <FiArrowRight className="mr-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* مقالات برتر */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl overflow-hidden shadow-2xl mb-12"
        >
          <div className="p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">مقالات برتر ماه</h3>
                <p className="text-blue-100 max-w-xl">
                  پرفروش‌ترین و پرطرفدارترین مقالات تخصصی در زمینه اکریلیک که توسط متخصصان ما نوشته شده‌اند
                </p>
              </div>
              
              <button className="bg-white text-blue-700 font-bold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors whitespace-nowrap">
                مشاهده همه مقالات برتر
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {articles.slice(0, 2).map((article, index) => (
                <div key={article.id} className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <FiTag className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    
                    <div className="mr-4">
                      <div className="inline-block bg-white/20 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-white mb-2">
                        {categories.find(c => c.id === article.category)?.name}
                      </div>
                      <h4 className="font-bold text-white">{article.title}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* خبرنامه */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="bg-white rounded-2xl shadow-xl border border-blue-100 p-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-right">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">عضویت در خبرنامه تخصصی</h3>
              <p className="text-gray-600 max-w-xl">
                با عضویت در خبرنامه، جدیدترین مقالات، تکنیک‌ها و نوآوری‌های صنعت اکریلیک را مستقیم در ایمیل خود دریافت کنید
              </p>
            </div>
            
            <div className="w-full md:w-auto">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="آدرس ایمیل شما"
                  className="px-4 py-3 rounded-lg border border-blue-200 focus:border-blue-400 focus:outline-none"
                />
                <button className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold px-6 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all whitespace-nowrap">
                  عضویت در خبرنامه
                </button>
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

export default BlogSection;