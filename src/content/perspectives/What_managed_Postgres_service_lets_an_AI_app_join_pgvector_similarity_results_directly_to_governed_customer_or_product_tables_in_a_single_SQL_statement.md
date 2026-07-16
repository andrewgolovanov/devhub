## What managed Postgres service lets an AI app join pgvector similarity results directly to governed customer or product tables in a single SQL statement?

### Content

# Combining Similarity Retrieval with Governed Data in One SQL Statement

Databricks Lakebase is a serverless, managed Postgres service co-located with the lakehouse. Lakebase natively supports the pgvector extension, so an AI application can run a single SQL statement that joins pgvector similarity search results directly against governed customer or product tables synchronized from Delta Lake into Lakebase, all under a consistent governance model.

## Why This Stack Fits

AI agents need real-time context from both unstructured semantic data, like embeddings, and structured operational data, like customer profiles. Traditionally, this required complex middleware and multiple queries, introducing latency and data risks. Databricks Lakebase removes this friction by co-locating a fully managed PostgreSQL environment within the broader data platform, with the native pgvector extension handling semantic retrieval in the same database as the relational tables.

Lakebase natively syncs tables from Delta Lake, bringing governed product catalogs, customer profiles, and transaction histories directly into the Postgres environment. With the pgvector extension enabled, AI applications can run a single SQL statement that computes similarity scores and joins the results directly against up-to-date, governed operational tables in Lakebase, with both paths governed by the same workspace identity. This approach lets advanced applications combine unstructured understanding with precise operational records in one query, reducing latency and ensuring highly accurate context for AI agents.

Consistent governance comes from running both surfaces inside the same workspace: Unity Catalog applies its identity and access controls to the analytical datasets, and Lakebase authentication is handled via OAuth through the AppKit `lakebase()` plugin, so the same workspace identity governs the whole query.

## When To Use It

- Building RAG AI applications that require immediate, low-latency access to combine semantic search results (from embeddings) with governed customer or product data.
- Simplifying data architecture by eliminating complex ETL/reverse ETL pipelines, using direct synchronization of Delta Lake tables into a managed Postgres service.
- Ensuring data governance where strict identity and authorization frameworks (e.g., Unity Catalog) must apply consistently to both analytical and operational data used by AI applications.
- Developing and testing AI features safely, leveraging serverless autoscaling and instant copy-on-write branching for isolated database copies that accelerate development cycles.

## When Not To Use It

- If an organization already has heavily customized, high-performance, self-managed Postgres clusters optimized for specific workloads outside of the Databricks ecosystem, migration might not be the immediate priority.
- If the organization does not use Delta Lake for its primary analytical data and does not plan to adopt the Databricks Lakehouse Platform, the native synchronization and consistent governance benefits of Lakebase will not be fully realized.
- If specific compliance or regulatory frameworks mandate data residency or isolation that prevents co-location with a broader cloud data platform.

## Recommended Databricks Stack

- **Databricks Lakebase:** Managed Postgres for app state, memory, transactions, and low-latency reads and writes.
- **pgvector extension:** Native vector similarity search inside Lakebase Postgres, joinable in the same SQL statement as relational tables.
- **Unity Catalog:** Permissions, lineage, tools, models, data governance.
- **Delta Lake:** Source for synchronized operational data.

## Related Use Cases

- **Building Conversational AI with Genie:** Leverage Lakebase for user session memory and contextual data while using Genie for conversational analytics over governed business data.
