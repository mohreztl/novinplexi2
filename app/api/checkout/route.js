import { NextResponse } from "next/server";
import connect from "@/utils/config/dbConnection";
import Order from "@/utils/models/Order";
import Product from "@/models/Product";
import moment from "moment-jalaali";
import { z } from "zod";

// ✅ Zod schema for validation
const OrderSchema = z.object({
  name: z.string().min(1),
  phoneNumber: z.string().min(10),
  city: z.string().min(1),
  postalCode: z.string().min(5),
  streetAddress: z.string(),
  country: z.string(),
  cartItems: z.array(z.object({
    id: z.string(),
    quantity: z.number().int().positive(),
  })),
  user: z.string().optional(),
  shippingCost: z.number().nonnegative().default(0),
  shippingMethod: z.string().optional(),
});

export async function POST(req) {
  try {
    await connect();
    const json = await req.json();

    const parsed = OrderSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", details: parsed.error.format() }, { status: 400 });
    }

    const {
      name, phoneNumber, city, postalCode, streetAddress,
      country, cartItems, user, shippingCost, shippingMethod
    } = parsed.data;

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const productIds = [...new Set(cartItems.map(item => item.id))];
    const productsInfos = await Product.find({ _id: { $in: productIds } });

    if (!productsInfos || productsInfos.length === 0) {
      return NextResponse.json({ error: "No valid products found" }, { status: 400 });
    }

    let total = 0;
    let orderCartProducts = [];

    for (const cartItem of cartItems) {
      const product = productsInfos.find(p => p._id.toString() === cartItem.id);
      if (!product) continue;

      const quantity = cartItem.quantity;
      total += product.price * quantity;
      orderCartProducts.push({
        product: product._id,
        quantity,
        price: product.price,
      });
    }

    if (orderCartProducts.length === 0) {
      return NextResponse.json({ error: "No valid cart items found" }, { status: 400 });
    }

    const orderDate = {
      year: moment().jYear(),
      month: moment().jMonth() + 1,
      day: moment().jDate(),
      hour: moment().hour(),
      minute: moment().minute(),
    };

    const orderDoc = await Order.create({
      name,
      phoneNumber,
      city,
      postalCode,
      streetAddress,
      country,
      paid: false,
      cartProducts: orderCartProducts,
      total: total + shippingCost,
      subTotal: total,
      shippingCost,
      user,
      orderDate,
      shippingMethod,
    });

    // ✅ Zibal Payment Request
    const callbackUrl = `${process.env.NEXT_PUBLIC_URL}/checkout/verify?orderId=${orderDoc._id}`;
    const zibalRequestBody = {
      merchant: process.env.ZIBAL_MERCHANT_KEY,
      amount: (total + shippingCost) * 10, // Convert to Toman
      callbackUrl,
      description: `Order ID: ${orderDoc._id}`,
      metadata: {
        orderId: orderDoc._id.toString(),
        name,
        phone: phoneNumber,
      },
    };

    const zibalRes = await fetch("https://api.zibal.ir/v1/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(zibalRequestBody),
    });

    const zibalData = await zibalRes.json();
    if (zibalData.result !== 100) {
      throw new Error(`Zibal error: ${zibalData.result} - ${zibalData.message}`);
    }

    const paymentUrl = `https://gateway.zibal.ir/start/${zibalData.trackId}`;
    return NextResponse.json({ url: paymentUrl }, { status: 200 });

  } catch (error) {
    console.error("Checkout Error:", error);
    return NextResponse.json({
      error: "Internal Server Error",
      details: error.message,
    }, { status: 500 });
  }
}
