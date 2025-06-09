import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // مسیرهایی که فقط ادمین‌ها اجازه دسترسی دارند
  const adminPaths = ["/api/admin", "/dashboard/admin"];
  const protectedRoutes = ['/checkout', '/profile'];
  if (adminPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    if (!token || token.role !== "admin") {
      return NextResponse.redirect(new URL("/403", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/admin/:path*", "/adminnikoo/:path*"], // مسیرهایی که نیاز به بررسی دارند
};