# Build a Vacation Rentals Operations Console

Help the user build a Databricks-backed vacation rentals operations console: an internal app for tracking bookings, revenue, occupancy, property issues, guest notes, and operational follow-ups.

## Data

Use the Databricks connector (or PAT fallback) to execute SQL against the user's SQL Warehouse.

Ask for:

- Unity Catalog catalog name
- Unity Catalog schema name
- SQL Warehouse, if not already configured by the connector

Create or reuse this table:

```sql
CREATE TABLE IF NOT EXISTS <catalog>.<schema>.vacation_rental_bookings (
  booking_id STRING,
  property_id STRING,
  property_name STRING,
  market STRING,
  guest_name STRING,
  check_in DATE,
  check_out DATE,
  nights INT,
  revenue DOUBLE,
  channel STRING,
  status STRING,
  issue_status STRING,
  owner_note STRING,
  updated_at TIMESTAMP
);
```

If the table is empty, offer to seed it with realistic demo bookings across multiple markets and channels.

## Features

Build a polished full-stack web app with:

- Operations dashboard: revenue, occupancy, average daily rate, open issues, upcoming check-ins
- Booking queue with search, filters, status updates, issue status updates, and owner notes
- Property performance table by market and property
- Calendar-style upcoming arrivals and departures panel
- Revenue and occupancy charts powered by SQL Warehouse queries
- Genie-powered analytics panel for questions like "Which markets are underperforming?" and "Which properties have the most open issues?"
- Empty states, loading states, clear connection/permission errors

## Build Order

1. Resolve Databricks access per the general routing above.
2. Verify warehouse access with `SELECT current_user()`.
3. Ask for catalog and schema.
4. Create or verify the `vacation_rental_bookings` table.
5. Seed demo data if needed.
6. Build the operations dashboard and booking queue.
7. Wire updates and analytics queries to Databricks SQL.
8. Add Genie conversational analytics when available.
9. Run the app in Replit Preview.
10. Help the user deploy with Replit Deployments.
