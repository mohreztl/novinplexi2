import connect from "@/utils/config/dbConnection";
import Blog from "@/utils/models/Blog";
import BlogTable from "./BlogTable"; // ایمپورت کامپوننت کلاینتی

const PAGE_SIZE = 10;

export default async function AdminBlogsPage({ params }) {
  await connect();

  const page = parseInt(params.page || "1");
  const total = await Blog.countDocuments();
  const blogs = await Blog.find({})
    .sort({ createdAt: -1 })
    .skip((page - 1) * PAGE_SIZE)
    .limit(PAGE_SIZE)
    .lean();

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">مدیریت بلاگ‌ها</h1>

      <BlogTable blogs={blogs} page={page} totalPages={totalPages} />
    </div>
  );
}
