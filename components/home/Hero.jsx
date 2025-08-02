'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ChevronLeft, 
  Star, 
  CheckCircle, 
  Sparkles, 
  Shield, 
  Palette, 
  HeartHandshake,
  Zap,
  Award,
  Users,
  TrendingUp,
  ArrowRight
} from 'lucide-react';

const Hero = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const features = [
    {
      title: "کیفیت برتر محصولات",
      description: "استفاده از بهترین متریال‌های اکریلیک با گارانتی اصالت",
      icon: <Shield className="h-6 w-6" />,
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100"
    },
    {
      title: "طراحی سفارشی",
      description: "ساخت محصولات منحصر به فرد مطابق با نیاز شما",
      icon: <Palette className="h-6 w-6" />,
      color: "from-indigo-500 to-indigo-600",
      bgColor: "from-indigo-50 to-indigo-100"
    },
    {
      title: "پشتیبانی ۲۴/۷",
      description: "همراهی و مشاوره تخصصی در تمام مراحل سفارش",
      icon: <HeartHandshake className="h-6 w-6" />,
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100"
    }
  ];

  const stats = [
    { number: "1000", suffix: "+", label: "مشتری راضی", icon: <Users className="h-5 w-5" /> },
    { number: "500", suffix: "+", label: "پروژه موفق", icon: <Award className="h-5 w-5" /> },
    { number: "10", suffix: "+", label: "سال تجربه", icon: <TrendingUp className="h-5 w-5" /> }
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50 font-vazir">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
        
        {/* Animated Gradient Orbs */}
        <motion.div
          animate={{
            x: [0, 150, 0],
            y: [0, -100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-10 left-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-blue-400/30 via-indigo-400/20 to-transparent blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -150, 0],
            y: [0, 100, 0],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-0 right-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-indigo-400/30 via-purple-400/20 to-transparent blur-3xl"
        />
        
        {/* Floating Particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: 0, opacity: 0 }}
            animate={{ 
              y: [-20, -100, -20],
              opacity: [0, 1, 0],
              x: [0, (i % 2 ? 20 : -20), 0]
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: i * 2,
              ease: "easeInOut"
            }}
            className="absolute"
            style={{ 
              left: `${20 + i * 15}%`, 
              bottom: `${10 + i * 10}%` 
            }}
          >
            <Sparkles className="h-6 w-6 text-blue-400/20" />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="container relative z-10 mx-auto px-4 pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center" dir="rtl">
          {/* Text Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8 order-2 lg:order-2 lg:pr-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-blue-600/10 px-5 py-2.5 backdrop-blur-sm border border-blue-200/50"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="h-4 w-4 text-blue-600" />
              </motion.div>
              <span className="text-sm font-semibold text-blue-900">پیشرو در صنعت اکریلیک ایران</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-blue-600 rounded-full"
              />
            </motion.div>

            {/* Title */}
            <div className="space-y-6">
              <h1 className="text-4xl font-black leading-tight text-gray-900 lg:text-6xl xl:text-7xl">
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                  className="block"
                >
                  خلاقیت در طراحی
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
                  className="relative block"
                >
                  <span className="relative z-10 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent bg-size-200 animate-gradient">
                    محصولات اکریلیک
                  </span>
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "100%", opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="absolute -bottom-3 left-0 h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 rounded-full blur-sm"
                  />
                </motion.span>
              </h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-lg leading-relaxed text-gray-600 lg:text-xl max-w-2xl"
              >
                در نوین پلکسی، هنر و تکنولوژی را با هم ترکیب می‌کنیم تا محصولات اکریلیک منحصر به فردی خلق کنیم که نه تنها زیبا هستند، بلکه کاربردی و با دوام نیز می‌باشند.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/products">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onHoverStart={() => setIsHovered(true)}
                  onHoverEnd={() => setIsHovered(false)}
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 font-bold text-white shadow-2xl shadow-blue-600/25 transition-all hover:shadow-blue-600/40"
                >
                  <span className="relative z-10">مشاهده محصولات</span>
                  <motion.div
                    animate={{ x: isHovered ? 0 : -3 }}
                    className="relative z-10"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </motion.div>
                  
                  {/* Shimmer Effect */}
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: isHovered ? "100%" : "-100%" }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  />
                </motion.button>
              </Link>

              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex items-center gap-3 rounded-2xl border-2 border-gray-200 bg-white/80 px-8 py-4 font-bold text-gray-700 backdrop-blur-sm transition-all hover:border-blue-600/50 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700 hover:shadow-lg"
                >
                  <span>تماس با ما</span>
                  <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats with Icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-3 gap-6 pt-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    delay: 0.8 + index * 0.1, 
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{ y: -5 }}
                  className="relative group"
                >
                  <div className="text-center space-y-2">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="inline-flex p-2 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 group-hover:shadow-lg transition-shadow mx-auto"
                    >
                      {stat.icon}
                    </motion.div>
                    <div className="text-2xl font-black text-gray-900 lg:text-3xl">
                      <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        {stat.number}
                      </span>
                      <span className="text-blue-600">{stat.suffix}</span>
                    </div>
                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image Section with 3D Effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
            className="relative order-1 lg:order-1 flex justify-center"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {
              mouseX.set(0);
              mouseY.set(0);
            }}
          >
            <motion.div 
              className="relative aspect-[4/5] lg:aspect-square w-full max-w-[400px] lg:max-w-[480px] xl:max-w-[520px]"
              style={{ 
                rotateX: rotateX,
                rotateY: rotateY,
                perspective: 1000
              }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              {/* Glass Frame with Gradient Border */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-600/20 via-indigo-600/20 to-blue-600/20 p-[2px]">
                <div className="h-full w-full rounded-3xl bg-gradient-to-br from-white/40 to-white/20 p-4 lg:p-8 backdrop-blur-xl shadow-2xl">
                  <div className="relative h-full w-full overflow-hidden rounded-2xl">
                    {!imageError ? (
                      <>
                        <Image
                          src="/hero.webp"
                          alt="محصولات اکریلیک نوین پلکسی"
                          fill
                          priority
                          quality={100}
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover transition-transform duration-700 hover:scale-110 rounded-2xl"
                          onError={() => setImageError(true)}
                        />
                        {/* Enhanced Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none rounded-2xl" />
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-indigo-600/10 pointer-events-none rounded-2xl mix-blend-overlay" />
                      </>
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 rounded-2xl">
                        <div className="text-center text-white">
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.5, type: 'spring' }}
                            className="mb-6 inline-block rounded-full bg-white/20 p-6 backdrop-blur-sm"
                          >
                            <Sparkles className="h-16 w-16" />
                          </motion.div>
                          <h3 className="mb-2 text-3xl font-black">نوین پلکسی</h3>
                          <p className="text-white/90 font-medium">پیشرو در صنعت اکریلیک</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Animated Feature Points */}
              <AnimatePresence mode="wait">
                {features.map((feature, index) => (
                  activeFeature === index && (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.7, y: 20, rotate: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.7, y: -20, rotate: 10 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="absolute z-20"
                      style={{
                        top: `${20 + (index * 30)}%`,
                        left: index % 2 ? 'auto' : '-40px',
                        right: index % 2 ? '-40px' : 'auto',
                      }}
                    >
                      <motion.div 
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        className="relative flex items-center gap-3 rounded-2xl bg-white/95 backdrop-blur-md p-4 shadow-2xl border border-blue-100/50"
                      >
                        {/* Pulse effect */}
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-400 to-indigo-400 opacity-20 blur-xl"
                        />
                        
                        <div className={`relative rounded-xl bg-gradient-to-br ${feature.bgColor} p-3 shadow-lg`}>
                          <motion.div 
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className={`text-transparent bg-gradient-to-br ${feature.color} bg-clip-text`}
                          >
                            {feature.icon}
                          </motion.div>
                        </div>
                        <div className="max-w-[200px]">
                          <h4 className="font-bold text-gray-900">{feature.title}</h4>
                          <p className="text-xs text-gray-600 leading-relaxed">{feature.description}</p>
                        </div>
                      </motion.div>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>

              {/* Feature Indicators */}
              <div className="absolute -bottom-10 right-1/2 flex translate-x-1/2 gap-3">
                {features.map((_, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setActiveFeature(index)}
                    className={`h-2.5 transition-all duration-500 ${
                      activeFeature === index
                        ? 'w-10 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-600/50'
                        : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                    } rounded-full`}
                    aria-label={`نمایش ویژگی ${index + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, #3b82f622 1px, transparent 1px),
            linear-gradient(to bottom, #3b82f622 1px, transparent 1px);
          background-size: 40px 40px;
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .bg-size-200 {
          background-size: 200% 200%;
        }
        
        .font-vazir {
          font-family: Vazirmatn, YekanBakh, Tahoma, Arial, sans-serif;
        }
      `}</style>
    </section>
  );
};

export default Hero;