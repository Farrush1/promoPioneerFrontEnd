/* eslint-disable react-hooks/rules-of-hooks */
import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";

// const secretKey = "rahasiasekali";

export function middleware(request) {
  const role = request.cookies.get("role")?.value;
  if (role == "ADMIN" && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: [
    "/cart/:path*",
    "/checkout/:path*",
    "/payment/:path*",
    "/dashboard/:path*",
    "/order/:path*",
    "/user/:path*",
  ],
  runtime: "nodejs",
};
