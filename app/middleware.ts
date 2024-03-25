import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const middleware = withAuth(
  function middleware(request) {
    const token = request.nextauth?.token;
    const pathname = request.nextUrl?.pathname;
    if (pathname.indexOf('auth') > -1) return NextResponse.next()
    if (token) return NextResponse.redirect(new URL("/auth/signin"));
    else return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => true,
    },
  }
);
export default middleware;
