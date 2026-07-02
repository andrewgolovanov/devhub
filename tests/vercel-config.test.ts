import { readFileSync } from "fs";
import { resolve } from "path";

import { describe, expect, test } from "vitest";

type VercelConfig = {
  devCommand: string;
  rewrites: Array<{ source: string; destination: string }>;
  headers: Array<{
    source: string;
    headers: Array<{ key: string; value: string }>;
  }>;
};

const config = JSON.parse(
  readFileSync(resolve(__dirname, "..", "vercel.json"), "utf-8"),
) as VercelConfig;

describe("vercel development command", () => {
  test("passes the port flag through pnpm to Next.js", () => {
    expect(config.devCommand).toBe("pnpm dev --port $PORT");
  });
});

function expectRewrite(source: string, destination: string): void {
  expect(config.rewrites).toContainEqual({ source, destination });
}

describe("vercel rewrites", () => {
  test("serves DevHub from /devhub while preserving base path links", () => {
    expectRewrite("/devhub", "/");
    expectRewrite("/devhub/", "/");
    expectRewrite("/devhub/docs/(.*)", "/docs/$1");
    expectRewrite("/devhub/templates/(.*)", "/templates/$1");
    expectRewrite("/devhub/solutions/(.*)", "/solutions/$1");
  });

  test("serves DevHub API functions under /devhub/api", () => {
    expectRewrite("/devhub/api/(.*)", "/api/$1");
  });

  test("serves production static assets under /devhub without stripping dev-server assets", () => {
    expectRewrite("/devhub/assets/(.*)", "/assets/$1");
    expectRewrite("/devhub/img/(.*)", "/img/$1");
    expectRewrite("/devhub/js/(.*)", "/js/$1");
    expectRewrite("/devhub/appkit-preview/(.*)", "/appkit-preview/$1");
    expectRewrite("/devhub/raw-docs/(.*)", "/raw-docs/$1");
    expectRewrite("/devhub/sitemap.xml", "/sitemap.xml");
    expectRewrite("/devhub/robots.txt", "/robots.txt");
    expectRewrite("/devhub/search-doc(.*).json", "/search-doc$1.json");
    expectRewrite("/devhub/lunr-index(.*).json", "/lunr-index$1.json");
    expect(config.rewrites).not.toContainEqual({
      source: "/devhub/(.*)",
      destination: "/$1",
    });
  });

  test("keeps markdown export routes working under /devhub", () => {
    expectRewrite("/devhub/docs/llms.txt", "/api/llms");
    expectRewrite("/devhub/llms.txt", "/api/llms");
    expectRewrite(
      "/devhub/docs/(.+)\\.md",
      "/api/markdown?section=docs&slug=$1",
    );
    expectRewrite(
      "/devhub/templates/(.+)\\.md",
      "/api/markdown?section=templates&slug=$1",
    );
    expectRewrite(
      "/devhub/solutions/(.+)\\.md",
      "/api/markdown?section=solutions&slug=$1",
    );
    expectRewrite(
      "/devhub/templates.md",
      "/api/markdown?section=templates&slug=",
    );
    expectRewrite(
      "/devhub/solutions.md",
      "/api/markdown?section=solutions&slug=",
    );
    expectRewrite("/raw-docs/(.*)", "/api/markdown?section=docs&slug=$1");
  });
});

describe("vercel headers", () => {
  test("caches the versioned home hero player asset", () => {
    const cacheHeader = {
      key: "Cache-Control",
      value: "public, max-age=31536000, immutable",
    };

    expect(config.headers).toContainEqual({
      source: "/js/home-hero-player.js",
      headers: [cacheHeader],
    });
    expect(config.headers).toContainEqual({
      source: "/devhub/js/home-hero-player.js",
      headers: [cacheHeader],
    });
  });

  test("applies API hardening headers to both root and /devhub API paths", () => {
    expect(config.headers).toContainEqual({
      source: "/api/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
      ],
    });
    expect(config.headers).toContainEqual({
      source: "/devhub/api/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
      ],
    });
  });

  test("serves generated agent index and RSS artifacts inline", () => {
    const llmsHeaders = [
      { key: "Cache-Control", value: "public, max-age=0, s-maxage=600" },
      { key: "Content-Disposition", value: 'inline; filename="llms.txt"' },
    ];
    const rssHeaders = [
      { key: "Cache-Control", value: "public, max-age=0, s-maxage=600" },
      { key: "Content-Disposition", value: 'inline; filename="rss.xml"' },
    ];

    expect(config.headers).toContainEqual({
      source: "/llms.txt",
      headers: llmsHeaders,
    });
    expect(config.headers).toContainEqual({
      source: "/devhub/llms.txt",
      headers: llmsHeaders,
    });
    expect(config.headers).toContainEqual({
      source: "/solutions/rss.xml",
      headers: rssHeaders,
    });
    expect(config.headers).toContainEqual({
      source: "/devhub/solutions/rss.xml",
      headers: rssHeaders,
    });
  });
});
