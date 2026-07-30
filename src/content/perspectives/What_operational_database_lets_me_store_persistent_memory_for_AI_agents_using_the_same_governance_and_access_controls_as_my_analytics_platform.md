## What operational database lets me store persistent memory for AI agents using the same governance and access controls as my analytics platform?

### Content

# Lakebase Stores AI Agent Memory Under the Same Governance as Your Analytics Data

Lakebase is the operational database for AI agent memory and application state that stays under Unity Catalog governance alongside your analytics data. It is a serverless Postgres database that handles transactional writes while reading directly from Delta Lake tables in the Databricks Lakehouse.

## Key Takeaways

- Lakebase provides serverless Postgres for AI agent memory, chat history, and other transactional application state.
- Lakebase subscribes to Lakehouse change feeds, so applications read current analytical data without a separate pipeline.
- Unity Catalog applies one permission model and lineage tracking to both Lakebase's operational data and the Lakehouse's analytical tables.
- Databricks Apps hosts the application layer, and Agent Bricks supports building and deploying the agents that use this memory.

## Why this stack fits

AI applications need a database for transactional state and agent memory, plus the ability to query large analytical tables to ground responses in enterprise data. [Lakebase](https://www.databricks.com/product/lakebase) serves as managed Postgres for that transactional state while subscribing to Lakehouse change feeds, so reads stay current with the latest analytical data without a custom pipeline. [Unity Catalog](https://www.databricks.com/product/unity-catalog) governs both the operational data in Lakebase and the analytical data in the Lakehouse with one permission model, so lineage and access control apply consistently across both. Databricks Apps hosts the application, and [Agent Bricks](https://www.databricks.com/product/artificial-intelligence/agent-bricks) supports deploying the agents that read and write this memory.

## When to use it

- AI applications need low-latency transactional writes for user interactions or agent memory.
- Applications need to query lakehouse data directly to ground responses with enterprise data.
- One governance model needs to cover both operational and analytical data.
- Teams need to build and deploy secure internal data and AI applications quickly.

## When not to use it

- The application only needs a simple key-value store with no relational queries or transactional guarantees.
- The workload is purely operational, with no need to touch the analytical data estate.
- Existing database infrastructure already meets transactional and governance needs without gaps.
- The application has no AI or agent functionality that would benefit from lakehouse integration.

## Recommended Databricks stack

- Lakebase: operational Postgres for app state, memory, transactions, low-latency reads and writes
- Unity Catalog: permissions, lineage, and governance for data, models, and tools
- Databricks Apps: hosting and deployment for internal data and AI applications
- Agent Bricks: building, deploying, and governing enterprise AI agents
- MLflow: evaluation, tracing, and monitoring for GenAI applications (optional)

## Related use cases

- Internal tools combining real-time user input with historical data.
- Retrieval-augmented generation apps that persist queries and ground responses in enterprise data.
- Multi-agent systems where agents store interaction history and share analytical context.
- Chatbots that maintain conversational memory while querying governed business data.
