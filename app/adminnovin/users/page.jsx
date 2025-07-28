"use client";
import { useState } from "react";
import {
  Search,
  Mail,
  Phone,
  Calendar,
  MapPin,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
} from "lucide-react";
import Image from "next/image";

const UserRow = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <Image
            src={user.avatar}
            alt={user.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <h3 className="font-medium text-gray-900">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-4 text-sm text-gray-500">{user.phone}</td>
      <td className="px-4 py-4 text-sm text-gray-500">
        {user.totalOrders} سفارش
      </td>
      <td className="px-4 py-4 text-sm text-gray-500">
        {user.totalSpent.toLocaleString()} تومان
      </td>
      <td className="px-4 py-4 text-sm text-gray-500">{user.lastOrder}</td>
      <td className="px-4 py-4">
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <MoreVertical className="w-5 h-5 text-gray-500" />
          </button>

          {isMenuOpen && (
            <div className="absolute left-0 mt-2 w-48 rounded-lg bg-white shadow-lg border border-gray-200 py-1 z-10">
              <button
                className="w-full px-4 py-2 text-sm text-right text-gray-700 hover:bg-gray-100"
                onClick={() => {/* View Profile Logic */}}
              >
                مشاهده پروفایل
              </button>
              <button
                className="w-full px-4 py-2 text-sm text-right text-gray-700 hover:bg-gray-100"
                onClick={() => {/* Edit User Logic */}}
              >
                ویرایش کاربر
              </button>
              <button
                className="w-full px-4 py-2 text-sm text-right text-red-600 hover:bg-red-50"
                onClick={() => {/* Delete User Logic */}}
              >
                حذف کاربر
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

export default function UsersManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState("همه");

  // Dummy Data
  const users = [
    {
      id: 1,
      name: "علی محمدی",
      email: "ali@example.com",
      phone: "09123456789",
      avatar: "/profile_result.webp",
      totalOrders: 12,
      totalSpent: 15400000,
      lastOrder: "1402/10/15",
    },
    {
      id: 2,
      name: "مریم احمدی",
      email: "maryam@example.com",
      phone: "09123456788",
      avatar: "/profile_result.webp",
      totalOrders: 8,
      totalSpent: 9800000,
      lastOrder: "1402/10/12",
    },
    // ... more users
  ];

  const filters = ["همه", "جدید", "فعال", "غیرفعال"];

  const stats = [
    {
      title: "کل کاربران",
      value: "1,234",
      icon: <Mail className="w-5 h-5" />,
    },
    {
      title: "کاربران جدید",
      value: "48",
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      title: "سفارشات کل",
      value: "3,456",
      icon: <ShoppingBag className="w-5 h-5" />,
    },
    {
      title: "میانگین خرید",
      value: "2.8M تومان",
      icon: <MapPin className="w-5 h-5" />,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">مدیریت کاربران</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-50 rounded-lg">{stat.icon}</div>
              </div>
              <h3 className="text-gray-500 text-sm mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="جستجو در کاربران..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  selectedFilter === filter
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">
                  کاربر
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">
                  شماره تماس
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">
                  تعداد سفارشات
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">
                  مجموع خرید
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">
                  آخرین سفارش
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">
                  عملیات
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <UserRow key={user.id} user={user} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <span className="text-sm text-gray-700">
              صفحه {currentPage} از {5}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === 5}
              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
          <div className="text-sm text-gray-500">
            نمایش {(currentPage - 1) * 10 + 1} تا {currentPage * 10} از {50} کاربر
          </div>
        </div>
      </div>
    </div>
  );
}
