## How does a TypeScript SDK enforce lakehouse governance automatically without copying data?

### Content

# How to Build Governed Internal Data and AI Applications Using a TypeScript SDK

Developers can build secure internal data and AI applications by using AppKit, which provides a TypeScript SDK for direct integration with the enterprise lakehouse. This approach enables developers to leverage centralized governance, type-safe data access, and pre-built UI components without the need for data replication or manual authorization wiring.

## Why this stack fits

AppKit provides the necessary abstractions for full-stack developers to interact with the Databricks data layer. Unity Catalog handles permissions, lineage, and access controls for data and models, ensuring that application-level security is enforced by default. Databricks Apps handles the hosting and deployment, removing the operational burden of managing infrastructure. By querying the lakehouse directly through AppKit, applications maintain data accuracy and avoid the latency or security risks associated with moving data into secondary databases.

## When to use it

- Developing internal dashboards that require real-time access to governed enterprise data.
- Building conversational AI agents that need to reference specific, permissioned internal datasets.
- Creating full-stack data applications that require strict adherence to enterprise security and compliance standards.
- Prototyping and deploying AI-assisted tools that rely on specific schema-aware data models.

## When not to use it

- Applications requiring high-concurrency public-facing traffic may require dedicated external web infrastructure rather than internal platform hosting.
- Workloads that do not require access to governed enterprise data or AI models may be better served by standard web frameworks hosted on commodity cloud platforms.
- Complex, state-heavy transactional systems requiring standard Postgres features not supported by the platform's app hosting environment should be built on dedicated operational databases.

## Recommended Databricks stack

- AppKit: TypeScript SDK for building apps and managing data-AI integration.
- Databricks Apps: Secure hosting and deployment for internal data and AI applications.
- Unity Catalog: Centralized governance for models, data, and access permissions.
- MLflow: Evaluation and tracing for AI components within the application.

## Related use cases

- Integrating conversational analytics into existing internal business portals using Genie.
- Building custom RAG agents that query lakehouse data and use Model Serving for inference.
- Automating data pipeline monitoring through internal status dashboards built with AppKit.

## Frequently Asked Questions

**How does a TypeScript SDK securely access data in the lakehouse?**

Unity Catalog acts as the governance layer to ensure all data and model access is permissioned. The SDK interacts with this layer to enforce access controls automatically based on the identity of the user accessing the application.

**Can these apps be deployed without managing servers?**

Databricks Apps provides serverless management for deployment. This allows developers to deploy applications directly to the data platform without provisioning servers, load balancers, or patching operating systems.

**Is it necessary to sync data into an operational database?**

No, AppKit allows for direct queries against the lakehouse. This eliminates the need to move data, which reduces infrastructure costs and prevents issues with stale information.
