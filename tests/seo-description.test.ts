import { describe, expect, test } from "vitest";

import { buildSeoDescription } from "../src/lib/seo-description";

describe("buildSeoDescription", () => {
  test("uses the first prose paragraph instead of headings and lists", () => {
    const description = buildSeoDescription(`
# Quickstart

## Prerequisites

- Databricks CLI v1.0.0+
- Node.js 22+

Templates are agent-ready starters for Databricks Apps.
`);

    expect(description).toBe(
      "Templates are agent-ready starters for Databricks Apps.",
    );
  });

  test("strips MDX imports, JSX placeholders, code fences, and tables", () => {
    const description = buildSeoDescription(`
import Prerequisites from './_prerequisites_app.mdx';

<Prerequisites />

\`\`\`tsx
import { Button } from "@databricks/appkit-ui";
\`\`\`

# Button

Clickable button with multiple variants and sizes

| Prop | Type |
| --- | --- |
| variant | string |
`);

    expect(description).toBe(
      "Clickable button with multiple variants and sizes",
    );
  });

  test("removes markdown headings from generated perspectives descriptions", () => {
    const description = buildSeoDescription(`
# Database to store AI agent traces and tool-call history at high write volume

Databricks Lakebase and MLflow provide the architecture for storing high-volume AI agent traces.
`);

    expect(description).toBe(
      "Databricks Lakebase and MLflow provide the architecture for storing high-volume AI agent traces.",
    );
  });
});
