"use client";

import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  ShoppingCart, 
  Eye, 
  Star, 
  Search, 
  SlidersHorizontal,
  Grid,
  List,
  X
} from "lucide-react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useCartStore from "@/store/cartStore";
import { formatPrice } from "@/utils/formatPrice";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const { data: session } = useSession();
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // فیلتر و مرتب‌سازی محصولات
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // فیلتر جستجو
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // فیلتر دسته‌بندی
    if (selectedCategory) {
      filtered = filtered.filter(product =>
        product.categories === selectedCategory
      );
    }

    // فیلتر قیمت
    if (priceRange.min || priceRange.max) {
      filtered = filtered.filter(product => {
        const price = parseInt(product.price) || 0;
        const min = priceRange.min ? parseInt(priceRange.min) : 0;
        const max = priceRange.max ? parseInt(priceRange.max) : Infinity;
        return price >= min && price <= max;
      });
    }

    // مرتب‌سازی
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => (parseInt(a.price) || 0) - (parseInt(b.price) || 0));
        break;
      case "price-high":
        filtered.sort((a, b) => (parseInt(b.price) || 0) - (parseInt(a.price) || 0));
        break;
      case "name":
        filtered.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
        break;
      case "newest":
      default:
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }

    return filtered;
  }, [products, searchTerm, selectedCategory, priceRange, sortBy]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setPriceRange({ min: "", max: "" });
    setSortBy("newest");
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("خطا در بارگذاری محصولات");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    if (!session) {
      toast.error("برای افزودن به سبد خرید ابتدا وارد شوید");
      router.push("/login");
      return;
    }

    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || "/placeholder.webp",
      quantity: 1
    });
    
    toast.success("محصول به سبد خرید اضافه شد");
  };

  const calculateDiscount = (original, current) => {
    if (original && current && original > current) {
      return Math.round(((original - current) / original) * 100);
    }
    return 0;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="bg-gray-200 aspect-square rounded-lg"></div>
                <div className="bg-gray-200 h-4 rounded"></div>
                <div className="bg-gray-200 h-4 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">فروشگاه محصولات</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            بهترین محصولات را با کیفیت عالی و قیمت مناسب از ما بخرید
          </p>
        </div>

        {/* Search and Filters Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="جستجو در محصولات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="همه دسته‌ها" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">همه دسته‌ها</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Price Range */}
            <div className="flex gap-2 items-center">
              <Input
                placeholder="حداقل قیمت"
                type="number"
                value={priceRange.min}
                onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                className="w-32"
              />
              <span className="text-gray-400">تا</span>
              <Input
                placeholder="حداکثر قیمت"
                type="number"
                value={priceRange.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                className="w-32"
              />
            </div>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="مرتب‌سازی" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">جدیدترین</SelectItem>
                <SelectItem value="price-low">ارزان‌ترین</SelectItem>
                <SelectItem value="price-high">گران‌ترین</SelectItem>
                <SelectItem value="name">نام محصول</SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode */}
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>

            {/* Clear Filters */}
            {(searchTerm || selectedCategory || priceRange.min || priceRange.max) && (
              <Button variant="outline" onClick={clearFilters} className="flex items-center gap-2">
                <X className="w-4 h-4" />
                پاک کردن فیلترها
              </Button>
            )}
          </div>

          {/* Active Filters Display */}
          <div className="flex gap-2 mt-4 flex-wrap">
            {searchTerm && (
              <Badge variant="secondary" className="flex items-center gap-2">
                جستجو: {searchTerm}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchTerm("")} />
              </Badge>
            )}
            {selectedCategory && (
              <Badge variant="secondary" className="flex items-center gap-2">
                دسته: {categories.find(c => c._id === selectedCategory)?.title}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory("")} />
              </Badge>
            )}
            {priceRange.min && (
              <Badge variant="secondary" className="flex items-center gap-2">
                حداقل: {formatPrice(parseInt(priceRange.min))}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setPriceRange(prev => ({ ...prev, min: "" }))} />
              </Badge>
            )}
            {priceRange.max && (
              <Badge variant="secondary" className="flex items-center gap-2">
                حداکثر: {formatPrice(parseInt(priceRange.max))}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setPriceRange(prev => ({ ...prev, max: "" }))} />
              </Badge>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">
            {filteredAndSortedProducts.length} محصول یافت شد
          </p>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4" />
            فیلترها
          </Button>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="aspect-square bg-gray-200 rounded-t-lg"></div>
                <CardContent className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredAndSortedProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-32 h-32 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="w-16 h-16 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">محصولی یافت نشد</h3>
            <p className="text-gray-600 mb-4">فیلترهای خود را تغییر دهید یا جستجو کنید</p>
            <Button onClick={clearFilters}>پاک کردن فیلترها</Button>
          </div>
        ) : (
          /* Products Grid */
          <div className={
            viewMode === "grid" 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          }>
            {filteredAndSortedProducts.map((product) => (
              viewMode === "grid" ? (
                <Card key={product._id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 bg-white">
                  {/* Product Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <Link href={`/product/${product.slug || product._id}`}>
                      <Image
                        src={product.images?.[0] || "/placeholder.webp"}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                    
                    {/* Discount Badge */}
                    {calculateDiscount(product.originalPrice, product.price) > 0 && (
                      <Badge className="absolute top-4 right-4 bg-red-500 text-white">
                        {calculateDiscount(product.originalPrice, product.price)}% تخفیف
                      </Badge>
                    )}

                    {/* Stock Status */}
                    {product.stock === 0 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge variant="destructive" className="text-lg">ناموجود</Badge>
                      </div>
                    )}

                    {/* Quick Actions */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="icon" variant="secondary" className="w-8 h-8">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* Product Title */}
                      <Link href={`/product/${product.slug || product._id}`}>
                        <h3 className="font-semibold text-gray-900 hover:text-primary-600 transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                      </Link>

                      {/* Rating */}
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="text-sm text-gray-500 mr-2">(4.5)</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          {calculateDiscount(product.originalPrice, product.price) > 0 ? (
                            <>
                              <div className="font-bold text-green-600">
                                {formatPrice(product.price)}
                              </div>
                              <div className="text-sm text-gray-500 line-through">
                                {formatPrice(product.originalPrice)}
                              </div>
                            </>
                          ) : (
                            <div className="font-bold text-gray-900">
                              {formatPrice(product.price)}
                            </div>
                          )}
                        </div>

                        <Button
                          size="sm"
                          onClick={() => handleAddToCart(product)}
                          disabled={product.stock === 0}
                          className="flex items-center gap-2"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          افزودن
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                /* List View */
                <Card key={product._id} className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                        <Link href={`/product/${product.slug || product._id}`}>
                          <Image
                            src={product.images?.[0] || "/placeholder.webp"}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </Link>
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between items-start">
                          <Link href={`/product/${product.slug || product._id}`}>
                            <h3 className="font-semibold text-gray-900 hover:text-primary-600 transition-colors">
                              {product.name}
                            </h3>
                          </Link>
                          
                          <div className="text-right">
                            {calculateDiscount(product.originalPrice, product.price) > 0 ? (
                              <>
                                <div className="font-bold text-green-600">
                                  {formatPrice(product.price)}
                                </div>
                                <div className="text-sm text-gray-500 line-through">
                                  {formatPrice(product.originalPrice)}
                                </div>
                              </>
                            ) : (
                              <div className="font-bold text-gray-900">
                                {formatPrice(product.price)}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {product.description}
                        </p>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                            <span className="text-sm text-gray-500 mr-2">(4.5)</span>
                          </div>
                          
                          <Button
                            size="sm"
                            onClick={() => handleAddToCart(product)}
                            disabled={product.stock === 0}
                            className="flex items-center gap-2"
                          >
                            <ShoppingCart className="w-4 h-4" />
                            افزودن به سبد
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
