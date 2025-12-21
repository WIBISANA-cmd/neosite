import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, verifyAuthToken } from "./lib/auth";

const protectedPaths = ["/admin"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const isProtected = protectedPaths.some((p) => pathname.startsWith(p));
  const isLogin = pathname.startsWith("/login");

  const isAuthed = token ? (await verifyAuthToken(token)) !== null : false;

  if (isProtected && !isAuthed) {
    const url = new URL("/login", req.url);
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  if (isLogin && isAuthed) {
    const url = new URL("/admin", req.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
