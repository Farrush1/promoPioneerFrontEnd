import { NextResponse } from "next/server";

export function middleware(req) {
  const loginPath = ["/login", "/register"];
  if (loginPath.includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  } else {
    const accessToken = req.cookies.get("access_token");
    if (accessToken) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
}

export const config = {
  matcher: ["/login", "/register", "/api/:function*"],
};
