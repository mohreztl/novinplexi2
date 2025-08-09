"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import ClientOnly from "@/components/ClientOnly";
import ProductsLoading from "@/components/ProductsLoading";
import { ShoppingCart, ArrowLeft, Star, Heart, Check, Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import useCartStore from "@/store/cartStore";
import { formatPrice } from "@/utils/formatPrice";
import Link from "next/link";

function ProductDetailsContent() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState({
    size: '',
    color: '',
    thickness: ''
  });
  const [quantity, setQuantity] = useState(1);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [availableStock, setAvailableStock] = useState(0);
  const { slug } = useParams();
  const { data: session } = useSession();
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/product/${slug}`);
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("خطا در دریافت اطلاعات محصول");
      router.push("/products");
    } finally {
      setLoading(false);
    }
  }, [slug, router]);

  useEffect(() => {
    if (slug) {
      fetchProduct();
    }
  }, [slug, fetchProduct]);

  // محاسبه قیمت بر اساس متغیرهای انتخاب شده
  useEffect(() => {
    if (product) {
      let price = product.basePrice;
      let stock = product.stock || 0;

      // اگر محصول variants دارد و متغیری انتخاب شده
      if (product.variants && product.variants.length > 0) {
        const matchingVariant = product.variants.find(variant => 
          (!selectedVariant.size || variant.size === selectedVariant.size) &&
          (!selectedVariant.color || variant.color === selectedVariant.color) &&
          (!selectedVariant.thickness || variant.thickness === selectedVariant.thickness)
        );

        if (matchingVariant) {
          price = matchingVariant.price;
          stock = matchingVariant.stock;
        }
      }

      setCurrentPrice(price);
      setAvailableStock(stock);
    }
  }, [product, selectedVariant]);

  const handleVariantChange = (type, value) => {
    setSelectedVariant(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handleQuantityChange = (change) => {
    setQuantity(prev => {
      const newQuantity = prev + change;
      if (newQuantity < 1) return 1;
      if (newQuantity > availableStock) return availableStock;
      return newQuantity;
    });
  };

  const isVariantComplete = () => {
    if (!product?.variants || product.variants.length === 0) return true;
    
    const requiredFields = [];
    if (product.sizes && product.sizes.length > 0) requiredFields.push('size');
    if (product.colors && product.colors.length > 0) requiredFields.push('color');
    if (product.thicknesses && product.thicknesses.length > 0) requiredFields.push('thickness');
    
    return requiredFields.every(field => selectedVariant[field]);
  };

  const handleAddToCart = () => {
    if (!session) {
      toast.error("برای افزودن به سبد خرید باید وارد شوید");
      router.push("/login");
      return;
    }

    if (!product) return;

    if (!isVariantComplete()) {
      toast.error("لطفاً تمام گزینه‌های محصول را انتخاب کنید");
      return;
    }

    if (availableStock < quantity) {
      toast.error("موجودی کافی نیست");
      return;
    }

    addItem({
      id: product._id,
      title: product.title,
      basePrice: currentPrice,
      image: product.images?.[0] || '/placeholder.jpg',
      slug: product.slug,
      quantity: quantity,
      selectedVariant: selectedVariant
    });

    toast.success(`${quantity} عدد از محصول به سبد خرید اضافه شد`);
  };

  if (loading) {
    return <ProductsLoading />;
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">محصول یافت نشد</h2>
          <Link href="/products">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 ml-2" />
              بازگشت به محصولات
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-blue-600">خانه</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-blue-600">محصولات</Link>
          <span>/</span>
          <span className="text-gray-900">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-white rounded-lg overflow-hidden">
              <OptimizedImage
                src={product.images?.[selectedImageIndex] || '/placeholder.jpg'}
                alt={product.title}
                fill
                className="object-cover"
              />
            </div>
            
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative w-20 h-20 bg-white rounded-lg overflow-hidden flex-shrink-0 border-2 ${
                      selectedImageIndex === index ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <OptimizedImage
                      src={image}
                      alt={`${product.title} - تصویر ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
              {product.description && (
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              )}
            </div>

            {/* Product Variants Selection */}
            {(product.colors?.length > 0 || product.sizes?.length > 0 || product.thicknesses?.length > 0) && (
              <div className="bg-white p-6 rounded-lg space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">انتخاب گزینه‌ها</h3>
                
                {/* Size Selection */}
                {product.sizes && product.sizes.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      اندازه: {selectedVariant.size && <span className="text-blue-600">({selectedVariant.size})</span>}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => handleVariantChange('size', size)}
                          className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                            selectedVariant.size === size
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Color Selection */}
                {product.colors && product.colors.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      رنگ: {selectedVariant.color && <span className="text-blue-600">({selectedVariant.color})</span>}
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {product.colors.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => handleVariantChange('color', color.name)}
                          className={`w-10 h-10 rounded-full border-2 transition-all ${
                            selectedVariant.color === color.name
                              ? 'border-blue-500 scale-110'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                          style={{ backgroundColor: color.code }}
                          title={color.name}
                        >
                          {selectedVariant.color === color.name && (
                            <Check className="w-5 h-5 text-white mx-auto" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Thickness Selection */}
                {product.thicknesses && product.thicknesses.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ضخامت: {selectedVariant.thickness && <span className="text-blue-600">({selectedVariant.thickness})</span>}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.thicknesses.map((thickness) => (
                        <button
                          key={thickness}
                          onClick={() => handleVariantChange('thickness', thickness)}
                          className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                            selectedVariant.thickness === thickness
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          {thickness}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Price */}
            <div className="bg-white p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-2xl font-bold text-blue-600">
                    {formatPrice(currentPrice || product.basePrice)} تومان
                  </span>
                  {product.discount > 0 && (
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-lg line-through text-gray-400">
                        {formatPrice(product.basePrice)} تومان
                      </span>
                      <Badge className="bg-red-100 text-red-700">
                        {product.discount}% تخفیف
                      </Badge>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-gray-600">4.5</span>
                </div>
              </div>

              {/* Stock Status */}
              <div className="mb-4">
                {availableStock > 0 ? (
                  <p className="text-green-600 text-sm">✓ {availableStock} عدد موجود در انبار</p>
                ) : (
                  <p className="text-red-600 text-sm">✗ ناموجود</p>
                )}
              </div>

              {/* Quantity Selection */}
              {availableStock > 0 && (
                <div className="flex items-center gap-4 mb-4">
                  <label className="text-sm font-medium text-gray-700">تعداد:</label>
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 border-x">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= availableStock}
                      className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <Button 
                  onClick={handleAddToCart}
                  className="w-full flex items-center justify-center gap-2"
                  size="lg"
                  disabled={availableStock === 0 || !isVariantComplete()}
                >
                  <ShoppingCart className="w-5 h-5" />
                  افزودن به سبد خرید
                </Button>
                
                <Button variant="outline" size="lg" className="w-full">
                  <Heart className="w-5 h-5 ml-2" />
                  افزودن به علاقه‌مندی‌ها
                </Button>
              </div>
            </div>

            {/* Product Features */}
            {product.features && product.features.length > 0 && (
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">ویژگی‌های محصول</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Product Details */}
        {product.content && (
          <div className="mt-12 bg-white p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">توضیحات کامل محصول</h2>
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: product.content }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProductDetailsPage() {
  return (
    <ClientOnly fallback={<ProductsLoading />}>
      <ProductDetailsContent />
    </ClientOnly>
  );
}
