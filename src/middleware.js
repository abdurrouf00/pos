import { NextResponse } from 'next/server';

export function middleware(request) {

  const token = request.cookies.get("hh_token")?.value || "";
  const role = request.cookies.get("user_data.role")?.value || "";
  const url = request.nextUrl.clone();
  const authPages = [
    "/auth/login",
    "/auth/register",
    "/auth/forgot-password",
    "/auth/reset-password",
  ];



  // If no token and trying to access protected route, redirect to login
  if (!token && !authPages.includes(url.pathname)) {
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  // If token exists and trying to access auth pages, redirect to dashboard
  if (token && authPages.includes(url.pathname)) {
    // url.pathname = "/dashboard";
    url.pathname = `/${role}`;
    return NextResponse.redirect(url);
  }

  // if(url.pathname === '/'){
  //     return NextResponse.redirect(`${origin}`);
  // }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/auth/:path*",
    "/organization/:path*",
    "/dashboard/:path*",
    "/:role(admin|hr|employee)/:path*",
    // "/dashboard/:path*",
  ],
};
