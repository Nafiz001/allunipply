import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const isProtectedRoute = (pathname: string) => {
  return (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/scholarship") ||
    pathname.startsWith("/national-university/public-university") ||
    pathname === "/national-university/start-applying"
  );
};

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (!isProtectedRoute(pathname)) {
    return NextResponse.next();
  }

  const session = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  });

  if (session) {
    return NextResponse.next();
  }

  const signInUrl = new URL("/sign-in", request.url);
  signInUrl.searchParams.set("next", `${pathname}${search}`);

  return NextResponse.redirect(signInUrl);
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/scholarship",
    "/scholarship/:path*",
    "/national-university/public-university/:path*",
    "/national-university/start-applying",
  ],
};
