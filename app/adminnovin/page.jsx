"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { FiBox, FiFileText, FiSettings, FiShoppingBag, FiGrid } from "react-icons/fi";

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalCategories: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [products, orders, categories] = await Promise.all([
          axios.get("/api/products"),
          axios.get("/api/orders"),
          axios.get("/api/categories")
        ]);

        setStats({
          totalProducts: products.data.length,
          totalOrders: orders.data.length,
          totalCategories: categories.data.categories.length,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  const menuItems = [
    {
      title: "محصولات",
      icon: FiBox,
      link: "/adminnovin/products",
      stat: stats.totalProducts,
      color: "from-blue-600 to-blue-400"
    },
    {
      title: "سفارشات",
      icon: FiShoppingBag,
      link: "/adminnovin/orders",
      stat: stats.totalOrders,
      color: "from-green-600 to-green-400"
    },
    {
      title: "دسته‌بندی‌ها",
      icon: FiGrid,
      link: "/adminnovin/categories",
      stat: stats.totalCategories,
      color: "from-purple-600 to-purple-400"
    },
    {
      title: "بلاگ",
      icon: FiFileText,
      link: "/adminnovin/blog",
      color: "from-yellow-600 to-yellow-400"
    },
    {
      title: "تنظیمات",
      icon: FiSettings,
      link: "/adminnovin/settings",
      color: "from-red-600 to-red-400"
    }
  ];

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          خوش آمدید {session?.user?.name}! 👋
        </h1>
        <p className="text-gray-600">به پنل مدیریت نوین پلکسی خوش آمدید. در اینجا می‌توانید محتوای سایت را مدیریت کنید.</p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
  {menuItems.map((item) => (
          <article
            key={item.title}
            className="w-full"
            aria-label={item.title}
          >
            <Link href={item.link}>
              <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 cursor-pointer transform transition-transform hover:scale-105 h-full flex flex-col">
                <div className={`rounded-full w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 flex items-center justify-center bg-gradient-to-r ${item.color}`}>
                  <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">{item.title}</h3>
                {item.stat !== undefined && (
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">{item.stat}</p>
                )}
                <div className="mt-auto pt-4">
                  <span className="text-sm text-blue-600 hover:text-blue-800">
                    مشاهده بیشتر →
                  </span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">آخرین فعالیت‌ها</h2>
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center mb-2 sm:mb-0">
              <span className="w-2 h-2 bg-green-500 rounded-full ml-3 sm:ml-0 mr-3"></span>
              <span className="text-gray-600">محصول جدید اضافه شد</span>
            </div>
            <span className="text-sm text-gray-500 mt-2 sm:mt-0">چند دقیقه پیش</span>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center mb-2 sm:mb-0">
              <span className="w-2 h-2 bg-blue-500 rounded-full ml-3 sm:ml-0 mr-3"></span>
              <span className="text-gray-600">سفارش جدید ثبت شد</span>
            </div>
            <span className="text-sm text-gray-500 mt-2 sm:mt-0">۱ ساعت پیش</span>
          </div>
        </div>
      </div>
    </div>
  );
}