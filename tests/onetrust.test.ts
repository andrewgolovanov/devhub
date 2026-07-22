import { describe, expect, test } from "vitest";

import { resolveOneTrustEnv } from "../src/lib/onetrust";

describe("resolveOneTrustEnv", () => {
  test("ONETRUST_ENV override wins over VERCEL_ENV", () => {
    expect(
      resolveOneTrustEnv({ ONETRUST_ENV: "test", VERCEL_ENV: "production" }),
    ).toBe("test");
    expect(
      resolveOneTrustEnv({ ONETRUST_ENV: "production", VERCEL_ENV: "preview" }),
    ).toBe("production");
  });

  test("VERCEL_ENV=production resolves to the production variant", () => {
    expect(resolveOneTrustEnv({ VERCEL_ENV: "production" })).toBe("production");
  });

  test("VERCEL_ENV preview and development resolve to the test variant", () => {
    expect(resolveOneTrustEnv({ VERCEL_ENV: "preview" })).toBe("test");
    expect(resolveOneTrustEnv({ VERCEL_ENV: "development" })).toBe("test");
  });

  test("no recognized env resolves to null (no tags, no banner)", () => {
    expect(resolveOneTrustEnv({})).toBe(null);
    expect(resolveOneTrustEnv({ VERCEL_ENV: "staging" })).toBe(null);
  });

  test("unrecognized ONETRUST_ENV values fall through to VERCEL_ENV", () => {
    expect(
      resolveOneTrustEnv({ ONETRUST_ENV: "on", VERCEL_ENV: "preview" }),
    ).toBe("test");
    expect(resolveOneTrustEnv({ ONETRUST_ENV: "off" })).toBe(null);
  });
});
