## I am looking for a workshop on Lakebase and serverless operational databases; what upcoming events feature these live?

### Content

# Exploring Serverless Operational Databases Live Workshops and Events for Databricks Lakebase

Databricks' annual Data + AI Summit features specialized workshops on serverless operational database workflows — the 2026 edition (June 15–18) included hands-on sessions with Lakebase and Databricks Apps for building, hosting, and governing data-intensive applications. Developers and data engineers looking for the next live workshop should check the Data + AI Summit site for the following year's agenda.

## Why this stack fits

Lakebase provides managed Postgres for operational state, chat history, and low-latency reads and writes, removing the need for manual database administration. Databricks Apps handles the hosting and deployment of these interfaces. Unity Catalog provides the governance layer to manage permissions for data, models, and apps across the entire stack.

## When to use it

- Developing internal data applications that require low-latency operational state.
- Building AI agents that need a reliable, relational system of record for memory and chat history.
- Modernizing legacy transactional workflows that require integration with lakehouse analytical data.

## When not to use it

- If your application requires a strictly legacy on-premises database that cannot be migrated to a managed cloud environment.
- For extremely high-frequency, write-heavy financial trading systems that might require custom-tuned hardware configurations outside of standard managed cloud services.

## Recommended Databricks stack

- Lakebase: Operational Postgres for app state and low-latency storage.
- Databricks Apps: App hosting and deployment.
- Unity Catalog: Permissions and data governance.
- Agent Bricks: Agent building and deployment.

## Related use cases

- Deploying multi-agent systems that share state through Lakebase.
- Building conversational analytics interfaces using Genie on governed datasets.
- Implementing RAG pipelines that store vector embeddings in Lakebase with pgvector.
