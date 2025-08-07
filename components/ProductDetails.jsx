// components/ProductDetails.js

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import useCartStore from "@/store/cartStore";
import { toast } from "sonner";
import Image from "next/image";
import { motion } from "framer-motion";

const ProductDetails = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    // هر وقت رنگ یا سایز تغییر کرد، واریانت مناسب رو پیدا می‌کنیم
    if (selectedSize && selectedColor) {
      const variant = product.variants?.find(
        v => v.size === selectedSize && v.color === selectedColor
      );
      setSelectedVariant(variant);
    }
  }, [selectedSize, selectedColor, product.variants]);

  const handleAddToCart = async () => {
    if (product.variants && product.variants.length > 0 && !selectedVariant) {
      toast.error("لطفاً رنگ و اندازه را انتخاب کنید");
      return;
    }
    
    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || "/placeholder.webp",
      variant: selectedVariant,
      quantity
    });
    
    toast.success("محصول به سبد خرید اضافه شد");
  };

  const increaseQuantity = () => {
    if (quantity < (product.stock || 10)) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // تابع فرمت قیمت با جداکننده هزارگان
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  const calculateDiscount = () => {
    if (product.originalPrice && product.price) {
      return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    }
    return 0;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* تصاویر محصول */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
            <Image
              src={product.images?.[0] || "/placeholder.webp"}
              alt={product.name}
              fill
              className="object-cover"
            />
            {calculateDiscount() > 0 && (
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                {calculateDiscount()}% تخفیف
              </div>
            )}
          </div>
          
          {/* تصاویر کوچک */}
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(1, 5).map((image, index) => (
                <div key={index} className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* اطلاعات محصول */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            <p className="text-gray-600">
              {product.description}
            </p>
          </div>

          {/* قیمت */}
          <div className="space-y-2">
            {product.originalPrice && product.originalPrice > product.price && (
              <p className="text-lg text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </p>
            )}
            <p className="text-3xl font-bold text-primary">
              {formatPrice(product.price)}
            </p>
          </div>

          {/* انتخاب رنگ */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">رنگ</h3>
                <div className="flex gap-2 flex-wrap">
                  {[...new Set(product.variants.map(v => v.color))].map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border rounded-lg ${
                        selectedColor === color
                          ? 'border-primary bg-primary text-white'
                          : 'border-gray-300 hover:border-primary'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* انتخاب سایز */}
              <div>
                <h3 className="font-semibold mb-2">اندازه</h3>
                <div className="flex gap-2 flex-wrap">
                  {[...new Set(product.variants.map(v => v.size))].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg ${
                        selectedSize === size
                          ? 'border-primary bg-primary text-white'
                          : 'border-gray-300 hover:border-primary'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* تعداد */}
          <div>
            <h3 className="font-semibold mb-2">تعداد</h3>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-12 text-center font-semibold">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={increaseQuantity}
                disabled={quantity >= (product.stock || 10)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* دکمه افزودن به سبد خرید */}
          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              onClick={handleAddToCart}
              className="flex-1 bg-primary hover:bg-primary-700 text-white py-3"
              disabled={product.stock === 0}
            >
              <ShoppingCart className="w-5 h-5 ml-2" />
              {product.stock === 0 ? 'ناموجود' : 'افزودن به سبد خرید'}
            </Button>
          </motion.div>

          {/* اطلاعات اضافی */}
          <div className="border-t pt-6 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">موجودی:</span>
              <span className={product.stock > 0 ? "text-green-600" : "text-red-600"}>
                {product.stock > 0 ? `${product.stock} عدد` : 'ناموجود'}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">دسته‌بندی:</span>
              <span>{product.category}</span>
            </div>
            {product.brand && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">برند:</span>
                <span>{product.brand}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
