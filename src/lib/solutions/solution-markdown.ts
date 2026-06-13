import matter from "gray-matter";

import { getSolutionAuthor } from "./authors";
import type { NativeSolutionItem } from "./solutions";

export function buildNativeSolutionMarkdown(
  content: string,
  item: NativeSolutionItem,
  siteOrigin: string,
): string {
  const stripped = matter(content).content.trimStart();
  const origin = siteOrigin.replace(/\/$/, "");

  return matter.stringify(
    { content: `\n${stripped}` },
    {
      title: item.title,
      url: `${origin}/solutions/${item.id}`,
      summary: item.description,
      publishedAt: item.publishedAt,
      authors: item.authors.map((id) => {
        const author = getSolutionAuthor(id);
        return { name: author.name, role: author.role };
      }),
    },
  );
}
