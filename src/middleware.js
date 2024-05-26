/* eslint-disable react-hooks/rules-of-hooks */
import { NextResponse } from "next/server";
import { isAuthenticated } from "./libs/jwtTokenControl";

export async function middleware(request) {
  const result = await isAuthenticated(request);

  if (!result) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    if (
      result.payload.role == "USER" &&
      request.nextUrl.pathname.startsWith("/dashboard")
    ) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  } catch (error) {
    console.error("Error checking user role:", error);
  }

  return NextResponse.next();
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
};
