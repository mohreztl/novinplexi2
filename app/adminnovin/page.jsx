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
      link: "/adminnovin/category",
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
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          خوش آمدید {session?.user?.name}! 👋
        </h1>
        <p className="text-gray-600">به پنل مدیریت نوین پلکسی خوش آمدید. در اینجا می‌توانید محتوای سایت را مدیریت کنید.</p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {menuItems.map((item, index) => (
          <div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={item.link}>
              <div className="bg-white rounded-lg shadow-lg p-6 cursor-pointer transform transition-transform hover:scale-105">
                <div className={`rounded-full w-12 h-12 mb-4 flex items-center justify-center bg-gradient-to-r ${item.color}`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                {item.stat !== undefined && (
                  <p className="text-2xl font-bold text-gray-900">{item.stat}</p>
                )}
                <div className="mt-4">
                  <span className="text-sm text-blue-600 hover:text-blue-800">
                    مشاهده بیشتر →
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">آخرین فعالیت‌ها</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              <span className="text-gray-600">محصول جدید اضافه شد</span>
            </div>
            <span className="text-sm text-gray-500">چند دقیقه پیش</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              <span className="text-gray-600">سفارش جدید ثبت شد</span>
            </div>
            <span className="text-sm text-gray-500">۱ ساعت پیش</span>
          </div>
        </div>
      </div>
    </div>
  );
}