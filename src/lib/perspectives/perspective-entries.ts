import { existsSync, readdirSync, readFileSync } from "fs";
import { join } from "path";

import { cache } from "react";

import {
  parsePerspectiveMarkdown,
  slugFromFilename,
} from "@/lib/perspectives/perspectives";

export type PerspectiveEntry = {
  slug: string;
  question: string;
  body: string;
};

function perspectivesRoot(): string {
  return join(process.cwd(), "src", "content", "perspectives");
}

export const getPerspectiveEntries = cache(
  function getPerspectiveEntries(): PerspectiveEntry[] {
    const root = perspectivesRoot();
    if (!existsSync(root)) {
      return [];
    }

    return readdirSync(root)
      .filter((filename) => filename.endsWith(".md"))
      .map((filename) => {
        const raw = readFileSync(join(root, filename), "utf-8");
        const parsed = parsePerspectiveMarkdown(raw);
        return {
          slug: slugFromFilename(filename),
          question: parsed.question,
          body: parsed.body,
        };
      })
      .sort((a, b) => a.question.localeCompare(b.question));
  },
);

export function getPerspectiveEntry(slug: string): PerspectiveEntry | null {
  return getPerspectiveEntries().find((entry) => entry.slug === slug) ?? null;
}
