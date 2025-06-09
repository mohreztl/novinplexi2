
import Link from "next/link";
import { Suspense } from "react";
import OrderIdComponent from "./OrderIdComponent";
import PaymentStatus from "./PaymentStatus";

export default function CheckoutSuccess() {




  
  return (

<div className="min-h-screen bg-blues-50 flex flex-col justify-center items-center px-4 py-8">
  <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 md:p-12 transition-all duration-300 hover:shadow-xl">
    {/* هدر با انیمیشن */}
    <div className="animate-fade-in-up">
      <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-gradient-to-br from-gold-400 to-gold-600">
        <svg
          className="h-16 w-16 text-white animate-checkmark"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
    </div>

    {/* متن تبریک */}
    <div className="mt-8 text-center space-y-2">
      <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blues-600 to-gold-500 bg-clip-text text-transparent">
        پرداخت موفقیت‌آمیز!
      </h1>
      <p className="text-lg text-gray-600 mt-2">
        سفارش شما با موفقیت ثبت شد. جزئیات خرید به آدرس ایمیل شما ارسال گردید.
      </p>
    </div>

    {/* کارت اطلاعات پرداخت */}
    <div className="mt-8 bg-blues-50 rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <svg className="w-6 h-6 text-blues-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span className="font-medium text-blues-800">وضعیت پرداخت:</span>
        </div>
        <Suspense fallback={
          <div className="animate-pulse h-4 w-32 bg-gray-200 rounded"></div>
        }>
          <PaymentStatus />
        </Suspense>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <svg className="w-6 h-6 text-blues-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
          </svg>
          <span className="font-medium text-blues-800">شماره سفارش:</span>
        </div>
        <Suspense fallback={
          <div className="animate-pulse h-4 w-48 bg-gray-200 rounded"></div>
        }>
          <OrderIdComponent />
        </Suspense>
      </div>
    </div>

    {/* اطلاعات تکمیلی */}
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
      <div className="p-4 bg-green-50 rounded-lg">
        <p className="text-sm text-green-700">
          تحویل پیش‌بینیشده: 
          <span className="font-bold">۳-۵ روز کاری</span>
        </p>
      </div>
      <div className="p-4 bg-gold-50 rounded-lg">
        <p className="text-sm text-gold-700">
          پشتیبانی ۲۴ ساعته: 
          <a href="tel:02191000000" className="hover:underline">۰۲۱-۹۱۰۰۰۰۰۰</a>
        </p>
      </div>
    </div>

    {/* دکمه‌های اقدام */}
    <div className="mt-8 flex flex-col md:flex-row justify-center gap-4">
      <Link
        href="/orders"
        className="flex-1 px-6 py-3 border border-blues-600 text-blues-600 rounded-lg font-medium hover:bg-blues-50 transition-colors flex items-center justify-center space-x-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
        </svg>
        <span>پیگیری سفارش</span>
      </Link>
      
      <Link
        href="/"
        className="flex-1 px-6 py-3 bg-blues-600 text-white rounded-lg font-medium hover:bg-blues-700 transition-colors flex items-center justify-center space-x-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
        </svg>
        <span>بازگشت به فروشگاه</span>
      </Link>
    </div>

    {/* شبکه‌های اجتماعی */}
    <div className="mt-8 flex justify-center space-x-4">
      <button className="p-2 text-blues-600 hover:text-blues-700 transition-colors">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
        </svg>
      </button>
      {/* آیکون‌های دیگر */}
    </div>
  </div>
</div>
  );
}
