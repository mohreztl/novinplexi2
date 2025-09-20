import { NextResponse } from "next/server";
import connect from "@/utils/config/dbConnection";
import Product from "@/models/Product";
import Service from "@/models/Service";
import Category from "@/models/Category";

export async function GET(req, { params }) {
  try {
    await connect();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 12;
    const type = searchParams.get('type'); // 'product' یا 'service'

    const category = await Category.findOne({ slug: params.slug });
    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    let items = [];
    let total = 0;
    let itemsKey = '';

    if (type === 'service' || category.type === 'service') {
      // اگر service category باشد، services را دریافت کن
      const skip = (page - 1) * limit;
      items = await Service.find({ category: category._id })
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });
      total = await Service.countDocuments({ category: category._id });
      itemsKey = 'services';
    } else {
      // در غیر این صورت products را دریافت کن
      const skip = (page - 1) * limit;
      
      // جستجو هم با slug و هم با ObjectId برای سازگاری با داده‌های قدیمی
      const query = {
        $or: [
          { category: category.slug },
          { category: category._id.toString() }
        ]
      };
      
      items = await Product.find(query)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });
      total = await Product.countDocuments(query);
      itemsKey = 'products';
    }

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      ...category.toObject(), // کل اطلاعات category
      [itemsKey]: items,
      pagination: {
        total,
        totalPages,
        currentPage: page,
        limit,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error("Category API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
