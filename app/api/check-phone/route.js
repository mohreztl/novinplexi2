import { NextResponse } from "next/server";

import User from "@/utils/models/User";
import Verify from "@/utils/models/Verify";
import axios from "axios";
import connect from "@/utils/config/dbConnection";

export async function POST(req) {
  try {
    const { phoneNumber } = await req.json();
    await connect();
    // اعتبارسنجی شماره تلفن
    if (!phoneNumber || !/^\d{10,14}$/.test(phoneNumber)) {
      return new Response(
        JSON.stringify({ message: "شماره تلفن نامعتبر است." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // جستجوی کاربر در دیتابیس
    const user = await User.findOne({ phoneNumber });

    // ارسال کد تأیید با ملی پیامک
    let code;
    try {
      const res = await axios.post(`${process.env.MELI_PAYAMAK}`,
        { to: phoneNumber }
      );

      code = res.data.code; // فرض کنید API کد را در `data.code` برمی‌گرداند
    } catch (error) {
      console.error("خطا در ارسال پیامک:", error.message);
      return new Response(
        JSON.stringify({
          message: "خطا در ارسال پیامک. لطفاً دوباره تلاش کنید.",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // ذخیره یا به‌روزرسانی کد در مجموعه verificationCodes
    await Verify.updateOne(
      { phoneNumber },
      { $set: { code, createdAt: new Date() } },
      { upsert: true } // اگر وجود نداشت، ایجاد کند
    );

    // پاسخ مناسب براساس وضعیت کاربر
    if (user) {
 
      return NextResponse.json(
        { step: "verify", message: "کد تایید ارسال شد." },
        { status: 200 }
      );
    }
  
    return NextResponse.json(
      { step: "signup", message: "کاربر یافت نشد، لطفاً ثبت‌نام کنید." },
      { status: 200 }
    );
  } catch (error) {
    console.error("خطای سرور:", error.message);
    return new Response(JSON.stringify({ message: "خطای سرور رخ داده است." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
