import SlideProduct from "./Slideproduct";
import React from 'react'
import useCartStore from "@/store/cartStore";
import axios from "axios";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ProductsGridHome from "../products/ProductsGridHome";
const ProductsOne = () => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const addItem = useCartStore((state) => state.addItem);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
     
        const res = await axios.get(`/api/products/allProducts`,  {params: { page: 1, limit: 6 }});
        setProducts(res.data.products);
      } catch (error) {
        console.log(error);
        setError("Error loading products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  useEffect(() => {
    const fetchWishlist = async () => {
      if (session) {
        try {
          const res = await axios.get("/api/wishlist");
          if (Array.isArray(res.data.items)) {
            setWishlist(res.data.items.map((item) => item._id));
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchWishlist();
  }, [session]);
  const handleWishlistUpdate = (productId, isAdding) => {
    if (isAdding) {
      setWishlist([...wishlist, productId]);
    } else {
      setWishlist(wishlist.filter((id) => id !== productId));
    }
  };
  return (
    <div className="flex flex-col lg:flex-row w-full gap-6 items-start py-10  lg:px-10 ">
      <div className="w-full lg:w-[350px] xl:w-[400px] ">
        <SlideProduct />
      </div>
      <div className="flex flex-col w-full">
      <ProductsGridHome
      itemsPerPage={6}
          products={products}
          wishlist={wishlist}
          onWishlistUpdate={handleWishlistUpdate}
        />
                  <div className="mt-8 flex justify-center">
              <Link href="/products" className="w-full md:w-1/2 lg:w-1/3">
                <Button 
                  size="lg" 
                  className="w-full bg-blues hover:bg-blues/90 text-white rounded-xl shadow-lg">
               
                  مشاهده همه محصولات
                </Button>
              </Link>
            </div>
     </div>
    </div>
  )
}

export default ProductsOne