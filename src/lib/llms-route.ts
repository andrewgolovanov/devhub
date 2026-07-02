import { resolve } from "path";

import { generateLlmsTxt } from "./llms-txt";
import { resolveSiteUrlForRequest } from "./site-url";

function docsDirectory(): string {
  return resolve(process.cwd(), "src", "content", "docs");
}

export function createLlmsTxtResponse(input: {
  host?: string;
  includeBody: boolean;
}): Response {
  const siteUrl = resolveSiteUrlForRequest(input.host);
  const body = generateLlmsTxt(siteUrl, docsDirectory());

  return new Response(input.includeBody ? body : null, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=600",
      "Content-Disposition": 'inline; filename="llms.txt"',
    },
  });
}
