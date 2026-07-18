import { type NextRequest } from "next/server";

import { loadAgentPromptParts } from "@/lib/agent-content-markdown";
import { composeAgentPrompt } from "@/lib/copy-preamble";
import { resolveSiteUrlForRequest } from "@/lib/site-url";

export const dynamic = "force-dynamic";

function handleBootstrapPrompt(
  request: NextRequest,
  includeBody: boolean,
): Response {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return Response.json(
      { error: "Method not allowed" },
      { status: 405, headers: { Allow: "GET, HEAD" } },
    );
  }

  try {
    const siteOrigin = resolveSiteUrlForRequest(
      request.headers.get("host") ?? undefined,
    );
    const combined = composeAgentPrompt({
      parts: loadAgentPromptParts(),
      kind: "hero",
      siteOrigin,
    });

    return new Response(includeBody ? combined : null, {
      status: 200,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Cache-Control": "public, max-age=0, s-maxage=600",
        Vary: "Accept",
        "X-Robots-Tag": "noindex",
        "Content-Disposition": 'inline; filename="bootstrap-prompt.md"',
      },
    });
  } catch {
    return Response.json(
      { error: "Failed to build bootstrap prompt" },
      { status: 500 },
    );
  }
}

export function GET(request: NextRequest): Response {
  return handleBootstrapPrompt(request, true);
}

export function HEAD(request: NextRequest): Response {
  return handleBootstrapPrompt(request, false);
}
