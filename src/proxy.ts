/**
 * PROXY (called "middleware" before Next.js 16)
 * ---------------------------------------------
 * This file lives at src/proxy.ts and runs BEFORE a request reaches any page or route.
 * Use it for redirects, rewrites, auth gates, and adding headers or cookies.
 *
 * Keep it fast and light. It runs on every request that matches `config.matcher`.
 */
import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. A simple "auth gate": /learn/proxy/admin needs the learn-admin cookie.
  if (pathname.startsWith("/learn/proxy/admin") && !request.cookies.has("learn-admin")) {
    const url = new URL("/learn/proxy", request.url);
    url.searchParams.set("denied", "1");
    return NextResponse.redirect(url);
  }

  // 2. Add a header to the REQUEST, so the page can read it with headers().
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-proxy-greeting", `Hello from proxy.ts! You asked for ${pathname}`);

  const response = NextResponse.next({ request: { headers: requestHeaders } });

  // 3. Add a header to the RESPONSE. Check the Network tab in DevTools.
  response.headers.set("x-lesson", "proxy");
  return response;
}

// Only run for the proxy lesson, so the rest of the app isn't affected.
export const config = {
  matcher: "/learn/proxy/:path*",
};
