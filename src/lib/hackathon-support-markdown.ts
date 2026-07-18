import { readFileSync } from "fs";
import { join } from "path";

import type { ReactNode } from "react";

import { renderMarkdownContent } from "@/lib/content-markdown-renderer";

export async function renderHackathonSupportMarkdown({
  markdownSlug,
  tablePresentation,
}: {
  markdownSlug: string;
  tablePresentation?: "prose";
}): Promise<ReactNode> {
  const source = readFileSync(
    join(process.cwd(), "src", "content", "hackathon", `${markdownSlug}.md`),
    "utf-8",
  );

  return renderMarkdownContent({
    showHeadingAnchors: false,
    source,
    tablePresentation,
    variant: "prose",
  });
}
