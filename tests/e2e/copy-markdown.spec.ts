import { test, expect } from "@playwright/test";

function setupClipboardMock(page: import("@playwright/test").Page) {
  return page.addInitScript(() => {
    Object.defineProperty(window.navigator, "clipboard", {
      value: {
        writeText: async (value: string) => {
          (window as { __copiedText?: string }).__copiedText = value;
        },
      },
      configurable: true,
    });
  });
}

function getCopiedText(page: import("@playwright/test").Page) {
  return page.evaluate(
    () => (window as { __copiedText?: string }).__copiedText ?? "",
  );
}

async function clickCopyMarkdownAndWaitForToast(
  page: import("@playwright/test").Page,
) {
  const trigger = page.getByRole("button", { name: /copy (as|article)/i });
  await trigger.waitFor({ state: "visible" });
  await trigger.click();
  const menuItem = page.getByRole("menuitem", { name: "Copy Markdown" });
  await menuItem.waitFor({ state: "visible" });
  await menuItem.click();
  await expect(page.getByText("Markdown copied")).toBeVisible({
    timeout: 5000,
  });
}

async function clickCopyPromptAndWaitForToast(
  page: import("@playwright/test").Page,
) {
  const button = page.getByRole("button", { name: "Copy prompt" }).first();
  await button.waitFor({ state: "visible" });
  await button.click();
  await expect(page.getByText("Prompt copied")).toBeVisible({ timeout: 5000 });
}

async function expectCopyMarkdownWithoutPreamble({
  page,
  path,
  expectedFragments,
}: {
  page: import("@playwright/test").Page;
  path: string;
  expectedFragments: string[];
}) {
  await setupClipboardMock(page);
  await page.goto(path, { waitUntil: "domcontentloaded" });

  await clickCopyMarkdownAndWaitForToast(page);

  const copied = await getCopiedText(page);
  expect(copied).not.toContain("# About DevHub");
  expect(copied).not.toContain("/llms.txt");
  for (const fragment of expectedFragments) {
    expect(copied).toContain(fragment);
  }
}

test.describe("copy markdown exports raw markdown on recipe pages", () => {
  test("recipe detail page copies actual markdown with code fences", async ({
    page,
  }) => {
    await setupClipboardMock(page);
    await page.goto("/templates/set-up-your-local-dev-environment");

    await clickCopyPromptAndWaitForToast(page);

    const copied = await getCopiedText(page);
    expect(copied).toContain("# About DevHub");
    expect(copied).toContain("## Set Up Your Local Dev Environment");
    expect(copied).toContain("```bash");
    expect(copied).toContain("databricks -v");
    expect(copied).toContain("llms.txt");
  });
});

test.describe("copy markdown exports raw markdown on template pages", () => {
  test("cookbook page wraps the body with the meta-prompt and injects local-bootstrap", async ({
    page,
  }) => {
    await setupClipboardMock(page);
    await page.goto("/templates/ai-chat-app");

    await clickCopyPromptAndWaitForToast(page);

    const copied = await getCopiedText(page);
    // Meta-prompt blocks are present:
    expect(copied).toContain("# About DevHub");
    expect(copied).toContain("# Working with DevHub prompts");
    expect(copied).toContain("# What the user just did");
    expect(copied).toContain("# Verify your local Databricks dev environment");
    expect(copied).toContain("## Set Up Your Local Dev Environment");
    // Cookbook body comes after the meta-prompt, with its own frontmatter:
    expect(copied).toContain('title: "AI Chat App"');
    expect(copied).toContain("# The cookbook the user copied");
    expect(copied).toContain("```bash");
  });

  test("multi-recipe cookbook body no longer embeds the local-dev-environment recipe", async ({
    page,
  }) => {
    await setupClipboardMock(page);
    await page.goto("/templates/app-with-lakebase");

    await clickCopyPromptAndWaitForToast(page);

    const copied = await getCopiedText(page);
    expect(copied).toContain("# About DevHub");
    // The local-dev-environment recipe heading is present exactly once —
    // injected by the meta-prompt, NOT duplicated inside the cookbook body.
    const bootstrapHeadings = copied.match(
      /^## Set Up Your Local Dev Environment$/gm,
    );
    expect(bootstrapHeadings?.length).toBe(1);
    expect(copied).toContain("## Lakebase Data Persistence");
    expect(copied).toContain("---");
  });
});

