"use client";

import React, { useEffect, useState } from "react";
import useCartStore from "../store/cartStore";
import Link from "next/link";
import { Button } from "./ui/button";
import MobileCart from "./MobileCart";
import { ShoppingCart } from "lucide-react";
const CartIconMobileBottom = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [itemCount, setItemCount] = useState(0);
  const { items, getTotalItems } = useCartStore();
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    setIsLoading(false);
    setItemCount(getTotalItems());
  }, [items, getTotalItems]);

  if (isLoading) {
    return null; // Or a loading placeholder if you prefer
  }

  return (
  
              <div
               
                onClick={() => setIsCartOpen(!isCartOpen)}
              >
                {" "}
                {/* <p className="mr-2 font-medium border px-2 py-1 rounded-md bg-slate-50/50">
                 سبد حرید شما:{" "}
                </p> */}
                <ShoppingCart className="w-7 h-7" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-secondary text-slate-100 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border border-white">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
                )}
        
      <MobileCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default CartIconMobileBottom;
