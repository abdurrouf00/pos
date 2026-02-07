import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("hh_token")?.value || "";
  const role = request.cookies.get("role")?.value || "";

  const url = request.nextUrl.clone();
  const authPages = [
    "/auth/login",
    "/auth/register",
    "/auth/forgot-password",
    "/auth/reset-password",
  ];

  const isAuthPage = authPages.includes(url.pathname);

  // If no token and trying to access protected route, redirect to login
  if (!token && !isAuthPage) {
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  // If token exists and trying to access auth pages, redirect to dashboard or organization modules
  if (token && isAuthPage) {
    // If role exists, we could try to redirect to a role-specific page, 
    // but the most reliable landing page is /organization/modules
    url.pathname = "/organization/modules";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/auth/:path*",
    "/organization/:path*",
    "/dashboard/:path*",
    "/:role(admin|hr|employee)/:path*",
  ],
};
