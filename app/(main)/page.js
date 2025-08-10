"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

// Lazy load components for better performance
const HeroAwesome = dynamic(() => import("@/components/HeroAwesome"), {
  loading: () => <div className="h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900" />
});

const ProductCategoriesAwesome = dynamic(() => import("@/components/ProductCategoriesAwesome"), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
});

const WhyChooseUs = dynamic(() => import("@/components/WhyChooseUs"), {
  loading: () => <div className="h-96 bg-white animate-pulse" />
});

const LatestProducts = dynamic(() => import("@/components/LatestProducts"), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
});

const LatestBlogPosts = dynamic(() => import("@/components/LatestBlogPosts"), {
  loading: () => <div className="h-96 bg-white animate-pulse" />
});

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Priority load */}
      <HeroAwesome />

      {/* Other sections - Lazy loaded */}
      <Suspense fallback={<div className="h-96 bg-gray-50 animate-pulse" />}>
        <ProductCategoriesAwesome />
      </Suspense>

      <Suspense fallback={<div className="h-96 bg-white animate-pulse" />}>
        <WhyChooseUs />
      </Suspense>

      <Suspense fallback={<div className="h-96 bg-gray-50 animate-pulse" />}>
        <LatestProducts />
      </Suspense>

      <Suspense fallback={<div className="h-96 bg-white animate-pulse" />}>
        <LatestBlogPosts />
      </Suspense>
    </div>
  );
}
