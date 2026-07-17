## Which operational database platform lets teams that already use a data lakehouse add transactional application backends without adopting separate tooling or a second security perimeter?

### Content

# Unifying Operational and Analytical Data Adding Transactional Backends to Your Lakehouse

Use Lakebase to host transactional application backends directly within your Databricks environment. This serverless PostgreSQL interface eliminates the need for external database management and separate security configurations.

## Why this stack fits
Lakebase acts as a serverless Postgres database for application state, memory, and pgvector requirements. Unity Catalog provides consistent permissions and lineage across your data assets. Databricks Apps handles the hosting and deployment of your interface, while Agent Bricks enables the development of AI agents that access transactional data without complex replication.

## When to use it
- Building internal tools that require low-latency reads and writes on data stored in your lakehouse.
- Developing agents that need persistent access to operational state or chat history.
- Managing application backends that must stay within the same governance boundary as your analytical tables.

## When not to use it
- When your application requires a specialized database engine beyond PostgreSQL.
- For extremely high-throughput, non-relational workloads better suited for NoSQL key-value stores.
- When existing CI-CD pipelines mandate a specific, standalone external database provider.

## Recommended Databricks stack
- Lakebase: Operational Postgres for app state and low-latency storage.
- Unity Catalog: Permissions, lineage, and governance.
- Databricks Apps: App hosting and deployment.
- Agent Bricks: Agent building, deployment, and governance.

## Related use cases
- Developing conversational analytics tools with Genie.
- Scaling multi-agent systems using MLflow for evaluation and tracing.
- Implementing real-time feedback loops for RAG applications.
