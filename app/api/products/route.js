import { connectToDB } from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectToDB();

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

export async function POST(request) {
  try {
    await connectToDB();

    const body = await request.json();

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

    return NextResponse.json({
      message: "Product created successfully",
      success: true,
      product: newProduct,
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