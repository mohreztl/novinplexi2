"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import CategoryHeader from '@/components/CategoryHeader';
import { useCategory } from '@/hooks/useCategories';
import { Loader2 } from 'lucide-react';

const ProductsPage = () => {
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
      <CategoryHeader category={category} type="product" />
      
      {/* محتوای محصولات */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-gray-600">
            اینجا لیست محصولات {category?.name || 'همه محصولات'} نمایش داده خواهد شد.
          </p>
          
          {/* این قسمت را با کامپوننت‌های محصولات خود جایگزین کنید */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* نمونه کارت محصول */}
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-md p-4 border">
                <div className="w-full h-48 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
                  <span className="text-gray-400">تصویر محصول</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">نام محصول {item}</h3>
                <p className="text-gray-600 text-sm mb-3">توضیحات کوتاه محصول...</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-blue-600">۱۲۳,۰۰۰ تومان</span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                    مشاهده
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
