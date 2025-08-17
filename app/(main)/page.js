"use client";

import { Suspense, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import OptimizedLoading from "@/components/ui/OptimizedLoading";
import Loading from "@/components/ui/Loading";

// Lazy load components for better performance
const HeroAwesome = dynamic(() => import("@/components/HeroAwesome"), {
  loading: () => <OptimizedLoading type="hero" height="h-screen" />
});

const ProductCategoriesAwesome = dynamic(() => import("@/components/ProductCategoriesAwesome"), {
  loading: () => <OptimizedLoading type="categories" height="h-96" />
});

const WhyChooseUs = dynamic(() => import("@/components/WhyChooseUs"), {
  loading: () => <OptimizedLoading type="features" height="h-96" />
});

const LatestProducts = dynamic(() => import("@/components/LatestProducts"), {
  loading: () => <OptimizedLoading type="products" height="h-96" />
});

const LatestBlogPosts = dynamic(() => import("@/components/LatestBlogPosts"), {
  loading: () => <OptimizedLoading type="blog" height="h-96" />
});

const PlexiAccessories = dynamic(() => import("@/components/home/PlexiAccessories"), {
  loading: () => <OptimizedLoading type="products" height="h-96" />
});

const AboutUs = dynamic(() => import("@/components/home/AboutUs"), {
  loading: () => <OptimizedLoading type="about" height="h-96" />
});

export default function Home() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    // نمایش loading اولیه برای 1.5 ثانیه
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // نمایش Loading کامپوننت در ابتدا
  if (isInitialLoading) {
    return <Loading isLoading={true} />;
  }

  return (
    <>
      {/* Hero Section - Priority load */}
      <HeroAwesome />

      {/* Other sections - Lazy loaded with optimized skeletons */}
      <Suspense fallback={<OptimizedLoading type="categories" height="h-96" />}>
        <ProductCategoriesAwesome />
      </Suspense>

      <Suspense fallback={<OptimizedLoading type="features" height="h-96" />}>
        <WhyChooseUs />
      </Suspense>

      <Suspense fallback={<OptimizedLoading type="products" height="h-96" />}>
        <LatestProducts />
      </Suspense>

      <Suspense fallback={<OptimizedLoading type="products" height="h-96" />}>
        <PlexiAccessories />
      </Suspense>

      <Suspense fallback={<OptimizedLoading type="about" height="h-96" />}>
        <AboutUs />
      </Suspense>

      <Suspense fallback={<OptimizedLoading type="blog" height="h-96" />}>
        <LatestBlogPosts />
      </Suspense>
    </>
  );
}
