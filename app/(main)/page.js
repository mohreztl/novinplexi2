"use client";

import Hero from "@/components/home/Hero";
import ServiceSection from "@/components/home/ServiceSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import Faq from "@/components/home/Faq";
import FloatingContactButton from "@/components/home/FloatingContactButton";
import LatestProducts from "@/components/home/LatestProducts";

export default function Home() {
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

      {/* Latest Products & Categories */}
      <LatestProducts />

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
      <FloatingContactButton />

      {/* Additional Content */}
    
    </div>
  );
}
