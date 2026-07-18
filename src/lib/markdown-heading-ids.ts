function slugifyMarkdownHeading(text: string): string {
  return text
    .replace(/<[^>]+>/g, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function getUniqueMarkdownHeadingId(
  text: string,
  usedIds: Map<string, number>,
): string {
  const baseId = slugifyMarkdownHeading(text);
  const nextIndex = usedIds.get(baseId) ?? 0;
  usedIds.set(baseId, nextIndex + 1);

  if (nextIndex === 0) {
    return baseId;
  }

  return `${baseId}-${nextIndex}`;
}
