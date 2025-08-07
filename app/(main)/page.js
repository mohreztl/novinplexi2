"use client";

import { useState, useEffect } from "react";
import HeroAwesome from "@/components/HeroAwesome";
import ProductCategoriesAwesome from "@/components/ProductCategoriesAwesome";
import WhyChooseUs from "@/components/WhyChooseUs";
import LatestProducts from "@/components/LatestProducts";
import LatestBlogPosts from "@/components/LatestBlogPosts";
import Loading from "@/components/ui/Loading";
// import ServiceSection from "@/components/home/ServiceSection";
// import CategoriesSection from "@/components/home/CategoriesSection";
// import Faq from "@/components/home/Faq";
// import FloatingContactButton from "@/components/home/FloatingContactButton";
// import LatestProducts from "@/components/home/LatestProducts";
// import HomeBlogSection from "@/components/HomepageComponents/HomeBlogSection";
// import SimpleProductCategories from "@/components/SimpleProductCategories";
// import ProductCategories from "@/components/ProductCategories";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading isLoading={isLoading} />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <HeroAwesome />

      {/* Product Categories Section */}
      <ProductCategoriesAwesome />

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Latest Products Section */}
      <LatestProducts />

      {/* Latest Blog Posts Section */}
      <LatestBlogPosts />

      {/* Service Section */}
      {/* <section className="py-16 bg-gray-50">
        <ServiceSection />
      </section> */}

      {/* Top Products Section */}
      

      {/* Latest Products & Categories */}
      {/* <LatestProducts /> */}

      {/* Categories Section */}
      {/* <section className="py-16 bg-gray-50">
        <CategoriesSection />
      </section> */}

      {/* Blog Section */}
      {/* <HomeBlogSection /> */}

      {/* FAQ Section */}
      {/* <section className="py-16 bg-gray-50">
        <Faq />
      </section> */}

      {/* Floating Contact Button */}
      {/* <FloatingContactButton /> */}

      {/* Additional Content */}
    
    </div>
  );
}
