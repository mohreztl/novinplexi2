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
  Home,
  Package,
  Wrench,
  Info,
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  BookOpen,
  ChevronRight
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const MobileMenu = ({
  isOpen,
  closeMenu,
  searchOpen,
  setSearchOpen,
  searchTerm,
  setSearchTerm,
  resultArr = [],
  handleChange,
  handleSearchClose,
  firstTwelveItems = [],
  categories = [],
  services = [],
  session,
  user,
}) => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [expandedServices, setExpandedServices] = useState(false);
  const { data: sessionData } = useSession();

  // Use provided handleChange or create local one
  const handleSearchChange = handleChange || ((e) => setSearchTerm({ search: e.target.value }));
  
  // Use provided handleSearchClose or create local one
  const handleCloseSearch = handleSearchClose || (() => setSearchOpen(false));

  const toggleCategory = (slug) => {
    setExpandedCategory((prev) => (prev === slug ? null : slug));
    setExpandedServices(false);
  };

  const toggleServices = () => {
    setExpandedServices((prev) => !prev);
    setExpandedCategory(null);
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
      <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-50 to-indigo-50 backdrop-blur-sm border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">نوین پلکسی</h2>
        </div>
        <button 
          onClick={closeMenu} 
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-gray-600 shadow-md transition-all hover:bg-red-50 hover:text-red-600 hover:shadow-lg"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Search Section */}
      <div className="p-4 border-b bg-gray-50">
        <div className="relative">
          <Input
            value={searchTerm?.search || ""}
            onChange={handleSearchChange}
            placeholder="جستجوی محصولات..."
            className="pl-10 pr-4 h-12 bg-white border-2 border-gray-200 rounded-full focus:border-blue-600 focus:shadow-md transition-all"
            onClick={() => setSearchOpen(true)}
            type="text"
            name="search"
            id="search"
          />
          <Search className="absolute left-3 top-3.5 h-5 w-5 text-blue-600/70" />
        </div>
      </div>

      {/* Search Results Panel */}
      {searchOpen && (
        <div className="flex flex-col h-[calc(100vh-128px)]">
          <div className="sticky top-0 z-10 bg-white px-4 py-3 border-b flex justify-between items-center shadow-sm">
            <span className="font-medium text-blue-600">نتایج جستجو</span>
            <button
              onClick={handleCloseSearch}
              className="text-sm text-blue-600 hover:text-indigo-600 flex items-center gap-1 transition"
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
                    onClick={() => {
                      handleCloseSearch();
                      closeMenu();
                    }}
                    className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:border-[#31508c]/20 transition-all group"
                  >
                    <div className="w-20 h-20 relative flex-shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src={prod.images?.[0] || "/placeholder.jpg"}
                        alt={prod.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800 line-clamp-1">{prod.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">{prod.brand}</p>
                      <p className="mt-2 font-bold text-[#31508c]">
                        {new Intl.NumberFormat('fa-IR').format(prod.price)} تومان
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-[#31508c] transition-colors" />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Search className="h-10 w-10 text-gray-400" />
                </div>
                <p className="text-lg font-medium">موردی یافت نشد</p>
                <p className="text-sm mt-1">عبارت دیگری را امتحان کنید</p>
              </div>
            )}
          </div>

          {resultArr.length > 12 && (
            <div className="sticky bottom-0 bg-white p-4 border-t shadow-lg">
              <Link 
                href={`/searchedProducts/${searchTerm?.search}`} 
                onClick={() => {
                  handleCloseSearch();
                  closeMenu();
                }}
                className="block w-full"
              >
                <Button className="w-full bg-gradient-to-r from-[#31508c] to-[#1e3a6f] hover:from-[#1e3a6f] hover:to-[#31508c] text-white py-3 shadow-md hover:shadow-lg transition-all">
                  نمایش همه نتایج ({resultArr.length})
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Main Menu Content */}
      {!searchOpen && (
        <div className="h-[calc(100vh-128px)] overflow-y-auto pb-4">
          {/* User Section - Top */}
          {session && (
            <div className="mx-4 mt-4 p-4 rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100">
              <Link
                href="/profile"
                onClick={closeMenu}
                className="flex items-center gap-3"
              >
                <div className="relative w-12 h-12">
                  <Image
                    src={user?.image || "/profile.jpg"}
                    alt="Profile"
                    fill
                    className="rounded-full object-cover border-2 border-white shadow-md"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{session.user.name}</p>
                  <p className="text-sm text-gray-600">مشاهده پروفایل</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-500" />
              </Link>
            </div>
          )}

          <ul className="px-4 py-4 space-y-2">
            {/* Home */}
            <li>
              <Link
                href="/"
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 text-gray-700 hover:text-[#31508c] transition-all group"
              >
                <Home className="h-5 w-5 text-[#31508c] group-hover:scale-110 transition-transform" />
                <span className="font-medium">صفحه اصلی</span>
              </Link>
            </li>

            {/* Products Section */}
            <li>
              <div
                className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 cursor-pointer transition-all group"
                onClick={() => toggleCategory('products')}
              >
                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 text-[#31508c] group-hover:scale-110 transition-transform" />
                  <span className="font-medium text-gray-700 group-hover:text-[#31508c]">محصولات</span>
                </div>
                {expandedCategory === 'products' ? (
                  <ChevronUp className="h-5 w-5 text-[#31508c]" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400 group-hover:text-[#31508c]" />
                )}
              </div>
              {expandedCategory === 'products' && (
                <ul className="ml-6 mt-2 space-y-1 border-r-2 border-[#31508c]/20 pr-4">
                  {categories.map((cat) => (
                    <li key={cat._id}>
                      <Link
                        href={`/products/category/${cat.slug}/1`}
                        onClick={closeMenu}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-[#31508c] hover:bg-blue-50 rounded-lg transition-all"
                      >
                        <ChevronRight className="h-4 w-4" />
                        {cat.title || cat.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* Services Section */}
            <li>
              <div
                className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 cursor-pointer transition-all group"
                onClick={toggleServices}
              >
                <div className="flex items-center gap-3">
                  <Wrench className="h-5 w-5 text-[#31508c] group-hover:scale-110 transition-transform" />
                  <span className="font-medium text-gray-700 group-hover:text-[#31508c]">خدمات</span>
                </div>
                {expandedServices ? (
                  <ChevronUp className="h-5 w-5 text-[#31508c]" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400 group-hover:text-[#31508c]" />
                )}
              </div>
              {expandedServices && services && services.length > 0 && (
                <ul className="ml-6 mt-2 space-y-1 border-r-2 border-[#31508c]/20 pr-4">
                  {services.map((service) => (
                    <li key={service._id}>
                      <Link
                        href={`/services/${service.slug}`}
                        onClick={closeMenu}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-[#31508c] hover:bg-blue-50 rounded-lg transition-all"
                      >
                        <ChevronRight className="h-4 w-4" />
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* Blog */}
            <li>
              <Link
                href="/blog"
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 text-gray-700 hover:text-[#31508c] transition-all group"
              >
                <BookOpen className="h-5 w-5 text-[#31508c] group-hover:scale-110 transition-transform" />
                <span className="font-medium">وبلاگ</span>
              </Link>
            </li>

            {/* About */}
            <li>
              <Link
                href="/about"
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 text-gray-700 hover:text-[#31508c] transition-all group"
              >
                <Info className="h-5 w-5 text-[#31508c] group-hover:scale-110 transition-transform" />
                <span className="font-medium">درباره ما</span>
              </Link>
            </li>

            {/* Contact */}
            <li>
              <Link
                href="/contact"
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 text-gray-700 hover:text-[#31508c] transition-all group"
              >
                <Phone className="h-5 w-5 text-[#31508c] group-hover:scale-110 transition-transform" />
                <span className="font-medium">تماس با ما</span>
              </Link>
            </li>
          </ul>

          {/* Contact Info Box */}
          <div className="mx-4 mt-6 p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4">اطلاعات تماس</h3>
            <div className="space-y-3">
              <a href="tel:+982112345678" className="flex items-center gap-3 text-sm text-gray-600 hover:text-[#31508c] transition-colors">
                <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <Phone className="h-4 w-4 text-[#31508c]" />
                </div>
                <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
              </a>
              <a href="mailto:info@novinplexi.com" className="flex items-center gap-3 text-sm text-gray-600 hover:text-[#31508c] transition-colors">
                <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <Mail className="h-4 w-4 text-[#31508c]" />
                </div>
                <span>info@novinplexi.com</span>
              </a>
              <div className="flex items-start gap-3 text-sm text-gray-600">
                <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <MapPin className="h-4 w-4 text-[#31508c]" />
                </div>
                <span>تهران، خیابان ولیعصر</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <Clock className="h-4 w-4 text-[#31508c]" />
                </div>
                <span>شنبه تا پنجشنبه: ۹ - ۱۸</span>
              </div>
            </div>
          </div>

          {/* Cart Button */}
          <div className="mx-4 mt-4">
            <Link
              href="/cart"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#31508c] to-[#1e3a6f] py-3 text-white shadow-md hover:shadow-lg transition-all"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="font-medium">مشاهده سبد خرید</span>
            </Link>
          </div>

          {/* Auth Section - Bottom */}
          <div className="mx-4 mt-4 mb-4">
            {session ? (
              <Button
                onClick={() => {
                  signOut();
                  closeMenu();
                }}
                variant="outline"
                className="w-full flex items-center gap-2 text-gray-700 border-2 border-gray-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600 rounded-xl py-3 transition-all"
              >
                <LogOut className="h-5 w-5" />
                خروج از حساب
              </Button>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link href="/login" onClick={closeMenu} className="block">
                  <Button
                    variant="outline"
                    className="w-full flex items-center gap-2 border-2 border-gray-200 hover:border-[#31508c] hover:text-[#31508c] rounded-xl py-3 transition-all"
                  >
                    <LogIn className="h-5 w-5" />
                    ورود
                  </Button>
                </Link>
                <Link href="/register" onClick={closeMenu} className="block">
                  <Button className="w-full flex items-center gap-2 bg-gradient-to-r from-[#31508c] to-[#1e3a6f] hover:from-[#1e3a6f] hover:to-[#31508c] text-white rounded-xl py-3 shadow-md hover:shadow-lg transition-all">
                    <UserPlus className="h-5 w-5" />
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