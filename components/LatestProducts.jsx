'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';

const LatestProducts = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          axios.get('/api/products?limit=8'),
          axios.get('/api/categories')
        ]);

        if (productsRes.status === 200) {
          setProducts(productsRes.data.products || []);
        }

        if (categoriesRes.status === 200) {
          const dbCategories = categoriesRes.data.categories || [];
          const allCategories = [
            { _id: 'all', name: 'همه محصولات', icon: '🎯' },
            ...dbCategories.map(cat => ({
              ...cat,
              icon: getCategoryIcon(cat.name)
            }))
          ];
          setCategories(allCategories);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get icon for category
  const getCategoryIcon = (categoryName) => {
    const iconMap = {
      'شفاف': '💎',
      'رنگی': '🎨',
      'مات': '✨',
      'آینه‌ای': '🪞',
      'نئون': '⚡',
      'ضخیم': '🔧'
    };
    return iconMap[categoryName] || '📦';
  };

  // Filter products based on category
  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category?._id === activeCategory);

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block h-8 w-32 bg-gray-200 rounded-full animate-pulse mb-6"></div>
            <div className="h-12 bg-gray-200 rounded-lg animate-pulse mb-4"></div>
            <div className="h-6 bg-gray-200 rounded-lg animate-pulse max-w-2xl mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-3"></div>
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/50 to-indigo-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-purple-100/50 to-pink-100/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-full mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            <span className="text-blue-700 text-sm font-medium">محصولات ما</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
            <span className="block">جدیدترین</span>
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              محصولات اکریلیک
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            از میان بیش از 200 محصول متنوع، بهترین ورق‌های اکریلیک را برای پروژه‌تان انتخاب کنید
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-slide-up">
          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() => setActiveCategory(category._id)}
              className={`group relative px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 ${
                activeCategory === category._id
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:shadow-md'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="text-lg">{category.icon}</span>
                {category.name}
              </span>
              
              {/* Active indicator */}
              {activeCategory === category._id && (
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-2xl animate-pulse" />
              )}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <div
              key={product._id}
              className="group relative bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Badge */}
              {product.badge && (
                <div className={`absolute top-4 right-4 z-10 ${product.badgeColor || 'bg-blue-500'} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg`}>
                  {product.badge}
                </div>
              )}

              {/* Product Image */}
              <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                <Image
                  src={product.images?.[0] || "/placeholder.webp"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Quick view button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="px-4 py-2 bg-white/90 backdrop-blur-sm text-gray-900 font-semibold rounded-xl shadow-lg hover:bg-white transition-colors">
                    مشاهده سریع
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}>
                        ⭐
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({product.reviews || 0})</span>
                </div>

                {/* Product Name */}
                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {(product.features || []).slice(0, 2).map((feature, featureIndex) => (
                    <span
                      key={featureIndex}
                      className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-lg"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black text-gray-900">
                      {product.price?.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-600">تومان</span>
                  </div>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      {product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Link
                    href={`/products/${product._id}`}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl text-center hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    جزئیات
                  </Link>
                  <button className="px-4 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 hover:scale-105 transition-all duration-300">
                    🛒
                  </button>
                </div>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* View All Products Button */}
        <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <span>مشاهده همه محصولات</span>
            <span className="text-lg">←</span>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default LatestProducts;
