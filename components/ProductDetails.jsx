// components/ProductDetails.js

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import useCartStore from "@/store/cartStore";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const ProductDetails = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    // هر وقت رنگ یا سایز تغییر کرد، واریانت مناسب رو پیدا می‌کنیم
    if (selectedSize && selectedColor) {
      const variant = product.variants.find(
        v => v.size === selectedSize && v.color === selectedColor
      );
      setSelectedVariant(variant);
    }
  }, [selectedSize, selectedColor, product.variants]);

  const handleAddToCart = async () => {
    if (!selectedVariant) {
      toast.error("لطفاً رنگ و اندازه را انتخاب کنید");
      return;
    }
    addItem({
      ...product,
      variant: selectedVariant,
      quantity
    });
    toast.success("محصول به سبد خرید اضافه شد");
  };

  const handleToggleWishlist = async () => {
    try {
      if (isWishlisted) {
        await axios.delete("/api/wishlist", {
          data: { productId: product._id },
        });
      } else {
        await axios.post("/api/wishlist", {
          data: { productId: product._id },
        });
      }
      setIsWishlisted(isWishlisted);
    } catch (error) {
      console.log(error);
    }
  };

  // Fallback image URL
  const fallbackImageUrl = "https://via.placeholder.com/400";

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 bg-white rounded-lg shadow-lg">
      <div className="md:w-1/2">
        <Image
          height={500}
          width={500}
          src={
            product.images && product.images.length > 0
              ? product.images[0]
              : fallbackImageUrl
          }
          alt={product.name || "Product Image"}
          className="w-full h-auto object-cover rounded-lg"
        />
      </div>
      <div className="md:w-1/2 space-y-4">
        <h1 className="text-3xl font-bold text-gray-800">
          {product.title}
        </h1>
        
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="bg-white rounded-lg p-6 shadow-sm"
        >
          {/* قیمت */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">قیمت:</h2>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-blue-600">
                {selectedVariant ? selectedVariant.price.toLocaleString() : product.basePrice.toLocaleString()}
              </span>
              <span className="text-gray-600">تومان</span>
            </div>
            {product.discount > 0 && (
              <div className="mt-1">
                <span className="text-sm line-through text-gray-400">
                  {(selectedVariant ? selectedVariant.price * (1 + product.discount/100) : product.basePrice * (1 + product.discount/100)).toLocaleString()} تومان
                </span>
                <span className="mr-2 text-sm text-red-500">
                  {product.discount}% تخفیف
                </span>
              </div>
            )}
          </div>

          {/* انتخاب سایز */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">سایز:</h2>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
                    ${selectedSize === size
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* انتخاب رنگ */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">رنگ:</h2>
            <div className="flex flex-wrap gap-3">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`flex flex-col items-center gap-1`}
                >
                  <div 
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor === color.name 
                        ? "border-blue-600 scale-110" 
                        : "border-transparent"
                    }`}
                    style={{ backgroundColor: color.code }}
                  />
                  <span className="text-xs text-gray-600">{color.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* تعداد */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">تعداد:</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                -
              </button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                +
              </button>
            </div>
          </div>

          {/* توضیحات */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">توضیحات:</h2>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* موجودی */}
          {selectedVariant && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">موجودی:</h2>
              <p className={`font-medium ${selectedVariant.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {selectedVariant.stock > 0 ? `${selectedVariant.stock} عدد موجود` : 'ناموجود'}
              </p>
            </div>
          )}

          {/* دکمه‌های اکشن */}
          <div className="flex gap-4">
            <Button
              onClick={handleAddToCart}
              disabled={!selectedVariant || selectedVariant.stock === 0}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              افزودن به سبد خرید
            </Button>
            <Button
              onClick={handleToggleWishlist}
              className={`p-3 rounded-lg transition-colors flex items-center justify-center ${
                isWishlisted 
                  ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Heart 
                className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} 
              />
            </Button>
          </div>
        </motion.div>
        <div className="flex space-x-4 pt-4">
          <Button
            onClick={handleAddToCart}
            className="flex-1 bg-blues hover:bg-blue-700"
          >
            <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
          </Button>
          <Button
            onClick={handleToggleWishlist}
            variant="outline"
            className={`flex-1 ${
              isWishlisted ? "bg-red-100 text-red-600 border-red-600" : ""
            }`}
          >
            <Heart className="mr-2 h-5 w-5" />{" "}
            {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
