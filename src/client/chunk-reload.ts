// When DevHub is redeployed, its content-hashed JS/CSS bundles get new
// filenames and the old files stop existing at the production domain. A tab
// left open across a deploy then 404s on those assets. On the homepage this
// triggers Docusaurus's "site did not load properly" banner (misleadingly
// blaming baseUrl), rendered unstyled because the CSS 404'd too. Recover by
// reloading onto the current deployment.
//
// IMPORTANT: installChunkReload is serialized with .toString() and injected as
// an inline <head> script by plugins/chunk-reload.ts. It therefore must be
// fully self-contained (no imports, no module-scope references) and use only
// browser globals, so that it still runs even when the hashed app bundle
// itself fails to load -- a clientModule would be bundled into that 404'd file
// and never execute. Keep the body to conservative ES (no optional chaining /
// nullish coalescing / spread) so transpilation never injects runtime helpers
// into the inlined source.
//
// Why not Vercel Skew Protection? Docusaurus is not a zero-config Skew
// Protection framework, so it never attaches a ?dpl= deployment ID to its
// asset requests. The only signal that works for its tag-based loads is the
// __vdpl cookie, which pins document navigations too and traps users on a
// stale deployment until it ages past max-age. This inline reload is simpler
// and has no staleness risk.

export function installChunkReload(): void {
  var RELOAD_KEY = "devhub:chunk-reload-at";
  var COOLDOWN_MS = 10000;

  function reloadOnce(): void {
    var now = Date.now();
    var last = 0;
    try {
      last = Number(window.sessionStorage.getItem(RELOAD_KEY)) || 0;
    } catch (e) {
      last = 0;
    }
    if (now - last < COOLDOWN_MS) return;
    try {
      window.sessionStorage.setItem(RELOAD_KEY, String(now));
    } catch (e) {
      // sessionStorage unavailable (private mode); reload anyway, once.
    }
    window.location.reload();
  }

  function isStaleAsset(url: unknown): boolean {
    return typeof url === "string" && url.indexOf("/assets/") !== -1;
  }

  // Capture phase: failed <script>/<link> loads do not bubble. Catches the
  // hashed bundle/stylesheet 404s directly.
  window.addEventListener(
    "error",
    function (event: Event): void {
      var el = event.target as HTMLScriptElement & HTMLLinkElement;
      if (!el || !el.tagName) return;
      var tag = el.tagName.toUpperCase();
      if (tag !== "SCRIPT" && tag !== "LINK") return;
      if (isStaleAsset(el.src) || isStaleAsset(el.href)) reloadOnce();
    },
    true,
  );

  // Post-boot route chunk failures surface as rejected dynamic imports.
  window.addEventListener(
    "unhandledrejection",
    function (event: PromiseRejectionEvent): void {
      var reason = event.reason;
      var name = reason && reason.name ? reason.name : "";
      var message = reason && reason.message ? reason.message : "";
      if (
        name === "ChunkLoadError" ||
        /Loading (CSS )?chunk [\w-]+ failed/i.test(message) ||
        /dynamically imported module/i.test(message)
      ) {
        reloadOnce();
      }
    },
  );

  // Primary boot-failure signal, mirroring Docusaurus's own BaseUrlIssueBanner
  // check: if the client bundle never set window.docusaurus by the time the DOM
  // is ready, an asset failed to load -- recover by reloading.
  function checkBoot(): void {
    var w = window as unknown as { docusaurus?: unknown };
    if (typeof w.docusaurus === "undefined") reloadOnce();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", checkBoot);
  } else {
    checkBoot();
  }
}
