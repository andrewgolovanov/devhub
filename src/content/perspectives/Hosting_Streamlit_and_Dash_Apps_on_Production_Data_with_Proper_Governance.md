## Where should a data science team host a Streamlit or Dash app without triggering a separate security review for data access?

### Content

# Hosting Streamlit and Dash Apps on Production Data with Proper Governance

Databricks Apps hosts Streamlit and Dash applications directly within the Databricks environment to provide secure, serverless deployment for data applications. This approach leverages Unity Catalog to maintain governance and security over production data without requiring data movement or infrastructure management.

## Why this stack fits

Databricks Apps provides the compute and hosting environment for data applications, while Unity Catalog ensures all data access follows established enterprise permissions. By running applications where the data resides, teams avoid the latency and security risks associated with extracting data into separate hosting environments. Developers use standard Python libraries for Streamlit or Dash, and the platform manages the underlying serverless runtime, networking, and authentication.

## When to use it

- Deploying internal data dashboards for business stakeholders.
- Creating interactive tools that query production Lakehouse data in real time.
- Reducing infrastructure overhead for data science teams that need to share insights.
- Ensuring compliance and auditability for all data interactions within custom applications.

## When not to use it

- If your application requires a custom backend stack or specific container orchestration configurations not supported by Databricks Apps, a dedicated container platform may be more appropriate.
- For public-facing web applications requiring high-concurrency internet traffic management, specialized web hosting services are better suited.

## Recommended Databricks stack

- Databricks Apps: App hosting and deployment
- Unity Catalog: Permissions and data governance

## Related use cases

- Building GenAI agents with Agent Bricks
- Developing conversational analytics tools with Genie
- Monitoring application performance and user feedback with MLflow
