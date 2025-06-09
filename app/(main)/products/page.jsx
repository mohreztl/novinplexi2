"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import useCartStore from "@/store/cartStore";
import ProductCard from "@/components/products/ProductCard";
import {
  Heart,
  ShoppingCart,
  AlertCircle,
  ChevronLeft,
  ChevronRight,

} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadingErrorComponent from "@/components/Loader/LoadingErrorComponent";


const category=[,"کاغذدیواری,","موکت"]

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const addItem = useCartStore((state) => state.addItem);
  const { data: session } = useSession();
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 12;
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleFilterChange = ({ category, priceRange }) => {
    const [minPrice, maxPrice] = priceRange;

    const filtered = products.filter((product) => {
      const inPriceRange =
        product.price >= minPrice && product.price <= maxPrice;
      const inCategory = category ? product.category === category : true;

      return inPriceRange && inCategory;
    });

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    if (session) {
      fetchWishlist();
    }
    handleSubmit();
  }, [session, currentPage]);

  const fetchWishlist = async () => {
    if (session) {
      try {
        const res = await axios.get("/api/wishlist");
        if (Array.isArray(res.data.items)) {
          setWishlist(res.data.items.map((item) => item._id));
        } else {
          console.log("Unexcpected error or format data: ", res.data);
        }
      } catch (error) {
        toast.error("Error fetching wishlist");
        console.log(error);
      }
    }
  };
  function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  const handleSubmit = async () => {
    if (isSearching) {
      return;
    }
    setIsSearching(true);
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`/api/products/allProducts`, {
        params: { page: currentPage, limit: itemsPerPage },
      });
      if (res.status === 200 || res.status === 201) {
        setProducts(res.data.products);
        setTotalPages(Math.ceil(res.data.total / itemsPerPage));
      }
    } catch (error) {
      console.log(error);
      setError("Failed to load products, please try again in a few seconds!");
      toast.error(
        "Failed to load products, please try again in a few seconds!"
      );
    } finally {
      setIsSearching(false);
      setLoading(false);
    }
  };

  const toggleWishlist = async (productId) => {
    if (!session) {
      router.push("/login");
      return;
    }
    try {
      if (wishlist.includes(productId)) {
        await axios.delete("/api/wishlist", {
          data: { productId },
        });
        setWishlist(wishlist.filter((id) => id !== productId));
        toast.success("Removed Item from Wishlist");
      } else {
        await axios.put("/api/wishlist", {productId});
        setWishlist([...wishlist, productId]);
        toast.success("به لیست علاقه مندی ها اضافه شدذ")
      }
    } catch (error) {
      console.log();
    }
  };

  const handleAddToCart = (product) => {
    addItem(product);
    toast.success("با موفقیت به سبد خرید شما اضافه شد");
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) {
    return <LoadingErrorComponent loading={true} />;
  }
  if (error) {
    return <LoadingErrorComponent error={error} />;
  }

  return (
    <div className="md:flex bg-gray-50 min-h-screen md:pl-10 w-full">
  <Toaster position="top-left" />
  

  <div className="max-w-full w-full px-4">
    <h1 className="text-4xl font-bold mb-8 text-center text-blues">
      محصولات
    </h1>
    
    {products.length === 0 ? (
      <div className="flex flex-col items-center gap-4">
        <p className="text-center text-blues text-lg">محصولی یافت نشد</p>
        <AlertCircle className="h-16 w-16 text-gold" />
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
        {products.map((product) => (
              <ProductCard key={product._id} product={product} />
        ))}
      </div>
    )}

    {products.length > 0 && (
      <div className="mt-8 flex  justify-center items-center gap-4">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-blues hover:bg-blues/90 text-white font-semibold py-2 px-4 rounded-lg transition-all gap-2"
        >
          <ChevronRight className="h-5 w-5" />
          قبلی
        </Button>
        
        <span className="text-lg font-semibold text-blues">
          صفحه {currentPage} از {totalPages}
        </span>
        
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-blues hover:bg-blues/90 text-white font-semibold py-2 px-4 rounded-lg transition-all gap-2"
        >
          بعدی
          <ChevronLeft className="h-5 w-5" />
        </Button>
      </div>
    )}
  </div>
</div>
  );
};

export default Products;
