"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { Loader2, X, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import ImagesList from "@/components/ImagesList";

// اسکیمای اعتبارسنجی
const productSchema = z.object({
  name: z.string().min(3, "نام محصول باید حداقل ۳ کاراکتر باشد"),
  slug: z.string().min(3, "برچسب باید حداقل ۳ کاراکتر باشد"),
  categories: z.string().min(1, "انتخاب دسته‌بندی الزامی است"),
  description: z.string().min(10, "توضیحات محصول باید حداقل ۱۰ کاراکتر باشد"),
  fullDescription: z
    .string()
    .min(20, "توضیحات کامل باید حداقل ۲۰ کاراکتر باشد"),
  originalPrice: z
    .string()
    .min(1, "قیمت اصلی الزامی است")
    .regex(/^\d+$/, "قیمت باید عددی باشد"),
  price: z.string().optional(),
  images: z.array(z.string()).min(1, "حداقل یک تصویر الزامی است"),
  variations: z.array(
    z.object({
      type: z.string().min(1, "نوع متغیر الزامی است"),
      options: z.array(
        z.object({
          name: z.string().min(1, "نام گزینه الزامی است"),
          price: z.string().min(1, "قیمت الزامی است"),
        })
      ).min(1, "حداقل یک گزینه الزامی است"),
    })
  ).min(1, "حداقل یک متغیر الزامی است"),
  seo: z.object({
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    focusKeyword: z.string().optional(),
  }).optional(),
});

