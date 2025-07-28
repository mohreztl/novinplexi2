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

const Editor = dynamic(() => import("@/components/ui/Editor"), { ssr: false });

const CreateBlog = () => {
  const router = useRouter();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
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
};

export default CreateBlog;
  photo: [],
};

const CreateBlog = () => {
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
  
  const [state, setState] = useState(initialState);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [editorHtml, setEditorHtml] = useState('');
  const [imagePath, setImagePath] = useState([]);

  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p>Access denied</p>;
  }

  const handleChange = (event) => {
    setError("");
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmitForm = async (data) => {
    const { title, excerpt, quote, category,description,images } = data;
  
    if (!title || !description || !category || !excerpt || !quote) {
  
      setError("Please fill out all required fields.");
      return;
    }
  
    try {
      setIsLoading(true);
      setError("");
      setSuccess("");
  
      // ارسال فرم
      const newBlog = {
        ...data,
        images,
        authorId: session?.user?._id,
      };
  
      const response = await axios.post("/api/blog", newBlog);
      if (response.status === 200 || response.status === 201) {
        router.push("/");
      }
  
 else {
   
        setError("Error occurred while creating blog.");
      }
    } catch (error) {


      setError("Error occurred while creating blog.");
    }
  
    setIsLoading(false);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white py-0 w-full">
      <div className="max-w-full w-full mx-auto bg-white rounded-none shadow-2xl overflow-hidden">
        <div className="bg-blues py-6">
          <h1 className="text-center text-white text-3xl font-extrabold">ساخت مقاله جدید</h1>
        </div>

        <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-5 px-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">عنوان مقاله</label>
            <Input
  {...register("title", { required: "عنوان الزامی است" })}
  type="text"
  placeholder="عنوان را اینجا وارد کنید..."
  className="w-full"
/>
{errors.title && <p className="text-red-500">{errors.title.message}</p>}
          </div>

          <div className="pb-8">
            <h2>ویرایش وبلاگ</h2>
            <Controller
  name="description"
  control={control}
  render={({ field }) => (
    <ReactQuill
      value={field.value}
      onChange={(value) => {
        field.onChange(value);
        setValue("description", value);
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

          <Textarea
  {...register("excerpt", { required: "چکیده الزامی است" })}
  rows="2"
  placeholder="چکیده را اینجا وارد کنید..."
  className="w-full"
/>
{errors.excerpt && <p className="text-red-500">{errors.excerpt.message}</p>}

<Textarea
  {...register("quote", { required: "نقل‌قول الزامی است" })}
  rows="2"
  placeholder="نقل‌قول را اینجا وارد کنید..."
  className="w-full"
/>

          <div>
            <label className="block">Select a category</label>
            <select
              name="category"
              onChange={handleChange}
              value={state.category}
              className="block rounded-lg w-full p-3 bg-primaryColorLight"
            >
              <option value="مقاله">مقاله</option>
              <option value="آموزش">آموزش</option>
              <option value="اخبار">اخبار</option>
            </select>
          </div>

          <div className="w-full max-w-sm">
          <ImagesList
  onImageSelect={(path) => {
    setImagePath(path);
    setValue("images", path); // مقدار `photo` را در `useForm` تنظیم کنید
  }}
/>


          </div>

          {error && <div className="text-red-700">{error}</div>}
          {success && <div className="text-green-700">{success}</div>}

          <button type="submit" className="btn">
            {isLoading ? "Loading..." : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
