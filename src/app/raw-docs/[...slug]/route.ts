import { type NextRequest } from "next/server";

import {
  markdownNotFoundResponse,
  markdownResponse,
} from "@/lib/markdown-response";
import { readRawDocMarkdown } from "@/lib/raw-docs";
import { resolveSiteUrlForRequest } from "@/lib/site-url";

export const dynamic = "force-dynamic";

type RawDocsRouteContext = {
  params: Promise<{
    slug: string[];
  }>;
};

function markdownFilename(slug: string): string {
  const lastSegment = slug.split("/").at(-1) ?? "docs";
  return lastSegment.endsWith(".md") ? lastSegment : `${lastSegment}.md`;
}

async function handleRawDocs(
  request: NextRequest,
  context: RawDocsRouteContext,
  includeBody: boolean,
): Promise<Response> {
  const { slug: slugParts } = await context.params;
  const slug = slugParts.join("/");
  const host = request.headers.get("host") ?? undefined;
  const siteUrl = resolveSiteUrlForRequest(host);

  try {
    const body = readRawDocMarkdown(process.cwd(), slug, siteUrl);

    return markdownResponse(
      includeBody ? body : null,
      {
        status: 200,
        headers: {
          "Cache-Control": "public, max-age=0, s-maxage=600",
        },
      },
      markdownFilename(slug),
    );
  } catch {
    return markdownNotFoundResponse({
      includeBody,
      requestedPath: `/raw-docs/${slug}`,
      siteUrl,
    });
  }
}

export function GET(
  request: NextRequest,
  context: RawDocsRouteContext,
): Promise<Response> {
  return handleRawDocs(request, context, true);
}

export function HEAD(
  request: NextRequest,
  context: RawDocsRouteContext,
): Promise<Response> {
  return handleRawDocs(request, context, false);
}
