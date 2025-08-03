import React, { useEffect, useState } from "react";
import useCartStore from "../store/cartStore";
import Image from "next/image";
import { Trash2, ShoppingCart, Minus, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Cart = () => {
  const [isLoading, setIsLoading] = useState(true);

  const {
    items,
    removeItem,
    clearCart,
    getTotalPrice,
    getTotalItems,
    updateItemQuantity,
  } = useCartStore();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleRemove = (event, id) => {
    event.preventDefault();
    event.stopPropagation();
    removeItem(id);
  };

  const handleQuantityChange = (event, id, newQuantity) => {
    event.preventDefault();
    event.stopPropagation();
    if (newQuantity < 1) {
      removeItem(id);
    } else {
      updateItemQuantity(id, newQuantity);
    }
  };

  const handleCheckout = () => {
    window.location.href = "/checkout";
  };
//جدا کردن قیمت
  function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="w-[40rem] mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center py-4 text-gray-800">
    سبد خرید شما
      </h2>
      {items.length === 0 ? (
        <div className="text-center py-6 mt-12 pb-32">
          <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-4 text-lg text-gray-500">محصولی در سبد خرید شما موجود نمیباشد</p>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex items-center p-3 border border-gray-200 rounded-lg bg-gray-50"
                >
                  <Image
                    src={item?.images[0]}
                    width={60}
                    height={60}
                    className="rounded-md object-cover mr-3"
                    alt={item.name}
                    unoptimized
                  />
                  <div className="flex-grow sm:mr-12">
                    <h3 className="font-semibold text-sm text-gray-800 pr-2">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {item?.brand} - {item?.material}
                    </p>
                    <div className="flex items-center mt-1">
                      <button
                        onClick={(e) =>
                          handleQuantityChange(e, item._id, item.quantity - 1)
                        }
                        className="p-1 bg-gray-200 rounded-full"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="mx-2 text-sm">{item.quantity}</span>
                      <button
                        onClick={(e) =>
                          handleQuantityChange(e, item._id, item.quantity + 1)
                        }
                        className="p-1 bg-gray-200 rounded-full"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm text-gray-800">
                      تومان{formatPrice((item.price * item.quantity))}
                    </p>
                    <button
                      onClick={(e) => handleRemove(e, item._id)}
                      className="mt-2 p-1 text-red-500 hover:bg-red-100 rounded-full transition-colors duration-150"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="border-t pt-4 mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span>مجموع قیمت:</span>
              <span className="font-semibold">
               {formatPrice(getTotalPrice())} تومان
              </span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>حمل و نقل:</span>
              <span className="font-semibold">محاسبه هنگام پرداخت</span>
            </div>
            <div className="flex justify-between text-lg font-bold mt-4">
              <span>مجموع قیمت:</span>
              <span>{formatPrice(getTotalPrice())} تومان</span>
            </div>
          </div>
          <div className="space-y-3">
            <button
              onClick={handleCheckout}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold  hover:bg-blue-700 transition-colors duration-200"
            >
             تکمیل سبد خرید
            </button>
            <button
              onClick={clearCart}
              className="w-full bg-red-200 text-red-700 py-3 rounded-lg font-semibold hover:bg-red-300 transition-colors duration-200"
            >
             خالی کردن سبد خرید
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
