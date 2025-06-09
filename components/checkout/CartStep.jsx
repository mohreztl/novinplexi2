"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import useCartStore from "@/store/cartStore.js";
import { Trash2, ShoppingCart, Plus, Minus, Lock } from "lucide-react";
import Image from "next/image";

const CartStep = () => {
  const { data: session } = useSession();
  const userId = session?.user?._id;
  const [isLoading, setIsLoading] = useState(true);
  const {
    items,
    removeItem,
    clearCart,
    getTotalItems,
    getTotalPrice,
    updateItemQuantity,
  } = useCartStore();

  function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    updateItemQuantity(itemId, newQuantity);
  };

  return (
    <div className="space-y-4">
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <ShoppingCart className="w-16 h-16 text-blues-300" />
          <p className="text-xl text-blues-800 font-medium">سبد خرید شما خالی است</p>
        </div>
      ) : (
        <>
          {items.map((item) => (
            <div
              className="flex flex-col md:flex-row items-center justify-between p-4 border border-blues-100 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
              key={item._id}
            >
              <div className="flex items-center space-x-4 w-full md:w-auto">
                <div className="relative w-20 h-20">
                  <Image
                    src={item?.images[0]}
                    fill
                    className="rounded-md object-cover"
                    alt={item.name}
                    unoptimized
                  />
                </div>
                <div className="flex flex-col w-full md:w-auto">
                  <h3 className="font-semibold text-lg text-blues-900">
                    {item.name}
                  </h3>
                  <div className="space-y-1 mt-1">
                    <p className="text-sm text-blues-600">
                      <span className="font-medium">برند: </span>
                      {item?.brand}
                    </p>
                    <p className="text-sm text-blues-600">
                      <span className="font-medium">جنس: </span>
                      {item?.material}
                    </p>
                    <p className="text-sm text-blues-600">
                      <span className="font-medium">وضعیت: </span>
                      {item?.condition}
                    </p>
                  </div>
                  <div className="flex items-center mt-3 space-x-2">
                    <button
                      onClick={() =>
                        handleQuantityChange(item._id, (item.quantity || 1) - 1)
                      }
                      disabled={item.quantity <= 1}
                      className={`p-1 rounded-full transition-colors duration-150 ${
                        item.quantity <= 1
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-blues-100 text-blues-600 hover:bg-blues-200"
                      }`}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="mx-2 text-sm font-medium w-6 text-center">
                      {item.quantity || 1}
                    </span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item._id, (item.quantity || 1) + 1)
                      }
                      className="p-1 bg-blues-100 text-blues-600 rounded-full hover:bg-blues-200 transition-colors duration-150"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <span className="font-bold text-lg text-gold-600">
                  {formatPrice(item.price * (item.quantity || 1))} تومان
                </span>
                <button
                  onClick={() => removeItem(item._id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors duration-150"
                  aria-label="حذف محصول"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}

          <div className="mt-6 space-y-4 bg-blues-50 border border-blues-100 p-5 rounded-lg">
            <div className="flex justify-between items-center py-2 border-b border-blues-100">
              <span className="text-blues-700">تعداد کالاها</span>
              <span className="font-semibold text-blues-900">{getTotalItems()}</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-lg text-blues-800">مجموع سبد خرید:</span>
              <span className="font-bold text-xl text-gold-600">
                {formatPrice(getTotalPrice())} تومان
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartStep;