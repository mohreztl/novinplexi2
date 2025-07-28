"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    FiShoppingCart,
    FiHeart,
    FiEye,
    FiChevronLeft,
    FiChevronRight,
} from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

const TopProductSectionClient = ({ products }) => {
    const [activeTab, setActiveTab] = useState("all");

    // دسته‌بندی‌ها
    const categories = [
        { id: "all", name: "همه محصولات" },
        { id: "signage", name: "تابلوها" },
        { id: "display", name: "ویترین‌ها" },
        { id: "furniture", name: "مبلمان" },
    ];

    return (
        <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
            <div className="mx-auto px-4">
                {/* عنوان بخش */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                    >
                        محصولات{" "}
                        <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                            پرفروش
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-gray-600 max-w-2xl mx-auto"
                    >
                        محصولات باکیفیت و پرطرفدار ما را در دسته‌بندی‌های مختلف
                        مشاهده کنید
                    </motion.p>
                </div>

                {/* دسته‌بندی‌ها */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((category) => (
                        <motion.button
                            key={category.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setActiveTab(category.id)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                activeTab === category.id
                                    ? "bg-blue-600 text-white shadow-lg"
                                    : "bg-white text-gray-600 hover:bg-blue-50"
                            }`}
                        >
                            {category.name}
                        </motion.button>
                    ))}
                </div>

                {/* محصولات */}
                <FeaturedProducts products={products} />

                {/* دکمه مشاهده همه */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mt-12"
                >
                    <Link
                        href="/products"
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        <span>مشاهده همه محصولات</span>
                        <FiChevronLeft className="mr-2" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default TopProductSectionClient;
