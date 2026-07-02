# Build a Genie Analytics App

Help the user build a Databricks-backed Genie analytics app: a full internal app over Unity Catalog data with a SQL KPI dashboard, table previews, a Genie chat panel, and saved questions.

## Data

Use the Databricks connector for SQL verification and table previews. Use Replit's Databricks Genie integration for the conversational analytics panel.

Ask for:

- Unity Catalog catalog name
- Unity Catalog schema name
- the primary table(s) to analyze
- the Genie space (or table set) to use for natural-language questions
- SQL Warehouse, if not already configured by the connector

If the user does not already have a Genie space, ask whether they want to continue with SQL-only dashboard and previews, configure a Genie space in Databricks first, or use the PAT fallback for direct Genie API access if available.

## Additional Secrets

If the user is on the PAT fallback path and wants direct Genie API access, also ask for:

- `DATABRICKS_GENIE_SPACE_ID` — the Genie space ID to use for conversational analytics. The user can list their Genie spaces with the Databricks CLI — for example, `databricks api get /api/2.0/genie/spaces` — and copy the ID of the space they want to use.

## Features

Build a polished full-stack web app with:

- Multi-tab layout: **Dashboard**, **Tables**, **Ask Genie**, **History**
- Dashboard tab with SQL-driven KPI cards, trend charts, and a free-form filter row
- Tables tab with one preview card per selected table: row count, freshness, schema, and sample rows
- Ask Genie tab with a chat panel for natural-language analytics questions, suggested-question chips generated from the selected tables, and SQL preview/citations when Genie returns query-backed answers
- History tab listing the current session's Genie conversations with the ability to re-run a question or copy its SQL
- A persistent saved-questions sidebar in the Ask Genie tab (kept in browser local storage; no extra Databricks tables required)
- Shareable conversation links so a teammate can open the same question with the same Genie answer
- Empty states, loading states, reconnect states, and clear connection/permission errors

## Build Order

1. Resolve Databricks access per the general routing above.
2. Verify warehouse access with `SELECT current_user()`.
3. Ask for catalog, schema, tables, and Genie space.
4. Build the app shell with the four tabs and shared navigation.
5. Build the Tables tab (preview cards) backed by SQL warehouse queries.
6. Build the Dashboard tab (KPI cards + trend charts) backed by SQL warehouse queries.
7. Add the Genie conversational analytics panel in the Ask Genie tab, with suggested-question chips and SQL preview/citations.
8. Add the History tab and the saved-questions sidebar (local storage).
9. Add shareable conversation links.
10. Run the app in Replit Preview.
11. Help the user deploy with Replit Deployments.
