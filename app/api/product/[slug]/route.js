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
  try {
  await dbConnect();

    const { slug } = params;
    const body = await req.json();
    
    console.log('PUT /api/product/[slug] - Slug:', slug);
    console.log('PUT /api/product/[slug] - Received body:', JSON.stringify(body, null, 2));

    // پردازش variants
    if (body.variants) {
      console.log('PUT /api/product/[slug] - Variants before processing:', body.variants);
      console.log('PUT /api/product/[slug] - Variants type:', typeof body.variants);
      
      // بررسی اینکه آیا variants دارای محتوای معتبر است
      const hasValidVariants = body.variants.thicknesses?.length > 0 || 
                              body.variants.sizes?.length > 0 || 
                              body.variants.colors?.length > 0;
      
      if (!hasValidVariants) {
        body.variants = { thicknesses: [], sizes: [], colors: [] };
      } else {
        // تبدیل extraPrice از string به number
        ['thicknesses', 'sizes', 'colors'].forEach(type => {
          if (body.variants[type]) {
            body.variants[type] = body.variants[type].map(item => ({
              ...item,
              extraPrice: Number(item.extraPrice) || 0
            }));
          }
        });
      }
      
      console.log('PUT /api/product/[slug] - Variants after processing:', body.variants);
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { slug },
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
    // ابتدا بر اساس slug جستجو کنیم
    let deletedProduct = await Product.findOneAndDelete({ slug });
    
    // اگر پیدا نشد، ممکن است ID باشد
    if (!deletedProduct && slug.match(/^[0-9a-fA-F]{24}$/)) {
      deletedProduct = await Product.findByIdAndDelete(slug);
    }

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
