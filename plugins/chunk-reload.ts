import type { Plugin } from "@docusaurus/types";
import { installChunkReload } from "../src/client/chunk-reload";

/**
 * Injects installChunkReload as an inline <head> script on every page.
 *
 * It must be inline (not a clientModule bundled into the hashed app JS) so it
 * still runs when a stale tab's hashed bundles 404 after a redeploy -- the
 * exact case that shows Docusaurus's "site did not load properly" banner. A
 * clientModule would live inside the 404'd file and never execute.
 *
 * See src/client/chunk-reload.ts for the self-containment constraints.
 */
export default function chunkReloadPlugin(): Plugin {
  return {
    name: "docusaurus-chunk-reload",
    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: "script",
            innerHTML: ";(" + installChunkReload.toString() + ")();",
          },
        ],
      };
    },
  };
}
