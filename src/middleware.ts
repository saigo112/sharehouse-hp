import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/sharehouse/entry") {
    return NextResponse.redirect(new URL("/sharehouse#visit", request.url));
  }

  if (request.nextUrl.pathname === "/schedule/manage") {
    return NextResponse.next();
  }

  return new NextResponse("Not Found", {
    status: 404,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

export const config = {
  matcher: ["/programs/:path*", "/schedule/:path*", "/sharehouse/entry"],
};
