'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { 
  Layers, 
  Palette, 
  Shield, 
  Sparkles, 
  Zap, 
  Eye,
  ArrowLeft,
  Star
} from 'lucide-react';

const ProductCategories = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // دسته‌بندی‌های محصولات اکریلیک
  const categories = [
    {
      id: 1,
      title: 'ورق‌های شفاف',
      subtitle: 'کیفیت ممتاز',
      description: 'ورق‌های اکریلیک شفاف با بالاترین کیفیت و شفافیت',
      icon: Eye,
      color: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      borderColor: 'border-blue-200',
      href: '/products?category=transparent',
      features: ['ضد شکست', 'مقاوم UV', 'شفافیت عالی']
    },
    {
      id: 2,
      title: 'ورق‌های رنگی',
      subtitle: 'تنوع بی‌نظیر',
      description: 'طیف گسترده‌ای از رنگ‌های زیبا و جذاب',
      icon: Palette,
      color: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
      borderColor: 'border-purple-200',
      href: '/products?category=colored',
      features: ['رنگ‌های متنوع', 'ماندگاری بالا', 'کیفیت رنگ']
    },
    {
      id: 3,
      title: 'ورق‌های متالیک',
      subtitle: 'جلوه لوکس',
      description: 'فینیش متالیک براق برای پروژه‌های حرفه‌ای',
      icon: Sparkles,
      color: 'from-yellow-500 to-orange-500',
      bgGradient: 'from-yellow-50 to-orange-50',
      borderColor: 'border-yellow-200',
      href: '/products?category=metallic',
      features: ['فینیش براق', 'جلوه متالیک', 'مقاومت بالا']
    },
    {
      id: 4,
      title: 'ورق‌های ضخیم',
      subtitle: 'استحکام ویژه',
      description: 'ورق‌های ضخیم برای استفاده‌های سنگین',
      icon: Shield,
      color: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
      borderColor: 'border-green-200',
      href: '/products?category=thick',
      features: ['ضخامت بالا', 'مقاومت ویژه', 'استحکام عالی']
    },
    {
      id: 5,
      title: 'ورق‌های لایه‌ای',
      subtitle: 'تکنولوژی پیشرفته',
      description: 'ساختار چندلایه برای کاربردهای خاص',
      icon: Layers,
      color: 'from-indigo-500 to-blue-500',
      bgGradient: 'from-indigo-50 to-blue-50',
      borderColor: 'border-indigo-200',
      href: '/products?category=layered',
      features: ['ساختار چندلایه', 'عایق حرارتی', 'مقاومت شیمیایی']
    },
    {
      id: 6,
      title: 'ورق‌های سفارشی',
      subtitle: 'طراحی اختصاصی',
      description: 'محصولات سفارشی مطابق نیاز شما',
      icon: Zap,
      color: 'from-red-500 to-rose-500',
      bgGradient: 'from-red-50 to-rose-50',
      borderColor: 'border-red-200',
      href: '/products?category=custom',
      features: ['طراحی شخصی', 'ابعاد دلخواه', 'مشاوره رایگان']
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 font-vazir" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full border border-blue-200 mb-6"
          >
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-800">دسته‌بندی محصولات</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-6" dir="rtl">
            <span className="block mb-2">انواع</span>
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              ورق‌های اکریلیک
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed" dir="rtl">
            مجموعه کاملی از محصولات اکریلیک با بالاترین کیفیت و تنوع رنگ‌ها برای تمام نیازهای شما
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" dir="rtl">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: 0.3 + index * 0.1,
                type: "spring",
                stiffness: 100 
              }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative"
            >
              <Link href={category.href}>
                <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${category.bgGradient} border-2 ${category.borderColor} p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-black/10`}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-grid-pattern"></div>
                  </div>
                  
                  {/* Floating Orb */}
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 180, 360]
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className={`absolute -top-4 -right-4 w-20 h-20 rounded-full bg-gradient-to-br ${category.color} opacity-10 blur-xl`}
                  />

                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${category.color} text-white mb-6 shadow-lg`}
                  >
                    <category.icon className="h-8 w-8" />
                  </motion.div>

                  {/* Content */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-black text-gray-900 mb-2">
                        {category.title}
                      </h3>
                      <p className={`text-sm font-semibold bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                        {category.subtitle}
                      </p>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {category.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2">
                      {category.features.map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: 0.5 + index * 0.1 + featureIndex * 0.1 }}
                          className="flex items-center gap-2"
                        >
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* CTA */}
                    <motion.div
                      whileHover={{ x: -5 }}
                      className="flex items-center gap-2 text-gray-700 group-hover:text-gray-900 pt-4"
                    >
                      <span className="font-semibold">مشاهده محصولات</span>
                      <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    </motion.div>
                  </div>

                  {/* Hover Gradient Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}
                  />

                  {/* Shine Effect */}
                  <motion.div
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 5,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center mt-16"
        >
          <Link href="/products">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-600/25 hover:shadow-blue-600/40 transition-all"
            >
              <span>مشاهده همه محصولات</span>
              <ArrowLeft className="h-5 w-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, #3b82f622 1px, transparent 1px),
            linear-gradient(to bottom, #3b82f622 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
        .font-vazir {
          font-family: Vazirmatn, YekanBakh, Tahoma, Arial, sans-serif;
        }
      `}</style>
    </section>
  );
};

export default ProductCategories;
