"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Eye, Star } from "lucide-react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useCartStore from "@/store/cartStore";
import { formatPrice } from "@/utils/formatPrice";
import ProductPageFilter from "@/components/products/ProductPageFilter";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const { data: session } = useSession();
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    fetchProducts();
  }, []);

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

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

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
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">محصولات</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="lg:w-1/4">
          <ProductPageFilter 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            sortBy={sortBy}
            onSortChange={setSortBy}
            products={products}
          />
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4">
          {/* Results count */}
          <div className="mb-6">
            <p className="text-gray-600">
              {sortedProducts.length} محصول یافت شد
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProducts.map((product) => (
          <Card key={product._id} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
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

              {/* Hover Actions */}
              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex gap-2">
                  <Link href={`/product/${product.slug || product._id}`} className="flex-1">
                    <Button className="w-full bg-primary hover:bg-primary-700 text-white">
                      <Eye className="w-4 h-4 ml-2" />
                      مشاهده
                    </Button>
                  </Link>
                  <Button 
                    onClick={() => handleAddToCart(product)}
                    variant="secondary" 
                    size="icon"
                    className="bg-white/90 hover:bg-white text-primary"
                    disabled={product.stock === 0}
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <CardContent className="p-4">
              <Link href={`/product/${product.slug || product._id}`}>
                <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2 hover:text-primary transition-colors">
                  {product.name}
                </h3>
              </Link>
              
              {product.description && (
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>
              )}

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < (product.rating || 0) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="text-sm text-gray-500">
                  ({product.reviewCount || 0})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between">
                <div>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <p className="text-sm text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </p>
                  )}
                  <p className="text-xl font-bold text-primary">
                    {formatPrice(product.price)}
                  </p>
                </div>
                
                {product.stock > 0 && (
                  <div className="flex items-center gap-1 text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">موجود</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

          {/* Empty State */}
          {sortedProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📦</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">محصولی یافت نشد</h3>
              <p className="text-gray-500">
                {searchTerm ? `نتیجه‌ای برای "${searchTerm}" یافت نشد` : "محصولی برای نمایش وجود ندارد"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