const CreateProduct = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePath, setImagePath] = useState([]);
  const { toast } = useToast();

  // فرم و اعتبارسنجی
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      slug: "",
      categories: "",
      description: "",
      fullDescription: "",
      originalPrice: "",
      price: "",
      images: [],
      variations: [
        {
          type: "رنگ",
          options: [
            { name: "", price: "0" }
          ]
        },
        {
          type: "اندازه",
          options: [
            { name: "", price: "0" }
          ]
        },
        {
          type: "ضخامت",
          options: [
            { name: "", price: "0" }
          ]
        }
      ],
      seo: {
        metaTitle: "",
        metaDescription: "",
        focusKeyword: "",
      }
    },
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
      return;
    }

    // تنظیم کاربر فعلی
    setValue("user", session?.user?._id);
  }, [status, router, session, setValue]);

  // دریافت دسته‌بندی‌ها
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesRes = await axios.get("/api/categories");
        setCategories(categoriesRes.data.categories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);

  // حذف تصویر
  const handleRemoveImage = (urlToRemove) => {
    const newImagePath = imagePath.filter((url) => url !== urlToRemove);
    setImagePath(newImagePath);
    setValue("images", newImagePath); // به‌روزرسانی فیلد images در فرم
  };

  // به‌روزرسانی تصاویر در فرم
  useEffect(() => {
    setValue("images", imagePath);
  }, [imagePath, setValue]);

  // مدیریت متغیرها
  const addVariationOption = (variationIndex) => {
    const variations = [...watch("variations")];
    variations[variationIndex].options.push({ name: "", price: "0" });
    setValue("variations", variations);
  };

  const removeVariationOption = (variationIndex, optionIndex) => {
    const variations = [...watch("variations")];
    variations[variationIndex].options.splice(optionIndex, 1);
    setValue("variations", variations);
  };

  // ارسال فرم
  const onSubmit = async (data) => {
    // console.log("Form Data:", data);
    // console.log("ImagePath State:", imagePath);
    
    // بررسی اینکه آیا تصاویر موجود است
    if (!data.images || data.images.length === 0) {
      // console.error("No images in form data");
      return;
    }
    
    try {
      setIsLoading(true);
      const productData = {
        ...data,
        images: data.images, // استفاده از data.images به جای imagePath
        user: session?.user?._id,
      };

      const response = await axios.post("/api/products", productData);
      
      if (response.status === 200 || response.status === 201) {
        router.push("/");
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error("Error creating product:", error);
      }
      toast({
        title: "خطا",
        description: "خطا در ایجاد محصول. لطفاً دوباره تلاش کنید.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 w-full">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-indigo-100">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 py-6 px-8">
          <h1 className="text-center text-white text-3xl font-bold">
            ثبت محصول جدید
          </h1>
        </div>
        
        <form 
          onSubmit={handleSubmit(onSubmit)} 
          className="px-6 py-8 space-y-8"
        >
          {/* بخش اطلاعات پایه محصول */}
          <div className="border-b border-gray-200 pb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <div className="w-2 h-8 bg-indigo-600 rounded-full mr-3"></div>
              اطلاعات پایه محصول
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  نام محصول *
                </label>
                <Input
                  {...register("name")}
                  className={errors.name ? "border-red-500" : ""}
                  placeholder="نام محصول خود را وارد کنید"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  برچسب (نامک) *
                </label>
                <Input
                  {...register("slug")}
                  className={errors.slug ? "border-red-500" : ""}
                  placeholder="نامک محصول (برای SEO)"
                />
                {errors.slug && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.slug.message}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  دسته‌بندی *
                </label>
                <Controller
                  name="categories"
                  control={control}
                  render={({ field }) => (
                    <Select 
                      onValueChange={field.onChange} 
                      value={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="انتخاب دسته‌بندی" />
                      </SelectTrigger>
                      <SelectContent>
                        {/* حذف گزینه با مقدار خالی */}
                        {categories.map((cat) => (
                          <React.Fragment key={cat._id}>
                            <SelectItem value={cat._id}>
                              {cat.title}
                            </SelectItem>
                            {cat.children?.map((child) => (
                              <SelectItem
                                key={child._id}
                                value={child._id}
                                className="pr-8"
                              >
                                &nbsp;&nbsp;├ {child.title}
                              </SelectItem>
                            ))}
                          </React.Fragment>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.categories && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.categories.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          
          {/* بخش تصاویر محصول */}
          <div className="border-b border-gray-200 pb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <div className="w-2 h-8 bg-indigo-600 rounded-full mr-3"></div>
              تصاویر محصول
            </h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                آپلود تصاویر *
              </label>
              <ImagesList 
                onImageSelect={(images) => {
                  setImagePath(images);
                  setValue("images", images);
                }}
                maxImages={8}
              />
              {errors.images && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.images.message}
                </p>
              )}
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                تصاویر انتخاب شده
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {imagePath.map((url, index) => (
                  <div
                    key={index}
                    className="relative group border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <Image
                      height={200}
                      width={200}
                      className="h-40 w-full object-cover"
                      src={url}
                      alt={`تصویر محصول ${index + 1}`}
                    />
                    <button
                      type="button"
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      onClick={() => handleRemoveImage(url)}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* بخش متغیرهای محصول */}
          <div className="border-b border-gray-200 pb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <div className="w-2 h-8 bg-indigo-600 rounded-full mr-3"></div>
              متغیرهای محصول
            </h2>
            
            <div className="space-y-8">
              {watch("variations")?.map((variation, variationIndex) => (
                <div key={variationIndex} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium text-gray-700">
                      {variation.type === "رنگ" ? "رنگ" : variation.type === "اندازه" ? "اندازه" : "ضخامت"}
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    {variation.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                        <div className="md:col-span-5">
                          <label className="block text-sm text-gray-600 mb-1">
                            نام گزینه
                          </label>
                          <Input
                            value={option.name}
                            onChange={(e) => {
                              const variations = [...watch("variations")];
                              variations[variationIndex].options[optionIndex].name = e.target.value;
                              setValue("variations", variations);
                            }}
                            placeholder={variation.type === "رنگ" ? "نام رنگ" : "اندازه"}
                          />
                        </div>
                        
                        <div className="md:col-span-5">
                          <label className="block text-sm text-gray-600 mb-1">
                            قیمت اضافی (تومان)
                          </label>
                          <Input
                            type="number"
                            value={option.price}
                            onChange={(e) => {
                              const variations = [...watch("variations")];
                              variations[variationIndex].options[optionIndex].price = e.target.value;
                              setValue("variations", variations);
                            }}
                            placeholder="قیمت اضافی"
                          />
                        </div>
                        
                        <div className="md:col-span-2 flex justify-end">
                          <Button
                            type="button"
                            variant="destructive"
                            className="p-2"
                            onClick={() => removeVariationOption(variationIndex, optionIndex)}
                            disabled={variation.options.length <= 1}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    
                    <div className="flex justify-end">
                      <Button
                        type="button"
                        variant="outline"
                        className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 gap-1"
                        onClick={() => addVariationOption(variationIndex)}
                      >
                        <Plus className="w-4 h-4" />
                        افزودن گزینه جدید
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-medium text-blue-800 mb-2">نحوه محاسبه قیمت</h3>
                <p className="text-sm text-blue-700">
                  قیمت نهایی محصول = قیمت پایه + مجموع قیمت‌های اضافی انتخاب‌شده
                </p>
              </div>
            </div>
          </div>
          
          {/* بخش توضیحات */}
          <div className="border-b border-gray-200 pb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <div className="w-2 h-8 bg-indigo-600 rounded-full mr-3"></div>
              توضیحات محصول
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  توضیحات کوتاه *
                </label>
                <Textarea
                  rows={3}
                  className={errors.description ? "border-red-500" : ""}
                  placeholder="توضیحات مختصر محصول"
                  {...register("description")}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.description.message}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  توضیحات کامل *
                </label>
                <Textarea
                  rows={5}
                  className={errors.fullDescription ? "border-red-500" : ""}
                  placeholder="توضیحات کامل محصول"
                  {...register("fullDescription")}
                />
                {errors.fullDescription && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.fullDescription.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          
          {/* بخش قیمت‌گذاری */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <div className="w-2 h-8 bg-indigo-600 rounded-full mr-3"></div>
              قیمت‌گذاری پایه
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  قیمت پایه (تومان) *
                </label>
                <Input
                  type="number"
                  className={errors.originalPrice ? "border-red-500" : ""}
                  placeholder="قیمت پایه محصول"
                  {...register("originalPrice")}
                />
                {errors.originalPrice && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.originalPrice.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          
          {/* بخش SEO */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <div className="w-2 h-8 bg-green-600 rounded-full mr-3"></div>
              تنظیمات SEO
            </h2>
            
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  عنوان SEO (Meta Title)
                </label>
                <Input
                  placeholder="عنوان برای موتورهای جستجو (حداکثر 60 کاراکتر)"
                  maxLength={60}
                  {...register("seo.metaTitle")}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {watch("seo.metaTitle")?.length || 0}/60 کاراکتر
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  توضیحات SEO (Meta Description)
                </label>
                <Textarea
                  rows={3}
                  placeholder="توضیحی کوتاه برای موتورهای جستجو (حداکثر 160 کاراکتر)"
                  maxLength={160}
                  {...register("seo.metaDescription")}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {watch("seo.metaDescription")?.length || 0}/160 کاراکتر
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  کلمه کلیدی اصلی
                </label>
                <Input
                  placeholder="کلمه کلیدی اصلی محصول"
                  {...register("seo.focusKeyword")}
                />
              </div>
            </div>
          </div>
          
          {/* دکمه ثبت */}
          <div className="flex justify-end pt-8">
            <Button
              type="submit"
              className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 px-8 py-6 text-lg font-medium text-white shadow-lg transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  در حال ثبت...
                </>
              ) : (
                "ثبت محصول"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;