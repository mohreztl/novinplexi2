"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import ServiceCard from "@/components/services/ServiceCard";
import ClientOnly from "@/components/ClientOnly";
import CategoryHeader from "@/components/CategoryHeader";
import { useSearchParams } from "next/navigation";

function ServicesContent() {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [filteredServices, setFilteredServices] = useState([]);
  
  const searchParams = useSearchParams();

  useEffect(() => {
    fetchData();
    
    // Get filters from URL
    const category = searchParams?.get('category');
    const search = searchParams?.get('search');
    if (category) setSelectedCategory(category);
    if (search) setSearchTerm(search);
  }, [searchParams]);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch services
      const servicesResponse = await axios.get("/api/services");
      const servicesData = servicesResponse.data || [];
      setServices(servicesData);

      // Fetch categories for services
      const categoriesResponse = await axios.get("/api/categories?type=service&active=true");
      const categoriesData = categoriesResponse.data.categories || [];
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setServices([]);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort services
  useEffect(() => {
    let filtered = [...services];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(service => {
        const title = service.title || service.name || '';
        const description = service.description || '';
        const searchText = `${title} ${description}`.toLowerCase();
        
        if (searchTerm.includes(' ')) {
          return searchTerm.toLowerCase().split(' ').every(term => 
            searchText.includes(term.trim())
          );
        } else {
          return searchText.includes(searchTerm.toLowerCase());
        }
      });
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(service => service.category === selectedCategory);
    }

    // Sort services
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => (a.basePrice || a.price || 0) - (b.basePrice || b.price || 0));
        break;
      case "price-high":
        filtered.sort((a, b) => (b.basePrice || b.price || 0) - (a.basePrice || a.price || 0));
        break;
      case "name":
        filtered.sort((a, b) => (a.title || a.name || '').localeCompare(b.title || b.name || ''));
        break;
      case "newest":
      default:
        filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        break;
    }

    setFilteredServices(filtered);
  }, [services, searchTerm, selectedCategory, sortBy]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">در حال بارگیری خدمات...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Category Header */}
      <CategoryHeader type="service" />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">خدمات ما</h1>
          <p className="text-gray-600">مجموعه کاملی از بهترین خدمات را بیابید</p>
        </div>

        {/* Filters */}
        <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="جستجو در خدمات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">همه دسته‌ها</option>
                {categories.map((category) => (
                  <option key={category._id} value={category.slug}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="newest">جدیدترین</option>
                <option value="price-low">ارزان‌ترین</option>
                <option value="price-high">گران‌ترین</option>
                <option value="name">بر اساس نام</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredServices.length} خدمت یافت شد
          </p>
        </div>

        {/* Services Grid */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔧</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">خدمتی یافت نشد</h3>
            <p className="text-gray-600">لطفاً فیلترهای جستجو را تغییر دهید</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default function ServicesPage() {
  return (
    <ClientOnly>
      <ServicesContent />
    </ClientOnly>
  );
}
