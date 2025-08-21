import connect from "@/utils/config/dbConnection";
import User from '@/models/User';

import {NextResponse, NextRequest} from "next/server";
import Verify from '@/models/Verify';
const DEFAULT_PROFILE_IMAGE =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

export async function POST(request){
    try {
        // اتصال به دیتابیس
        try {
            await connect(); // اطمینان از برقراری اتصال
        } catch (error) {
            console.error("Error connecting to database:", error);
            return NextResponse.json({ error: " خطا در اتصال به دیتابیس با پشتیبانی تماس بگیرید" }, { status: 500 });
        }
        // دریافت اطلاعات از درخواست
        const { name, phoneNumber, verificationCode } = await request.json();
        if (!name || !phoneNumber || !verificationCode) {
            return NextResponse.json({ error: "اطلاعات ورودی ناقص است." }, { status: 400 });
        }
        // بررسی وجود شماره تلفن در دیتابیس
        const user = await User.findOne({ phoneNumber });
        if (user) {
          return NextResponse.json(
            { error: "این شماره تلفن قبلاً ثبت شده است." },
            { status: 400 }
          );
        }
      
        // بررسی کد تأیید
        const codeRecord = await Verify.findOne({ phoneNumber, code: verificationCode });
        if (!codeRecord) {
          return NextResponse.json(
            { error: "کد تأیید نامعتبر است یا منقضی شده است." },
            { status: 400 }
          );
        }
      
        // حذف کد تأیید از دیتابیس (یکبار مصرف)
        await Verify.deleteOne({ _id: codeRecord._id });
      
        // ایجاد کاربر جدید
        const newUser = new User({
          name,
          phoneNumber,
          profileImage: DEFAULT_PROFILE_IMAGE,
        });
      
        try {
             const savedUser=await newUser.save();
             return NextResponse.json({
                message: "ثبت‌نام با موفقیت انجام شد.",
                success: true,
                user: savedUser,
              });
        } catch (error) {
              console.error("Error saving user:", error);
            return NextResponse.json({ error: "خطا در ذخیره اطلاعات کاربر." }, { status: 500 });
        }
      
        // پاسخ موفقیت
      
      
      } catch (error) {
        // هندل کردن خطاهای غیرمنتظره
    console.error("Error during user registration:", error);
        return NextResponse.json(
          { error: "خطای سرور رخ داده است." },
          { status: 500 }
        );
      }}
