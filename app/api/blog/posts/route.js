import { connectToDB } from "@/lib/db";
import { NextResponse } from "next/server";
import Post from "@/models/Post";

export async function GET() {
  try {
    await connectToDB();

    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .limit(6)
      .lean();

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
