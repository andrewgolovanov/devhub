import { getBlogAuthor } from "@/lib/blog/authors";
import type { NativeBlogItem } from "@/lib/blog/blog-items";

const FRONTMATTER_PATTERN = /^---\n[\s\S]*?\n---\n?/;

export function buildNativeBlogMarkdown(
  content: string,
  item: NativeBlogItem,
  siteOrigin: string,
): string {
  const stripped = content.replace(FRONTMATTER_PATTERN, "").trimStart();
  const origin = siteOrigin.replace(/\/$/, "");
  const escapedTitle = item.title.replace(/"/g, '\\"');
  const escapedSummary = item.description.replace(/"/g, '\\"');
  const authorBlock = item.authors
    .map((id) => {
      const author = getBlogAuthor(id);
      return [`  - name: ${author.name}`, `    role: ${author.role}`].join(
        "\n",
      );
    })
    .join("\n");

  const frontmatter = [
    "---",
    `title: "${escapedTitle}"`,
    `url: ${origin}/blog/${item.id}`,
    `summary: "${escapedSummary}"`,
    `publishedAt: ${item.publishedAt}`,
    "authors:",
    authorBlock,
    "---",
  ].join("\n");

  return `${frontmatter}\n\n${stripped}`;
}
