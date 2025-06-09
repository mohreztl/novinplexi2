"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import {

  ArrowLeftIcon,
  TruckIcon,
  CalendarIcon,
  CreditCardIcon,
  UserIcon,
  MapPinIcon,
  GlobeAltIcon,
} from "@heroicons/react/20/solid";

import Link from "next/link";
import Image from "next/image";

export default function OrderDetails({ params }) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { orderId } = params;

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`/api/orders/${orderId}`);
        if (res.status === 200) {
          console.log(res.data);
          
          setOrder(res.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  if(loading){
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-400"></div>
        </div>
    )
  }
  if(error){
    return <div className="text-center text-red-500">{error}</div>
  }
  if(!order){
    return <div className="text-center mt-8">سفارش یافت نشد</div>
  }

  const formatDate = (dateString)=> {
    const options = {year: "numeric", month: "long", day:"numeric"};
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  function formatPrice(price=0) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div className="min-h-screen bg-blues-50 py-8 px-4 sm:px-6 lg:px-8">
    <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
      {/* هدر با گرادیانت */}
      <div className="bg-gradient-to-r from-blues-700 to-gold-500 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">خلاصه سفارش</h1>
            <p className="text-gold-200 mt-1">سفارش شما با موفقیت ثبت شد</p>
          </div>
          <Link
            href="/orders"
            className="flex items-center text-blues-100 hover:text-white transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5 ml-1" />
            بازگشت به سفارشات
          </Link>
        </div>
      </div>
  
      {/* اطلاعات اصلی سفارش */}
      <div className="p-8 space-y-8">
        {/* تاریخ و وضعیت پرداخت */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-blues-50 p-4 rounded-xl">
          <div className="flex items-center space-x-3">
            <CalendarIcon className="w-6 h-6 text-blues-600" />
            <div>
              <p className="text-sm text-gray-500">تاریخ سفارش</p>
              <p className="font-medium text-blues-800">
                {`${order.orderDate.month}/${order.orderDate.day}`}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <CreditCardIcon className="w-6 h-6 text-blues-600" />
            <div>
              <p className="text-sm text-gray-500">وضعیت پرداخت</p>
              <div className="flex items-center">
                <span className={`px-2 py-1 rounded-full text-sm ${
                  order.status=== "PAID"
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {order.status==="PAID" ? "موفق" : "در انتظار پرداخت"}
                </span>
              </div>
            </div>
          </div>
        </div>
  
        {/* لیست محصولات */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-blues-800 border-b-2 border-blues-100 pb-2">
            اقلام سفارش ({order.cartProducts.length})
          </h2>
          <div className="grid gap-4">
            {order.cartProducts.map((item) => (
              <div
                key={item.product._id}
                className="group flex items-center justify-between p-4 hover:bg-blues-50 rounded-xl transition-colors"
              >
                <Link
                  href={`/product/${item.product._id}`}
                  className="flex items-center space-x-4 flex-1"
                >
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-blues-800">
                      {item.product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      تعداد: {item.quantity}
                    </p>
                  </div>
                </Link>
                <span className="text-lg font-semibold text-gold-600">
                  {formatPrice(item.price * item.quantity)} تومان
                </span>
              </div>
            ))}
          </div>
        </div>
  
        {/* جمع کل */}
        <div className="bg-blues-50 p-6 rounded-xl">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600">جمع اقلام:</p>
              <p className="text-gray-600">هزینه ارسال:</p>
            </div>
            <div className="text-right">
              <p className="text-gray-800">{formatPrice(order.subtotal)} تومان</p>
              <p className="text-gray-800">{formatPrice(order.shipingCoast)}تومان</p>
            </div>
          </div>
          <div className="border-t border-blues-200 mt-4 pt-4">
            <div className="flex justify-between items-center">
              <p className="text-xl font-bold text-blues-800">مبلغ  پرداختی</p>
              <p className="text-2xl font-bold text-gold-600">
              {formatPrice(order.total)} تومان
              </p>
            </div>
          </div>
        </div>
  
        {/* اطلاعات ارسال */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-blues-800 border-b-2 border-blues-100 pb-2">
            اطلاعات ارسال
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <UserIcon className="w-6 h-6 text-blues-600 mt-1" />
              <div>
                <p className="text-sm text-gray-500">تحویل گیرنده</p>
                <p className="font-medium text-blues-800">{order.name}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <MapPinIcon className="w-6 h-6 text-blues-600 mt-1" />
              <div>
                <p className="text-sm text-gray-500">آدرس</p>
                <p className="font-medium text-blues-800">
               {order.city}،{order.streetAddress}
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <GlobeAltIcon className="w-6 h-6 text-blues-600 mt-1" />
              <div>
                <p className="text-sm text-gray-500">استان</p>
                <p className="font-medium text-blues-800">{order.country}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CreditCardIcon className="w-6 h-6 text-blues-600 mt-1" />
              <div>
                <p className="text-sm text-gray-500">کد پستی</p>
                <p className="font-medium text-blues-800">{order.postalCode}</p>
              </div>
            </div>
          </div>
        </div>
  
        {/* وضعیت سفارش */}
        <div className="bg-green-50 p-6 rounded-xl space-y-4">
          <div className="flex items-center space-x-3">
            <TruckIcon className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-lg font-bold text-green-800">وضعیت سفارش</p>
              <p className="text-green-700">{order.status}</p>
            </div>
          </div>
          {/* <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${getStatusProgress(order.status)}%` }}
            ></div>
          </div> */}
          <div className="grid grid-cols-4 text-sm text-gray-500 mt-2">
            <span className="text-center">ثبت سفارش</span>
            <span className="text-center">آماده‌سازی</span>
            <span className="text-center">در حال ارسال</span>
            <span className="text-center">تحویل شده</span>
          </div>
        </div>
  
        {/* پشتیبانی */}
        <div className="text-center border-t border-blues-100 pt-6">
          <p className="text-gray-600">
            برای هرگونه سوال درباره سفارش با پشتیبانی تماس بگیرید:
          </p>
          <div className="mt-2">
            <a href="tel:02112345678" className="text-blues-600 hover:text-blues-700 font-medium">
   09128586016
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
