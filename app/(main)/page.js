"use client";

import { useState, useEffect } from "react";
import axios from "axios";

import Hero from "@/components/home/Hero";
import ServiceSection from "@/components/home/ServiceSection";
import TopProductSection from "@/components/home/TopProductSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import BlogSection from "@/components/home/BlogSection";
import Faq from "@/components/home/Faq";
import FloatingContactButton from "@/components/home/FloatingContactButton";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // دریافت محصولات
        const productsResponse = await axios.get("/api/products");
        setProducts(productsResponse.data);

        // دریافت پست‌های وبلاگ
        const postsResponse = await axios.get("/api/posts");
        setPosts(postsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Service Section */}
      <section className="py-16 bg-gray-50">
        <ServiceSection />
      </section>

      {/* Top Products Section */}
      <section className="py-16">
        {/* <TopProductSection products={products} isLoading={isLoading} /> */}
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <CategoriesSection />
      </section>

      {/* Blog Section */}
      <section className="py-16">
        {/* <BlogSection posts={posts} isLoading={isLoading} /> */}
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <Faq />
      </section>

      {/* Floating Contact Button */}
      {/* <FloatingContactButton /> */}

      {/* Additional Content */}
    
    </div>
  );
}
