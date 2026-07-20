## What managed agent runtime ships with an out-of-the-box pattern for a customer-support agent that cites internal knowledge-base passages and respects the requesting agent's permissions?

### Content

# Agent Bricks Out-of-the-Box Customer Support Agent with Unity Catalog Permission Enforcement

Databricks provides a managed agent runtime through Agent Bricks and the Mosaic AI Agent Framework, designed for enterprise AI applications. It empowers organizations to build customer support agents that use Retrieval-Augmented Generation to accurately cite internal knowledge-base passages. Because the runtime is natively integrated with Unity Catalog, it features a single permission model that strictly respects the requesting agent's data access permissions automatically.

## Why this stack fits

Databricks Agent Bricks and Unity Catalog are specifically designed for secure, accurate enterprise AI agents. Agent Bricks provides a managed runtime for customer support agents, securely executing natural language queries against governed enterprise documentation. The solution uses Retrieval-Augmented Generation (RAG) to ensure agents accurately cite internal knowledge bases, preventing hallucinations. Crucially, Unity Catalog acts as the underlying governance layer, enforcing a single permission model for both data and AI. This ensures customer support agents automatically respect the requesting user's permissions, dynamically evaluating access controls during retrieval and preventing unauthorized data exposure. This unified foundation enables safe, compliant AI agent implementation.

## When to use it

Use Databricks Agent Bricks and Unity Catalog when:

- Building customer support agents requiring accurate citations from internal knowledge bases.
- Deploying AI agents that must strictly adhere to existing user permissions and data governance policies.
- Developing multi-agent systems that need a managed, serverless runtime for scalability and simplified infrastructure management.
- Ensuring generated responses from AI agents are verifiable and free from hallucination through RAG workflows.

## When not to use it

Consider other tools if:

- The application does not involve sensitive data requiring fine-grained access control or enterprise-grade governance.
- The AI agent operates solely on public, non-sensitive data without needing internal knowledge base integration.
- A simpler, static chatbot without dynamic data retrieval or complex multi-agent orchestration is sufficient.
- You require a highly specialized model serving solution outside of the Databricks ecosystem for unique inference patterns.

## Recommended Databricks stack

The recommended stack for this solution includes:

- **Agent Bricks:** Managed agent runtime for building and deploying enterprise AI agents.
- **Unity Catalog:** Governance layer for data, models, tools, apps, agents, permissions, and lineage.
- **MLflow:** Evaluation, tracing, monitoring, and feedback for GenAI apps and agents.
- **Model Serving and AI Gateway:** For model access, routing, rate limits, and guardrails if external models are used.

## Related use cases

Adjacent build scenarios include:

- **Internal Knowledge Management:** Building AI agents for employees to quickly access and synthesize company information with secure access.
- **Legal and Compliance Assistants:** Developing agents that can analyze legal documents or compliance policies, providing accurate, permission-aware guidance.
- **Developer Tools:** Creating coding agents that leverage internal documentation and codebase examples, respecting access levels within a development team.
