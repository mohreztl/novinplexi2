"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import ProductCard from "@/components/products/ProductCard";
import ClientOnly from "@/components/ClientOnly";
import ProductsLoading from "@/components/ProductsLoading";
import { 
  Search, 
  Filter, 
  Grid3X3,
  List,
  ChevronDown,
  X
} from "lucide-react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

function ProductsContent() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  const searchParams = useSearchParams();

  useEffect(() => {
    fetchData();
    
    // Get filters from URL
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    if (category) setSelectedCategory(category);
    if (search) setSearchTerm(search);
  }, [searchParams]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsRes, categoriesRes] = await Promise.all([
        axios.get("/api/products"),
        axios.get("/api/categories")
      ]);
      
      setProducts(Array.isArray(productsRes.data.products) ? productsRes.data.products : []);
      
      if (categoriesRes.data.categories) {
        const allCategories = [
          { _id: 'all', name: 'همه محصولات' },
          ...categoriesRes.data.categories
        ];
        setCategories(allCategories);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("خطا در دریافت اطلاعات");
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Price range filter
    if (priceRange.min) {
      filtered = filtered.filter(product => product.basePrice >= parseInt(priceRange.min));
    }
    if (priceRange.max) {
      filtered = filtered.filter(product => product.basePrice <= parseInt(priceRange.max));
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.basePrice - b.basePrice);
        break;
      case "price-high":
        filtered.sort((a, b) => b.basePrice - a.basePrice);
        break;
      case "name":
        filtered.sort((a, b) => a.title.localeCompare(b.title, 'fa'));
        break;
      case "newest":
      default:
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, priceRange, sortBy]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setPriceRange({ min: "", max: "" });
    setSortBy("newest");
  };

  if (loading) {
    return <ProductsLoading />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">فروشگاه محصولات</h1>
          <p className="text-gray-600">انتخاب از بین {products.length} محصول با کیفیت</p>
        </div>

        {/* Search and Filters Bar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="جستجو در محصولات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="دسته‌بندی" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="مرتب‌سازی" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">جدیدترین</SelectItem>
                <SelectItem value="price-low">ارزان‌ترین</SelectItem>
                <SelectItem value="price-high">گران‌ترین</SelectItem>
                <SelectItem value="name">بر اساس نام</SelectItem>
              </SelectContent>
            </Select>

            {/* Advanced Filters Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="w-full lg:w-auto"
            >
              <Filter className="w-4 h-4 ml-2" />
              فیلترهای بیشتر
              <ChevronDown className={`w-4 h-4 mr-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </Button>

            {/* View Mode */}
            <div className="flex border rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 ${viewMode === "grid" ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'}`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 ${viewMode === "list" ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">حداقل قیمت</label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">حداکثر قیمت</label>
                  <Input
                    type="number"
                    placeholder="10000000"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                  />
                </div>
                <div className="flex items-end">
                  <Button variant="outline" onClick={clearFilters} className="w-full">
                    <X className="w-4 h-4 ml-2" />
                    پاک کردن فیلترها
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            {filteredProducts.length} محصول یافت شد
          </p>
          {(searchTerm || selectedCategory !== "all" || priceRange.min || priceRange.max) && (
            <div className="flex gap-2 flex-wrap">
              {searchTerm && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  جستجو: {searchTerm}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchTerm("")} />
                </Badge>
              )}
              {selectedCategory !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  دسته: {categories.find(c => c._id === selectedCategory)?.name}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory("all")} />
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Products Grid/List */}
        {filteredProducts.length > 0 ? (
          <div className={`
            ${viewMode === "grid" 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
              : "space-y-4"
            }
          `}>
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product._id} 
                product={product} 
                viewMode={viewMode}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">محصولی یافت نشد</h3>
            <p className="text-gray-600 mb-4">لطفاً فیلترهای خود را تغییر دهید</p>
            <Button variant="outline" onClick={clearFilters}>
              پاک کردن همه فیلترها
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <ClientOnly>
      <ProductsContent />
    </ClientOnly>
  );
}
