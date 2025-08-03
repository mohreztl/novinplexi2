"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import ProductGrid from "@/components/products/ProductGrid";
import LoadingErrorComponent from "@/components/Loader/LoadingErrorComponent";

export default function BrandPage({ params }) {
  const { brand } = params;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/products/brand/${brand}`);
        setProducts(res.data);
      } catch (error) {
        console.log(error);
        setError("Error loading products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [brand]);

  if (loading || error) {
    return <LoadingErrorComponent loading={loading} error={error} />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-slate-700 mb-4 uppercase">
          {brand} Products
        </h1>
        <p className="mb-6 text-slate-700">
          Total Products Available: {products.length}
        </p>
        <ProductGrid
          products={products}
        />
      </main>
    </div>
  );
}
