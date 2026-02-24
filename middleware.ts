import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // 1. Get the token manually (this prevents the "wrapper" magic that causes loops)
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  
  const isAuth = !!token;
  const { pathname } = req.nextUrl;

  // -----------------------------------------------------------------------------
  // RULE 1: LOOP PREVENTION (The most important part)
  // If the user is trying to go to the Login Page...
  // -----------------------------------------------------------------------------
  if (pathname.startsWith("/dashboard/auth")) {
    if (isAuth) {
      // If they are ALREADY logged in, kick them into the dashboard
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    // If they are NOT logged in, let them stay on the login page.
    // Returning 'null' or 'next()' allows the page to render.
    return NextResponse.next();
  }

  // -----------------------------------------------------------------------------
  // RULE 2: GLOBAL DASHBOARD PROTECTION
  // If user is NOT logged in and trying to access ANY other dashboard page...
  // -----------------------------------------------------------------------------
  if (!isAuth) {
    // Redirect to the login page
    // We attach 'callbackUrl' so they go back to the page they wanted after login
    const url = new URL("/dashboard/auth", req.url);
    url.searchParams.set("callbackUrl", encodeURI(req.url));
    return NextResponse.redirect(url);
  }

  // -----------------------------------------------------------------------------
  // RULE 3: ADMIN PROTECTION (Role-Based Access)
  // -----------------------------------------------------------------------------
  if (pathname.startsWith("/dashboard/admin")) {
    if (token?.role !== "ADMIN") {
      // If user is not an Admin, kick them back to the main dashboard
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  // Allow all other requests to pass through
  return NextResponse.next();
}

// Applies this middleware ONLY to routes starting with /dashboard
export const config = {
  matcher: ["/dashboard/:path*", "/api/profile/:path*", "/api/blogs/:path*"],
};