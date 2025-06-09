import connect from "@/utils/config/dbConnection";
import { NextResponse } from "next/server";

import Blog from "@/utils/models/Blog";
export async function GET() {
  try {
 await connect();
    const db = client.db(); // نام دیتابیس اگه خاصه بنویس مثلا db('mydb')
    const blogs = await db.collection("blogs").find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json(blogs);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "خطا در دریافت وبلاگ‌ها" }, { status: 500 });
  }
}