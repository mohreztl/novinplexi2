import { useState, useEffect } from 'react';
import axios from 'axios';

export const useCategories = (type = null, activeOnly = false) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        let url = '/api/categories?flat=true';
        
        if (type) {
          url += `&type=${type}`;
        }
        
        if (activeOnly) {
          url += '&active=true';
        }

        const response = await axios.get(url);
        
        let categoriesData = [];
        if (response.data?.categories && Array.isArray(response.data.categories)) {
          categoriesData = response.data.categories;
        } else if (Array.isArray(response.data)) {
          categoriesData = response.data;
        }

        // مرتب‌سازی بر اساس order
        categoriesData.sort((a, b) => (a.order || 0) - (b.order || 0));
        
        setCategories(categoriesData);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError(err.response?.data?.error || 'خطا در دریافت دسته‌بندی‌ها');
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [type, activeOnly]);

  return { categories, loading, error, refetch: () => fetchCategories() };
};

export const useCategory = (slug) => {
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    const fetchCategory = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(`/api/categories/manage/${slug}`);
        
        if (response.data?.success && response.data?.category) {
          setCategory(response.data.category);
        } else {
          throw new Error('Category not found');
        }
      } catch (err) {
        console.error('Error fetching category:', err);
        setError(err.response?.data?.error || 'خطا در دریافت دسته‌بندی');
        setCategory(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [slug]);

  return { category, loading, error };
};
