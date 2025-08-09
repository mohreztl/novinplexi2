import dbConnect from "@/lib/db";
import { Product } from "@/models/Product";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await dbConnect();

    const foundProducts = await Product.find({})
      .sort({ createdAt: -1 });

    return NextResponse.json(foundProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'خطا در دریافت محصولات' },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();

    const {
      title,
      slug,
      description,
      basePrice,
      images,
      category,
      variants,
      tags,
      featured,
      published
    } = body;

    const newProduct = await Product.create({
      title,
      slug,
      description,
      basePrice,
      images,
      category,
      variants,
      tags,
      featured,
      published
    });

    const savedProduct = await newProduct.save();

    return NextResponse.json({
      message: "Product created successfully",
      success: true,
      product: savedProduct,
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { 
        error: 'خطا در ایجاد محصول',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
