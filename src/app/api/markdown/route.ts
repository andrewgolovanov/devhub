import { type NextRequest } from "next/server";

import {
  composeTemplateAgentPrompt,
  getDetailMarkdown,
  resolveTemplateKind,
  type MarkdownSection,
} from "@/lib/agent-content-markdown";
import { absolutizeMarkdown } from "@/lib/copy-preamble";
import {
  markdownNotFoundResponse,
  markdownResponse,
} from "@/lib/markdown-response";
import { parseMarkdownSection } from "@/lib/markdown-sections";
import { resolveSiteUrlForRequest } from "@/lib/site-url";

export const dynamic = "force-dynamic";

function handleMarkdown(request: NextRequest, includeBody: boolean): Response {
  const section = request.nextUrl.searchParams.get("section");
  const slug = request.nextUrl.searchParams.get("slug") ?? "";
  const host = request.headers.get("host") ?? undefined;
  const siteUrl = resolveSiteUrlForRequest(host);
  const requestedPath = slug ? `/${section}/${slug}.md` : `/${section}.md`;

  try {
    const parsed: MarkdownSection = parseMarkdownSection(section);
    const markdown = getDetailMarkdown(parsed, slug, process.cwd(), siteUrl);
    const kindInfo = resolveTemplateKind(parsed, slug);
    const body = kindInfo
      ? composeTemplateAgentPrompt({
          body: markdown,
          section: parsed,
          slug,
          siteOrigin: siteUrl,
        })
      : absolutizeMarkdown(markdown, siteUrl);
    const filename = slug ? `${slug.replace(/\//g, "-")}.md` : `${parsed}.md`;

    return markdownResponse(
      includeBody ? body : null,
      {
        status: 200,
        headers: {
          "Cache-Control": "public, max-age=0, s-maxage=600",
        },
      },
      filename,
    );
  } catch {
    return markdownNotFoundResponse({ includeBody, requestedPath, siteUrl });
  }
}

export function GET(request: NextRequest): Response {
  return handleMarkdown(request, true);
}

export function HEAD(request: NextRequest): Response {
  return handleMarkdown(request, false);
}
