import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Category from "@/models/Category";

export async function GET(req, { params }) {
  try {
    await connectToDB();
    const { id } = params;

    // ابتدا بر اساس slug جستجو کنیم
    let category = await Category.findOne({ slug: id });
    
    // اگر پیدا نشد، ممکن است ID باشد
    if (!category && id.match(/^[0-9a-fA-F]{24}$/)) {
      category = await Category.findById(id);
    }
    
    if (!category) {
      return NextResponse.json({ 
        success: false, 
        error: "دسته‌بندی پیدا نشد" 
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      category
    });
  } catch (error) {
    console.error("Error fetching category:", error);
    return NextResponse.json(
      { success: false, error: "خطا در دریافت دسته‌بندی" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    await connectToDB();
    const { id } = params;
    const body = await req.json();
    
    console.log('PUT /api/categories/manage/[id] - ID:', id);
    console.log('PUT /api/categories/manage/[id] - Received body:', JSON.stringify(body, null, 2));

    // بررسی slug جدید برای تکراری نبودن
    if (body.slug) {
      const existingCategory = await Category.findOne({ 
        slug: body.slug, 
        _id: { $ne: id.match(/^[0-9a-fA-F]{24}$/) ? id : undefined }
      });
      if (existingCategory) {
        return NextResponse.json(
          { success: false, error: 'برچسب URL از قبل استفاده شده است' },
          { status: 400 }
        );
      }
    }

    let updatedCategory;
    
    // ابتدا بر اساس slug به‌روزرسانی کنیم
    updatedCategory = await Category.findOneAndUpdate(
      { slug: id },
      body,
      { new: true, runValidators: true }
    );

    // اگر پیدا نشد، ممکن است ID باشد
    if (!updatedCategory && id.match(/^[0-9a-fA-F]{24}$/)) {
      updatedCategory = await Category.findByIdAndUpdate(
        id,
        body,
        { new: true, runValidators: true }
      );
    }

    if (!updatedCategory) {
      return NextResponse.json({ 
        success: false, 
        error: "دسته‌بندی پیدا نشد" 
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      category: updatedCategory
    });
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      { success: false, error: "خطا در به‌روزرسانی دسته‌بندی" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectToDB();
    const { id } = params;

    let deletedCategory;
    
    // ابتدا بر اساس slug حذف کنیم
    deletedCategory = await Category.findOneAndDelete({ slug: id });
    
    // اگر پیدا نشد، ممکن است ID باشد
    if (!deletedCategory && id.match(/^[0-9a-fA-F]{24}$/)) {
      deletedCategory = await Category.findByIdAndDelete(id);
    }

    if (!deletedCategory) {
      return NextResponse.json({ 
        success: false, 
        error: "دسته‌بندی پیدا نشد" 
      }, { status: 404 });
    }

    // زیر مجموعه‌ها رو هم حذف کن (اگر parent بود)
    await Category.deleteMany({ parent: deletedCategory._id });

    return NextResponse.json({
      success: true,
      message: "دسته‌بندی با موفقیت حذف شد"
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      { success: false, error: "خطا در حذف دسته‌بندی" },
      { status: 500 }
    );
  }
}
