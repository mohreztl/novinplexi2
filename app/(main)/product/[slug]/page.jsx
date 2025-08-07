"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  ChevronLeft, 
  ChevronRight,
  Star,
  StarHalf,
  Plus,
  Minus,
  Package,
  Truck,
  Shield,
  Clock,
  CheckCircle,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import useCartStore from "@/store/cartStore";
import { formatPrice } from "@/utils/formatPrice";
import LoadingErrorComponent from "@/components/Loader/LoadingErrorComponent";

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Product customization states
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedThickness, setSelectedThickness] = useState("");
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/product/${slug}`);
        const productData = res.data;
        setProduct(productData);
        
        // Set default selections
        if (productData.colors?.length > 0) {
          setSelectedColor(productData.colors[0].code);
        }
        if (productData.sizes?.length > 0) {
          setSelectedSize(productData.sizes[0]);
        }
        if (productData.thicknesses?.length > 0) {
          setSelectedThickness(productData.thicknesses[0]);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  // Update selected variant when color, size or thickness changes
  useEffect(() => {
    if (product && selectedColor && selectedSize && selectedThickness) {
      const variant = product.variants?.find(
        v => v.color === selectedColor && v.size === selectedSize && v.thickness === selectedThickness
      );
      setSelectedVariant(variant);
    }
  }, [selectedColor, selectedSize, selectedThickness, product]);

  const getCurrentPrice = () => {
    if (selectedVariant) {
      return selectedVariant.price;
    }
    return product?.basePrice || 0;
  };

  const getDiscountedPrice = () => {
    const currentPrice = getCurrentPrice();
    if (product?.discount && product.discount > 0) {
      return currentPrice - (currentPrice * product.discount / 100);
    }
    return currentPrice;
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    if (product.colors?.length > 0 && !selectedColor) {
      toast.error("لطفا رنگ مورد نظر را انتخاب کنید");
      return;
    }
    
    if (product.sizes?.length > 0 && !selectedSize) {
      toast.error("لطفا سایز مورد نظر را انتخاب کنید");
      return;
    }

    if (product.thicknesses?.length > 0 && !selectedThickness) {
      toast.error("لطفا ضخامت مورد نظر را انتخاب کنید");
      return;
    }

    const cartItem = {
      _id: product._id,
      name: product.title,
      price: getDiscountedPrice(),
      image: product.images?.[0] || "/placeholder.webp",
      quantity: quantity,
      selectedColor: selectedColor,
      selectedSize: selectedSize,
      selectedThickness: selectedThickness,
      variant: selectedVariant
    };

    addItem(cartItem);
    toast.success(`${quantity} عدد از محصول به سبد خرید اضافه شد`);
  };

  const nextImage = () => {
    if (product?.images?.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (product?.images?.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    }
  };

  const renderRating = (rating = 4.5) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }
    
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }
    
    return stars;
  };

  if (loading || error) {
    return <LoadingErrorComponent loading={loading} error={error} />;
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">محصول یافت نشد</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Image Gallery Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-lg group">
              <Image
                src={product.images?.[currentImageIndex] || "/placeholder.webp"}
                alt={product.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                priority
              />
              
              {/* Navigation Arrows */}
              {product.images?.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-200 opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-200 opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-700" />
                  </button>
                </>
              )}
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNewProduct && (
                  <Badge className="bg-green-500 text-white px-3 py-1 rounded-full">
                    جدید
                  </Badge>
                )}
                {product.discount > 0 && (
                  <Badge className="bg-red-500 text-white px-3 py-1 rounded-full">
                    {product.discount}% تخفیف
                  </Badge>
                )}
              </div>
              
              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${
                    isLiked 
                      ? 'bg-red-500 text-white' 
                      : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                </button>
                <button className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-200">
                  <Share2 className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>
            
            {/* Thumbnail Images */}
            {product.images?.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      currentImageIndex === index 
                        ? 'border-primary-500 shadow-md' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Product Title and Rating */}
            <div className="space-y-3">
              <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                {product.title}
              </h1>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {renderRating(4.5)}
                </div>
                <span className="text-sm text-gray-500">(127 نظر)</span>
                <span className="text-sm text-gray-500">|</span>
                <span className="text-sm text-gray-500">کد محصول: {product._id?.slice(-6)}</span>
              </div>
            </div>

            {/* Price Section */}
            <Card className="border border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    {product.discount > 0 ? (
                      <>
                        <div className="flex items-center gap-3">
                          <span className="text-3xl font-bold text-green-600">
                            {formatPrice(getDiscountedPrice())}
                          </span>
                          <Badge className="bg-red-100 text-red-700 px-2 py-1 rounded-md">
                            {product.discount}% تخفیف
                          </Badge>
                        </div>
                        <div className="text-lg text-gray-500 line-through">
                          {formatPrice(getCurrentPrice())}
                        </div>
                      </>
                    ) : (
                      <span className="text-3xl font-bold text-green-600">
                        {formatPrice(getCurrentPrice())}
                      </span>
                    )}
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">
                        {selectedVariant ? 
                          `موجود: ${selectedVariant.stock} عدد` : 
                          `موجود: ${product.stock || 0} عدد`
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Color Selection */}
            {product.colors?.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">رنگ:</h3>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.code}
                      onClick={() => setSelectedColor(color.code)}
                      className={`relative w-12 h-12 rounded-full border-4 transition-all duration-200 ${
                        selectedColor === color.code
                          ? 'border-primary-500 shadow-lg scale-110'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      style={{ backgroundColor: color.code }}
                      title={color.name}
                    >
                      {selectedColor === color.code && (
                        <CheckCircle className="absolute -top-1 -right-1 w-5 h-5 text-primary-500 bg-white rounded-full" />
                      )}
                    </button>
                  ))}
                </div>
                {selectedColor && (
                  <p className="text-sm text-gray-600">
                    رنگ انتخاب شده: {product.colors.find(c => c.code === selectedColor)?.name}
                  </p>
                )}
              </div>
            )}

            {/* Size Selection */}
            {product.sizes?.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">سایز:</h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg border-2 font-medium transition-all duration-200 ${
                        selectedSize === size
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-300 hover:border-gray-400 bg-white text-gray-700'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Thickness Selection */}
            {product.thicknesses?.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">ضخامت:</h3>
                <div className="flex flex-wrap gap-3">
                  {product.thicknesses.map((thickness) => (
                    <button
                      key={thickness}
                      onClick={() => setSelectedThickness(thickness)}
                      className={`px-4 py-2 rounded-lg border-2 font-medium transition-all duration-200 ${
                        selectedThickness === thickness
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-300 hover:border-gray-400 bg-white text-gray-700'
                      }`}
                    >
                      {thickness}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <h3 className="text-lg font-semibold text-gray-900">تعداد:</h3>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300 min-w-[60px] text-center font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white py-4 text-lg font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                size="lg"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                افزودن به سبد خرید
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Truck className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-700">ارسال رایگان</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-700">گارانتی اصالت</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Clock className="w-5 h-5 text-orange-600" />
                <span className="text-sm text-gray-700">ارسال فوری</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Package className="w-5 h-5 text-purple-600" />
                <span className="text-sm text-gray-700">بسته‌بندی ویژه</span>
              </div>
            </div>

            {/* Product Description */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  توضیحات محصول
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </CardContent>
            </Card>

            {/* Specifications */}
            {product.specifications?.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">مشخصات فنی</h3>
                  <div className="space-y-3">
                    {product.specifications.map((spec, index) => (
                      <div key={index} className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
                        <span className="text-gray-600">{spec.key}</span>
                        <span className="font-medium text-gray-900">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
