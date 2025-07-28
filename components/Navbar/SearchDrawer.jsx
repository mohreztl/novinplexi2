"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "../ui/input";
import Link from "next/link";
import Image from "next/image";
import { Star, ChevronLeft, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const SearchDrawer = ({
  searchOpen,
  searchTerm,
  handleChange,
  handleSearchClose,
  firstTwelveItems,
  resultArr,
}) => {
  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[999] flex items-start justify-center pt-20"
          onClick={handleSearchClose}
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden mx-4 border border-[#31508c]/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#31508c] to-[#2a4374] p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">جستجوی محصولات</h2>
                <button
                  onClick={handleSearchClose}
                  className="rounded-full p-2 text-white/80 hover:bg-white/10 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="relative">
                <Input
                  type="text"
                  name="search"
                  value={searchTerm.search}
                  onChange={handleChange}
                  placeholder="نام محصول را وارد کنید..."
                  className="w-full pl-12 pr-4 py-3 rounded-full bg-white/95 border-none focus:ring-2 focus:ring-[#ffd700] text-[#31508c] shadow-lg placeholder:text-gray-400"
                  autoComplete="off"
                  autoFocus
                />
                <div className="absolute left-4 top-3.5 flex items-center space-x-2">
                  <Search className="h-5 w-5 text-[#31508c]" />
                  {searchTerm.search && (
                    <button
                      onClick={() => handleChange({ target: { value: "", name: "search" } })}
                      className="rounded-full p-1 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="overflow-y-auto max-h-[60vh] py-4">
              {firstTwelveItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                  {firstTwelveItems.map((item) => (
                    <Link
                      key={item._id}
                      href={`/product/${item.slug}`}
                      className="group flex items-center space-x-4 rounded-lg border border-gray-100 p-3 hover:bg-gray-50 transition-colors"
                      onClick={handleSearchClose}
                    >
                      <div className="relative h-20 w-20 overflow-hidden rounded-lg">
                        <Image
                          src={item.images[0]}
                          alt={item.name}
                          layout="fill"
                          objectFit="cover"
                          className="transition-transform group-hover:scale-110"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 group-hover:text-[#31508c]">
                          {item.name}
                        </h3>
                        <div className="mt-1 flex items-center">
                          <Star className="h-4 w-4 text-yellow-400" />
                          <span className="ml-1 text-sm text-gray-600">
                            {item.rating ? item.rating.toFixed(1) : "جدید"}
                          </span>
                        </div>
                        <div className="mt-1 text-sm font-medium text-[#31508c]">
                          {item.price.toLocaleString()} تومان
                        </div>
                      </div>
                      <ChevronLeft className="h-5 w-5 text-gray-400 group-hover:text-[#31508c]" />
                    </Link>
                  ))}
                </div>
              ) : searchTerm.search ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <Search className="h-12 w-12 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-center">
                    محصولی با این نام پیدا نشد
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="h-24 w-24 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                    <Search className="h-12 w-12 text-[#31508c]" />
                  </div>
                  <p className="text-gray-500 text-center">
                    برای جستجو تایپ کنید...
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            {firstTwelveItems.length > 0 && resultArr.length > 12 && (
              <div className="border-t border-gray-100 p-4">
                <Button
                  asChild
                  className="w-full bg-[#31508c] hover:bg-[#2a4374] text-white rounded-full"
                >
                  <Link
                    href={`/searchedProducts/${searchTerm.search}`}
                    onClick={handleSearchClose}
                  >
                    مشاهده همه نتایج ({resultArr.length})
                  </Link>
                </Button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchDrawer;