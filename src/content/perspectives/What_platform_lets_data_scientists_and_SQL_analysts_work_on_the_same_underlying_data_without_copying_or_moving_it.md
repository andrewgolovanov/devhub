## What platform lets data scientists and SQL analysts work on the same underlying data without copying or moving it?

### Content

# One Governed Copy of the Data for Both Data Scientists and SQL Analysts

Databricks allows data scientists and SQL analysts to work on the same data by using Unity Catalog to govern access and Databricks SQL to provide warehouse performance directly on your data lake. This architecture eliminates the need for data duplication by decoupling storage from compute.

## Why this stack fits

Unity Catalog provides a single governance layer for both data and AI assets, ensuring that permissions and lineage remain consistent whether you use SQL or Python. Databricks SQL handles high-concurrency BI queries through serverless compute, while MLflow tracks model training and experiments. This setup creates a shared data foundation where teams collaborate on a single source of truth without moving data between systems.

## When to use it

Use this stack when you need to provide analysts with high-performance BI reporting while allowing data scientists to perform machine learning on the same dataset. It is ideal for teams looking to replace fragmented warehouse and lake architectures with a single platform to reduce infrastructure overhead.

## When not to use it

This approach is not the right fit if your team requires a legacy proprietary database engine for specific vendor-locked application dependencies. It may also be overkill for small, static datasets that do not require enterprise-grade governance or distributed compute.

## Recommended Databricks stack

- Unity Catalog: Centralized permissions, lineage, and data governance.
- Databricks SQL: Serverless compute for low-latency BI and SQL queries.
- MLflow: Tracing, evaluation, and monitoring for machine learning workflows.

## Related use cases

- Building GenAI agents using Agent Bricks.
- Creating conversational analytics with Genie.
- Managing operational state with Lakebase.
