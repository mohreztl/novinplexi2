"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import axios from "axios";

const ProductDrawer = ({ isOpen, setIsOpen }) => {
  const [categories, setCategories] = useState([]);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchCategories = async () => {
      try {
        const res = await axios.get("/api/categories?includeChildren=true");
        setCategories(res.data.categories || []);
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

  if (!isOpen) return null;

  return (
    <div
      className="absolute top-full left-0 w-full bg-white shadow-lg"
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="container mx-auto px-4 py-6 flex">
        {/* Main Categories List */}
        <div className="w-1/4 border-l">
          <ul className="space-y-2">
            {categories.map((category) => (
              <li
                key={category._id}
                onMouseEnter={() => setHoveredCategory(category)}
                className={`px-4 py-2 cursor-pointer rounded-lg transition-colors ${
                  hoveredCategory?._id === category._id
                    ? "bg-gray-100"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between p-3">
                  <span className="font-medium">{category.name}</span>
                  {category.children?.length > 0 && (
                    <ChevronLeft className="w-4 h-4" />
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Sub Categories */}
        <div className="flex-1 p-6">
          <AnimatePresence mode="wait">
            {hoveredCategory && (
              <motion.div
                key={hoveredCategory._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-3 gap-8"
              >
                {hoveredCategory.children?.map((subCategory) => (
                  <div key={subCategory._id} className="space-y-4">
                    <Link
                      href={`/products/category/${subCategory.slug}`}
                      className="block font-semibold text-gray-800 hover:text-blue-600 transition-colors"
                    >
                      {subCategory.name}
                    </Link>
                    {subCategory.children?.length > 0 && (
                      <ul className="space-y-2">
                        {subCategory.children.map((child) => (
                          <li key={child._id}>
                            <Link
                              href={`/products/category/${child.slug}`}
                              className="text-gray-600 hover:text-blue-600 transition-colors"
                            >
                              {child.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ProductDrawer;
