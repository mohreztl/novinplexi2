import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Category from "@/models/Category";

export const dynamic = 'force-dynamic';

// GET: دریافت همه دسته‌بندی‌ها
export async function GET(req) {
  try {
    await connectToDB();
    
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type"); // product یا service
    const active = searchParams.get("active"); // true/false
    const flat = searchParams.get("flat"); // true برای لیست صاف

    let query = {};
    
    if (type) {
      query.type = type;
    }
    
    if (active === 'true') {
      query.isActive = true;
    } else if (active === 'false') {
      query.isActive = false;
    }

    console.log('Fetching categories with query:', query);

    if (flat === 'true') {
      // لیست صاف تمام دسته‌بندی‌ها
      const categories = await Category.find(query)
        .sort({ order: 1, createdAt: -1 })
        .lean();

      return NextResponse.json({
        categories,
        total: categories.length
      });
    } else {
      // لیست سلسله مراتبی (کد قبلی)
      const parents = await Category.find({ ...query, parent: null }).lean();
      const categories = await Promise.all(
        parents.map(async (parent) => {
          const children = await Category.find({ parent: parent._id }).lean();
          return { 
            ...parent, 
            title: parent.name,
            icon: parent.image,
            children: children.map(child => ({
              ...child,
              title: child.name,
              icon: child.image
            }))
          };
        })
      );

      return NextResponse.json({ success: true, categories });
    }
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
    console.log('POST /api/categories - Received body:', JSON.stringify(body, null, 2));
    
    const {
      name,
      slug,
      description,
      image,
      isActive,
      type,
      order,
      // backward compatibility
      title,
      icon
    } = body;

    const categoryName = name || title;
    const categoryImage = image || icon;
    const categoryType = type || 'product';
    
    if (!categoryName) {
      return NextResponse.json({ 
        success: false, 
        error: "نام دسته‌بندی الزامی است" 
      }, { status: 400 });
    }

    // بررسی وجود slug تکراری
    const categorySlug = slug || categoryName.replace(/\s+/g, '-').toLowerCase();
    const existingCategory = await Category.findOne({ slug: categorySlug });
    if (existingCategory) {
      return NextResponse.json(
        { success: false, error: 'برچسب URL از قبل استفاده شده است' },
        { status: 400 }
      );
    }

    const newCategory = await Category.create({
      name: categoryName,
      slug: categorySlug,
      description: description || '',
      image: categoryImage,
      isActive: isActive !== false,
      type: categoryType,
      order: order || 0,
      parent: null // برای سادگی فعلاً parent null
    });

    return NextResponse.json({
      success: true,
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'خطا در ایجاد دسته‌بندی',
        details: error.message 
      },
      { status: 500 }
    );
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
