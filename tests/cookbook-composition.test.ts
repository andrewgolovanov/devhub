import { describe, expect, test } from "vitest";

import {
  buildCookbookMarkdownDocument,
  composeCookbookMarkdown,
  type CookbookRecipeInput,
} from "../src/lib/cookbook-composition";

const recipeA: CookbookRecipeInput = {
  id: "recipe-a",
  name: "Recipe A",
  sections: {
    goal: "Build feature A for the app.",
  },
};

const recipeB: CookbookRecipeInput = {
  id: "recipe-b",
  name: "Recipe B",
  sections: {
    goal: "Build feature B for the app.",
  },
};

const recipeNoGoal: CookbookRecipeInput = {
  id: "recipe-c",
  name: "Recipe C",
  sections: {},
};

describe("composeCookbookMarkdown", () => {
  test("emits each recipe goal under a ## Component heading", () => {
    const md = composeCookbookMarkdown({
      cookbookName: "Cookbook X",
      cookbookDescription: "desc",
      recipes: [recipeA, recipeB],
    });

    expect(md).toContain("## Component: Recipe A");
    expect(md).toContain("Build feature A for the app.");
    expect(md).toContain("## Component: Recipe B");
    expect(md).toContain("Build feature B for the app.");
  });

  test("prepends goal content above component headings", () => {
    const md = composeCookbookMarkdown({
      cookbookName: "Cookbook",
      cookbookDescription: "desc",
      goal: "## What you are building\n\nSome paragraph.",
      recipes: [recipeA],
    });

    const goalIdx = md.indexOf("## What you are building");
    const componentIdx = md.indexOf("## Component: Recipe A");
    expect(goalIdx).toBeGreaterThanOrEqual(0);
    expect(componentIdx).toBeGreaterThan(goalIdx);
  });

  test("skips recipes with no goal", () => {
    const md = composeCookbookMarkdown({
      cookbookName: "Cookbook",
      cookbookDescription: "desc",
      recipes: [recipeA, recipeNoGoal],
    });
    expect(md).toContain("## Component: Recipe A");
    expect(md).not.toContain("Recipe C");
  });
});

describe("buildCookbookMarkdownDocument", () => {
  test("produces header-only document when all recipe goals are empty", () => {
    const md = buildCookbookMarkdownDocument({
      cookbookName: "Empty Cookbook",
      cookbookDescription: "No recipes with goals.",
      cookbookUrl: "https://developers.databricks.com/templates/empty-cookbook",
      recipes: [recipeNoGoal],
    });
    expect(md).toContain('title: "Empty Cookbook"');
    expect(md).toContain(
      "url: https://developers.databricks.com/templates/empty-cookbook",
    );
    expect(md).not.toContain("# Empty Cookbook");
    expect(md).not.toContain("## Component:");
  });

  test("wraps composed body with frontmatter", () => {
    const md = buildCookbookMarkdownDocument({
      cookbookName: "Cookbook X",
      cookbookDescription: 'Desc with "quotes".',
      cookbookUrl: "https://developers.databricks.com/templates/cookbook-x",
      recipes: [recipeA],
    });
    expect(md.startsWith("---\n")).toBe(true);
    expect(md).toContain('title: "Cookbook X"');
    expect(md).toContain(
      "url: https://developers.databricks.com/templates/cookbook-x",
    );
    expect(md).toContain('summary: "Desc with \\"quotes\\"."');
    expect(md).not.toContain("# Cookbook X");
    expect(md).not.toContain('Desc with "quotes".\n\n## Component');
    expect(md).toContain("## Component: Recipe A");
    expect(md).toContain("Build feature A for the app.");
  });
});
