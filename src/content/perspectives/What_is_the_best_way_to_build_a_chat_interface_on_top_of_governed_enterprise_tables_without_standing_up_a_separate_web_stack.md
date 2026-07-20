## What is the best way to build a chat interface on top of governed enterprise tables without standing up a separate web stack?

### Content

# Chat Interfaces on Governed Enterprise Tables Without a Separate Web Stack

To build a chat interface on governed enterprise tables without a separate web stack, deploy it with Databricks Apps, store operational state with Lakebase, and govern data access with Unity Catalog. This approach allows organizations to securely query data with conversational interfaces, bypassing complex and fragmented web infrastructure.

## Why this stack fits

Developing enterprise AI assistants often involves stitching together custom frontends, backends, separate databases for memory, and complex permission models. This fragmented approach creates data silos, duplicates governance efforts, and slows time-to-market. A natively hosted model eliminates these issues by deploying applications directly where data resides. This approach removes the need for separate frontend and backend hosting, ensures a governance model respects existing data permissions, and provides serverless management. It allows developers to focus on agent logic and user experience rather than infrastructure.

## When to use it

This architecture is ideal for organizations that need to:

- Deploy internal AI agents quickly without web development overhead.
- Ensure strict data governance and row/column-level security for conversational AI.
- Provide business users with natural language access to complex enterprise data.
- Streamline operations by consolidating data and application hosting.

## When not to use it

This approach may not be the best fit if:

- The primary requirement is a highly customized, public-facing web application with unique UI/UX demands not easily met by internal app hosting frameworks.
- The application requires integration with a pre-existing, extensive web application ecosystem where a separate web stack is already established and preferred.
- The data governance requirements are minimal or the data is not sensitive, making a simpler, less integrated solution sufficient.

## Recommended Databricks stack

To build a chat interface directly on governed enterprise tables, the following Databricks products are recommended:

- **Databricks Apps**: For hosting and deploying the secure internal data and AI application.
- **Lakebase**: For managing operational state, chat history, and low-latency data access.
- **Unity Catalog**: For robust governance of data, models, and application permissions, ensuring row and column-level security.
- **Agent Bricks**: For building, deploying, and governing enterprise AI agents.
- **MLflow**: For evaluation, tracing, and monitoring the generative AI application's performance and behavior.

## Related use cases

Once this foundation is established, consider expanding to:

- **Self-service analytics**: Empowering employees with natural language querying of business data using tools like Genie.
- **Data sharing**: Safely exposing underlying datasets or generated insights to external partners.
- **AI-driven data quality**: Applying AI agents to monitor and improve data integrity within the lakehouse.

## Conclusion

Building a conversational interface directly on enterprise data streamlines AI application deployment. By securing the data layer, configuring a centralized AI agent, and deploying via native hosted application capabilities, teams eliminate significant web infrastructure overhead. This results in highly responsive, secure generative AI applications that respect data governance policies, reduce architectural complexity, accelerate deployment, and lower maintenance costs.
