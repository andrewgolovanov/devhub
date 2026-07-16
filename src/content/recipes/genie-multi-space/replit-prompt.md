# Build a Multi-Agent Genie Analytics App

Help the user build a Databricks-backed multi-agent Genie analytics app: an internal tool that lets users switch between multiple Databricks Genie Agents from one polished interface.

## Data

Use the Databricks connector for SQL verification and Genie Agent context. Use Replit's Databricks Genie integration for each selected Genie Agent.

Ask for:

- the list of Genie Agents to include
- a short display name and description for each Genie Agent
- Unity Catalog catalog/schema/table context for each Genie Agent, if useful for previews
- SQL Warehouse, if not already configured by the connector

If the user has only one Genie Agent, mention that the multi-agent UI is overkill for a single Genie Agent and suggest building a single-agent Genie app instead, but continue if they still want the multi-agent UI.

## Additional Secrets

If the user is on the PAT fallback path, also ask for:

- `DATABRICKS_GENIE_SPACE_IDS` — a comma-separated list of Genie Agent IDs to include. The user can list their Genie Agents with the Databricks CLI — for example, `databricks api get /api/2.0/genie/spaces` — and copy the IDs of the Genie Agents they want to include.

## Features

Build a polished full-stack web app with:

- Agent selector with names, descriptions, and badges for each analytics domain
- Genie chat panel that resets or scopes conversation state when the selected agent changes
- Suggested question chips per agent
- Optional table preview cards for the selected agent's core tables
- Conversation history display for the current selected agent
- Clear loading, empty, reconnect, and permission states
- Responsive layout that works well on desktop and mobile

## Build Order

1. Resolve Databricks access per the general routing above.
2. Verify warehouse access with `SELECT current_user()` when SQL previews are needed.
3. Ask for Genie Agents, display names, and optional table context.
4. Build the multi-agent selector and page shell.
5. Wire each agent to the Genie chat panel.
6. Add suggested questions, per-agent context, and error states.
7. Run the app in Replit Preview.
8. Help the user deploy with Replit Deployments.

## Notes

For multi-agent failures: also offer to remove the failing agent or continue with the remaining agents (in addition to the standard "use a different Genie Agent" option from the preamble's permission handling).
