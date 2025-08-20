"use client";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import {
  Loader2,
  Edit2,
  Trash2,
  PlusCircle,
  Grid3X3,
  Package,
  Settings,
  Eye,
  EyeOff
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import ImagesList from "@/components/ImagesList";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CategoriesPage = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image: '',
    isActive: true,
    type: 'product', // product یا service
    order: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    products: 0,
    services: 0,
  });

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/categories?flat=true");
      
      let categoriesData = [];
      if (response.data?.categories && Array.isArray(response.data.categories)) {
        categoriesData = response.data.categories;
      } else if (Array.isArray(response.data)) {
        categoriesData = response.data;
      }

      // محاسبه آمار
      const newStats = {
        total: categoriesData.length,
        active: categoriesData.filter(cat => cat.isActive !== false).length,
        products: categoriesData.filter(cat => cat.type === 'product').length,
        services: categoriesData.filter(cat => cat.type === 'service').length,
      };
      setStats(newStats);

      // مرتب‌سازی بر اساس order
      categoriesData.sort((a, b) => (a.order || 0) - (b.order || 0));
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast({
        title: "خطا",
        description: "خطا در دریافت دسته‌بندی‌ها",
        variant: "destructive",
      });
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleDelete = async () => {
    if (!categoryToDelete || !categoryToDelete._id) {
      console.error("Category to delete is missing or invalid");
      setDeleteDialogOpen(false);
      setCategoryToDelete(null);
      return;
    }

    try {
      const identifier = categoryToDelete.slug || categoryToDelete._id;
      await axios.delete(`/api/categories/manage/${identifier}`);
      toast({
        title: "موفقیت",
        description: "دسته‌بندی با موفقیت حذف شد",
      });
      await fetchCategories();
    } catch (error) {
      console.error("Delete error:", error);
      toast({
        title: "خطا",
        description: "خطا در حذف دسته‌بندی",
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setCategoryToDelete(null);
    }
  };

  const handleToggleStatus = async (category) => {
    try {
      const identifier = category.slug || category._id;
      await axios.put(`/api/categories/manage/${identifier}`, {
        ...category,
        isActive: !category.isActive
      });
      
      toast({
        title: "موفقیت",
        description: `دسته‌بندی ${!category.isActive ? 'فعال' : 'غیرفعال'} شد`,
      });
      
      await fetchCategories();
    } catch (error) {
      console.error("Error toggling status:", error);
      toast({
        title: "خطا",
        description: "خطا در تغییر وضعیت",
        variant: "destructive",
      });
    }
  };

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-zA-Z0-9آ-ی\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .trim();
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.description) {
      toast({
        title: "خطا",
        description: "لطفاً نام و توضیحات را وارد کنید",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      const submitData = {
        ...formData,
        slug: formData.slug || generateSlug(formData.name),
      };

      if (editingCategory) {
        const identifier = editingCategory.slug || editingCategory._id;
        await axios.put(`/api/categories/manage/${identifier}`, submitData);
        toast({
          title: "موفقیت",
          description: "دسته‌بندی با موفقیت بروزرسانی شد",
        });
      } else {
        await axios.post(`/api/categories`, submitData);
        toast({
          title: "موفقیت",
          description: "دسته‌بندی با موفقیت ایجاد شد",
        });
      }

      await fetchCategories();
      setEditDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error("Submit error:", error);
      toast({
        title: "خطا",
        description: error.response?.data?.error || "خطا در ذخیره دسته‌بندی",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      description: '',
      image: '',
      isActive: true,
      type: 'product',
      order: 0,
    });
    setEditingCategory(null);
  };

  const openEditDialog = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name || '',
        slug: category.slug || '',
        description: category.description || '',
        image: category.image || '',
        isActive: category.isActive !== false,
        type: category.type || 'product',
        order: category.order || 0,
      });
    } else {
      resetForm();
    }
    setEditDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>در حال بارگیری دسته‌بندی‌ها...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-2 md:px-4 py-2">
      {/* هدر صفحه */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-center sm:text-right">مدیریت دسته‌بندی‌ها</h1>
          <Button
            onClick={() => openEditDialog()}
            className="flex items-center gap-2 px-4 py-2 w-full sm:w-auto"
            size="default"
          >
            <PlusCircle className="w-5 h-5" />
            <span className="text-sm sm:text-base">
              افزودن دسته‌بندی جدید
            </span>
          </Button>
        </div>

        {/* کارت‌های آماری */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-6">
          <Card className="p-2 md:p-4">
            <CardHeader className="flex flex-row items-center justify-between pb-1 md:pb-2 px-0">
              <CardTitle className="text-xs md:text-sm font-medium text-gray-500">
                کل دسته‌بندی‌ها
              </CardTitle>
              <Grid3X3 className="w-3 h-3 md:w-4 md:h-4 text-gray-500" />
            </CardHeader>
            <CardContent className="px-0">
              <div className="text-lg md:text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          
          <Card className="p-2 md:p-4">
            <CardHeader className="flex flex-row items-center justify-between pb-1 md:pb-2 px-0">
              <CardTitle className="text-xs md:text-sm font-medium text-green-500">
                فعال
              </CardTitle>
              <Eye className="w-3 h-3 md:w-4 md:h-4 text-green-500" />
            </CardHeader>
            <CardContent className="px-0">
              <div className="text-lg md:text-2xl font-bold">{stats.active}</div>
            </CardContent>
          </Card>
          
          <Card className="p-2 md:p-4">
            <CardHeader className="flex flex-row items-center justify-between pb-1 md:pb-2 px-0">
              <CardTitle className="text-xs md:text-sm font-medium text-blue-500">
                محصولات
              </CardTitle>
              <Package className="w-3 h-3 md:w-4 md:h-4 text-blue-500" />
            </CardHeader>
            <CardContent className="px-0">
              <div className="text-lg md:text-2xl font-bold">{stats.products}</div>
            </CardContent>
          </Card>
          
          <Card className="p-2 md:p-4">
            <CardHeader className="flex flex-row items-center justify-between pb-1 md:pb-2 px-0">
              <CardTitle className="text-xs md:text-sm font-medium text-purple-500">
                خدمات
              </CardTitle>
              <Settings className="w-3 h-3 md:w-4 md:h-4 text-purple-500" />
            </CardHeader>
            <CardContent className="px-0">
              <div className="text-lg md:text-2xl font-bold">{stats.services}</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* جدول دسته‌بندی‌ها */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">تصویر</TableHead>
                <TableHead className="whitespace-nowrap">نام</TableHead>
                <TableHead className="whitespace-nowrap">نوع</TableHead>
                <TableHead className="whitespace-nowrap">توضیحات</TableHead>
                <TableHead className="whitespace-nowrap">ترتیب</TableHead>
                <TableHead className="whitespace-nowrap">وضعیت</TableHead>
                <TableHead className="text-left whitespace-nowrap">عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories && categories.length > 0 ? (
                categories.map((category) => {
                  if (!category || !category._id) {
                    return null;
                  }
                  
                  try {
                    return (
                      <TableRow key={category._id}>
                        <TableCell>
                          <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-lg overflow-hidden bg-gray-100">
                            {category.image ? (
                              <Image
                                src={category.image}
                                alt={category.name || 'دسته‌بندی'}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Grid3X3 className="w-6 h-6 text-gray-400" />
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium min-w-[120px]">
                          <div className="truncate max-w-[150px] md:max-w-none">
                            {category.name || 'بدون نام'}
                          </div>
                          {category.slug && (
                            <div className="text-xs text-gray-500 truncate">
                              /{category.slug}
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="min-w-[100px]">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            category.type === 'service' 
                              ? 'bg-purple-100 text-purple-700' 
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {category.type === 'service' ? 'خدمات' : 'محصولات'}
                          </span>
                        </TableCell>
                        <TableCell className="min-w-[200px] max-w-[300px]">
                          <div className="text-sm text-gray-600 line-clamp-2">
                            {category.description || 'بدون توضیحات'}
                          </div>
                        </TableCell>
                        <TableCell className="min-w-[80px] text-center">
                          <span className="text-sm font-mono">
                            {category.order || 0}
                          </span>
                        </TableCell>
                        <TableCell className="min-w-[100px]">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                                category.isActive !== false
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {category.isActive !== false ? "فعال" : "غیرفعال"}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleToggleStatus(category)}
                              className={`p-1 h-6 w-6 ${
                                category.isActive !== false
                                  ? 'text-red-500 hover:text-red-700' 
                                  : 'text-green-500 hover:text-green-700'
                              }`}
                              title={category.isActive !== false ? 'غیرفعال کردن' : 'فعال کردن'}
                            >
                              {category.isActive !== false ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="min-w-[100px]">
                          <div className="flex items-center gap-1 md:gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openEditDialog(category)}
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => {
                                setCategoryToDelete(category);
                                setDeleteDialogOpen(true);
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  } catch (renderError) {
                    console.error('Error rendering category row:', renderError, category);
                    return null;
                  }
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    هیچ دسته‌بندی یافت نشد
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* دیالوگ ویرایش/ایجاد */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? 'ویرایش دسته‌بندی' : 'افزودن دسته‌بندی جدید'}
            </DialogTitle>
            <DialogDescription>
              اطلاعات دسته‌بندی را وارد کنید. تصویر و توضیحات در صفحه محصولات/خدمات نمایش داده خواهد شد.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                نام
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => {
                  const name = e.target.value;
                  setFormData(prev => ({
                    ...prev,
                    name,
                    slug: prev.slug || generateSlug(name)
                  }));
                }}
                className="col-span-3"
                placeholder="نام دسته‌بندی"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="slug" className="text-right">
                برچسب URL
              </Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                className="col-span-3"
                placeholder="url-slug"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                نوع
              </Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="انتخاب نوع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="product">محصولات</SelectItem>
                  <SelectItem value="service">خدمات</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="order" className="text-right">
                ترتیب نمایش
              </Label>
              <Input
                id="order"
                type="number"
                value={formData.order}
                onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                className="col-span-3"
                placeholder="0"
              />
            </div>

            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right">
                توضیحات
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="col-span-3"
                placeholder="توضیحات دسته‌بندی که در صفحه محصولات/خدمات نمایش داده می‌شود"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right">
                تصویر
              </Label>
              <div className="col-span-3">
                <ImagesList
                  images={formData.image ? [formData.image] : []}
                  onImagesChange={(images) => setFormData(prev => ({ 
                    ...prev, 
                    image: images[0] || '' 
                  }))}
                  maxImages={1}
                  inline={true}
                />
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="isActive" className="text-right">
                وضعیت
              </Label>
              <div className="col-span-3 flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                />
                <Label htmlFor="isActive" className="text-sm">
                  {formData.isActive ? 'فعال' : 'غیرفعال'}
                </Label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setEditDialogOpen(false)}
            >
              انصراف
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : null}
              {editingCategory ? 'بروزرسانی' : 'ایجاد'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* دیالوگ حذف */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>آیا از حذف این دسته‌بندی مطمئن هستید؟</AlertDialogTitle>
            <AlertDialogDescription>
              این عمل غیرقابل بازگشت است و دسته‌بندی به طور کامل حذف خواهد شد.
              محصولات موجود در این دسته‌بندی نیز تحت تأثیر قرار می‌گیرند.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>انصراف</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600"
              onClick={handleDelete}
            >
              حذف دسته‌بندی
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* دکمه شناور برای موبایل */}
      <div className="fixed bottom-20 left-4 md:hidden z-50">
        <Button
          onClick={() => openEditDialog()}
          className="w-14 h-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700"
          size="icon"
        >
          <PlusCircle className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};

export default CategoriesPage;
