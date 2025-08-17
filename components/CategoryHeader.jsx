import React from 'react';
import Image from 'next/image';
import { Package, Settings } from 'lucide-react';

const CategoryHeader = ({ category, type = 'product' }) => {
  if (!category) return null;

  const defaultContent = {
    product: {
      title: 'محصولات نوین پلکسی',
      description: 'مجموعه‌ای از بهترین محصولات پلکسی گلاس با کیفیت بالا و طراحی مدرن. ما متعهد هستیم بهترین کیفیت را با قیمت مناسب به شما ارائه دهیم.'
    },
    service: {
      title: 'خدمات نوین پلکسی',
      description: 'خدمات تخصصی طراحی و ساخت انواع محصولات پلکسی گلاس. تیم متخصص ما آماده ارائه مشاوره و خدمات سفارشی به شما می‌باشد.'
    }
  };

  const content = category || defaultContent[type];
  const IconComponent = type === 'service' ? Settings : Package;

  return (
    <div className="relative bg-gradient-to-r from-blue-50 to-indigo-100 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* بخش متن */}
          <div className="flex-1 text-center lg:text-right">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
              <IconComponent className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
                {content.name || content.title}
              </h1>
            </div>
            
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {content.description}
            </p>

            {/* اطلاعات اضافی */}
            <div className="flex items-center justify-center lg:justify-start gap-6 mt-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>کیفیت تضمینی</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>ارسال سریع</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>پشتیبانی ۲۴/۷</span>
              </div>
            </div>
          </div>

          {/* بخش تصویر */}
          {content.image && (
            <div className="flex-shrink-0">
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={content.image}
                  alt={content.name || content.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* عناصر تزئینی */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-200 rounded-full opacity-20"></div>
        <div className="absolute top-1/2 -left-8 w-16 h-16 bg-indigo-200 rounded-full opacity-30"></div>
        <div className="absolute bottom-8 right-1/4 w-12 h-12 bg-purple-200 rounded-full opacity-25"></div>
      </div>
    </div>
  );
};

export default CategoryHeader;
