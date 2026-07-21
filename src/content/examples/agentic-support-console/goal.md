This template brings together the full Databricks developer stack into a single operational data application: an AI-powered support console where every customer message is automatically triaged by an LLM, and support agents review, approve, or override the suggestion from a purpose-built internal tool.

### Data Flow

Customer interactions flow from your application's OLTP database (Lakebase Postgres) through the lakehouse via CDC, get enriched by an AI agent, and are served back to the support console through reverse sync:

1. **OLTP writes** land in Lakebase Postgres (users, orders, support cases, messages).
2. **Lakebase Change Data Feed (CDF)** replicates every change into Unity Catalog as CDC history tables (bronze layer).
3. A **Lakeflow Spark Declarative Pipeline** transforms CDC history into current-state silver tables and analytical gold materialized views (daily revenue, support overview, user profiles, case context).
4. A **Lakeflow Job** runs every minute, finds unanswered messages, builds rich context from gold tables, calls an LLM via a Model Serving endpoint, and merges suggested responses into a Delta table.
5. **Synced tables** (reverse sync) replicate gold tables back into Lakebase for low-latency reads.
6. The **Support Console** (Databricks App) reads from both OLTP and synced gold tables to present cases, AI suggestions, and analytics.

### What to Adapt

Provisioning (manual steps and SQL), seeding, pipeline deploys, reverse sync, and app deploy are documented in the repository’s **`README.md`** alongside the code.

To make this template your own:

- **Catalog**: Set the `catalog` variable in each pipeline's `databricks.yml` to your Unity Catalog catalog name.
- **Lakebase**: Point the app's `databricks.yml` at your own Lakebase project, branch, and database.
- **Tables**: The seed script creates the OLTP schema. After seeding, configure Change Data Feed to replicate your `public` schema tables.
- **Sync Tables**: Manually create the four reverse sync configurations (see the README for the exact table mappings).
- **Serving Endpoint**: Set the `endpoint` variable to your preferred model serving endpoint.
- **Genie Agent**: Create a Genie Agent over your gold tables and set the `genie_space_id` in the app bundle.
