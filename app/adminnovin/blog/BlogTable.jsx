"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function BlogTable({ blogs, page, totalPages }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = async (id) => {
    if (confirm("آیا از حذف این بلاگ مطمئن هستید؟")) {
      try {
        const res = await fetch(`/api/blog/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          startTransition(() => {
            router.refresh();
          });
        } else {
          alert("خطا در حذف بلاگ");
        }
      } catch (error) {
        console.error(error);
        alert("مشکلی پیش آمد");
      }
    }
  };

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border border-gray-300 text-right">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border text-sm whitespace-nowrap">عنوان</th>
              <th className="p-2 border text-sm whitespace-nowrap">تاریخ</th>
              <th className="p-2 border text-sm whitespace-nowrap">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id} className="border-t">
                <td className="p-2 border">
                  <div className="max-w-xs truncate">{blog.title}</div>
                </td>
                <td className="p-2 border whitespace-nowrap text-sm">
                  {new Date(blog.createdAt).toLocaleDateString("fa-IR")}
                </td>
                <td className="p-2 border">
                  <div className="flex gap-2">
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/adminnovin/blog/edit/${blog._id}`}>
                        <Edit2 className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(blog._id)}
                      disabled={isPending}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {blogs.map((blog) => (
          <Card key={blog._id}>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <h3 className="font-medium text-gray-900 line-clamp-2">{blog.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(blog.createdAt).toLocaleDateString("fa-IR")}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button asChild size="sm" variant="outline" className="flex-1">
                    <Link href={`/adminnovin/blog/edit/${blog._id}`} className="flex items-center justify-center gap-2">
                      <Edit2 className="w-4 h-4" />
                      ویرایش
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(blog._id)}
                    disabled={isPending}
                    className="flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    حذف
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center gap-2 flex-wrap">
        {Array.from({ length: totalPages }, (_, i) => (
          <Link
            key={i}
            href={`/admin/blogs/${i + 1}`}
            className={`px-3 py-1 rounded border text-sm ${
              i + 1 === page ? "bg-blue-600 text-white" : "bg-white text-black hover:bg-gray-50"
            }`}
          >
            {i + 1}
          </Link>
        ))}
      </div>
    </>
  );
}
