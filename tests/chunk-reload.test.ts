import { afterEach, describe, expect, test, vi } from "vitest";
import { installChunkReload } from "../src/client/chunk-reload";

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

type Listener = (event: unknown) => void;

function setup(options: { docusaurusBooted?: boolean; readyState?: string }) {
  const reload = vi.fn();
  const windowListeners: Record<string, Listener[]> = {};
  const documentListeners: Record<string, Listener[]> = {};

  const win = {
    sessionStorage: fakeSessionStorage(),
    location: { reload },
    addEventListener: (type: string, cb: Listener) => {
      (windowListeners[type] ??= []).push(cb);
    },
  } as Record<string, unknown>;
  if (options.docusaurusBooted) win.docusaurus = {};

  const doc = {
    readyState: options.readyState ?? "loading",
    addEventListener: (type: string, cb: Listener) => {
      (documentListeners[type] ??= []).push(cb);
    },
  };

  vi.stubGlobal("window", win);
  vi.stubGlobal("document", doc);

  installChunkReload();

  return {
    reload,
    fireWindow: (type: string, event: unknown) =>
      windowListeners[type]?.forEach((cb) => cb(event)),
    fireDocument: (type: string, event: unknown) =>
      documentListeners[type]?.forEach((cb) => cb(event)),
  };
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("installChunkReload boot check", () => {
  test("reloads when the app never booted (window.docusaurus undefined)", () => {
    const { reload, fireDocument } = setup({ docusaurusBooted: false });
    fireDocument("DOMContentLoaded", {});
    expect(reload).toHaveBeenCalledTimes(1);
  });

  test("does not reload when the app booted normally", () => {
    const { reload, fireDocument } = setup({ docusaurusBooted: true });
    fireDocument("DOMContentLoaded", {});
    expect(reload).not.toHaveBeenCalled();
  });

  test("checks immediately when the DOM is already parsed", () => {
    const { reload } = setup({
      docusaurusBooted: false,
      readyState: "complete",
    });
    expect(reload).toHaveBeenCalledTimes(1);
  });
});

describe("installChunkReload asset error capture", () => {
  test("reloads on a failed hashed <script> load", () => {
    const { reload, fireWindow } = setup({ docusaurusBooted: true });
    fireWindow("error", {
      target: { tagName: "SCRIPT", src: "/assets/js/main.abc123.js" },
    });
    expect(reload).toHaveBeenCalledTimes(1);
  });

  test("reloads on a failed hashed <link> stylesheet load", () => {
    const { reload, fireWindow } = setup({ docusaurusBooted: true });
    fireWindow("error", {
      target: { tagName: "LINK", href: "/assets/css/styles.abc123.css" },
    });
    expect(reload).toHaveBeenCalledTimes(1);
  });

  test("ignores non-asset resource errors", () => {
    const { reload, fireWindow } = setup({ docusaurusBooted: true });
    fireWindow("error", {
      target: {
        tagName: "SCRIPT",
        src: "https://cdn.example.com/analytics.js",
      },
    });
    expect(reload).not.toHaveBeenCalled();
  });
});

describe("installChunkReload dynamic import rejection", () => {
  test("reloads on a ChunkLoadError rejection", () => {
    const { reload, fireWindow } = setup({ docusaurusBooted: true });
    const error = new Error("Loading chunk 5 failed.");
    error.name = "ChunkLoadError";
    fireWindow("unhandledrejection", { reason: error });
    expect(reload).toHaveBeenCalledTimes(1);
  });

  test("ignores unrelated rejections", () => {
    const { reload, fireWindow } = setup({ docusaurusBooted: true });
    fireWindow("unhandledrejection", {
      reason: new Error("validation failed"),
    });
    expect(reload).not.toHaveBeenCalled();
  });
});

describe("installChunkReload cooldown", () => {
  test("suppresses a second reload within the cooldown window", () => {
    vi.spyOn(Date, "now").mockReturnValue(1_000_000);
    const { reload, fireWindow } = setup({ docusaurusBooted: true });
    const error = new Error("boom");
    error.name = "ChunkLoadError";
    fireWindow("unhandledrejection", { reason: error });
    fireWindow("unhandledrejection", { reason: error });
    expect(reload).toHaveBeenCalledTimes(1);
  });

  test("reloads again once the cooldown elapses", () => {
    const now = vi.spyOn(Date, "now").mockReturnValue(1_000_000);
    const { reload, fireWindow } = setup({ docusaurusBooted: true });
    const error = new Error("boom");
    error.name = "ChunkLoadError";
    fireWindow("unhandledrejection", { reason: error });
    now.mockReturnValue(1_000_000 + 10_000);
    fireWindow("unhandledrejection", { reason: error });
    expect(reload).toHaveBeenCalledTimes(2);
  });
});
