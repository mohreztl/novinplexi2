import Image from "next/image";
import Link from "next/link";
import { Heart, Plus } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useCartStore from "@/store/cartStore";
import axios from "axios";
import toast from "react-hot-toast";

export default function ProductCard({ product, onWishlistUpdate }) {
  const [isHovered, setIsHovered] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const [wishlistItems, setWishlistItems] = useState([]);
  const calculateDiscount = () => {
    if (product.originalPrice && product.price) {
      const discount = Math.round(
        ((product.originalPrice - product.price) / product.originalPrice * 100
      ));
      return discount > 0 ? discount : 0;
    }
    return 0;
  };
  // تابع فرمت قیمت با جداکننده هزارگان
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fa-IR').format(price);
  };

  // بررسی وضعیت لیست علاقه‌مندی‌ها
  useEffect(() => {
    const checkWishlistStatus = async () => {
      if (session) {
        try {
          const response = await axios.get(`/api/wishlistAll`);
          setWishlistItems(response.data.items);
        } catch (error) {
          console.error("Error fetching wishlist:", error);
        }
      }
    };
    checkWishlistStatus();
  }, [session]);

  // بررسی آیا محصول در لیست علاقه‌مندی‌ها هست
  const isInWishlist = useMemo(() => {
    return wishlistItems.some((item) => item._id === product._id);
  }, [wishlistItems, product._id]);

  // افزودن به سبد خرید
  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem(product);
    toast.success("محصول به سبد خرید اضافه شد!");
  };

  // مدیریت لیست علاقه‌مندی‌ها
  const toggleWishlist = async (e) => {
    e.preventDefault();
    if (!session) {
      router.push("/login");
      return;
    }
    try {
      if (isInWishlist) {
        await axios.delete("/api/wishlist", {
          data: { productId: product._id },
        });
        setWishlistItems((prevItems) => 
          prevItems.filter((item) => item._id !== product._id)
        );
        toast.success("از لیست علاقه‌مندی‌ها حذف شد");
      } else {
        await axios.put("/api/wishlist", { productId: product._id });
        setWishlistItems((prevItems) => [...prevItems, product]);
        toast.success("به لیست علاقه‌مندی‌ها اضافه شد");
      }
      onWishlistUpdate?.();
    } catch (error) {
      console.error("خطا در مدیریت لیست علاقه‌مندی‌ها:", error);
      toast.error("خطایی رخ داد");
    }
  };

  return (
    <div
      className="relative flex flex-col bg-white rounded-3xl shadow-lg hover:shadow-xl overflow-hidden transition-all duration-300 border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.slug}`} className="group">
      
        {/* بخش تصویر محصول */}
        <div className="relative aspect-square overflow-hidden">
        {calculateDiscount() > 0 && (
            <div className="absolute top-2 left-2 bg-gold text-blues px-3 py-1 rounded-full text-sm font-bold z-10 shadow-md">
              %{calculateDiscount()} تخفیف
            </div>
          )}
          <Image
            src={product.images[0] || "/placeholder.webp"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
          
          {/* دکمه‌های تعاملی */}
          {isHovered && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center gap-4">
              <button
                onClick={toggleWishlist}
                className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors"
              >
                <Heart
                  className={`w-6 h-6 ${
                    isInWishlist 
                      ? "text-red-500 fill-current" 
                      : "text-gray-600 hover:text-red-500"
                  }`}
                />
              </button>
              <button
                onClick={handleAddToCart}
                className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors"
              >
                <Plus className="w-6 h-6 text-blues hover:text-blues/80" />
              </button>
            </div>
          )}
        </div>

        {/* اطلاعات محصول */}
        <div className="p-4 flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500">{product.brand}</p>
          
          <div className="flex flex-col gap-1 mt-2">
            {product.price && (
              <p className="text-xl font-bold text-blues">
                {formatPrice(product.price)} تومان
              </p>
            )}
            {product.originalPrice && (
              <p className="text-sm text-gray-400 line-through">
                {formatPrice(product.originalPrice)} تومان
              </p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}