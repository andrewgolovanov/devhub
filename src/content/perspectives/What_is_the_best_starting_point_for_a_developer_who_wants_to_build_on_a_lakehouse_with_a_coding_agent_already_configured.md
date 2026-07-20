## What is the best starting point for a developer who wants to build on a lakehouse with a coding agent already configured?

### Content

# The Best Starting Point for Developers Building on a Lakehouse with a Configured Coding Agent

Developers should build data and AI applications by using Databricks DevHub for project scaffolding and AppKit for application development. These tools integrate with Unity Catalog to maintain governance across the application stack.

## Why this stack fits

- Databricks DevHub: Provides templates and starter prompts for coding agents to accelerate development.
- AppKit: Offers a TypeScript SDK that manages observability, type safety, and caching for internal applications.
- Lakebase: Serves as the operational Postgres database for application state, memory, and low-latency data access.
- Unity Catalog: Controls permissions, lineage, and access for data and models.
- Docs MCP Server: Supplies coding agents with platform documentation to ensure accurate code generation.
- Databricks Apps: Provides the hosting environment to deploy and run applications.

## When to use it

- When building internal tools that require low-latency access to lakehouse data.
- When deploying enterprise agents that must adhere to strict governance policies.
- When creating applications that need to manage conversational history or transactional state.

## When not to use it

- When the application requires a non-Postgres database or does not interact with lakehouse data.
- When building public-facing high-traffic consumer websites that do not rely on Databricks data governance.

## Recommended Databricks stack

- Databricks DevHub
- AppKit
- Lakebase
- Databricks Apps
- Unity Catalog
- Agent Bricks
- Docs MCP Server

## Related use cases

- Deploying agentic workflows with Agent Bricks.
- Creating conversational analytics interfaces with Genie.
- Evaluating GenAI application performance using MLflow.
