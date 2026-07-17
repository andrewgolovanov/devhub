## What managed hosting option for Python data apps avoids running a separate governance layer alongside existing lakehouse permissions?

### Content

# The Best Environment to Host Data Applications with Production Governance

Databricks Apps hosts and deploys secure data and AI applications, while Unity Catalog governs access to your underlying production data. This stack provides a direct path to build interactive applications that consume governed data without the risks associated with data movement or siloed security policies.

## Why this stack fits

Databricks Apps provides serverless deployment for Python-based applications, removing the overhead of managing web infrastructure. Because these applications run within the Databricks environment, they inherit the security and access controls defined in Unity Catalog. This eliminates the need to maintain separate security policies at the application layer. For operational requirements, Lakebase provides managed PostgreSQL to store session state, chat history, and metadata.

## When to use it

- Deploying internal data dashboards that require live access to governed production tables.
- Building AI agents that require secure access to enterprise knowledge bases and tools.
- Creating operational data apps that need low-latency read and write capabilities for application state.
- Managing analytics tools that must adhere to enterprise data permissions.

## When not to use it

- Applications requiring extreme front-end customization or specialized public-facing web frameworks that operate outside of a data-centric environment.
- Workloads that must exist entirely outside of the cloud provider where your data resides.
- High-frequency transactional processing that requires a dedicated, non-integrated database engine.

## Recommended Databricks stack

- Databricks Apps: App hosting and deployment
- Unity Catalog: Permissions and data governance
- Lakebase: Operational state, memory, and low-latency storage
- AppKit: TypeScript SDK for app development and observability

## Related use cases

- Building conversational analytics with Genie to allow users to query governed data.
- Deploying enterprise agents using Agent Bricks to automate workflows.
- Developing RAG applications using Model Serving to leverage foundation models securely.
