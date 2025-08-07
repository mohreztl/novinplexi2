'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

// Default categories as fallback
const defaultCategories = [
  {
    id: 1,
    title: "ورق‌های شفاف",
    subtitle: "کریستالی و براق",
    description: "برای ویترین‌ها، پارتیشن‌ها و پروژه‌های دکوراتیو",
    icon: "💎",
    gradient: "from-cyan-500 via-blue-500 to-indigo-600",
    bgGradient: "from-cyan-50 to-blue-100",
    features: ["ضد خش", "UV مقاوم", "شفافیت عالی"],
    popular: true
  },
  {
    id: 2,
    title: "ورق‌های رنگی",
    subtitle: "طیف وسیع رنگ‌ها",
    description: "بیش از 50 رنگ مختلف برای هر سلیقه‌ای",
    icon: "🎨",
    gradient: "from-purple-500 via-pink-500 to-red-500",
    bgGradient: "from-purple-50 to-pink-100",
    features: ["رنگ‌ثابت", "مقاوم", "متنوع"]
  },
  {
    id: 3,
    title: "ورق‌های مات",
    subtitle: "ظاهر مدرن و شیک",
    description: "مناسب برای دکوراسیون داخلی و پروژه‌های هنری",
    icon: "✨",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    bgGradient: "from-emerald-50 to-teal-100",
    features: ["بدون بازتاب", "ظاهر مخمل", "انعطاف‌پذیر"]
  },
  {
    id: 4,
    title: "ورق‌های آینه‌ای",
    subtitle: "بازتاب کامل نور",
    description: "برای آینه‌های تزئینی و پروژه‌های نورپردازی",
    icon: "🪞",
    gradient: "from-amber-500 via-orange-500 to-red-500",
    bgGradient: "from-amber-50 to-orange-100",
    features: ["بازتاب عالی", "بدون تشویش", "دوام بالا"]
  },
  {
    id: 5,
    title: "ورق‌های نئون",
    subtitle: "درخشان و چشم‌نواز",
    description: "برای تابلوهای تبلیغاتی و دکوراسیون نورانی",
    icon: "⚡",
    gradient: "from-lime-500 via-green-500 to-emerald-500",
    bgGradient: "from-lime-50 to-green-100",
    features: ["نور گیری عالی", "رنگ‌های زنده", "جذابیت بالا"]
  },
  {
    id: 6,
    title: "ورق‌های ضخیم",
    subtitle: "مقاومت و دوام",
    description: "برای پروژه‌های سنگین و صنعتی",
    icon: "🔧",
    gradient: "from-slate-600 via-gray-600 to-zinc-600",
    bgGradient: "from-slate-50 to-gray-100",
    features: ["مقاومت بالا", "ضخامت متنوع", "کیفیت صنعتی"]
  }
];

