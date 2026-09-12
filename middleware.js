import { NextResponse } from "next/server";

export function middleware(request) {
  const isAuthenticated = request.cookies.get("olloberdi-admin-auth")?.value === "true";

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
