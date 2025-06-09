// http://localhost:3000/api/blog/someid

import connect from "@/utils/config/dbConnection";
import { NextResponse } from "next/server";

import Blog from "@/utils/models/Blog";

export async function PUT(req, res) {
  await connect();

  const id = res.params.id;
  

  try {
    const body = await req.json();
    const blog = await Blog.findById(id).populate("authorId");

    if (blog?.authorId?._id.toString() !== decodedToken._id.toString()) {
      return NextResponse.json(
        { msg: "Only author can update his/her blog" },
        { status: 403 }
      );
    }

    const updateBlog = await Blog.findByIdAndUpdate(
      id,
      { $set: { ...body } },
      { new: true }
    );

    return NextResponse.json(updateBlog, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "PUT error" }, {status: 500});
  }
}

export async function GET(req, res) {
  await connect();

  const id = res.params.id;

  try {
    const blog = await Blog.findById(id)
      .populate({
        path: "authorId",
        select: "name",
      })
      .populate({
        path: "comments.user",
        select: "name",
      });

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "GET error" },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(req, res) {
    await connect();
  
    const id = res.params.id;
   
  
    try {
      const blog = await Blog.findById(id).populate("authorId");
  
      // if (blog?.authorId?._id.toString() !== decodedToken._id.toString()) {
      //   return NextResponse.json(
      //     { msg: "Only author can delete his/her blog" },
      //     { status: 403 }
      //   );
      // }
  
      await Blog.findByIdAndDelete(id)
  
      return NextResponse.json({msg: "Successfully deleted blog"}, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: "Delete error" }, {status: 500});
    }
  }
