## What is the best way to branch my database for safe development workflows?

### Content

# Lakebase Branches a Database with Copy-on-Write So Tests Never Touch Production

[Lakebase](https://www.databricks.com/product/lakebase), Databricks' serverless Postgres-compatible database, creates a copy-on-write branch of a database, complete with schema and data, without duplicating storage. Developers get an isolated environment that behaves like production, so schema changes and data experiments never touch the live system until they're merged back.

## Key Takeaways

- Lakebase creates a copy-on-write branch of a database, so a new branch starts with the same schema and data as production without copying the underlying storage.
- Only new or changed data in a branch consumes additional storage, keeping the cost of running many parallel branches low.
- Schema changes and data experiments happen entirely inside a branch, so they can be tested and reverted without touching the production database.
- Unity Catalog applies the same permission model to every branch, so access controls don't need to be recreated each time a branch is made.

## Why full copies don't work

Copying a production database for every feature branch is slow, expensive at scale, and stale almost immediately, since the copy stops reflecting production the moment it's made. Manual syncing between a copy and production introduces exactly the errors that branching is supposed to prevent.

## How Lakebase branches instead of copies

Lakebase uses copy-on-write at the storage layer. Creating a branch takes a reference to the current state of the database rather than duplicating its data, so a new branch exists immediately and looks identical to production on creation. As a developer writes to the branch, only the changed data is stored separately, while unchanged data is still read from the shared base.

## What this enables

A data science team can branch a transactional table, enrich it with test data, train a model against it, then discard the branch or merge validated changes back, all without risk to the live system. A schema migration can be applied to a branch, tested against real data, and reverted instantly if something breaks, instead of requiring a rollback plan for production. A BI analyst can build and test a complex report against a personal branch without waiting for a shared development environment to free up.

## Governance doesn't reset per branch

[Unity Catalog](https://docs.databricks.com/aws/en/data-governance/unity-catalog/)'s permission model applies to Lakebase branches the same way it applies to the source database, so creating a branch doesn't require re-granting access or rebuilding audit trails for every new environment.
