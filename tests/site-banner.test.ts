import { describe, expect, test } from "vitest";

import {
  getSiteBannerConfig,
  resolveSiteBannerActive,
  resolveSiteBannerContent,
} from "../src/lib/site-banner-server";

const worldTourContent = {
  SITE_BANNER_TEXT:
    "Vibe code (safely) at work! Enable anyone to build and deploy AI apps that are fully-connected to enterprise data at Data + AI World Tour",
  SITE_BANNER_LINK: "https://www.databricks.com/dataaisummit/worldtour",
  SITE_BANNER_LINK_TEXT: "Learn more",
} as const;

describe("resolveSiteBannerActive", () => {
  test("returns false when no env vars are set", () => {
    expect(resolveSiteBannerActive({})).toBe(false);
  });

  test('returns true only when SITE_BANNER_ENABLED is exactly "true"', () => {
    expect(resolveSiteBannerActive({ SITE_BANNER_ENABLED: "true" })).toBe(true);
  });

  test("returns false for any other enable value", () => {
    for (const value of ["1", "yes", "True", "TRUE", "", "false"]) {
      expect(resolveSiteBannerActive({ SITE_BANNER_ENABLED: value })).toBe(
        false,
      );
    }
  });
});

describe("resolveSiteBannerContent", () => {
  test("requires text, link, and link text", () => {
    expect(resolveSiteBannerContent({})).toBeUndefined();
    expect(
      resolveSiteBannerContent({
        SITE_BANNER_TEXT: "Hello",
        SITE_BANNER_LINK: "/x",
      }),
    ).toBeUndefined();
    expect(
      resolveSiteBannerContent({
        SITE_BANNER_TEXT: "Hello",
        SITE_BANNER_LINK: "/x",
        SITE_BANNER_LINK_TEXT: "Go",
      }),
    ).toEqual({ text: "Hello", link: "/x", linkText: "Go" });
  });

  test("rejects unsafe hrefs", () => {
    for (const link of [
      "javascript:alert(1)",
      "data:text/html,<script>alert(1)</script>",
      "//evil.example.com",
      "/\\evil.example.com",
    ]) {
      expect(
        resolveSiteBannerContent({
          SITE_BANNER_TEXT: "Hello",
          SITE_BANNER_LINK: link,
          SITE_BANNER_LINK_TEXT: "Go",
        }),
      ).toBeUndefined();
    }
  });
});

describe("getSiteBannerConfig", () => {
  test("returns undefined when inactive even with complete content", () => {
    expect(getSiteBannerConfig({ ...worldTourContent })).toBeUndefined();
    expect(
      getSiteBannerConfig({
        ...worldTourContent,
        SITE_BANNER_ENABLED: "false",
      }),
    ).toBeUndefined();
  });

  test("returns undefined when content is incomplete", () => {
    expect(
      getSiteBannerConfig({ SITE_BANNER_ENABLED: "true" }),
    ).toBeUndefined();
    expect(
      getSiteBannerConfig({
        SITE_BANNER_ENABLED: "true",
        SITE_BANNER_TEXT: "Hello",
        SITE_BANNER_LINK: "https://example.com",
      }),
    ).toBeUndefined();
  });

  test("builds banner content; only the CTA is a link", () => {
    const config = getSiteBannerConfig({
      ...worldTourContent,
      SITE_BANNER_ENABLED: "true",
    });
    expect(config?.backgroundColor).toBe("#FF5F46");
    expect(config?.content).toContain(worldTourContent.SITE_BANNER_TEXT);
    expect(config?.content).toContain(
      '<a href="https://www.databricks.com/dataaisummit/worldtour" target="_blank" rel="noopener noreferrer"><span class="banner-link-text">Learn more</span></a>',
    );
    expect(config?.content.match(/<a /g) ?? []).toHaveLength(1);
    expect(config?.content).not.toContain("<svg");
    expect(config?.content).not.toContain("aria-hidden");
    expect(
      config?.content.match(/class="banner-lead-text"/g) ?? [],
    ).toHaveLength(1);
  });

  test("internal links stay same-tab", () => {
    const config = getSiteBannerConfig({
      SITE_BANNER_ENABLED: "true",
      SITE_BANNER_TEXT: "Hello",
      SITE_BANNER_LINK: "/docs",
      SITE_BANNER_LINK_TEXT: "Docs",
    });
    expect(config?.content).toContain('<a href="/docs">');
    expect(config?.content).not.toContain("target=");
  });

  test("trims content fields", () => {
    const config = getSiteBannerConfig({
      SITE_BANNER_ENABLED: "true",
      SITE_BANNER_TEXT: "  Hello  ",
      SITE_BANNER_LINK: "  /docs  ",
      SITE_BANNER_LINK_TEXT: "  Docs  ",
    });
    expect(config?.content).toContain(
      '<span class="banner-lead-text">Hello</span><a href="/docs">',
    );
    expect(config?.content).toContain(
      '<span class="banner-link-text">Docs</span>',
    );
  });

  test("escapes the CTA label", () => {
    const config = getSiteBannerConfig({
      SITE_BANNER_ENABLED: "true",
      SITE_BANNER_TEXT: "Hello",
      SITE_BANNER_LINK: "/docs",
      SITE_BANNER_LINK_TEXT: '<img src=x onerror="alert(1)">',
    });
    expect(config?.content).not.toContain("<img");
    expect(config?.content).toContain("&lt;img");
  });
});
