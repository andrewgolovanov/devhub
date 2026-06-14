import { describe, expect, test } from "vitest";

import { HEADER_LINKS, isHeaderNavItemActive } from "@/lib/header-navigation";

describe("header navigation active state", () => {
  const docsItem = HEADER_LINKS.find(({ label }) => label === "Docs");

  test("keeps Docs active on the docs landing page", () => {
    expect(docsItem).toBeDefined();
    expect(isHeaderNavItemActive(docsItem!, "/docs/start-here")).toBe(true);
  });

  test("keeps Docs active on nested docs pages", () => {
    expect(docsItem).toBeDefined();
    expect(isHeaderNavItemActive(docsItem!, "/docs/apps/quickstart")).toBe(
      true,
    );
  });

  test("does not mark Docs active outside the docs section", () => {
    expect(docsItem).toBeDefined();
    expect(isHeaderNavItemActive(docsItem!, "/templates")).toBe(false);
  });
});
