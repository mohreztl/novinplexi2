// app/api/address/save/route.js
import { NextResponse } from "next/server";
import connect from "@/utils/config/dbConnection";
import Address from "@/models/Address";
import { getServerSession } from "next-auth"; 
import { authOptions } from "@/lib/auth";
export async function POST(req) {
  await connect();
  const session = await getServerSession(authOptions);


  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { province, city, street, postalCode } = await req.json();

  try {
    const newAddress = await Address.create({
      userId: session.user._id,
      province,
      city,
      street,
      postalCode,
    });

    return NextResponse.json({ success: true, address: newAddress });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
