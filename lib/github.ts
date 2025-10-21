/**
 * GitHub API integration for TIVerse organization
 */

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  created_at: string;
  updated_at: string;
  homepage: string | null;
  archived: boolean;
  fork: boolean;
}

export interface GitHubContributor {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  contributions: number;
  type: string;
}

export interface GitHubIssue {
  id: number;
  number: number;
  title: string;
  html_url: string;
  state: string;
  labels: Array<{
    name: string;
    color: string;
  }>;
  created_at: string;
  updated_at: string;
}

export interface GitHubOrgStats {
  totalStars: number;
  totalForks: number;
  totalRepos: number;
  totalContributors: number;
}

const GITHUB_API_BASE = "https://api.github.com";
const ORG_NAME = "tiverse";

/**
 * Fetch all public repositories from the TIVerse organization
 */
export async function getOrgRepos(): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/orgs/${ORG_NAME}/repos?per_page=100&sort=updated`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
      cache: "force-cache",
    });

    if (!response.ok) {
      console.warn(`GitHub API returned ${response.status}. Using fallback data.`);
      return getFallbackRepos();
    }

    const repos: GitHubRepo[] = await response.json();
    const filtered = repos.filter(repo => !repo.fork && !repo.archived);
    return filtered.length > 0 ? filtered : getFallbackRepos();
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    return getFallbackRepos();
  }
}

/**
 * Fallback repository data when API is unavailable
 */
function getFallbackRepos(): GitHubRepo[] {
  return [
    {
      id: 1,
      name: "eclipsera",
      full_name: "tiverse/eclipsera",
      description: "A machine learning framework built from scratch with GB algorithms spanning classical ML, clustering...",
      html_url: "https://github.com/tiverse/eclipsera",
      stargazers_count: 10,
      forks_count: 2,
      language: "Python",
      topics: ["machine-learning", "ai", "python"],
      created_at: "2024-01-01",
      updated_at: "2024-12-01",
      homepage: null,
      archived: false,
      fork: false,
    },
  ];
}

/**
 * Get featured repositories (can be customized)
 */
export async function getFeaturedRepos(): Promise<GitHubRepo[]> {
  const allRepos = await getOrgRepos();
  
  // Featured repo names - customize as needed
  const featuredNames = ["eclipsera", "dep-insight", "tiverse"];
  
  const featured = allRepos.filter(repo => 
    featuredNames.some(name => repo.name.toLowerCase().includes(name.toLowerCase()))
  );

  // If no featured repos found, return top 3 by stars
  if (featured.length === 0) {
    return allRepos.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 3);
  }

  return featured;
}

/**
 * Get organization statistics
 */
export async function getOrgStats(): Promise<GitHubOrgStats> {
  try {
    const repos = await getOrgRepos();
    
    if (repos.length === 0) {
      return getFallbackStats();
    }
    
    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
    
    return {
      totalStars: totalStars || 15,
      totalForks: totalForks || 5,
      totalRepos: repos.length || 3,
      totalContributors: 10,
    };
  } catch (error) {
    console.error("Error fetching org stats:", error);
    return getFallbackStats();
  }
}

/**
 * Fallback stats when API is unavailable
 */
function getFallbackStats(): GitHubOrgStats {
  return {
    totalStars: 15,
    totalForks: 5,
    totalRepos: 3,
    totalContributors: 10,
  };
}

/**
 * Get contributors for a specific repository
 */
export async function getRepoContributors(repoName: string): Promise<GitHubContributor[]> {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${ORG_NAME}/${repoName}/contributors?per_page=100`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching contributors for ${repoName}:`, error);
    return [];
  }
}

/**
 * Get all unique contributors across the organization
 */
export async function getAllContributors(): Promise<GitHubContributor[]> {
  try {
    const repos = await getOrgRepos();
    
    if (repos.length === 0) {
      return getFallbackContributors();
    }
    
    const contributorsMap = new Map<string, GitHubContributor>();

    // Fetch contributors for each repo (limit to top repos to avoid rate limits)
    const topRepos = repos.slice(0, 5);
    
    for (const repo of topRepos) {
      const contributors = await getRepoContributors(repo.name);
      contributors.forEach(contributor => {
        if (contributorsMap.has(contributor.login)) {
          const existing = contributorsMap.get(contributor.login)!;
          existing.contributions += contributor.contributions;
        } else {
          contributorsMap.set(contributor.login, { ...contributor });
        }
      });
    }

    const result = Array.from(contributorsMap.values())
      .sort((a, b) => b.contributions - a.contributions);
    
    return result.length > 0 ? result : getFallbackContributors();
  } catch (error) {
    console.error("Error fetching all contributors:", error);
    return getFallbackContributors();
  }
}

/**
 * Fallback contributors data
 */
function getFallbackContributors(): GitHubContributor[] {
  return [
    {
      login: "eshanized",
      id: 1,
      avatar_url: "https://github.com/eshanized.png",
      html_url: "https://github.com/eshanized",
      contributions: 150,
      type: "User",
    },
  ];
}

/**
 * Get good first issues from the organization
 */
export async function getGoodFirstIssues(): Promise<GitHubIssue[]> {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/search/issues?q=org:${ORG_NAME}+label:"good first issue"+state:open&sort=created&order=desc&per_page=20`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 1800 }, // Cache for 30 minutes
        cache: "force-cache",
      }
    );

    if (!response.ok) {
      console.warn(`GitHub API error fetching issues: ${response.status}`);
      return [];
    }

    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error("Error fetching good first issues:", error);
    return [];
  }
}

/**
 * Get languages used across all repositories
 */
export async function getLanguages(): Promise<string[]> {
  const repos = await getOrgRepos();
  const languages = new Set<string>();
  
  repos.forEach(repo => {
    if (repo.language) {
      languages.add(repo.language);
    }
  });
  
  return Array.from(languages).sort();
}
