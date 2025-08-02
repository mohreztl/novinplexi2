"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  Sparkles, 
  Package, 
  Loader2, 
  TrendingUp,
  Star,
  Zap,
  Grid3X3,
  ShoppingBag
} from "lucide-react";
import axios from "axios";

const ProductDrawer = ({ isOpen, setIsOpen }) => {
  const [categories, setCategories] = useState([]);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/categories?includeChildren=true");
        setCategories(res.data.categories || []);
        // Auto-select first category
        if (res.data.categories?.length > 0) {
          setHoveredCategory(res.data.categories[0]);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      
      if (e.key === 'ArrowDown') {
        setSelectedIndex(prev => 
          prev < categories.length - 1 ? prev + 1 : 0
        );
        setHoveredCategory(categories[selectedIndex + 1] || categories[0]);
      } else if (e.key === 'ArrowUp') {
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : categories.length - 1
        );
        setHoveredCategory(categories[selectedIndex - 1] || categories[categories.length - 1]);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, categories, selectedIndex, setIsOpen]);

  if (!isOpen) return null;

  const categoryIcons = {
    'الکترونیک': <Zap className="w-4 h-4" />,
    'مد و پوشاک': <ShoppingBag className="w-4 h-4" />,
    'خانه و آشپزخانه': <Grid3X3 className="w-4 h-4" />,
    'default': <Package className="w-4 h-4" />
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-lg shadow-2xl border-t border-gray-100 z-50"
        onMouseLeave={() => setIsOpen(false)}
      >
        {/* Gradient border top */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600" />
        
        <div className="container mx-auto px-4 py-6">
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center py-12"
            >
              <div className="flex flex-col items-center gap-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Loader2 className="w-8 h-8 text-blue-600" />
                </motion.div>
                <span className="text-gray-500">در حال بارگذاری دسته‌بندی‌ها...</span>
              </div>
            </motion.div>
          ) : (
            <div className="flex gap-6">
              {/* Main Categories List */}
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="w-80 border-l border-gray-100"
              >
                <div className="mb-4 px-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-yellow-500" />
                    دسته‌بندی‌های محصولات
                  </h3>
                </div>
                
                <ul className="space-y-1">
                  {categories.map((category, index) => (
                    <motion.li
                      key={category._id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      onMouseEnter={() => {
                        setHoveredCategory(category);
                        setSelectedIndex(index);
                      }}
                      className="relative"
                    >
                      <motion.div
                        className={`
                          flex items-center justify-between px-4 py-3 mx-2 rounded-xl
                          cursor-pointer transition-all duration-300 group
                          ${hoveredCategory?._id === category._id
                            ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-sm"
                            : "hover:bg-gray-50 text-gray-700"
                          }
                        `}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center gap-3">
                          <motion.div
                            animate={hoveredCategory?._id === category._id ? { rotate: 360 } : { rotate: 0 }}
                            transition={{ duration: 0.5 }}
                            className={`
                              p-2 rounded-lg
                              ${hoveredCategory?._id === category._id
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                              }
                            `}
                          >
                            {categoryIcons[category.name] || categoryIcons.default}
                          </motion.div>
                          <div>
                            <span className="font-medium block">{category.name}</span>
                            {category.children?.length > 0 && (
                              <span className="text-xs text-gray-500">
                                {category.children.length} زیردسته
                              </span>
                            )}
                          </div>
                        </div>
                        
                        {category.children?.length > 0 && (
                          <motion.div
                            animate={hoveredCategory?._id === category._id 
                              ? { x: 5, opacity: 1 } 
                              : { x: 0, opacity: 0.5 }
                            }
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </motion.div>
                        )}
                      </motion.div>
                      
                      {/* Active indicator */}
                      <AnimatePresence>
                        {hoveredCategory?._id === category._id && (
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: 4 }}
                            exit={{ width: 0 }}
                            className="absolute right-0 top-2 bottom-2 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"
                          />
                        )}
                      </AnimatePresence>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Sub Categories Grid */}
              <div className="flex-1 px-6">
                <AnimatePresence mode="wait">
                  {hoveredCategory && (
                    <motion.div
                      key={hoveredCategory._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Category Header */}
                      <div className="mb-6">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                          {hoveredCategory.name}
                        </h2>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <TrendingUp className="w-4 h-4" />
                            پرفروش‌ترین‌ها
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            محبوب‌ترین‌ها
                          </span>
                        </div>
                      </div>

                      {/* Sub Categories Grid */}
                      <div className="grid grid-cols-3 gap-6">
                        {hoveredCategory.children?.map((subCategory, index) => (
                          <motion.div
                            key={subCategory._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="space-y-3"
                          >
                            <Link
                              href={`/products/category/${subCategory.slug}`}
                              className="group block"
                              onClick={() => setIsOpen(false)}
                            >
                              <div className="flex items-center gap-2 mb-3">
                                <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full" />
                                <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                                  {subCategory.name}
                                </h3>
                              </div>
                            </Link>
                            
                            {subCategory.children?.length > 0 && (
                              <motion.ul 
                                className="space-y-2 pr-3"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.05 + 0.1 }}
                              >
                                {subCategory.children.slice(0, 5).map((child, childIndex) => (
                                  <motion.li 
                                    key={child._id}
                                    whileHover={{ x: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                  >
                                    <Link
                                      href={`/products/category/${child.slug}`}
                                      className="text-gray-600 hover:text-blue-600 transition-all duration-300 text-sm flex items-center gap-2 group"
                                      onClick={() => setIsOpen(false)}
                                    >
                                      <span className="w-1.5 h-1.5 bg-gray-300 rounded-full group-hover:bg-blue-600 transition-colors" />
                                      {child.name}
                                    </Link>
                                  </motion.li>
                                ))}
                                {subCategory.children.length > 5 && (
                                  <li>
                                    <Link
                                      href={`/products/category/${subCategory.slug}`}
                                      className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                                      onClick={() => setIsOpen(false)}
                                    >
                                      مشاهده همه
                                      <ChevronLeft className="w-3 h-3" />
                                    </Link>
                                  </li>
                                )}
                              </motion.ul>
                            )}
                          </motion.div>
                        ))}
                      </div>

                      {/* Special Offers Banner */}
                      {hoveredCategory.children?.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-white rounded-lg shadow-sm">
                                <Zap className="w-5 h-5 text-blue-600" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-800">پیشنهاد ویژه</h4>
                                <p className="text-sm text-gray-600">تخفیف‌های ویژه در {hoveredCategory.name}</p>
                              </div>
                            </div>
                            <Link
                              href={`/products/category/${hoveredCategory.slug}?offer=true`}
                              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300"
                              onClick={() => setIsOpen(false)}
                            >
                              مشاهده تخفیف‌ها
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductDrawer;