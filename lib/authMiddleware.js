import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "./auth";

export async function authenticate(req) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    throw new Error('لطفا ابتدا وارد شوید');
  }
  
  return session;
}

export async function authenticateAdmin(req) {
  const session = await authenticate(req);
  
  if (!session.user?.admin) {
    throw new Error('دسترسی غیرمجاز');
  }
  
  return session;
}

export function withAuth(handler) {
  return async function(req) {
    try {
      const session = await authenticate(req);
      return handler(req, session);
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
  }
}

export function withAdminAuth(handler) {
  return async function(req) {
    try {
      const session = await authenticateAdmin(req);
      return handler(req, session);
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
  }
}
