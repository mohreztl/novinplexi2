'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiUsers, FiShield, FiTruck, FiHeadphones, FiRepeat, FiArrowLeft } from 'react-icons/fi';

const ServiceSection = () => {
  // خدمات اصلی
  const mainServices = [
    {
      id: 'custom',
      title: 'سفارشات اختصاصی',
      description: 'طراحی و تولید محصولات منحصر به فرد مطابق با نیازهای خاص شما',
      icon: <FiCheckCircle className="w-8 h-8" />,
      color: 'from-blue-600 to-indigo-600',
      bgColor: 'bg-blue-50 hover:bg-blue-100',
      textColor: 'text-blue-600'
    },
    {
      id: 'consulting',
      title: 'مشاوره تخصصی',
      description: 'ارائه راهنمایی تخصصی برای انتخاب بهترین محصول متناسب با نیاز شما',
      icon: <FiUsers className="w-8 h-8" />,
      color: 'from-indigo-600 to-blue-600',
      bgColor: 'bg-indigo-50 hover:bg-indigo-100',
      textColor: 'text-indigo-600'
    },
    {
      id: 'quality',
      title: 'تضمین کیفیت',
      description: 'استفاده از مرغوب‌ترین مواد اولیه و ارائه گارانتی محصولات',
      icon: <FiShield className="w-8 h-8" />,
      color: 'from-blue-700 to-indigo-700',
      bgColor: 'bg-slate-50 hover:bg-slate-100',
      textColor: 'text-slate-600'
    }
  ];

  // مزایای ما
  const advantages = [
    {
      id: 'delivery',
      title: 'ارسال سریع',
      description: 'تحویل در کوتاه‌ترین زمان ممکن به سراسر کشور',
      icon: <FiTruck className="w-6 h-6" />,
      highlight: 'رایگان بالای 500 هزار تومان'
    },
    {
      id: 'support',
      title: 'پشتیبانی 24/7',
      description: 'همواره در دسترس برای پاسخگویی به سؤالات شما',
      icon: <FiHeadphones className="w-6 h-6" />,
      highlight: 'پاسخگویی فوری'
    },
    {
      id: 'warranty',
      title: 'گارانتی بازگشت',
      description: 'تضمین بازگشت وجه در صورت عدم رضایت',
      icon: <FiRepeat className="w-6 h-6" />,
      highlight: 'تا 7 روز کاری'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-600 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-block mb-4">
            <span className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-full border border-blue-200">
              خدمات ویژه
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            خدمات نوین پلکسی
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            ما با ارائه خدمات متنوع و با کیفیت، همواره در تلاش برای جلب رضایت مشتریان عزیز هستیم و بهترین تجربه خرید را برای شما فراهم می‌کنیم
          </p>
        </motion.div>

        {/* خدمات اصلی */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-3 gap-8 mb-20"
        >
          {mainServices.map((service, index) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className="group relative"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Background Glow Effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${service.color} rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-300`}></div>
              
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} text-white mb-6 shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                  {service.icon}
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <div className="flex items-center text-blue-600 font-medium group-hover:text-indigo-600 transition-colors">
                  <span className="ml-2">بیشتر بدانید</span>
                  <FiArrowLeft className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* مزایای ما */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-white/50"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              چرا نوین پلکسی؟
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              مزایای منحصر به فرد که ما را از سایر رقبا متمایز می‌کند
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <motion.div
                key={advantage.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="group relative"
              >
                <div className="flex items-start space-x-4 space-x-reverse p-6 rounded-2xl hover:bg-blue-50/50 transition-all duration-300">
                  <div className="flex-shrink-0 p-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg group-hover:scale-105 transition-transform duration-300">
                    {advantage.icon}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors">
                      {advantage.title}
                    </h4>
                    <p className="text-gray-600 mb-3 leading-relaxed">
                      {advantage.description}
                    </p>
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full border border-blue-200">
                      {advantage.highlight}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center space-x-4 space-x-reverse bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
            <span className="font-semibold">همین الان شروع کنید</span>
            <FiArrowLeft className="w-5 h-5" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceSection;
