'use client';

import React from 'react';
import Image from 'next/image';

/**
 * کامپوننت Loading - صفحه بارگذاری ساده و سریع
 * انیمیشن‌های CSS خالص برای بهترین عملکرد
 */
const Loading = ({ isLoading = true }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50 backdrop-blur-sm">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 via-indigo-400/15 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-indigo-400/20 via-blue-400/15 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full opacity-60 animate-pulse"
              style={{
                left: `${20 + i * 6}%`,
                top: `${30 + (i % 4) * 10}%`,
                animationDelay: `${i * 0.4}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center animate-fade-in">
        {/* Logo Container */}
        <div className="relative mb-8 animate-scale-in">
          {/* Animated rings around logo */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-blue-300/40 scale-150 animate-spin-slow" />
          <div className="absolute inset-0 rounded-full border border-indigo-300/30 scale-125 animate-spin-reverse" />
          
          {/* Logo */}
          <div className="relative mx-auto h-32 w-32 lg:h-40 lg:w-40 rounded-full bg-gradient-to-br from-white via-blue-50 to-indigo-50 p-6 shadow-2xl shadow-blue-600/20 border border-blue-100/50 backdrop-blur-sm">
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 via-transparent to-indigo-400/20 blur-xl animate-pulse" />
            
            {/* Logo Image */}
            <div className="relative h-full w-full flex items-center justify-center">
              <Image
                src="/logo1.svg"
                alt="نوین پلکسی"
                width={80}
                height={80}
                className="h-full w-full object-contain filter drop-shadow-lg"
                priority
              />
            </div>
          </div>
        </div>

        {/* Brand Name */}
        <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <h1 className="text-3xl lg:text-4xl font-black text-gray-900 mb-2">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
              نوین پلکسی
            </span>
          </h1>
          <p className="text-gray-600 font-medium text-lg">
            پیشرو در صنعت ورق‌های اکریلیک
          </p>
        </div>

        {/* Loading Bar */}
        <div className="relative mx-auto w-48 lg:w-64 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          {/* Background */}
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden shadow-inner">
            {/* Progress Bar */}
            <div className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 rounded-full animate-loading-bar relative">
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
            </div>
          </div>
          
          {/* Loading Text */}
          <p className="text-center text-sm text-gray-500 mt-3 font-medium animate-pulse">
            در حال بارگذاری...
          </p>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center gap-2 mt-8 animate-fade-in" style={{ animationDelay: '0.9s' }}>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.8) rotate(-180deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotate(0deg);
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

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes loading-bar {
          0% {
            width: 0%;
          }
          50% {
            width: 70%;
          }
          100% {
            width: 100%;
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-scale-in {
          animation: scale-in 1s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        .animate-spin-reverse {
          animation: spin-reverse 12s linear infinite;
        }

        .animate-loading-bar {
          animation: loading-bar 2s ease-in-out infinite;
        }

        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Loading;
