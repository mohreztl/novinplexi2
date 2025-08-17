"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart, Eye, ArrowLeft, Package } from 'lucide-react';

const PlexiAccessories = () => {
  const [accessories, setAccessories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        setLoading(true);
        // ابتدا دسته‌بندی اکسسوری پلکسی را پیدا کنیم
        const categoryResponse = await axios.get('/api/categories?flat=true&type=product');
        const categories = categoryResponse.data.categories || [];
        
        const accessoryCategory = categories.find(cat => 
          cat.slug === 'plexi-accessories' ||
          cat.slug.includes('accessory') || 
          cat.slug.includes('اکسسوری') ||
          cat.name.includes('اکسسوری') ||
          cat.name.includes('لوازم') ||
          cat.name.includes('اکسسوری‌های') ||
          cat.slug.includes('accessories')
        );

        if (accessoryCategory) {
          // محصولات این دسته‌بندی را دریافت کنیم
          const productsResponse = await axios.get(`/api/categories/${accessoryCategory.slug}`);
          const products = productsResponse.data.products || [];
          
          // فقط محصولات منتشر شده و موجود را نمایش دهیم
          const publishedProducts = products
            .filter(product => product.isPublished !== false)
            .slice(0, 8);
          
          setAccessories(publishedProducts);
        } else {
          // اگر دسته‌بندی وجود نداشت، سعی کنیم آن را ایجاد کنیم
          try {
            await axios.post('/api/categories/setup');
            console.log('Default accessory category created');
          } catch (setupError) {
            console.log('Setup category error (might already exist):', setupError.response?.data?.message);
          }
        }
      } catch (error) {
        console.error('Error fetching accessories:', error);
        setAccessories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAccessories();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              اکسسوری‌های پلکسی
            </h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md animate-pulse">
                <div className="h-48 bg-gray-300 rounded-t-xl"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!accessories.length) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              اکسسوری‌های پلکسی
            </h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">
              مجموعه‌ای از بهترین اکسسوری‌های پلکسی گلاس
            </p>
          </div>
          
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">محصولات اکسسوری به زودی اضافه خواهند شد</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* هدر بخش */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            اکسسوری‌های پلکسی
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            مجموعه‌ای از بهترین اکسسوری‌های پلکسی گلاس با کیفیت بالا و طراحی مدرن
          </p>
        </div>

        {/* گرید محصولات */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {accessories.map((accessory) => (
            <div
              key={accessory._id}
              className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              {/* تصویر محصول */}
              <div className="relative h-48 bg-gray-100 overflow-hidden">
                {accessory.images && accessory.images[0] ? (
                  <Image
                    src={accessory.images[0]}
                    alt={accessory.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Package className="w-12 h-12 text-gray-300" />
                  </div>
                )}
                
                {/* اورلی برای دکمه‌های عمل */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                    <Link
                      href={`/products/${accessory.slug || accessory._id}`}
                      className="bg-white text-gray-800 p-2 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <button className="bg-white text-gray-800 p-2 rounded-full hover:bg-green-600 hover:text-white transition-colors">
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* بج تخفیف (اگر وجود داشت) */}
                {accessory.discountPrice && accessory.basePrice > accessory.discountPrice && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {Math.round(((accessory.basePrice - accessory.discountPrice) / accessory.basePrice) * 100)}% تخفیف
                  </div>
                )}

                {/* بج محبوب */}
                {accessory.featured && (
                  <div className="absolute top-3 left-3 bg-yellow-500 text-white p-1 rounded-full">
                    <Star className="w-3 h-3" />
                  </div>
                )}
              </div>

              {/* اطلاعات محصول */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {accessory.title}
                </h3>
                
                {accessory.description && (
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {accessory.description}
                  </p>
                )}

                {/* قیمت */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    {accessory.discountPrice && accessory.basePrice > accessory.discountPrice ? (
                      <>
                        <span className="text-lg font-bold text-red-600">
                          {accessory.discountPrice.toLocaleString('fa-IR')} تومان
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          {accessory.basePrice.toLocaleString('fa-IR')}
                        </span>
                      </>
                    ) : (
                      <span className="text-lg font-bold text-blue-600">
                        {(accessory.basePrice || 0).toLocaleString('fa-IR')} تومان
                      </span>
                    )}
                  </div>

                  {/* وضعیت موجودی */}
                  <div className="text-xs">
                    {accessory.stock > 0 ? (
                      <span className="text-green-600 bg-green-100 px-2 py-1 rounded-full">
                        موجود
                      </span>
                    ) : (
                      <span className="text-red-600 bg-red-100 px-2 py-1 rounded-full">
                        ناموجود
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* دکمه مشاهده همه */}
        <div className="text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors group"
          >
            <span>مشاهده همه محصولات</span>
            <ArrowLeft className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PlexiAccessories;
