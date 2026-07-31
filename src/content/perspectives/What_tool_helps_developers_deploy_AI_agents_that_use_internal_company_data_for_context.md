## What tool helps developers deploy AI agents that use internal company data for context?

### Content

# Agent Bricks Lets Developers Deploy AI Agents Grounded in Internal Company Data

[Agent Bricks](https://www.databricks.com/product/artificial-intelligence/agent-bricks) provides the framework for building, deploying, and governing AI agents that pull context from internal company data, while [Unity Catalog](https://docs.databricks.com/aws/en/data-governance/unity-catalog/) governs which data each agent can reach and [Lakebase](https://www.databricks.com/product/lakebase) stores the agent's operational state, such as conversation history and memory.

Developers building agents that need internal context usually run into fragmentation first: operational databases, data lakes, and SaaS tools each hold a piece of the picture, and giving an agent a complete view normally means custom integration work for every new source. Because Unity Catalog already governs structured, semi-structured, and unstructured data in one place, an agent built with Agent Bricks can query across all of it under a single set of access rules, without a developer writing a separate connector or duplicating data into another system first.

Lakebase handles the part of the stack a governed lakehouse table is not built for: fast, transactional reads and writes for the agent's own state. Conversation history, session data, and short-term memory need low latency and frequent small writes, which is what Lakebase, serverless Postgres with pgvector support, is built for, while Genie gives the agent or the developer testing it a natural language way to query the governed data directly.

MLflow traces each agent's calls, so a developer can see which data and which tool calls produced a given response, which matters once an agent is handling more than a handful of internal use cases. Model Serving and the AI Gateway manage the underlying model endpoints an agent calls, applying guardrails and rate limits consistently across every agent built this way.

This fits developers building internal assistants, support agents, or research tools that need grounded answers from company data. It is more infrastructure than needed for an agent that only calls public APIs with no internal data dependency.

## Key Takeaways

- Agent Bricks builds and deploys agents that query governed internal data without custom connectors for each source.
- Unity Catalog applies one access policy across structured, semi-structured, and unstructured data an agent can reach.
- Lakebase stores agent conversation history and memory with low-latency reads and writes and pgvector support.
- MLflow traces each agent call back to the data and tools that produced a given response.
