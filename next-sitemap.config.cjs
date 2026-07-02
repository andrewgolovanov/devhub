require("tsx/cjs");

const { resolveSiteUrl } = require("./src/lib/site-url.ts");

const siteUrl = resolveSiteUrl(process.env);

const trailingSlashLocs = new Set([
  "/docs/appkit/v0",
  "/docs/appkit/v0/api",
  "/docs/appkit/v0/api/appkit",
  "/docs/appkit/v0/api/appkit-ui",
  "/docs/appkit/v0/development",
  "/docs/appkit/v0/plugins",
  "/solutions",
  "/templates",
]);

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  exclude: ["/hackathon", "/hackathon/*"],
  transform: async (config, path) => ({
    loc: path,
    changefreq: config.changefreq,
    priority: config.priority,
    lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    trailingSlash: trailingSlashLocs.has(path),
  }),
};
