// http://localhost:3000/api/blog/blogid/like

import connect from "@/utils/config/dbConnection";
import { NextResponse } from "next/server";
import { verifyJwtToken } from "@/lib/jwt";
import Blog from "@/models/Blog";


export async function PUT(req, { params }) {
  await connect();

  const { blogId } = params;
  const accessToken = req.headers.get("authorization");
  const token = accessToken.split(" ")[1];

  const decodedToken = verifyJwtToken(token);

  if (!accessToken || !decodedToken) {
    return NextResponse.json(
      { error: "unauthorized (wrong or expired token)" },
      { status: 403 }
    );
  }

  try {
    const blog = await Blog.findById(blogId);

    if(blog.likes.includes(decodedToken._id)) {
        blog.likes = blog.likes.filter(id => id.toString() !== decodedToken._id.toString());
    } else {
        blog.likes.push(decodedToken._id)
    }

    await blog.save();


    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "PUT error" }, {status: 500});
  }
}