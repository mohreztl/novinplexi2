import { NextResponse } from 'next/server';
import connect from "@/utils/config/dbConnection";
import Brand from '@/utils/models/Brand';

export async function GET() {
  await connect();
  try {
    const brands = await Brand.find();
    return NextResponse.json({ success: true, data: brands });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  await connect();
  try {
    const { name} = await req.json();
    const brand = new Brand({ name });
    await brand.save();
    return NextResponse.json({ success: true, data: brand }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
