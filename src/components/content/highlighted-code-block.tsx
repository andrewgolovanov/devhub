import type { ReactNode } from "react";
import type { BundledLanguage } from "shiki";

import { normalizeCodeLanguage } from "@/lib/code-language";
import { highlight } from "@/lib/shiki";
import { CodeBlockControls } from "@/components/content/code-block-controls";

async function highlightCode(
  source: string,
  language: string | undefined,
): Promise<ReactNode> {
  const normalizedLanguage = normalizeCodeLanguage(language);
  return highlight(source, {
    defaultColor: false,
    fallbackLanguage: "text",
    lang: normalizedLanguage as BundledLanguage,
    themes: {
      dark: "dracula",
      light: "dracula",
    },
  });
}

export async function HighlightedCodeBlock({
  language,
  showTitle = true,
  text,
  title,
}: {
  language?: string;
  showTitle?: boolean;
  text: string;
  title?: string;
}): Promise<ReactNode> {
  const normalizedLanguage = normalizeCodeLanguage(language);
  const code = await highlightCode(text, language);

  return (
    <figure
      className={`theme-code-block code-block${normalizedLanguage ? ` language-${normalizedLanguage}` : ""}`}
      data-language={normalizedLanguage || undefined}
    >
      {showTitle && title ? (
        <div className="border-prose-border text-muted-foreground border-b px-4 py-3.5 text-[0.8125rem] font-medium tracking-tight">
          {title}
        </div>
      ) : null}
      <div className="codeBlockContent">
        {code}
        <CodeBlockControls text={text} />
      </div>
    </figure>
  );
}
