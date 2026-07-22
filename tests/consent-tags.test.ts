import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, test, vi } from "vitest";

import { ConsentTags } from "../src/components/consent-tags";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("ConsentTags", () => {
  test("renders nothing without a consent variant", () => {
    vi.stubEnv("ONETRUST_ENV", "");
    vi.stubEnv("VERCEL_ENV", "");
    expect(renderToStaticMarkup(createElement(ConsentTags))).toBe("");
  });

  test("keeps the legal tag order: AutoBlocker, SDK stub, onetrust.js, consent-change handler, GTM", () => {
    vi.stubEnv("ONETRUST_ENV", "test");
    const html = renderToStaticMarkup(createElement(ConsentTags));

    const order = [
      "OtAutoBlock.js",
      "otSDKStub.js",
      "plugins/databricks/js/onetrust.js",
      "db-onetrust-consent-change",
      "'dataLayer','GTM-TWTKQQ'",
    ].map((marker) => html.indexOf(marker));

    expect(order.every((index) => index !== -1)).toBe(true);
    expect(order).toEqual([...order].sort((a, b) => a - b));
  });

  test("consent-change handler chains OptanonWrapper and reloads via OnConsentChanged", () => {
    vi.stubEnv("ONETRUST_ENV", "test");
    const html = renderToStaticMarkup(createElement(ConsentTags));

    // onetrust.js owns OptanonWrapper (cookie deletion on opt-out); the
    // handler must call the previous wrapper, not replace it.
    expect(html).toContain("var previous=window.OptanonWrapper");
    expect(html).toContain("previous()");
    expect(html).toContain("OnConsentChanged");
    expect(html).toContain("window.location.reload()");
  });
});
