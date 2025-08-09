import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Category from "@/models/Category";

export const dynamic = 'force-dynamic';

// GET: دریافت همه دسته‌بندی‌ها
export async function GET() {
  try {
    await connectToDB(); // اتصال به دیتابیس
    
    const parents = await Category.find({ parent: null }).lean();
    const categories = await Promise.all(
      parents.map(async (parent) => {
        const children = await Category.find({ parent: parent._id }).lean();
        // Map fields for backward compatibility
        return { 
          ...parent, 
          title: parent.name, // backward compatibility
          icon: parent.image, // backward compatibility
          children: children.map(child => ({
            ...child,
            title: child.name,
            icon: child.image
          }))
        };
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
    await connectToDB();
    
    const body = await req.json();
    console.log('Received data:', body); // برای debugging
    
    // Map the incoming data to model fields
    const { title, name, slug, icon, image, type, parent, description } = body;
    
    // Use title as name if name is not provided, or vice versa
    const categoryName = name || title;
    const categoryType = type || 'product'; // default type
    const categoryImage = image || icon;
    
    if (!categoryName) {
      return NextResponse.json({ 
        success: false, 
        message: "نام دسته‌بندی الزامی است" 
      }, { status: 400 });
    }

    if (!categoryType) {
      return NextResponse.json({ 
        success: false, 
        message: "نوع دسته‌بندی الزامی است" 
      }, { status: 400 });
    }

    // Generate slug if not provided
    const categorySlug = slug || categoryName.replace(/\s+/g, '-').toLowerCase();

    const newCategory = await Category.create({
      name: categoryName,
      slug: categorySlug,
      type: categoryType,
      image: categoryImage,
      description: description || '',
      parent: parent || null,
    });

    return NextResponse.json({ success: true, category: newCategory });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ 
      success: false, 
      message: `خطا در ایجاد دسته‌بندی: ${error.message}` 
    }, { status: 500 });
  }
}

// PATCH: آپدیت یک دسته‌بندی
export async function PATCH(req) {
  try {
    await connectToDB();
    
    const body = await req.json();
    const { id, title, name, slug, icon, image, type, parent, description } = body;

    // Map the incoming data to model fields
    const categoryName = name || title;
    const categoryType = type || 'product';
    const categoryImage = image || icon;

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { 
        name: categoryName,
        slug: slug || categoryName?.replace(/\s+/g, '-').toLowerCase(),
        type: categoryType,
        image: categoryImage,
        description: description || '',
        parent: parent || null 
      },
      { new: true }
    );

    if (!updatedCategory) {
      return NextResponse.json({ success: false, message: "دسته‌بندی پیدا نشد" }, { status: 404 });
    }

    return NextResponse.json({ success: true, category: updatedCategory });
  } catch (error) {
    console.error("PATCH Error:", error);
    return NextResponse.json({ 
      success: false, 
      message: `خطا در بروزرسانی دسته‌بندی: ${error.message}` 
    }, { status: 500 });
  }
}

// DELETE: حذف یک دسته‌بندی
export async function DELETE(req) {
  try {
    await connectToDB();
    
    const body = await req.json();
    const { id } = body;

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return NextResponse.json({ 
        success: false, 
        message: "دسته‌بندی پیدا نشد" 
      }, { status: 404 });
    }

    // زیر مجموعه‌ها رو هم حذف کن
    await Category.deleteMany({ parent: id });

    return NextResponse.json({ 
      success: true, 
      message: "دسته‌بندی با موفقیت حذف شد" 
    });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ 
      success: false, 
      message: "خطا در حذف دسته‌بندی" 
    }, { status: 500 });
  }
}
