// When DevHub is redeployed, its content-hashed JS/CSS chunks get new
// filenames and the old files stop existing at the production domain. A tab
// left open across a deploy then 404s when it lazy-loads a route chunk, which
// surfaces as a ChunkLoadError and triggers Docusaurus's "site did not load
// properly" fallback (misleadingly blaming baseUrl). Recover transparently by
// reloading the page so the browser fetches the current deployment's assets.
//
// Why not Vercel Skew Protection? Docusaurus is not a zero-config Skew
// Protection framework (only Next.js, SvelteKit, Qwik, Astro, and Nuxt are), so
// it never attaches a ?dpl= deployment ID to its <script>/<link> or dynamic
// import chunk requests. The only signal that works for its tag-based asset
// loads is the __vdpl cookie set in middleware, but that pins document
// navigations too, trapping users on a stale deployment until it ages past
// max-age (then it 404s again). Dashboard-only enablement is effectively a
// no-op here: without a dpl signal on asset requests the production domain
// still 404s old chunks. This reload fallback already removes the user-visible
// symptom, so Skew Protection would only save a single reload flash at the cost
// of real complexity and staleness risk. Not worth it for a docs site.

const LAST_RELOAD_KEY = "devhub:chunk-reload-at";

// Cooldown between auto-reloads. A genuine stale-tab failure is fixed by a
// single reload, so a second failure inside this window means the asset is
// actually broken (not just stale) and we must stop to avoid a reload loop.
const RELOAD_COOLDOWN_MS = 10_000;

// Equivalent to @docusaurus/ExecutionEnvironment, inlined so this module is
// importable in plain Node (tests) without Docusaurus's webpack alias.
const canUseDOM =
  typeof window !== "undefined" &&
  typeof window.document !== "undefined" &&
  typeof window.document.createElement !== "undefined";

export function isChunkLoadError(reason: unknown): boolean {
  if (!(reason instanceof Error)) return false;
  const name = reason.name || "";
  const message = reason.message || "";
  return (
    name === "ChunkLoadError" ||
    /Loading (CSS )?chunk [\w-]+ failed/i.test(message) ||
    /error loading dynamically imported module/i.test(message) ||
    /failed to fetch dynamically imported module/i.test(message) ||
    /importing a module script failed/i.test(message)
  );
}

export function reloadOnce(): void {
  const lastReloadAt = Number(sessionStorage.getItem(LAST_RELOAD_KEY) || 0);
  if (Date.now() - lastReloadAt < RELOAD_COOLDOWN_MS) return;
  sessionStorage.setItem(LAST_RELOAD_KEY, String(Date.now()));
  window.location.reload();
}

export function installChunkReloadHandler(target: Window): void {
  target.addEventListener("unhandledrejection", (event) => {
    if (isChunkLoadError(event.reason)) reloadOnce();
  });

  target.addEventListener(
    "error",
    (event) => {
      if (isChunkLoadError(event.error)) {
        reloadOnce();
        return;
      }
      // Failed <script>/<link> resource loads don't bubble, so they only reach
      // this listener in the capture phase and carry no Error object.
      const element = event.target;
      if (
        element instanceof HTMLScriptElement ||
        element instanceof HTMLLinkElement
      ) {
        reloadOnce();
      }
    },
    true,
  );
}

if (canUseDOM) {
  installChunkReloadHandler(window);
}
