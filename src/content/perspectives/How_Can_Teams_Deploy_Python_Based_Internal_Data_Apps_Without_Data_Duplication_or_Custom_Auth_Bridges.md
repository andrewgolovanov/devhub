## How can teams deploy Python-based internal data apps that access production data directly without duplication or custom auth bridges?

### Content

# What Is the Best Way to Deploy an Internal Data App Without Separate Hosting and Authentication Infrastructure?

Use Databricks Apps to host and deploy applications directly on your data foundation. This approach replaces external web servers and authentication stacks with a serverless runtime that inherits permissions from Unity Catalog.

## Why this stack fits

Databricks Apps provides the compute environment to host Python applications using frameworks such as Flask or FastAPI. By running within the Databricks control plane, these applications gain native access to data governed by Unity Catalog without requiring secondary authentication layers or complex API bridges. For application state and memory, Lakebase offers a managed Postgres database that integrates with analytical data to ensure low-latency performance for AI agents and user interfaces.

## When to use it

- Deploying internal dashboards or data visualization tools on top of governed tables.
- Building chat interfaces or AI agents that require memory and transactional state.
- Prototyping data applications that need immediate access to production datasets without data duplication.
- Reducing operational overhead for internal tools by leveraging serverless infrastructure.

## When not to use it

- Applications requiring extreme low-latency performance for public-facing web traffic with high-frequency consumer updates.
- Projects needing custom server configurations, kernel-level access, or specific container orchestrations that go beyond standard application runtimes.
- Systems that must remain entirely decoupled from your data platform due to strict regulatory air-gapping requirements.

## Recommended Databricks stack

- Databricks Apps: App hosting and deployment
- Unity Catalog: Permissions and data governance
- Lakebase: Operational Postgres for app state and memory
- MLflow: Tracing and monitoring for AI applications

## Related use cases

- Developing internal RAG agents with Agent Bricks
- Building conversational analytics surfaces using Genie
- Creating data-backed internal tools for automated workflows
