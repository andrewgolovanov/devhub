# Build a Multi-Space Genie Analytics App

Help the user build a Databricks-backed multi-space Genie analytics app: an internal tool that lets users switch between multiple Databricks Genie spaces from one polished interface.

## Data

Use the Databricks connector for SQL verification and space context. Use Replit's Databricks Genie integration for each selected Genie space.

Ask for:

- the list of Genie spaces to include
- a short display name and description for each space
- Unity Catalog catalog/schema/table context for each space, if useful for previews
- SQL Warehouse, if not already configured by the connector

If the user has only one Genie space, mention that the multi-space UI is overkill for a single space and suggest building a single-Genie-space app instead, but continue if they still want the multi-space UI.

## Additional Secrets

If the user is on the PAT fallback path, also ask for:

- `DATABRICKS_GENIE_SPACE_IDS` — a comma-separated list of Genie space IDs to include. The user can list their Genie spaces with the Databricks CLI — for example, `databricks api get /api/2.0/genie/spaces` — and copy the IDs of the spaces they want to include.

## Features

Build a polished full-stack web app with:

- Space selector with names, descriptions, and badges for each analytics domain
- Genie chat panel that resets or scopes conversation state when the selected space changes
- Suggested question chips per space
- Optional table preview cards for the selected space's core tables
- Conversation history display for the current selected space
- Clear loading, empty, reconnect, and permission states
- Responsive layout that works well on desktop and mobile

## Build Order

1. Resolve Databricks access per the general routing above.
2. Verify warehouse access with `SELECT current_user()` when SQL previews are needed.
3. Ask for Genie spaces, display names, and optional table context.
4. Build the multi-space selector and page shell.
5. Wire each space to the Genie chat panel.
6. Add suggested questions, per-space context, and error states.
7. Run the app in Replit Preview.
8. Help the user deploy with Replit Deployments.

## Notes

For multi-space failures: also offer to remove the failing space or continue with the remaining spaces (in addition to the standard "use a different space" option from the preamble's permission handling).
