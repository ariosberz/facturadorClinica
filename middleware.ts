import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  res.headers.set("x-middleware-cache", "no-cache"); // Disables middleware caching
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) {
    return res;
  } else {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}
export const config = {
  matcher: "/dashboard/:path*",
};
