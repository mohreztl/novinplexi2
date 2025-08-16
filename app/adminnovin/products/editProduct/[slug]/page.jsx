"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Save,
  ArrowRight,
  Eye,
  Trash2
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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

const EditProduct = ({ params }) => {
  const { slug } = params;
  const { data: session, status } = useSession();
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [imagePath, setImagePath] = useState([]);
  const { toast } = useToast();

  // فرم و اعتبارسنجی
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
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

  // بارگذاری اطلاعات محصول
  useEffect(() => {
    const fetchProductData = async () => {
      if (!slug) return;
      
      try {
        setLoadingData(true);
        
        // بارگذاری محصول و دسته‌بندی‌ها
        const [productRes, categoriesRes] = await Promise.all([
          axios.get(`/api/product/${slug}`),
          axios.get("/api/categories")
        ]);

        const productData = productRes.data;
        setCategories(categoriesRes.data.categories || []);
        
        // تنظیم مقادیر فرم
        reset({
          title: productData.title || "",
          slug: productData.slug || "",
          category: productData.category || "",
          description: productData.description || "",
          fullDescription: productData.fullDescription || "",
          basePrice: productData.basePrice?.toString() || "",
          images: productData.images || [],
          variants: {
            thicknesses: productData.variants?.thicknesses || [],
            sizes: productData.variants?.sizes || [],
            colors: productData.variants?.colors || []
          },
          isPublished: productData.isPublished !== false,
          seo: {
            metaTitle: productData.seo?.metaTitle || "",
            metaDescription: productData.seo?.metaDescription || "",
            focusKeyword: productData.seo?.focusKeyword || "",
            keywords: productData.seo?.keywords || [],
          },
        });

        setImagePath(productData.images || []);
        
      } catch (error) {
        console.error("Error fetching product:", error);
        toast({
          title: "خطا",
          description: "خطا در بارگذاری اطلاعات محصول",
          variant: "destructive",
        });
      } finally {
        setLoadingData(false);
      }
    };

    fetchProductData();
  }, [slug, reset, toast]);

  // حذف تصویر
  const handleRemoveImage = (urlToRemove) => {
    const updatedImages = imagePath.filter((url) => url !== urlToRemove);
    setImagePath(updatedImages);
    setValue("images", updatedImages);
  };

  // اضافه کردن تصویر
  const handleImageSelect = (selectedImages) => {
    const newImages = [...imagePath, ...selectedImages];
    setImagePath(newImages);
    setValue("images", newImages);
  };

  // اضافه کردن گزینه جدید برای متغیرها
  const addVariantOption = (type) => {
    const currentVariants = watch("variants") || { thicknesses: [], sizes: [], colors: [] };
    const newOption = { name: "", extraPrice: "0" };
    
    setValue("variants", {
      ...currentVariants,
      [type]: [...(currentVariants[type] || []), newOption]
    });
  };

  // حذف گزینه از متغیرها
  const removeVariantOption = (type, index) => {
    const currentVariants = watch("variants") || { thicknesses: [], sizes: [], colors: [] };
    const newOptions = (currentVariants[type] || []).filter((_, i) => i !== index);
    
    setValue("variants", {
      ...currentVariants,
      [type]: newOptions
    });
  };

  // بروزرسانی گزینه متغیر
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
      
      console.log('Edit Product - Form data:', data);
      console.log('Edit Product - Variants data:', data.variants);
      
      const productData = {
        title: data.title,
        name: data.title, // اضافه کردن فیلد name
        slug: data.slug,
        description: data.description,
        fullDescription: data.fullDescription,
        basePrice: Number(data.basePrice),
        images: data.images,
        category: data.category,
        variants: data.variants || { thicknesses: [], sizes: [], colors: [] },
        isPublished: data.isPublished,
        seo: data.seo,
      };

      console.log('Edit Product - Sending productData:', productData);

      const response = await axios.put(`/api/product/${slug}`, productData);
      
      if (response.status === 200) {
        toast({
          title: "موفقیت",
          description: "محصول با موفقیت بروزرسانی شد",
        });
        router.push("/adminnovin/products");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast({
        title: "خطا",
        description: "خطا در بروزرسانی محصول",
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

  if (status === "loading" || loadingData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.replace("/login");
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">ویرایش محصول</h1>
          <p className="text-gray-600 mt-1">اطلاعات محصول را ویرایش کنید</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowRight className="w-4 h-4" />
            بازگشت
          </Button>
          <Button 
            variant="outline"
            asChild
          >
            <a href={`/product/${watch("slug")}`} target="_blank" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              پیش‌نمایش
            </a>
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="basic" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              اطلاعات پایه
            </TabsTrigger>
            <TabsTrigger value="images" className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              تصاویر
            </TabsTrigger>
            <TabsTrigger value="variants" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              متغیرها
            </TabsTrigger>
            <TabsTrigger value="seo" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              SEO
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              تنظیمات
            </TabsTrigger>
          </TabsList>

          {/* اطلاعات پایه */}
          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  اطلاعات پایه محصول
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* نام محصول */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      نام محصول *
                    </label>
                    <Input
                      {...register("title")}
                      onChange={handleTitleChange}
                      placeholder="نام محصول را وارد کنید"
                      className={errors.title ? "border-red-500" : ""}
                    />
                    {errors.title && (
                      <p className="text-sm text-red-500">{errors.title.message}</p>
                    )}
                  </div>

                  {/* اسلاگ */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      اسلاگ (برچسب URL) *
                    </label>
                    <Input
                      {...register("slug")}
                      placeholder="product-slug"
                      className={errors.slug ? "border-red-500" : ""}
                    />
                    {errors.slug && (
                      <p className="text-sm text-red-500">{errors.slug.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* دسته‌بندی */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      دسته‌بندی *
                    </label>
                    <Controller
                      name="category"
                      control={control}
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                            <SelectValue placeholder="دسته‌بندی را انتخاب کنید" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category._id} value={category.title}>
                                {category.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.category && (
                      <p className="text-sm text-red-500">{errors.category.message}</p>
                    )}
                  </div>

                  {/* قیمت */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      قیمت پایه (تومان) *
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        {...register("basePrice")}
                        type="number"
                        placeholder="0"
                        className={`pl-10 ${errors.basePrice ? "border-red-500" : ""}`}
                      />
                    </div>
                    {errors.basePrice && (
                      <p className="text-sm text-red-500">{errors.basePrice.message}</p>
                    )}
                  </div>
                </div>

                {/* توضیحات کوتاه */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    توضیحات کوتاه *
                  </label>
                  <Textarea
                    {...register("description")}
                    placeholder="توضیحات کوتاه محصول..."
                    rows={3}
                    className={errors.description ? "border-red-500" : ""}
                  />
                  {errors.description && (
                    <p className="text-sm text-red-500">{errors.description.message}</p>
                  )}
                </div>

                {/* توضیحات کامل */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    توضیحات کامل
                  </label>
                  <Controller
                    name="fullDescription"
                    control={control}
                    render={({ field }) => (
                      <RichTextEditor
                        content={field.value}
                        onChange={field.onChange}
                        placeholder="توضیحات کامل محصول..."
                      />
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* تصاویر */}
          <TabsContent value="images">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5" />
                  مدیریت تصاویر
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* تصاویر انتخاب شده */}
                {imagePath.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-4">تصاویر انتخاب شده ({imagePath.length})</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {imagePath.map((imageUrl, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-square rounded-lg overflow-hidden border border-gray-200">
                            <img
                              src={imageUrl}
                              alt={`Product ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleRemoveImage(imageUrl)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                          {index === 0 && (
                            <Badge className="absolute bottom-2 left-2 text-xs">
                              تصویر اصلی
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* انتخاب تصاویر جدید */}
                <div>
                  <h3 className="text-lg font-medium mb-4">انتخاب تصاویر جدید</h3>
                  <ImagesList onImageSelect={handleImageSelect} maxSelection={10} />
                </div>

                {errors.images && (
                  <p className="text-sm text-red-500">{errors.images.message}</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* متغیرها */}
          <TabsContent value="variants">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  متغیرهای محصول
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* ضخامت‌ها */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">ضخامت‌ها</h3>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addVariantOption("thicknesses")}
                      className="flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" />
                      افزودن ضخامت
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {(watch("variants")?.thicknesses || []).map((thickness, index) => (
                      <div key={index} className="flex gap-3 items-start p-4 border border-gray-200 rounded-lg">
                        <div className="flex-1">
                          <Input
                            placeholder="نام ضخامت (مثل: 3mm)"
                            value={thickness.name || ""}
                            onChange={(e) => updateVariantOption("thicknesses", index, "name", e.target.value)}
                          />
                        </div>
                        <div className="w-32">
                          <Input
                            type="number"
                            placeholder="قیمت اضافی"
                            value={thickness.extraPrice || ""}
                            onChange={(e) => updateVariantOption("thicknesses", index, "extraPrice", e.target.value)}
                          />
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeVariantOption("thicknesses", index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* اندازه‌ها */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">اندازه‌ها</h3>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addVariantOption("sizes")}
                      className="flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" />
                      افزودن اندازه
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {(watch("variants")?.sizes || []).map((size, index) => (
                      <div key={index} className="flex gap-3 items-start p-4 border border-gray-200 rounded-lg">
                        <div className="flex-1">
                          <Input
                            placeholder="نام اندازه (مثل: 30x40)"
                            value={size.name || ""}
                            onChange={(e) => updateVariantOption("sizes", index, "name", e.target.value)}
                          />
                        </div>
                        <div className="w-32">
                          <Input
                            type="number"
                            placeholder="قیمت اضافی"
                            value={size.extraPrice || ""}
                            onChange={(e) => updateVariantOption("sizes", index, "extraPrice", e.target.value)}
                          />
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeVariantOption("sizes", index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* رنگ‌ها */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">رنگ‌ها</h3>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addVariantOption("colors")}
                      className="flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" />
                      افزودن رنگ
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {(watch("variants")?.colors || []).map((color, index) => (
                      <div key={index} className="flex gap-3 items-start p-4 border border-gray-200 rounded-lg">
                        <div className="flex-1">
                          <Input
                            placeholder="نام رنگ (مثل: قرمز)"
                            value={color.name || ""}
                            onChange={(e) => updateVariantOption("colors", index, "name", e.target.value)}
                          />
                        </div>
                        <div className="w-32">
                          <Input
                            type="number"
                            placeholder="قیمت اضافی"
                            value={color.extraPrice || ""}
                            onChange={(e) => updateVariantOption("colors", index, "extraPrice", e.target.value)}
                          />
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeVariantOption("colors", index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SEO */}
          <TabsContent value="seo">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  تنظیمات SEO
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    عنوان متا (Meta Title)
                  </label>
                  <Input
                    {...register("seo.metaTitle")}
                    placeholder="عنوان صفحه برای موتورهای جستجو"
                    maxLength={60}
                  />
                  <p className="text-xs text-gray-500">
                    {watch("seo.metaTitle")?.length || 0}/60 کاراکتر
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    توضیحات متا (Meta Description)
                  </label>
                  <Textarea
                    {...register("seo.metaDescription")}
                    placeholder="توضیحات صفحه برای موتورهای جستجو"
                    rows={3}
                    maxLength={160}
                  />
                  <p className="text-xs text-gray-500">
                    {watch("seo.metaDescription")?.length || 0}/160 کاراکتر
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    کلمه کلیدی اصلی
                  </label>
                  <Input
                    {...register("seo.focusKeyword")}
                    placeholder="کلمه کلیدی اصلی محصول"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* تنظیمات */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  تنظیمات عمومی
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-900">
                      وضعیت انتشار
                    </label>
                    <p className="text-sm text-gray-500">
                      محصول منتشر شده باشد یا در حالت پیش‌نویس
                    </p>
                  </div>
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
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* دکمه‌های عملیات */}
        <div className="flex justify-end gap-4 pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            انصراف
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            بروزرسانی محصول
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
