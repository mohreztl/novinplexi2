'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, Sparkles, Users, Trophy, Palette, Layers } from 'lucide-react';

const HeroEnergetic = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Slide images and content
  const slides = [
    {
      image: "/hero.webp",
      title: "ورق‌های اکریلیک",
      subtitle: "برای هر نیاز",
      description: "از دکوراسیون داخلی تا پروژه‌های صنعتی"
    },
    {
      image: "/nikoodecor.webp", 
      title: "طراحی اختصاصی",
      subtitle: "متناسب با سلیقه شما",
      description: "تیم متخصص ما آماده تحقق ایده‌های شماست"
    },
    {
      image: "/quality1.png",
      title: "کیفیت بی‌نظیر",
      subtitle: "استاندارد اروپایی",
      description: "بهترین مواد اولیه با تکنولوژی روز دنیا"
    }
  ];

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Floating particles animation
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: i * 0.2,
    duration: 3 + Math.random() * 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Background Image Slider */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.3, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={slides[currentSlide].image}
              alt="نوین پلکسی"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-blue-900/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-slate-900/30" />
      </div>

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Glowing orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-indigo-500/10 rounded-full blur-3xl"
      />
      
      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-indigo-500/20 to-blue-500/10 rounded-full blur-3xl"
      />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-right"
            >
              {/* Brand Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 backdrop-blur-sm border border-blue-300/30 rounded-full mb-6"
              >
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-blue-300 text-sm font-medium">پیشرو در صنعت پلکسی</span>
              </motion.div>

              {/* Main Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-6xl lg:text-7xl font-black text-white mb-6 leading-tight"
              >
                <span className="block">نوین</span>
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                  پلکسی
                </span>
              </motion.h1>

              {/* Animated Subtitle */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.8 }}
                  className="mb-8"
                >
                  <h2 className="text-2xl lg:text-3xl font-bold text-blue-300 mb-2">
                    {slides[currentSlide].title}
                  </h2>
                  <h3 className="text-xl text-cyan-200 mb-4">
                    {slides[currentSlide].subtitle}
                  </h3>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    {slides[currentSlide].description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-2xl shadow-2xl shadow-blue-500/25 overflow-hidden"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500"
                    initial={{ x: "-100%" }}
                    animate={{ x: isHovered ? "0%" : "-100%" }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative flex items-center gap-2">
                    مشاهده محصولات
                    <ChevronLeft className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold border-2 border-white/30 rounded-2xl hover:bg-white/20 transition-all duration-300"
                >
                  مشاوره رایگان
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Content - Stats Cards */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { icon: Users, number: "+1000", text: "پروژه موفق", color: "from-blue-500 to-cyan-500" },
                { icon: Trophy, number: "10+", text: "سال تجربه", color: "from-indigo-500 to-purple-500" },
                { icon: Palette, number: "500+", text: "مشتری راضی", color: "from-cyan-500 to-blue-500" },
                { icon: Layers, number: "24/7", text: "پشتیبانی", color: "from-purple-500 to-indigo-500" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20" />
                  <div className="relative p-6 text-center">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl mb-4`}
                    >
                      <stat.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <div className="text-3xl font-black text-white mb-2">{stat.number}</div>
                    <div className="text-gray-300 text-sm">{stat.text}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-blue-400 scale-125' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 right-8 text-white/60"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm">اسکرول کنید</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroEnergetic;
