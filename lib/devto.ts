export interface DevToArticle {
  id: number;
  title: string;
  description: string;
  url: string;
  published_at: string;
  reading_time_minutes: number;
  tag_list: string[];
  cover_image?: string;
  user: {
    name: string;
    username: string;
    profile_image: string;
  };
  positive_reactions_count: number;
  comments_count: number;
}

export interface ProcessedArticle {
  id: number;
  title: string;
  excerpt: string;
  content?: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  category?: string;
  featured: boolean;
  coverImage?: string;
  reactions?: number;
  comments?: number;
  codeSnippet?: string;
}

/**
 * Fetch articles from dev.to for a specific username
 */
export async function fetchDevToArticles(username: string): Promise<ProcessedArticle[]> {
  try {
    const response = await fetch(
      `https://dev.to/api/articles?username=${username}&per_page=50`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        next: {
          revalidate: 3600, // Revalidate every hour
        },
      }
    );

    if (!response.ok) {
      console.warn(`Failed to fetch articles for user ${username}: ${response.statusText}`);
      return [];
    }

    const articles: DevToArticle[] = await response.json();

    if (!articles || !Array.isArray(articles) || articles.length === 0) {
      console.warn(`No articles found for user: ${username}`);
      return [];
    }

    // Process and transform the articles
    return articles.map((article, index) => {
      // Determine category from tags
      const category = determineCategory(article.tag_list);
      
      // Mark top 3 articles with most reactions as featured
      const featured = index < 3;

      return {
        id: article.id,
        title: article.title,
        excerpt: article.description || `${article.title} - Read the full article on dev.to`,
        content: article.description, // Using description as content
        url: article.url,
        author: article.user.name,
        date: article.published_at,
        readTime: `${article.reading_time_minutes} min read`,
        tags: article.tag_list,
        category,
        featured,
        coverImage: article.cover_image,
        reactions: article.positive_reactions_count,
        comments: article.comments_count,
        codeSnippet: '', // Will be empty for dev.to articles
      };
    }).sort((a, b) => {
      // Sort by date (newest first)
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  } catch (error) {
    console.error('Error fetching dev.to articles:', error);
    return [];
  }
}

/**
 * Determine article category based on tags
 */
function determineCategory(tags: string[]): string {
  const categoryMap: Record<string, string[]> = {
    'Development': ['javascript', 'typescript', 'react', 'nextjs', 'programming', 'webdev', 'coding', 'tutorial'],
    'DevOps': ['devops', 'docker', 'kubernetes', 'ci/cd', 'deployment', 'aws', 'cloud'],
    'Security': ['security', 'authentication', 'authorization', 'cybersecurity'],
    'AI/ML': ['ai', 'ml', 'machinelearning', 'artificialintelligence', 'datascience'],
    'Design': ['design', 'ui', 'ux', 'css', 'frontend'],
    'Career': ['career', 'productivity', 'learning', 'beginners'],
    'Community': ['opensource', 'community', 'discuss'],
  };

  const lowercaseTags = tags.map(tag => tag.toLowerCase());

  for (const [category, keywords] of Object.entries(categoryMap)) {
    if (lowercaseTags.some(tag => keywords.includes(tag))) {
      return category;
    }
  }

  return 'Development'; // Default category
}
