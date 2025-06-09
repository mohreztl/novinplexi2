"use client"
import { FaTimesCircle, FaArrowLeft, FaHeadphones } from 'react-icons/fa';
import { motion } from "framer-motion";
export default function CheckoutCanceled() {
  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden"
    >
      {/* هدر */}
      <div className="bg-red-600 text-white p-6 text-center">
        <div className="flex justify-center text-6xl mb-4">
          <FaTimesCircle className="animate-pulse" />
        </div>
        <h1 className="text-3xl font-bold">پرداخت ناموفق</h1>
      </div>

      {/* محتوای اصلی */}
      <div className="p-8 space-y-6">
        {/* اطلاعات خطا */}
        <div className="text-center space-y-4">
          <div className="text-red-600 text-4xl">
            <FaTimesCircle className="mx-auto" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">
            متاسفانه پرداخت شما انجام نشد
          </h2>
          <p className="text-gray-600 leading-relaxed">
            ممکن است به یکی از دلایل زیر باشد:
          </p>
          <ul className="list-disc text-gray-600 text-right pr-6 space-y-2">
            <li>اطلاعات کارت بانکی نامعتبر است</li>
            <li>موجودی حساب کافی نمی‌باشد</li>
            <li>مشکل موقت در درگاه پرداخت</li>
          </ul>
        </div>

        {/* اطلاعات فنی */}
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-red-600">کد خطا:</span>
            <span className="font-mono text-gray-700">ERR_429_PAYMENT</span>
          </div>
        </div>

        {/* دکمه‌های اقدام */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
      
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <FaArrowLeft />
            <span>بازگشت به فروشگاه</span>
          </button>
          
          <a
            href="tel:02191000000"
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <FaHeadphones />
            <span>تماس با پشتیبانی</span>
          </a>
        </div>

        {/* اطلاعات اضافی */}
        <p className="text-center text-sm text-gray-500 mt-6">
          در صورت کسر وجه از حساب، تا ۷۲ ساعت آینده خودکار برگشت خواهد خورد
        </p>
      </div>
    </motion.div>
  </div>
);
}