const ProductCategoriesAwesome = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories');
        if (response.data && Array.isArray(response.data)) {
          const processedCategories = response.data.map((cat, index) => ({
            id: cat._id || cat.id,
            title: cat.name || cat.title,
            subtitle: cat.subtitle || "محصولات با کیفیت",
            description: cat.description || "انواع محصولات باکیفیت در این دسته‌بندی",
            icon: cat.icon || ["💎", "🎨", "✨", "🪞", "⚡", "🔧"][index % 6],
            gradient: cat.gradient || ["from-cyan-500 via-blue-500 to-indigo-600", "from-purple-500 via-pink-500 to-red-500", "from-emerald-500 via-teal-500 to-cyan-500", "from-amber-500 via-orange-500 to-red-500", "from-lime-500 via-green-500 to-emerald-500", "from-slate-600 via-gray-600 to-zinc-600"][index % 6],
            bgGradient: cat.bgGradient || ["from-cyan-50 to-blue-100", "from-purple-50 to-pink-100", "from-emerald-50 to-teal-100", "from-amber-50 to-orange-100", "from-lime-50 to-green-100", "from-slate-50 to-gray-100"][index % 6],
            features: cat.features || ["کیفیت عالی", "مقاوم", "متنوع"],
            popular: index === 0
          }));
          setCategories(processedCategories.slice(0, 6));
        } else {
          setCategories(defaultCategories);
        }
      } catch (error) {
        console.error('خطا در بارگیری دسته‌بندی‌ها:', error);
        setCategories(defaultCategories);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-indigo-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-200/30 to-pink-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        {/* <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 backdrop-blur-sm border border-blue-300/20 rounded-full mb-6">
            <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
            <span className="text-blue-700 text-sm font-medium">دسته‌بندی محصولات</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
            <span className="block">انواع ورق‌های</span>
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              اکریلیک پریمیوم
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            با تکنولوژی پیشرفته و کیفیت بی‌نظیر، بهترین ورق‌های اکریلیک را برای پروژه‌های شما ارائه می‌دهیم
          </p>
        </div> */}

        {/* Categories Grid */}
        {loading ? (
          // Loading Skeleton
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="group relative animate-pulse"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden p-8 h-80">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 bg-gray-200 rounded-2xl"></div>
                    <div className="w-20 h-6 bg-gray-200 rounded-full"></div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="w-3/4 h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
                  </div>
                  
                  <div className="w-full h-4 bg-gray-200 rounded mb-6"></div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="w-16 h-6 bg-gray-200 rounded-full"></div>
                    ))}
                  </div>
                  
                  <div className="w-24 h-10 bg-gray-200 rounded-xl"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className="group relative animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setHoveredCard(category.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Popular Badge */}
                {category.popular && (
                  <div className="absolute -top-3 -right-3 z-20 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-bounce">
                    محبوب‌ترین
                </div>
              )}

              {/* Card Background */}
              <div className="relative h-full bg-white rounded-3xl shadow-lg shadow-gray-200/50 border border-gray-100/50 overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-gray-300/30 group-hover:scale-105 group-hover:-translate-y-2">
                
                {/* Animated gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                {/* Content */}
                <div className="relative p-8 h-full flex flex-col">
                  
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${category.gradient} rounded-2xl mb-6 shadow-lg transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300`}>
                    <span className="text-2xl">{category.icon}</span>
                  </div>

                  {/* Title and subtitle */}
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-lg font-medium text-gray-600 mb-3">
                      {category.subtitle}
                    </p>
                    <p className="text-gray-500 leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="mb-6 flex-1">
                    <div className="flex flex-wrap gap-2">
                      {category.features.map((feature, featureIndex) => (
                        <span
                          key={featureIndex}
                          className={`px-3 py-1 bg-gradient-to-r ${category.bgGradient} text-gray-700 text-sm font-medium rounded-full border border-gray-200/50 transform group-hover:scale-105 transition-transform`}
                          style={{ transitionDelay: `${featureIndex * 0.1}s` }}
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="flex items-center justify-between">
                    <Link 
                      href={`/products?category=${category.id}`}
                      className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${category.gradient} text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group/btn hover:scale-105`}
                    >
                      <span>مشاهده محصولات</span>
                      <span className="group-hover/btn:translate-x-1 transition-transform">←</span>
                    </Link>

                    {/* Hover indicator */}
                    {hoveredCard === category.id && (
                      <div className={`w-12 h-12 bg-gradient-to-br ${category.gradient} rounded-full flex items-center justify-center shadow-lg animate-spin`}>
                        <span className="text-white font-bold text-lg">✨</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 left-4 w-20 h-20 bg-gradient-to-br from-white/50 to-transparent rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute bottom-4 right-4 w-16 h-16 bg-gradient-to-br from-white/30 to-transparent rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <p className="text-lg text-gray-600 mb-8">
            محصول مورد نظرتان را پیدا نکردید؟
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
            مشاوره اختصاصی
          </button>
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
      `}</style>
    </section>
  );
};

export default ProductCategoriesAwesome;
