import { NextResponse, type NextRequest } from "next/server";

import { resolveMarkdownNegotiationPath } from "./lib/markdown-sections";

/**
 * Content negotiation: when a client sends Accept: text/markdown or
 * Accept: text/plain, transparently rewrite to /api/markdown so it gets
 * markdown instead of HTML.
 */
export function proxy(request: NextRequest): NextResponse | undefined {
  const url = request.nextUrl.clone();
  const accept = request.headers.get("accept") ?? "";
  if (!accept.includes("text/markdown") && !accept.includes("text/plain"))
    return undefined;

  const path = url.pathname;
  const negotiated = resolveMarkdownNegotiationPath(path);
  if (!negotiated) return undefined;

  const dest = new URL(negotiated.artifactPath, url.origin);
  return NextResponse.rewrite(dest);
}

export default proxy;

export const config = {
  matcher: ["/:path*"],
};
