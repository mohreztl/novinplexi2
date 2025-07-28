"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ title: "", slug: "", icon: "", parent: "" });
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await axios.get("/api/categories");
    setCategories(res.data.categories);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        await axios.patch("/api/categories", { id: editingId, ...form });
      } else {
        await axios.post("/api/categories", form);
      }
      setForm({ title: "", slug: "", icon: "", parent: "" });
      setEditingId(null);
      fetchCategories();
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleEdit = (category) => {
    setForm({
      title: category.title,
      slug: category.slug,
      icon: category.icon,
      parent: category.parent?._id || "",
    });
    setEditingId(category._id);
  };

  const handleDelete = async (id) => {
    if (confirm("آیا مطمئن هستید که می‌خواهید این دسته‌بندی را حذف کنید؟")) {
      await axios.delete("/api/categories", { data: { id } });
      fetchCategories();
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">مدیریت دسته‌بندی‌ها</h1>

      {/* فرم افزودن / ویرایش */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md mb-8 space-y-4">
        <div className="flex flex-col">
          <label>عنوان دسته‌بندی</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="border p-2 rounded"
            required
          />
        </div>

        <div className="flex flex-col">
          <label>اسلاگ (برای URL)</label>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="border p-2 rounded"
            required
          />
        </div>

        <div className="flex flex-col">
          <label>آیکون (مسیر عکس یا لینک)</label>
          <input
            type="text"
            value={form.icon}
            onChange={(e) => setForm({ ...form, icon: e.target.value })}
            className="border p-2 rounded"
          />
        </div>

        <div className="flex flex-col">
          <label>دسته مادر (اختیاری)</label>
          <select
            value={form.parent}
            onChange={(e) => setForm({ ...form, parent: e.target.value })}
            className="border p-2 rounded"
          >
            <option value="">بدون والد (مادر)</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.title}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {editingId ? "ویرایش دسته" : "افزودن دسته"}
        </button>
      </form>

      {/* لیست دسته‌بندی‌ها */}
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">دسته‌بندی‌های موجود</h2>

        {categories.length === 0 ? (
          <p>هنوز هیچ دسته‌ای اضافه نشده است.</p>
        ) : (
          <ul className="space-y-4">
            {categories.map((cat) => (
              <li key={cat._id} className="border rounded p-4">
                <div className="flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    {cat.icon && (
                      <img src={cat.icon} alt="icon" className="w-6 h-6" />
                    )}
                    <span className="font-bold">{cat.title}</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(cat)}
                      className="text-blue-600 hover:underline"
                    >
                      ویرایش
                    </button>
                    <button
                      onClick={() => handleDelete(cat._id)}
                      className="text-red-600 hover:underline"
                    >
                      حذف
                    </button>
                  </div>
                </div>

                {/* زیر دسته‌ها */}
                {cat.children.length > 0 && (
                  <ul className="mt-2 ml-6 space-y-2">
                    {cat.children.map((child) => (
                      <li key={child._id} className="flex justify-between items-center text-gray-600">
                        <div className="flex gap-2 items-center">
                          {child.icon && (
                            <img src={child.icon} alt="icon" className="w-5 h-5" />
                          )}
                          <span>{child.title}</span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(child)}
                            className="text-blue-500 hover:underline text-sm"
                          >
                            ویرایش
                          </button>
                          <button
                            onClick={() => handleDelete(child._id)}
                            className="text-red-500 hover:underline text-sm"
                          >
                            حذف
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
