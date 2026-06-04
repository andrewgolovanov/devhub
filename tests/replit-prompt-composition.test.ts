import {
  mkdtempSync,
  mkdirSync,
  writeFileSync,
  rmSync,
  unlinkSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { readReplitPrompt } from "../src/lib/content-markdown";

/**
 * Seeds a tempdir with a tiny content/ tree and exercises readReplitPrompt's
 * preamble + --- + per-template composition contract.
 */
function seedFixture(root: string, files: Record<string, string>): void {
  for (const [relativePath, contents] of Object.entries(files)) {
    const filePath = join(root, relativePath);
    mkdirSync(join(filePath, ".."), { recursive: true });
    writeFileSync(filePath, contents, "utf-8");
  }
}

const PREAMBLE = "shared preamble body";

describe("readReplitPrompt composition", () => {
  let workDir: string;

  beforeEach(() => {
    workDir = mkdtempSync(join(tmpdir(), "devhub-replit-compose-"));
    seedFixture(workDir, {
      "content/replit-shared/preamble.md": PREAMBLE,
    });
  });

  afterEach(() => {
    rmSync(workDir, { recursive: true, force: true });
  });

  test("returns undefined when the per-template file is missing", () => {
    expect(readReplitPrompt(workDir, "examples", "missing")).toBe(undefined);
  });

  test("composes preamble + --- + per-template task in fixed order", () => {
    seedFixture(workDir, {
      "content/examples/demo/replit-prompt.md": "# Task\n\nDo the thing.",
    });

    expect(readReplitPrompt(workDir, "examples", "demo")).toBe(
      "shared preamble body\n\n---\n\n# Task\n\nDo the thing.\n",
    );
  });

  test("starts with the preamble's opening line", () => {
    seedFixture(workDir, {
      "content/examples/demo/replit-prompt.md": "task",
    });
    const composed = readReplitPrompt(workDir, "examples", "demo");
    expect(composed?.startsWith(PREAMBLE)).toBe(true);
  });

  test("contains exactly one '---' separator between preamble and task", () => {
    seedFixture(workDir, {
      "content/examples/demo/replit-prompt.md": "task line one\ntask line two",
    });
    const composed = readReplitPrompt(workDir, "examples", "demo");
    expect(composed).toBeTruthy();
    expect(composed!.match(/^---$/gm)?.length).toBe(1);
  });

  test("ends with the per-template task body followed by a trailing newline", () => {
    seedFixture(workDir, {
      "content/recipes/demo/replit-prompt.md": "## Task\n\nFinal line of task.",
    });
    const composed = readReplitPrompt(workDir, "recipes", "demo");
    expect(composed?.endsWith("Final line of task.\n")).toBe(true);
  });

  test("works across all three tiers (examples, recipes, cookbooks)", () => {
    seedFixture(workDir, {
      "content/examples/ex/replit-prompt.md": "example task",
      "content/recipes/rc/replit-prompt.md": "recipe task",
      "content/cookbooks/ck/replit-prompt.md": "cookbook task",
    });

    expect(readReplitPrompt(workDir, "examples", "ex")).toContain(
      "example task",
    );
    expect(readReplitPrompt(workDir, "recipes", "rc")).toContain("recipe task");
    expect(readReplitPrompt(workDir, "cookbooks", "ck")).toContain(
      "cookbook task",
    );
  });

  test("trims trailing whitespace from both files before joining", () => {
    seedFixture(workDir, {
      "content/replit-shared/preamble.md": "preamble\n\n\n",
      "content/examples/demo/replit-prompt.md": "task\n\n\n\n",
    });
    expect(readReplitPrompt(workDir, "examples", "demo")).toBe(
      "preamble\n\n---\n\ntask\n",
    );
  });

  test("throws a clear error when the shared preamble is missing", () => {
    // Per-template file exists, but preamble was deleted — should fail loud
    // with a useful message rather than an opaque ENOENT.
    unlinkSync(join(workDir, "content/replit-shared/preamble.md"));
    seedFixture(workDir, {
      "content/examples/orphan/replit-prompt.md": "task",
    });

    expect(() => readReplitPrompt(workDir, "examples", "orphan")).toThrow(
      /Required shared file missing.*preamble\.md/,
    );
  });
});
