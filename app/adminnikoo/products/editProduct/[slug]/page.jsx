"use client";
import React, { useState, useEffect } from "react";


import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import ImagesList from "@/components/ImagesList";
const EditProduct = ({ params }) => {

  const { slug } = params;
  const router = useRouter();


  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [imagePath, setImagePath] = useState([]);
  const [product, setProduct] = useState({
   

    name: "",
    fullDescription: "",
    description: "",
    categories: "",
    condition: "",
    washable: "",
    brand: "",
    material: "",
    images: [],
    price: 0,
    originalPrice: 0,
    place: "",
    weight: "",
    color: " ",
    strong: "",
    country: "",
    antistatic: " ",
    other: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
   
      try {
        const res = await axios.get(`/api/product/${slug}`);
        const fetchedProduct = res.data;
        setProduct(fetchedProduct);
        setImagePath(fetchedProduct.images);
        
          fetch("/api/categories")
            .then((res) => res.json())
            .then((data) => setCategories(data.categories || []));
          fetch("/api/brand")
            .then((res) => res.json())
            .then((data) => setBrands(data.data || []));
      
      } catch (error) {
        console.log(error);
  

      }
    };
    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // const handleUpload = (result) => {
  //   if (result.event === "success") {
  //     const newUrl = result.info.secure_url;
  //     setImageUrls((prevUrls) => [...prevUrls, newUrl]);
  //   }
  // };
  const handleRemoveImage = (e, urlToRemove) => {
    e.preventDefault();
    setImagePath((prevUrls) => prevUrls.filter((url) => url !== urlToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

        
        
      try {
        const productData = {
          ...product,
      
          images: imagePath,
        };
    
        
        const productRes = await axios.put(
          `/api/product/${slug}`,
          productData
        );
        if (productRes.status === 200 || productRes.status === 201) {
          router.push("/");
        }
      } catch (error) {
        toast.error("Product cloudnt be updated");
        console.log(error);
      }
 
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/api/product/${slug}`);
      if (res.status === 200) {
        toast.success("Product deleted successfully!");
        router.push("/products");
      }
    } catch (error) {
      toast.error("Product cloudnt be deleted");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" />
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-blues py-6">
          <h1 className="text-center text-white text-3xl font-extrabold">
      ویرایش محصول {product.name}
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="px-8 py-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name
              </label>
              <Input
                type="text"
                name="name"
                id="name"
                value={product.name}
                onChange={handleChange}
                placeholder="Enter product name"
                className="w-full"
                required
              /></div>
                <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
         برچسب
              </label>
              <Input
                type="text"
                name="slug"
                id="slug"
                value={product.slug}
              
                placeholder="Enter product slug"
                className="w-full"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                برند
              </label>
              <select
                name="brand"
                id="brand"
                value={product.brand}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blues focus:border-blues sm:text-sm rounded-md"
                required
              >
                <option value="">No Parent</option>
                {brands.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                دسته بندی
              </label>
              <select
  name="categories"
  id="categories"
  value={product.categories}
  onChange={handleChange}
  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blues focus:border-blues sm:text-sm rounded-md"
  required
>
  <option value="">بدون دسته‌بندی مادر</option>

  {categories.map((cat) => (
    <React.Fragment key={cat._id}>
      <option value={cat._id}>
        {cat.title}
      </option>

      {/* اگر دسته‌بندی چیلد داشته باشه، چیلدها رو هم نمایش بده */}
      {cat.children && cat.children.length > 0 && cat.children.map((child) => (
        <option key={child._id} value={child._id}>
          --- {child.title}
        </option>
      ))}
    </React.Fragment>
  ))}
</select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Images
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            
            </div>
            <div>
            <div className="w-full max-w-sm">
              <ImagesList onImageSelect={setImagePath} />
              {/* <ImageUpload onImageUpload={setImagePath} /> */}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {imagePath.map((url, index) => (
                <div key={index} className="relative group">
                  <Image
                    height={400}
                    width={400}
                    className="h-36 w-full object-cover rounded-md"
                    src={url}
                    alt={`Uploaded image ${index + 1}`}
                  />
                  <button
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-md"
                    onClick={(e) => handleRemoveImage(e, url)}
                  >
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                جنس
              </label>
              <select
                name="material"
                id="material"
                value={product.material}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blues focus:border-blues sm:text-sm rounded-md"
                required
              >
                <option value="">انتخاب جنس محصول</option>
                <option value="کاغذ">کاغذ</option>
                <option value="پارچه">پارچه</option>
                <option value="وینیل ">وینیل </option>
                <option value=" الیاف بافته نشده">الیاف بافته نشده </option>
                <option value=" مواد طبیعی">مواد طبیعی </option>
                <option value=" فلز "> فلز </option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                قابلیت شستشو
              </label>
              <select
                name="washable"
                id="washable"
                value={product.washable}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blues focus:border-blues sm:text-sm rounded-md"
                required
              >
                <option value="">قابلیت شستشو</option>
                <option value="دارد">دارد</option>
                <option value="ندارد">ندارد</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                وضعیت محصول
              </label>
              <select
                name="condition"
                id="condition"
                value={product.condition}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blues focus:border-blues sm:text-sm rounded-md"
                required
              >
                <option value="">نوع محصول</option>
                <option value="نو">نو</option>
                <option value="استوک">استوک</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                محیط استفاده
              </label>
              <select
                name="place"
                id="place"
                value={product.place}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blues focus:border-blues sm:text-sm rounded-md"
              >
                <option value="">محیط استفاده</option>
                <option value="">همه مکان ها</option>
                <option value="">پذیرایی</option>
                <option value="">"اتاق خواب",</option>
                <option value="">اداری</option>
                <option value="">اتاق بازی</option>
                <option value="">آشپزخانه</option>
                <option value="">سرویس بهداشتی</option>
                <option value="">استودیو</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                وزن بسته بندی
              </label>
              <Input
                type="text"
                name="weight"
                id="weight"
                value={product.weight}
                onChange={handleChange}
                placeholder="e.g., 148 گرم"
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                رنگ پس زمینه
              </label>
              <Input
                type="text"
                name="color"
                id="color"
                value={product.color}
                onChange={handleChange}
                placeholder="سفید"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                مقاوم در برابر
              </label>
              <Input
                type="text"
                name="strong"
                id="strong"
                value={product.strong}
                onChange={handleChange}
                placeholder="مقاوم در برابر نور آفتاب"
                className="w-full"
              />
            </div>
          </div>

        
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ساخت کشور
              </label>
              <Input
                type="text"
                name="country"
                id="country"
                value={product.country}
                onChange={handleChange}
                placeholder="ایران"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                انتی استاتیک(ضدالکتریسیته ساکن)
              </label>
              <select
                name="antistatic"
                id="antistatic"
                value={product.antistatic}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blues focus:border-blues sm:text-sm rounded-md"
              >
                <option value="">قابلیت شستشو</option>
                <option value="">دارد</option>
                <option value="">ندارد</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                سایر ویژگی ها
              </label>
              <Input
                type="text"
                name="other"
                id="other"
                value={product.other}
                onChange={handleChange}
                placeholder="سایر ویژگی ها"
                className="w-full"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              توضیحات محصول
            </label>
            <Textarea
              name="description"
              id="description"
              value={product.description}
              onChange={handleChange}
              rows={4}
              className="shadow-sm focus:ring-blues focus:border-blues mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="توضیحات محصول"
              required
            />
          </div>
          <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
              توضیحات کامل محصول
            </label>
            <Textarea
              name="fullDescription"
              id="fullDescription"
              value={product.fullDescription}
              onChange={handleChange}
              rows={4}
              className="shadow-sm focus:ring-blues focus:border-blues mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="توضیحات کامل محصول"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                قیمت اصلی
              </label>
              <Input
                type="number"
                name="originalPrice"
                id="originalPrice"
                value={product.originalPrice}
                onChange={handleChange}
                placeholder="Enter original price"
                className="w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                قیمت تخفیف
              </label>
              <Input
                type="number"
                name="price"
                id="price"
                value={product.price}
                onChange={handleChange}
                placeholder="Enter sale price"
                className="w-full"
              />
            </div>
          </div>

          <div className="flex justify-between">
            <Button
              variant="myButton"
              type="submit"
              className="px-8 py-3 bg-blues text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blues focus:ring-offset-2"
            >
              Update Product
            </Button>
            <Button
              onClick={handleDelete}
              variant="destructive"
              className="px-8 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Delete Product
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
