'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiUsers, FiShield, FiTruck, FiHeadphones, FiRepeat } from 'react-icons/fi';

const ServiceSection = () => {
  // خدمات اصلی
  const mainServices = [
    {
      id: 'custom',
      title: 'سفارشات اختصاصی',
      description: 'طراحی و تولید محصولات منحصر به فرد مطابق با نیازهای خاص شما',
      icon: <FiCheckCircle className="w-8 h-8" />,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'consulting',
      title: 'مشاوره تخصصی',
      description: 'ارائه راهنمایی تخصصی برای انتخاب بهترین محصول متناسب با نیاز شما',
      icon: <FiUsers className="w-8 h-8" />,
      color: 'from-green-500 to-teal-600'
    },
    {
      id: 'quality',
      title: 'تضمین کیفیت',
      description: 'استفاده از مرغوب‌ترین مواد اولیه و ارائه گارانتی محصولات',
      icon: <FiShield className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-600'
    }
  ];

  // مزایای ما
  const advantages = [
    {
      id: 'delivery',
      title: 'ارسال سریع',
      description: 'تحویل در کوتاه‌ترین زمان ممکن به سراسر کشور',
      icon: <FiTruck className="w-6 h-6" />
    },
    {
      id: 'support',
      title: 'پشتیبانی 24/7',
      description: 'همواره در دسترس برای پاسخگویی به سؤالات شما',
      icon: <FiHeadphones className="w-6 h-6" />
    },
    {
      id: 'warranty',
      title: 'گارانتی بازگشت',
      description: 'تضمین بازگشت وجه در صورت عدم رضایت',
      icon: <FiRepeat className="w-6 h-6" />
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl font-bold mb-4">خدمات ویژه نوین پلکسی</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          ما با ارائه خدمات متنوع و با کیفیت، همواره در تلاش برای جلب رضایت مشتریان عزیز هستیم
        </p>
      </motion.div>

      {/* خدمات اصلی */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {mainServices.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative group"
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className={`inline-block p-3 rounded-lg bg-gradient-to-r ${service.color} text-white mb-4`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* مزایای ما */}
      <div className="grid md:grid-cols-3 gap-8">
        {advantages.map((advantage, index) => (
          <motion.div
            key={advantage.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            className="flex items-start space-x-4 space-x-reverse"
          >
            <div className="flex-shrink-0 p-2 rounded-lg bg-blue-100 text-blue-600">
              {advantage.icon}
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">{advantage.title}</h4>
              <p className="text-gray-600">{advantage.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ServiceSection;
