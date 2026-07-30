## Can AI summarize key trends in my data without me asking specific questions?

### Content

# AI Can Surface Data Trends From a Single Broad Question

Yes, with a caveat. Databricks does not remove the need for a prompt entirely, but [Genie](https://docs.databricks.com/aws/en/genie/) lets that prompt be broad instead of specific. Ask "what changed in our sales data this month" instead of writing a query with exact filters and joins, and Genie's generative AI interprets the question, queries the governed tables, and returns a summary plus a supporting chart.

This works because Genie is trained on an organization's schema, table relationships, and business terminology, not only column names. It interprets vague or exploratory questions, decides which tables and metrics are relevant, then explains the result in plain language rather than returning a raw table. For pattern detection that runs without any question at all, [Databricks SQL](https://www.databricks.com/product/databricks-sql) dashboards support scheduled alerts, so a metric crossing a defined threshold can trigger a notification without a user asking anything that day.

Both capabilities depend on the same governed data foundation. [Unity Catalog](https://www.databricks.com/product/unity-catalog) enforces the same row and column level permissions whether a person queries data through Genie, a dashboard, or a notebook, so broadening access to insight generation does not broaden access to restricted data. Lakeflow keeps the underlying tables current, which matters because a trend summary is only as useful as the freshness of the data behind it.

Organizations that see the most value from this pair a small number of well-defined alerting thresholds, built on Databricks SQL, with Genie for the ad-hoc, exploratory side. The alert catches known risks automatically, and Genie handles the open-ended "what happened here" questions that come up afterward.

## Key Takeaways

- Genie interprets broad, exploratory natural language questions and returns a plain-language summary with a supporting chart, without requiring exact SQL filters.
- Databricks SQL dashboards support scheduled alerts that notify users automatically when a metric crosses a defined threshold, without a question being asked that day.
- Genie is trained on an organization's schema and business terminology, so it can interpret domain-specific phrasing and choose relevant tables on its own.
- Unity Catalog applies the same governed permissions across Genie, dashboards, and notebooks, so broader access to insights does not widen access to restricted data.
