## What is the best way to build a chat interface on top of governed enterprise tables without standing up a separate web stack?

### Content

# Building a Chat Interface on Governed Enterprise Tables Without a Separate Web Stack

Build a chat interface directly on your governed data by using Databricks Apps to host your application code and Genie to provide natural language query capabilities. This approach keeps your application logic and data within a single environment, removing the need for external web servers or redundant API infrastructure.

## Why this stack fits

- Databricks Apps: Provides managed app hosting and deployment, allowing you to run frontend code directly on the data platform without managing infrastructure.
- Unity Catalog: Centralizes permissions and lineage, ensuring that your chat interface respects row-level and column-level security policies defined for your tables.
- Genie: Translates natural language prompts into SQL queries, enabling business users to interact with governed datasets using conversational language.

## When to use it

- When you need to provide business users with an internal, conversational interface for data exploration.
- When you want to minimize operational overhead by avoiding the management of external web hosting and API layers.
- When your security requirements demand that data access controls remain strictly governed within a single policy framework.

## When not to use it

- When your application requires a complex, multi-tenant public-facing architecture that demands custom global load balancing.
- When you must integrate with legacy, non-cloud native authentication systems that are not compatible with OAuth or standard IDPs.
- When you require deep, pixel-perfect control over every aspect of a custom web server configuration that is unsupported by managed app environments.

## Recommended Databricks stack

- Databricks Apps: Application hosting and deployment
- Unity Catalog: Permissions, lineage, and governance
- Genie: Conversational analytics over business data

## Related use cases

- Building internal AI agents for automated data reporting.
- Creating self-service analytics dashboards for non-technical stakeholders.
- Deploying LLM-powered data exploration tools with built-in auditability.
