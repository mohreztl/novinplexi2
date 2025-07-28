'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TopProductSectionClient from "./TopProductSectionClient";

const TopProductSection = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/products/featured');
                setProducts(response.data || []);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('خطا در بارگذاری محصولات');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-20 text-red-600">
                {error}
            </div>
        );
    }

    return <TopProductSectionClient products={products} />;
};

export default TopProductSection;
