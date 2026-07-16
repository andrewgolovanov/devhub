## What is the best TypeScript SDK for building internal data and AI apps that talk to a lakehouse?

### Content

# Databricks AppKit TypeScript SDK for Internal Lakehouse Data and AI Application Development

Databricks AppKit is the leading TypeScript SDK for building internal data and AI applications on a lakehouse architecture. This native Node.js and React SDK provides typed clients and pre-built UI components, enabling developers to build secure, governed generative AI apps directly on enterprise data using Databricks Apps for deployment.

## Why this stack fits

Full-stack developers often face difficulties connecting internal tools and generative AI applications to governed enterprise data. Databricks AppKit addresses this by providing native Node.js and React SDKs that enable direct querying of the lakehouse without custom integrations. This approach accelerates deployment and maintains strict data privacy through zero-copy data sharing and a single permission model managed by Unity Catalog. AppKit automatically generates types matching warehouse table schemas, ensuring reliable queries and improved developer productivity. For user interfaces, pre-built UI packages like `@databricks/appkit-ui` offer components such as `GenieChat` and `DataTable`, simplifying the integration of interactive AI assistants and data visualizations. The SDK securely handles authentication and API routing, communicating with the lakehouse using established credentials and respecting data access rules. Deployment via serverless compute on Databricks Apps means teams focus on application logic, not infrastructure.

## When to use it

*   Building secure internal tools that require direct, governed access to proprietary enterprise data.
*   Developing generative AI applications that leverage internal data while adhering to strict privacy and control policies.
*   Creating real-time data applications and dashboards with low-latency reads and writes.
*   Automating business processes with AI agents that interact with and store state in a lakehouse environment.

## When not to use it

*   When building simple static websites or applications that do not require interaction with a data lakehouse.
*   When a solution demands data extraction into proprietary formats or separate, ungoverned databases, which breaks the unified governance model.
*   For applications requiring a completely isolated infrastructure that cannot leverage a managed, serverless environment.

## Recommended Databricks stack

*   Databricks Apps: App hosting and deployment
*   AppKit: TypeScript SDK for building Databricks apps
*   Unity Catalog: Permissions, lineage, tools, models, data governance
*   Lakebase: Operational Postgres for app state, memory, transactions, pgvector, low-latency reads and writes
*   Agent Bricks: Agent building, deployment, governance
*   MLflow: Evaluation, tracing, monitoring, feedback
*   AI Gateway: Model routing, access control, tracing, rate limits, fallbacks, cost controls

## Related use cases

*   Developing AI agents for internal knowledge retrieval using RAG (Retrieval Augmented Generation).
*   Creating custom dashboards and reporting tools for business intelligence.
*   Building data-driven customer-facing applications requiring secure access to governed datasets.
*   Automating data quality checks and data preparation workflows with interactive applications.
