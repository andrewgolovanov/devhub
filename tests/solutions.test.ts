import { describe, expect, test } from "vitest";
import {
  isLinkedSolutionItem,
  isNativeSolutionItem,
  nativeSolutionItems,
  buildSolutionItems,
  solutionItems,
  type LinkedSolutionItem,
} from "../src/lib/solutions/solution-items";

describe("solutions registry", () => {
  test("every solution is exactly native or linked", () => {
    for (const solution of solutionItems) {
      const native = isNativeSolutionItem(solution);
      const linked = isLinkedSolutionItem(solution);
      expect(native || linked).toBe(true);
      expect(native && linked).toBe(false);
    }
  });

  test("partitions match the discriminator", () => {
    const linkedSolutions = solutionItems.filter(isLinkedSolutionItem);
    expect(nativeSolutionItems.length + linkedSolutions.length).toBe(
      solutionItems.length,
    );
    for (const s of nativeSolutionItems) expect(s.type).toBe("native");
    for (const s of linkedSolutions) expect(s.type).toBe("linked");
  });

  test("ids are unique across native and linked solutions", () => {
    const ids = solutionItems.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test("linked solutions point to absolute https urls and have rich metadata", () => {
    const linkedSolutions = solutionItems.filter(isLinkedSolutionItem);
    expect(linkedSolutions.length).toBeGreaterThan(0);
    for (const solution of linkedSolutions) {
      expect(solution.href).toMatch(/^https:\/\//);
      expect(solution.title.length).toBeGreaterThan(0);
      expect(solution.description.length).toBeGreaterThan(0);
      expect(solution.tags.length).toBeGreaterThan(0);
      expect(solution.source.length).toBeGreaterThan(0);
      expect(solution.previewImage).toMatch(
        /^\/img\/solutions\/.+\.(png|jpe?g|webp)$/,
      );
      expect(solution.previewImageAlt.length).toBeGreaterThan(0);
      expect(solution.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  test("native solutions never carry linked-only metadata", () => {
    for (const solution of nativeSolutionItems) {
      const linkedOnlyKeys: Array<keyof LinkedSolutionItem> = ["href"];
      for (const key of linkedOnlyKeys) {
        expect(key in solution).toBe(false);
      }
    }
  });

  test("native solutions carry author and date metadata", () => {
    for (const solution of nativeSolutionItems) {
      expect(solution.authors.length).toBeGreaterThan(0);
      expect(solution.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  test("solutions are ordered newest-first when sorted by publishedAt", () => {
    const dates = buildSolutionItems().map((s) => s.publishedAt);
    const sorted = [...dates].sort((a, b) => b.localeCompare(a));
    expect(dates).toEqual(sorted);
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1] >= sorted[i]).toBe(true);
    }
  });

  test("type guards narrow correctly at compile and runtime", () => {
    const sample = solutionItems[0];
    if (isLinkedSolutionItem(sample)) {
      expect(typeof sample.href).toBe("string");
    } else if (isNativeSolutionItem(sample)) {
      expect(sample.type).toBe("native");
    } else {
      throw new Error("Solution did not satisfy either guard");
    }
  });
});
