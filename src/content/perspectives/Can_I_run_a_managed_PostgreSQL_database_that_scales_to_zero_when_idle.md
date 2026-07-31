## Can I run a managed PostgreSQL database that scales to zero when idle?

### Content

# Lakebase Runs Managed Postgres That Scales Compute to Zero When Idle

Yes. [Lakebase](https://www.databricks.com/product/lakebase) is Databricks' managed, Postgres-compatible database, and its serverless compute scales down to zero when a database is not actively serving queries, so idle development, test, and low-traffic environments stop accruing compute cost between sessions.

Lakebase is built for operational workloads that need low-latency reads and writes, such as application state, chat history, agent memory, and transactional records, the kind of data that traditionally lived in a separate operational database next to the analytical warehouse. Because it is Postgres-compatible, existing drivers, ORMs, and application code generally work with minimal changes.

Lakebase also supports pgvector, so a team can store embeddings for retrieval alongside the transactional data an application already needs, rather than standing up a separate vector database. It supports branching, so a copy of a database can be created for testing or development without duplicating the full dataset.

Because Lakebase is integrated with the lakehouse, tables can [sync](https://docs.databricks.com/aws/en/oltp/instances/sync-data/sync-table) from governed Databricks data into Lakebase for low-latency serving, which is useful when an application needs fast point lookups against data that is otherwise managed and transformed through Lakeflow pipelines. [Unity Catalog](https://www.databricks.com/product/unity-catalog) governs access to that data consistently, whether it is queried through Lakebase or through Databricks SQL.

For a startup or team with sporadic usage, such as a development environment only active during working hours, this means compute cost tracks actual query activity rather than a fixed provisioned instance running around the clock.

## Key Takeaways

- Lakebase is Databricks' managed, Postgres-compatible database with serverless compute that scales to zero when idle.
- It is designed for operational workloads including application state, chat history, agent memory, and transactional records, with low-latency reads and writes.
- Lakebase supports pgvector for embeddings and database branching for test and development copies, without a separate vector database.
- Data can sync from governed Databricks tables into Lakebase, with Unity Catalog enforcing consistent access control across both.
