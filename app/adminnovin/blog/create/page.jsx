"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Send } from "lucide-react";
import RichTextEditor from "@/components/editor/RichTextEditor";
import axios from "axios";

const CATEGORIES = [
  'دکوراسیون', 'کاغذ دیواری', 'موکت', 'کفپوش', 
  'راهنمای خرید', 'ترندها', 'آموزشی'
];

export default function CreateBlog() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [keywordInput, setKeywordInput] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    excerpt: "",
    category: "",
    tags: [],
    featuredImage: "",
    status: "draft",
    // SEO fields
    seo: {
      metaTitle: "",
      metaDescription: "",
      keywords: []
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('seo.')) {
      const seoField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        seo: {
          ...prev.seo,
          [seoField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleDescriptionChange = (content) => {
    setFormData(prev => ({
      ...prev,
      description: content
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
      slug: generateSlug(title),
      seo: {
        ...prev.seo,
        metaTitle: title.length > 60 ? title.substring(0, 60) : title
      }
    }));
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addKeyword = () => {
    if (keywordInput.trim() && !formData.seo.keywords.includes(keywordInput.trim())) {
      setFormData(prev => ({
        ...prev,
        seo: {
          ...prev.seo,
          keywords: [...prev.seo.keywords, keywordInput.trim()]
        }
      }));
      setKeywordInput("");
    }
  };

  const removeKeyword = (keywordToRemove) => {
    setFormData(prev => ({
      ...prev,
      seo: {
        ...prev.seo,
        keywords: prev.seo.keywords.filter(keyword => keyword !== keywordToRemove)
      }
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
      <Card className="max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">ایجاد مقاله جدید</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold border-b pb-2">اطلاعات پایه</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">عنوان مقاله *</label>
                  <Input
                    name="title"
                    value={formData.title}
                    onChange={handleTitleChange}
                    placeholder="عنوان مقاله را وارد کنید"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">نامک (Slug) *</label>
                  <Input
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    placeholder="blog-slug"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">دسته‌بندی *</label>
                  <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({...prev, category: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب دسته‌بندی" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">وضعیت</label>
                  <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({...prev, status: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب وضعیت" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">پیش‌نویس</SelectItem>
                      <SelectItem value="published">منتشر شده</SelectItem>
                      <SelectItem value="archived">آرشیو شده</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">خلاصه مقاله *</label>
                <Textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  placeholder="خلاصه‌ای جذاب از محتوای مقاله (حداکثر 300 کاراکتر)"
                  rows={3}
                  maxLength={300}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">{formData.excerpt.length}/300 کاراکتر</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">تصویر شاخص *</label>
                <Input
                  name="featuredImage"
                  value={formData.featuredImage}
                  onChange={handleInputChange}
                  placeholder="لینک تصویر شاخص"
                  type="url"
                  required
                />
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold border-b pb-2">محتوا</h3>
              
              <div>
                <label className="block text-sm font-medium mb-2">محتوای مقاله *</label>
                <RichTextEditor
                  value={formData.description}
                  onChange={handleDescriptionChange}
                  placeholder="محتوای کامل مقاله را اینجا بنویسید..."
                  height="400px"
                />
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold border-b pb-2">برچسب‌ها</h3>
              
              <div>
                <label className="block text-sm font-medium mb-2">افزودن برچسب</label>
                <div className="flex gap-2">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="برچسب جدید"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag} size="sm">
                    افزودن
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <X size={14} className="cursor-pointer" onClick={() => removeTag(tag)} />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* SEO Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold border-b pb-2">تنظیمات SEO</h3>
              
              <div>
                <label className="block text-sm font-medium mb-2">عنوان SEO (Meta Title)</label>
                <Input
                  name="seo.metaTitle"
                  value={formData.seo.metaTitle}
                  onChange={handleInputChange}
                  placeholder="عنوان برای موتورهای جستجو (حداکثر 60 کاراکتر)"
                  maxLength={60}
                />
                <p className="text-xs text-gray-500 mt-1">{formData.seo.metaTitle.length}/60 کاراکتر</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">توضیحات SEO (Meta Description)</label>
                <Textarea
                  name="seo.metaDescription"
                  value={formData.seo.metaDescription}
                  onChange={handleInputChange}
                  placeholder="توضیحی کوتاه برای موتورهای جستجو (حداکثر 160 کاراکتر)"
                  rows={3}
                  maxLength={160}
                />
                <p className="text-xs text-gray-500 mt-1">{formData.seo.metaDescription.length}/160 کاراکتر</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">کلمات کلیدی</label>
                <div className="flex gap-2">
                  <Input
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    placeholder="کلمه کلیدی جدید"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                  />
                  <Button type="button" onClick={addKeyword} size="sm">
                    افزودن
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.seo.keywords.map((keyword, index) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-1">
                      {keyword}
                      <X size={14} className="cursor-pointer" onClick={() => removeKeyword(keyword)} />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 space-x-reverse pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isLoading}
              >
                لغو
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                {isLoading ? "در حال ذخیره..." : formData.status === 'published' ? 'انتشار مقاله' : 'ذخیره پیش‌نویس'}
                <Send size={16} />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default BlogCreatePage;
