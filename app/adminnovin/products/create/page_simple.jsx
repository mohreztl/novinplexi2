"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";

const CreateProductPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [imagePath, setImagePath] = useState([]);
  
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    description: "",
    fullDescription: "",
    basePrice: "",
    isPublished: true,
    variants: {
      thicknesses: [],
      sizes: [],
      colors: []
    }
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
      return;
    }
  }, [status, router]);

  // دریافت دسته‌بندی‌ها
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/categories");
        setCategories(response.data.categories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // تولید slug از عنوان
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  };

  // تغییر عنوان و تولید slug
  const handleTitleChange = (e) => {
    const title = e.target.value;
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }));
  };

  // تغییر فیلدهای فرم
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // مدیریت متغیرها
  const addVariantOption = (type) => {
    setFormData(prev => ({
      ...prev,
      variants: {
        ...prev.variants,
        [type]: [...prev.variants[type], { name: "", extraPrice: "0" }]
      }
    }));
  };

  const removeVariantOption = (type, index) => {
    setFormData(prev => ({
      ...prev,
      variants: {
        ...prev.variants,
        [type]: prev.variants[type].filter((_, i) => i !== index)
      }
    }));
  };

  const updateVariantOption = (type, index, field, value) => {
    setFormData(prev => ({
      ...prev,
      variants: {
        ...prev.variants,
        [type]: prev.variants[type].map((item, i) => 
          i === index ? { ...item, [field]: value } : item
        )
      }
    }));
  };

  // انتخاب تصاویر
  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePath(prev => [...prev, event.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  // حذف تصویر
  const removeImage = (index) => {
    setImagePath(prev => prev.filter((_, i) => i !== index));
  };

  // ارسال فرم
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.category || !formData.description || !formData.basePrice) {
      alert("لطفاً همه فیلدهای ضروری را پر کنید");
      return;
    }

    if (imagePath.length === 0) {
      alert("لطفاً حداقل یک تصویر انتخاب کنید");
      return;
    }

    try {
      setIsLoading(true);
      
      const productData = {
        ...formData,
        name: formData.title,
        basePrice: Number(formData.basePrice),
        images: imagePath,
        user: session?.user?._id,
      };

      const response = await axios.post("/api/products", productData);
      
      if (response.data.success) {
        alert("محصول با موفقیت ایجاد شد");
        router.push("/adminnovin/products");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      alert("خطا در ایجاد محصول: " + (error.response?.data?.message || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-2xl mb-4">⏳</div>
          <p>در حال بارگزاری...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">ایجاد محصول جدید</h1>
          <p className="text-gray-600 mt-2">محصول جدید خود را با جزئیات کامل اضافه کنید</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* اطلاعات اصلی */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">📦 اطلاعات اصلی محصول</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  نام محصول *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={handleTitleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="نام محصول را وارد کنید"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  برچسب (Slug) *
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="برچسب محصول"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  دسته‌بندی *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">دسته‌بندی را انتخاب کنید</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  قیمت پایه (تومان) *
                </label>
                <input
                  type="number"
                  value={formData.basePrice}
                  onChange={(e) => handleInputChange('basePrice', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="قیمت به تومان"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => handleInputChange('isPublished', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">محصول منتشر شود</span>
                </label>
              </div>
            </div>
          </div>

          {/* تصاویر */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">🖼️ تصاویر محصول</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                انتخاب تصاویر *
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageSelect}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              
              {imagePath.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {imagePath.map((url, index) => (
                    <div key={index} className="relative group border border-gray-200 rounded-lg overflow-hidden">
                      <Image
                        src={url}
                        alt={`تصویر ${index + 1}`}
                        width={200}
                        height={200}
                        className="h-40 w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        ❌
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* توضیحات */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">📝 توضیحات محصول</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  توضیحات کوتاه *
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="توضیحات مختصر محصول"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  توضیحات کامل
                </label>
                <textarea
                  rows={6}
                  value={formData.fullDescription}
                  onChange={(e) => handleInputChange('fullDescription', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="توضیحات کامل محصول"
                />
              </div>
            </div>
          </div>

          {/* متغیرها */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">⚙️ متغیرهای محصول</h2>
            
            {/* ضخامت */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-800">ضخامت‌ها</h3>
                <button
                  type="button"
                  onClick={() => addVariantOption('thicknesses')}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  ➕ افزودن ضخامت
                </button>
              </div>
              
              {formData.variants.thicknesses.map((thickness, index) => (
                <div key={index} className="flex gap-4 mb-3">
                  <input
                    type="text"
                    placeholder="نام ضخامت (مثال: 2mm)"
                    value={thickness.name}
                    onChange={(e) => updateVariantOption('thicknesses', index, 'name', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <input
                    type="number"
                    placeholder="قیمت اضافی"
                    value={thickness.extraPrice}
                    onChange={(e) => updateVariantOption('thicknesses', index, 'extraPrice', e.target.value)}
                    className="w-32 px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeVariantOption('thicknesses', index)}
                    className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>

            {/* اندازه */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-800">اندازه‌ها</h3>
                <button
                  type="button"
                  onClick={() => addVariantOption('sizes')}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  ➕ افزودن اندازه
                </button>
              </div>
              
              {formData.variants.sizes.map((size, index) => (
                <div key={index} className="flex gap-4 mb-3">
                  <input
                    type="text"
                    placeholder="نام اندازه (مثال: 100x200cm)"
                    value={size.name}
                    onChange={(e) => updateVariantOption('sizes', index, 'name', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <input
                    type="number"
                    placeholder="قیمت اضافی"
                    value={size.extraPrice}
                    onChange={(e) => updateVariantOption('sizes', index, 'extraPrice', e.target.value)}
                    className="w-32 px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeVariantOption('sizes', index)}
                    className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>

            {/* رنگ */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-800">رنگ‌ها</h3>
                <button
                  type="button"
                  onClick={() => addVariantOption('colors')}
                  className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                >
                  ➕ افزودن رنگ
                </button>
              </div>
              
              {formData.variants.colors.map((color, index) => (
                <div key={index} className="flex gap-4 mb-3">
                  <input
                    type="text"
                    placeholder="نام رنگ (مثال: سفید)"
                    value={color.name}
                    onChange={(e) => updateVariantOption('colors', index, 'name', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <input
                    type="number"
                    placeholder="قیمت اضافی"
                    value={color.extraPrice}
                    onChange={(e) => updateVariantOption('colors', index, 'extraPrice', e.target.value)}
                    className="w-32 px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeVariantOption('colors', index)}
                    className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* دکمه‌های عمل */}
          <div className="flex justify-end space-x-4 space-x-reverse">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? '⏳ در حال ایجاد...' : '💾 ایجاد محصول'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProductPage;
