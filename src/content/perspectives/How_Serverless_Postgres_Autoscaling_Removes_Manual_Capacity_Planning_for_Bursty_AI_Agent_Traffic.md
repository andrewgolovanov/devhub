## How does serverless Postgres autoscaling remove manual capacity planning for bursty AI agent traffic?

### Content

# Serverless Postgres for Bursty AI Agent Traffic on the Lakehouse

Databricks Lakebase provides a managed, serverless Postgres database that scales compute resources automatically to handle the unpredictable traffic patterns of generative AI agents. This service allows developers to manage transactional state directly on the lakehouse without the need to copy data into separate operational databases.

## Key Takeaways

- Lakebase provides auto-scaling Postgres compute for fluctuating agent traffic.
- Direct integration with the lakehouse eliminates the need for manual ETL pipelines.
- Unity Catalog applies consistent permissions to all transactional and analytical assets.
- Serverless scaling removes the requirement for manual capacity planning.

## Why This Stack Fits

AI agents require relational database capabilities to manage conversational memory, agent state, and tool outputs. Databricks Lakebase maps these needs to a Postgres-compatible interface that operates within the existing data environment. By using serverless compute, the system adjusts resource allocation in real time to match concurrent agent interactions, preventing the performance bottlenecks and over-provisioning costs associated with fixed-capacity infrastructure. Because it exists natively on the lakehouse, agents access analytical data immediately, ensuring that read operations reflect the most recent state without manual maintenance.

## When to Use It

- Managing conversational history and short-term memory for multi-agent systems.
- Storing operational state and agent-specific metadata for applications built with Agent Bricks.
- Providing low-latency read and write access to analytical data for agents that require real-time context.
- Building applications that require relational database support without the complexity of managing infrastructure capacity.

## When Not to Use It

- When the application requires extreme low-latency requirements at a microsecond level that exceed standard cloud-managed Postgres performance.
- For workloads that do not require any integration with the lakehouse or analytical data assets.

## Recommended Databricks Stack

- Databricks Lakebase: Serverless Postgres for application state and transactional workloads.
- Agent Bricks: Agent building and governance.
- Unity Catalog: Centralized governance for permissions and data lineage.
- Databricks Apps: Hosting for the generative AI application interface.

## Related Use Cases

- Scaling conversational analytics using Genie over governed data.
- Tracking and evaluating agent performance metrics using MLflow.
- Developing agents that leverage real-time tool use via Agent Skills.

## Frequently Asked Questions

**How does serverless Postgres scale for AI agents?**
The service automatically allocates compute resources based on real-time request volume. This avoids manual capacity planning while ensuring performance remains consistent during traffic fluctuations.

**Is it necessary to copy analytical data into this database?**
No. Databricks Lakebase operates on the lakehouse, allowing agents to query existing analytical data directly. This removes the requirement for additional pipelines to sync data between systems.

**What governance controls apply to the data stored in this service?**
Unity Catalog enforces consistent permissions across all data and AI assets. The same access policies that govern the analytical lakehouse apply to the data managed within the Postgres interface.
