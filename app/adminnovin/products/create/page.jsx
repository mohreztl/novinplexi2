"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { 
  Loader2, 
  X, 
  Plus, 
  Package, 
  ImageIcon, 
  DollarSign, 
  Settings, 
  Search,
  Save,
  ArrowRight
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import ImagesList from "@/components/ImagesList";
import RichTextEditor from "@/components/RichTextEditor";
import { Switch } from "@/components/ui/switch";

// اسکیمای اعتبارسنجی
const productSchema = z.object({
  title: z.string().min(3, "نام محصول باید حداقل ۳ کاراکتر باشد"),
  slug: z.string().min(3, "برچسب باید حداقل ۳ کاراکتر باشد"),
  category: z.string().min(1, "انتخاب دسته‌بندی الزامی است"),
  description: z.string().min(10, "توضیحات محصول باید حداقل ۱۰ کاراکتر باشد"),
  basePrice: z
    .string()
    .min(1, "قیمت اصلی الزامی است")
    .regex(/^\d+$/, "قیمت باید عددی باشد"),
  images: z.array(z.string()).min(1, "حداقل یک تصویر الزامی است"),
  variants: z.object({
    thicknesses: z.array(
      z.object({
        name: z.string().min(1, "نام ضخامت الزامی است"),
        extraPrice: z.string().regex(/^\d+$/, "قیمت اضافی باید عددی باشد")
      })
    ).optional(),
    sizes: z.array(
      z.object({
        name: z.string().min(1, "نام اندازه الزامی است"),
        extraPrice: z.string().regex(/^\d+$/, "قیمت اضافی باید عددی باشد")
      })
    ).optional(),
    colors: z.array(
      z.object({
        name: z.string().min(1, "نام رنگ الزامی است"),
        extraPrice: z.string().regex(/^\d+$/, "قیمت اضافی باید عددی باشد")
      })
    ).optional(),
  }).optional(),
  isPublished: z.boolean(),
  seo: z.object({
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    focusKeyword: z.string().optional(),
    keywords: z.array(z.string()).optional(),
  }).optional(),
  fullDescription: z.string().optional(),
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
      title: "",
      slug: "",
      category: "",
      description: "",
      fullDescription: "",
      basePrice: "",
      images: [],
      variants: {
        thicknesses: [],
        sizes: [],
        colors: []
      },
      isPublished: true,
      seo: { metaTitle: "", metaDescription: "", focusKeyword: "", keywords: [] },
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

  // تنظیم متغیر اولیه
  useEffect(() => {
    // تنظیم اولیه متغیرها
    setValue("variants", {
      thicknesses: [],
      sizes: [],
      colors: []
    });
  }, [setValue]);

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
    setValue("images", newImagePath);
  };

  // به‌روزرسانی تصاویر در فرم
  useEffect(() => {
    setValue("images", imagePath);
  }, [imagePath, setValue]);

  // مدیریت متغیرها
  const addVariantOption = (type) => {
    const currentVariants = watch("variants") || { thicknesses: [], sizes: [], colors: [] };
    const newOption = { name: "", extraPrice: "0" };
    
    setValue("variants", {
      ...currentVariants,
      [type]: [...(currentVariants[type] || []), newOption]
    });
  };

  const removeVariantOption = (type, index) => {
    const currentVariants = watch("variants") || { thicknesses: [], sizes: [], colors: [] };
    const newOptions = (currentVariants[type] || []).filter((_, i) => i !== index);
    
    setValue("variants", {
      ...currentVariants,
      [type]: newOptions
    });
  };

  const updateVariantOption = (type, index, field, value) => {
    const currentVariants = watch("variants") || { thicknesses: [], sizes: [], colors: [] };
    const newOptions = [...(currentVariants[type] || [])];
    newOptions[index] = { ...newOptions[index], [field]: value };
    
    setValue("variants", {
      ...currentVariants,
      [type]: newOptions
    });
  };

  // ارسال فرم
  const onSubmit = async (data) => {
    if (!data.images || data.images.length === 0) {
      toast({
        title: "خطا",
        description: "لطفاً حداقل یک تصویر انتخاب کنید",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      
      console.log('Create Product - Form data:', data);
      console.log('Create Product - Variants data:', data.variants);
      
      const productData = {
        name: data.title,
        title: data.title,
        slug: data.slug,
        description: data.description,
        fullDescription: data.fullDescription,
        basePrice: Number(data.basePrice),
        images: data.images,
        category: data.category,
        variants: data.variants || { thicknesses: [], sizes: [], colors: [] },
        isPublished: data.isPublished,
        seo: data.seo,
        user: session?.user?._id,
      };

      console.log('Create Product - Sending productData:', productData);

      const response = await axios.post("/api/products", productData);
      
      if (response.data.success) {
        toast({
          title: "موفقیت",
          description: "محصول با موفقیت ایجاد شد",
        });
        router.push("/adminnovin/products");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      toast({
        title: "خطا",
        description: "خطا در ایجاد محصول",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // تولید slug از عنوان
  const generateSlug = (title) => {
    try {
      if (!title || typeof title !== 'string') return '';
      
      return title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
    } catch (error) {
      console.error('Error generating slug:', error);
      return '';
    }
  };

  // تغییر عنوان و تولید slug
  const handleTitleChange = (e) => {
    const title = e.target.value;
    setValue("title", title);
    setValue("slug", generateSlug(title));
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            ایجاد محصول جدید
          </h1>
          <p className="text-gray-600 mt-2">
            محصول جدید خود را با جزئیات کامل اضافه کنید
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* بخش اطلاعات اصلی */}
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
              <CardTitle className="flex items-center gap-3">
                <Package className="w-5 h-5" />
                اطلاعات اصلی محصول
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    نام محصول *
                  </label>
                  <Input
                    className={errors.title ? "border-red-500" : ""}
                    placeholder="نام محصول را وارد کنید"
                    {...register("title")}
                    onChange={handleTitleChange}
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    برچسب (Slug) *
                  </label>
                  <Input
                    className={errors.slug ? "border-red-500" : ""}
                    placeholder="برچسب محصول"
                    {...register("slug")}
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
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                          <SelectValue placeholder="دسته‌بندی را انتخاب کنید" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category._id} value={category._id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    وضعیت انتشار
                  </label>
                  <Controller
                    name="isPublished"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* بخش تصاویر */}
          <Card className="shadow-lg border-0 h-auto z-50">
            <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
              <CardTitle className="flex items-center gap-3">
                <ImageIcon className="w-5 h-5" />
                تصاویر محصول
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div>
                <div className="z-50">
                <ImagesList 
                  images={imagePath}
                  onImagesChange={(selectedImages) => {
                    setValue('images', selectedImages);
                    setImagePath(selectedImages);
                  }}
                  maxImages={5}
                />
                </div>
                {imagePath.length > 0 && (
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      تصاویر انتخاب شده
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {Array.isArray(imagePath) && imagePath.map((url, index) => (
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
                )}
                
                {errors.images && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.images.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* بخش توضیحات */}
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <CardTitle className="flex items-center gap-3">
                <Package className="w-5 h-5" />
                توضیحات محصول
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
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
                    توضیحات کامل
                  </label>
                  <Controller
                    name="fullDescription"
                    control={control}
                    render={({ field }) => (
                      <RichTextEditor
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="توضیحات کامل محصول را وارد کنید..."
                      />
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* بخش قیمت‌گذاری */}
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-emerald-500 to-green-500 text-white">
              <CardTitle className="flex items-center gap-3">
                <DollarSign className="w-5 h-5" />
                قیمت‌گذاری پایه
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    قیمت پایه (تومان) *
                  </label>
                  <Input
                    type="number"
                    className={errors.basePrice ? "border-red-500" : ""}
                    placeholder="قیمت پایه محصول"
                    {...register("basePrice")}
                  />
                  {errors.basePrice && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.basePrice.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* بخش متغیرهای محصول */}
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
              <CardTitle className="flex items-center gap-3">
                <Settings className="w-5 h-5" />
                متغیرهای محصول
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-8">
                
                {/* بخش ضخامت */}
                <div className="border border-gray-200 rounded-lg p-6 bg-blue-50">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                      <div className="w-4 h-4 bg-blue-500 rounded"></div>
                      ضخامت
                    </h3>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="border-blue-600 text-blue-600 hover:bg-blue-50"
                      onClick={() => addVariantOption('thicknesses')}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      افزودن ضخامت
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {(watch("variants")?.thicknesses || []).map((thickness, index) => (
                      <div key={index} className="flex gap-3 items-end">
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            نام ضخامت
                          </label>
                          <Input
                            value={thickness.name || ""}
                            onChange={(e) => updateVariantOption('thicknesses', index, 'name', e.target.value)}
                            placeholder="مثال: 2mm، 5mm، 10mm"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            قیمت اضافی (تومان)
                          </label>
                          <Input
                            type="number"
                            value={thickness.extraPrice || ""}
                            onChange={(e) => updateVariantOption('thicknesses', index, 'extraPrice', e.target.value)}
                            placeholder="0"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeVariantOption('thicknesses', index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    
                    {(!watch("variants")?.thicknesses || watch("variants").thicknesses.length === 0) && (
                      <p className="text-gray-500 text-center py-4">هنوز ضخامتی اضافه نشده است</p>
                    )}
                  </div>
                </div>

                {/* بخش اندازه */}
                <div className="border border-gray-200 rounded-lg p-6 bg-green-50">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded"></div>
                      اندازه
                    </h3>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="border-green-600 text-green-600 hover:bg-green-50"
                      onClick={() => addVariantOption('sizes')}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      افزودن اندازه
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {(watch("variants")?.sizes || []).map((size, index) => (
                      <div key={index} className="flex gap-3 items-end">
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            نام اندازه
                          </label>
                          <Input
                            value={size.name || ""}
                            onChange={(e) => updateVariantOption('sizes', index, 'name', e.target.value)}
                            placeholder="مثال: کوچک، متوسط، بزرگ"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            قیمت اضافی (تومان)
                          </label>
                          <Input
                            type="number"
                            value={size.extraPrice || ""}
                            onChange={(e) => updateVariantOption('sizes', index, 'extraPrice', e.target.value)}
                            placeholder="0"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeVariantOption('sizes', index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    
                    {(!watch("variants")?.sizes || watch("variants").sizes.length === 0) && (
                      <p className="text-gray-500 text-center py-4">هنوز اندازه‌ای اضافه نشده است</p>
                    )}
                  </div>
                </div>

                {/* بخش رنگ */}
                <div className="border border-gray-200 rounded-lg p-6 bg-purple-50">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                      <div className="w-4 h-4 bg-purple-500 rounded"></div>
                      رنگ
                    </h3>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="border-purple-600 text-purple-600 hover:bg-purple-50"
                      onClick={() => addVariantOption('colors')}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      افزودن رنگ
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {(watch("variants")?.colors || []).map((color, index) => (
                      <div key={index} className="flex gap-3 items-end">
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            نام رنگ
                          </label>
                          <Input
                            value={color.name || ""}
                            onChange={(e) => updateVariantOption('colors', index, 'name', e.target.value)}
                            placeholder="مثال: قرمز، آبی، سفید"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            قیمت اضافی (تومان)
                          </label>
                          <Input
                            type="number"
                            value={color.extraPrice || ""}
                            onChange={(e) => updateVariantOption('colors', index, 'extraPrice', e.target.value)}
                            placeholder="0"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeVariantOption('colors', index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    
                    {(!watch("variants")?.colors || watch("variants").colors.length === 0) && (
                      <p className="text-gray-500 text-center py-4">هنوز رنگی اضافه نشده است</p>
                    )}
                  </div>
                </div>

                {/* راهنما */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-medium text-blue-800 mb-2">راهنما</h3>
                  <p className="text-sm text-blue-700">
                    برای هر محصول می‌توانید ضخامت‌ها، اندازه‌ها و رنگ‌های مختلف تعریف کنید. هر گزینه می‌تواند قیمت اضافی داشته باشد که به قیمت پایه محصول اضافه می‌شود.
                  </p>
                  <p className="text-sm text-blue-700 mt-2">
                    <strong>مثال:</strong> قیمت پایه 100,000 تومان + ضخامت 10mm (50,000 تومان) + رنگ قرمز (20,000 تومان) = 170,000 تومان
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* بخش SEO */}
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white">
              <CardTitle className="flex items-center gap-3">
                <Search className="w-5 h-5" />
                تنظیمات SEO
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
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
                    placeholder="کلمه کلیدی اصلی برای SEO"
                    {...register("seo.focusKeyword")}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* دکمه ثبت */}
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 px-12 py-4 text-lg font-medium text-white shadow-lg transition-all flex items-center gap-3"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      در حال ثبت...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      ثبت محصول
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
