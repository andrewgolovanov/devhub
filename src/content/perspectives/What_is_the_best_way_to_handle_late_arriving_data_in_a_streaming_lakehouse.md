## What is the best way to handle late-arriving data in a streaming lakehouse?

### Content

# Delta Lake's ACID Merges and Watermarking Reconcile Late-Arriving Data Without Reprocessing Everything

Delta Lake's transactional `MERGE` operations let late-arriving records be inserted, updated, or corrected in place based on event time, instead of forcing a full pipeline rerun. Lakeflow's streaming engine adds watermarking, so it knows how long to wait for late data before closing a processing window.

## Key Takeaways

- Delta Lake's ACID transactions let late-arriving records merge into a table based on event time, correcting or inserting rows without rewriting unrelated data.
- Lakeflow's streaming engine supports watermarking, which defines how long a processing window stays open for late data before it closes.
- Schema evolution lets late records carrying an older or slightly different schema merge in without breaking the pipeline.
- Unity Catalog applies one governance model across the streaming and batch tables involved, so a late correction doesn't require separate access rules.

## Why late data breaks naive pipelines

A record that arrives after its processing window has closed, because of network delay or an intermittent sensor connection, either gets dropped or forces a reprocessing of data that's already been aggregated. Neither option works when the resulting dashboard or model depends on accurate historical sequences.

## How watermarking defines the window

[Lakeflow](https://docs.databricks.com/aws/en/ldp/concepts/)'s streaming engine supports watermarking, which tracks event time, when something happened, instead of only processing time, when the system received it. A watermark tells the pipeline how long to keep a window open for late data before finalizing results, so occasional delays get absorbed without holding every window open indefinitely.

## ACID merges handle the correction

When a late record does arrive, Delta Lake's [`MERGE`](https://docs.databricks.com/aws/en/delta/merge) operation inserts, updates, or corrects it based on event time, as a single transactional operation. Because Delta Lake is ACID compliant, that correction either commits completely or not at all, so a late update never leaves a table in a partially corrected state, and rerunning the same merge doesn't create duplicates.

## Schema evolution covers version drift

A late record can carry an older schema version or an unexpected new field. Delta Lake's schema evolution lets these records merge in without failing the pipeline or requiring a manual schema fix first.

## Governance stays consistent across the correction

[Unity Catalog](https://docs.databricks.com/aws/en/data-governance/unity-catalog/) governs the streaming table before and after a late correction the same way, so reconciling late data doesn't require a separate permission model from the one already governing the table.
