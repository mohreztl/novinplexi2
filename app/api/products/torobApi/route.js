// src/app/api/products/route.js
import { NextResponse } from 'next/server';
import connect from "@/utils/config/dbConnection";
import { Product } from "@/utils/models/Product";

export async function GET(req) {
  try {
    await connect();

    const { searchParams } = new URL(req.url);
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
  page_url: `https://nikodecor.com/product/${product.slug}`
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

