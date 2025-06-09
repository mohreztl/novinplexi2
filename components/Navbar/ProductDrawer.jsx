"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import PropTypes from "prop-types";

const ProductDrawer = ({ 
  productOpen, 
  setProductOpen, 
  categories, 
  setCategory, 
  activeCategory 
}) => {
  const [hoveredCat, setHoveredCat] = useState(null);

  if (!productOpen) return null;

  return (
    <div
      onMouseEnter={() => setProductOpen(true)}
      onMouseLeave={() => setProductOpen(false)}
      className={`
        absolute z-50 top-[115px] right-[2%]
        bg-white shadow-xl rounded-xl border border-[#31508c]/20
        transition-all duration-300 overflow-visible
        ${hoveredCat ? "w-[360px]" : "w-[320px]"}
        animate-fadeIn
      `}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-[#31508c] to-[#2a4374] py-4 px-6 rounded-t-xl">
        <h3 className="text-lg font-bold text-white text-center">
          دسته‌بندی محصولات
        </h3>
      </div>

      <div className="h-px bg-[#31508c]/10 mx-4"></div>

      {/* Categories List */}
      <ul className="py-2 px-3 space-y-1">
        {categories?.map((cat) => (
          <li
            key={cat._id}
            className="group relative"
            onMouseEnter={() => setHoveredCat(cat._id)}
            onMouseLeave={() => setHoveredCat(null)}
           
          >
            <Link
              href={`/products/category/${cat.slug}`}
              onMouseEnter={() => setCategory(cat.slug)}
              className={`
                flex items-center justify-between px-4 py-2.5 rounded-lg
                transition-all duration-200
                ${
                  activeCategory === cat.slug
                    ? "bg-[#31508c]/10 text-[#31508c] font-semibold"
                    : "hover:bg-[#31508c]/5 text-gray-700"
                }
              `}
              aria-current={activeCategory === cat.slug ? "page" : undefined}
            >
              <span className="flex items-center gap-2 text-sm">
                {cat.title}
                {cat.children?.length > 0 && (
                  <ChevronLeft
                    className={`w-4 h-4 transition-transform duration-200 ${
                      hoveredCat === cat._id ? "rotate-90" : "rotate-0"
                    } ${activeCategory === cat.slug ? 'text-[#ffd700]' : 'text-[#31508c]/70'}`}
                  />
                )}
              </span>
            </Link>

            {/* Subcategories */}
            {cat.children?.length > 0 && (
              <ul
                className={`
                  absolute right-full top-0 mr-2 bg-white border border-[#31508c]/20
                  rounded-lg shadow-lg w-[260px] transition-all duration-200
                  ${
                    hoveredCat === cat._id
                      ? "opacity-100 translate-x-0 pointer-events-auto"
                      : "opacity-0 translate-x-1 pointer-events-none"
                  }
                `}
              >
                {cat.children.map((child) => (
                  <li 
                    key={child._id} 
                    className="border-b border-[#31508c]/10 last:border-none"
                  >
                    <Link
                      href={`/products/category/${child.slug}`}
                      className="flex items-center px-4 py-2.5 hover:bg-[#31508c]/5 text-gray-600 text-sm transition-colors"
                    >
                      <span className="text-[#ffd700] ml-2">›</span>
                      {child.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProductDrawer.propTypes = {
  productOpen: PropTypes.bool.isRequired,
  setProductOpen: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      children: PropTypes.array,
    })
  ),
  setCategory: PropTypes.func.isRequired,
  activeCategory: PropTypes.string,
};

export default ProductDrawer;