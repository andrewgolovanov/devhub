import { test, expect, type Locator, type Page } from "@playwright/test";

function templateLinks(page: Page) {
  return page.locator('#templates-list a[href^="/templates/"]');
}

function templateTextLink(page: Page, href: string) {
  return page.locator(`#templates-list a[href="${href}"]`).filter({
    hasText: /.+/,
  });
}

async function visibleCount(locator: Locator): Promise<number> {
  return locator.evaluateAll(
    (elements) =>
      elements.filter((element) => {
        const rect = element.getBoundingClientRect();
        const style = window.getComputedStyle(element);
        return (
          rect.width > 0 &&
          rect.height > 0 &&
          style.display !== "none" &&
          style.visibility !== "hidden"
        );
      }).length,
  );
}

test.describe("templates page search", () => {
  test("search bar filters results and clearing restores all", async ({
    page,
  }) => {
    await page.goto("/templates");
    const initialCount = await visibleCount(templateLinks(page));
    expect(initialCount).toBeGreaterThan(0);

    await page.getByRole("searchbox").fill("genie");
    await expect(
      templateTextLink(page, "/templates/inventory-intelligence"),
    ).toBeVisible();
    await expect(
      templateTextLink(page, "/templates/agentic-support-console"),
    ).toBeVisible();
    await expect(
      templateTextLink(page, "/templates/saas-tracker"),
    ).toBeVisible();
    await expect(
      templateTextLink(page, "/templates/content-moderator"),
    ).toBeVisible();
    await expect(
      templateTextLink(page, "/templates/vacation-rentals"),
    ).toBeVisible();
    await expect(
      templateTextLink(page, "/templates/genie-analytics-app"),
    ).toBeVisible();
    await expect(
      templateTextLink(page, "/templates/genie-conversational-analytics"),
    ).toBeVisible();
    await expect(
      templateTextLink(page, "/templates/genie-multi-space"),
    ).toBeVisible();

    await page.getByRole("searchbox").fill("");
    expect(await visibleCount(templateLinks(page))).toBe(initialCount);
  });

  test("search matches terms that only appear in tags or services", async ({
    page,
  }) => {
    await page.goto("/templates");
    expect(await visibleCount(templateLinks(page))).toBeGreaterThan(0);

    await page.getByRole("searchbox").fill("postgres");
    await expect(
      templateTextLink(page, "/templates/lakebase-pgvector"),
    ).toBeVisible();
    await expect(
      templateTextLink(page, "/templates/lakebase-token-management"),
    ).toBeVisible();
    await expect(
      templateTextLink(page, "/templates/genie-conversational-analytics"),
    ).toBeHidden();

    await page.getByRole("searchbox").fill("appkit");
    await expect(
      templateTextLink(page, "/templates/spin-up-databricks-app"),
    ).toBeVisible();
  });
});

test.describe("templates page service filter", () => {
  test("checking a service narrows results", async ({ page }) => {
    await page.goto("/templates");
    const initialCount = await visibleCount(templateLinks(page));
    expect(initialCount).toBeGreaterThan(0);

    await page
      .getByRole("checkbox", { name: "Lakebase Postgres", exact: true })
      .check();

    const filteredCount = await visibleCount(templateLinks(page));
    expect(filteredCount).toBeGreaterThan(0);
    expect(filteredCount).not.toBe(initialCount);

    await expect(
      templateTextLink(page, "/templates/lakebase-off-platform"),
    ).toBeVisible();
    await expect(
      templateTextLink(page, "/templates/query-ai-gateway-endpoints"),
    ).toBeHidden();
  });

  test("selecting multiple services narrows results (AND)", async ({
    page,
  }) => {
    await page.goto("/templates");
    expect(await visibleCount(templateLinks(page))).toBeGreaterThan(0);

    await page
      .getByRole("checkbox", { name: "Databricks Apps", exact: true })
      .check();
    const firstCount = await visibleCount(templateLinks(page));

    await page
      .getByRole("checkbox", { name: "Lakebase Postgres", exact: true })
      .check();
    const secondCount = await visibleCount(templateLinks(page));

    expect(secondCount).toBeLessThan(firstCount);
    expect(secondCount).toBeGreaterThan(0);

    await expect(
      templateTextLink(page, "/templates/lakebase-data-persistence"),
    ).toBeVisible();
    await expect(
      templateTextLink(page, "/templates/lakebase-pgvector"),
    ).toBeHidden();
  });
});

test.describe("templates page empty state", () => {
  test("empty state reset clears search and service filters", async ({
    page,
  }) => {
    await page.goto("/templates");

    await page.getByRole("searchbox").fill("not-a-real-template");
    await page
      .getByRole("checkbox", { name: "Lakebase Postgres", exact: true })
      .check();
    await expect(page.getByText("No results found")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Clear all filters" }),
    ).toBeVisible();

    await page.getByRole("button", { name: "Clear all filters" }).click();

    await expect(page.getByRole("searchbox")).toHaveValue("");
    expect(await visibleCount(templateLinks(page))).toBeGreaterThan(0);
    await expect(
      page.getByRole("button", { name: "Clear all filters" }),
    ).toBeHidden();
  });
});
