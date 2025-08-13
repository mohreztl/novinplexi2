import { connectToDB } from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || 100);
    const sort = searchParams.get("sort") || "createdAt";
    const order = searchParams.get("order") || "desc";

    const sortObject = {};
    sortObject[sort] = order === "desc" ? -1 : 1;

    console.log('Fetching products...'); // Debug log

    const foundProducts = await Product.find({})
      .sort(sortObject)
      .limit(limit);

    console.log('Found products count:', foundProducts.length); // Debug log
    console.log('Sample product:', foundProducts[0]); // Debug log

    return NextResponse.json({
      products: foundProducts,
      total: foundProducts.length
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'خطا در دریافت محصولات', details: error.message },
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
      name,
      slug,
      description,
      fullDescription,
      basePrice,
      images,
      category,
      variants,
      tags,
      featured,
      published,
      stock,
      discountPrice,
      seo
    } = body;

    const newProduct = await Product.create({
      title,
      name: name || title, // اگر name ارسال نشد، از title استفاده کن
      slug,
      description,
      fullDescription,
      basePrice,
      images,
      category,
      variants,
      tags,
      featured,
      published,
      stock,
      discountPrice,
      seo
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