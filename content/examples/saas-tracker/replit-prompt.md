# Build a SaaS Subscription Tracker

Help the user build a Databricks-backed SaaS Subscription Tracker: an internal app for tracking SaaS tools, owners, costs, billing cycles, status, categories, and renewal dates.

## Data

Use the Databricks connector (or PAT fallback) to execute SQL against the user's SQL Warehouse.

Ask for:

- Unity Catalog catalog name
- Unity Catalog schema name
- SQL Warehouse, if not already configured by the connector

Create or reuse this table:

```sql
CREATE TABLE IF NOT EXISTS <catalog>.<schema>.subscriptions (
  id STRING,
  name STRING,
  vendor STRING,
  category STRING,
  owner STRING,
  cost DOUBLE,
  billing_cycle STRING,
  status STRING,
  renewal_date DATE,
  notes STRING,
  created_at TIMESTAMP
);
```

If the table is empty, offer to seed it with realistic demo subscriptions.

## Features

Build a polished full-stack web app with:

- Dashboard: total monthly spend, annualized spend, renewals due soon, active subscriptions, spend by category
- Genie-powered conversational analytics panel for questions like "Which renewals are coming up this month?" and "Which teams have the highest SaaS spend?"
- Subscription table with search and filters
- Add/edit/delete subscription flow
- Renewal timeline
- Category and owner breakdown charts
- Empty states, loading states, clear error handling

## Build Order

1. Resolve Databricks access per the general routing above.
2. Verify warehouse access with `SELECT current_user()`.
3. Ask for catalog and schema.
4. Create or verify the `subscriptions` table.
5. Seed demo data if needed.
6. Build the app UI.
7. Wire CRUD and analytics queries to Databricks SQL.
8. Add Genie conversational analytics when available.
9. Run the app in Replit Preview.
10. Help the user deploy with Replit Deployments.

## Notes

Genie is the preferred path for conversational analytics. If Replit's Databricks Genie integration is unavailable, keep the SQL dashboard functional and ask the user whether to configure Genie access, continue without it, or switch to the original Databricks DevHub workflow.
