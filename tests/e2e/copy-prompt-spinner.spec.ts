import { expect, test, type Page } from "@playwright/test";

function setupClipboardMock(page: Page) {
  return page.addInitScript(() => {
    Object.defineProperty(window.navigator, "clipboard", {
      value: {
        writeText: async (value: string) => {
          (window as { __copiedText?: string }).__copiedText = value;
        },
      },
      configurable: true,
    });
  });
}

/**
 * Intercept the bootstrap-prompt API and inject `delayMs` before responding so
 * the test can drive both the fast (< 400ms) and slow (>= 400ms) branches of
 * the debounced spinner state machine.
 */
async function stubBootstrapPrompt(page: Page, delayMs: number) {
  await page.route("**/api/bootstrap-prompt", async (route) => {
    if (delayMs > 0) await new Promise((r) => setTimeout(r, delayMs));
    await route.fulfill({
      status: 200,
      contentType: "text/markdown",
      body: "# About DevHub\n\nstub bootstrap prompt",
    });
  });
}

/**
 * Sample the new homepage hero copy button while the test-controlled API
 * request is in flight.
 */
async function recordButtonStateSamples(
  page: Page,
  durationMs: number,
  intervalMs = 25,
) {
  return page.evaluate(
    ({ duration, interval }) => {
      type Sample = {
        t: number;
        label: string | null;
        disabled: boolean;
        hasSpinner: boolean;
      };

      return new Promise<Array<Sample>>((resolve) => {
        const btn = document.querySelector<HTMLButtonElement>(
          'button[title="Copy agent prompt"]',
        );
        if (!btn) {
          resolve([]);
          return;
        }
        const samples: Array<Sample> = [];
        const start = performance.now();
        const sample = () => {
          samples.push({
            t: Math.round(performance.now() - start),
            label: (btn.textContent || "").trim(),
            disabled: btn.disabled,
            hasSpinner: Boolean(btn.querySelector("svg.animate-spin")),
          });
        };
        const id = window.setInterval(sample, interval);
        btn.click();
        sample();
        window.setTimeout(() => {
          window.clearInterval(id);
          resolve(samples);
        }, duration);
      });
    },
    { duration: durationMs, interval: intervalMs },
  );
}

test.describe("hero copy prompt button", () => {
  test("fast path: copies quickly and lands on copied state", async ({
    page,
  }) => {
    await setupClipboardMock(page);
    await stubBootstrapPrompt(page, 0);
    await page.goto("/");

    const samples = await recordButtonStateSamples(page, 1000);

    expect(samples.length).toBeGreaterThan(10);
    expect(samples.at(-1)?.label).toBe("Copied");
    expect(samples.at(-1)?.disabled).toBe(false);
    await expect(page.getByRole("button", { name: "Copied" })).toBeVisible();
    expect(
      await page.evaluate(
        () => (window as { __copiedText?: string }).__copiedText,
      ),
    ).toBe("# About DevHub\n\nstub bootstrap prompt");
  });

  test("slow path: disables the button and shows a spinner while the API request is pending", async ({
    page,
  }) => {
    await setupClipboardMock(page);
    await stubBootstrapPrompt(page, 500);
    await page.goto("/");

    const samples = await recordButtonStateSamples(page, 1200);

    const firstSpinner = samples.find((s) => s.disabled && s.hasSpinner);
    const firstCopied = samples.find(
      (s) => s.label === "Copied" && !s.disabled,
    );

    expect(
      firstSpinner,
      "spinner should appear while the bootstrap prompt is loading",
    ).toBeDefined();
    expect(
      firstCopied,
      "copy state should eventually transition to copied",
    ).toBeDefined();
    expect(firstCopied!.t).toBeGreaterThan(firstSpinner!.t);
  });
});
