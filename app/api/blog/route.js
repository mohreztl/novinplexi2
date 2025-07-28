import connect from "@/utils/config/dbConnection";
import { NextResponse } from "next/server";
import Blog from "@/utils/models/Blog";
import { withAdminAuth } from "@/lib/authMiddleware";
import { BlogSchema } from "@/utils/validations/blogSchema";
import { errorHandler, ApiError } from "@/lib/errorHandler";

export const POST = withAdminAuth(async (req, session) => {
  try {
    await connect();
    
    const body = await req.json();
    const result = BlogSchema.safeParse(body);
    
    if (!result.success) {
      throw new ApiError("اطلاعات نامعتبر", 400, result.error.format());
    }
    
    const blogData = result.data;
    const newBlog = await Blog.create({
      ...blogData,
      authorId: session.user._id
    });

    return NextResponse.json({
      message: "مقاله با موفقیت ایجاد شد",
      blog: newBlog
    }, { status: 201 });

  } catch (error) {
    return errorHandler(error);
  }
});

export const GET = async (req) => {
  try {
    await connect();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    const query = {};
    if (category) {
      query.category = category;
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    const skip = (page - 1) * limit;
    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("authorId", "name profileImage");

    const total = await Blog.countDocuments(query);

    return NextResponse.json({
      blogs,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total
    });

  } catch (error) {
    return errorHandler(error);
  }
};
