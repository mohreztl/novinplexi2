'use client'
import "./globals.css";
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#f8f9fa] to-[#e9ecef] text-center px-6">
      {/* عنوان 404 با انیمیشن */}
      <motion.h1
        className="text-7xl font-extrabold text-[#31508c] mb-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        404
      </motion.h1>

      {/* پیام خطا */}
      <motion.p
        className="text-2xl font-semibold text-gray-800 mb-2"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        اوه! صفحه مورد نظر پیدا نشد
      </motion.p>
      <motion.p
        className="text-gray-600 mb-6 max-w-md"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        به نظر می‌رسد صفحه‌ای که به دنبال آن هستید حذف شده یا آدرس آن تغییر کرده است.
      </motion.p>

      {/* دکمه بازگشت */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Link href="/" passHref>
          <Button className="bg-[#ffd700] text-[#31508c] hover:bg-yellow-400 text-lg px-6 py-2 rounded-2xl shadow-md">
            <ArrowLeft className="ml-2" size={20} />
            بازگشت به صفحه اصلی
          </Button>
        </Link>
      </motion.div>

      {/* تصویر وکتور با انیمیشن */}
      <motion.div
        className="mt-10"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <img
          src="/logo1.svg"
          alt="تصویر صفحه 404 نوین پلکسی"
          className="w-80 max-w-full mx-auto"
        />
      </motion.div>
    </div>
  )
}
