import { afterEach, describe, expect, test, vi } from "vitest";
import {
  installChunkReloadHandler,
  isChunkLoadError,
  reloadOnce,
} from "../src/client/chunk-reload";

function fakeSessionStorage(): Storage {
  const store = new Map<string, string>();
  return {
    getItem: (key) => store.get(key) ?? null,
    setItem: (key, value) => void store.set(key, String(value)),
    removeItem: (key) => void store.delete(key),
    clear: () => store.clear(),
    key: (index) => [...store.keys()][index] ?? null,
    get length() {
      return store.size;
    },
  };
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("isChunkLoadError", () => {
  test.each([
    ["webpack ChunkLoadError by name", "boom", "ChunkLoadError"],
    ["webpack JS chunk message", "Loading chunk 42 failed.", "Error"],
    ["webpack CSS chunk message", "Loading CSS chunk 7 failed.", "Error"],
    [
      "native dynamic import (Chrome)",
      "Failed to fetch dynamically imported module: https://x/y.js",
      "TypeError",
    ],
    [
      "native dynamic import (Firefox)",
      "error loading dynamically imported module",
      "Error",
    ],
    [
      "native dynamic import (Safari)",
      "Importing a module script failed.",
      "TypeError",
    ],
  ])("matches %s", (_label, message, name) => {
    const error = new Error(message);
    error.name = name;
    expect(isChunkLoadError(error)).toBe(true);
  });

  test("ignores unrelated errors", () => {
    expect(isChunkLoadError(new TypeError("x is not a function"))).toBe(false);
    expect(isChunkLoadError(new Error("Network request failed"))).toBe(false);
  });

  test("ignores non-Error values", () => {
    expect(isChunkLoadError(undefined)).toBe(false);
    expect(isChunkLoadError("ChunkLoadError")).toBe(false);
    expect(isChunkLoadError({ name: "ChunkLoadError" })).toBe(false);
  });
});

describe("reloadOnce", () => {
  test("reloads when no prior reload is recorded", () => {
    const reload = vi.fn();
    vi.stubGlobal("sessionStorage", fakeSessionStorage());
    vi.stubGlobal("window", { location: { reload } });

    reloadOnce();

    expect(reload).toHaveBeenCalledTimes(1);
  });

  test("suppresses a second reload inside the cooldown window", () => {
    const reload = vi.fn();
    vi.stubGlobal("sessionStorage", fakeSessionStorage());
    vi.stubGlobal("window", { location: { reload } });
    vi.spyOn(Date, "now").mockReturnValue(1_000_000);

    reloadOnce();
    reloadOnce();

    expect(reload).toHaveBeenCalledTimes(1);
  });

  test("reloads again once the cooldown has elapsed", () => {
    const reload = vi.fn();
    vi.stubGlobal("sessionStorage", fakeSessionStorage());
    vi.stubGlobal("window", { location: { reload } });
    const now = vi.spyOn(Date, "now").mockReturnValue(1_000_000);

    reloadOnce();
    now.mockReturnValue(1_000_000 + 10_000);
    reloadOnce();

    expect(reload).toHaveBeenCalledTimes(2);
  });
});

describe("installChunkReloadHandler", () => {
  function setup() {
    const listeners: Record<string, EventListener[]> = {};
    const reload = vi.fn();
    const target = {
      addEventListener: (type: string, cb: EventListener) => {
        (listeners[type] ??= []).push(cb);
      },
      location: { reload },
    };
    vi.stubGlobal("sessionStorage", fakeSessionStorage());
    vi.stubGlobal("window", target);
    installChunkReloadHandler(target as unknown as Window);
    const dispatch = (type: string, event: unknown) =>
      listeners[type]?.forEach((cb) => cb(event as Event));
    return { dispatch, reload };
  }

  test("reloads on an unhandled ChunkLoadError rejection", () => {
    const { dispatch, reload } = setup();
    const error = new Error("Loading chunk 5 failed.");
    error.name = "ChunkLoadError";

    dispatch("unhandledrejection", { reason: error });

    expect(reload).toHaveBeenCalledTimes(1);
  });

  test("ignores unhandled rejections that are not chunk errors", () => {
    const { dispatch, reload } = setup();

    dispatch("unhandledrejection", { reason: new Error("validation failed") });

    expect(reload).not.toHaveBeenCalled();
  });

  test("reloads on a chunk error surfaced via the error event", () => {
    const { dispatch, reload } = setup();
    const error = new Error("Loading CSS chunk 9 failed.");
    error.name = "ChunkLoadError";

    dispatch("error", { error, target: null });

    expect(reload).toHaveBeenCalledTimes(1);
  });
});
