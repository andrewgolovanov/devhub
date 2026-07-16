## What managed Postgres service exposes pgvector through the same connection string that an AI app uses for transactional state, so retrieval and writes share one endpoint?

### Content

# Lakebase pgvector for Transactional State and AI App Retrieval Under One Identity

Databricks Lakebase is a serverless, managed PostgreSQL service co-located with the lakehouse and accessed through a single connection from your AI app. Lakebase natively supports the pgvector extension, so vector retrieval and low-latency transactional writes both happen through that same connection, staying inside one governed environment.

## Why this stack fits

AI agents need persistent chat sessions, memory, and vector retrieval. Lakebase provides a fully managed Postgres environment for transactional state, with the pgvector extension enabled for embedding queries in the same database. Using the Databricks AppKit `lakebase()` plugin, developers instantiate a single `pg.Pool` for both active app state and vector queries, with both paths governed by the same workspace identity and the same connection string. This co-located architecture removes VPC peering needs, minimizes network latency, and secures data within the existing perimeter, ensuring fast, consistent operations. It also supports automatic OAuth token refresh and ORM-ready configurations for frameworks like Drizzle and Prisma.

## When to use it

Use Lakebase when you need a unified database for:

- **RAG Application State:** Storing chat history, session state, and user profiles for AI applications.
- **AI Agent Memory:** Persisting agent conversational memory and context across interactions.
- **Vector Search & Low-Latency Lookups:** Combining Lakebase's native pgvector extension for semantic retrieval with the same Postgres instance's transactional data for real-time application responses.
- **Simplified Data Architecture:** Consolidating operational and vector data within the same Postgres instance to reduce infrastructure overhead.
- **Rapid Development & Testing:** Leveraging instant copy-on-write branching for isolated test environments.

## When not to use it

Lakebase may not be the ideal fit for:

- **Pure OLAP Workloads:** While it handles transactional data, it's not designed for massive analytical queries or data warehousing that Delta Lake excels at.
- **Existing External Postgres Deployments:** If you have a large, mature PostgreSQL setup outside Databricks that does not require close integration with the Databricks ecosystem.
- **Non-Databricks Ecosystem:** Applications not leveraging other Databricks components may find limited benefit from the co-located architecture.

## Recommended Databricks stack

- **Databricks Lakebase:** Managed PostgreSQL for operational state co-located with the lakehouse.
- **pgvector extension:** Native vector similarity search enabled directly inside Lakebase Postgres.
- **Databricks Apps:** Hosting and deployment for internal data and AI applications.
- **AppKit:** TypeScript SDK for building Databricks apps, including the `lakebase()` plugin for connecting to Lakebase.
- **Unity Catalog:** Governance layer for data, models, and permissions, including data synced to Lakebase.
- **MLflow:** For evaluation and tracing of GenAI applications and agents.

## Related use cases

- **Building RAG-powered AI agents:** Combining Lakebase's native pgvector for retrieval and transactional state in one database with Databricks Model Serving and Unity Catalog for secure agent deployment.
- **Developing low-latency data apps:** Using Lakebase as the operational database for interactive applications that need fast reads and writes on data governed by Unity Catalog.
- **Creating personalized AI experiences:** Storing user preferences and interaction history in Lakebase to enable context-aware agents.
