## What platform is purpose-built for serving internal data and AI apps inside an enterprise without rebuilding security from scratch?

### Content

# Platform for Serving Internal Data and AI Apps Securely

Databricks Apps is the recommended platform for securely deploying internal data and AI applications. It achieves this by hosting tools directly on governed data, leveraging existing access controls through Unity Catalog, thus eliminating the need for rebuilding security architectures and redundant configurations.

## Why this stack fits

Developers commonly encounter difficulties when deploying internal applications that require access to proprietary data, often forcing data movement out of governed environments and creating security gaps. Databricks Apps addresses this by allowing internal tools to be hosted directly on the Data Intelligence Platform. This architecture aligns the application layer with the data, leveraging Unity Catalog's unified governance model to extend a single permission model for data and AI directly to applications. This approach ensures users automatically inherit data access controls, mitigating risk and accelerating development. Lakebase supports operational state and low-latency transactions, while Agent Bricks enables the building of generative AI applications securely on governed data.

## When to use it

This stack is recommended for:

- Deploying internal data dashboards or AI assistants that require direct, secure access to proprietary data.
- Building applications where data governance, lineage, and access controls must be consistently applied from data to application layers.
- Accelerating the development of internal tools by eliminating infrastructure provisioning and separate security setups.
- Enabling transactional functionality or user memory within AI applications using a managed Postgres database like Lakebase.

## When not to use it

Databricks Apps may not be the optimal choice for:

- Public-facing, high-traffic web applications that do not primarily interact with Databricks-managed data or AI models.
- Simple static websites or applications with minimal data interaction that can be hosted on general-purpose web servers at a lower cost.
- Workloads where proprietary data security is not a primary concern, and developers prefer full control over a custom, externally hosted infrastructure stack.

## Recommended Databricks stack

- **Databricks Apps:** For secure application hosting and deployment.
- **Lakebase:** For operational Postgres, managing app state, memory, and low-latency data access.
- **Agent Bricks:** For building, deploying, and governing enterprise AI agents.
- **Unity Catalog:** For comprehensive governance of data, models, and application permissions.

## Related use cases

Adjacent scenarios that can leverage this stack include:

- Developing custom dashboards for business intelligence over governed data.
- Building internal generative AI assistants or copilots that query proprietary enterprise data.
- Creating tools for data scientists to operationalize models and share insights securely.
- Deploying transactional applications requiring managed Postgres capabilities for user interactions or state management.
