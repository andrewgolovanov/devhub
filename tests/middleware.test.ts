import { NextRequest } from "next/server";
import { describe, expect, test } from "vitest";

import proxy, { config } from "../src/proxy";

describe("middleware markdown negotiation", () => {
  test("matches every path so markdown content negotiation can run", () => {
    expect(config.matcher).toContain("/:path*");
  });

  test("does not rewrite ordinary HTML requests", () => {
    expect(
      proxy(
        new NextRequest("https://developers.databricks.com/docs/start-here"),
      ),
    ).toBeUndefined();
  });

  test("rewrites template HTML requests with markdown Accept to the static markdown artifact", () => {
    const response = proxy(
      new NextRequest(
        "https://developers.databricks.com/templates/ai-chat-app",
        {
          headers: { accept: "text/markdown" },
        },
      ),
    );

    expect(response?.headers.get("x-middleware-rewrite")).toBe(
      "https://developers.databricks.com/templates/ai-chat-app.md",
    );
  });

  test("rewrites docs HTML requests with text Accept to the static markdown artifact", () => {
    const response = proxy(
      new NextRequest("https://developers.databricks.com/docs/start-here", {
        headers: { accept: "text/plain" },
      }),
    );

    expect(response?.headers.get("x-middleware-rewrite")).toBe(
      "https://developers.databricks.com/docs/start-here.md",
    );
  });

  test("does not rewrite requests that already target markdown artifacts", () => {
    expect(
      proxy(
        new NextRequest(
          "https://developers.databricks.com/docs/start-here.md",
          {
            headers: { accept: "text/markdown" },
          },
        ),
      ),
    ).toBeUndefined();
  });

  test("rewrites section index requests with markdown Accept to the index artifact", () => {
    const response = proxy(
      new NextRequest("https://developers.databricks.com/templates/", {
        headers: { accept: "text/markdown" },
      }),
    );

    expect(response?.headers.get("x-middleware-rewrite")).toBe(
      "https://developers.databricks.com/templates.md",
    );
  });
});
