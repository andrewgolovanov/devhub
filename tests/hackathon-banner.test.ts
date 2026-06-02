import { describe, expect, test } from "vitest";
import {
  getHackathonBannerConfig,
  resolveHackathonBannerActive,
} from "../src/lib/hackathon-banner-server";

describe("resolveHackathonBannerActive", () => {
  test("returns false when no env vars are set", () => {
    expect(resolveHackathonBannerActive({})).toBe(false);
  });

  test('returns true only when HACKATHON_BANNER_ENABLED is exactly "true"', () => {
    expect(
      resolveHackathonBannerActive({ HACKATHON_BANNER_ENABLED: "true" }),
    ).toBe(true);
  });

  test("returns false for any other enable value", () => {
    for (const value of ["1", "yes", "True", "TRUE", "", "false"]) {
      expect(
        resolveHackathonBannerActive({ HACKATHON_BANNER_ENABLED: value }),
      ).toBe(false);
    }
  });
});

describe("getHackathonBannerConfig", () => {
  test("returns undefined when inactive", () => {
    expect(getHackathonBannerConfig({})).toBeUndefined();
    expect(
      getHackathonBannerConfig({ HACKATHON_BANNER_ENABLED: "false" }),
    ).toBeUndefined();
  });

  test("returns a brand-styled, non-dismissible config when active", () => {
    const config = getHackathonBannerConfig({
      HACKATHON_BANNER_ENABLED: "true",
      HACKATHON_EVENT_SLUG: "apps-agents-for-good-2026",
    });
    expect(config).toBeDefined();
    expect(config?.isCloseable).toBe(false);
    expect(config?.backgroundColor).toBe("var(--db-lava)");
    expect(config?.textColor).toBe("#ffffff");
  });

  test("links to the event slug and namespaces the id per event", () => {
    const config = getHackathonBannerConfig({
      HACKATHON_BANNER_ENABLED: "true",
      HACKATHON_EVENT_SLUG: "apps-agents-for-good-2026",
    });
    expect(config?.content).toContain(
      'href="/hackathon/apps-agents-for-good-2026"',
    );
    expect(config?.id).toBe("hackathon-apps-agents-for-good-2026");
  });

  test("falls back to /hackathon and a generic id when no slug is set", () => {
    const config = getHackathonBannerConfig({
      HACKATHON_BANNER_ENABLED: "true",
    });
    expect(config?.content).toContain('href="/hackathon"');
    expect(config?.content).not.toContain('href="/hackathon/');
    expect(config?.id).toBe("hackathon-event");
  });

  test("trims surrounding whitespace from the slug", () => {
    const config = getHackathonBannerConfig({
      HACKATHON_BANNER_ENABLED: "true",
      HACKATHON_EVENT_SLUG: "  spring-2027  ",
    });
    expect(config?.content).toContain('href="/hackathon/spring-2027"');
    expect(config?.id).toBe("hackathon-spring-2027");
  });

  test("HACKATHON_BANNER_TEXT overrides only the lead text; link is always appended", () => {
    const config = getHackathonBannerConfig({
      HACKATHON_BANNER_ENABLED: "true",
      HACKATHON_EVENT_SLUG: "apps-agents-for-good-2026",
      HACKATHON_BANNER_TEXT: "Custom message",
    });
    expect(config?.content).toContain("Custom message");
    expect(config?.content).toContain(
      'href="/hackathon/apps-agents-for-good-2026"',
    );
    expect(config?.content).toContain("See resources");
    expect(config?.content).not.toContain(
      "Databricks Developer Hackathon is live",
    );
  });

  test("trims trailing whitespace from HACKATHON_BANNER_TEXT before appending the link", () => {
    const config = getHackathonBannerConfig({
      HACKATHON_BANNER_ENABLED: "true",
      HACKATHON_EVENT_SLUG: "apps-agents-for-good-2026",
      HACKATHON_BANNER_TEXT: "Custom message   ",
    });
    expect(config?.content).toBe(
      'Custom message <a href="/hackathon/apps-agents-for-good-2026"><b>See resources &rarr;</b></a>',
    );
  });

  test("default lead text is used when HACKATHON_BANNER_TEXT is unset", () => {
    const config = getHackathonBannerConfig({
      HACKATHON_BANNER_ENABLED: "true",
      HACKATHON_EVENT_SLUG: "apps-agents-for-good-2026",
    });
    expect(config?.content).toContain(
      "Databricks Developer Hackathon is live.",
    );
  });
});
