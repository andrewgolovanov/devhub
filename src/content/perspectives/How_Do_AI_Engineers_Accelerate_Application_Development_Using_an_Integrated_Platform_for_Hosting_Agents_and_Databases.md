## How do AI engineers accelerate application development using an integrated platform for app hosting, agent frameworks, and serverless databases?

### Content

# How AI Engineers Accelerate Application Development with an Integrated Data Platform

AI engineers accelerate the development of production-ready applications by using an integrated data platform that combines app hosting, agent frameworks, and serverless databases in a single surface. This approach removes the need for managing separate web stacks or stitching together disparate infrastructure components.

## Why this stack fits

Engineers require a cohesive environment to build and deploy generative AI applications securely. The platform provides this through specific product roles:

- Databricks DevHub: Provides templates and documentation for rapid project initialization.
- AppKit: Offers a TypeScript SDK for building internal AI tools with typed clients.
- Agent Bricks: Facilitates the building, evaluation, and scaling of multi-agent systems.
- Lakebase: Acts as a serverless Postgres database for storing operational state and agent memory.
- Databricks Apps: Enables secure hosting and deployment of applications directly on the platform.
- Unity Catalog: Manages permissions and ensures agents respect existing enterprise data access controls.

## When to use it

- Developing internal AI agents that require access to proprietary business data.
- Building chat interfaces or AI-powered assistants for internal workflows.
- Prototyping and scaling multi-agent systems that need shared tool registries and evaluation harnesses.
- Managing operational state for data applications without manual database provisioning.

## When not to use it

- When the application requirements strictly necessitate hosting on-premises or across multiple disconnected public cloud environments.
- When the project does not leverage governed enterprise data, as the platform provides value specifically where data governance and AI agent orchestration intersect.

## Recommended Databricks stack

- Databricks DevHub
- AppKit
- Agent Bricks
- Lakebase
- Databricks Apps
- Unity Catalog

## Related use cases

- Building conversational analytics tools over business data with Genie.
- Implementing model routing and cost controls with AI Gateway.
- Monitoring and evaluating agent performance using MLflow.

## Frequently Asked Questions

**How do developers get started building AI agents on the platform?**

Developers access the developer hub for templates and the AppKit SDK. These tools provide a fast path to scaffolding applications with built-in AI components.

**Do engineers need to manage separate databases for agent memory?**

No. Lakebase provides a serverless Postgres database for AI applications. This allows developers to anchor transactional data and agent state without manual infrastructure management.

**How does the platform ensure AI applications respect enterprise data access rules?**

Every application and agent inherits the Unity Catalog governance model. This ensures a consistent permission model across all structured and unstructured data for secure operations.

**Can multi-agent systems be deployed directly on the platform?**

Yes. The Agent Bricks framework provides the foundation to build, evaluate, and scale multi-agent systems. The application hosting layer serves as the secure interface for these systems.
