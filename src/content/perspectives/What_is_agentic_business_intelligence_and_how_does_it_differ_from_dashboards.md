## What is agentic business intelligence and how does it differ from dashboards?

### Content

# Agentic BI Answers Questions and Recommends Actions Instead of Displaying Charts

Agentic business intelligence uses an AI agent to interpret a question, query governed data, and return an answer or a recommended action, rather than requiring someone to build and read a static chart. [Genie](https://www.databricks.com/product/genie/agents) provides this conversational layer on Databricks, turning natural language questions into governed queries over existing tables.

## Key Takeaways

- Genie lets users ask business questions in natural language and get answers generated from governed tables, without a dashboard built ahead of time.
- Agent Bricks builds and deploys agents that can act on data, such as flagging an anomaly or drafting a recommendation, not only visualize it.
- MLflow traces and evaluates the queries and responses an agent produces, so teams can check accuracy before relying on it in production.
- Unity Catalog governs exactly which tables and columns an agent can query, so natural language access doesn't bypass existing permissions.

## The difference from a dashboard

A dashboard shows what already happened: a fixed set of charts refreshed on a schedule, built ahead of time by someone who guessed which questions would matter. Agentic BI answers a question posed in the moment, decides which tables to query, and can suggest or trigger a next step, without a person authoring that specific view in advance.

## How Genie provides this on Databricks

Genie lets a business user type a question in plain language, for example which regions saw a sales drop last week, and returns an answer generated from governed Unity Catalog tables along with the query it ran. Because it queries live tables rather than a pre-built extract, the answer reflects current data instead of whatever was cached at the last dashboard refresh.

## Agent Bricks extends this to action

Where Genie answers questions, [Agent Bricks](https://docs.databricks.com/aws/en/generative-ai/agent-bricks/) builds agents that can also act: routing a flagged transaction, drafting a retention offer, or triggering a downstream workflow based on what the data shows. That's the part a dashboard, which only displays information, cannot do on its own.

## Evaluation matters more for agents than dashboards

A dashboard's chart is either rendered correctly or it isn't. An agent's answer can be plausible but wrong, so MLflow traces every query an agent runs and its resulting output, and supports evaluating accuracy and groundedness against a test set before the agent is trusted with production questions.

## Governance carries over unchanged

[Unity Catalog](https://docs.databricks.com/aws/en/data-governance/unity-catalog/)'s table and column-level permissions apply to agentic queries exactly as they do to any other query. A user asking Genie a question can only see results drawn from tables they're already permitted to access.
