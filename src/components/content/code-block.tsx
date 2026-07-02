"use client";

import { Children, isValidElement, useEffect, useState } from "react";
import type { ReactElement, ReactNode } from "react";
import type { BundledLanguage, Highlighter } from "shiki";

import { normalizeCodeLanguage } from "@/lib/code-language";
import { CodeBlockControls } from "@/components/content/code-block-controls";

let highlighterPromise: Promise<Highlighter> | undefined;

function extractText(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (!node) return "";
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (isValidElement(node)) {
    const element = node as ReactElement<{ children?: ReactNode }>;
    return extractText(element.props.children);
  }

  return "";
}

async function getClientHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = Promise.all([
      import("shiki"),
      import("shiki/engine/javascript"),
    ]).then(([shiki, engine]) =>
      shiki.createHighlighter({
        engine: engine.createJavaScriptRegexEngine(),
        langs: [],
        themes: ["dracula"],
      }),
    );
  }

  return highlighterPromise;
}

async function highlightClientCode(
  source: string,
  language: string,
): Promise<string> {
  const highlighter = await getClientHighlighter();
  let lang = language;

  try {
    await highlighter.loadLanguage(lang as BundledLanguage);
  } catch {
    lang = "text";
    await highlighter.loadLanguage(lang as BundledLanguage);
  }

  return highlighter.codeToHtml(source, {
    defaultColor: false,
    lang: lang as BundledLanguage,
    themes: {
      dark: "dracula",
      light: "dracula",
    },
  });
}

function CodeBlock({
  children,
  language,
  title,
}: {
  children?: ReactNode;
  language?: string;
  title?: string;
}) {
  const source = extractText(Children.toArray(children)).replace(/\n$/, "");
  const normalizedLanguage = normalizeCodeLanguage(language);
  const [highlightedHtml, setHighlightedHtml] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setHighlightedHtml(null);

    void highlightClientCode(source, normalizedLanguage).then((html) => {
      if (mounted) {
        setHighlightedHtml(html);
      }
    });

    return () => {
      mounted = false;
    };
  }, [normalizedLanguage, source]);

  return (
    <figure
      className={`theme-code-block code-block${normalizedLanguage ? ` language-${normalizedLanguage}` : ""}`}
      data-language={normalizedLanguage || undefined}
    >
      {title ? (
        <div className="border-prose-border text-muted-foreground border-b px-4 py-3.5 text-[13px] font-medium tracking-tight">
          {title}
        </div>
      ) : null}
      <div className="codeBlockContent">
        {highlightedHtml ? (
          <div dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
        ) : (
          <pre>
            <code
              className={
                normalizedLanguage
                  ? `language-${normalizedLanguage}`
                  : undefined
              }
            >
              {source}
            </code>
          </pre>
        )}
        <CodeBlockControls
          key={highlightedHtml ? "highlighted" : "plain"}
          text={source}
        />
      </div>
    </figure>
  );
}

export default CodeBlock;
