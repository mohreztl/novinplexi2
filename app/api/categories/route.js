export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Category from "@/utils/models/Category";

// کش کردن اتصال به دیتابیس
let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null };

async function connectToDB() {
  if (cached.conn) return cached.conn;
  
  // تنظیمات اتصال
  const opts = {
    bufferCommands: false,
  };

  try {
    cached.conn = await mongoose.connect(process.env.MONGO_URI, opts);
    console.log("Connected to MongoDB");
    return cached.conn;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

// GET: دریافت همه دسته‌بندی‌ها
export async function GET() {
  try {
    await connectToDB(); // اتصال به دیتابیس
    
    const parents = await Category.find({ parent: null }).lean();
    const categories = await Promise.all(
      parents.map(async (parent) => {
        const children = await Category.find({ parent: parent._id }).lean();
        return { ...parent, children };
      })
    );

    return NextResponse.json({ success: true, categories });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { success: false, message: "خطا در دریافت دسته‌بندی‌ها" },
      { status: 500 }
    );
  }
}

// POST: ساخت دسته جدید
export async function POST(req) {
  try {
    const body = await req.json();
    const { title, slug, icon, parent } = body;

    const newCategory = await Category.create({
      title,
      slug,
      icon,
      parent: parent || null,
    });

    return NextResponse.json({ success: true, category: newCategory });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "خطا در ایجاد دسته‌بندی" }, { status: 500 });
  }
}

// PATCH: آپدیت یک دسته‌بندی
export async function PATCH(req) {
  try {
    const body = await req.json();
    const { id, title, slug, icon, parent } = body;

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { title, slug, icon, parent: parent || null },
      { new: true }
    );

    if (!updatedCategory) {
      return NextResponse.json({ success: false, message: "دسته‌بندی پیدا نشد" }, { status: 404 });
    }

    return NextResponse.json({ success: true, category: updatedCategory });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "خطا در بروزرسانی دسته‌بندی" }, { status: 500 });
  }
}

// DELETE: حذف یک دسته‌بندی
export async function DELETE(req) {
  try {
    const body = await req.json();
    const { id } = body;

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return NextResponse.json({ success: false, message: "دسته‌بندی پیدا نشد" }, { status: 404 });
    }

    // زیر مجموعه‌ها رو هم حذف کن (اختیاری، بستگی به استراتژی پروژه داره)
    await Category.deleteMany({ parent: id });

    return NextResponse.json({ success: true, message: "دسته‌بندی با موفقیت حذف شد" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "خطا در حذف دسته‌بندی" }, { status: 500 });
  }
}
