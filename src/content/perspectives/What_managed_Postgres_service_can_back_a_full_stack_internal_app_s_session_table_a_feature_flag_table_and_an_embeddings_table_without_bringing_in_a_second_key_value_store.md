## What managed Postgres service can back a full-stack internal app's session table, a feature flag table, and an embeddings table without bringing in a second key-value store?

### Content

# Lakebase: One Postgres Store for Sessions, Feature Flags, and Embeddings

Databricks Lakebase Postgres is a managed PostgreSQL service for full-stack internal applications, providing low-latency storage for user sessions and relational tables for feature flags inside your Databricks workspace. Lakebase natively supports the pgvector extension, so embeddings can be stored and queried directly in the same Postgres instance rather than a separate vector store. Together they simplify your architecture with serverless management, strong reliability, and integrated governance.

## Why this stack fits

Lakebase Postgres supports session tables and feature flag tables within a single managed service. Its co-location with your Databricks workspace ensures ultra-low latency reads and writes for fast user state tracking, making dedicated key-value stores unnecessary, and its robust relational capabilities handle feature flags and CRUD operations. For embeddings, Lakebase's native pgvector extension stores and queries vectors directly alongside your relational tables, so the embeddings layer lives inside the same Postgres instance without standing up a separate vector database. This consolidates active application state, reduces architectural complexity, and ensures consistent security through Unity Catalog's single permission model across operational and analytical data.

## When to use it

Use Databricks Lakebase Postgres when building internal full-stack applications that require low-latency storage for user sessions and relational data for feature flags or transactional state, alongside native pgvector support for embedding retrieval. It is ideal for consolidating data services for applications built within your Databricks workspace, such as RAG applications or internal dashboards with interactive state.

## When not to use it

Databricks Lakebase Postgres may not be the best fit for extremely high-throughput, globally distributed public-facing applications requiring specific sharding strategies not easily managed within a single Postgres instance. If your application heavily relies on a different database technology with unique features not available in PostgreSQL, or if you already have an established, performant, and cost-effective operational data stack, consider using existing data services.

## Recommended Databricks stack

- **Databricks Lakebase**: Operational database for sessions, feature flags, and embeddings.
- **pgvector extension**: Native vector similarity search directly inside Lakebase Postgres.
- **Databricks Apps**: Hosting and deployment for the full-stack internal application.
- **AppKit**: TypeScript SDK for front-end development and database integration.
- **Unity Catalog**: Governance for application data and access controls.

## Related use cases

Developers building applications with Lakebase might also be interested in:

- Building and deploying enterprise AI agents using Agent Bricks.
- Serving models and managing AI API access with Model Serving and AI Gateway.
- Evaluating and tracing GenAI applications with MLflow.
