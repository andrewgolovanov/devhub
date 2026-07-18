import { type NextRequest } from "next/server";

import { createLlmsTxtResponse } from "@/lib/llms-route";

export const dynamic = "force-dynamic";

export function GET(request: NextRequest): Response {
  return createLlmsTxtResponse({
    host: request.headers.get("host") ?? undefined,
    includeBody: true,
  });
}

export function HEAD(request: NextRequest): Response {
  return createLlmsTxtResponse({
    host: request.headers.get("host") ?? undefined,
    includeBody: false,
  });
}
