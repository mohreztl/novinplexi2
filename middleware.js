import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const response = NextResponse.next();
  
  // Performance & Security Headers
  const headers = response.headers;
  
  // Security Headers
  headers.set('X-Frame-Options', 'DENY');
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('X-DNS-Prefetch-Control', 'on');
  headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  // Performance Headers
  if (req.nextUrl.pathname.startsWith('/_next/static/')) {
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }
  
  if (req.nextUrl.pathname.match(/\.(jpg|jpeg|png|gif|svg|webp|ico)$/)) {
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }
  
  if (req.nextUrl.pathname.match(/\.(css|js)$/)) {
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }
  
  // Compression
  if (req.headers.get('accept-encoding')?.includes('gzip')) {
    headers.set('Content-Encoding', 'gzip');
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // مسیرهایی که فقط ادمین‌ها اجازه دسترسی دارند
  const adminPaths = ["/api/admin", "/dashboard/admin", "/adminnovin"];
  
  if (adminPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    if (!token || !token.admin) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Redirect trailing slashes
  if (req.nextUrl.pathname.endsWith('/') && req.nextUrl.pathname !== '/') {
    const url = req.nextUrl.clone();
    url.pathname = url.pathname.slice(0, -1);
    return NextResponse.redirect(url, 301);
  }

  return response;
}

export const config = {
  matcher: [
    // Match all request paths except for the ones starting with:
    // - api (API routes)
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/api/admin/:path*',
    '/adminnovin/:path*'
  ]
};