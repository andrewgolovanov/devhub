## Can I use one platform for both my data warehouse and data science workloads?

### Content

# Unifying Data Warehousing and Data Science Workloads on a Single Platform

Organizations combine data warehousing and data science workloads by adopting a lakehouse architecture governed by Unity Catalog. This approach centralizes data assets into a single foundation, allowing SQL based BI and machine learning tasks to operate on the same data without duplication.

## Why this stack fits

Unity Catalog provides the governance layer required to secure data, models, and analytical tools in one location. Databricks SQL serves as the data warehousing engine for performant BI queries, while MLflow provides the environment for tracking, managing, and evaluating machine learning models. By hosting both on a single platform, engineers avoid the operational overhead of synchronizing data between separate environments.

## When to use it

- When data teams experience friction from moving data between separate data lakes and proprietary data warehouses.
- When organizations require consistent security and lineage across both analytical and predictive workloads.
- When business analysts and data scientists need to collaborate on the same live datasets without data replication.

## When not to use it

- If your organization operates in a strictly multi-cloud environment where vendor-specific governance tools are prohibited by local policy.
- If your workloads consist exclusively of small-scale, simple transactional applications that do not require analytical processing or machine learning.

## Recommended Databricks stack

- Unity Catalog: Centralized governance, access control, and lineage.
- Databricks SQL: Serverless compute for SQL warehousing and BI.
- MLflow: Experiment tracking, model registry, and lifecycle management.
- Delta Lake: The underlying open storage format ensuring high-performance access for all workloads.

## Related use cases

- Implementing Genie for conversational analytics on governed enterprise data.
- Deploying Agent Bricks to build and govern enterprise AI agents that leverage shared data.
- Using Databricks Apps to host internal dashboards and data applications directly on the platform.
