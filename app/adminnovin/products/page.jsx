"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import {
  Loader2,
  ArrowUpDown,
  Edit2,
  Trash2,
  PlusCircle,
  Package,
  BadgeCheck,
  XCircle,
  DollarSign,
  PackageCheck,
  PackageX
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import Image from "next/image";

const Page = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    outOfStock: 0,
    totalValue: 0,
  });

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/products");
      
      console.log('API Response:', response.data); // اضافه کردن log
      
      // تصحیح دریافت data از response
      let filteredProducts = [];
      if (response.data?.products && Array.isArray(response.data.products)) {
        filteredProducts = response.data.products;
      } else if (Array.isArray(response.data)) {
        filteredProducts = response.data;
      }

      console.log('Filtered Products:', filteredProducts); // اضافه کردن log

      // فیلتر بر اساس دسته‌بندی با حفاظت از خطا
      if (categoryFilter && categoryFilter !== "all") {
        filteredProducts = filteredProducts.filter(
          (product) => {
            try {
              return product && product.category === categoryFilter;
            } catch (filterError) {
              console.error('Error filtering by category:', filterError, product);
              return false;
            }
          }
        );
      }

      // محاسبه آمار با حفاظت از خطا
      const newStats = {
        total: filteredProducts.length,
        active: filteredProducts.filter((product) => {
          try {
            return product && product.isPublished === true;
          } catch {
            return false;
          }
        }).length,
        outOfStock: filteredProducts.filter((product) => {
          try {
            // محصولاتی که variants ندارند و موجودی صفر است
            const hasVariants = product.variants && (
              product.variants.thicknesses?.length > 0 || 
              product.variants.sizes?.length > 0 || 
              product.variants.colors?.length > 0
            );
            return product && !hasVariants && (product.stock || 0) === 0;
          } catch {
            return false;
          }
        }).length,
        totalValue: filteredProducts.reduce(
          (sum, product) => {
            try {
              if (!product) return sum;
              const price = product.basePrice || product.price || 0;
              const stock = product.stock || 0;
              return sum + (price * stock);
            } catch (e) {
              console.error('Error calculating totalValue:', e, product);
              return sum;
            }
          },
          0
        ),
      };
      setStats(newStats);

      // مرتب‌سازی بسیار ساده و ایمن
      if (sortBy === "newest") {
        filteredProducts.reverse(); // فقط ترتیب را معکوس کن
      }
      // سایر sorting ها فعلاً غیرفعال

      setProducts(filteredProducts);
    } catch (error) {
      console.error('Error in fetchProducts:', error);
      toast({
        title: "خطا",
        description: "خطا در دریافت محصولات",
        variant: "destructive",
      });
      // در صورت خطا، products را به آرایه خالی تنظیم کن
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [sortBy, categoryFilter, toast]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = async () => {
    if (!productToDelete || !productToDelete._id) {
      console.error("Product to delete is missing or invalid");
      setDeleteDialogOpen(false);
      setProductToDelete(null);
      return;
    }

    try {
      // استفاده از slug یا _id برای DELETE
      const identifier = productToDelete.slug || productToDelete._id;
      await axios.delete(`/api/product/${identifier}`);
      toast({
        title: "موفقیت",
        description: "محصول با موفقیت حذف شد",
      });
      await fetchProducts(); // اضافه کردن await
    } catch (error) {
      console.error("Delete error:", error);
      toast({
        title: "خطا",
        description: "خطا در حذف محصول",
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  // تغییر وضعیت موجودی محصول
  const handleStockToggle = async (product) => {
    try {
      const identifier = product.slug || product._id;
      const newStock = product.stock === 0 ? 1 : 0;
      
      await axios.put(`/api/product/${identifier}`, {
        ...product,
        stock: newStock
      });
      
      toast({
        title: "موفقیت",
        description: `محصول ${newStock === 0 ? 'ناموجود' : 'موجود'} شد`,
      });
      
      await fetchProducts();
    } catch (error) {
      console.error("Error toggling stock:", error);
      toast({
        title: "خطا",
        description: "خطا در تغییر وضعیت موجودی",
        variant: "destructive",
      });
    }
  };

  // All dialog handling is done through onOpenChange

  return (
    <div className="px-2 md:px-4 py-2">
      {/* اطمینان از اینکه در حالت loading هیچ عملیات خطرناکی انجام نمی‌شود */}
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
            <p>در حال بارگیری محصولات...</p>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
              <h1 className="text-xl md:text-2xl font-bold text-center sm:text-right">مدیریت محصولات</h1>
              <Button
                onClick={() => router.push("/adminnovin/products/create")}
                className="flex items-center gap-2 px-4 py-2 w-full sm:w-auto"
                size="default"
              >
                <PlusCircle className="w-5 h-5" />
                <span className="text-sm sm:text-base">
                  افزودن محصول جدید
                </span>
              </Button>
            </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-6">
          <Card className="p-2 md:p-4">
            <CardHeader className="flex flex-row items-center justify-between pb-1 md:pb-2 px-0">
              <CardTitle className="text-xs md:text-sm font-medium text-gray-500">
                کل محصولات
              </CardTitle>
              <Package className="w-3 h-3 md:w-4 md:h-4 text-gray-500" />
            </CardHeader>
            <CardContent className="px-0">
              <div className="text-lg md:text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          
          <Card className="p-2 md:p-4">
            <CardHeader className="flex flex-row items-center justify-between pb-1 md:pb-2 px-0">
              <CardTitle className="text-xs md:text-sm font-medium text-green-500">
                محصولات فعال
              </CardTitle>
              <BadgeCheck className="w-3 h-3 md:w-4 md:h-4 text-green-500" />
            </CardHeader>
            <CardContent className="px-0">
              <div className="text-lg md:text-2xl font-bold">{stats.active}</div>
            </CardContent>
          </Card>
          
          <Card className="p-2 md:p-4">
            <CardHeader className="flex flex-row items-center justify-between pb-1 md:pb-2 px-0">
              <CardTitle className="text-xs md:text-sm font-medium text-red-500">
                ناموجود
              </CardTitle>
              <XCircle className="w-3 h-3 md:w-4 md:h-4 text-red-500" />
            </CardHeader>
            <CardContent className="px-0">
              <div className="text-lg md:text-2xl font-bold">{stats.outOfStock}</div>
            </CardContent>
          </Card>
          
          <Card className="p-2 md:p-4">
            <CardHeader className="flex flex-row items-center justify-between pb-1 md:pb-2 px-0">
              <CardTitle className="text-xs md:text-sm font-medium text-blue-500">
                ارزش موجودی
              </CardTitle>
              <DollarSign className="w-3 h-3 md:w-4 md:h-4 text-blue-500" />
            </CardHeader>
            <CardContent className="px-0">
              <div className="text-sm md:text-2xl font-bold">
                {stats.totalValue.toLocaleString("fa-IR")} تومان
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="text-sm">
            <SelectValue placeholder="فیلتر دسته‌بندی" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">همه دسته‌ها</SelectItem>
            <SelectItem value="table">میز</SelectItem>
            <SelectItem value="chair">صندلی</SelectItem>
            <SelectItem value="cabinet">کابینت</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="text-sm">
            <SelectValue placeholder="مرتب‌سازی" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">جدیدترین</SelectItem>
            <SelectItem value="oldest">قدیمی‌ترین</SelectItem>
            <SelectItem value="priceHigh">گران‌ترین</SelectItem>
            <SelectItem value="priceLow">ارزان‌ترین</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : (
        <div className="bg-white rounded-lg border overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="whitespace-nowrap">تصویر</TableHead>
                  <TableHead className="whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      نام محصول
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </TableHead>
                  <TableHead className="whitespace-nowrap">دسته‌بندی</TableHead>
                  <TableHead className="whitespace-nowrap">قیمت (تومان)</TableHead>
                  <TableHead className="whitespace-nowrap">موجودی</TableHead>
                  <TableHead className="whitespace-nowrap">وضعیت</TableHead>
                  <TableHead className="text-left whitespace-nowrap">عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
              {products && products.length > 0 ? (
                products.map((product) => {
                  // اطمینان از وجود product و _id
                  if (!product || !product._id) {
                    return null;
                  }
                  
                  try {
                    return (
                      <TableRow key={product._id}>
                        <TableCell>
                          <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-lg overflow-hidden">
                            <Image
                              src={product.images?.[0] || '/placeholder.jpg'}
                              alt={product.title || 'محصول'}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="font-medium min-w-[120px]">
                          <div className="truncate max-w-[150px] md:max-w-none">
                            {product.title || 'بدون نام'}
                          </div>
                        </TableCell>
                        <TableCell className="min-w-[100px]">
                          {product.category || 'بدون دسته‌بندی'}
                        </TableCell>
                        <TableCell className="min-w-[120px]">
                          <div className="text-sm md:text-base">
                            {(product.basePrice || product.price || 0).toLocaleString("fa-IR")} تومان
                          </div>
                        </TableCell>
                        <TableCell className="min-w-[80px]">
                          <div className="text-sm">
                            {product.variants && (
                              product.variants.thicknesses?.length > 0 || 
                              product.variants.sizes?.length > 0 || 
                              product.variants.colors?.length > 0
                            ) ? (
                              <span className="text-blue-600">متغیر دارد</span>
                            ) : (
                              <div className="flex items-center gap-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  product.stock > 0 
                                    ? 'bg-green-100 text-green-700' 
                                    : 'bg-red-100 text-red-700'
                                }`}>
                                  {product.stock > 0 ? `موجود (${product.stock})` : 'ناموجود'}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleStockToggle(product)}
                                  className={`p-1 h-6 w-6 ${
                                    product.stock > 0 
                                      ? 'text-red-500 hover:text-red-700' 
                                      : 'text-green-500 hover:text-green-700'
                                  }`}
                                  title={product.stock > 0 ? 'تبدیل به ناموجود' : 'تبدیل به موجود'}
                                >
                                  {product.stock > 0 ? <PackageX className="w-4 h-4" /> : <PackageCheck className="w-4 h-4" />}
                                </Button>
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="min-w-[100px]">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                              product.isPublished === true
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {product.isPublished === true ? "منتشر شده" : "پیش‌نویس"}
                          </span>
                        </TableCell>
                        <TableCell className="min-w-[100px]">
                          <div className="flex items-center gap-1 md:gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                try {
                                  const slug = product.slug || product._id;
                                  router.push(`/adminnovin/products/editProduct/${encodeURIComponent(slug)}`);
                                } catch (error) {
                                  console.error('Error navigating to edit:', error);
                                }
                              }}
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => {
                                try {
                                  setProductToDelete(product);
                                  setDeleteDialogOpen(true);
                                } catch (error) {
                                  console.error('Error setting product to delete:', error);
                                }
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  } catch (renderError) {
                    console.error('Error rendering product row:', renderError, product);
                    return null;
                  }
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    هیچ محصولی یافت نشد
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            </Table>
          </div>
          
          {/* Mobile Cards */}
          <div className="md:hidden p-4 space-y-4">
            {products && products.length > 0 ? (
              products.map((product) => {
                if (!product || !product._id) return null;
                
                try {
                  return (
                    <Card key={product._id} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                            <Image
                              src={product.images?.[0] || '/placeholder.jpg'}
                              alt={product.title || 'محصول'}
                              fill
                              className="object-cover"
                            />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="space-y-2">
                              <div>
                                <h3 className="font-medium text-gray-900 line-clamp-1 text-sm">
                                  {product.title || 'بدون نام'}
                                </h3>
                                <p className="text-xs text-gray-500">
                                  {product.category || 'بدون دسته‌بندی'}
                                </p>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <div className="text-sm font-medium text-blue-600">
                                  {(product.basePrice || product.price || 0).toLocaleString("fa-IR")} تومان
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                                      product.isPublished === true
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                    }`}
                                  >
                                    {product.isPublished === true ? "منتشر شده" : "پیش‌نویس"}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <div className="text-xs text-gray-500">
                                  {product.variants && (
                                    product.variants.thicknesses?.length > 0 || 
                                    product.variants.sizes?.length > 0 || 
                                    product.variants.colors?.length > 0
                                  ) ? (
                                    <span className="text-blue-600">متغیر دارد</span>
                                  ) : (
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                      product.stock > 0 
                                        ? 'bg-green-100 text-green-700' 
                                        : 'bg-red-100 text-red-700'
                                    }`}>
                                      {product.stock > 0 ? `موجود (${product.stock})` : 'ناموجود'}
                                    </span>
                                  )}
                                </div>
                                
                                <div className="flex items-center gap-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                      try {
                                        const slug = product.slug || product._id;
                                        router.push(`/adminnovin/products/editProduct/${encodeURIComponent(slug)}`);
                                      } catch (error) {
                                        console.error('Error navigating to edit:', error);
                                      }
                                    }}
                                    className="h-8 w-8 p-0"
                                  >
                                    <Edit2 className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-500 hover:text-red-700 h-8 w-8 p-0"
                                    onClick={() => {
                                      try {
                                        setProductToDelete(product);
                                        setDeleteDialogOpen(true);
                                      } catch (error) {
                                        console.error('Error setting product to delete:', error);
                                      }
                                    }}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                } catch (renderError) {
                  console.error('Error rendering product card:', renderError, product);
                  return null;
                }
              })
            ) : (
              <div className="text-center py-8 text-gray-500">
                هیچ محصولی یافت نشد
              </div>
            )}
          </div>
        </div>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>آیا از حذف این محصول مطمئن هستید؟</AlertDialogTitle>
            <AlertDialogDescription>
              این عمل غیرقابل بازگشت است و محصول به طور کامل حذف خواهد شد.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>انصراف</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600"
              onClick={handleDelete}
            >
              حذف محصول
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
        </>
      )}
      
      {/* دکمه شناور برای موبایل */}
      <div className="fixed bottom-20 left-4 md:hidden z-50">
        <Button
          onClick={() => router.push("/adminnovin/products/create")}
          className="w-14 h-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700"
          size="icon"
        >
          <PlusCircle className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};

export default Page;