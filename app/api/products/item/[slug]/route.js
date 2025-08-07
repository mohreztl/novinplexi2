import dbConnect from "@/utils/config/dbConnection";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req, { params }) {
  try {
    await dbConnect();
    
    const { slug } = params;
    
    // جستجو بر اساس slug یا _id
    let product;
    
    // اول سعی می‌کنیم با slug پیدا کنیم
    product = await Product.findOne({ slug: slug });
    
    // اگر پیدا نشد، سعی می‌کنیم با _id پیدا کنیم
    if (!product) {
      // بررسی می‌کنیم که آیا slug یک ObjectId معتبر است
      if (slug.match(/^[0-9a-fA-F]{24}$/)) {
        product = await Product.findById(slug);
      }
    }
    
    // اگر هنوز پیدا نشد، سعی می‌کنیم با title پیدا کنیم
    if (!product) {
      // دکد کردن URL encoding برای نام فارسی
      const decodedSlug = decodeURIComponent(slug);
      product = await Product.findOne({ title: decodedSlug });
    }

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
    
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
