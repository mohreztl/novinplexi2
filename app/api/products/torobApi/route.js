// src/app/api/products/route.js
import { NextResponse } from 'next/server';
import { connectToDB } from "@/lib/db";
import Product from "@/models/Product";

export async function GET(request) {
  try {
    await connectToDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 100;

    const limitNumber = Number(limit); // Ensure limit is a number
    const skip = (page - 1) * limitNumber;

    const products = await Product.find({})
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limitNumber)
      .lean(); // Returns plain JavaScript objects

    const totalProducts = await Product.countDocuments({});
    const maxPages = Math.ceil(totalProducts / limitNumber);
const allProducts=products.map(product => ({
  product_id:product._id,

  price:product.price ? product.price : product.originalPrice,
  availability: 'instock',
  old_price: product.originalPrice,
  page_url: `https://novinplexi.ir/product/${product.slug}`
}));
return NextResponse.json({
  success: true,
  data: allProducts,
  count: totalProducts,
  max_pages: maxPages,
});
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ success: false, message: 'Failed to fetch products', error: error.message }, { status: 500 });
  }
}

// Add dynamic export to handle query parameters
export const dynamic = 'force-dynamic';

