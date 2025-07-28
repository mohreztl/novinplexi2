// components/ServicesSection.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiUsers, FiShield, FiTruck, FiHeadphones, FiRepeat } from 'react-icons/fi';

const ServicesSection = () => {
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
      description: 'مشاوره رایگان توسط متخصصان با تجربه در زمینه کاربردهای اکریلیک',
      icon: <FiUsers className="w-8 h-8" />,
      color: 'from-purple-500 to-indigo-700'
    },
    {
      id: 'installation',
      title: 'نصب حرفه‌ای',
      description: 'نصب و راه‌اندازی تخصصی محصولات توسط تیم فنی مجرب',
      icon: <FiShield className="w-8 h-8" />,
      color: 'from-cyan-500 to-blue-600'
    }
  ];

  // خدمات پشتیبانی
  const supportServices = [
    {
      id: 'delivery',
      title: 'تحویل سریع',
      description: 'تحویل در کمترین زمان ممکن در سراسر کشور',
      icon: <FiTruck className="w-6 h-6" />,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 'support',
      title: 'پشتیبانی 24/7',
      description: 'پاسخگویی به سوالات و مشکلات شما در هر زمان',
      icon: <FiHeadphones className="w-6 h-6" />,
      color: 'bg-indigo-100 text-indigo-600'
    },
    {
      id: 'warranty',
      title: 'گارانتی محصولات',
      description: 'گارانتی 12 ماهه برای کلیه محصولات',
      icon: <FiShield className="w-6 h-6" />,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      id: 'return',
      title: 'بازگشت محصول',
      description: 'امکان بازگشت محصول تا 7 روز پس از تحویل',
      icon: <FiRepeat className="w-6 h-6" />,
      color: 'bg-cyan-100 text-cyan-600'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className=" mx-auto px-4">
        {/* عنوان بخش */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">خدمات</span> اختصاصی ما
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            خدمات حرفه‌ای ما برای تضمین رضایت شما از مرحله طراحی تا تحویل نهایی
          </motion.p>
        </div>

        {/* خدمات اصلی */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {mainServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative h-full bg-white rounded-2xl overflow-hidden shadow-xl border border-blue-100 hover:shadow-2xl transition-all duration-300">
                {/* پس‌زمینه گرادیانت */}
                <div className={`absolute top-0 right-0 w-full h-1 bg-gradient-to-r ${service.color}`}></div>
                
                {/* محتوای سرویس */}
                <div className="p-8 h-full flex flex-col">
                  <div className="mb-6">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} text-white mb-6`}>
                      {service.icon}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                  
                  <div className="mt-auto">
                    <button className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                      اطلاعات بیشتر
                      <FiCheckCircle className="mr-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
                
                {/* افکت هوردر */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* روند خدمات */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl border border-blue-100 p-8 mb-16"
        >
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">
            روند <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">دریافت خدمات</span>
          </h3>
          
          <div className="relative">
            {/* خط اتصال */}
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 h-1 w-4/5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full hidden md:block"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { 
                  step: 1, 
                  title: "مشاوره اولیه", 
                  description: "تیم مشاوره ما نیازهای شما را تحلیل می‌کند" 
                },
                { 
                  step: 2, 
                  title: "طراحی و پیشنهاد", 
                  description: "طرح اولیه و پیشنهاد فنی ارائه می‌شود" 
                },
                { 
                  step: 3, 
                  title: "تولید و کنترل کیفیت", 
                  description: "محصول با بالاترین کیفیت تولید می‌شود" 
                },
                { 
                  step: 4, 
                  title: "تحویل و پشتیبانی", 
                  description: "محصول تحویل و پشتیبانی آغاز می‌شود" 
                }
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl mb-4 relative z-10">
                    {item.step}
                  </div>
                  <h4 className="font-bold text-lg text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* خدمات پشتیبانی */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">پشتیبانی</span> جامع
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                className="group"
              >
                <div className="h-full bg-white rounded-2xl border border-blue-100 p-6 hover:shadow-lg transition-all duration-300">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${service.color} mb-4`}>
                    {service.icon}
                  </div>
                  
                  <h4 className="font-bold text-lg text-gray-900 mb-2">{service.title}</h4>
                  <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                  
                  <button className="text-sm text-blue-600 font-medium hover:text-blue-700 transition-colors">
                    جزئیات بیشتر
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* درخواست خدمات */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-20 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-10 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-white mb-4">آماده دریافت خدمات هستید؟</h3>
              <p className="text-blue-100 mb-6">
                همین امروز با تیم متخصص ما تماس بگیرید و بهترین خدمات را دریافت کنید
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-blue-700 font-bold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors">
                  درخواست مشاوره
                </button>
                <button className="bg-transparent border-2 border-white text-white font-bold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors">
                  تماس با ما
                </button>
              </div>
            </div>
            
            <div className="hidden lg:block relative">
              <div className="absolute inset-0 bg-gradient-to-l from-blue-600/20 to-indigo-700/20 backdrop-blur-sm">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="w-64 h-64 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 animate-pulse"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 animate-pulse delay-300"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-white/30 backdrop-blur-sm border border-white/40 animate-pulse delay-500"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white flex items-center justify-center">
                      <FiHeadphones className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* دکوراسیون پس‌زمینه */}
      <div className="absolute inset-x-0 bottom-0 -z-10 h-64 bg-gradient-to-t from-blue-100/50 to-transparent"></div>
      <div className="absolute top-1/4 right-10 -z-10 w-64 h-64 rounded-full bg-blue-200/30 blur-3xl"></div>
      <div className="absolute bottom-1/3 left-10 -z-10 w-48 h-48 rounded-full bg-indigo-200/30 blur-3xl"></div>
    </section>
  );
};

export default ServicesSection;