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
const legacyBasePathSegment = "devhub";

describe("vercel development command", () => {
  test("passes the port flag through pnpm to Next.js", () => {
    expect(config.devCommand).toBe("pnpm dev --port $PORT");
  });
});

function expectRewrite(source: string, destination: string): void {
  expect(config.rewrites).toContainEqual({ source, destination });
}

describe("vercel rewrites", () => {
  test("keeps markdown export routes working at the site root", () => {
    expectRewrite("/docs/llms.txt", "/llms.txt");
    expectRewrite("/docs/(.+)\\.md", "/api/markdown?section=docs&slug=$1");
    expectRewrite(
      "/templates/(.+)\\.md",
      "/api/markdown?section=templates&slug=$1",
    );
    expectRewrite(
      "/solutions/(.+)\\.md",
      "/api/markdown?section=solutions&slug=$1",
    );
    expectRewrite("/templates.md", "/api/markdown?section=templates&slug=");
    expectRewrite("/solutions.md", "/api/markdown?section=solutions&slug=");
    expectRewrite("/raw-docs/(.*)", "/api/markdown?section=docs&slug=$1");
  });

  test("does not keep legacy base-path rewrites", () => {
    expect(
      config.rewrites.some(
        (rewrite) => rewrite.source.split("/")[1] === legacyBasePathSegment,
      ),
    ).toBe(false);
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
  });

  test("applies API hardening headers at the site root", () => {
    expect(config.headers).toContainEqual({
      source: "/api/(.*)",
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
      source: "/solutions/rss.xml",
      headers: rssHeaders,
    });
  });

  test("does not keep legacy base-path headers", () => {
    expect(
      config.headers.some(
        (header) => header.source.split("/")[1] === legacyBasePathSegment,
      ),
    ).toBe(false);
  });
});
