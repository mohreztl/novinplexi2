"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import axios from "axios";
import {
  PlusCircle,
  Loader2,
  Edit2,
  Trash2,
  Image as ImageIcon,
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
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

export default function BrandsPage() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    logoUrl: "",
  });

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await axios.get("/api/brand");
      setBrands(response.data.data || []);
    } catch (error) {
      toast.error("خطا در دریافت برندها");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFormData((prev) => ({ ...prev, logoUrl: response.data.url }));
      toast.success("لوگو با موفقیت آپلود شد");
    } catch (error) {
      toast.error("خطا در آپلود لوگو");
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.logoUrl) {
      toast.error("لطفا تمام فیلدهای ضروری را پر کنید");
      return;
    }

    try {
      if (selectedBrand) {
        await axios.put(`/api/brand/${selectedBrand._id}`, formData);
        toast.success("برند با موفقیت ویرایش شد");
      } else {
        await axios.post("/api/brand", formData);
        toast.success("برند با موفقیت ایجاد شد");
      }
      setDialogOpen(false);
      setSelectedBrand(null);
      setFormData({ name: "", logoUrl: "" });
      fetchBrands();
    } catch (error) {
      toast.error(selectedBrand ? "خطا در ویرایش برند" : "خطا در ایجاد برند");
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!selectedBrand) return;

    try {
      await axios.delete(`/api/brand/${selectedBrand._id}`);
      toast.success("برند با موفقیت حذف شد");
      setDeleteDialogOpen(false);
      setSelectedBrand(null);
      fetchBrands();
    } catch (error) {
      toast.error("خطا در حذف برند");
      console.error(error);
    }
  };

  const handleEdit = (brand) => {
    setSelectedBrand(brand);
    setFormData({
      name: brand.name,
      logoUrl: brand.logoUrl,
    });
    setDialogOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">مدیریت برندها</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <PlusCircle className="w-4 h-4" />
              افزودن برند جدید
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedBrand ? "ویرایش برند" : "افزودن برند جدید"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">نام برند</label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="نام برند را وارد کنید"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">لوگو</label>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="gap-2"
                    onClick={() => document.getElementById("logo").click()}
                  >
                    <ImageIcon className="w-4 h-4" />
                    انتخاب لوگو
                  </Button>
                  <input
                    type="file"
                    id="logo"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogoUpload}
                  />
                  {formData.logoUrl && (
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden">
                      <Image
                        src={formData.logoUrl}
                        alt="لوگو"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <DialogClose asChild>
                  <Button variant="outline" type="button">
                    انصراف
                  </Button>
                </DialogClose>
                <Button type="submit">
                  {selectedBrand ? "ویرایش برند" : "افزودن برند"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
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
                <TableHead>لوگو</TableHead>
                <TableHead>نام برند</TableHead>
                <TableHead className="text-left">عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {brands.map((brand) => (
                <TableRow key={brand._id}>
                  <TableCell>
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden">
                      <Image
                        src={brand.logoUrl}
                        alt={brand.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{brand.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(brand)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => {
                          setSelectedBrand(brand);
                          setDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>آیا از حذف این برند مطمئن هستید؟</AlertDialogTitle>
            <AlertDialogDescription>
              این عمل غیرقابل بازگشت است و برند به طور کامل حذف خواهد شد.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>انصراف</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600"
              onClick={handleDelete}
            >
              حذف برند
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
    });

    if (res.ok) {
      const newBrand = await res.json();
      setBrands(prev => [...prev, newBrand.data]);
      setName('');
    
    }
  };

  return (
    <div>
      <h1>Manage Brands</h1>
      <div>
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {/* <select onChange={(e) => setParent(e.target.value)} value={parent || ''}>
          <option value="">No Parent</option>
          {brands.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select> */}
        <button onClick={addBrand}>Add Brand</button>
      </div>
      <ul>
        {brands.map((cat) => (
          <li key={cat._id}>
            {cat.name} {cat.parent && ` (Parent: ${cat.parent.name})`}
          </li>
        ))}
      </ul>
    </div>
  );
}