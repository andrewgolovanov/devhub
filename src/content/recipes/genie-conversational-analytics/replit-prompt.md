# Add Genie Conversational Analytics to a Replit App

Help the user add a Databricks Genie conversational analytics panel to a Replit app that already reads from Unity Catalog. Scope is intentionally narrow: this recipe adds the chat panel and a few small affordances around it — it does NOT build a full analytics dashboard.

## Data

Use the Databricks connector for SQL verification of the existing tables, and use Replit's Databricks Genie integration to power the chat panel.

Ask for:

- which Unity Catalog catalog/schema/tables the app already reads from
- the Genie Agent to use for natural-language questions
- SQL Warehouse, if not already configured by the connector

If the user does not already have a Genie Agent, ask whether to continue without conversational analytics, configure a Genie Agent in Databricks first, or use the PAT fallback for direct Genie API access if available.

## Additional Secrets

If the user is on the PAT fallback path and wants direct Genie API access, also ask for:

- `DATABRICKS_GENIE_SPACE_ID` — the Genie Agent ID to use for conversational analytics. The user can list their Genie Agents with the Databricks CLI — for example, `databricks api get /api/2.0/genie/spaces` — and copy the ID of the space they want to use.

## Features

Add this to the existing app:

- A Genie chat panel for natural-language analytics questions over the configured tables
- Suggested-question chips generated from the selected tables (rendered above the chat input)
- SQL preview or citations beneath each Genie answer when the answer is query-backed
- Conversation history for the current session (the panel resets when the user navigates away)
- Empty state, loading state, and clear permission/error states for the panel

The panel should integrate into the existing app's layout (sidebar, modal, drawer, or dedicated route) without restyling the rest of the app.

## Build Order

1. Resolve Databricks access per the general routing above.
2. Verify warehouse access with `SELECT current_user()`.
3. Ask for the existing tables and the Genie Agent.
4. Add the Genie chat panel component and wire it into the existing app's layout.
5. Add suggested-question chips generated from the configured tables.
6. Add SQL preview/citations beneath query-backed answers.
7. Run the app in Replit Preview.
8. Help the user verify the panel against their existing app's flow.
