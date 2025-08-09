import { NextResponse } from "next/server";
import Blog from "@/models/Blog";
import { connectToDB } from "@/lib/db";

export async function GET() {
  try {
    await connectToDB();
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return NextResponse.json(blogs);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "خطا در دریافت وبلاگ‌ها" }, { status: 500 });
  }
}