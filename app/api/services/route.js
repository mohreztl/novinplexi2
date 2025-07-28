import { connectToDB } from "@/lib/db";
import Service from "@/models/Service";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await connectToDB();
    
    const services = await Service
      .find({ isPublished: true })
      .populate("category", "name slug")
      .lean();
    
    return NextResponse.json({ services });
  } catch (error) {
    console.error("Error in /api/services:", error);
    return NextResponse.json(
      { error: "خطا در دریافت خدمات" },
      { status: 500 }
    );
  }
};
