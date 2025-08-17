"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminCategoryRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect به صفحه جدید categories
    router.replace("/adminnovin/categories");
  }, [router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p>در حال انتقال به صفحه دسته‌بندی‌ها...</p>
      </div>
    </div>
  );
}
