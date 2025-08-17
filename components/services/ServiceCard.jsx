import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ServiceCard = ({ service }) => {
  if (!service) return null;

  const currentPrice = service.basePrice || service.price || 0;
  const discountedPrice = service.discountPrice || 
    (service.discount > 0 ? currentPrice - (currentPrice * service.discount / 100) : currentPrice);

  const formatPrice = (price) => {
    if (!price && price !== 0) return 'قیمت تماس';
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    if (isNaN(numPrice)) return 'قیمت تماس';
    return new Intl.NumberFormat('fa-IR').format(numPrice) + ' تومان';
  };

  return (
    <div className="group overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200 rounded-lg shadow-sm bg-white">
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Link href={`/service/${service.slug}`}>
          <Image
            src={service.images?.[0] || '/placeholder.jpg'}
            alt={service.title || service.name || 'خدمت'}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
        
        {/* نشان تخفیف */}
        {service.discount > 0 && (
          <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
            {service.discount}% تخفیف
          </span>
        )}
        
        {/* وضعیت دسترسی */}
        {service.available === false && (
          <span className="absolute top-2 left-2 bg-gray-500 text-white px-2 py-1 rounded text-xs">
            غیرفعال
          </span>
        )}
      </div>

      <div className="p-4">
        {/* عنوان خدمت */}
        <Link href={`/service/${service.slug}`}>
          <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
            {service.title || service.name || 'خدمت'}
          </h3>
        </Link>

        {/* توضیح مختصر */}
        {service.description && (
          <p className="text-gray-600 text-xs mb-3 line-clamp-2">
            {service.description}
          </p>
        )}

        {/* قیمت */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex flex-col">
            {service.discount > 0 ? (
              <>
                <span className="text-gray-400 text-xs line-through">
                  {formatPrice(currentPrice)}
                </span>
                <span className="text-green-600 font-bold text-sm">
                  {formatPrice(discountedPrice)}
                </span>
              </>
            ) : (
              <span className="text-gray-900 font-bold text-sm">
                {formatPrice(currentPrice)}
              </span>
            )}
          </div>
        </div>

        {/* دکمه‌ها */}
        <div className="flex gap-2">
          <Link 
            href={`/service/${service.slug}`}
            className="flex-1 bg-blue-600 text-white text-center py-2 px-3 rounded text-xs hover:bg-blue-700 transition-colors"
          >
            مشاهده جزئیات
          </Link>
          <button className="bg-green-600 text-white py-2 px-3 rounded text-xs hover:bg-green-700 transition-colors">
            درخواست خدمت
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
