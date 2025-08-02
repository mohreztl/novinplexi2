"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

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
      <table className="w-full border border-gray-300 text-right">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">عنوان</th>
            <th className="p-2 border">تاریخ</th>
            <th className="p-2 border">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog._id} className="border-t">
              <td className="p-2 border">{blog.title}</td>
              <td className="p-2 border">
                {new Date(blog.createdAt).toLocaleDateString("fa-IR")}
              </td>
              <td className="p-2 border flex gap-2">
                <Link
                  href={`/adminnovin/blog/edit/${blog._id}`}
                  className="text-blue-600 underline"
                >
                  ویرایش
                </Link>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="text-red-600 underline"
                  disabled={isPending}
                >
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <Link
            key={i}
            href={`/admin/blogs/${i + 1}`}
            className={`px-3 py-1 rounded border ${
              i + 1 === page ? "bg-blue-600 text-white" : "bg-white text-black"
            }`}
          >
            {i + 1}
          </Link>
        ))}
      </div>
    </>
  );
}
