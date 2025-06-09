export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import connect from "@/utils/config/dbConnection";
import Address from "@/utils/models/Address";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    await connect();
    const session = await getServerSession(authOptions);

    if (!session || !session.user?._id) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const addresses = await Address.find({ userId: session.user._id });

    return NextResponse.json({ success: true, addresses });
  } catch (error) {
    console.error("Error fetching addresses:", error);
    return NextResponse.json({ success: false, message: "Server error", error: error.message }, { status: 500 });
  }
}
