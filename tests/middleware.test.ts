import { NextRequest } from "next/server";
import { describe, expect, test } from "vitest";

import proxy, { config } from "../src/proxy";

function withSiteUrl<T>(siteUrl: string | undefined, run: () => T): T {
  const previous = process.env.SITE_URL;
  if (siteUrl === undefined) {
    delete process.env.SITE_URL;
  } else {
    process.env.SITE_URL = siteUrl;
  }

  try {
    return run();
  } finally {
    if (previous === undefined) {
      delete process.env.SITE_URL;
    } else {
      process.env.SITE_URL = previous;
    }
  }
}

describe("middleware root redirect", () => {
  test("redirects root requests to SITE_URL when SITE_URL includes a path", () => {
    withSiteUrl("https://stage.databricks.com/devhub", () => {
      const response = proxy(
        new NextRequest("https://dev-databricks.vercel.app/"),
      );

      expect(response?.status).toBe(307);
      expect(response?.headers.get("location")).toBe(
        "https://stage.databricks.com/devhub",
      );
    });
  });

  test("preserves query strings when redirecting root requests", () => {
    withSiteUrl("https://stage.databricks.com/devhub", () => {
      const response = proxy(
        new NextRequest("https://dev-databricks.vercel.app/?utm_source=test"),
      );

      expect(response?.status).toBe(307);
      expect(response?.headers.get("location")).toBe(
        "https://stage.databricks.com/devhub?utm_source=test",
      );
    });
  });

  test("does not redirect root requests when SITE_URL has no path", () => {
    withSiteUrl("https://developers.databricks.com", () => {
      expect(
        proxy(new NextRequest("https://developers.databricks.com/")),
      ).toBeUndefined();
    });
  });

  test("does not redirect requests already under the configured base path", () => {
    withSiteUrl("https://stage.databricks.com/devhub", () => {
      expect(
        proxy(new NextRequest("https://dev-databricks.vercel.app/devhub")),
      ).toBeUndefined();
    });
  });
});

describe("middleware base-path API routing", () => {
  test("matches every path so configured base-path API requests can be normalized", () => {
    expect(config.matcher).toContain("/:path*");
  });

  test("rewrites configured base-path API requests to the root API function", () => {
    withSiteUrl("https://stage.databricks.com/devhub", () => {
      const response = proxy(
        new NextRequest(
          "https://stage.databricks.com/devhub/api/mcp?transport=1",
        ),
      );

      expect(response?.headers.get("x-middleware-rewrite")).toBe(
        "https://stage.databricks.com/api/mcp?transport=1",
      );
    });
  });

  test("leaves root API requests alone when SITE_URL has no base path", () => {
    withSiteUrl("https://developers.databricks.com", () => {
      expect(
        proxy(new NextRequest("https://developers.databricks.com/api/mcp")),
      ).toBeUndefined();
    });
  });
});

describe("middleware markdown negotiation", () => {
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
