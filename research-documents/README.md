# Research Documents

This directory contains research papers and technical documents published by TIVerse Labs.

## Document Format

Research documents should be written in Markdown (`.md` or `.mdx`) with frontmatter metadata:

```markdown
---
title: "Your Research Paper Title"
authors: 
  - "Author Name 1"
  - "Author Name 2"
date: "2024-01-15"
abstract: "Brief abstract describing the research..."
category: "Category Name"
tags: 
  - "tag1"
  - "tag2"
featured: true
status: "published"
doi: "10.xxxx/xxxxx"
pdfUrl: "/path/to/pdf"
externalUrl: "https://external-link.com"
readTime: "20 min read"
---

# Your Document Content Here

...
```

## Metadata Fields

### Required Fields

- **title**: The title of the research paper
- **authors**: Array of author names
- **date**: Publication date (YYYY-MM-DD format)
- **abstract**: Brief summary of the research
- **category**: Research category
- **tags**: Array of relevant tags

### Optional Fields

- **featured**: Boolean, whether to feature on main page (default: false)
- **status**: "published" | "preprint" | "draft" (default: "published")
- **doi**: Digital Object Identifier
- **pdfUrl**: Link to PDF version
- **externalUrl**: Link to external publication (e.g., arXiv)
- **readTime**: Estimated reading time
- **citations**: Array of citation objects

## Categories

Available categories:
- Infrastructure
- AI/ML
- DevOps
- Security
- Data Engineering
- Quantum Computing
- Performance
- Architecture

## Writing Guidelines

### 1. Structure

Use clear heading hierarchy:
- `# ` for main title
- `## ` for major sections
- `### ` for subsections

### 2. Code Examples

Include code examples with syntax highlighting:

\`\`\`python
def example_function():
    return "Hello, World!"
\`\`\`

### 3. Tables

Use Markdown tables for data:

| Metric | Value |
|--------|-------|
| Accuracy | 95% |

### 4. Mathematical Equations

Use LaTeX syntax for equations:

Inline: `$E = mc^2$`
Block: `$$\\sum_{i=1}^{n} x_i$$`

### 5. Images

Store images in `/public/research/` and reference them:

```markdown
![Description](/research/images/diagram.png)
```

## Publishing Process

1. Create your markdown file in this directory
2. Add proper frontmatter metadata
3. Write your research content
4. Test locally with `npm run dev`
5. Commit and push to repository

The research document will automatically appear on the `/research` page.

## External API Integration

To fetch research from external sources (arXiv, bioRxiv, etc.), modify `/lib/research.ts`:

```typescript
export async function getExternalResearchDocuments(): Promise<ResearchDocument[]> {
  // Add your API integration here
  const response = await fetch('https://api.example.com/papers');
  const data = await response.json();
  return data.map(transformToResearchDocument);
}
```

## Contributing

See our [Contributing Guide](../CONTRIBUTING.md) for more information on submitting research papers.

## License

All research documents in this directory are licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) unless otherwise specified.
