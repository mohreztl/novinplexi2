import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { 
  Filter, 
  Star, 
  Package,
  DollarSign,
  Layers,
  RotateCcw,
  ChevronDown,
  ChevronUp
} from "lucide-react";

const formatPrice = (price) => {
  if (!price && price !== 0) {
    return '0';
  }
  return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
};

const ProductsFilter = ({ 
  categories, 
  filters, 
  onFilterChange, 
  onClearFilters 
}) => {
  const [openSections, setOpenSections] = useState({
    category: false,
    price: false,
    stock: false,
    rating: false
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCategoryChange = (categoryId) => {
    onFilterChange({ category: categoryId });
  };

  const handlePriceChange = (priceRange) => {
    onFilterChange({ priceRange });
  };

  const handleInStockChange = (checked) => {
    onFilterChange({ inStock: checked });
  };

  const formatPrice = (price) => {
    return parseInt(price).toLocaleString();
  };

  return (
    <div className="w-full bg-white border-b border-gray-200 shadow-sm mb-6">
      <div className="container mx-auto px-4 py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary-600" />
            <h3 className="text-lg font-semibold">فیلترهای جستجو</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <RotateCcw className="w-4 h-4 ml-2" />
            پاک کردن فیلترها
          </Button>
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Category Filter */}
          <div className="space-y-2">
            <Button
              variant="ghost"
              onClick={() => toggleSection('category')}
              className="w-full justify-between p-2 h-auto border border-gray-200 hover:border-primary-300"
            >
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-gray-600" />
                <span className="font-medium">دسته‌بندی</span>
              </div>
              {openSections.category ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Button>
            
            <AnimatePresence>
              {openSections.category && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2 max-h-48 overflow-y-auto bg-gray-50 p-3 rounded-lg border"
                >
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="all-categories"
                      checked={!filters.category}
                      onCheckedChange={() => handleCategoryChange('')}
                    />
                    <Label htmlFor="all-categories" className="text-sm cursor-pointer">
                      همه دسته‌ها
                    </Label>
                  </div>
                  {categories.map((category) => (
                    <div key={category._id} className="flex items-center space-x-2">
                      <Checkbox
                        id={category._id}
                        checked={filters.category === category._id}
                        onCheckedChange={() => handleCategoryChange(category._id)}
                      />
                      <Label htmlFor={category._id} className="text-sm cursor-pointer">
                        {category.title}
                      </Label>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Price Filter */}
          <div className="space-y-2">
            <Button
              variant="ghost"
              onClick={() => toggleSection('price')}
              className="w-full justify-between p-2 h-auto border border-gray-200 hover:border-primary-300"
            >
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-gray-600" />
                <span className="font-medium">محدوده قیمت</span>
              </div>
              {openSections.price ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Button>
            
            <AnimatePresence>
              {openSections.price && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-gray-50 p-4 rounded-lg border space-y-3"
                >
                  <Slider
                    value={filters.priceRange}
                    onValueChange={handlePriceChange}
                    max={10000000}
                    min={0}
                    step={100000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{formatPrice(filters.priceRange[0])}</span>
                    <span>{formatPrice(filters.priceRange[1])}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Stock Filter */}
          <div className="space-y-2">
            <Button
              variant="ghost"
              onClick={() => toggleSection('stock')}
              className="w-full justify-between p-2 h-auto border border-gray-200 hover:border-primary-300"
            >
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-gray-600" />
                <span className="font-medium">وضعیت موجودی</span>
              </div>
              {openSections.stock ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Button>
            
            <AnimatePresence>
              {openSections.stock && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-gray-50 p-3 rounded-lg border"
                >
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="in-stock"
                      checked={filters.inStock}
                      onCheckedChange={handleInStockChange}
                    />
                    <Label htmlFor="in-stock" className="text-sm cursor-pointer">
                      فقط کالاهای موجود
                    </Label>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Rating Filter */}
          <div className="space-y-2">
            <Button
              variant="ghost"
              onClick={() => toggleSection('rating')}
              className="w-full justify-between p-2 h-auto border border-gray-200 hover:border-primary-300"
            >
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-gray-600" />
                <span className="font-medium">حداقل امتیاز</span>
              </div>
              {openSections.rating ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Button>
            
            <AnimatePresence>
              {openSections.rating && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-gray-50 p-3 rounded-lg border space-y-2"
                >
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div
                      key={rating}
                      className="flex items-center space-x-2 cursor-pointer hover:bg-white p-2 rounded"
                      onClick={() => onFilterChange({ rating })}
                    >
                      <Checkbox
                        id={`rating-${rating}`}
                        checked={filters.rating === rating}
                      />
                      <Label htmlFor={`rating-${rating}`} className="flex items-center gap-1 cursor-pointer">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < rating ? 'text-secondary-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-xs text-gray-600">و بالاتر</span>
                      </Label>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsFilter;
