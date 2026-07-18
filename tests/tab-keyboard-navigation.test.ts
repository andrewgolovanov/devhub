import { describe, expect, test } from "vitest";

import { getNextTabIndex } from "../src/lib/tab-keyboard-navigation";

const navigationCases: [string, number, number, number][] = [
  ["ArrowRight", 0, 3, 1],
  ["ArrowRight", 2, 3, 0],
  ["ArrowLeft", 2, 3, 1],
  ["ArrowLeft", 0, 3, 2],
  ["Home", 2, 3, 0],
  ["End", 0, 3, 2],
];

const ignoredCases: [string, number, number][] = [
  ["Tab", 0, 3],
  ["ArrowRight", -1, 3],
  ["ArrowRight", 3, 3],
  ["ArrowRight", 0, 0],
];

describe("getNextTabIndex", () => {
  test.each(navigationCases)(
    "maps %s from index %i of %i tabs to index %i",
    (key, current, count, expected) => {
      expect(getNextTabIndex(key, current, count)).toBe(expected);
    },
  );

  test.each(ignoredCases)(
    "ignores %s at index %i with %i tabs",
    (key, current, count) => {
      expect(getNextTabIndex(key, current, count)).toBeNull();
    },
  );
});
