import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXT_AUTH_SECRET });
  
  const { pathname } = req.nextUrl;
  console.log(pathname, token)

  if (pathname.includes("/auth") || token) {
    return NextResponse.next();
  }

  if (!token && pathname !== "/auth") {
    return NextResponse.redirect("/auth");
  }
}