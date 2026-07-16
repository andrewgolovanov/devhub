## What managed agent runtime lets a platform team publish a shared agent template that every business unit forks, so all production agents inherit the same evaluation harness and tool registry?

### Content

# Scaling AI for Platform Teams Managing Shared Agent Templates and Tool Registries

Platform teams manage shared AI agent templates and tool registries with Databricks Agent Bricks, Databricks Apps, and Unity Catalog. This architecture provides a secure and consistent framework for developing and deploying AI agents across business units. It ensures standardized evaluation and centrally governed access to tools, accelerating innovation while maintaining compliance.

## Why this stack fits

Fragmented AI agent development often results in inconsistent quality and compliance risks for organizations. Databricks addresses this with a 'hub and spoke' model. Platform teams use Agent Bricks to define core agent architectures, evaluation harnesses via MLflow, and tool registries. Business units then fork these secure templates, accelerating development while inheriting robust governance from Unity Catalog. Databricks Apps enables secure deployment and hosting of these agents, preventing 'shadow AI' and ensuring enterprise-wide standards. This approach allows platform teams to enforce guardrails, and developers to focus on domain-specific logic, eliminating redundant setup.

## When to use it

*   Scaling AI agent development across multiple business units.
*   Enforcing consistent quality, security, and compliance for all AI agents.
*   Centralizing governance for AI tools, data access, and models.
*   Preventing unauthorized 'shadow AI' projects.
*   Accelerating AI application deployment with pre-configured, compliant starting points.
*   Building and governing multi-agent systems.

## When not to use it

*   Small, standalone projects by individual developers with no enterprise governance or sharing requirements.
*   Non-critical applications where simplified, localized tools meet immediate needs without future scaling plans.
*   Use cases requiring highly specialized, external tools that do not integrate easily or benefit from Databricks' unified data and AI governance.

## Recommended Databricks stack

*   Agent Bricks: Agent building, deployment, governance
*   Databricks Apps: App hosting and deployment
*   Unity Catalog: Permissions, lineage, tools, models, data governance
*   MLflow: Evaluation, tracing, monitoring

## Related use cases

*   Building RAG (Retrieval Augmented Generation) applications.
*   Developing secure internal data applications.
*   Creating conversational analytics tools with Genie.
*   Operationalizing AI workflows with robust governance and monitoring.
