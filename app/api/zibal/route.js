import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { amount, callbackUrl, description, mobile } = await req.json();

  try {
    const response = await axios.post('https://api.zibal.ir/v1/request', {
      // merchant: process.env.ZIBAL_API_KEY, // کلید API از .env
      merchant: "zibal",
      amount, // مبلغ پرداخت (به ریال)
      callbackUrl, // آدرس بازگشت
      description, // توضیحات پرداخت
      // mobile, // شماره موبایل اختیاری
    });

    if (response.data.result === 100) {
      return NextResponse.json({
        trackId: response.data.trackId,
        paymentUrl: `https://gateway.zibal.ir/start/${response.data.trackId}`,
      });
    } else {
      return NextResponse.json({ message: response.data.message }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'مشکلی در ارتباط با درگاه رخ داد.' }, { status: 500 });
  }
}
