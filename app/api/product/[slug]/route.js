import { NextResponse } from "next/server";
import dbConnect from "@/utils/config/dbConnection";
import Product from "@/models/Product";

export async function GET(req, { params }) {
  await dbConnect();
  const { slug } = params;

  try {
    // ابتدا بر اساس slug جستجو کنیم
    let product = await Product.findOne({ slug });
    
    // اگر پیدا نشد، ممکن است ID باشد
    if (!product && slug.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(slug);
    }
    
    if (!product) {
      return NextResponse.json({ error: "product not found" }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "error fetching product" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  await dbConnect();
  const { slug } = params;
  const body = await req.json();

  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { slug }, // باید داخل یک شیء باشد
      body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return NextResponse.json({ error: "product not found" }, { status: 404 });
    }

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "error updating product" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  await dbConnect();
  const { slug } = params;

  try {
    const deletedProduct = await Product.findOneAndDelete(slug);

    if (!deletedProduct) {
      return NextResponse.json({ error: "product not found" }, { status: 404 });
    }

    return NextResponse.json({message: "product deleted sucessfully"});
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "error deleting product" },
      { status: 500 }
    );
  }
}
