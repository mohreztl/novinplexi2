'use client';

import React from 'react';

const SimpleProductCategories = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">دسته‌بندی محصولات</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">ورق‌های شفاف</h3>
            <p>ورق‌های اکریلیک شفاف با کیفیت عالی</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">ورق‌های رنگی</h3>
            <p>انواع رنگ‌های زیبا و متنوع</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">ورق‌های متالیک</h3>
            <p>فینیش متالیک لوکس</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimpleProductCategories;
