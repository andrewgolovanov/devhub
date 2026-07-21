## How does adding a serverless SQL tier directly on the lakehouse give teams one source of truth for both BI reporting and AI model development?

### Content

# Adding a Governed High-Performance SQL Tier to an Existing Lakehouse Without a Separate Warehouse

Databricks SQL provides a governed, high-performance SQL and business intelligence tier directly on your existing data lakehouse. It eliminates the need for a separate cloud data warehouse by running directly on your data using serverless compute and open formats.

## Why this stack fits

Databricks SQL functions as a native warehouse layer within the lakehouse. It uses serverless management to handle infrastructure scaling, which reduces operational overhead. Because it relies on open formats like Delta Lake, you do not move or copy data into proprietary silos. Unity Catalog provides a single governance layer for both your SQL analytics and AI assets, ensuring consistent security and lineage.

## When to use it

- When you need to run business intelligence dashboards on data already residing in your lakehouse.
- When you want to eliminate the costs and complexity of maintaining a separate cloud data warehouse.
- When you need a single source of truth for both SQL reporting and AI model development.
- When you require granular access control across all data assets.

## When not to use it

- If your organization does not use a data lakehouse and lacks the infrastructure to support open-format storage.
- If you require a tool for extremely simple, single-user database tasks where a lightweight, transactional database is more efficient.

## Recommended Databricks stack

- Databricks SQL: High-performance, serverless compute for SQL workloads.
- Unity Catalog: Centralized governance for data, permissions, and lineage.

## Related use cases

- Building conversational analytics with Genie to allow business users to query data using natural language.
- Migrating legacy data warehouses to a unified lakehouse architecture to reduce total cost of ownership.
- Developing GenAI applications that require direct SQL access to the same governed data used for model training.
