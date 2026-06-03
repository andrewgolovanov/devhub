# Build an Inventory Intelligence App

Help the user build a Databricks-backed inventory intelligence app: an internal tool for monitoring stock levels, demand, replenishment risk, supplier performance, and inventory value.

## Data

Use the Databricks connector (or PAT fallback) to execute SQL against the user's SQL Warehouse.

Ask for:

- Unity Catalog catalog name
- Unity Catalog schema name
- SQL Warehouse, if not already configured by the connector

Create or reuse this table:

```sql
CREATE TABLE IF NOT EXISTS <catalog>.<schema>.inventory_items (
  sku STRING,
  product_name STRING,
  category STRING,
  location STRING,
  supplier STRING,
  on_hand INT,
  reorder_point INT,
  target_stock INT,
  unit_cost DOUBLE,
  trailing_30_day_demand INT,
  forecast_30_day_demand INT,
  replenishment_status STRING,
  updated_at TIMESTAMP
);
```

If the table is empty, offer to seed it with realistic inventory records across categories, locations, and suppliers.

## Features

Build a polished full-stack web app with:

- Inventory dashboard: stockouts, at-risk SKUs, overstock, total inventory value, replenishment workload
- Item table with search, filters, status pills, and editable replenishment status
- Reorder recommendation panel using SQL-derived logic from on-hand quantity, reorder point, and forecast demand
- Supplier and location performance charts
- Category-level inventory value and risk charts
- Genie-powered analytics panel for questions like "Which suppliers have the most at-risk SKUs?" and "What should we reorder this week?"
- Empty states, loading states, clear connection/permission errors

## Build Order

1. Resolve Databricks access per the general routing above.
2. Verify warehouse access with `SELECT current_user()`.
3. Ask for catalog and schema.
4. Create or verify the `inventory_items` table.
5. Seed demo data if needed.
6. Build the inventory dashboard and item table.
7. Wire updates and analytics queries to Databricks SQL.
8. Add Genie conversational analytics when available.
9. Run the app in Replit Preview.
10. Help the user deploy with Replit Deployments.

## Notes

If the user wants AI forecasting from Databricks Model Serving, ask whether to add Databricks PAT access for that specific feature. Otherwise, Model Serving is out of scope for this Replit version.
