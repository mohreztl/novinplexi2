// http://localhost:3000/api/blog

import connect from "@/utils/config/dbConnection";
import { NextResponse } from "next/server";

import Blog from "@/utils/models/Blog";

export async function POST(req) {
  await connect();

  // const accessToken = req.headers.get("authorization");
  // const token = accessToken.split(" ")[1];

  // const decodedToken = verifyJwtToken(token);

  // if (!accessToken || !decodedToken) {
  //   return new Response(
  //     JSON.stringify({ error: "unauthorized (wrong or expired token" }),
  //     { status: 403 }
  //   );
  // }

  try {
    const body = await req.json();
    const  {
      title,
      description, // مقدار ویرایشگر را ارسال کنید
      excerpt,
      quote,
      category,
      images, // مقدار تصویر را ارسال کنید
      authorId,
    }=body
    const newBlog = await Blog.create({
      title,
      description, // مقدار ویرایشگر را ارسال کنید
      excerpt,
      quote,
      category,
      images, // مقدار تصویر را ارسال کنید
      authorId,
    });
    const savedBlog = await newBlog.save();
    return NextResponse.json({
      message: "Product created successfully",
      success: true,
      savedBlog,
    });
  } catch (error) {
    return NextResponse.json({ message: "POST error (create blog)" });
  }
}

export async function GET(req) {
  await connect();
  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get("limit"));
  try {
    const blogs = await Blog.find({})
      .populate({
        path: "authorId",
        select: "name",
        
      //   match: { active: true },
      })
      .sort({ createdAt: -1 }).limit(limit);;

      return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json(
      { message: "GET error" },
      {
        status: 500,
      }
    );
  }
}
