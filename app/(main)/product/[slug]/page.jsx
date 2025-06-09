"use client";

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import useCartStore from "@/store/cartStore";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import ProductDetailsSinglePage from "@/components/ProductDetailsSinglePage.jsx";

export default function ProductPage({ params }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allReviews, setAllReviews] = useState([]);

  const [isInWishlist, setIsInWishlist] = useState(false);
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const router = useRouter();
  const { data: session } = useSession();


  const addItem = useCartStore((state) => state.addItem);
  const { slug } = params;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/product/${slug}`);
        setProduct(res.data);
        
        if (session) {
          checkWishlistStatus(res.data._id);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          router.push("/404");
        } else {
          setError("Failed to load product");
          console.log(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
   
    fetchAllReveiws();
  }, [slug, router, session]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
   
     
        const res = await axios.get(`/api/products/brand/All`);
        setProducts(res.data);
      } catch (error) {
        console.log(error);
        setError("Error loading products", error);
      } 
    };
    fetchProducts();
  }, []);
  const averageRating = allReviews.length
    ? allReviews.reduce((acc, review) => acc + review.rating, 0) /
      allReviews.length
    : 0;




  const fetchAllReveiws = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `/api/review/allReviews?slug=${slug}`
      );
      setAllReviews(res.data.review);
    } catch (error) {
      setError("Failed to load reviews");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [slug]);
  useEffect(() => {
    const fetchWishlist = async () => {
      if (session) {
        try {
          const res = await axios.get("/api/wishlist");
          if (Array.isArray(res.data.items)) {
            setWishlist(res.data.items.map((item) => item._id));
          } else {
            console.log(error);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
     fetchWishlist();
  }, [session]);
  const checkWishlistStatus = async (productId) => {
    try {
      const res = await axios.get("/api/wishlistAll");
      setIsInWishlist(res.data.items.some((item) => item._id === productId));
    } catch (error) {
      console.log(error);
    }
  };
  const handleWishlistUpdate = (productId, isAdding)=> {
    if(isAdding){
        setWishlist([...wishlist, product._Id]);
    } else {
        setWishlist(wishlist.filter((id)=> id !== product._id))
    }
  }
 

  const handleAddToCart = (quantity) => {
    addItem(product,quantity);
    toast.success("محصول سبد خرید اضافه شد");
  };

  const toggleWishlist = async () => {
    if (!session) {
      router.push("/login");
      return;
    }
    try {
      if (isInWishlist) {
        await axios.delete("/api/wishlist", {
          data: { productId: product._id },
        });
        setIsInWishlist(false);
        toast.success("Removed from wishlist");
      } else {
        await axios.put("/api/wishlist", { productId: product._id });
        setIsInWishlist(true);
        toast.success("به علاقه مندی ها اضافه شد");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500 bg-red-100 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <ProductDetailsSinglePage
      product={product}
      products={products}
      averageRating={averageRating}
      allReviews={allReviews}
      isInWishlist={isInWishlist}

      toggleWishlist={toggleWishlist}
      onWishlistUpdate={handleWishlistUpdate}
     
     
    />
  );
}
