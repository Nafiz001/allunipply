import { NextRequest, NextResponse } from "next/server";

const AUTH_COOKIE = "allunipply_auth";

const isProtectedRoute = (pathname: string) => {
  return (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/national-university/public-university") ||
    pathname === "/national-university/start-applying"
  );
};

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (!isProtectedRoute(pathname)) {
    return NextResponse.next();
  }

  const isAuthenticated = request.cookies.get(AUTH_COOKIE)?.value === "1";

  if (isAuthenticated) {
    return NextResponse.next();
  }

  const signInUrl = new URL("/sign-in", request.url);
  signInUrl.searchParams.set("next", `${pathname}${search}`);
  return NextResponse.redirect(signInUrl);
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/national-university/public-university/:path*",
    "/national-university/start-applying",
  ],
};

