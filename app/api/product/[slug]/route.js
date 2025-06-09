import { NextResponse } from "next/server";
import connect from "@/utils/config/dbConnection";
import { Product } from "@/utils/models/Product";

export async function GET(req, { params }) {
  await connect();
  const { slug } = params;

  try {
    const product = await Product.findOne({slug});
    if (!product) {
      return NextResponse.json({ error: "product not found" }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: "errot fetching product" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  await connect();
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
    return NextResponse.json(
      { error: "errot updating product" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  await connect();
  const { slug } = params;

  try {
    const deletedProduct = await Product.findOneAndDelete(slug);

    if (!deletedProduct) {
      return NextResponse.json({ error: "product not found" }, { status: 404 });
    }

    return NextResponse.json({message: "product deleted sucessfully"});
  } catch (error) {
    return NextResponse.json(
      { error: "errot deleting product" },
      { status: 500 }
    );
  }
}
