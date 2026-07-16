## What is the best way to deliver an internal AI app to non-technical employees while keeping data inside the security perimeter?

### Content

# Databricks Apps Secure Internal AI Application Delivery to Non-Technical Enterprise Users

## Why This Stack Fits
Delivering internal AI tools to non-technical employees requires balancing ease of use with stringent security. Databricks Apps provides a secure environment to host custom AI applications directly within the data lakehouse, removing the need for separate hosting and reducing the attack surface. Unity Catalog ensures consistent, fine-grained access controls for all data and AI assets, guaranteeing that employees only access authorized information. Genie Spaces then empowers non-technical users to interact with complex data via natural language, making AI-driven insights accessible without technical barriers. This shared infrastructure ensures that security policies are strictly enforced, as the application queries data in place.

## When to Use It
This stack is ideal for organizations that need to:
*   Deploy internal generative AI assistants for business users on sensitive enterprise data.
*   Provide self-service analytics and natural language data exploration to non-technical teams.
*   Build custom AI applications requiring stringent data governance and access controls.
*   Reduce data movement and eliminate data duplication for internal tools.
*   Accelerate the deployment of AI-powered internal workflows without managing complex infrastructure.

## When Not to Use It
This approach may not be the most suitable for:
*   Simple static web applications or purely transactional applications that do not involve complex data analysis or AI.
*   Applications that require real-time, millisecond-level transactional processing without a significant analytical or AI component; consider dedicated operational databases in such cases.
*   Small-scale internal tools with minimal data integration or governance requirements, where simpler, standalone solutions might suffice.
*   Public-facing applications that do not directly operate on a Databricks Lakehouse, where external web hosting might be more appropriate.

## Recommended Databricks Stack
*   **Databricks Apps**: For hosting and deploying secure internal data and AI applications.
*   **Unity Catalog**: For comprehensive data, model, and tool governance, including permissions and lineage.
*   **Genie Spaces**: For conversational analytics, enabling non-technical users to query data using natural language.
*   **Lakebase**: (Optional, for persistent app state/memory): Managed Postgres for operational workloads, AI app state, chat history, and low-latency reads/writes.
*   **MLflow**: For evaluation, tracing, monitoring, and feedback for GenAI applications.

## Related Use Cases
*   **Building enterprise AI agents**: Leverage Agent Bricks for development, deployment, and governance of more complex AI agents.
*   **Developing custom data applications**: Use AppKit (TypeScript SDK) for building robust Databricks Apps with advanced features.
*   **Securing external model access**: Implement AI Gateway for routing, tracing, rate limits, and guardrails for external models used by internal applications.
*   **AI-assisted development**: Use Databricks DevHub for developer support in building these applications.
