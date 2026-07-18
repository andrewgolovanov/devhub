import { visit } from "unist-util-visit";

import { flattenNode } from "./utils.mjs";

function parseOpeningAdmonition(text, typeMap) {
  const typeNames = Object.keys(typeMap).sort((a, b) => b.length - a.length);

  for (const typeName of typeNames) {
    const match = new RegExp(`^:{3,}${typeName}(?=$|\\s|\\[)(.*)$`).exec(text);
    if (!match) continue;

    const rawTitle = match[1].trim();
    const bracketTitle = /^\[([^\]]+)]$/.exec(rawTitle)?.[1];

    return {
      typeName,
      title: bracketTitle ?? (rawTitle || typeMap[typeName]),
    };
  }

  return null;
}

function isClosingAdmonition(text) {
  return /^:{3,}$/.test(text);
}

function removeEmptyTextChildren(children) {
  return children.filter(
    (child) => child.type !== "text" || child.value !== "",
  );
}

function isEmptyParagraph(node) {
  return node.type === "paragraph" && node.children.length === 0;
}

function toParagraph(children) {
  return {
    type: "paragraph",
    children: removeEmptyTextChildren(children),
  };
}

function toOptionalParagraph(children) {
  const paragraph = toParagraph(children);
  return isEmptyParagraph(paragraph) ? null : paragraph;
}

function toAdmonitionNode(attributes, children) {
  return {
    type: "mdxJsxFlowElement",
    name: "Admonition",
    attributes,
    children,
  };
}

function toAdmonitionAttributes(openingAdmonition) {
  return [
    {
      type: "mdxJsxAttribute",
      name: "type",
      value: openingAdmonition.typeName,
    },
    {
      type: "mdxJsxAttribute",
      name: "title",
      value: openingAdmonition.title,
    },
  ];
}

function parseOpeningAdmonitionParagraph(node, typeMap) {
  if (node.type !== "paragraph" || node.children.length === 0) {
    return null;
  }

  const firstChild = node.children[0];
  if (firstChild.type !== "text") {
    return null;
  }

  const openingLine = /^(:{3,}[^\n]*)(?:\n|$)/.exec(firstChild.value);
  if (!openingLine) {
    return null;
  }

  const openingAdmonition = parseOpeningAdmonition(openingLine[1], typeMap);
  if (!openingAdmonition) {
    return null;
  }

  const children = node.children.map((child) => ({ ...child }));
  children[0].value = firstChild.value.slice(openingLine[0].length);

  return {
    node: toOptionalParagraph(children),
    openingAdmonition,
    openingColonCount: /^:+/.exec(openingLine[1])?.[0].length ?? 3,
  };
}

function parseClosingAdmonitionParagraph(node, openingColonCount) {
  if (node.type !== "paragraph" || node.children.length === 0) {
    return null;
  }

  const lastChild = node.children[node.children.length - 1];
  if (lastChild.type !== "text") {
    return null;
  }

  const closingLine = /(?:^|\n)(:{3,})\s*$/.exec(lastChild.value);
  if (!closingLine || closingLine[1].length < openingColonCount) {
    return null;
  }

  const children = node.children.map((child) => ({ ...child }));
  children[children.length - 1].value = lastChild.value.slice(
    0,
    closingLine.index,
  );

  return {
    node: toOptionalParagraph(children),
  };
}

function parseInlineAdmonitionParagraph(node, typeMap) {
  if (node.type !== "paragraph" || node.children.length === 0) {
    return null;
  }

  const firstChild = node.children[0];
  const lastChild = node.children[node.children.length - 1];
  if (firstChild.type !== "text" || lastChild.type !== "text") {
    return null;
  }

  const openingLine = /^(:{3,}[^\n]*)(?:\n|$)/.exec(firstChild.value);
  if (!openingLine) {
    return null;
  }

  const openingAdmonition = parseOpeningAdmonition(openingLine[1], typeMap);
  if (!openingAdmonition) {
    return null;
  }

  const openingColonCount = /^:+/.exec(openingLine[1])?.[0].length ?? 3;
  const closingLine = /(?:^|\n)(:{3,})\s*$/.exec(lastChild.value);
  if (!closingLine || closingLine[1].length < openingColonCount) {
    return null;
  }

  const children = node.children.map((child) => ({ ...child }));
  children[0].value = firstChild.value.slice(openingLine[0].length);
  children[children.length - 1].value = lastChild.value.slice(
    0,
    closingLine.index,
  );

  return toAdmonitionNode(toAdmonitionAttributes(openingAdmonition), [
    toParagraph(children),
  ]);
}

function replaceNodes(nodes, tag, typeMap) {
  if (nodes.length === 0) return;

  let open = -1;
  let openingColonCount = tag.length;
  let attributes = [];
  let hasIntercept = false;

  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].type !== "paragraph") continue;

    const inlineAdmonition = parseInlineAdmonitionParagraph(nodes[i], typeMap);
    if (inlineAdmonition) {
      nodes.splice(i, 1, inlineAdmonition);
      continue;
    }

    if (open === -1) {
      const opening = parseOpeningAdmonitionParagraph(nodes[i], typeMap);
      if (!opening) {
        continue;
      }

      open = i;
      openingColonCount = opening.openingColonCount;
      attributes.push(...toAdmonitionAttributes(opening.openingAdmonition));
      nodes[i] = opening.node ?? toParagraph([]);
      continue;
    }

    const closing = parseClosingAdmonitionParagraph(
      nodes[i],
      openingColonCount,
    );
    if (closing) {
      nodes[i] = closing.node ?? toParagraph([]);
      const children = nodes.slice(open, i + 1).filter((node) => {
        return !isEmptyParagraph(node);
      });

      nodes.splice(
        open,
        i - open + 1,
        toAdmonitionNode(
          attributes,
          hasIntercept ? replaceNodes(children, tag, typeMap) : children,
        ),
      );
      i = open;
      open = -1;
      hasIntercept = false;
      attributes = [];
      continue;
    }

    const text = flattenNode(nodes[i]);
    const openingAdmonition = parseOpeningAdmonition(text, typeMap);
    if (openingAdmonition) {
      hasIntercept = true;
      continue;
    }

    if (isClosingAdmonition(text) && text.length >= openingColonCount) {
      const start = open;
      const children = nodes.slice(open, i).filter((node) => {
        return !isEmptyParagraph(node);
      });

      nodes.splice(
        open,
        i - open + 1,
        toAdmonitionNode(
          attributes,
          hasIntercept ? replaceNodes(children, tag, typeMap) : children,
        ),
      );
      i = start;
      open = -1;
      hasIntercept = false;
      attributes = [];
    }
  }

  return nodes;
}

export default function remarkAdmonition(options = {}) {
  const tag = options.tag ?? ":::";
  const typeMap = options.typeMap ?? {
    info: "Info",
    warn: "Warning",
    note: "Note",
    tip: "Tip",
    warning: "Warning",
    danger: "Danger",
  };

  return (tree) => {
    visit(tree, (node) => {
      if (!("children" in node)) return;
      replaceNodes(node.children, tag, typeMap);
    });
  };
}
