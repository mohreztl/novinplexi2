"use client"
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import ImagesList from "@/components/ImagesList";
import 'react-quill/dist/quill.snow.css'; // Import the styles for Quill
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import { Button } from "@/components/ui/button";
import { useForm, Controller } from 'react-hook-form';
import axios from "axios";
const initialState = {
  title: "",
  description: "",
  excerpt: "",
  quote: "",
  category: "مقاله",
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
