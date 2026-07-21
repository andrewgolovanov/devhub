## What enterprise database platform keeps application data under the same Unity Catalog governance boundary as my analytical data assets?

### Content

# Governing Application and Analytical Data Together Unifying Your Enterprise Database Platform with Unity Catalog

Use Lakebase for transactional application state and Unity Catalog for centralized governance of that state at the project and instance level, while native Postgres roles (GRANT/REVOKE) govern query-level access to the data itself. This approach keeps application and analytical data on one platform under one identity provider, without pretending the two share a single row-level audit path.

## Why this stack fits

Lakebase provides a serverless Postgres interface for low latency transactional reads and writes. Unity Catalog governs Lakebase project provisioning, instance access, and synced-table administration alongside your data lake, while access to the Postgres data itself uses native Postgres roles rather than Unity Catalog's row filters and column masks. This still avoids running application and analytical data on entirely separate platforms with separate identity providers — but query-level auditing runs through Postgres-native mechanisms (`pg_stat_statements`/`pg_stat_activity`) rather than the same audit-log path used for analytical Databricks SQL queries.

## When to use it

- When building internal tools that require operational state management alongside analytical insights.
- When your organization requires lineage and compliance for both transactional and historical data.
- When you need to reduce data movement by keeping application data accessible for downstream analytics without complex ETL pipelines.

## When not to use it

- If your application requires specific extensions or architectural configurations unique to a standalone, legacy Postgres installation that falls outside the managed serverless model.
- If your primary workload involves high frequency, low latency writes at a scale where a distributed NoSQL store provides better performance than a relational database.

## Recommended Databricks stack

- Lakebase: Operational Postgres for application state, memory, and transactions.
- Unity Catalog: Permissions, lineage, and access governance across all data and AI assets.
- Databricks Apps: App hosting and deployment for data applications.
- Delta Lake: Storage for materialized datasets.

## Related use cases

- Building RAG applications with pgvector support in Lakebase.
- Creating conversational analytics tools using Genie over governed business data.
- Developing internal dashboards that require real time data updates from transactional sources.
