"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronDown,
  ChevronRight,
  Package, 
  Loader2, 
  Grid3X3,
  ShoppingBag,
  X
} from "lucide-react";
import axios from "axios";

const ProductDrawer = ({ isOpen, setIsOpen }) => {
  const [categories, setCategories] = useState([]);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [expandedCategories, setExpandedCategories] = useState(new Set());

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/categories?includeChildren=true");
        // Filter only product type categories
        const productCategories = res.data.categories?.filter(cat => cat.type === 'product') || [];
        setCategories(productCategories);
        
        // Auto-select first category
        if (productCategories.length > 0) {
          setHoveredCategory(productCategories[0]);
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

  // Toggle category expansion
  const toggleCategory = (categoryId, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

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
      } else if (e.key === 'Enter' && hoveredCategory) {
        setIsOpen(false);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, categories, selectedIndex, hoveredCategory, setIsOpen]);

  const getItemIcon = (category) => {
    if (category.icon) {
      return <Image src={category.icon} alt="" width={24} height={24} className="w-6 h-6" />;
    }
    return <Package className="w-6 h-6 text-blue-600" />;
  };

  const renderTreeItem = (category, level = 0) => {
    const hasChildren = category.children && category.children.length > 0;
    const isExpanded = expandedCategories.has(category._id);
    
    return (
      <div key={category._id} className="select-none">
        <div
          className={`
            flex items-center gap-3 p-3 rounded-lg cursor-pointer group relative
            transition-all duration-300 ease-out
            ${level > 0 ? 'mr-6' : ''}
            ${hoveredCategory?._id === category._id 
              ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-r-4 border-blue-500 shadow-sm' 
              : 'hover:bg-gray-50'
            }
          `}
          onMouseEnter={() => setHoveredCategory(category)}
          onClick={(e) => {
            if (hasChildren) {
              toggleCategory(category._id, e);
            } else {
              setIsOpen(false);
              window.location.href = `/products/category/${category.slug}`;
            }
          }}
        >
          {/* Expansion Toggle Button */}
          {hasChildren && (
            <button
              onClick={(e) => toggleCategory(category._id, e)}
              className="flex items-center justify-center w-5 h-5 rounded-full hover:bg-blue-100 transition-colors"
            >
              {isExpanded ? (
                <ChevronDown className="w-3 h-3 text-gray-600" />
              ) : (
                <ChevronRight className="w-3 h-3 text-gray-600" />
              )}
            </button>
          )}

          {/* Category Icon */}
          <div className="flex-shrink-0">
            {getItemIcon(category)}
          </div>

          {/* Category Name */}
          <div className="flex-1 min-w-0">
            <h3 className={`
              font-semibold text-sm truncate transition-colors
              ${hoveredCategory?._id === category._id ? 'text-blue-700' : 'text-gray-800'}
              group-hover:text-blue-600
            `}>
              {category.name || category.title}
            </h3>
            
            {category.children?.length > 0 && (
              <p className="text-xs text-gray-500 mt-0.5">
                {category.children.length} زیرمجموعه
              </p>
            )}
          </div>

          {/* Navigation Arrow for Links */}
          {!hasChildren && (
            <ChevronLeft className={`
              w-4 h-4 transition-all duration-300
              ${hoveredCategory?._id === category._id ? 'text-blue-600 -translate-x-1' : 'text-gray-400'}
              group-hover:text-blue-600 group-hover:-translate-x-1
            `} />
          )}

          {/* Hover Effect */}
          <AnimatePresence>
            {hoveredCategory?._id === category._id && (
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                exit={{ opacity: 0, scaleX: 0 }}
                className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full origin-top"
              />
            )}
          </AnimatePresence>
        </div>

        {/* Children Categories */}
        <AnimatePresence>
          {hasChildren && isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="ml-4 border-r border-gray-200 pl-2">
                {category.children.map(child => renderTreeItem(child, level + 1))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="relative z-50">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed left-0 top-0 h-full w-full max-w-md bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg">
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">محصولات</h2>
                    <p className="text-sm text-gray-500">
                      {categories.length} دسته‌بندی محصول
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-red-100 hover:text-red-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Categories Tree */}
            <div className="overflow-y-auto h-[calc(100vh-80px)] p-6">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="flex flex-col items-center gap-3">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                    <p className="text-gray-500 text-sm">در حال بارگذاری...</p>
                  </div>
                </div>
              ) : categories.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                  <p className="text-gray-500 text-lg font-medium mb-2">دسته‌بندی محصولی یافت نشد</p>
                  <p className="text-gray-400 text-sm">لطفاً بعداً تلاش کنید</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {categories.map(category => renderTreeItem(category))}
                </div>
              )}

              {/* Category Details Panel */}
              {!loading && hoveredCategory && categories.length > 0 && (
                <motion.div
                  key={hoveredCategory._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 p-3 bg-white rounded-lg shadow-sm">
                      {getItemIcon(hoveredCategory)}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 mb-2">
                        {hoveredCategory.name || hoveredCategory.title}
                      </h3>
                      
                      {hoveredCategory.description && (
                        <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                          {hoveredCategory.description}
                        </p>
                      )}
                      
                      <div className="flex flex-wrap gap-3">
                        {hoveredCategory.children?.length > 0 && (
                          <div className="flex items-center gap-1 text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                            <Grid3X3 className="w-3 h-3" />
                            {hoveredCategory.children.length} زیرمجموعه
                          </div>
                        )}
                        
                        <div className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                          <ShoppingBag className="w-3 h-3" />
                          محصول
                        </div>
                      </div>
                      
                      <Link
                        href={`/products/category/${hoveredCategory.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300"
                      >
                        مشاهده محصولات
                        <ChevronLeft className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProductDrawer;
