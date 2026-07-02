import { readFileSync, statSync } from "node:fs";
import { gzipSync } from "node:zlib";

import { build } from "esbuild";

const sourcePath = "src/components/home/hero/player.source.js";
const outputPath = "public/js/home-hero-player.js";

await build({
  entryPoints: [sourcePath],
  outfile: outputPath,
  bundle: false,
  minify: true,
  legalComments: "none",
  banner: {
    js: "// fallow-ignore-file unused-file\n// Generated from src/components/home/hero/player.source.js.",
  },
  target: "es2020",
});

const sourceBytes = statSync(sourcePath).size;
const outputBytes = statSync(outputPath).size;
const gzipBytes = gzipSync(readFileSync(outputPath)).length;

console.log(
  `Built ${outputPath}: ${outputBytes} bytes (${gzipBytes} gzip), from ${sourceBytes} bytes source.`,
);
