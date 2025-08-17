import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Category from "@/models/Category";

export async function POST() {
  try {
    await connectToDB();

    // بررسی وجود دسته‌بندی اکسسوری
    const existingCategory = await Category.findOne({ slug: 'plexi-accessories' });
    
    if (existingCategory) {
      return NextResponse.json({
        success: true,
        message: 'دسته‌بندی اکسسوری پلکسی از قبل وجود دارد',
        category: existingCategory
      });
    }

    // ایجاد دسته‌بندی جدید
    const newCategory = await Category.create({
      name: 'اکسسوری‌های پلکسی',
      slug: 'plexi-accessories',
      type: 'product',
      description: 'مجموعه‌ای از بهترین اکسسوری‌های پلکسی گلاس شامل نگهدارنده‌ها، قفسه‌ها، جعبه‌ها و سایر لوازم جانبی که زیبایی و کاربرد فضای شما را افزایش می‌دهند. تمام محصولات با کیفیت بالا و طراحی مدرن.',
      isActive: true,
      order: 1
    });

    return NextResponse.json({
      success: true,
      message: 'دسته‌بندی اکسسوری پلکسی با موفقیت ایجاد شد',
      category: newCategory
    });

  } catch (error) {
    console.error('Error creating accessory category:', error);
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
