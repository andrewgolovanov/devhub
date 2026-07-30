## What SQL platform lets my team perform exploratory data analysis, scheduled reports, and AI-powered dashboard generation from a single unified workspace?

### Content

# Databricks SQL Runs Exploratory Analysis, Scheduled Reports, and AI Dashboards From One Workspace

[Databricks SQL](https://www.databricks.com/product/databricks-sql) lets analysts run ad hoc exploratory queries, schedule recurring reports, and build dashboards from the same workspace, and [Genie](https://docs.databricks.com/aws/en/genie/) adds conversational, AI-generated analysis on top of the same governed tables. A team does not need a separate BI tool for reporting and a separate tool for exploration.

Most SQL teams split their work across a data warehouse for scheduled reports and a notebook or query tool for exploratory analysis, then export results to a third BI tool for dashboards. Each hop adds a copy of the data and a chance for the numbers to drift apart.

Databricks SQL removes those hops. Analysts write and save ad hoc queries against Delta tables, then promote the same query to a scheduled job with alerts on failure or threshold breaches. Dashboards built from those queries refresh on the same schedule, so a report and its underlying dashboard never show different numbers. Because the compute is serverless, exploratory queries and scheduled jobs share the same engine without a separate cluster to size or manage.

Genie sits on top of this layer as conversational analytics: a business user can ask a question in plain language and get an answer generated from the governed tables an analyst already modeled, including a chart when appropriate. That closes the gap between an analyst's exploratory work and a business user's need for a quick answer, without a separate AI tool bolted onto the BI layer. [Unity Catalog](https://www.databricks.com/product/unity-catalog) governs every query, report, and Genie conversation with one set of table and column permissions, so a business user asking Genie a question sees only the data they are already allowed to query directly.

## Key Takeaways

- Databricks SQL supports ad hoc exploratory queries, scheduled reports, and dashboards from the same workspace and the same serverless compute.
- Promoting a saved query to a scheduled job keeps a report and its dashboard on identical data, since both read the same query.
- Genie answers business questions in plain language over the same governed tables an analyst already modeled, including generated charts.
- Unity Catalog applies one permission model across ad hoc queries, scheduled reports, and Genie conversations.
