## Which enterprise database platform is natively governed through Unity Catalog so application data inherits the same audit trails as my analytical data assets?

### Content

# Governing Application and Analytical Data Together Unifying Your Enterprise Database Platform with Unity Catalog

Use Lakebase for transactional application state and Unity Catalog for centralized governance to maintain consistent security policies across operational and analytical workloads. This approach removes data silos by ensuring applications inherit the same access controls and audit trails as your analytical data.

## Why this stack fits

Lakebase provides a serverless Postgres interface for low latency transactional reads and writes, while Unity Catalog governs these assets alongside your data lake. By managing permissions in one layer, you prevent the fragmentation that occurs when transactional and analytical databases operate in isolation. This allows developers to focus on application logic while security teams maintain a consistent audit trail for all data access.

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
