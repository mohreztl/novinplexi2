"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog';
import toast, { Toaster } from "react-hot-toast";
import Image from 'next/image';
import {
  Heart,
  X  ,
  Edit,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
const EditProductButton = ({ slug }) => {
  const router = useRouter();
  const handleEdit = () => {
    router.push(`/adminnikoo/products/editProduct/${slug}`);
  };
  return (
    <Button
      onClick={handleEdit}
      variant="outline"
      size="icon"
      className=" bg-white hover:bg-gray-100"
    >
      <Edit className="h-5 w-5" color='#2563eb' />
    </Button>
  );
};
    
const page = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 12;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  useEffect(() => {
    fetchProducts();

  }, []);
  const handleDeleteClick = (productSlug) => {
    setProductToDelete(productSlug); // ذخیره محصولی که باید حذف شود
    setDialogOpen(true); // نمایش دایالوگ فقط برای این محصول
  };
  

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setProductToDelete(null);
  };
  const handleConfirmDelete = async () => {
    if (!productToDelete) return;

    setIsDeleting(true);
    try {
      const res = await axios.delete(`/api/product/${productToDelete}`);
      if (res.status === 200) {
        toast.success('Product deleted successfully!');
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.slug !== productToDelete)
        ); // حذف محصول از لیست
      }
    } catch (error) {
      toast.error('Product could not be deleted');
    } finally {
      setIsDeleting(false);
      setDialogOpen(false);
      setProductToDelete(null); // محصول حذف‌شده را از ذخیره خارج کنیم
    }
  };




  const fetchProducts = async () => {

    try {
      const res = await axios.get(`/api/products/allProducts`, {
        params: { page: 1, limit: itemsPerPage },
      });
      if (res.status === 200 || res.status === 201) {
        setProducts(res.data.products);
        setTotalPages(Math.ceil(res.data.total / itemsPerPage));
      }
    } catch (error) {
      console.log(error);
      setError("Failed to load products, please try again in a few seconds!");
      toast.error(
        "Failed to load products, please try again in a few seconds!"
      );
    }
 
  
    //  finally {
    //   setIsSearching(false);
    //   setLoading(false);
    // }
  };
  const handleDelete = async (slug) => {
    setIsDeleting(true)
    try {
      const res = await axios.delete(`/api/product/${slug}`);
      if (res.status === 200) {
        toast.success("Product deleted successfully!");
        router.push("/products");

      }
    } catch (error) {
      toast.error("Product cloudnt be deleted");
      console.log(error);
    }
    finally {
      setIsDeleting(false);
      setDialogOpen(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 ">
       <div className="bg-blues py-6">
             <h1 className="text-center text-white text-3xl font-extrabold">مدیریت محصولات</h1>
             </div>
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <div className="overflow-x-auto ">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-800 text-white">
              <tr>
              <th className="py-3 px-6 text-right">تصویر</th>
                <th className="py-3 px-6 text-right">نام محصول</th>
                <th className="py-3 px-6 text-right hidden md:block items-center">قیمت</th>
      
                <th className="py-3 px-6 text-center">عملیات</th>
              </tr>
            </thead>
            <tbody>
  {products.map((product, index) => (
    <tr
      key={product._id}
      className={`border-b ${
        index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'
      } hover:bg-gray-200 transition`}
    >
      <td className="py-3 px-6"><Image src={product.images[0]} width={100} height={100} /></td>
      <td className="py-3 px-6">{product.name}</td>
      <td className="py-3 px-6 hidden md:block  mt-16">{product.price} </td>
      <td className="py-3 px-6 text-center ">
        <div className='flex justify-center gap-3'>
          <EditProductButton slug={product.slug} />
          <Button
            onClick={() => handleDeleteClick(product.slug)} // تنظیم محصول مورد نظر برای حذف
            variant="outline"
            size="icon"
            className=" bg-white hover:bg-gray-100"
          >
            <X color='#dc2626' className="h-5 w-5 " />
          </Button>
        </div>
      </td>
    </tr>
  ))}
</tbody>

{/* دایالوگ تأیید حذف را اینجا قرار دهید تا فقط یک دایالوگ وجود داشته باشد */}
<DeleteConfirmationDialog
  open={dialogOpen}
  onClose={handleCloseDialog}
  onConfirm={handleConfirmDelete}
/>

      </table>
      </div>
    )}
  </div>
  )
}

export default page