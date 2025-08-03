"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import ProductDetails from "@/components/ProductDetails";
import ProdDetailsPrice from "@/components/ProdDetailsPrice";
import LoadingErrorComponent from "@/components/Loader/LoadingErrorComponent";

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/products/item/${slug}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  if (loading || error) {
    return <LoadingErrorComponent loading={loading} error={error} />;
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">محصول یافت نشد</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetails product={product} />
      <div className="mt-8">
        <ProdDetailsPrice product={product} />
      </div>
    </div>
  );
}
