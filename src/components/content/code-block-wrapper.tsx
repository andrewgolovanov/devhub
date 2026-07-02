import {
  Children,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";

import CodeBlock from "@/components/content/code-block";

function extractText(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (!node) return "";
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (isValidElement(node)) {
    const el = node as ReactElement<{ children?: ReactNode }>;
    return extractText(el.props.children);
  }
  return "";
}

type CodeBlockWrapperProps = {
  children?: ReactNode;
};

export function CodeBlockWrapper({
  children,
}: CodeBlockWrapperProps): ReactNode {
  const codeChild = Children.only(children);

  if (!isValidElement(codeChild)) {
    return <pre>{children}</pre>;
  }

  const el = codeChild as ReactElement<{
    className?: string;
    children?: ReactNode;
  }>;
  const className = el.props.className ?? "";
  const match = className.match(/language-(\w+)/);
  const language = match ? match[1] : undefined;
  const code = extractText(el.props.children).replace(/\n$/, "");

  return (
    <CodeBlock language={language} title={language || undefined}>
      {code}
    </CodeBlock>
  );
}
