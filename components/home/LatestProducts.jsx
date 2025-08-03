"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Star, 
  Heart, 
  ShoppingCart,
  Package,
  TrendingUp,
  Sparkles
} from "lucide-react";

const LatestProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestProducts();
    fetchCategories();
  }, []);

  const fetchLatestProducts = async () => {
    try {
      const response = await axios.get('/api/products/allProducts', {
        params: { page: 1, limit: 8, sortBy: 'newest' }
      });
      setProducts(response.data.products || []);
    } catch (error) {
      console.error('Error fetching latest products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      setCategories(response.data.categories?.slice(0, 6) || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const formatPrice = (price) => {
    return parseInt(price || 0).toLocaleString();
  };

  if (loading) {
    return (
      <div className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 aspect-square rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        {/* هدر بخش */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-blue-600" />
            <h2 className="text-4xl font-bold text-gray-900">جدیدترین محصولات</h2>
            <Sparkles className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            آخرین محصولات با کیفیت و مدرن ما را کشف کنید
          </p>
        </motion.div>

        {/* دسته‌بندی‌ها */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            دسته‌بندی محصولات
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category._id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <Link href={`/products/category/${category.slug}`}>
                  <Card className="h-full bg-white hover:shadow-xl transition-all duration-300 border-0 shadow-lg group-hover:shadow-blue-200">
                    <CardContent className="p-6 text-center">
                      {category.icon ? (
                        <Image
                          src={category.icon}
                          alt={category.title}
                          width={48}
                          height={48}
                          className="w-12 h-12 mx-auto mb-3 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                          <Package className="w-6 h-6 text-white" />
                        </div>
                      )}
                      <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {category.title}
                      </h4>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* محصولات جدید */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Card className="h-full bg-white hover:shadow-2xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                  <div className="relative">
                    {/* تصویر محصول */}
                    <div className="aspect-square overflow-hidden">
                      <Image
                        src={product.images?.[0] || "/placeholder.webp"}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    
                    {/* بج محصول جدید */}
                    <Badge className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      جدید
                    </Badge>

                    {/* دکمه علاقه‌مندی */}
                    <button className="absolute top-3 left-3 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white">
                      <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
                    </button>

                    {/* overlay برای نمایش دکمه‌ها */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        افزودن به سبد
                      </Button>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <Link href={`/product/${product.slug}`}>
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>
                    
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-500 mr-2">(4.0)</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-lg font-bold text-blue-600">
                          {formatPrice(product.originalPrice)} تومان
                        </span>
                        {product.price && product.price !== product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            {formatPrice(product.price)} تومان
                          </span>
                        )}
                      </div>
                      
                      <Badge variant="outline" className="text-green-600 border-green-300">
                        موجود
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* دکمه مشاهده همه */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/products">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 shadow-lg hover:shadow-xl transition-all"
            >
              مشاهده همه محصولات
              <ArrowLeft className="w-5 h-5 mr-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestProducts;
