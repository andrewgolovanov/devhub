import { test, expect } from "@playwright/test";
import {
  examples,
  recipesInOrder,
  cookbooks,
} from "../../src/lib/recipes/recipes";

// Mirror the /templates listing logic: drafts and `unlisted` entries are
// excluded from the grid (the latter stay navigable + indexed, just hidden here).
const TEMPLATE_COUNT =
  examples.filter((e) => !e.isDraft && !e.unlisted).length +
  cookbooks.filter((c) => !c.isDraft).length +
  recipesInOrder.filter((r) => !r.isDraft && !r.unlisted).length;
const TOTAL_TEMPLATES = `${TEMPLATE_COUNT} of ${TEMPLATE_COUNT} templates`;

test.describe("templates page search", () => {
  test("search bar filters results and clearing restores all", async ({
    page,
  }) => {
    await page.goto("/templates");
    await expect(page.getByText(TOTAL_TEMPLATES)).toBeVisible();

    await page.getByRole("searchbox").fill("genie");
    await expect(
      page.getByText(`7 of ${TEMPLATE_COUNT} templates`),
    ).toBeVisible();
    await expect(
      page.locator('a[href="/templates/inventory-intelligence"]'),
    ).toBeVisible();
    // agentic-support-console matches "genie" but is unlisted, so it must stay
    // hidden from the listing even when the search would otherwise surface it.
    await expect(
      page.locator('a[href="/templates/agentic-support-console"]'),
    ).toBeHidden();
    await expect(
      page.locator('a[href="/templates/saas-tracker"]'),
    ).toBeVisible();
    await expect(
      page.locator('a[href="/templates/content-moderator"]'),
    ).toBeVisible();
    await expect(
      page.locator('a[href="/templates/vacation-rentals"]'),
    ).toBeVisible();
    await expect(
      page.locator('a[href="/templates/genie-analytics-app"]'),
    ).toBeVisible();
    await expect(
      page.locator('a[href="/templates/genie-conversational-analytics"]'),
    ).toBeVisible();
    await expect(
      page.locator('a[href="/templates/genie-multi-space"]'),
    ).toBeVisible();

    await page.getByRole("searchbox").fill("");
    await expect(page.getByText(TOTAL_TEMPLATES)).toBeVisible();
  });

  test("search matches terms that only appear in tags or services", async ({
    page,
  }) => {
    await page.goto("/templates");
    await expect(page.getByText(TOTAL_TEMPLATES)).toBeVisible();

    await page.getByRole("searchbox").fill("postgres");
    await expect(
      page.locator('a[href="/templates/lakebase-pgvector"]'),
    ).toBeVisible();
    await expect(
      page.locator('a[href="/templates/lakebase-token-management"]'),
    ).toBeVisible();
    await expect(
      page.locator('a[href="/templates/genie-conversational-analytics"]'),
    ).toBeHidden();

    await page.getByRole("searchbox").fill("appkit");
    await expect(
      page.locator('a[href="/templates/spin-up-databricks-app"]'),
    ).toBeVisible();
  });
});

test.describe("templates page service filter", () => {
  test("checking a service narrows results and shows active pill", async ({
    page,
  }) => {
    await page.goto("/templates");
    await expect(page.getByText(TOTAL_TEMPLATES)).toBeVisible();

    await page
      .getByRole("checkbox", { name: "Lakebase Postgres", exact: true })
      .check();

    const count = page.getByText(
      new RegExp(`^\\d+ of ${TEMPLATE_COUNT} templates$`),
    );
    await expect(count).not.toHaveText(TOTAL_TEMPLATES);

    await expect(
      page.locator('a[href="/templates/lakebase-off-platform"]'),
    ).toBeVisible();
    await expect(
      page.locator('a[href="/templates/query-ai-gateway-endpoints"]'),
    ).toBeHidden();
  });

  test("selecting multiple services narrows results (AND)", async ({
    page,
  }) => {
    await page.goto("/templates");
    await expect(page.getByText(TOTAL_TEMPLATES)).toBeVisible();

    const countLocator = page.getByText(
      new RegExp(`^(\\d+) of ${TEMPLATE_COUNT} templates$`),
    );

    await page
      .getByRole("checkbox", { name: "Databricks Apps", exact: true })
      .check();
    const afterFirst = (await countLocator.textContent()) ?? "";
    const firstCount = Number(afterFirst.split(" ")[0]);

    await page
      .getByRole("checkbox", { name: "Lakebase Postgres", exact: true })
      .check();
    await expect(countLocator).not.toHaveText(afterFirst);
    const afterSecond = (await countLocator.textContent()) ?? "";
    const secondCount = Number(afterSecond.split(" ")[0]);

    expect(secondCount).toBeLessThan(firstCount);
    expect(secondCount).toBeGreaterThan(0);

    await expect(
      page.locator('a[href="/templates/lakebase-data-persistence"]'),
    ).toBeVisible();
    await expect(
      page.locator('a[href="/templates/lakebase-pgvector"]'),
    ).toBeHidden();
  });
});

test.describe("templates page clear all filters", () => {
  test("clear all resets search, service filter, and tag filters", async ({
    page,
  }) => {
    await page.goto("/templates");

    await page.getByRole("searchbox").fill("lakebase");
    await page
      .getByRole("checkbox", { name: "Lakebase Postgres", exact: true })
      .check();
    await expect(page.getByRole("button", { name: "Clear all" })).toBeVisible();

    await page.getByRole("button", { name: "Clear all" }).click();

    await expect(page.getByRole("searchbox")).toHaveValue("");
    await expect(page.getByText(TOTAL_TEMPLATES)).toBeVisible();
    await expect(page.getByRole("button", { name: "Clear all" })).toBeHidden();
  });
});

test.describe("templates page Build-with Replit filter", () => {
  test("checking 'Replit' narrows the grid to templates with a replit prompt and shows a removable chip", async ({
    page,
  }) => {
    await page.goto("/templates");
    await expect(page.getByText(TOTAL_TEMPLATES)).toBeVisible();

    await page.getByRole("checkbox", { name: "Replit", exact: true }).check();

    // saas-tracker ships a replit-prompt.md, so it should still be visible.
    await expect(
      page.locator('a[href="/templates/saas-tracker"]'),
    ).toBeVisible();
    // set-up-your-local-dev-environment does NOT ship one, so it should hide.
    await expect(
      page.locator('a[href="/templates/set-up-your-local-dev-environment"]'),
    ).toBeHidden();

    // The active-filters chip should appear and clicking it should turn the
    // filter back off.
    const chip = page.getByRole("button", { name: /^Replit$/ });
    await expect(chip).toBeVisible();
    await chip.click();
    await expect(page.getByText(TOTAL_TEMPLATES)).toBeVisible();
  });

  test("Build-with Replit filter participates in 'Clear all'", async ({
    page,
  }) => {
    await page.goto("/templates");

    await page.getByRole("checkbox", { name: "Replit", exact: true }).check();
    await expect(page.getByRole("button", { name: "Clear all" })).toBeVisible();

    await page.getByRole("button", { name: "Clear all" }).click();
    await expect(page.getByText(TOTAL_TEMPLATES)).toBeVisible();
    await expect(page.getByRole("button", { name: "Clear all" })).toBeHidden();
  });
});
