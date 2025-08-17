"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import CategoryHeader from '@/components/CategoryHeader';
import { useCategory } from '@/hooks/useCategories';
import { Loader2, Phone, Mail, MapPin } from 'lucide-react';

const ServicesPage = () => {
  const params = useParams();
  const categorySlug = params?.category;
  
  const { category, loading: categoryLoading } = useCategory(categorySlug);

  if (categoryLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>در حال بارگیری...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* هدر دسته‌بندی */}
      <CategoryHeader category={category} type="service" />
      
      {/* محتوای خدمات */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <p className="text-gray-600 mb-8">
            اینجا لیست خدمات {category?.name || 'همه خدمات'} نمایش داده خواهد شد.
          </p>
        </div>

        {/* نمونه کارت‌های خدمات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[
            {
              title: 'طراحی سفارشی',
              description: 'طراحی و ساخت محصولات پلکسی گلاس بر اساس نیاز شما',
              features: ['طراحی رایگان', 'مشاوره تخصصی', 'تحویل سریع']
            },
            {
              title: 'برش دقیق',
              description: 'برش انواع پلکسی گلاس با دستگاه‌های مدرن و دقت بالا',
              features: ['برش لیزری', 'ابعاد دلخواه', 'کیفیت بالا']
            },
            {
              title: 'نصب و راه‌اندازی',
              description: 'نصب حرفه‌ای محصولات در محل شما توسط تیم متخصص',
              features: ['نصب رایگان', 'ضمانت کار', 'پشتیبانی فنی']
            }
          ].map((service, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold text-gray-800 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full ml-2"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                درخواست مشاوره
              </button>
            </div>
          ))}
        </div>

        {/* بخش تماس */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            نیاز به مشاوره دارید؟
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            تیم متخصص ما آماده پاسخگویی به سوالات شما و ارائه بهترین راه‌حل برای نیازهای شما می‌باشد.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center justify-center gap-3 text-gray-700">
              <Phone className="w-5 h-5 text-blue-600" />
              <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-gray-700">
              <Mail className="w-5 h-5 text-blue-600" />
              <span>info@novinplexi.com</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-gray-700">
              <MapPin className="w-5 h-5 text-blue-600" />
              <span>تهران، خیابان ولیعصر</span>
            </div>
          </div>
          
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            تماس با ما
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
