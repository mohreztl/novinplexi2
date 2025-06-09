import React, { useState } from "react";
import { ShoppingCart, Heart, Minus, Plus } from "lucide-react";
import MiniGuarantee from "./MiniGuarantee";
import  useCartStore from "@/store/cartStore";

const ProdDetailsPrice = ({
  product,
  averageRating,
  allReviews,
  isInWishlist,
  toggleWishlist,
  item,
}) => {
  const addItem = useCartStore((state) => state.addItem);
  const updateItemQuantity = useCartStore((state) => state.updateItemQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const [quantity, setQuantity] = useState(item?.quantity || 1);

  const handleQuantityChange = (event, newQuantity) => {
    event.preventDefault();
    event.stopPropagation();
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div className="md:w-1/2 px-4 sm:px-8 pb-8 sm:pt-20">
      <div className="relative overflow-hidden bg-blues rounded-2xl shadow-lg p-4 sm:p-8 mb-8 hover:shadow-2xl">
        <div className="relative z-10 transform-gpu">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-100 antialiased">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-50 to-slate-100">
              {product.name}
            </span>
          </h1>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-50 to-slate-100">
            {product.brand}
          </span>
          <div className="flex items-center flex-wrap mb-6">
            <p className="text-xl sm:text-2xl font-semibold text-green-400 mr-2 sm:mr-4 antialiased">
              {formatPrice(product.price)} تومان
            </p>
            {product.originalPrice && product.originalPrice > product.price && (
              <>
                <p className="text-lg sm:text-xl text-gray-400 line-through mr-2 sm:mr-4 antialiased">
                  {formatPrice(product.originalPrice)}
                </p>
                <span className="px-2 py-1 text-xs sm:text-sm font-semibold text-yellow-200 bg-yellow-800 hover:bg-yellow-700 rounded-full antialiased">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% تخفیف
                </span>
              </>
            )}
            <span className="px-3 hidden sm:block py-1 text-sm font-semibold text-green-200 bg-green-800 hover:bg-green-700 rounded-full antialiased ml-auto">
              موجود در انبار
            </span>
          </div>
          <p className="mb-6 mt-6 text-sm text-gray-300 leading-relaxed bg-opacity-50 rounded-lg p-4 shadow-inner backdrop-filter backdrop-blur-sm antialiased max-h-[20rem] overflow-auto">
            {product.description}
          </p>
        </div>
      </div>

      {/* تعداد محصول */}
     
      <div className="flex flex-col md:flex-row my-2 ">
      <div className="flex items-center justify-center gap-4 space-x-4 mb-4 md:mb-0">
        <button
          onClick={(e) => handleQuantityChange(e, quantity - 1)}
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
        >
          <Minus className="h-5 w-5" />
        </button>
        <span className="text-lg font-semibold">{quantity}</span>
        <button
          onClick={(e) => handleQuantityChange(e, quantity + 1)}
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>
      <div className="flex-1 flex  ">
        <button
          onClick={handleAddToCart}
          className="flex-1 bg-gradient-to-r from-blues/85 to-blues/95 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center"
        >
          <ShoppingCart className="mr-2 h-6 w-6 ml-1 animate-bounce text-gold" />
          <span className="font-semibold">افزودن به سبد خرید</span>
        </button>
        <button
          onClick={toggleWishlist}
          className={`mr-2 p-3 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 ${
            isInWishlist
              ? "bg-red-600 text-white hover:bg-red-700"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          <Heart className="h-6 w-6" />
        </button>
        </div>
      </div>
      <MiniGuarantee />
    </div>
  );
};

export default ProdDetailsPrice;
