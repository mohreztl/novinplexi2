import { NextResponse } from "next/server";
import dbConnect from "@/utils/config/dbConnection";
import Order from "@/models/Order";
import Product from "@/models/Product";
export const dynamic = 'force-dynamic';
export async function GET(req) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 5;

  const phoneNumber = searchParams.get("phoneNumber");

  if (!phoneNumber) {
    return NextResponse.json(
      {
        error: "Failed to get phoneNumber, phoneNumber is required",
      },
      { status: 400 }
    );
  }

  const skip = (page - 1) * limit;

  try {
    const orders = await Order.find({ phoneNumber })
      .populate({
        path: "cartProducts.product",
        model: Product,
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalOrders = await Order.countDocuments({ phoneNumber });
    const hasMore = totalOrders > skip + orders.length;

    return NextResponse.json({
      orders,
      hasMore,
      totalOrders,
    });
  } catch (error) {
    console.log("Error fetching orders:", error);
    return NextResponse.json(
      {
        error: "Internal server error at api/order",
      },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  await dbConnect();

  try {
    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json(
        {
          error: "order id is required",
        },
        { status: 400 }
      );
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        status: "delivered",
      },
      { new: true }
    ).populate({
      path: "cartProducts",
      model: Product,
    });

    if (!updatedOrder) {
      return NextResponse.json(
        {
          error: "order not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Order status updated to delivered",
      order: updatedOrder,
    });
  } catch (error) {
    console.log("Error fetching orders:", error);
    return NextResponse.json(
      {
        error: "Internal server error at api/order",
      },
      { status: 500 }
    );
  }
}
