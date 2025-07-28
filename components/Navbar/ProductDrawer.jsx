"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductDrawer = ({ productOpen, setProductOpen }) => {
  const [categories, setCategories] = useState([]);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories?type=product');
        const data = await response.json();
        // تبدیل آرایه صاف به ساختار درختی
        const tree = buildCategoryTree(data.categories);
        setCategories(tree);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    if (productOpen) {
      fetchCategories();
    }
  }, [productOpen]);

  // ساخت ساختار درختی از دسته‌بندی‌ها
  const buildCategoryTree = (categories) => {
    const categoryMap = {};
    const tree = [];

    // اول همه دسته‌بندی‌ها رو در یک map ذخیره می‌کنیم
    categories.forEach(category => {
      categoryMap[category._id] = { ...category, children: [] };
    });

    // حالا ارتباط parent-child رو برقرار می‌کنیم
    categories.forEach(category => {
      if (category.parent) {
        categoryMap[category.parent].children.push(categoryMap[category._id]);
      } else {
        tree.push(categoryMap[category._id]);
      }
    });

    return tree;
  };

  if (!productOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/20 z-40"
      onClick={() => setProductOpen(false)}
    >
      <div
        className="absolute top-[80px] right-0 left-0 mx-auto max-w-7xl bg-white rounded-lg shadow-xl z-50 overflow-hidden"
        onClick={e => e.stopPropagation()}
        onMouseLeave={() => setProductOpen(false)}
      >
        <div className="flex min-h-[400px]">
          {/* دسته‌بندی‌های اصلی */}
          <div className="w-1/4 bg-gray-50 p-4 border-l">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">دسته‌بندی‌های اصلی</h3>
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li
                    key={category._id}
                    className={`relative cursor-pointer group`}
                    onMouseEnter={() => setHoveredCategory(category)}
                  >
                    <div className={`flex items-center justify-between p-3 rounded-lg transition-colors
                      ${hoveredCategory?._id === category._id ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
                    >
                      <span className="font-medium">{category.name}</span>
                      {category.children.length > 0 && (
                        <ChevronLeft className="w-4 h-4" />
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* زیر دسته‌ها */}
          <AnimatePresence>
            {hoveredCategory && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="w-3/4 p-6"
              >
                <div className="grid grid-cols-3 gap-6">
                  {hoveredCategory.children.map((subCategory) => (
                    <div key={subCategory._id} className="space-y-4">
                      <Link
                        href={`/products/category/${subCategory.slug}`}
                        className="block font-semibold text-blue-600 hover:text-blue-700"
                      >
                        {subCategory.name}
                      </Link>
                      {subCategory.children.length > 0 && (
                        <ul className="space-y-2">
                          {subCategory.children.map((child) => (
                            <li key={child._id}>
                              <Link
                                href={`/products/category/${child.slug}`}
                                className="text-gray-600 hover:text-blue-600 transition-colors block py-1"
                              >
                                {child.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>

                {/* تصویر و توضیحات دسته‌بندی */}
                {hoveredCategory.image && (
                  <div className="mt-8 p-4 bg-gray-50 rounded-lg flex items-center">
                    <div className="flex-shrink-0 w-32 h-32 relative overflow-hidden rounded-lg">
                      <Image
                        src={hoveredCategory.image}
                        alt={hoveredCategory.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="mr-6">
                      <h4 className="font-semibold text-lg mb-2">{hoveredCategory.name}</h4>
                      <p className="text-gray-600">{hoveredCategory.description}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
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