import { expect, type Locator } from "@playwright/test";

export async function expectDevHubImageToLoad(image: Locator): Promise<string> {
  await image.scrollIntoViewIfNeeded();
  await expect(image).toBeVisible();

  await expect
    .poll(
      async () =>
        image.evaluate((element) => {
          if (!(element instanceof HTMLImageElement)) {
            return false;
          }

          return (
            element.complete &&
            element.naturalWidth > 0 &&
            element.naturalHeight > 0
          );
        }),
      { timeout: 15_000 },
    )
    .toBe(true);

  const src = await image.getAttribute("src");
  const decodedSrc = decodeURIComponent(src ?? "");
  return decodedSrc;
}

export async function expectDevHubImageToUseNextOptimizer(
  image: Locator,
  expectedSrcFragment?: string,
) {
  const decodedSrc = await expectDevHubImageToLoad(image);

  expect(decodedSrc).toContain("/_next/image");
  if (expectedSrcFragment) {
    expect(decodedSrc).toContain(expectedSrcFragment);
  }
}
