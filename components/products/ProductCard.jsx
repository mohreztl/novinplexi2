import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Eye, Star } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useCartStore from "@/store/cartStore";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function ProductCard({ product }) {
  const { data: session } = useSession();
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);

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
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!session) {
      toast.error("برای افزودن به سبد خرید ابتدا وارد شوید");
      router.push("/login");
      return;
    }

    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || "/placeholder.webp",
      quantity: 1
    });
    
    toast.success("محصول به سبد خرید اضافه شد");
  };

  return (
    <Card 
      className="group relative overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border-0"
    >
      {/* تصویر محصول */}
      <div className="relative overflow-hidden aspect-square">
        <Link href={`/product/${product.slug || product._id}`}>
          <Image
            src={product.images?.[0] || "/placeholder.webp"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </Link>
        
        {/* نشان تخفیف */}
        {calculateDiscount() > 0 && (
          <Badge className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 z-10">
            {calculateDiscount()}% تخفیف
          </Badge>
        )}
        
        {/* نشان عدم موجودی */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
            <Badge variant="destructive" className="text-lg px-4 py-2">
              ناموجود
            </Badge>
          </div>
        )}
        
        {/* دکمه‌های عملیات */}
        <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
          <div className="flex gap-2">
            <Link href={`/product/${product._id}`} className="flex-1">
              <Button className="w-full bg-primary hover:bg-primary-700 text-white">
                <Eye className="w-4 h-4 ml-2" />
                مشاهده
              </Button>
            </Link>
            <Button 
              onClick={handleAddToCart}
              variant="secondary" 
              size="icon"
              className="bg-white/90 hover:bg-white text-primary"
              disabled={product.stock === 0}
            >
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {/* پوشش گرادیانت */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* اطلاعات محصول */}
      <CardContent className="p-6">
        <div className="space-y-3">
          <Link href={`/product/${product._id}`}>
            <h3 className="font-bold text-lg text-gray-900 line-clamp-2 group-hover:text-primary transition-colors cursor-pointer">
              {product.name}
            </h3>
          </Link>
          
          {product.description && (
            <p className="text-gray-600 text-sm line-clamp-2">
              {product.description}
            </p>
          )}

          {/* امتیاز محصول */}
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < (product.rating || 0) 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="text-sm text-gray-500">
              ({product.reviewCount || 0})
            </span>
          </div>

          {/* قیمت و موجودی */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              {product.originalPrice && product.originalPrice > product.price && (
                <p className="text-sm text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </p>
              )}
              <p className="text-xl font-bold text-primary">
                {formatPrice(product.price)}
              </p>
            </div>
            
            {product.stock > 0 && (
              <div className="flex items-center gap-1 text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">موجود</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}