"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { toast } from "sonner";
import axios from "axios";
import { ImagePlus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { useSession } from "next-auth/react";
import ReactQuill from "react-quill";

const Editor = dynamic(() => import("@/components/ui/Editor"), { ssr: false });

const CreateBlog = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { control, register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      title: "",
      description: "",
      excerpt: "",
      quote: "",
      category: "مقاله",
      images: "",
    }
  });
  
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [imagePath, setImagePath] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    category: "عمومی",
    slug: "",
    quote: "",
    description: "",
  });

  const categories = [
    "عمومی",
    "آموزشی",
    "محصولات",
    "دکوراسیون",
    "طراحی داخلی",
    "اخبار",
  ];

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 4) {
      toast.error("حداکثر 4 تصویر می‌توانید آپلود کنید");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImages(response.data.urls);
      toast.success("تصاویر با موفقیت آپلود شدند");
    } catch (error) {
      toast.error("خطا در آپلود تصاویر");
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !content || !images.length) {
      toast.error("لطفا تمام فیلدهای ضروری را پر کنید");
      return;
    }

    setLoading(true);
    try {
      await axios.post("/api/blog", {
        ...formData,
        content,
        images,
      });
      toast.success("مقاله با موفقیت ایجاد شد");
      router.push("/adminnikoo/blog");
      router.refresh();
    } catch (error) {
      toast.error("خطا در ایجاد مقاله");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">ایجاد مقاله جدید</h1>
        <Button
          onClick={() => router.back()}
          variant="outline"
          className="gap-2"
        >
          بازگشت
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">عنوان مقاله</label>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="عنوان مقاله را وارد کنید"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">نامک</label>
              <Input
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                placeholder="نامک مقاله را وارد کنید"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">دسته‌بندی</label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger>
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
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">خلاصه مقاله</label>
              <Textarea
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData({ ...formData, excerpt: e.target.value })
                }
                placeholder="خلاصه مقاله را وارد کنید"
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">نقل قول</label>
              <Textarea
                value={formData.quote}
                onChange={(e) =>
                  setFormData({ ...formData, quote: e.target.value })
                }
                placeholder="نقل قول مقاله را وارد کنید"
                rows={2}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">توضیحات سئو</label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="توضیحات سئو را وارد کنید"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">تصاویر مقاله</label>
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="gap-2"
                  onClick={() => document.getElementById("images").click()}
                >
                  <ImagePlus className="w-4 h-4" />
                  انتخاب تصاویر
                </Button>
                <input
                  type="file"
                  id="images"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <span className="text-sm text-gray-500">
                  {images.length
                    ? `${images.length} تصویر انتخاب شده`
                    : "حداکثر 4 تصویر"}
                </span>
              </div>
              {images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                  {images.map((url, index) => (
                    <div
                      key={index}
                      className="relative aspect-video rounded-lg overflow-hidden"
                    >
                      <img
                        src={url}
                        alt={`تصویر ${index + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium mb-2">محتوای مقاله</label>
            <Editor
              value={content}
              onChange={setContent}
              placeholder="محتوای مقاله را وارد کنید..."
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="submit"
            className="gap-2"
            disabled={loading}
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            ایجاد مقاله
          </Button>
        </div>
      </form>
    </div>
  );
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p>Access denied</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !content || !images.length) {
      toast.error("لطفا تمام فیلدهای ضروری را پر کنید");
      return;
    }

    setLoading(true);
    try {
      const newBlog = {
        ...formData,
        content,
        images,
        authorId: session?.user?._id,
      };

      await axios.post("/api/blog", newBlog);
      toast.success("مقاله با موفقیت ایجاد شد");
      router.push("/adminnikoo/blog");
      router.refresh();
    } catch (error) {
      toast.error("خطا در ایجاد مقاله");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">ایجاد مقاله جدید</h1>
        <Button
          onClick={() => router.back()}
          variant="outline"
          className="gap-2"
        >
          بازگشت
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">عنوان مقاله</label>
              <Input
                {...register("title", { required: "عنوان الزامی است" })}
                placeholder="عنوان مقاله را وارد کنید"
                className="w-full"
              />
              {errors.title && <p className="text-red-500">{errors.title.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">نامک</label>
              <Input
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                placeholder="نامک مقاله را وارد کنید"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">دسته‌بندی</label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger>
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
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">خلاصه مقاله</label>
              <Textarea
                {...register("excerpt", { required: "چکیده الزامی است" })}
                placeholder="خلاصه مقاله را وارد کنید"
                rows={4}
                className="w-full"
              />
              {errors.excerpt && <p className="text-red-500">{errors.excerpt.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">نقل قول</label>
              <Textarea
                {...register("quote", { required: "نقل‌قول الزامی است" })}
                placeholder="نقل قول مقاله را وارد کنید"
                rows={2}
                className="w-full"
              />
              {errors.quote && <p className="text-red-500">{errors.quote.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">تصاویر مقاله</label>
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="gap-2"
                  onClick={() => document.getElementById("images").click()}
                >
                  <ImagePlus className="w-4 h-4" />
                  انتخاب تصاویر
                </Button>
                <input
                  type="file"
                  id="images"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <span className="text-sm text-gray-500">
                  {images.length
                    ? `${images.length} تصویر انتخاب شده`
                    : "حداکثر 4 تصویر"}
                </span>
              </div>
              {images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                  {images.map((url, index) => (
                    <div
                      key={index}
                      className="relative aspect-video rounded-lg overflow-hidden"
                    >
                      <img
                        src={url}
                        alt={`تصویر ${index + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium mb-2">محتوای مقاله</label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <ReactQuill
                  value={field.value}
                  onChange={(value) => {
                    field.onChange(value);
                    setValue("description", value);
                    setContent(value);
                  }}
                  modules={{
                    toolbar: [
                      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                      ['bold', 'italic', 'underline'],
                      ['link', 'image'],
                      [{ 'align': [] }],
                      ['clean'],
                    ],
                  }}
                  className="h-[300px]"
                />
              )}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="submit"
            className="gap-2"
            disabled={loading}
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            ایجاد مقاله
          </Button>
        </div>
      </form>
    </div>
  );

export default CreateBlog;
