"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { toast } from "sonner";
import axios from "axios";
import { ImagePlus, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// داینامیک ایمپورت برای کاهش سایز باندل اولیه
const Editor = dynamic(() => import("@/components/ui/Editor"), { 
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100 rounded-lg animate-pulse" />
});

// اسکیمای اعتبارسنجی فرم
const formSchema = z.object({
  title: z.string().min(5, "عنوان باید حداقل ۵ کاراکتر باشد"),
  slug: z.string().min(3, "نامک باید حداقل ۳ کاراکتر باشد"),
  category: z.string(),
  excerpt: z.string().min(20, "خلاصه باید حداقل ۲۰ کاراکتر باشد"),
  quote: z.string().optional(),
  description: z.string().min(30, "توضیحات سئو باید حداقل ۳۰ کاراکتر باشد"),
  content: z.string().min(100, "محتوای مقاله باید حداقل ۱۰۰ کاراکتر باشد"),
  images: z.array(z.string()).min(1, "حداقل یک تصویر الزامی است")
});

const CreateBlog = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  
  const { 
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors } 
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      category: "عمومی",
      excerpt: "",
      quote: "",
      description: "",
      content: "",
      images: [],
    }
  });

  const categories = [
    "عمومی",
    "آموزشی",
    "محصولات",
    "دکوراسیون",
    "طراحی داخلی",
    "اخبار",
  ];

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    
    const files = Array.from(e.target.files);
    const currentImages = watch("images") || [];
    
    if (files.length + currentImages.length > 4) {
      toast.error("حداکثر ۴ تصویر قابل آپلود است");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      setLoading(true);
      const response = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      const newImages = [...currentImages, ...response.data.urls];
      setValue("images", newImages);
      toast.success("تصاویر با موفقیت آپلود شدند");
    } catch (error) {
      toast.error("خطا در آپلود تصاویر");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (index: number) => {
    const currentImages = watch("images");
    const newImages = currentImages.filter((_, i) => i !== index);
    setValue("images", newImages);
  };

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      await axios.post("/api/blog", data);
      toast.success("مقاله با موفقیت ایجاد شد");
      router.push("/adminnovin/blog");
      router.refresh();
    } catch (error) {
      toast.error("خطا در ایجاد مقاله");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 bg-white rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800">ایجاد مقاله جدید</h1>
        <Button
          onClick={() => router.back()}
          variant="outline"
          className="gap-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50"
        >
          <ArrowLeft className="w-4 h-4" />
          بازگشت
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* ستون سمت چپ */}
          <div className="space-y-6">
            {/* عنوان مقاله */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                عنوان مقاله *
              </label>
              <Input
                {...register("title")}
                placeholder="عنوان مقاله را وارد کنید"
                className={`${errors.title ? "border-red-500" : ""}`}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            {/* نامک */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                نامک *
              </label>
              <Input
                {...register("slug")}
                placeholder="نامک مقاله را وارد کنید"
                className={`${errors.slug ? "border-red-500" : ""}`}
              />
              {errors.slug && (
                <p className="mt-1 text-sm text-red-500">{errors.slug.message}</p>
              )}
            </div>

            {/* دسته‌بندی */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                دسته‌بندی *
              </label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="انتخاب دسته‌بندی" />
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
            </div>

            {/* خلاصه مقاله */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                خلاصه مقاله *
              </label>
              <Textarea
                {...register("excerpt")}
                placeholder="خلاصه مقاله را وارد کنید"
                rows={4}
                className={`${errors.excerpt ? "border-red-500" : ""}`}
              />
              {errors.excerpt && (
                <p className="mt-1 text-sm text-red-500">{errors.excerpt.message}</p>
              )}
            </div>

            {/* نقل قول */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                نقل قول (اختیاری)
              </label>
              <Textarea
                {...register("quote")}
                placeholder="نقل قول مقاله را وارد کنید"
                rows={2}
              />
            </div>

            {/* توضیحات سئو */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                توضیحات سئو *
              </label>
              <Textarea
                {...register("description")}
                placeholder="توضیحات سئو را وارد کنید"
                rows={3}
                className={`${errors.description ? "border-red-500" : ""}`}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>
          </div>

          {/* ستون سمت راست */}
          <div className="space-y-6">
            {/* تصاویر مقاله */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                تصاویر مقاله *
                <span className="text-xs text-gray-500 mr-2"> (حداکثر ۴ تصویر)</span>
              </label>
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="gap-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                  disabled={loading}
                  onClick={() => document.getElementById("images")?.click()}
                >
                  <ImagePlus className="w-4 h-4" />
                  {loading ? "در حال آپلود..." : "انتخاب تصاویر"}
                </Button>
                <input
                  type="file"
                  id="images"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={loading}
                />
              </div>
              
              {errors.images && (
                <p className="mt-2 text-sm text-red-500">{errors.images.message}</p>
              )}
              
              {/* پیش نمایش تصاویر */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                {watch("images")?.map((url, index) => (
                  <div
                    key={index}
                    className="relative aspect-video rounded-lg overflow-hidden border border-gray-200"
                  >
                    <img
                      src={url}
                      alt={`تصویر ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 left-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* محتوای مقاله */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                محتوای مقاله *
              </label>
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <Editor
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="محتوای مقاله را وارد کنید..."
                  />
                )}
              />
              {errors.content && (
                <p className="mt-2 text-sm text-red-500">{errors.content.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* دکمه‌های اقدام */}
        <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
          <Button
            type="button"
            variant="outline"
            className="border-gray-300 text-gray-600 hover:bg-gray-50"
            onClick={() => router.back()}
          >
            انصراف
          </Button>
          <Button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 gap-2"
            disabled={loading}
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            ایجاد مقاله
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateBlog;