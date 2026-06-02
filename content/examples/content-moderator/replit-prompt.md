# Build a Content Moderation Console

Help the user build a Databricks-backed content moderation console: an internal app for reviewing submitted content, tracking moderation decisions, and analyzing policy violations.

## Data

Use the Databricks connector (or PAT fallback) to execute SQL against the user's SQL Warehouse.

Ask for:

- Unity Catalog catalog name
- Unity Catalog schema name
- SQL Warehouse, if not already configured by the connector

Create or reuse this table:

```sql
CREATE TABLE IF NOT EXISTS <catalog>.<schema>.moderation_submissions (
  submission_id STRING,
  content_text STRING,
  content_type STRING,
  source_channel STRING,
  submitted_by STRING,
  submitted_at TIMESTAMP,
  moderation_status STRING,
  policy_category STRING,
  severity STRING,
  model_score DOUBLE,
  reviewer STRING,
  reviewer_note STRING,
  reviewed_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

If the table is empty, offer to seed it with realistic demo submissions across multiple content types, policy categories, and moderation statuses.

## Additional Secrets

If the user wants Databricks Model Serving for automatic scoring, also ask for:

- `DATABRICKS_MODEL_SERVING_ENDPOINT` — the Model Serving endpoint URL.

Model Serving is opt-in; only configure it when the user explicitly asks for AI scoring.

## Features

Build a polished full-stack web app with:

- Moderation dashboard: pending reviews, approved/rejected counts, average severity, review throughput, policy category distribution
- Submission queue with search, filters, severity badges, policy category badges, and moderation status tabs
- Submission detail page with full content, model score, suggested category, reviewer decision controls, and reviewer notes
- Review workflow with approve, reject, escalate, and "needs more context" actions
- Analytics charts powered by SQL Warehouse queries
- Genie-powered analytics panel for questions like "Which policy categories are increasing?" and "Which reviewers have the longest queues?"
- Optional AI scoring flow using Databricks Model Serving when `DATABRICKS_MODEL_SERVING_ENDPOINT` is configured
- Empty states, loading states, clear connection/permission errors

## Build Order

1. Resolve Databricks access per the general routing above.
2. Verify warehouse access with `SELECT current_user()`.
3. Ask for catalog and schema.
4. Create or verify the `moderation_submissions` table.
5. Seed demo data if needed.
6. Build the moderation dashboard and submission queue.
7. Build the submission detail and review workflow.
8. Wire reads, writes, and analytics queries to Databricks SQL.
9. Add Genie conversational analytics when available.
10. Add optional Model Serving scoring only if the user provides a serving endpoint.
11. Run the app in Replit Preview.
12. Help the user deploy with Replit Deployments.

## Notes

If Model Serving fails or is unavailable, keep the moderation queue and SQL dashboard functional and ask whether to continue without AI scoring, configure a serving endpoint, or switch to manual-only moderation.
