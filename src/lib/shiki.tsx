import { Fragment, type ReactNode } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { toJsxRuntime, type Components } from "hast-util-to-jsx-runtime";
import {
  type Awaitable,
  type BundledHighlighterOptions,
  type BundledLanguage,
  type BundledTheme,
  type CodeOptionsMeta,
  type CodeOptionsThemes,
  type CodeToHastOptionsCommon,
  type Highlighter,
  type RegexEngine,
} from "shiki";

type HighlighterOptions = BundledHighlighterOptions<
  BundledLanguage,
  BundledTheme
>;
type HighlighterTheme = HighlighterOptions["themes"][number];
type ShikiLanguage = NonNullable<
  CodeToHastOptionsCommon<BundledLanguage>["lang"]
>;

const defaultThemes = {
  light: "github-light",
  dark: "github-dark",
} satisfies Record<"dark" | "light", BundledTheme>;

export type HighlightOptionsCommon = CodeToHastOptionsCommon<BundledLanguage> &
  CodeOptionsMeta & {
    components?: Partial<Components>;
    engine?: "js" | "oniguruma" | Awaitable<RegexEngine>;
    fallbackLanguage?: ShikiLanguage;
  };

export type HighlightOptionsThemes = CodeOptionsThemes<BundledTheme>;

export type HighlightOptions = HighlightOptionsCommon &
  (HighlightOptionsThemes | Record<never, never>);

const highlighters = new Map<string, Promise<Highlighter>>();

async function highlightCodeToHast(code: string, options: HighlightOptions) {
  const {
    components: _components,
    engine = "oniguruma",
    fallbackLanguage,
    lang: initialLang,
    ...rest
  } = options;
  let lang = initialLang;
  let themes: CodeOptionsThemes<BundledTheme>;
  let themesToLoad: HighlighterTheme[];

  if ("theme" in options && options.theme) {
    themes = { theme: options.theme };
    themesToLoad = [options.theme as HighlighterTheme];
  } else {
    const candidateThemes =
      "themes" in options ? options.themes : defaultThemes;
    themes = {
      themes: candidateThemes,
    };
    themesToLoad = [];
    for (const theme of Object.values(candidateThemes)) {
      if (theme) {
        themesToLoad.push(theme as HighlighterTheme);
      }
    }
  }

  const highlighter =
    typeof engine === "string"
      ? await getHighlighter(engine, {
          langs: [],
          themes: themesToLoad,
        })
      : await getHighlighter("custom", {
          engine,
          langs: [],
          themes: themesToLoad,
        });

  try {
    await highlighter.loadLanguage(lang as BundledLanguage);
  } catch {
    lang = fallbackLanguage ?? "text";
    await highlighter.loadLanguage(lang as BundledLanguage);
  }

  return highlighter.codeToHast(code, {
    lang,
    ...rest,
    ...themes,
  });
}

async function getHighlighter(
  engineType: "custom" | "js" | "oniguruma",
  options: HighlighterOptions,
) {
  const { createHighlighter } = await import("shiki");
  let highlighter = highlighters.get(engineType);

  if (!highlighter) {
    const engine =
      engineType === "js"
        ? import("shiki/engine/javascript").then((module) =>
            module.createJavaScriptRegexEngine(),
          )
        : engineType === "oniguruma" || !options.engine
          ? import("shiki/engine/oniguruma").then((module) =>
              module.createOnigurumaEngine(import("shiki/wasm")),
            )
          : options.engine;

    highlighter = createHighlighter({
      ...options,
      engine,
    });

    highlighters.set(engineType, highlighter);
    return highlighter;
  }

  return highlighter.then(async (instance) => {
    await Promise.all([
      instance.loadLanguage(
        ...(options.langs as Parameters<typeof instance.loadLanguage>),
      ),
      instance.loadTheme(
        ...(options.themes as Parameters<typeof instance.loadTheme>),
      ),
    ]);

    return instance;
  });
}

export async function highlight(
  code: string,
  options: HighlightOptions,
): Promise<ReactNode> {
  const hast = await highlightCodeToHast(code, {
    themes: defaultThemes,
    ...options,
  });

  return toJsxRuntime(hast, {
    Fragment,
    components: {
      ...options.components,
    },
    development: false,
    jsx,
    jsxs,
  });
}
