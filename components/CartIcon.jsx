"use client";

import React, { useEffect, useState } from "react";
import useCartStore from "../store/cartStore";

import Cart from "./Cart";

const CartIcon = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [itemCount, setItemCount] = useState(0);
  const { items, getTotalItems } = useCartStore();
  const [cart, setCart] = useState(false);

  useEffect(() => {
    setIsLoading(false);
    setItemCount(getTotalItems());
  }, [items, getTotalItems]);

  if (isLoading) {
    return null; // Or a loading placeholder if you prefer
  }

  return (
    <div className="relative cursor-pointer group">
    <div 
      onClick={() => setCart(!cart)}
      className="p-1 rounded-full hover:bg-primary/10 transition-colors"
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary group-hover:text-secondary transition-colors"
      >
        <path
          d="M6 2L3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6L18 2H6Z"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M16 10C16 11.6569 14.6569 13 13 13H11C9.34315 13 8 11.6569 8 10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-secondary text-slate-100 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border border-white">
          {itemCount}
        </span>
      )}
    </div>
    
    {cart && (
      <div className="absolute top-full -left-40 mt-2 z-50">
        <Cart />
      </div>
    )}
  </div>
  );
};

export default CartIcon;
