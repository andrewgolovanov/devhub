import matter from "gray-matter";

import { getBlogAuthor } from "./authors";
import type { NativeBlogItem } from "./blog-items";

export function buildNativeBlogMarkdown(
  content: string,
  item: NativeBlogItem,
  siteOrigin: string,
): string {
  const stripped = matter(content).content.trimStart();
  const origin = siteOrigin.replace(/\/$/, "");

  return matter.stringify(
    { content: `\n${stripped}` },
    {
      title: item.title,
      url: `${origin}/blog/${item.id}`,
      summary: item.description,
      publishedAt: item.publishedAt,
      authors: item.authors.map((id) => {
        const author = getBlogAuthor(id);
        return { name: author.name, role: author.role };
      }),
    },
  );
}
