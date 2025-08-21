"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "../ui/input";
import Link from "next/link";
import Image from "next/image";
import { Star, ChevronLeft, Search, X, Sparkles, TrendingUp, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

const SearchDrawer = ({
  searchOpen,
  searchTerm,
  handleChange,
  handleSearchClose,
  firstTwelveItems = [],
  resultArr = [],
}) => {
  const [isTyping, setIsTyping] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [localQuery, setLocalQuery] = useState(searchTerm.search || "");
  const debounceRef = useRef(null);

  useEffect(() => {
    if (searchTerm.search) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 500);
      return () => clearTimeout(timer);
    }
  }, [searchTerm.search]);

  // sync external searchTerm to localQuery when it changes (e.g., cleared externally)
  useEffect(() => {
    setLocalQuery(searchTerm.search || "");
  }, [searchTerm.search]);

  // debounce local input and call parent handleChange after 300ms
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      // emulate input event shape expected by parent
      handleChange({ target: { name: "search", value: localQuery } });
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localQuery]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setHighlightedIndex((prev) => (prev < firstTwelveItems.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : Math.max(0, firstTwelveItems.length - 1)));
    } else if (e.key === 'Enter') {
      const idx = highlightedIndex >= 0 ? highlightedIndex : 0;
      if (firstTwelveItems[idx]) {
        window.location.href = `/product/${firstTwelveItems[idx].slug}`;
        handleSearchClose();
      }
    }
  };

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-md z-[999] flex items-start justify-center pt-16"
          onClick={handleSearchClose}
        >
          <motion.div
            initial={{ y: -50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -50, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden mx-4 border border-blue-600/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with gradient */}
            <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 p-6 overflow-hidden">
              <div className="relative">
                <div className="mb-4 flex items-center justify-between">
                  <motion.h2
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-2xl font-bold text-white flex items-center gap-2"
                  >
                    <Search className="h-6 w-6" />
                    جستجوی پیشرفته محصولات
                  </motion.h2>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSearchClose}
                    className="rounded-full p-2 text-white/80 hover:bg-white/20 transition-all duration-300"
                  >
                    <X className="h-5 w-5" />
                  </motion.button>
                </div>

                <div className="relative">
                  <motion.div
                    animate={isTyping ? { scale: [1, 1.02, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <Input
                      type="text"
                      name="search"
                      value={localQuery}
                      onChange={(e) => setLocalQuery(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="نام محصول، برند یا دسته‌بندی را جستجو کنید..."
                      className="w-full pl-14 pr-4 py-4 rounded-2xl bg-white/95 backdrop-blur border-none focus:ring-4 focus:ring-white/30 text-gray-800 shadow-xl placeholder:text-gray-400 text-base"
                      autoComplete="off"
                      autoFocus
                      role="combobox"
                      aria-expanded={searchOpen}
                      aria-controls="search-results-list"
                      aria-autocomplete="list"
                      aria-activedescendant={highlightedIndex >= 0 ? `search-result-${highlightedIndex}` : undefined}
                    />
                  </motion.div>

                  <div className="absolute left-4 top-4 flex items-center gap-2">
                    <motion.div animate={isTyping ? { rotate: 360 } : { rotate: 0 }} transition={{ duration: 0.5 }}>
                      <Search className="h-5 w-5 text-blue-600" />
                    </motion.div>
                    {searchTerm.search && (
                      <motion.button
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleChange({ target: { value: "", name: "search" } })}
                        className="rounded-full p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
                      >
                        <X className="h-4 w-4" />
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick filters */}
            {!searchTerm.search && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="px-6 py-3 bg-gray-50 border-b border-gray-100">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500">جستجوهای پرطرفدار:</span>
                  {['گوشی موبایل', 'لپ تاپ', 'هدفون', 'ساعت هوشمند'].map((term, i) => (
                    <motion.button
                      key={term}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleChange({ target: { value: term, name: 'search' } })}
                      className="px-3 py-1 bg-white rounded-full border border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-all flex items-center gap-1"
                    >
                      <TrendingUp className="h-3 w-3" />
                      {term}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Results with animations */}
            <div className="overflow-y-auto max-h-[calc(85vh-200px)] custom-scrollbar">
              {firstTwelveItems.length > 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4" role="listbox" id="search-results-list">
                  {firstTwelveItems.map((item, index) => (
                    <motion.div key={item._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} whileHover={{ y: -2 }}>
                      <Link href={`/product/${item.slug}`} onClick={handleSearchClose} >
                        <div
                          id={`search-result-${index}`}
                          role="option"
                          aria-selected={highlightedIndex === index}
                          className={`group flex items-center gap-4 rounded-xl border p-4 transition-all duration-300 relative overflow-hidden ${highlightedIndex === index ? 'border-blue-600 bg-blue-50/50 shadow-lg' : 'border-gray-200 hover:border-blue-600/50 hover:shadow-md hover:bg-gray-50'}`}
                        >
                        <motion.div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5" initial={{ x: '-100%' }} whileHover={{ x: 0 }} transition={{ duration: 0.3 }} />

                        <div className="relative h-24 w-24 overflow-hidden rounded-lg bg-gray-100 flex-shrink-0">
                          <Image src={item.images?.[0] || '/placeholder.webp'} alt={item.title || item.name || 'محصول'} fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" />
                          {item.discount > 0 && (
                            <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                              {item.discount}%
                            </motion.div>
                          )}
                        </div>

                        <div className="flex-1 relative">
                          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">{item.title || item.name}</h3>

                          <div className="mt-2 flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm text-gray-600">{typeof item.averageRating === 'number' && item.averageRating > 0 ? item.averageRating.toFixed(1) : 'جدید'}</span>
                            </div>

                            {typeof item.stock === 'number' && item.stock > 0 ? (
                              <span className="text-xs text-green-600 flex items-center gap-1"><Package className="h-3 w-3" />موجود</span>
                            ) : (
                              <span className="text-xs text-red-600">ناموجود</span>
                            )}
                          </div>

                          <div className="mt-2 flex items-baseline gap-2">
                            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{new Intl.NumberFormat('fa-IR').format(item.basePrice || item.price || 0)} تومان</span>
                          </div>
                        </div>

                        <motion.div initial={{ x: -10, opacity: 0 }} whileHover={{ x: 0, opacity: 1 }} className="text-blue-600">
                          <ChevronLeft className="h-5 w-5" />
                        </motion.div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              ) : searchTerm.search ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-16">
                  <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center mb-4">
                    <Search className="h-12 w-12 text-blue-600" />
                  </motion.div>
                  <p className="text-gray-600 text-center text-lg">محصولی با عنوان &quot;{searchTerm.search}&quot; پیدا نشد</p>
                  <p className="text-gray-400 text-sm mt-2">لطفاً عبارت دیگری را جستجو کنید</p>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-16">
                  <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center mb-4">
                    <Sparkles className="h-12 w-12 text-blue-600" />
                  </motion.div>
                  <p className="text-gray-600 text-center text-lg">در انتظار جستجوی شما...</p>
                  <p className="text-gray-400 text-sm mt-2">نام محصول مورد نظر را تایپ کنید</p>
                </motion.div>
              )}
            </div>

            <AnimatePresence>
              {firstTwelveItems.length > 0 && resultArr.length > 12 && (
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} className="border-t border-gray-100 p-4 bg-gradient-to-t from-gray-50 to-white">
                  <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl py-3 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <Link href={`/searchedProducts/${searchTerm.search}`} onClick={handleSearchClose} className="flex items-center justify-center gap-2">
                      <span>مشاهده همه {resultArr.length} نتیجه</span>
                      <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1, repeat: Infinity }}>
                        <ChevronLeft className="h-5 w-5" />
                      </motion.div>
                    </Link>
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchDrawer;