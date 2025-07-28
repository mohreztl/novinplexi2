// components/AcrylicNavbar.tsx
"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import CartButton from "./cart-button";

const AcrylicNavbar = () => {
    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const megaMenuRef = useRef<HTMLDivElement>(null);

    // دسته‌بندی‌های محصولات اکریلیک
    const categories = [
        {
            id: "products",
            title: "محصولات",
            subcategories: [
                {
                    id: "signage",
                    title: "تابلوهای تبلیغاتی",
                    items: [
                        "تابلو نئون",
                        "تابلو سه بعدی",
                        "تابلو برش لیزری",
                        "تابلو حروف برجسته",
                    ],
                },
                {
                    id: "display",
                    title: "ویترین و دکوراسیون",
                    items: [
                        "پایه محصول",
                        "ویترین فروشگاهی",
                        "اجسام دکوراتیو",
                        "پارتیشن اداری",
                    ],
                },
                {
                    id: "furniture",
                    title: "مبلمان اکریلیک",
                    items: [
                        "میزهای شفاف",
                        "صندلی طراحی",
                        "پایه بار",
                        "میز کنسول",
                    ],
                },
            ],
        },
        {
            id: "services",
            title: "خدمات",
            subcategories: [
                {
                    id: "custom",
                    title: "سفارش اختصاصی",
                    items: [
                        "طراحی CAD",
                        "برش لیزری",
                        "خمکاری حرارتی",
                        "پولیش و پرداخت",
                    ],
                },
                {
                    id: "installation",
                    title: "نصب و راه‌اندازی",
                    items: [
                        "نصب حرفه‌ای",
                        "سیستم نورپردازی",
                        "محافظت UV",
                        "نگهداری و تعمیر",
                    ],
                },
                {
                    id: "consulting",
                    title: "مشاوره فنی",
                    items: [
                        "انتخاب ضخامت",
                        "رنگ‌بندی",
                        "کاربردهای خاص",
                        "بهینه‌سازی هزینه",
                    ],
                },
            ],
        },
        {
            id: "materials",
            title: "مواد اولیه",
            subcategories: [
                {
                    id: "sheets",
                    title: "ورق‌های اکریلیک",
                    items: [
                        "شفاف",
                        "رنگی",
                        "سفید شیری",
                        "رنگی فلورسنت",
                        "بافت‌دار",
                    ],
                },
                {
                    id: "accessories",
                    title: "ملزومات و اتصالات",
                    items: [
                        "چسب مخصوص",
                        "پیچ و مهره",
                        "پایه‌های فلزی",
                        "سیستم نورپردازی",
                    ],
                },
                {
                    id: "tools",
                    title: "ابزار کار",
                    items: [
                        "دریل مخصوص",
                        "اره اکریلیک",
                        "پولیشر",
                        "فرم دهنده حرارتی",
                    ],
                },
            ],
        },
        {
            id: "projects",
            title: "پروژه‌ها",
            subcategories: [
                {
                    id: "commercial",
                    title: "تجاری",
                    items: [
                        "فروشگاه‌ها",
                        "رستوران‌ها",
                        "نمایشگاه‌ها",
                        "دفاتر شرکتی",
                    ],
                },
                {
                    id: "residential",
                    title: "مسکونی",
                    items: [
                        "دکوراسیون داخلی",
                        "سرویس بهداشتی",
                        "پارتیشن",
                        "نورپردازی",
                    ],
                },
                {
                    id: "art",
                    title: "هنری",
                    items: [
                        "مجسمه‌سازی",
                        "نقوش برجسته",
                        "آثار تعاملی",
                        "نور و شفافیت",
                    ],
                },
            ],
        },
    ];

    // مدیریت اسکرول صفحه
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // مدیریت باز و بسته شدن مگامنو
    const handleCategoryHover = (categoryId: string) => {
        setActiveCategory(categoryId);
        setIsMegaMenuOpen(true);
    };

    const handleCategoryLeave = () => {
        setIsMegaMenuOpen(false);
        setTimeout(() => {
            if (!isMegaMenuOpen) {
                setActiveCategory(null);
            }
        }, 300);
    };

    // بستن مگامنو هنگام کلیک خارج از آن
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                megaMenuRef.current &&
                !megaMenuRef.current.contains(event.target as Node)
            ) {
                setIsMegaMenuOpen(false);
                setActiveCategory(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav
            className={`fixed top-0 z-50 w-full transition-all duration-300 ${
                isScrolled
                    ? "bg-white/90 backdrop-blur-md shadow-md border-b border-blue-100"
                    : "bg-transparent"
            }`}
        >
            <div className="mx-auto md:px-8 px-4">
                {/* نوبار اصلی */}
                <div className="flex h-20 items-center justify-between">
                    {/* لوگو و نام برند */}
                    <Link href="/" className="flex items-center space-x-3 z-30">
                        <div className="flex items-center justify-center">
                            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 p-1 shadow-lg">
                                <div className="flex h-full w-full items-center justify-center rounded-lg bg-white/90 backdrop-blur-sm">
                                    <div className="h-8 w-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-md"></div>
                                </div>
                            </div>
                            <span className="ml-3 text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                                Novin Plexi
                            </span>
                        </div>
                    </Link>

                    {/* دسته‌بندی‌ها - نسخه دسکتاپ */}
                    <div className="hidden md:flex  md:space-x-6">
                        {categories.map((category) => (
                            <div
                                key={category.id}
                                className="relative"
                                onMouseEnter={() =>
                                    handleCategoryHover(category.id)
                                }
                                onMouseLeave={handleCategoryLeave}
                            >
                                <button
                                    className={`flex items-center py-2 px-3 rounded-lg transition-all ${
                                        activeCategory === category.id
                                            ? "bg-blue-50 text-blue-700"
                                            : "hover:bg-blue-50/50 hover:text-blue-600"
                                    }`}
                                >
                                    <span className="font-medium">
                                        {category.title}
                                    </span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`h-4 w-4 mr-1 transition-transform ${
                                            activeCategory === category.id
                                                ? "rotate-180 text-blue-600"
                                                : "text-gray-500"
                                        }`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* ناحیه جستجو و اقدامات کاربر */}
                    <div className="flex items-center space-x-4">
                        <div className="hidden lg:block">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="جستجو محصولات..."
                                    className="w-64 rounded-full border border-blue-200 bg-white/80 py-2 pl-10 pr-4 text-gray-700 placeholder-gray-400 backdrop-blur-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300/50"
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                        </div>

                        <div className="flex space-x-2">
                            <button className="relative rounded-full p-2 transition-colors hover:bg-blue-50">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-gray-700"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    />
                                </svg>
                            </button>

                            {/* <button className="relative rounded-full p-2 transition-colors hover:bg-blue-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-xs font-bold text-white">
                  2
                </span>
              </button>

              <button className="rounded-full p-2 transition-colors hover:bg-blue-50">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 font-semibold text-white">
                  A
                </div>
              </button> */}
                            <Suspense
                                fallback={
                                    <Link
                                        className="hover:text-ui-fg-base  gap-2 relative rounded-full p-2 transition-colors hover:bg-blue-50"
                                        data-testid="nav-cart-link"
                                        href="/cart"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-gray-700"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                            />
                                        </svg>
                                        <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-xs font-bold text-white">
                                            2
                                        </span>
                                    </Link>
                                }
                            >
                                <CartButton />
                            </Suspense>
                        </div>

                        {/* منوی موبایل */}
                        <button
                            className="rounded-lg p-2 text-gray-700 hover:bg-blue-50 md:hidden"
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d={
                                        isMobileMenuOpen
                                            ? "M6 18L18 6M6 6l12 12"
                                            : "M4 6h16M4 12h16M4 18h16"
                                    }
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* مگامنو - نسخه دسکتاپ */}
                <AnimatePresence>
                    {isMegaMenuOpen && activeCategory && (
                        <motion.div
                            ref={megaMenuRef}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute left-0 right-0 z-40 origin-top overflow-hidden rounded-b-2xl bg-white/95 backdrop-blur-xl shadow-2xl border-t border-blue-100"
                            onMouseEnter={() => setIsMegaMenuOpen(true)}
                            onMouseLeave={handleCategoryLeave}
                        >
                            <div className=" mx-auto px-4 py-6">
                                <div className="grid grid-cols-5 gap-8">
                                    <div className="col-span-4 grid grid-cols-3 gap-8">
                                        {categories
                                            .find(
                                                (c) => c.id === activeCategory
                                            )
                                            ?.subcategories?.map(
                                                (subcategory) => (
                                                    <div
                                                        key={subcategory.id}
                                                        className="border-l-2 border-blue-200 pl-4"
                                                    >
                                                        <h3 className="mb-3 text-lg font-bold text-blue-700">
                                                            {subcategory.title}
                                                        </h3>
                                                        <ul className="space-y-2">
                                                            {subcategory.items.map(
                                                                (
                                                                    item,
                                                                    index
                                                                ) => (
                                                                    <li
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        <a
                                                                            href="#"
                                                                            className="block py-1 text-gray-600 transition-colors hover:text-blue-600 hover:font-medium"
                                                                        >
                                                                            {
                                                                                item
                                                                            }
                                                                        </a>
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                    </div>
                                                )
                                            )}
                                    </div>

                                    <div className="flex flex-col items-start justify-center space-y-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-6 border border-blue-100">
                                        <div className="rounded-lg bg-blue-100 p-3">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-10 w-10 text-blue-600"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.5}
                                                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                                />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-bold text-blue-800">
                                            مشاوره رایگان
                                        </h3>
                                        <p className="text-gray-600">
                                            برای دریافت مشاوره تخصصی در زمینه
                                            طراحی و اجرای پروژه‌های اکریلیک با
                                            ما در تماس باشید
                                        </p>
                                        <button className="mt-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-2 font-medium text-white shadow-lg transition-all hover:from-blue-700 hover:to-indigo-800">
                                            درخواست مشاوره
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* منوی موبایل */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white/95 backdrop-blur-xl border-t border-blue-100 md:hidden"
                    >
                        <div className=" mx-auto px-4 py-4">
                            <div className="space-y-4">
                                {categories.map((category) => (
                                    <div
                                        key={category.id}
                                        className="border-b border-blue-100 pb-3"
                                    >
                                        <button
                                            className="flex w-full items-center justify-between py-2 px-3 rounded-lg font-medium hover:bg-blue-50"
                                            onClick={() =>
                                                setActiveCategory(
                                                    activeCategory ===
                                                        category.id
                                                        ? null
                                                        : category.id
                                                )
                                            }
                                        >
                                            <span>{category.title}</span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className={`h-5 w-5 transition-transform ${
                                                    activeCategory ===
                                                    category.id
                                                        ? "rotate-180 text-blue-600"
                                                        : "text-gray-500"
                                                }`}
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </svg>
                                        </button>

                                        {activeCategory === category.id && (
                                            <div className="mt-2 grid grid-cols-2 gap-4 pl-4">
                                                {category.subcategories?.map(
                                                    (subcategory) => (
                                                        <div
                                                            key={subcategory.id}
                                                        >
                                                            <h4 className="mb-2 font-medium text-blue-700">
                                                                {
                                                                    subcategory.title
                                                                }
                                                            </h4>
                                                            <ul className="space-y-1">
                                                                {subcategory.items
                                                                    .slice(0, 4)
                                                                    .map(
                                                                        (
                                                                            item,
                                                                            index
                                                                        ) => (
                                                                            <li
                                                                                key={
                                                                                    index
                                                                                }
                                                                            >
                                                                                <a
                                                                                    href="#"
                                                                                    className="block py-1 text-sm text-gray-600 hover:text-blue-600"
                                                                                >
                                                                                    {
                                                                                        item
                                                                                    }
                                                                                </a>
                                                                            </li>
                                                                        )
                                                                    )}
                                                            </ul>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}

                                <div className="pt-4">
                                    <input
                                        type="text"
                                        placeholder="جستجو محصولات..."
                                        className="w-full rounded-full border border-blue-200 bg-white py-2 px-4 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none"
                                    />
                                </div>

                                <div className="flex justify-center pt-4">
                                    <button className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-3 font-medium text-white shadow">
                                        درخواست مشاوره
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default AcrylicNavbar;
