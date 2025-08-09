'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, ShoppingCart, Star, Heart, ArrowLeft, Loader2 } from 'lucide-react';
import { formatPrice } from '@/utils/formatPrice';
import useCartStore from '@/store/cartStore';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';

const LatestProducts = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const addItem = useCartStore((state) => state.addItem);
  const { data: session } = useSession();

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          axios.get('/api/products?limit=8&sort=createdAt&order=desc'),
          axios.get('/api/categories')
        ]);

        if (productsRes.status === 200) {
          setProducts(productsRes.data.products || []);
        }

        if (categoriesRes.status === 200) {
          const dbCategories = categoriesRes.data.categories || [];
          const allCategories = [
            { _id: 'all', name: 'همه محصولات', icon: '🎯' },
            ...dbCategories.map(cat => ({
              ...cat,
              icon: getCategoryIcon(cat.name)
            }))
          ];
          setCategories(allCategories);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter products by category
  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === activeCategory));
    }
  }, [activeCategory, products]);

  // Get icon for category
  const getCategoryIcon = (categoryName) => {
    const icons = {
      'پلکسی گلاس': '🪟',
      'ام دی اف': '🪵',
      'چوب': '🌳',
      'فلز': '⚙️',
      'پلاستیک': '🧪',
      'شیشه': '🪟',
      'default': '📦'
    };
    return icons[categoryName] || icons.default;
  };

  const handleQuickAdd = (product) => {
    if (!session) {
      toast.error("برای افزودن به سبد خرید باید وارد شوید");
      return;
    }

    addItem({
      id: product._id,
      title: product.title,
      basePrice: product.basePrice,
      image: product.images?.[0] || '/placeholder.jpg',
      slug: product.slug,
      quantity: 1
    });

    toast.success("محصول به سبد خرید اضافه شد");
  };

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              جدیدترین محصولات
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <span className="mr-2 text-gray-600">در حال بارگذاری محصولات...</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            جدیدترین محصولات
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            با کیفیت‌ترین محصولات پلکسی گلاس و متریال‌های ساختمانی را از ما بخواهید
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() => setActiveCategory(category._id)}
              className={`
                px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105
                ${activeCategory === category._id 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:text-blue-600'
                }
              `}
            >
              <span className="ml-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {filteredProducts.map((product) => (
                <Card key={product._id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white border-0 shadow-md overflow-hidden">
                  <div className="relative">
                    {/* Product Image */}
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={product.images?.[0] || '/placeholder.jpg'}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {product.isNewProduct && (
                          <Badge className="bg-green-500 text-white px-2 py-1 text-xs">
                            جدید
                          </Badge>
                        )}
                        {product.discount > 0 && (
                          <Badge className="bg-red-500 text-white px-2 py-1 text-xs">
                            {product.discount}% تخفیف
                          </Badge>
                        )}
                      </div>

                      {/* Quick Actions */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors">
                          <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
                        </button>
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                    </div>

                    <CardContent className="p-4">
                      {/* Product Info */}
                      <div className="mb-4">
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {product.title}
                        </h3>
                        
                        <div className="flex items-center gap-1 mb-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">(۴.۵)</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-blue-600">
                            {formatPrice(product.basePrice)} تومان
                          </span>
                          {product.discount > 0 && (
                            <span className="text-sm line-through text-gray-400">
                              {formatPrice(product.basePrice * (1 + product.discount / 100))} تومان
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Link href={`/products/${product.slug}`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full group-hover:border-blue-500 group-hover:text-blue-600">
                            <Eye className="w-4 h-4 ml-2" />
                            مشاهده
                          </Button>
                        </Link>
                        <Button 
                          size="sm" 
                          onClick={() => handleQuickAdd(product)}
                          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                        >
                          <ShoppingCart className="w-4 h-4 ml-2" />
                          خرید
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center">
              <Link href="/products">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-full transform hover:scale-105 transition-all duration-300"
                >
                  مشاهده همه محصولات
                  <ArrowLeft className="w-5 h-5 mr-2" />
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">محصولی در این دسته‌بندی یافت نشد</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestProducts;
