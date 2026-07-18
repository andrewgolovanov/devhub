const MAX_DESCRIPTION_LENGTH = 160;

function stripMarkdownSyntax(text: string): string {
  return text
    .replace(/\[([^\]]+)]\([^)]+\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/[*_~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function isMetadataLine(line: string): boolean {
  if (line === "") return true;
  if (/^import\s+.+from\s+["'].+["'];?$/.test(line)) return true;
  if (/^export\s+/.test(line)) return true;
  if (/^<\/?[A-Z][A-Za-z0-9]*(?:\s+[^>]*)?\/?>$/.test(line)) return true;
  if (/^:{3,}/.test(line)) return true;
  if (/^#{1,6}\s+/.test(line)) return true;
  if (/^\|.*\|$/.test(line)) return true;
  if (/^[-:| ]{3,}$/.test(line)) return true;
  if (/^(?:[-*+]|\d+\.)\s+/.test(line)) return true;
  return false;
}

function truncateDescription(text: string): string {
  const cleanEnding = (value: string): string =>
    value.replace(/[\s,;:–-]+$/g, "").trim();

  if (text.length <= MAX_DESCRIPTION_LENGTH) return cleanEnding(text);

  const truncated = text.slice(0, MAX_DESCRIPTION_LENGTH);
  const lastSpace = truncated.lastIndexOf(" ");
  return cleanEnding(
    lastSpace > 80 ? truncated.slice(0, lastSpace) : truncated,
  );
}

export function buildSeoDescription(markdown: string): string {
  const withoutBlocks = markdown
    .replace(/^---\n[\s\S]*?\n---\n*/g, "\n")
    .replace(/<!--[\s\S]*?-->/g, "\n")
    .replace(/```[\s\S]*?```/g, "\n");

  const paragraphs: string[] = [];
  let current: string[] = [];

  for (const rawLine of withoutBlocks.split("\n")) {
    const line = rawLine.trim();
    if (isMetadataLine(line)) {
      if (current.length > 0) {
        paragraphs.push(current.join(" "));
        current = [];
      }
      continue;
    }
    current.push(line);
  }

  if (current.length > 0) {
    paragraphs.push(current.join(" "));
  }

  const description =
    paragraphs.map(stripMarkdownSyntax).find((paragraph) => paragraph !== "") ??
    "";

  return truncateDescription(description);
}
