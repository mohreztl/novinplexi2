import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { bodyId, to, args } = await req.json();

        if (!bodyId || !to || !Array.isArray(args)) {
            return NextResponse.json({ error: "پارامترهای نامعتبر" }, { status: 400 });
        }

        const smsResponse = await fetch(process.env.MELI_PAYAMAK_SHARED, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ bodyId, to, args }),
        });

        const smsRes = await smsResponse.json();
        return NextResponse.json({ success: true, response: smsRes });
    } catch (error) {
        console.error("خطای ارسال پیامک:", error);
        return NextResponse.json({ error: "خطای داخلی سرور" }, { status: 500 });
    }
}
