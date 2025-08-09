"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import ClientOnly from "@/components/ClientOnly";
import ProductsLoading from "@/components/ProductsLoading";
import { ShoppingCart, Eye } from "lucide-react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useCartStore from "@/store/cartStore";
import { formatPrice } from "@/utils/formatPrice";

function ProductsContent() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
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
      setProducts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("خطا در دریافت محصولات");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    if (!session) {
      toast.error("برای افزودن به سبد خرید باید وارد شوید");
      router.push("/login");
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
    return <ProductsLoading />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">محصولات</h1>
        
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">هیچ محصولی یافت نشد</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product._id} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="relative">
                    <Link href={`/products/${product.slug}`}>
                      <div className="relative h-48 overflow-hidden rounded-t-lg">
                        <OptimizedImage
                          src={product.images?.[0] || '/placeholder.jpg'}
                          alt={product.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                    </Link>
                  </div>
                  
                  <div className="p-4">
                    <Link href={`/products/${product.slug}`}>
                      <h3 className="font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors line-clamp-2">
                        {product.title}
                      </h3>
                    </Link>
                    
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold text-blue-600">
                        {formatPrice(product.basePrice)} تومان
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <Link href={`/products/${product.slug}`} className="flex-1">
                        <Button size="sm" variant="outline" className="w-full flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          مشاهده
                        </Button>
                      </Link>
                      
                      <Button
                        size="sm"
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 flex items-center gap-2"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        افزودن
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <ClientOnly fallback={<ProductsLoading />}>
      <ProductsContent />
    </ClientOnly>
  );
}
