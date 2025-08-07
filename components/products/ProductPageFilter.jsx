import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Filter, 
  Search,
  Grid,
  List,
  Star,
  ChevronDown,
  ChevronUp,
  X
} from "lucide-react";

const ProductPageFilter = ({ 
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  showFilters,
  onToggleFilters
}) => {
  const [openSections, setOpenSections] = useState({
    category: true,
    price: true,
    rating: true
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fa-IR').format(price);
  };

  const sortOptions = [
    { value: 'newest', label: 'جدیدترین' },
    { value: 'price_low', label: 'ارزان‌ترین' },
    { value: 'price_high', label: 'گران‌ترین' },
    { value: 'popular', label: 'محبوب‌ترین' },
    { value: 'rating', label: 'بیشترین امتیاز' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="جستجو در محصولات..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pr-10 pl-4 h-12 border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 rounded-lg"
          />
        </div>

        <div className="flex items-center gap-4">
          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          </div>

          {/* View Mode Toggle */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-3 transition-colors ${
                viewMode === 'grid'
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-3 transition-colors ${
                viewMode === 'list'
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Toggle Filters Button */}
          <Button
            onClick={onToggleFilters}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            فیلترها
            {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Filters Section */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-200 pt-6 overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Category Filter */}
              <div className="space-y-3">
                <button
                  onClick={() => toggleSection('category')}
                  className="flex items-center justify-between w-full text-right"
                >
                  <h3 className="text-lg font-semibold text-gray-900">دسته‌بندی</h3>
                  {openSections.category ? (
                    <ChevronUp className="w-4 h-4 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  )}
                </button>
                
                <AnimatePresence>
                  {openSections.category && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="space-y-2 overflow-hidden"
                    >
                      <button
                        onClick={() => onCategoryChange('')}
                        className={`block w-full text-right px-3 py-2 rounded-lg transition-colors ${
                          selectedCategory === ''
                            ? 'bg-primary-100 text-primary-700 font-medium'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        همه محصولات
                      </button>
                      {categories.map((category) => (
                        <button
                          key={category._id}
                          onClick={() => onCategoryChange(category._id)}
                          className={`block w-full text-right px-3 py-2 rounded-lg transition-colors ${
                            selectedCategory === category._id
                              ? 'bg-primary-100 text-primary-700 font-medium'
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          {category.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Price Range Filter */}
              <div className="space-y-3">
                <button
                  onClick={() => toggleSection('price')}
                  className="flex items-center justify-between w-full text-right"
                >
                  <h3 className="text-lg font-semibold text-gray-900">محدوده قیمت</h3>
                  {openSections.price ? (
                    <ChevronUp className="w-4 h-4 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  )}
                </button>
                
                <AnimatePresence>
                  {openSections.price && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="space-y-4 overflow-hidden"
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>{formatPrice(priceRange[0])} تومان</span>
                          <span>{formatPrice(priceRange[1])} تومان</span>
                        </div>
                        <div className="px-2">
                          <input
                            type="range"
                            min="0"
                            max="10000000"
                            step="100000"
                            value={priceRange[0]}
                            onChange={(e) => onPriceRangeChange([parseInt(e.target.value), priceRange[1]])}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                          />
                          <input
                            type="range"
                            min="0"
                            max="10000000"
                            step="100000"
                            value={priceRange[1]}
                            onChange={(e) => onPriceRangeChange([priceRange[0], parseInt(e.target.value)])}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider mt-2"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Rating Filter */}
              <div className="space-y-3">
                <button
                  onClick={() => toggleSection('rating')}
                  className="flex items-center justify-between w-full text-right"
                >
                  <h3 className="text-lg font-semibold text-gray-900">امتیاز</h3>
                  {openSections.rating ? (
                    <ChevronUp className="w-4 h-4 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  )}
                </button>
                
                <AnimatePresence>
                  {openSections.rating && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="space-y-2 overflow-hidden"
                    >
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <button
                          key={rating}
                          className="flex items-center gap-2 w-full text-right px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < rating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">و بالاتر</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Quick Filters */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">فیلترهای سریع</h3>
                <div className="space-y-2">
                  <Badge 
                    variant="outline" 
                    className="cursor-pointer hover:bg-primary-100 px-3 py-2 text-sm"
                  >
                    🔥 محصولات جدید
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className="cursor-pointer hover:bg-primary-100 px-3 py-2 text-sm"
                  >
                    🎯 تخفیف‌دار
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className="cursor-pointer hover:bg-primary-100 px-3 py-2 text-sm"
                  >
                    ⭐ پرفروش
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className="cursor-pointer hover:bg-primary-100 px-3 py-2 text-sm"
                  >
                    📦 موجود در انبار
                  </Badge>
                </div>
              </div>
            </div>

            {/* Clear Filters */}
            <div className="flex justify-end mt-6 pt-4 border-t border-gray-200">
              <Button
                onClick={() => {
                  onSearchChange('');
                  onCategoryChange('');
                  onPriceRangeChange([0, 10000000]);
                  onSortChange('newest');
                }}
                variant="outline"
                className="flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                پاک کردن فیلترها
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductPageFilter;
