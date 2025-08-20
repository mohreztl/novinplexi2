"use client";
import React from 'react';
import CategoryHeader from '@/components/CategoryHeader';
import { useCategories } from '@/hooks/useCategories';
import Link from 'next/link';
import Image from 'next/image';
import { Loader2, Settings, Phone, Mail } from 'lucide-react';

const ServicesMainPage = () => {
  const { categories, loading } = useCategories('service', true);

  if (loading) {
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
      {/* هدر اصلی خدمات */}
      <CategoryHeader type="service" />
      
      {/* لیست دسته‌بندی‌های خدمات */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            انواع خدمات ما
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            خدمات تخصصی طراحی، ساخت و نصب انواع محصولات پلکسی گلاس
          </p>
        </div>

        {categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link 
                key={category._id} 
                href={`/services/${category.slug}`}
                className="group"
              >
                <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 group-hover:border-purple-200">
                  {/* تصویر دسته‌بندی */}
                  <div className="relative h-48 bg-gradient-to-br from-purple-50 to-indigo-100">
                    {category.image ? (
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Settings className="w-16 h-16 text-purple-300" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  
                  {/* محتوای کارت */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">
                      {category.name}
                    </h3>
                    
                    {category.description && (
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                        {category.description}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-purple-600 font-medium group-hover:underline">
                        جزئیات خدمات
                      </span>
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Settings className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              هنوز خدماتی ثبت نشده است
            </h3>
            <p className="text-gray-500">
              به زودی خدمات جدید اضافه خواهند شد
            </p>
          </div>
        )}

        {/* بخش ویژگی‌های خدمات */}
        <div className="mt-20 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              چرا خدمات ما را انتخاب کنید؟
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              ما با سال‌ها تجربه و تیمی از متخصصان، بهترین کیفیت خدمات را ارائه می‌دهیم
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">ضمانت کیفیت</h3>
              <p className="text-gray-600 text-sm">ضمانت کتبی برای تمام خدمات</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">انجام سریع</h3>
              <p className="text-gray-600 text-sm">اتمام پروژه در کمترین زمان</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">مشاوره رایگان</h3>
              <p className="text-gray-600 text-sm">ارائه مشاوره تخصصی رایگان</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">پشتیبانی مداوم</h3>
              <p className="text-gray-600 text-sm">پشتیبانی بعد از انجام کار</p>
            </div>
          </div>
        </div>

        {/* بخش تماس */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              آماده شروع پروژه شما هستیم
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              برای دریافت مشاوره رایگان و قیمت‌گذاری پروژه خود، همین امروز با ما تماس بگیرید
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-gray-700">
                <Phone className="w-5 h-5 text-purple-600" />
                <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Mail className="w-5 h-5 text-purple-600" />
                <span>info@novinplexi.com</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors">
                درخواست مشاوره رایگان
              </button>
              <button className="border border-purple-600 text-purple-600 px-8 py-3 rounded-lg hover:bg-purple-50 transition-colors">
                مشاهده نمونه کارها
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesMainPage;
