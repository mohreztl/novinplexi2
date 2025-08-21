import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
// import { Card, CardContent } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { formatPrice } from '@/utils/formatPrice';
// import { ShoppingCart, Eye } from 'lucide-react';

const ProductCard = ({ product }) => {
  if (!product) return null;

  const currentPrice = product.basePrice || product.price || 0;
  const discountedPrice = product.discountPrice || 
    (product.discount > 0 ? currentPrice - (currentPrice * product.discount / 100) : currentPrice);

  const formatPrice = (price) => {
    if (!price && price !== 0) return '0 تومان';
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    if (isNaN(numPrice)) return '0 تومان';
    return new Intl.NumberFormat('fa-IR').format(numPrice) + ' تومان';
  };

  return (
    <div className="group overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200 rounded-lg shadow-sm bg-white">
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.images?.[0] || '/placeholder.jpg'}
            alt={product.title || product.name || 'محصول'}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
        
        {/* نشان تخفیف */}
        {product.discount > 0 && (
          <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
            {product.discount}% تخفیف
          </span>
        )}
        
        {/* وضعیت موجودی */}
        {/* {product.stock === 0 && (
          <span className="absolute top-2 left-2 bg-gray-500 text-white px-2 py-1 rounded text-xs">
            ناموجود
          </span>
        )} */}
      </div>

      <div className="p-4">
        <div className="space-y-2">
          {/* دسته‌بندی */}
          {product.category && (
            <div className="text-xs text-gray-500 uppercase tracking-wide">
              {product.category}
            </div>
          )}
          
          {/* عنوان محصول */}
          <h3 className="font-medium text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors">
            <Link href={`/product/${product.slug}`}>
              {product.title || product.name}
            </Link>
          </h3>

          {/* قیمت */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              {product.discount > 0 ? (
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-green-600">
                    {formatPrice(discountedPrice)}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(currentPrice)}
                  </span>
                </div>
              ) : (
                <span className="text-lg font-bold text-gray-900">
                  {formatPrice(currentPrice)}
                </span>
              )}
            </div>
            
            {/* رتبه یا امتیاز */}
            {product.averageRating > 0 && (
              <div className="text-sm text-gray-500">
                ⭐ {product.averageRating.toFixed(1)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
