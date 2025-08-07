"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";

export default function CreateBlog() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    category: "",
    tags: "",
    featuredImage: "",
    status: "draft"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\u0600-\u06FF\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session) {
      router.push("/login");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post("/api/blog", {
        ...formData,
        author: session.user._id
      });

      if (response.status === 200 || response.status === 201) {
        router.push("/adminnovin/blog");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading") {
    return <div className="flex justify-center items-center min-h-screen">در حال بارگیری...</div>;
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">ایجاد مقاله جدید</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">عنوان مقاله</label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleTitleChange}
                  placeholder="عنوان مقاله را وارد کنید"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">نامک (Slug)</label>
                <Input
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  placeholder="blog-slug"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">خلاصه مقاله</label>
              <Textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                placeholder="خلاصه‌ای از محتوای مقاله"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">محتوای مقاله</label>
              <Textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="محتوای کامل مقاله را اینجا بنویسید"
                rows={15}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">دسته‌بندی</label>
                <Input
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="دسته‌بندی مقاله"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">برچسب‌ها</label>
                <Input
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="برچسب‌ها را با کاما جدا کنید"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">تصویر شاخص</label>
              <Input
                name="featuredImage"
                value={formData.featuredImage}
                onChange={handleInputChange}
                placeholder="لینک تصویر شاخص"
                type="url"
              />
            </div>

            <div className="flex justify-end space-x-4 space-x-reverse">
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
              >
                {isLoading ? "در حال ایجاد..." : "ایجاد مقاله"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
