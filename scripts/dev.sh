#!/usr/bin/env bash
# Loads .env.local into the process environment before launching `vercel dev`
# so env-driven feature flags (SHOW_DRAFTS, ...) reach the
# docusaurus dev command as well as Vercel Functions.
#
# Vercel's own .env.local loading only applies to Functions; the devCommand
# subprocess inherits the parent shell env, so we source it here.

set -e

ENV_FILE=".env.local"
if [ -f "$ENV_FILE" ]; then
  set -a
  # shellcheck disable=SC1090
  source "$ENV_FILE"
  set +a
fi

# Sync AppKit docs if not already present
node scripts/sync-appkit-docs.mjs

# The Vercel CLI version check fetches package info from registry.npmjs.org
# directly, ignoring the npm registry config. On Databricks machines that host
# is blocked via /etc/hosts (resolves to localhost), so the check crashes with
# ECONNREFUSED. Disable the update notifier to skip it.
export NO_UPDATE_NOTIFIER=1

exec vercel dev "$@"
