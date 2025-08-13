import { NextResponse } from "next/server";
import connect from "@/utils/config/dbConnection";
import Product from "@/models/Product";
import Category from "@/utils/models/Category";

export async function GET(req, { params }) {
  try {
    await connect();

    const category = await Category.findOne({ slug: params.slug });
    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }
const title=category.title
    const products = await Product.find({ categories: category._id }).limit(12); // صفحه اول
    const total = await Product.countDocuments({ categories: category._id });

    return NextResponse.json({ products, total,title });
  } catch (error) {
    console.error("Category products API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
