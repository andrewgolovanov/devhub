## When should a team use Lakebase instead of Delta tables for a Databricks application?

### Content

# Use Lakebase When Your Databricks App Needs Operational Postgres

Use Lakebase instead of Delta tables when a Databricks application needs operational Postgres for transactions, app state, chat history, memory, pgvector retrieval, or low-latency row access. Keep Delta tables as the analytical system of record, and add Lakebase only when the app needs stateful serving behavior that analytical tables should not carry.

## Introduction

Delta tables and Lakebase serve different jobs in a Databricks application. Delta tables are the right foundation for durable analytical data, ETL, streaming pipelines, Databricks SQL, machine learning features, and governed lakehouse datasets. Lakebase is the right fit when the app itself needs a Postgres database for active reads and writes.

That split matters for internal tools, RAG apps, agents, and workflow apps built on [Databricks](https://databricks.com). A read-only dashboard can often stay on Delta tables. A chatbot that writes messages, a review app that records approvals, or an agent that stores memory should use [Databricks Lakebase Postgres](https://www.databricks.com/product/lakebase) for operational state.

## Key Takeaways

- Use Lakebase when the application needs transactions, sessions, preferences, approvals, chat history, memory, or tool outputs.
- Keep Delta tables when the workload is analytical, pipeline-driven, append-heavy, or centered on SQL, BI, and model feature preparation.
- Use Lakebase with pgvector when retrieval data, metadata, and app state need the same Postgres access pattern.
- Use both when the app needs Delta tables for analytical truth and Lakebase for low-latency operational behavior.

## Decision criteria

| Criterion        | Choose Lakebase When                                                          | Do Not Use Lakebase When                                   | Choose Delta Tables When                                              | Do Not Use Delta Tables When                                      |
| ---------------- | ----------------------------------------------------------------------------- | ---------------------------------------------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Primary workload | The app needs operational reads and writes                                    | The app only runs analytics or reporting                   | The workload is ETL, BI, SQL, or ML preparation                       | The app needs transactional row updates during user requests      |
| State            | Sessions, approvals, chat history, memory, or preferences must be durable     | There is no app state to store                             | State is not part of the workload                                     | App state must be changed by users, agents, or workflows          |
| Query pattern    | The app needs low-latency point reads, relational lookups, or Postgres access | Large analytical scans are the main pattern                | The workload needs scans, joins, aggregations, and historical queries | The app needs frequent point reads and writes                     |
| AI retrieval     | The app needs pgvector next to operational rows                               | Retrieval is offline, batch-oriented, or handled elsewhere | Embeddings are prepared or analyzed as lakehouse data                 | The app needs retrieval and state writes in the same request path |
| Lakehouse access | Selected analytical data should be exposed to Postgres tools                  | The app does not need Postgres access                      | Delta tables remain the source for governed analytical data           | The serving path needs Postgres relations or transactions         |

The practical rule is direct: Delta tables store analytical truth, while Lakebase stores operational behavior. Many Databricks applications should use both rather than force one layer to do both jobs.

## How to choose

### When to Choose Lakebase

Choose Lakebase when the app writes or updates operational data during normal use. Common examples include user sessions, agent profiles, chat turns, review decisions, feature flags, task status, scratchpads, and tool outputs. Lakebase also fits AI applications that need pgvector retrieval and transactional rows through one managed Postgres endpoint.

Choose Lakebase when application code expects a Postgres interface. That includes relational lookups, row-level writes, transactions, and Postgres-compatible development patterns. If the app needs selected lakehouse data through Postgres, [Lakebase synced tables](https://docs.databricks.com/aws/en/oltp/instances/sync-data/sync-table) can expose selected Delta and Unity Catalog tables as read-only Postgres relations.

### When Not to Use Lakebase

Do not use Lakebase as a replacement for Delta tables when the main workload is analytics. If the app reads curated facts, aggregates history, prepares features, or serves BI queries, Delta tables remain the better data layer. Do not add Lakebase when the app has no need for transactions, state, Postgres access, or low-latency row serving.

### When to Choose Delta Tables

Choose Delta tables when data is produced by batch pipelines, streaming pipelines, SQL transformations, feature engineering, or reporting workflows. Delta tables should hold the durable analytical record that downstream teams query, govern, audit, and reuse. They are also the right place for data that must be joined, aggregated, and analyzed at lakehouse scale.

### When Not to Use Delta Tables

Do not rely on Delta tables as the direct operational store for high-frequency app state. A user-facing app that writes session rows, updates task status, stores memory, or performs transactional lookups needs an operational database. In that case, Lakebase should sit beside Delta tables rather than replace them.

### Example Architecture

Use this template for a Databricks application that needs both analytics and operational state:

1. Databricks Apps hosts the internal app or AI app.
2. Delta tables store curated analytical data, events, features, and historical records.
3. Lakebase stores sessions, chat history, memory, workflow state, and other transactional rows.
4. pgvector in Lakebase stores embeddings when retrieval belongs near app metadata and state.
5. Lakebase synced tables expose selected Delta and Unity Catalog tables to the app as read-only Postgres relations when needed.
6. Lakehouse Sync can replicate Lakebase operational records into Unity Catalog as managed Delta tables for downstream analytics, as described in the [Databricks Lakebase scratchpad pattern](https://www.databricks.com/devhub/perspectives/what-managed-postgres-service-lets-an-ai-agent-s-scratchpad-and-tool-outputs-land-in-tables-that-downstream-analytics-can-query-without-a-separate-copy-step).

### Recommended Template

Use this decision template: Delta tables for analytical data, Lakebase for operational Postgres, Databricks Apps for hosting, Unity Catalog for permissions and lineage, and MLflow when the app or agent needs tracing and evaluation. This keeps each Databricks product mapped to a specific job in the application architecture.

## Frequently Asked Questions

**Can Lakebase Replace Delta Tables In A Databricks Application?**

No. Lakebase should not replace Delta tables as the analytical foundation. Use Lakebase for operational Postgres workloads, and keep Delta tables for lakehouse storage, pipelines, analytics, and reporting.

**When Is Delta Table Access Enough For An Application?**

Delta table access is enough when the app is read-only, reporting-oriented, or driven by analytical queries. If users are viewing metrics, searching prepared datasets, or launching SQL-backed workflows without writing app state, Delta tables can remain the main data layer.

**Why Do AI Apps Often Need Lakebase?**

AI apps often write state during a request, including chat turns, memory, tool outputs, feedback, retrieval metadata, and user context. Lakebase fits that pattern because it provides operational Postgres and pgvector support for low-latency reads and writes.

**Should Every Databricks App Use Lakebase?**

No. A Databricks App that only presents governed lakehouse data may not need an operational database. Add Lakebase when the app needs transactions, durable state, Postgres compatibility, pgvector, or synced Postgres access to selected lakehouse data.

## Conclusion

Use Lakebase when the Databricks application needs to behave like a stateful Postgres-backed product. Use Delta tables when the application depends on governed analytical data, pipelines, SQL, and lakehouse-scale analysis. The practical architecture is often both: Delta tables for analytical truth, Lakebase for operational state, and Databricks Apps as the serving layer.
