import dbConnect from "@/utils/config/dbConnection";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await dbConnect();
  const searchTerm = String(params?.search || "").trim();

  if (!searchTerm) {
    return NextResponse.json([], { status: 200 });
  }

  // escape user input for regex
  const escaped = searchTerm.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  const regex = new RegExp(escaped, "i");

  // search across multiple meaningful fields
  const foundProducts = await Product.find({
    $or: [
      { title: { $regex: regex } },
      { name: { $regex: regex } },
      { description: { $regex: regex } },
      { fullDescription: { $regex: regex } },
      { tags: { $in: [new RegExp(escaped, "i")] } },
      { brand: { $regex: regex } },
      { category: { $regex: regex } },
    ],
  })
    .select("title name slug images basePrice discount stock category averageRating")
    .sort({ createdAt: -1 })
    .limit(200);

  return NextResponse.json(foundProducts || []);
}
