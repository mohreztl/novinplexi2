'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiUser, FiArrowRight, FiSearch, FiTag } from 'react-icons/fi';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const BlogSection = () => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('all');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // دسته‌بندی‌های مقالات
  const categories = [
    { id: 'all', name: 'همه مقالات' },
    { id: 'tips', name: 'نکات فنی' },
    { id: 'design', name: 'طراحی' },
    { id: 'installation', name: 'نصب و نگهداری' },
    { id: 'innovations', name: 'تکنولوژی‌های جدید' },
  ];

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('/api/blog/posts');
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);
  

  if (loading) {
    return <div className="py-20 text-center">در حال بارگذاری مقالات...</div>;
  }

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
            آخرین مقالات و اخبار
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            جدیدترین مقالات و اخبار صنعت پلکسی گلس و اکریلیک را در اینجا دنبال کنید
          </motion.p>
        </div>

        {/* دسته‌بندی‌ها */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${activeCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-blue-50'
                }`}
            >
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* مقالات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* تصویر مقاله */}
              <div className={`h-48 ${article.image}`} />
              
              <div className="p-6">
                {/* دسته‌بندی */}
                <div className="flex items-center mb-4">
                  <FiTag className="text-blue-500 mr-2" />
                  <span className="text-sm text-blue-600 font-medium">
                    {categories.find(cat => cat.id === article.category)?.name}
                  </span>
                </div>

                {/* عنوان */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                  {article.title}
                </h3>

                {/* خلاصه */}
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {article.excerpt}
                </p>

                {/* متادیتا */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <FiUser className="mr-1" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center">
                    <FiCalendar className="mr-1" />
                    <span>{article.date}</span>
                  </div>
                </div>

                {/* دکمه ادامه مطلب */}
                <button className="mt-4 flex items-center text-blue-600 hover:text-blue-700 transition-colors">
                  <span className="font-medium ml-1">ادامه مطلب</span>
                  <FiArrowRight />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
