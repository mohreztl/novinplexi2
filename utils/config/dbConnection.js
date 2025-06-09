import { mongoose } from 'mongoose';

// اتصال به دیتابیس (با کش کردن اتصال)
let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null };

async function dbConnect() {
  if (cached.conn) return cached.conn;
  cached.conn = await mongoose.connect(process.env.MONGO_URI);
  return cached.conn;
}

export async function GET() {
  try {
    await connectToDB(); // اتصال به دیتابیس
    // بقیه کدها (مثل دریافت دیتا از دیتابیس)
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "خطای سرور" }), { status: 500 });
  }
}
export default dbConnect;