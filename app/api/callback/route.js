import { NextResponse } from "next/server";
import connect from "@/utils/config/dbConnection";
import Order from "@/models/Order";

export async function POST(req) {
  try {
    await connect();
    const {success, orderId, trackId } = await req.json();

    if (!orderId || !trackId) {
      return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (order.status==="PAID") {
      return NextResponse.json({ message: "Order already paid" }, { status: 200 });
    }
    if (success == 0 ) {
      order.status ="FAILED";
    }
    if (success == 1 ) {
      order.status ="PAID";
      
      await order.save();

      const { phoneNumber, name, orderDate } = order;
      const jDate = `${orderDate.month}/${orderDate.day}`;
      const jTime = `${orderDate.hour}:${orderDate.minute}`;

      // ارسال پیامک بعد از پرداخت موفق
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/sms`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bodyId: 305194,
          to: phoneNumber,
          args: [name, trackId, jDate, jTime],
        }),
      });

      return NextResponse.json({ success: true, message: "Payment confirmed and SMS sent" });
    } else {
      order.status ="FAILED";
      return NextResponse.json({ error: "Payment failed" }, { status: 400 });
    }
  } catch (error) {
    console.error("Payment callback error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
