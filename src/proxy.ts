import { NextResponse, type NextRequest } from "next/server";

import { resolveMarkdownNegotiationPath } from "./lib/markdown-sections";
import { toSiteRelativePath } from "./lib/site-paths";
import { resolveSiteBaseUrl, resolveSiteUrl } from "./lib/site-url";

/**
 * Content negotiation: when a client sends Accept: text/markdown or
 * Accept: text/plain, transparently rewrite to /api/markdown so it gets
 * markdown instead of HTML.
 */
export function proxy(request: NextRequest): NextResponse | undefined {
  const url = request.nextUrl.clone();
  const baseUrl = resolveSiteBaseUrl();
  if (url.pathname === "/" && baseUrl !== "/") {
    const redirectUrl = new URL(resolveSiteUrl());
    redirectUrl.search = url.search;
    return NextResponse.redirect(redirectUrl, 307);
  }

  const sitePath = toSiteRelativePath(url.pathname, baseUrl);
  if (sitePath !== url.pathname && sitePath.startsWith("/api/")) {
    const dest = new URL(url);
    dest.pathname = sitePath;
    return NextResponse.rewrite(dest);
  }

  const accept = request.headers.get("accept") ?? "";
  if (!accept.includes("text/markdown") && !accept.includes("text/plain"))
    return undefined;

  const path = sitePath;
  const negotiated = resolveMarkdownNegotiationPath(path);
  if (!negotiated) return undefined;

  const dest = new URL(negotiated.artifactPath, url.origin);
  return NextResponse.rewrite(dest);
}

export default proxy;

export const config = {
  matcher: ["/:path*"],
};