test.describe("copy markdown exports raw markdown on example pages", () => {
  test("example detail page copies markdown content", async ({ page }) => {
    await setupClipboardMock(page);
    await page.goto("/templates/agentic-support-console");

    await clickCopyPromptAndWaitForToast(page);

    const copied = await getCopiedText(page);
    expect(copied).toContain("# About DevHub");
    expect(copied).toContain("## Agentic Support Console");
    expect(copied).toContain("Data Flow");
    expect(copied).toContain("Lakehouse Sync");
  });

  test("saas-tracker example copies markdown content", async ({ page }) => {
    await setupClipboardMock(page);
    await page.goto("/templates/saas-tracker");

    await clickCopyPromptAndWaitForToast(page);

    const copied = await getCopiedText(page);
    expect(copied).toContain("# About DevHub");
    expect(copied).toContain("## SaaS Subscription Tracker");
    expect(copied).toContain("Data Flow");
  });

  // Full `npm run test` runs `build` before Playwright; if you run `test:e2e`
  // alone, run `npm run build` first so `docusaurus serve` is not stale.
  test("Banner Copy prompt includes clone bash block and included templates preamble", async ({
    page,
  }) => {
    await setupClipboardMock(page);
    await page.goto("/templates/agentic-support-console");

    await clickCopyPromptAndWaitForToast(page);

    const copied = await getCopiedText(page);
    expect(copied).toContain("# About DevHub");
    expect(copied).toContain("## Get started");
    expect(copied).toContain("Run the command below");
    expect(copied).toContain("```bash");
    expect(copied).toContain(
      "git clone --depth 1 https://github.com/databricks/devhub.git",
    );
    expect(copied).toContain("**`template/README.md`**");
    expect(copied).toContain("## Included templates");
    expect(copied).toContain(
      "These **templates** informed how this example was built",
    );
    expect(copied).toContain(
      "### 1. Clone locally and follow `template/README.md`",
    );
  });

  test("Banner Copy prompt copies full prompt with bash and ### substeps", async ({
    page,
  }) => {
    await setupClipboardMock(page);
    await page.goto("/templates/agentic-support-console");

    await clickCopyPromptAndWaitForToast(page);

    const copied = await getCopiedText(page);
    expect(copied).toContain("# About DevHub");
    expect(copied).toContain("\n---\n\n# ");
    expect(copied).toContain(
      "### 1. Clone locally and follow `template/README.md`",
    );
    expect(copied).toContain("```bash");
    expect(copied).toContain(
      "git clone --depth 1 https://github.com/databricks/devhub.git",
    );
    expect(copied).toContain(
      "databricks apps init --template https://github.com/databricks/devhub/tree/main/examples/agentic-support-console",
    );
    expect(copied).toContain("template/README.md");
    expect(copied).not.toContain(
      "### 2. Provision or link existing Databricks resources",
    );
    expect(copied).not.toContain("1) Clone the repository locally");
  });
});

test.describe("copy markdown exports raw markdown on solution pages", () => {
  test("solution detail page copies actual markdown without the About DevHub preamble", async ({
    page,
  }) => {
    await expectCopyMarkdownWithoutPreamble({
      page,
      path: "/solutions/devhub-launch",
      expectedFragments: [
        "**dev.databricks.com**",
        'title: "Introducing DevHub"',
      ],
    });
  });

  test("solution detail page opens the pretty raw markdown URL", async ({
    page,
  }) => {
    await page.goto("/solutions/devhub-launch", {
      waitUntil: "domcontentloaded",
    });

    await page.getByRole("button", { name: /copy (as|article)/i }).click();
    const popupPromise = page.waitForEvent("popup");
    await page.getByRole("menuitem", { name: "View Raw Markdown" }).click();
    const popup = await popupPromise;

    await expect
      .poll(() => popup.url())
      .toContain("/solutions/devhub-launch.md");
  });

  test("solution detail page copies the MCP config", async ({ page }) => {
    await setupClipboardMock(page);
    await page.goto("/solutions/devhub-launch");

    await page.getByRole("button", { name: /copy (as|article)/i }).click();
    await page.getByRole("menuitem", { name: "Connect to MCP Server" }).click();
    await expect(page.getByText("MCP config copied")).toBeVisible({
      timeout: 5000,
    });

    const copied = JSON.parse(await getCopiedText(page)) as {
      mcpServers: Record<string, { url: string }>;
    };
    const pageOrigin = new URL(page.url()).origin;
    const mcpUrl = copied.mcpServers["databricks-devhub"].url;
    expect(new URL(mcpUrl).origin).toBe(pageOrigin);
    expect(new URL(mcpUrl).pathname).toBe("/api/mcp");
  });
});

test.describe("copy markdown exports raw markdown on blog pages", () => {
  test("blog detail page uses Copy Article and copies markdown without the About DevHub preamble", async ({
    page,
  }) => {
    await expectCopyMarkdownWithoutPreamble({
      page,
      path: "/blog/devhub-launch",
      expectedFragments: [
        "**dev.databricks.com**",
        "title: Introducing dev.databricks.com",
        "publishedAt:",
        "2026-04-14",
        "name: Andre Landgraf",
      ],
    });
    await expect(
      page.getByRole("button", { name: /copy (agent )?prompt/i }),
    ).toHaveCount(0);
  });
});

test.describe("copy markdown exports raw markdown on docs pages", () => {
  test("docs page copies raw markdown without the About DevHub preamble", async ({
    page,
  }) => {
    await expectCopyMarkdownWithoutPreamble({
      page,
      path: "/docs/start-here",
      expectedFragments: ["# Start here", "## Where to start"],
    });
  });

  test("raw-docs static files are served", async ({ request }) => {
    const response = await request.get("/raw-docs/start-here.md");
    expect(response.status()).toBe(200);
    const text = await response.text();
    expect(text).toContain("# Start here");
  });

  test("docs page with CLI tabs includes both code variants and no About preamble", async ({
    page,
  }) => {
    await setupClipboardMock(page);
    await page.goto("/docs/lakebase/development");

    await clickCopyMarkdownAndWaitForToast(page);

    const copied = await getCopiedText(page);
    expect(copied).not.toContain("# About DevHub");
    expect(copied).toContain('title="Common"');
    expect(copied).toContain('title="All Options"');
    expect(copied).toContain("databricks postgres create-branch");
  });
});

// Vercel still rewrites pretty .md URLs to /api/markdown, but Docusaurus also
// emits static .md files for local development and Playwright coverage.
