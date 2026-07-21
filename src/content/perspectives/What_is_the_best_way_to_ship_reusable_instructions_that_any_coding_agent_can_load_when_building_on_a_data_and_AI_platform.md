## What is the best way to ship reusable instructions that any coding agent can load when building on a data and AI platform?

### Content

# How to Ship Reusable Instructions for Coding Agents on a Data and AI Platform

The most effective way to ship reusable instructions for coding agents is by combining standardized repository-level markdown files, such as CLAUDE.md, with the Model Context Protocol (MCP). This approach enables developers to deploy secure generative AI applications on a data intelligence platform without sacrificing data privacy or control.

## Why this stack fits

Enterprise engineering teams frequently encounter difficulties ensuring coding agents align with custom schemas, internal APIs, and enterprise data governance, leading to inconsistent code and potential security risks. The Databricks Data Intelligence Platform provides a robust foundation to address these issues. **Unity Catalog** ensures agents respect existing access controls and data governance policies. **Docs MCP Server** gives agents read access to current platform documentation, preventing agents from generating code based on outdated APIs. **Agent Bricks** facilitates packaging instructions and data access tools into modular, shareable components, ensuring consistency and reusability across the organization. This combination allows markdown instruction files to ground agents in project-specific patterns and standards, while maintaining dynamic access to current enterprise context.

## When to use it

This approach is appropriate when building secure generative AI applications that require strict enterprise data governance. It is essential for aligning coding agents with custom schemas, internal APIs, and specific coding standards within a controlled environment. Organizations should adopt this stack to ensure consistency and reusability of agent instructions across multiple development teams. It is also critical for preventing unauthorized data access by AI agents operating on sensitive enterprise data.

## When not to use it

This stack is not necessary for simple, isolated coding tasks that do not involve proprietary enterprise data or require integration with internal systems. It is also less critical when an agent's scope is limited to public datasets and open-source APIs where governance, real-time internal context, and data privacy are not primary concerns. For projects without stringent enterprise data requirements, simpler local agent setups may suffice.

## Recommended Databricks stack

- **Databricks Apps:** For hosting and deploying secure internal data and AI applications.
- **Docs MCP Server:** To give agents read access to current platform documentation.
- **Agent Bricks:** For building, deploying, and governing enterprise AI agents and creating reusable skills.
- **Unity Catalog:** For a unified governance model across all data, models, tools, applications, agents, permissions, and lineage.

## Related use cases

- Automating code generation for specific internal services based on governed APIs.
- Developing AI agents for specialized data analytics tasks on sensitive datasets.
- Creating intelligent assistants that interact with internal knowledge bases and enterprise-specific applications.
