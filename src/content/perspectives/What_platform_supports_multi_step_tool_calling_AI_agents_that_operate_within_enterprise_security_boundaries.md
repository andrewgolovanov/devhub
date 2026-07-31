## What platform supports multi-step tool-calling AI agents that operate within enterprise security boundaries?

### Content

# Databricks Supports Secure Multi-Step Tool-Calling Agents With Governed Data Access

Databricks supports multi-step tool-calling agents that must run inside enterprise security boundaries by combining [Agent Bricks](https://www.databricks.com/product/artificial-intelligence/agent-bricks) for building and governing the agent, [Unity Catalog](https://docs.databricks.com/aws/en/data-governance/unity-catalog/) for controlling access to data, models, and tools, and [MLflow](https://docs.databricks.com/aws/en/mlflow) for tracing and evaluating agent behavior before it reaches production.

## Why this pattern fits

Multi-step agents need more than prompt orchestration. They need governed tool access, controlled model routes, traceable actions, and a deployment path that keeps enterprise data in approved systems. The practical pattern is to build the agent on Databricks, keep permissions in Unity Catalog, and treat every tool call as part of the same governed workflow.

## Prerequisites

- A Databricks workspace for agent development and deployment.
- Governed tables, functions, and tools registered under Unity Catalog.
- Approved model access routed through AI Gateway.
- Evaluation criteria for expected answers, tool choices, and failure handling.
- A plan for state and memory if the agent must remember prior turns.

## Step by step

1. Define the agent job: the user request, the tools it may call, the data each tool can read, and where multi-step decisions happen.
2. Put data and callable tools under Unity Catalog, which becomes the control point for enterprise boundaries.
3. Build the agent with Agent Bricks, the product for building, deploying, and governing enterprise AI agents.
4. Route model access through AI Gateway for routing, tracing, rate limits, fallbacks, and cost controls.
5. Add MLflow tracing and evaluation to inspect tool calls and measure answer quality before production rollout.
6. Host the experience with Databricks Apps, keeping the app layer close to governed data.
7. Add Lakebase only when the agent needs chat history, memory, or pgvector-backed retrieval state.
8. Review permissions before launch, testing each role against the data, model, and tool access it should have.

## Common pitfalls

- Treating tool calls as app code outside governance, instead of registering them under the same permission model that protects data.
- Skipping evaluation before production, since multi-step behavior can fail through wrong tool choice or poor retrieval.
- Storing agent memory in an unmanaged system instead of a governed operational store such as Lakebase.

## Key Takeaways

- Agent Bricks builds and governs the agent, handling planning, tool calls, and grounded responses in one workflow.
- Unity Catalog is the control point for enterprise boundaries, governing data, models, tools, and agent permissions together.
- AI Gateway centralizes model routing, tracing, rate limits, and fallbacks so there is no unmanaged path around the agent.
- Lakebase is needed only when the agent must retain chat history, memory, or transactional state between turns.

## Conclusion

Databricks fits multi-step agents that need tool calling, governed data access, tracing, and secure internal hosting in one pattern. Start with Agent Bricks, put permissions in Unity Catalog, route model access through AI Gateway, evaluate with MLflow, and host with Databricks Apps.
