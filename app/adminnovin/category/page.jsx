"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { 
  Edit, 
  Trash2, 
  Plus, 
  Save,
  X,
  Folder,
  FolderOpen,
  Loader2
} from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ title: "", slug: "", icon: "", parent: "", type: "product" });
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/api/categories");
      setCategories(res.data.categories || []);
    } catch (error) {
      toast.error("خطا در دریافت دسته‌بندی‌ها");
      console.error(error);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!form.title.trim()) errors.title = "عنوان الزامی است";
    if (!form.slug.trim()) errors.slug = "اسلاگ الزامی است";
    if (form.slug && !/^[a-z0-9-]+$/.test(form.slug)) {
      errors.slug = "اسلاگ فقط می‌تواند شامل حروف انگلیسی، عدد و خط تیره باشد";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setLoading(true);
    setFormErrors({});

    try {
      const categoryData = {
        name: form.title, // تبدیل title به name
        slug: form.slug,
        type: form.type,
        image: form.icon, // تبدیل icon به image
        parent: form.parent || null
      };

      if (editingId) {
        await axios.patch("/api/categories", { id: editingId, ...categoryData });
        toast.success("دسته‌بندی با موفقیت ویرایش شد");
      } else {
        await axios.post("/api/categories", categoryData);
        toast.success("دسته‌بندی با موفقیت اضافه شد");
      }
      setForm({ title: "", slug: "", icon: "", parent: "", type: "product" });
      setEditingId(null);
      fetchCategories();
    } catch (error) {
      toast.error("خطا در ذخیره دسته‌بندی");
      console.error(error);
    }
    setLoading(false);
  };

  const handleEdit = (category) => {
    setForm({
      title: category.title,
      slug: category.slug,
      icon: category.icon || "",
      parent: category.parent?._id || "",
    });
    setEditingId(category._id);
    setFormErrors({});
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete("/api/categories", { data: { id } });
      toast.success("دسته‌بندی حذف شد");
      fetchCategories();
    } catch (error) {
      toast.error("خطا در حذف دسته‌بندی");
      console.error(error);
    }
  };

  const handleCancel = () => {
    setForm({ title: "", slug: "", icon: "", parent: "" });
    setEditingId(null);
    setFormErrors({});
  };

  const generateSlug = (title) => {
    try {
      if (!title || typeof title !== 'string') return '';
      
      return title
        .toLowerCase()
        .replace(/[\u0600-\u06FF\s]/g, '') // حذف حروف فارسی و فاصله
        .replace(/[^a-z0-9]/g, '-') // جایگزینی کاراکترهای غیرمجاز با خط تیره
        .replace(/-+/g, '-') // حذف خط تیره‌های متوالی
        .replace(/^-|-$/g, ''); // حذف خط تیره از ابتدا و انتها
    } catch (error) {
      console.error('Error generating slug:', error);
      return '';
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">مدیریت دسته‌بندی‌ها</h1>
          <p className="text-gray-600 mt-1">ایجاد و مدیریت دسته‌بندی‌های محصولات</p>
        </div>
      </div>

      {/* فرم افزودن / ویرایش */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            {editingId ? "ویرایش دسته‌بندی" : "افزودن دسته‌بندی جدید"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  عنوان دسته‌بندی *
                </label>
                <Input
                  type="text"
                  value={form.title}
                  onChange={(e) => {
                    setForm({ ...form, title: e.target.value });
                    if (!editingId && !form.slug) {
                      setForm(prev => ({ ...prev, slug: generateSlug(e.target.value) }));
                    }
                  }}
                  className={formErrors.title ? "border-red-500" : ""}
                  placeholder="نام دسته‌بندی را وارد کنید"
                />
                {formErrors.title && (
                  <p className="text-sm text-red-500">{formErrors.title}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  اسلاگ (برای URL) *
                </label>
                <Input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className={formErrors.slug ? "border-red-500" : ""}
                  placeholder="category-slug"
                />
                {formErrors.slug && (
                  <p className="text-sm text-red-500">{formErrors.slug}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  آیکون (URL تصویر)
                </label>
                <Input
                  type="text"
                  value={form.icon}
                  onChange={(e) => setForm({ ...form, icon: e.target.value })}
                  placeholder="https://example.com/icon.png"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  نوع دسته‌بندی
                </label>
                <Select 
                  value={form.type} 
                  onValueChange={(value) => setForm({ ...form, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="انتخاب نوع دسته‌بندی" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="product">محصول</SelectItem>
                    <SelectItem value="service">خدمات</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  دسته مادر
                </label>
                <Select 
                  value={form.parent || "none"} 
                  onValueChange={(value) => setForm({ ...form, parent: value === "none" ? "" : value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="انتخاب دسته مادر (اختیاری)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">بدون والد (دسته اصلی)</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat._id} value={cat._id}>
                        {cat.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    در حال ذخیره...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {editingId ? "ویرایش دسته" : "افزودن دسته"}
                  </>
                )}
              </Button>
              
              {editingId && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                >
                  <X className="w-4 h-4 mr-2" />
                  انصراف
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* لیست دسته‌بندی‌ها */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Folder className="w-5 h-5" />
            دسته‌بندی‌های موجود ({categories.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {categories.length === 0 ? (
            <div className="text-center py-8">
              <FolderOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">هنوز هیچ دسته‌بندی اضافه نشده است</p>
            </div>
          ) : (
            <div className="space-y-4">
              {categories.map((cat) => (
                <div key={cat._id} className="border rounded-lg p-4 bg-white">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      {cat.icon && (
                        <Image 
                          src={cat.icon} 
                          alt="icon" 
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded" 
                        />
                      )}
                      <div>
                        <h3 className="font-semibold text-gray-900">{cat.title}</h3>
                        <p className="text-sm text-gray-500">/{cat.slug}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(cat)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>حذف دسته‌بندی</AlertDialogTitle>
                            <AlertDialogDescription>
                              آیا مطمئن هستید که می‌خواهید دسته‌بندی &ldquo;{cat.title}&rdquo; را حذف کنید؟
                              این عملیات قابل بازگشت نیست.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>انصراف</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDelete(cat._id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              حذف
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>

                  {/* زیر دسته‌ها */}
                  {cat.children && cat.children.length > 0 && (
                    <div className="mt-4 ml-6 space-y-2">
                      <h4 className="font-medium text-sm text-gray-600">زیر دسته‌ها:</h4>
                      {cat.children.map((child) => (
                        <div key={child._id} className="flex justify-between items-center p-3 bg-gray-50 rounded border-l-4 border-blue-400">
                          <div className="flex items-center gap-2">
                            {child.icon && (
                              <Image 
                                src={child.icon} 
                                alt="icon" 
                                width={24}
                                height={24}
                                className="w-6 h-6 rounded" 
                              />
                            )}
                            <div>
                              <span className="text-sm font-medium">{child.title}</span>
                              <p className="text-xs text-gray-500">/{child.slug}</p>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(child)}
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                            
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button size="sm" variant="destructive">
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>حذف زیر دسته</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    آیا مطمئن هستید که می‌خواهید زیر دسته &ldquo;{child.title}&rdquo; را حذف کنید؟
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>انصراف</AlertDialogCancel>
                                  <AlertDialogAction 
                                    onClick={() => handleDelete(child._id)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    حذف
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
