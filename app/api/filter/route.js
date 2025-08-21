// pages/api/filters.js

import connect from "@/utils/config/dbConnection";
import Category from '@/models/Category';


export async function GET(req) {
  try {
   await connect(); // اتصال به دیتابیس
    
    // دریافت دسته‌بندی‌ها و برندها از دیتابیس
    const categories = await Category.find({});
  
    
    // بازگشت داده‌ها به کلاینت
    return new Response(
      JSON.stringify({ categories}),
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
