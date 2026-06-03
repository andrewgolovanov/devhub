import type { Code } from "mdast";
import type { MdxJsxFlowElement, MdxJsxAttribute } from "mdast-util-mdx";
import type { Node, Parent } from "unist";
import type { Transformer } from "unified";

function parseTitle(meta: string | null | undefined): string | null {
  if (!meta) return null;
  const match = meta.match(/title="([^"]*)"/);
  return match ? match[1].trim() : null;
}

function stripTitle(meta: string | null | undefined): string | null {
  if (!meta) return null;
  const stripped = meta.replace(/title="[^"]*"/, "").trim();
  return stripped || null;
}

function attr(name: string, value: string): MdxJsxAttribute {
  return { type: "mdxJsxAttribute", name, value };
}

function createTabItem(
  code: Code,
  label: string,
  value: string,
): MdxJsxFlowElement {
  return {
    type: "mdxJsxFlowElement",
    name: "TabItem",
    attributes: [attr("value", value), attr("label", label)],
    children: [
      {
        type: code.type,
        lang: code.lang,
        meta: stripTitle(code.meta),
        value: code.value,
      } as Code,
    ],
  };
}

function createImportNode() {
  return {
    type: "mdxjsEsm" as const,
    value:
      "import { ContentTabs as Tabs, ContentTab as TabItem } from '@/components/docs/content-tabs'",
    data: {
      estree: {
        type: "Program" as const,
        body: [
          {
            type: "ImportDeclaration" as const,
            specifiers: [
              {
                type: "ImportSpecifier" as const,
                imported: {
                  type: "Identifier" as const,
                  name: "ContentTabs",
                },
                local: { type: "Identifier" as const, name: "Tabs" },
              },
              {
                type: "ImportSpecifier" as const,
                imported: {
                  type: "Identifier" as const,
                  name: "ContentTab",
                },
                local: { type: "Identifier" as const, name: "TabItem" },
              },
            ],
            source: {
              type: "Literal" as const,
              value: "@/components/docs/content-tabs",
              raw: "'@/components/docs/content-tabs'",
            },
          },
        ],
        sourceType: "module" as const,
      },
    },
  };
}

const isCode = (node: Node): node is Code => node.type === "code";
const isParent = (node: Node): node is Parent =>
  Array.isArray((node as Parent).children);

export default function remarkCliTabs(): Transformer {
  return async (root) => {
    const { visit } = await import("unist-util-visit");

    let transformed = false;
    let alreadyImported = false;

    visit(root, (node: Node) => {
      if (
        node.type === "mdxjsEsm" &&
        ((node as { value?: string }).value?.includes("@theme/Tabs") ||
          (node as { value?: string }).value?.includes(
            "@/components/docs/content-tabs",
          ))
      ) {
        alreadyImported = true;
      }

      if (!isParent(node)) return;

      let i = 0;
      while (i < node.children.length - 1) {
        const first = node.children[i];
        const second = node.children[i + 1];

        if (!isCode(first) || !isCode(second)) {
          i++;
          continue;
        }

        const firstTitle = parseTitle(first.meta);
        const secondTitle = parseTitle(second.meta);

        if (
          firstTitle &&
          secondTitle &&
          /^Common$/i.test(firstTitle) &&
          /^All Options$/i.test(secondTitle)
        ) {
          const tabs: MdxJsxFlowElement = {
            type: "mdxJsxFlowElement",
            name: "Tabs",
            attributes: [
              attr("groupId", "cli-mode"),
              attr("queryString", "cli"),
            ],
            children: [
              createTabItem(first, firstTitle, "common"),
              createTabItem(second, secondTitle, "all-options"),
            ],
          };

          node.children.splice(i, 2, tabs as unknown as typeof first);
          transformed = true;
        }

        i++;
      }
    });

    if (transformed && !alreadyImported) {
      (root as Parent).children.unshift(createImportNode() as unknown as Node);
    }
  };
}
