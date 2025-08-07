'use client';

import React from 'react';

const WhyChooseUs = () => {
  const features = [
    {
      icon: "🏆",
      title: "کیفیت پریمیوم",
      description: "بالاترین کیفیت مواد اولیه از معتبرترین تولیدکنندگان جهان",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: "⚡",
      title: "تحویل سریع",
      description: "تحویل در کمترین زمان ممکن با بسته‌بندی اختصاصی و ایمن",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: "🛠️",
      title: "خدمات تخصصی",
      description: "برش، حکاکی، خمکاری و تمام خدمات مرتبط با ورق‌های اکریلیک",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: "💡",
      title: "مشاوره رایگان",
      description: "تیم متخصص ما آماده ارائه مشاوره و راهنمایی در انتخاب بهترین محصول",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: "🔧",
      title: "ضمانت کیفیت",
      description: "تمام محصولات ما دارای ضمانت و گارانتی کیفیت هستند",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: "📞",
      title: "پشتیبانی 24/7",
      description: "تیم پشتیبانی ما همواره آماده پاسخگویی به سوالات شماست",
      color: "from-red-500 to-pink-500"
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-full mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            <span className="text-blue-700 text-sm font-medium">چرا نوین پلکسی؟</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
            <span className="block">مزایای همکاری</span>
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              با ما
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            بیش از یک دهه تجربه در زمینه تولید و فروش ورق‌های اکریلیک، ما را به یکی از معتبرترین برندهای این حوزه تبدیل کرده است
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative animate-slide-up hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-full bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
                
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                  <span className="text-2xl">{feature.icon}</span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
                
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-white/80 to-transparent rounded-full blur-lg opacity-50" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                آماده شروع پروژه‌تان هستید؟
              </h3>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                با تیم متخصص ما تماس بگیرید و بهترین راه‌حل را برای نیازهای خود دریافت کنید
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  تماس با ما
                </button>
                <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold border-2 border-white/30 rounded-xl hover:bg-white/20 hover:scale-105 transition-all duration-300">
                  مشاهده نمونه کارها
                </button>
              </div>
            </div>
          </div>
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
      `}</style>
    </section>
  );
};

export default WhyChooseUs;
