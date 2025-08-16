"use client";

import React from 'react';
import Link from 'next/link';
import { Phone, Mail, PaperPlane } from 'lucide-react';

export default function ContactPage() {
  // Replace the placeholders below with your real contact handles
  const whatsappUrl = 'https://wa.me/989123456789'; // replace with country code + number
  const telegramUrl = 'https://t.me/novinplexi'; // replace with your telegram username or channel
  const phoneNumber = 'tel:+989123456789'; // replace with a real phone number
  const emailAddress = 'mailto:info@novinplexi.ir'; // replace with real email

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white p-8">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-10 text-center">
        <h1 className="text-3xl font-extrabold mb-2">نوین پلکسی</h1>
        <p className="text-gray-600 mb-6">فروش ورق‌های اکریلیک پلکسی — تماس با ما از طریق گزینه‌های زیر</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* WhatsApp Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold shadow hover:scale-105 transform transition"
          >
            {/* WhatsApp SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M21 12.4A8.5 8.5 0 1 1 11.6 3" />
              <path d="M21 12.4v3.2a1 1 0 0 1-1.2 1c-1.1-.2-2.3-.6-3.2-1.2a8 8 0 0 1-3.2-3.2c-.6-.9-1-2.1-1.2-3.2A1 1 0 0 1 9.4 8h3.2" />
            </svg>
            <span>واتس‌اپ</span>
          </a>

          {/* Phone Button */}
          <a
            href={phoneNumber}
            aria-label="Call us"
            className="flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow hover:scale-105 transform transition"
          >
            <Phone className="w-5 h-5" />
            <span>تماس با ما</span>
          </a>

          {/* Telegram Button */}
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
            className="flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow hover:scale-105 transform transition"
          >
            {/* Telegram SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 240 240" fill="none" className="text-white">
              <path d="M20 120c0 55.2 44.8 100 100 100s100-44.8 100-100S175.2 20 120 20 20 64.8 20 120z" fill="currentColor" opacity="0.06" />
              <path d="M41.6 121.6l29.6-10.4 49.6 23.2 70.4-43.2L41.6 121.6z" fill="currentColor" />
            </svg>
            <span>تلگرام</span>
          </a>
        </div>

        <p className="text-xs text-gray-400 mt-6">آدرس‌ها و شماره‌ها را در فایل صفحه جایگزین کنید تا لینک‌ها به درستی کار کنند.</p>

      </div>
    </main>
  );
}
