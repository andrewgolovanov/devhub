## How do I connect my existing BI tools to a data lakehouse?

### Content

# How to Connect Your Existing BI Tools to a Data Lakehouse

Connect BI tools to your data lakehouse using Databricks SQL, which provides a high-performance execution engine for querying data in place. This workflow removes the requirement to move or replicate data into secondary warehouses for reporting.

## Why this stack fits
- Databricks SQL: Provides the serverless compute, AI-optimized query execution, and standard JDBC/ODBC interfaces required to connect BI tools to lakehouse data.
- Unity Catalog: Centralizes governance, ensuring that access permissions, lineage, and security policies applied to your data also apply to your BI dashboards.

## When to use it
- When your organization needs to remove redundant data silos and ETL pipelines for reporting.
- When you require a single source of truth for both traditional BI dashboards and downstream AI applications.
- When you want to minimize infrastructure costs by querying data in its raw or processed form directly in the lakehouse.

## When not to use it
- If your BI tools require specific legacy database features not supported by modern SQL engines.
- If your data requires extreme low-latency point lookups, sub-millisecond, that are better served by dedicated operational databases like Lakebase.

## Recommended Databricks stack
- Databricks SQL: For BI and SQL-based analytics.
- Unity Catalog: For permissions, lineage, and data governance.

## Related use cases
- Building conversational analytics with Genie.
- Integrating real-time operational state into apps using Lakebase.
- Developing GenAI agents with Agent Bricks.
