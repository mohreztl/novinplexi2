"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
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
  FileText, 
  Image as ImageIcon, 
  Eye,
  Plus,
  ArrowRight,
  Tag
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
import Image from "next/image";

// اسکیمای اعتبارسنجی
const blogSchema = z.object({
  title: z.string().min(4, "عنوان باید حداقل ۴ کاراکتر باشد"),
  slug: z.string().min(3, "برچسب باید حداقل ۳ کاراکتر باشد"),
  category: z.string().min(1, "انتخاب دسته‌بندی الزامی است"),
  excerpt: z.string().min(10, "خلاصه باید حداقل ۱۰ کاراکتر باشد"),
  description: z.string().min(20, "محتوا باید حداقل ۲۰ کاراکتر باشد"),
  image: z.string().min(1, "انتخاب تصویر الزامی است"),
  tags: z.array(z.string()).optional(),
  isPublished: z.boolean(),
  seo: z.object({
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    focusKeyword: z.string().optional(),
  }).optional(),
});

const CreateBlog = () => {
  const { status } = useSession();
  const router = useRouter();
  const [categories] = useState([
    "تکنولوژی",
    "طراحی",
    "مهندسی",
    "معماری",
    "دکوراسیون",
    "صنعت",
    "آموزش"
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [newTag, setNewTag] = useState("");
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
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      slug: "",
      category: "",
      excerpt: "",
      description: "",
      image: "",
      tags: [],
      isPublished: false,
      seo: { metaTitle: "", metaDescription: "", focusKeyword: "" },
    },
  });

  // انتخاب تصویر
  const handleImageSelect = (selectedImages) => {
    if (selectedImages.length > 0) {
      const imageUrl = selectedImages[0];
      setSelectedImage(imageUrl);
      setValue("image", imageUrl);
    }
  };

  // حذف تصویر
  const handleRemoveImage = () => {
    setSelectedImage("");
    setValue("image", "");
  };

  // اضافه کردن تگ
  const addTag = () => {
    if (newTag.trim() && !watch("tags").includes(newTag.trim())) {
      const currentTags = watch("tags") || [];
      setValue("tags", [...currentTags, newTag.trim()]);
      setNewTag("");
    }
  };

  // حذف تگ
  const removeTag = (tagToRemove) => {
    const currentTags = watch("tags") || [];
    setValue("tags", currentTags.filter(tag => tag !== tagToRemove));
  };

  // ارسال فرم
  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      
      const blogData = {
        title: data.title,
        slug: data.slug,
        category: data.category,
        excerpt: data.excerpt,
        description: data.description,
        image: data.image,
        tags: data.tags || [],
        isPublished: data.isPublished,
        seo: data.seo,
      };

      const response = await fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      });
      
      if (response.status === 201) {
        toast({
          title: "موفقیت",
          description: "مقاله با موفقیت ایجاد شد",
        });
        router.push("/adminnovin/blog");
      } else {
        throw new Error("خطا در ایجاد مقاله");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      toast({
        title: "خطا",
        description: "خطا در ایجاد مقاله",
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
        .replace(/[^a-z0-9\u0600-\u06FF\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim();
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
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">دسترسی محدود</h1>
        <p className="text-gray-600">برای دسترسی به این صفحه باید وارد شوید</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">ایجاد مقاله جدید</h1>
          <p className="text-gray-600 mt-1">مقاله جدید خود را ایجاد کنید</p>
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
          {watch("slug") && (
            <Button 
              variant="outline"
              asChild
            >
              <a href={`/blog/${watch("slug")}`} target="_blank" className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                پیش‌نمایش
              </a>
            </Button>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              اطلاعات پایه
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              محتوا
            </TabsTrigger>
            <TabsTrigger value="media" className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              رسانه
            </TabsTrigger>
            <TabsTrigger value="seo" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              SEO
            </TabsTrigger>
          </TabsList>

          {/* اطلاعات پایه */}
          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  اطلاعات پایه مقاله
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* عنوان */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      عنوان مقاله *
                    </label>
                    <Input
                      {...register("title")}
                      onChange={handleTitleChange}
                      placeholder="عنوان مقاله را وارد کنید"
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
                      placeholder="blog-slug"
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
                              <SelectItem key={category} value={category}>
                                {category}
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

                  {/* وضعیت انتشار */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      وضعیت انتشار
                    </label>
                    <div className="flex items-center gap-3">
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
                      <span className="text-sm text-gray-600">
                        {watch("isPublished") ? "منتشر شده" : "پیش‌نویس"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* خلاصه */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    خلاصه مقاله *
                  </label>
                  <Textarea
                    {...register("excerpt")}
                    placeholder="خلاصه‌ای از محتوای مقاله..."
                    rows={3}
                    className={errors.excerpt ? "border-red-500" : ""}
                  />
                  {errors.excerpt && (
                    <p className="text-sm text-red-500">{errors.excerpt.message}</p>
                  )}
                </div>

                {/* تگ‌ها */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    تگ‌ها
                  </label>
                  <div className="flex gap-2 mb-3">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="تگ جدید..."
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    />
                    <Button type="button" onClick={addTag} variant="outline">
                      افزودن
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(watch("tags") || []).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 hover:text-red-500"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* محتوا */}
          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  محتوای مقاله
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    محتوای کامل *
                  </label>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <RichTextEditor
                        content={field.value}
                        onChange={field.onChange}
                        placeholder="محتوای کامل مقاله را اینجا بنویسید..."
                      />
                    )}
                  />
                  {errors.description && (
                    <p className="text-sm text-red-500">{errors.description.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* رسانه */}
          <TabsContent value="media">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5" />
                  تصویر شاخص
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* تصویر انتخاب شده */}
                {selectedImage && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">تصویر انتخاب شده</h3>
                    <div className="relative w-full max-w-md">
                      <div className="aspect-video rounded-lg overflow-hidden border border-gray-200">
                        <Image
                          src={selectedImage}
                          alt="Selected image"
                          width={400}
                          height={200}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full"
                        onClick={handleRemoveImage}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* انتخاب تصویر جدید */}
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    {selectedImage ? "تغییر تصویر" : "انتخاب تصویر"}
                  </h3>
                  <ImagesList onImageSelect={handleImageSelect} maxSelection={1} />
                </div>

                {errors.image && (
                  <p className="text-sm text-red-500">{errors.image.message}</p>
                )}
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
                    placeholder="کلمه کلیدی اصلی مقاله"
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
              <Plus className="w-4 h-4" />
            )}
            ایجاد مقاله
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
