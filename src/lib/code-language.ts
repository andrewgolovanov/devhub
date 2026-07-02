export function normalizeCodeLanguage(language: string | undefined): string {
  if (!language) return "text";

  const normalized = language.replace(/^language-/, "").toLowerCase();
  const aliases: Record<string, string> = {
    js: "javascript",
    md: "markdown",
    plaintext: "text",
    shell: "bash",
    sh: "bash",
    text: "text",
    ts: "typescript",
    yml: "yaml",
    zsh: "bash",
  };

  return aliases[normalized] ?? normalized;
}
