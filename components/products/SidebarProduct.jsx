'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeft, Filter, ChevronDown, ChevronUp } from "lucide-react";

// کامپوننت بازگشتی برای نمایش دسته‌بندی‌ها
const CategoryItem = ({ category, selectedCategory, level = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = category.children?.length > 0;

  return (
    <div className="relative">
      <div className="flex items-center justify-between gap-2">
        <Link
          href={`/products/category/${category.slug}`}
          className={`flex-1 flex items-center gap-2 p-2 rounded-lg transition-colors ${
            selectedCategory === category.slug 
              ? "bg-blue-50 text-blue-600 font-medium"
              : "hover:bg-gray-50 text-gray-600"
          }`}
          style={{ marginRight: `${level * 1.5}rem` }}
        >
          <span className="w-2 h-2 rounded-full bg-current opacity-60"></span>
          {category.title}
        </Link>
        
        {hasChildren && (
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 hover:bg-gray-100 rounded-lg"
          >
            {isOpen ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        )}
      </div>

      {hasChildren && isOpen && (
        <div className="ml-4 mt-1">
          {category.children.map((child) => (
            <CategoryItem 
              key={child._id}
              category={child}
              selectedCategory={selectedCategory}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function SidebarFilters() {
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetch("/api/categories?includeChildren=true")
      .then(res => res.json())
      .then(data => setCategories(data.categories))
      .catch(error => console.error("Error fetching categories:", error));
  }, []);

  return (
    <>
      {/* Mobile Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-12 right-12 z-40 bg-white border rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
      >
        <Filter className="w-6 h-6 text-gray-600" />
      </button>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80 shrink-0 border-r p-6">
        <h3 className="text-lg font-bold mb-4 text-gray-800">فیلتر محصولات</h3>
        <ul className="space-y-2">
          {categories.map(cat => (
            <CategoryItem 
              key={cat._id}
              category={cat}
              selectedCategory={selectedCategory}
            />
          ))}
        </ul>
      </div>

      {/* Mobile Overlay & Sidebar */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div 
          className="absolute inset-0 bg-black/30"
          onClick={() => setIsOpen(false)}
        ></div>
        
        <div className={`absolute right-0 top-0 h-full w-64 bg-white transform transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}>
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-800">فیلترها</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-gray-100 rounded-lg"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
          </div>
          
          <div className="p-4 overflow-y-auto h-[calc(100vh-65px)]">
            {categories.map(cat => (
              <CategoryItem 
                key={cat._id}
                category={cat}
                selectedCategory={selectedCategory}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}