"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import {
  Search,
  Loader2,
  ArrowUpDown,
  Edit2,
  Trash2,
  PlusCircle,
  Package,
  BadgeCheck,
  XCircle,
  DollarSign
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  const [searchTerm, setSearchTerm] = useState("");
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
      const response = await axios.get("/api/products");
      let filteredProducts = Array.isArray(response.data) ? response.data : [];

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
            return product && (product.stock || 0) === 0;
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

      // مرتب‌سازی با حفاظت از خطا
      try {
        filteredProducts.sort((a, b) => {
          try {
            if (!a || !b) return 0;
            
            if (sortBy === "newest") {
              const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
              const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
              return dateB - dateA;
            } else if (sortBy === "oldest") {
              const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
              const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
              return dateA - dateB;
            } else if (sortBy === "priceHigh") {
              const priceA = a.basePrice || a.price || 0;
              const priceB = b.basePrice || b.price || 0;
              return priceB - priceA;
            } else if (sortBy === "priceLow") {
              const priceA = a.basePrice || a.price || 0;
              const priceB = b.basePrice || b.price || 0;
              return priceA - priceB;
            }
            return 0;
          } catch (sortError) {
            console.error('Error in sort comparison:', sortError, a, b);
            return 0;
          }
        });
      } catch (sortError) {
        console.error('Error sorting products:', sortError);
      }

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
      await axios.delete(`/api/products/${productToDelete._id}`);
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

  // فیلتر محصولات با حفاظت کامل از خطاهای toLowerCase
  const filteredProducts = (() => {
    try {
      // اطمینان از اینکه products یک آرایه است
      if (!Array.isArray(products)) {
        console.warn('Products is not an array:', products);
        return [];
      }

      return products.filter((prod) => {
        try {
          // بررسی اولیه محصول
          if (!prod || typeof prod !== 'object') {
            return false;
          }

          // بررسی searchTerm و تبدیل ایمن به string
          let searchQuery = '';
          try {
            if (searchTerm && typeof searchTerm === 'string') {
              searchQuery = searchTerm.trim().toLowerCase();
            }
          } catch (searchError) {
            console.error('Error processing searchTerm:', searchError);
            searchQuery = '';
          }

          // اگر جستجو خالی است، همه محصولات را نشان بده
          if (!searchQuery) {
            return true;
          }

          // تبدیل ایمن title و _id به lowercase
          let productTitle = '';
          let productId = '';

          try {
            if (prod.title && typeof prod.title === 'string') {
              productTitle = prod.title.toLowerCase();
            }
          } catch (titleError) {
            console.error('Error processing title:', titleError, prod.title);
          }

          try {
            if (prod._id && typeof prod._id === 'string') {
              productId = prod._id.toLowerCase();
            }
          } catch (idError) {
            console.error('Error processing _id:', idError, prod._id);
          }

          // جستجو در title و id
          return productTitle.includes(searchQuery) || productId.includes(searchQuery);

        } catch (productError) {
          console.error('Error filtering individual product:', productError, prod);
          return false;
        }
      });

    } catch (filterError) {
      console.error('Critical error in filteredProducts:', filterError);
      return [];
    }
  })();

  // All dialog handling is done through onOpenChange

  return (
    <div className="p-6">
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
            <div className="flex justify-between items-center mb-6 ml-6">
              <h1 className="text-2xl font-bold">مدیریت محصولات</h1>
              <Button
                onClick={() => router.push("/adminnovin/products/create")}
                className="gap-2"
              >
                <PlusCircle className="w-6 h-6" />
                افزودن محصول جدید
              </Button>
            </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                کل محصولات
              </CardTitle>
              <Package className="w-4 h-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-green-500">
                محصولات فعال
              </CardTitle>
              <BadgeCheck className="w-4 h-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.active}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-red-500">
                ناموجود
              </CardTitle>
              <XCircle className="w-4 h-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.outOfStock}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-blue-500">
                ارزش موجودی
              </CardTitle>
              <DollarSign className="w-4 h-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.totalValue.toLocaleString("fa-IR")} تومان
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="جستجوی محصول..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-4 pr-10"
          />
        </div>

        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger>
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
          <SelectTrigger>
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
        <div className="bg-white rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>تصویر</TableHead>
                <TableHead>
                  <div className="flex items-center gap-2">
                    نام محصول
                    <ArrowUpDown className="w-4 h-4" />
                  </div>
                </TableHead>
                <TableHead>دسته‌بندی</TableHead>
                <TableHead>قیمت (تومان)</TableHead>
                <TableHead>موجودی</TableHead>
                <TableHead>وضعیت</TableHead>
                <TableHead className="text-left">عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts && filteredProducts.length > 0 ? (
                filteredProducts.map((product) => {
                  // اطمینان از وجود product و _id
                  if (!product || !product._id) {
                    return null;
                  }
                  
                  try {
                    return (
                      <TableRow key={product._id}>
                        <TableCell>
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                            <Image
                              src={product.images?.[0] || '/placeholder.jpg'}
                              alt={product.title || 'محصول'}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {product.title || 'بدون نام'}
                        </TableCell>
                        <TableCell>
                          {product.category || 'بدون دسته‌بندی'}
                        </TableCell>
                        <TableCell>
                          {(product.basePrice || product.price || 0).toLocaleString("fa-IR")} تومان
                        </TableCell>
                        <TableCell>
                          {product.variants && (
                            product.variants.thicknesses?.length > 0 || 
                            product.variants.sizes?.length > 0 || 
                            product.variants.colors?.length > 0
                          ) 
                            ? "متغیر دارد"
                            : product.stock || 0
                          }
                        </TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              product.isPublished === true
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {product.isPublished === true ? "منتشر شده" : "پیش‌نویس"}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
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
                              size="icon"
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
    </div>
  );
};

export default Page;