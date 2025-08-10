'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const HeroAwesome = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slide images and content
  const slides = [
    {
      image: "/novinplexi1.webp",
      title: "ورق‌های اکریلیک",
      subtitle: "برای هر نیاز",
      description: "از دکوراسیون داخلی تا پروژه‌های صنعتی"
    },
    {
      image: "/novinplexi2.webp", 
      title: "طراحی اختصاصی",
      subtitle: "متناسب با سلیقه شما",
      description: "تیم متخصص ما آماده تحقق ایده‌های شماست"
    },
    {
      image: "/novinplexi5.webp",
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

  // Stats data (commented out - can be restored later if needed)
  /*
  const stats = [
    { number: "+1000", text: "پروژه موفق", color: "text-blue-500" },
    { number: "10+", text: "سال تجربه", color: "text-indigo-500" },
    { number: "500+", text: "مشتری راضی", color: "text-purple-500" },
    { number: "24/7", text: "پشتیبانی", color: "text-cyan-500" }
  ];
  */

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Background Image Slider */}
      <div className="absolute inset-0">
        <div className="relative h-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-80' : 'opacity-0'
              }`}
            >
              <Image
                src={slide.image}
                alt="نوین پلکسی"
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
        
        {/* Overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-blue-900/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-slate-900/30" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-indigo-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-indigo-500/20 to-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 15 }, (_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse"
              style={{
                left: `${20 + i * 5}%`,
                top: `${30 + (i % 4) * 10}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Full Background Layout - Centered Content */}
          <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
            
            {/* Content Section */}
            <div className="animate-fade-in-up opacity-0" style={{animationFillMode: 'forwards'}}>
              {/* Brand Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 backdrop-blur-sm border border-blue-300/30 rounded-full mb-6 animate-slide-down">
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                <span className="text-blue-300 text-sm font-medium">پیشرو در صنعت پلکسی</span>
              </div>

              {/* Main Title */}
              <h1 className="text-6xl lg:text-8xl font-black text-white mb-6 leading-tight animate-slide-up">
                <span className="block">نوین</span>
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                  پلکسی
                </span>
              </h1>

              {/* Animated Subtitle */}
              <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                <h2 className="text-2xl lg:text-4xl font-bold text-blue-300 mb-2">
                  {slides[currentSlide].title}
                </h2>
                <h3 className="text-xl lg:text-2xl text-cyan-200 mb-4">
                  {slides[currentSlide].subtitle}
                </h3>
                <p className="text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
                  {slides[currentSlide].description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.8s' }}>
                <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-2xl shadow-2xl shadow-blue-500/25 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-blue-500/40">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex items-center gap-2">
                    مشاهده محصولات
                    <span className="text-lg group-hover:translate-x-1 transition-transform">←</span>
                  </span>
                </button>

                <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold border-2 border-white/30 rounded-2xl hover:bg-white/20 hover:scale-105 transition-all duration-300">
                  مشاوره رایگان
                </button>
              </div>
            </div>
          </div>

          {/* Commented out Stats Cards - can be restored later if needed
          <div className="grid grid-cols-2 gap-6 animate-fade-in-right" style={{ animationDelay: '0.4s' }}>
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group relative transition-all duration-300 hover:scale-105 hover:-translate-y-2"
                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20" />
                <div className="relative p-6 text-center">
                  <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl mb-4 group-hover:rotate-12 transition-transform`}>
                    <span className="text-white font-bold text-lg">⚡</span>
                  </div>
                  <div className={`text-3xl font-black text-white mb-2 ${stat.color}`}>{stat.number}</div>
                  <div className="text-gray-300 text-sm">{stat.text}</div>
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
          */}
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
                ? 'bg-blue-400 scale-125 shadow-lg shadow-blue-400/50' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 text-white/60 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm">اسکرول کنید</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent" />
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translate3d(0, 20px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
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

        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          will-change: opacity, transform;
        }

        .animate-slide-down {
          animation: slide-down 0.6s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in-right {
          animation: fade-in-right 1s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default HeroAwesome;
