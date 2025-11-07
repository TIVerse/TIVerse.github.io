import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface ResearchDocument {
  slug: string;
  title: string;
  authors: string[];
  date: string;
  abstract: string;
  category: string;
  tags: string[];
  featured: boolean;
  pdfUrl?: string;
  externalUrl?: string;
  readTime: string;
  content: string;
  citations?: Citation[];
  doi?: string;
  status: 'published' | 'preprint' | 'draft';
}

export interface Citation {
  id: string;
  text: string;
  url?: string;
}

const researchDirectory = path.join(process.cwd(), 'research-documents');

/**
 * Get all research documents from local files
 */
export async function getLocalResearchDocuments(): Promise<ResearchDocument[]> {
  try {
    // Check if directory exists
    if (!fs.existsSync(researchDirectory)) {
      return [];
    }

    const fileNames = fs.readdirSync(researchDirectory);
    const allDocuments = fileNames
      .filter(fileName => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
      .map(fileName => {
        const slug = fileName.replace(/\.mdx?$/, '');
        const fullPath = path.join(researchDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
          slug,
          title: data.title || 'Untitled',
          authors: data.authors || [],
          date: data.date || new Date().toISOString(),
          abstract: data.abstract || '',
          category: data.category || 'General',
          tags: data.tags || [],
          featured: data.featured || false,
          pdfUrl: data.pdfUrl,
          externalUrl: data.externalUrl,
          readTime: data.readTime || calculateReadTime(content),
          content,
          citations: data.citations,
          doi: data.doi,
          status: data.status || 'published',
        } as ResearchDocument;
      });

    // Sort by date (newest first)
    return allDocuments.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error('Error loading local research documents:', error);
    return [];
  }
}

/**
 * Get a single research document by slug
 */
export async function getResearchDocumentBySlug(slug: string): Promise<ResearchDocument | null> {
  try {
    const fullPath = path.join(researchDirectory, `${slug}.md`);
    const mdxPath = path.join(researchDirectory, `${slug}.mdx`);
    
    let filePath = fullPath;
    if (!fs.existsSync(fullPath) && fs.existsSync(mdxPath)) {
      filePath = mdxPath;
    }
    
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || 'Untitled',
      authors: data.authors || [],
      date: data.date || new Date().toISOString(),
      abstract: data.abstract || '',
      category: data.category || 'General',
      tags: data.tags || [],
      featured: data.featured || false,
      pdfUrl: data.pdfUrl,
      externalUrl: data.externalUrl,
      readTime: data.readTime || calculateReadTime(content),
      content,
      citations: data.citations,
      doi: data.doi,
      status: data.status || 'published',
    } as ResearchDocument;
  } catch (error) {
    console.error(`Error loading research document ${slug}:`, error);
    return null;
  }
}

/**
 * Fetch research documents from external API
 */
export async function getExternalResearchDocuments(): Promise<ResearchDocument[]> {
  try {
    // This is a placeholder for external API integration
    // You can integrate with services like:
    // - arXiv API
    // - bioRxiv API
    // - Your own CMS/API
    // - GitHub repository
    
    // Example implementation:
    // const response = await fetch('https://api.yourservice.com/research');
    // const data = await response.json();
    // return data.map(item => transformToResearchDocument(item));
    
    return [];
  } catch (error) {
    console.error('Error fetching external research documents:', error);
    return [];
  }
}

/**
 * Get all research documents (local + external)
 */
export async function getAllResearchDocuments(): Promise<ResearchDocument[]> {
  const [localDocs, externalDocs] = await Promise.all([
    getLocalResearchDocuments(),
    getExternalResearchDocuments(),
  ]);

  return [...localDocs, ...externalDocs].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Get unique categories from all documents
 */
export async function getResearchCategories(): Promise<string[]> {
  const documents = await getAllResearchDocuments();
  const categories = new Set(documents.map(doc => doc.category));
  return ['All', ...Array.from(categories).sort()];
}

/**
 * Calculate read time from markdown content
 */
function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

/**
 * Extract table of contents from markdown content
 */
export function extractTableOfContents(content: string): TOCItem[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const toc: TOCItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    toc.push({ level, text, id });
  }

  return toc;
}

export interface TOCItem {
  level: number;
  text: string;
  id: string;
}

/**
 * Search and filter research documents
 */
export function filterResearchDocuments(
  documents: ResearchDocument[],
  query: string,
  category: string,
  tags: string[]
): ResearchDocument[] {
  return documents.filter(doc => {
    const matchesQuery = !query || 
      doc.title.toLowerCase().includes(query.toLowerCase()) ||
      doc.abstract.toLowerCase().includes(query.toLowerCase()) ||
      doc.authors.some(author => author.toLowerCase().includes(query.toLowerCase()));
    
    const matchesCategory = category === 'All' || doc.category === category;
    
    const matchesTags = tags.length === 0 || 
      tags.some(tag => doc.tags.includes(tag));
    
    return matchesQuery && matchesCategory && matchesTags;
  });
}
