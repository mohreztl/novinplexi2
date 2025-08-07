import dbConnect from "@/utils/config/dbConnection";
import { NextResponse } from "next/server";
import Blog from "@/models/Blog";

export const dynamic = 'force-dynamic';

// GET - دریافت یک بلاگ بر اساس slug
export async function GET(req, { params }) {
  try {
    await dbConnect();
    
    const { slug } = params;
    
    if (!slug) {
      return NextResponse.json(
        { success: false, error: "slug الزامی است" },
        { status: 400 }
      );
    }
    
    // پیدا کردن بلاگ
    const blog = await Blog.findOne({ slug });
    
    if (!blog) {
      return NextResponse.json(
        { success: false, error: "مقاله پیدا نشد" },
        { status: 404 }
      );
    }
    
    // افزایش تعداد بازدید
    blog.views = (blog.views || 0) + 1;
    await blog.save();
    
    return NextResponse.json({
      success: true,
      blog
    });
    
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { success: false, error: "خطا در دریافت مقاله" },
      { status: 500 }
    );
  }
}

// PUT - آپدیت کردن بلاگ
export async function PUT(req, { params }) {
  try {
    await dbConnect();
    
    const { slug } = params;
    const body = await req.json();
    
    if (!slug) {
      return NextResponse.json(
        { success: false, error: "slug الزامی است" },
        { status: 400 }
      );
    }
    
    // بررسی یکتا بودن slug جدید اگر تغییر کرده
    if (body.slug && body.slug !== slug) {
      const existingBlog = await Blog.findOne({ slug: body.slug });
      if (existingBlog) {
        return NextResponse.json(
          { success: false, error: "این slug قبلاً استفاده شده است" },
          { status: 400 }
        );
      }
    }
    
    // آپدیت بلاگ
    const updatedBlog = await Blog.findOneAndUpdate(
      { slug },
      { ...body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    
    if (!updatedBlog) {
      return NextResponse.json(
        { success: false, error: "مقاله پیدا نشد" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: "مقاله با موفقیت آپدیت شد",
      blog: updatedBlog
    });
    
  } catch (error) {
    console.error("Error updating blog:", error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: "عنوان یا slug تکراری است" },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: "خطا در آپدیت مقاله" },
      { status: 500 }
    );
  }
}

// DELETE - حذف بلاگ
export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    
    const { slug } = params;
    
    if (!slug) {
      return NextResponse.json(
        { success: false, error: "slug الزامی است" },
        { status: 400 }
      );
    }
    
    const deletedBlog = await Blog.findOneAndDelete({ slug });
    
    if (!deletedBlog) {
      return NextResponse.json(
        { success: false, error: "مقاله پیدا نشد" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: "مقاله با موفقیت حذف شد"
    });
    
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { success: false, error: "خطا در حذف مقاله" },
      { status: 500 }
    );
  }
}
