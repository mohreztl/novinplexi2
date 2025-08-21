
import connect from "@/utils/config/dbConnection";
import Verify from "@/models/Verify"
export async function POST(req) {
  const { phoneNumber, verificationCode } = await req.json();

  if (!phoneNumber || !verificationCode) {
    return new Response(JSON.stringify({ message: 'شماره تلفن و کد تایید الزامی هستند.' }), {
      status: 400,
    });
  }

   await connect();
  
  // بررسی کد تایید
  const codeRecord = await Verify.findOne({
    phoneNumber,
    code: parseInt(verificationCode),
  });

  if (codeRecord) {
    // حذف کد تایید از دیتابیس (یکبار مصرف)
    await Verify.deleteOne({ _id: codeRecord._id });

    return new Response(JSON.stringify({ message: 'ورود موفقیت‌آمیز!' }), { status: 200 });
  }

  return new Response(JSON.stringify({ message: 'کد تایید اشتباه است.' }), { status: 400 });
}