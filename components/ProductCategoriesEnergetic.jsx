'use client';

import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { 
  Palette, 
  Home, 
  Building2, 
  Lightbulb, 
  ShoppingBag, 
  Award,
  ArrowLeft,
  Sparkles
} from 'lucide-react';

const ProductCategoriesEnergetic = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const categories = [
    {
      id: 1,
      title: "ورق‌های شفاف",
      subtitle: "کریستالی و براق",
      description: "برای ویترین‌ها، پارتیشن‌ها و پروژه‌های دکوراتیو",
      icon: Palette,
      gradient: "from-cyan-500 via-blue-500 to-indigo-600",
      bgGradient: "from-cyan-50 to-blue-100",
      hoverGradient: "from-cyan-400 to-blue-500",
      image: "/placeholder.webp",
      features: ["ضد خش", "UV مقاوم", "شفافیت عالی"],
      popular: true
    },
    {
      id: 2,
      title: "ورق‌های رنگی",
      subtitle: "طیف وسیع رنگ‌ها",
      description: "بیش از 50 رنگ مختلف برای هر سلیقه‌ای",
      icon: Home,
      gradient: "from-purple-500 via-pink-500 to-red-500",
      bgGradient: "from-purple-50 to-pink-100",
      hoverGradient: "from-purple-400 to-pink-500",
      image: "/placeholder.webp",
      features: ["رنگ‌ثابت", "مقاوم", "متنوع"]
    },
    {
      id: 3,
      title: "ورق‌های مات",
      subtitle: "ظاهر مدرن و شیک",
      description: "مناسب برای دکوراسیون داخلی و پروژه‌های هنری",
      icon: Building2,
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
      bgGradient: "from-emerald-50 to-teal-100",
      hoverGradient: "from-emerald-400 to-teal-500",
      image: "/placeholder.webp",
      features: ["بدون بازتاب", "ظاهر مخمل", "انعطاف‌پذیر"]
    },
    {
      id: 4,
      title: "ورق‌های آینه‌ای",
      subtitle: "بازتاب کامل نور",
      description: "برای آینه‌های تزئینی و پروژه‌های نورپردازی",
      icon: Lightbulb,
      gradient: "from-amber-500 via-orange-500 to-red-500",
      bgGradient: "from-amber-50 to-orange-100",
      hoverGradient: "from-amber-400 to-orange-500",
      image: "/placeholder.webp",
      features: ["بازتاب عالی", "بدون تشویش", "دوام بالا"]
    },
    {
      id: 5,
      title: "ورق‌های نئون",
      subtitle: "درخشان و چشم‌نواز",
      description: "برای تابلوهای تبلیغاتی و دکوراسیون نورانی",
      icon: ShoppingBag,
      gradient: "from-lime-500 via-green-500 to-emerald-500",
      bgGradient: "from-lime-50 to-green-100",
      hoverGradient: "from-lime-400 to-green-500",
      image: "/placeholder.webp",
      features: ["نور گیری عالی", "رنگ‌های زنده", "جذابیت بالا"]
    },
    {
      id: 6,
      title: "ورق‌های ضخیم",
      subtitle: "مقاومت و دوام",
      description: "برای پروژه‌های سنگین و صنعتی",
      icon: Award,
      gradient: "from-slate-600 via-gray-600 to-zinc-600",
      bgGradient: "from-slate-50 to-gray-100",
      hoverGradient: "from-slate-500 to-gray-600",
      image: "/placeholder.webp",
      features: ["مقاومت بالا", "ضخامت متنوع", "کیفیت صنعتی"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.25, 0.25, 0.75]
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-indigo-200/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-200/30 to-pink-200/20 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 backdrop-blur-sm border border-blue-300/20 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-blue-600" />
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
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              onHoverStart={() => setHoveredCard(category.id)}
              onHoverEnd={() => setHoveredCard(null)}
              className="group relative"
            >
              {/* Popular Badge */}
              {category.popular && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -top-3 -right-3 z-20 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg"
                >
                  محبوب‌ترین
                </motion.div>
              )}

              {/* Card Background */}
              <div className="relative h-full bg-white rounded-3xl shadow-lg shadow-gray-200/50 border border-gray-100/50 overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-gray-300/30">
                
                {/* Animated gradient overlay */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${category.hoverGradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                {/* Content */}
                <div className="relative p-8 h-full flex flex-col">
                  
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${category.gradient} rounded-2xl mb-6 shadow-lg`}
                  >
                    <category.icon className="w-8 h-8 text-white" />
                  </motion.div>

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
                      {category.features.map((feature, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className={`px-3 py-1 bg-gradient-to-r ${category.bgGradient} text-gray-700 text-sm font-medium rounded-full border border-gray-200/50`}
                        >
                          {feature}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-between"
                  >
                    <Link 
                      href={`/products?category=${category.id}`}
                      className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${category.gradient} text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group/btn`}
                    >
                      <span>مشاهده محصولات</span>
                      <ArrowLeft className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>

                    {/* Hover indicator */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ 
                        scale: hoveredCard === category.id ? 1 : 0,
                        rotate: hoveredCard === category.id ? 360 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className={`w-12 h-12 bg-gradient-to-br ${category.gradient} rounded-full flex items-center justify-center shadow-lg`}
                    >
                      <Sparkles className="w-6 h-6 text-white" />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 left-4 w-20 h-20 bg-gradient-to-br from-white/50 to-transparent rounded-full blur-xl opacity-60" />
                <div className="absolute bottom-4 right-4 w-16 h-16 bg-gradient-to-br from-white/30 to-transparent rounded-full blur-lg opacity-40" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 mb-8">
            محصول مورد نظرتان را پیدا نکردید؟
          </p>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            مشاوره اختصاصی
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductCategoriesEnergetic;
