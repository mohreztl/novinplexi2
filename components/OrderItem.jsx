import React from "react";
import { Button } from "@/components/ui/button";
import { PackageOpen,Eye, } from 'lucide-react';
import Link from "next/link";
const OrderItem = ({ order }) => {
  // Function to safely format the total
  function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const statusLabels = {
    PENDING: "در حال بررسی",
    PAID: "تایید پرداخت",
    DELIVERED: "تحویل مشتری",
    SHIPPED: "تحویل باربری",
    CANCELLED: "لغو شده",
    FAILED: "پرداخت ناموفق",
  };
  const getStatusStyle = (status) => {
    const styles = {
      PENDING: "bg-yellow-100 text-yellow-700",
      PAID: "bg-primary-100 text-primary-700",
      SHIPPED: "bg-indigo-100 text-indigo-700",
      DELIVERED: "bg-green-100 text-green-700",
      FAILED: "bg-red-100 text-red-700"
    };
    return styles[status] || "bg-gray-100 text-gray-700";
  };

  return (
<div className="group flex flex-col md:flex-row items-stretch gap-4 p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
  {/* بخش اطلاعات اصلی */}
  <div className="flex-1 space-y-3">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <PackageOpen className="w-5 h-5 text-primary-600" />
        <h3 className="text-lg font-semibold text-primary-800">
          سفارش #{order._id?.slice(-8).toUpperCase() || "N/A"}
        </h3>
      </div>
      <span className={`px-2 py-1 rounded-full text-sm ${getStatusStyle(order.status)}`}>
        {statusLabels[order.status] || "N/A"}
      </span>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
      <div className="space-y-1">
        <p className="text-gray-500">تاریخ ثبت</p>
        <p className="font-medium text-gray-800">
          {order.createdAt ? new Date(order.createdAt).toLocaleDateString('fa-IR') : "N/A"}
        </p>
      </div>
      
      <div className="space-y-1">
        <p className="text-gray-500">مبلغ کل</p>
        <p className="font-medium text-secondary-600">
          {formatPrice(order.total)} تومان
        </p>
      </div>

      <div className="space-y-1">
        <p className="text-gray-500">تعداد آیتم‌ها</p>
        <p className="font-medium text-gray-800">
          {order.items?.length || 0} عدد
        </p>
      </div>

      <div className="space-y-1">
        <p className="text-gray-500">شهر مقصد</p>
        <p className="font-medium text-gray-800">
          {order.city || "N/A"}
        </p>
      </div>
    </div>
  </div>

  {/* بخش اقدامات */}
  <div className="flex flex-col justify-between items-end border-t md:border-t-0 md:border-l border-gray-200 md:pl-6 pt-4 md:pt-0">
    <div className="w-full md:w-auto">
      <Link href={`/orders/${order._id}`}>
      <Button
        variant="outline"
        className="w-full md:w-32 bg-primary-50 text-primary-700 hover:bg-primary-100 border-primary-200 flex items-center justify-center gap-2"
    
      >
        <Eye className="w-4 h-4" />
        جزئیات
      </Button>
      </Link>
    </div>
    
    <div className="mt-3 text-xs text-gray-500 text-left md:text-right">
      <p>روش پرداخت: {order.paymentMethod || "N/A"}</p>
      <p>کد رهگیری: {order.trackingNumber || "در حال آماده‌سازی"}</p>
    </div>
  </div>
</div>
  );
};

export default OrderItem;
