"use client";
import React from 'react';
import CategoryHeader from '@/components/CategoryHeader';
import { useCategories } from '@/hooks/useCategories';
import Link from 'next/link';
import Image from 'next/image';
import { Loader2, Package } from 'lucide-react';

const ProductsMainPage = () => {
  const { categories, loading } = useCategories('product', true);

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
      {/* هدر اصلی محصولات */}
      <CategoryHeader type="product" />
      
      {/* لیست دسته‌بندی‌های محصولات */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            دسته‌بندی محصولات
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            انواع مختلف محصولات پلکسی گلاس را از دسته‌بندی‌های زیر انتخاب کنید
          </p>
        </div>

        {categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link 
                key={category._id} 
                href={`/products/${category.slug}`}
                className="group"
              >
                <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 group-hover:border-blue-200">
                  {/* تصویر دسته‌بندی */}
                  <div className="relative h-48 bg-gradient-to-br from-blue-50 to-indigo-100">
                    {category.image ? (
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Package className="w-16 h-16 text-blue-300" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  
                  {/* محتوای کارت */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    
                    {category.description && (
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                        {category.description}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-blue-600 font-medium group-hover:underline">
                        مشاهده محصولات
                      </span>
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              هنوز دسته‌بندی محصولی ثبت نشده است
            </h3>
            <p className="text-gray-500">
              به زودی محصولات جدید اضافه خواهند شد
            </p>
          </div>
        )}
        
        {/* بخش ویژگی‌ها */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">کیفیت تضمینی</h3>
            <p className="text-gray-600 text-sm">تمام محصولات با بالاترین کیفیت و ضمانت ارائه می‌شوند</p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">ارسال سریع</h3>
            <p className="text-gray-600 text-sm">ارسال فوری در تهران و سایر شهرها حداکثر ۴۸ ساعت</p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">پشتیبانی ۲۴/۷</h3>
            <p className="text-gray-600 text-sm">تیم پشتیبانی ما همیشه آماده کمک و راهنمایی شما هستند</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsMainPage;
