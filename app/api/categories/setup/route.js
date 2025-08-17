import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Category from "@/models/Category";

export async function POST() {
  try {
    await connectToDB();

    const categoriesToCreate = [
      {
        name: 'اکسسوری‌های پلکسی',
        slug: 'plexi-accessories',
        type: 'product',
        description: 'مجموعه‌ای از بهترین اکسسوری‌های پلکسی گلاس شامل نگهدارنده‌ها، قفسه‌ها، جعبه‌ها و سایر لوازم جانبی که زیبایی و کاربرد فضای شما را افزایش می‌دهند. تمام محصولات با کیفیت بالا و طراحی مدرن.',
        image: '/hero1.jpg',
        isActive: true,
        order: 1
      },
      {
        name: 'خدمات طراحی و ساخت',
        slug: 'design-manufacturing',
        type: 'service',
        description: 'خدمات تخصصی طراحی و ساخت انواع محصولات پلکسی گلاس به سفارش شما. تیم متخصص ما آماده تولید هر نوع قطعه پلکسی بر اساس نیاز و طرح شما می‌باشد.',
        image: '/hero.webp',
        isActive: true,
        order: 1
      },
      {
        name: 'خدمات نصب و راه‌اندازی',
        slug: 'installation-setup',
        type: 'service',
        description: 'خدمات حرفه‌ای نصب و راه‌اندازی محصولات پلکسی در محل شما. تیم فنی ما با تجربه بالا آماده نصب دقیق و ایمن تمامی محصولات پلکسی می‌باشد.',
        image: '/featureQuality.png',
        isActive: true,
        order: 2
      }
    ];

    const results = [];
    
    for (const categoryData of categoriesToCreate) {
      // بررسی وجود دسته‌بندی
      const existingCategory = await Category.findOne({ slug: categoryData.slug });
      
      if (existingCategory) {
        results.push({
          category: categoryData.slug,
          status: 'exists',
          message: `دسته‌بندی ${categoryData.name} از قبل وجود دارد`
        });
      } else {
        // ایجاد دسته‌بندی جدید
        const newCategory = await Category.create(categoryData);
        results.push({
          category: categoryData.slug,
          status: 'created',
          message: `دسته‌بندی ${categoryData.name} با موفقیت ایجاد شد`,
          data: newCategory
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'عملیات تنظیم دسته‌بندی‌ها کامل شد',
      results
    });

  } catch (error) {
    console.error('Error setting up categories:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'خطا در تنظیم دسته‌بندی‌ها',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
