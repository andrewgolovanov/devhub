import rehypeShikiFromHighlighter from "@shikijs/rehype/core";
import {
  transformerNotationDiff,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import { bundledLanguages } from "shiki";
import { visit } from "unist-util-visit";

import { defaultThemes, getHighlighter } from "./shiki.mjs";

const LANGUAGE_ALIASES = {
  env: "dotenv",
};

function parseHighlightLines(meta) {
  const highlights = [];

  meta.split(",").forEach((segment) => {
    const trimmed = segment.trim();

    if (trimmed.includes("-")) {
      const [start, end] = trimmed.split("-").map(Number);
      for (let i = start; i <= end; i++) {
        highlights.push(i);
      }
    } else {
      highlights.push(Number(trimmed));
    }
  });

  return highlights;
}

const rehypeCodeDefaultOptions = {
  lazy: true,
  themes: defaultThemes,
  defaultColor: false,
  defaultLanguage: "plaintext",
  experimentalJSEngine: false,
  transformers: [
    transformerNotationHighlight({ matchAlgorithm: "v3" }),
    transformerNotationWordHighlight({ matchAlgorithm: "v3" }),
    transformerNotationDiff({ matchAlgorithm: "v3" }),
    transformerNotationFocus({ matchAlgorithm: "v3" }),
    {
      name: "rehype-code:highlight-lines",
      line(node, line) {
        const highlightedLines = this.options.meta?.highlightedLines;
        if (typeof highlightedLines === "string") {
          const highlights = parseHighlightLines(highlightedLines);
          if (highlights.includes(line)) {
            if (!node.properties.class) node.properties.class = "";
            node.properties.class += " highlighted";
          }
        }
        return node;
      },
    },
  ],
  parseMetaString(meta) {
    const map = {};
    let currentMeta = meta;
    const filenameMatch = currentMeta.match(/^([^\s{]+)/);
    if (filenameMatch) {
      map.fileName = filenameMatch[1];
      currentMeta = currentMeta.slice(filenameMatch[0].length).trim();
    }
    const highlightMatch = currentMeta.match(/{([^}]+)}/);
    if (highlightMatch) {
      map.highlightedLines = highlightMatch[1];
      currentMeta = currentMeta.replace(highlightMatch[0], "").trim();
    }

    map.__parsed_raw = currentMeta;
    return map;
  },
};

function resolveCodeLanguage(language) {
  const normalized = LANGUAGE_ALIASES[language] ?? language;

  if (normalized in bundledLanguages) {
    return normalized;
  }

  return "plaintext";
}

function normalizeCodeLanguageClasses(tree) {
  visit(tree, "element", (node) => {
    if (node.tagName !== "code") {
      return;
    }

    const className = node.properties?.className;
    const classes = Array.isArray(className)
      ? className
      : typeof className === "string"
        ? className.split(/\s+/)
        : [];
    const languageClassIndex = classes.findIndex(
      (entry) => typeof entry === "string" && entry.startsWith("language-"),
    );

    if (languageClassIndex === -1) {
      return;
    }

    const rawLanguage = classes[languageClassIndex].slice("language-".length);
    classes[languageClassIndex] =
      `language-${resolveCodeLanguage(rawLanguage)}`;
    node.properties.className = classes;
  });
}

export default function rehypeCode(inputOptions = {}) {
  const options = {
    ...rehypeCodeDefaultOptions,
    ...inputOptions,
  };

  const transformers = [...(options.transformers ?? [])];
  transformers.unshift({
    name: "rehype-code:pre-process",
    preprocess(code, { meta }) {
      if (meta && "__parsed_raw" in meta) {
        meta.__raw = meta.__parsed_raw;
        delete meta.__parsed_raw;
      }

      if (meta && options.filterMetaString) {
        meta.__raw = options.filterMetaString(meta.__raw ?? "");
      }

      return code.replace(/\n$/, "");
    },
  });

  const themesToLoad = resolveThemes(options);
  const highlighter = getHighlighter(
    options.experimentalJSEngine ? "js" : "oniguruma",
    {
      themes: themesToLoad,
      langs:
        options.langs ??
        (options.lazy ? ["ts", "tsx"] : Object.keys(bundledLanguages)),
    },
  );

  const transformer = highlighter.then((loaded) =>
    rehypeShikiFromHighlighter(loaded, {
      ...options,
      transformers,
    }),
  );

  return async (tree, file) => {
    normalizeCodeLanguageClasses(tree);
    await (
      await transformer
    )(tree, file, () => {});
  };
}

function resolveThemes(options) {
  const themeList = [];
  const candidateThemes = options.themes;
  const candidateTheme = options.theme;

  if (typeof candidateThemes === "string") {
    themeList.push(candidateThemes);
  } else if (Array.isArray(candidateThemes)) {
    themeList.push(...candidateThemes.filter(Boolean));
  } else if (candidateThemes && typeof candidateThemes === "object") {
    themeList.push(...Object.values(candidateThemes).filter(Boolean));
  } else if (candidateTheme) {
    themeList.push(candidateTheme);
  }

  if (themeList.length === 0) {
    themeList.push(defaultThemes.light);
  }

  return themeList;
}
