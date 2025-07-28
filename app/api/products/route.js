import connect from "@/utils/config/dbConnection";
import { Product } from "@/utils/models/Product";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic';

export async function GET(req, res) {
  await connect();

  const foundProducts = await Product.find({})
    .populate("user")
    .sort({ createdAt: -1 });

  return NextResponse.json(foundProducts);
}

export async function POST(req, res) {
  await connect();

  const body = await req.json();

  const {
    name,
    description,
    fullDescription,
    slug,
    categories,
    images,
    brand,
    material,
    originalPrice,
    washable,
    price,
    condition,
    user,
    place,
    weight,
    color,
    strong,
    country,
    antistatic,
    other,
  } = body;

  const newProduct = await Product.create({
    name,
    fullDescription,
    description,
    slug,
    categories,
    images,
    brand,
    material,
    originalPrice,
    washable,
    price,
    condition,
    user,
    place,
    weight,
    color,
    strong,
    country,
    antistatic,
    other,
  });



  const savedProduct = await newProduct.save();

  return NextResponse.json({
    message: "Product created successfully",
    success: true,
    savedProduct,
  });
}
