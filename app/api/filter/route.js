// pages/api/filters.js

import connect from "@/utils/config/dbConnection";
import Category from '@/models/Category';
import Brand from '@/models/Brand';

export async function GET(req) {
  try {
   await connect(); // اتصال به دیتابیس
    
    // دریافت دسته‌بندی‌ها و برندها از دیتابیس
    const categories = await Category.find({});
    const brands = await Brand.find({});
    
    // بازگشت داده‌ها به کلاینت
    return new Response(
      JSON.stringify({ categories, brands }),
      { status: 200 }
    );
  } catch (error) {
    // در صورت بروز خطا
    return new Response(
      JSON.stringify({ error: 'Failed to fetch filters' }),
      { status: 500 }
    );
  }
}
