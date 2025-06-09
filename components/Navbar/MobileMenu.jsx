"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import {
  ChevronDown,
  ChevronUp,
  X,
  Search,
  ShoppingCart,
  LogOut,
  LogIn,
  UserPlus,
  User,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const MobileMenu = ({
  isOpen,
  setMenuClose,
  searchOpen,
  setSearchOpen,
  searchTerm,
  resultArr,
  handleChange,
  handleSearchClose,
  firstTwelveItems,
  categories = [],
  session,
  user,
}) => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const { data: sessionData } = useSession();

  const toggleCategory = (slug) => {
    setExpandedCategory((prev) => (prev === slug ? null : slug));
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-white transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b p-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#31508c]">منو</h2>
        <button onClick={setMenuClose} className="text-gray-600 hover:text-[#ffd700] transition">
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Search Section */}
      <div className="p-4 border-b">
        <div className="relative">
          <Input
            value={searchTerm.search}
            onChange={handleChange}
            placeholder="جستجوی محصولات..."
            className="pl-10 bg-gray-50 border-gray-200 focus:border-[#31508c]"
            onClick={() => setSearchOpen(true)}
            type="text"
            name="search"
            id="search"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-[#31508c]/70" />
        </div>
      </div>

      {/* Search Results Panel */}
      {searchOpen && (
        <div className="flex flex-col h-[calc(100vh-112px)]">
          <div className="sticky top-0 z-10 bg-white px-4 py-3 border-b flex justify-between items-center">
            <span className="font-medium text-[#31508c]">نتایج جستجو</span>
            <button
              onClick={handleSearchClose}
              className="text-sm text-[#31508c] hover:text-[#ffd700] flex items-center gap-1 transition"
            >
              <X className="w-4 h-4" />
              بستن
            </button>
          </div>

          <div className="overflow-y-auto px-4 py-2 flex-1">
            {firstTwelveItems?.length > 0 ? (
              <div className="grid grid-cols-1 gap-3 py-2">
                {firstTwelveItems.map((prod) => (
                  <Link
                    key={prod._id}
                    href={`/product/${prod.slug}`}
                    onClick={handleSearchClose}
                    className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition"
                  >
                    <div className="w-20 h-20 relative flex-shrink-0">
                      <Image
                        src={prod.images[0] || "/placeholder.jpg"}
                        alt={prod.name}
                        fill
                        className="rounded-md object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800 line-clamp-1">{prod.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">{prod.brand}</p>
                      <p className="mt-1 font-bold text-[#31508c]">
                        {new Intl.NumberFormat('fa-IR').format(prod.price)} تومان
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-gray-500">
                <Search className="h-8 w-8 mb-2" />
                <p>موردی یافت نشد</p>
              </div>
            )}
          </div>

          {resultArr.length > 12 && (
            <div className="sticky bottom-0 bg-white p-4 border-t">
              <Link 
                href={`/searchedProducts/${searchTerm?.search}`} 
                onClick={handleSearchClose}
                className="block w-full"
              >
                <Button className="w-full bg-[#31508c] hover:bg-[#31508c]/90 text-white py-3">
                  نمایش همه نتایج ({resultArr.length})
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Main Menu Content */}
      {!searchOpen && (
        <div className="h-[calc(100vh-112px)] overflow-y-auto pb-4">
          <ul className="px-4 py-2 space-y-1">
            <li>
              <Link
                href="/"
                onClick={setMenuClose}
                className="flex items-center px-3 py-3 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-[#31508c]"
              >
                صفحه اصلی
              </Link>
            </li>

            {/* Categories Section */}
            <li className="mt-2">
              <div className="px-3 py-2 text-sm font-medium text-gray-500">
                دسته‌بندی‌ها
              </div>
              <ul className="mt-1 space-y-1">
                {categories.map((cat) => (
                  <li key={cat._id}>
                    <div
                      className="flex items-center justify-between px-3 py-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => toggleCategory(cat.slug)}
                    >
                      <span className="text-gray-700">{cat.title}</span>
                      {cat.children?.length > 0 && (
                        expandedCategory === cat.slug ? (
                          <ChevronUp className="h-4 w-4 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-gray-400" />
                        )
                      )}
                    </div>
                    {expandedCategory === cat.slug && cat.children?.length > 0 && (
                      <ul className="ml-4 mt-1 space-y-1 border-r-2 border-[#31508c]/20 pr-2">
                        {cat.children.map((child) => (
                          <li key={child._id}>
                            <Link
                              href={`/products/category/${child.slug}/1`}
                              onClick={setMenuClose}
                              className="block px-3 py-2 text-sm text-gray-600 hover:text-[#31508c] hover:bg-gray-50 rounded-lg"
                            >
                              {child.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </li>

            <li>
              <Link
                href="/blog"
                onClick={setMenuClose}
                className="flex items-center px-3 py-3 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-[#31508c]"
              >
                وبلاگ
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                onClick={setMenuClose}
                className="flex items-center px-3 py-3 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-[#31508c]"
              >
                تماس با ما
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                onClick={setMenuClose}
                className="flex items-center px-3 py-3 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-[#31508c]"
              >
                درباره ما
              </Link>
            </li>
          </ul>

          {/* User Section */}
          <div className="mt-6 px-4">
            {session ? (
              <div className="space-y-3">
                <Link
                  href="/profile"
                  onClick={setMenuClose}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-50"
                >
                  <div className="relative w-10 h-10">
                    <Image
                      src={user?.image || "/profile.jpg"}
                      alt="Profile"
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{session.user.name}</p>
                    <p className="text-xs text-gray-500">مشاهده پروفایل</p>
                  </div>
                </Link>
                <Button
                  onClick={() => signOut()}
                  variant="outline"
                  className="w-full flex items-center gap-2 text-gray-700 border-gray-200 hover:border-red-100 hover:bg-red-50 hover:text-red-600"
                >
                  <LogOut className="h-4 w-4" />
                  خروج از حساب
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link href="/login" onClick={setMenuClose} className="block">
                  <Button
                    variant="outline"
                    className="w-full flex items-center gap-2 border-gray-200"
                  >
                    <LogIn className="h-4 w-4" />
                    ورود
                  </Button>
                </Link>
                <Link href="/register" onClick={setMenuClose} className="block">
                  <Button className="w-full flex items-center gap-2 bg-[#31508c] hover:bg-[#31508c]/90">
                    <UserPlus className="h-4 w-4" />
                    ثبت نام
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;