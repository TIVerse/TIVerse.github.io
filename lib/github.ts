import { useState, useEffect } from 'react';

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string | null;
  topics: string[];
  license: {
    key: string;
    name: string;
  } | null;
  updated_at: string;
  created_at: string;
  pushed_at: string;
  archived: boolean;
  disabled: boolean;
  fork: boolean;
  private: boolean;
  default_branch: string;
  open_issues_count: number;
  size: number;
}

export interface ProcessedProject {
  id: number;
  name: string;
  description: string;
  stars: number;
  forks: number;
  watchers: number;
  language: string;
  languageColor: string;
  category: string;
  status: 'stable' | 'beta' | 'alpha' | 'archived';
  lastUpdate: string;
  topics: string[];
  license: string;
  url: string;
  createdAt: string;
  openIssues: number;
  size: number;
  isPrivate: boolean;
  isFork: boolean;
}

const LANGUAGE_COLORS: Record<string, string> = {
  'TypeScript': 'bg-blue-500',
  'JavaScript': 'bg-yellow-500',
  'Python': 'bg-green-500',
  'Go': 'bg-cyan-500',
  'Rust': 'bg-orange-500',
  'Java': 'bg-red-500',
  'C++': 'bg-purple-500',
  'C': 'bg-gray-500',
  'PHP': 'bg-indigo-500',
  'Ruby': 'bg-red-400',
  'Swift': 'bg-orange-400',
  'Kotlin': 'bg-purple-400',
  'Dart': 'bg-blue-400',
  'Shell': 'bg-gray-400',
  'HTML': 'bg-orange-300',
  'CSS': 'bg-blue-300',
  'Vue': 'bg-green-400',
  'React': 'bg-blue-400',
  'Svelte': 'bg-orange-500',
  'Dockerfile': 'bg-blue-600',
  'YAML': 'bg-red-300',
  'JSON': 'bg-yellow-300',
  'Markdown': 'bg-gray-600',
};

const PROJECT_CATEGORIES: Record<string, string> = {
  'cli': 'CLI Tools',
  'config': 'Configuration',
  'deploy': 'DevOps',
  'monitor': 'Monitoring',
  'sdk': 'SDK',
  'security': 'Security',
  'api': 'API',
  'web': 'Web',
  'mobile': 'Mobile',
  'desktop': 'Desktop',
  'library': 'Library',
  'framework': 'Framework',
  'tool': 'Tools',
  'utility': 'Utilities',
  'template': 'Templates',
  'example': 'Examples',
  'documentation': 'Documentation',
  'infrastructure': 'Infrastructure',
  'database': 'Database',
  'frontend': 'Frontend',
  'backend': 'Backend',
  'fullstack': 'Full Stack',
};

function getLanguageColor(language: string | null): string {
  if (!language) return 'bg-gray-400';
  return LANGUAGE_COLORS[language] || 'bg-gray-400';
}

function categorizeProject(repo: GitHubRepo): string {
  const name = repo.name.toLowerCase();
  const description = (repo.description || '').toLowerCase();
  const topics = repo.topics.map(t => t.toLowerCase());
  
  // Check topics first
  for (const topic of topics) {
    if (PROJECT_CATEGORIES[topic]) {
      return PROJECT_CATEGORIES[topic];
    }
  }
  
  // Check name patterns
  if (name.includes('cli')) return 'CLI Tools';
  if (name.includes('config')) return 'Configuration';
  if (name.includes('deploy')) return 'DevOps';
  if (name.includes('monitor')) return 'Monitoring';
  if (name.includes('sdk')) return 'SDK';
  if (name.includes('security')) return 'Security';
  if (name.includes('api')) return 'API';
  if (name.includes('web')) return 'Web';
  if (name.includes('mobile')) return 'Mobile';
  if (name.includes('desktop')) return 'Desktop';
  if (name.includes('template')) return 'Templates';
  if (name.includes('example')) return 'Examples';
  if (name.includes('doc')) return 'Documentation';
  
  // Check description patterns
  if (description.includes('command line') || description.includes('cli')) return 'CLI Tools';
  if (description.includes('configuration') || description.includes('config')) return 'Configuration';
  if (description.includes('deployment') || description.includes('deploy')) return 'DevOps';
  if (description.includes('monitoring') || description.includes('monitor')) return 'Monitoring';
  if (description.includes('security')) return 'Security';
  if (description.includes('api')) return 'API';
  if (description.includes('web')) return 'Web';
  if (description.includes('library')) return 'Library';
  if (description.includes('framework')) return 'Framework';
  if (description.includes('tool')) return 'Tools';
  if (description.includes('utility')) return 'Utilities';
  if (description.includes('template')) return 'Templates';
  if (description.includes('example')) return 'Examples';
  if (description.includes('documentation')) return 'Documentation';
  if (description.includes('infrastructure')) return 'Infrastructure';
  if (description.includes('database')) return 'Database';
  if (description.includes('frontend')) return 'Frontend';
  if (description.includes('backend')) return 'Backend';
  
  // Default category based on language
  if (repo.language === 'TypeScript' || repo.language === 'JavaScript') return 'Web';
  if (repo.language === 'Python') return 'Tools';
  if (repo.language === 'Go') return 'Infrastructure';
  if (repo.language === 'Rust') return 'Systems';
  if (repo.language === 'Shell') return 'Scripts';
  
  return 'Miscellaneous';
}

function determineStatus(repo: GitHubRepo): 'stable' | 'beta' | 'alpha' | 'archived' {
  if (repo.archived) return 'archived';
  
  const topics = repo.topics.map(t => t.toLowerCase());
  if (topics.includes('stable') || topics.includes('production')) return 'stable';
  if (topics.includes('beta')) return 'beta';
  if (topics.includes('alpha') || topics.includes('experimental')) return 'alpha';
  
  // Determine based on activity and stars
  const daysSinceUpdate = Math.floor((Date.now() - new Date(repo.pushed_at).getTime()) / (1000 * 60 * 60 * 24));
  
  if (repo.stargazers_count >= 100 && daysSinceUpdate <= 30) return 'stable';
  if (repo.stargazers_count >= 10 && daysSinceUpdate <= 90) return 'beta';
  if (daysSinceUpdate > 365) return 'archived';
  
  return 'alpha';
}

export async function fetchTIVerseRepos(): Promise<ProcessedProject[]> {
  try {
    const response = await fetch('https://api.github.com/orgs/TIVerse/repos?per_page=100&sort=updated', {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'TIVerse-Website',
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos: GitHubRepo[] = await response.json();
    
    // Filter out forks and private repos, sort by stars
    const publicRepos = repos
      .filter(repo => !repo.fork && !repo.private && !repo.disabled)
      .sort((a, b) => b.stargazers_count - a.stargazers_count);

    return publicRepos.map(repo => ({
      id: repo.id,
      name: repo.name,
      description: repo.description || 'No description available',
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      watchers: repo.watchers_count,
      language: repo.language || 'Unknown',
      languageColor: getLanguageColor(repo.language),
      category: categorizeProject(repo),
      status: determineStatus(repo),
      lastUpdate: repo.pushed_at,
      topics: repo.topics,
      license: repo.license?.name || 'No License',
      url: repo.html_url,
      createdAt: repo.created_at,
      openIssues: repo.open_issues_count,
      size: repo.size,
      isPrivate: repo.private,
      isFork: repo.fork,
    }));
  } catch (error) {
    console.error('Error fetching TIVerse repositories:', error);
    // Return fallback data in case of API failure
    return getFallbackProjects();
  }
}

function getFallbackProjects(): ProcessedProject[] {
  return [
    {
      id: 1,
      name: 'TI-CLI',
      description: 'A powerful command-line interface for modern development workflows with built-in project scaffolding, testing utilities, and deployment automation.',
      stars: 2847,
      forks: 234,
      watchers: 156,
      language: 'TypeScript',
      languageColor: 'bg-blue-500',
      category: 'CLI Tools',
      status: 'stable',
      lastUpdate: '2024-01-15T10:30:00Z',
      topics: ['cli', 'development', 'automation', 'typescript'],
      license: 'MIT',
      url: 'https://github.com/TIVerse/TI-CLI',
      createdAt: '2023-06-01T10:00:00Z',
      openIssues: 12,
      size: 1024,
      isPrivate: false,
      isFork: false,
    },
    {
      id: 2,
      name: 'TI-Config',
      description: 'Unified configuration management system that supports multiple formats, environment-specific overrides, and schema validation.',
      stars: 1923,
      forks: 187,
      watchers: 98,
      language: 'JavaScript',
      languageColor: 'bg-yellow-500',
      category: 'Configuration',
      status: 'stable',
      lastUpdate: '2024-01-12T14:20:00Z',
      topics: ['config', 'json', 'yaml', 'validation'],
      license: 'MIT',
      url: 'https://github.com/TIVerse/TI-Config',
      createdAt: '2023-05-15T09:00:00Z',
      openIssues: 8,
      size: 512,
      isPrivate: false,
      isFork: false,
    },
    {
      id: 3,
      name: 'TI-Deploy',
      description: 'Simplified deployment orchestration for cloud-native applications with support for Kubernetes, Docker, and serverless platforms.',
      stars: 3456,
      forks: 421,
      watchers: 289,
      language: 'Go',
      languageColor: 'bg-cyan-500',
      category: 'DevOps',
      status: 'stable',
      lastUpdate: '2024-01-18T16:45:00Z',
      topics: ['deployment', 'kubernetes', 'docker', 'cloud'],
      license: 'Apache-2.0',
      url: 'https://github.com/TIVerse/TI-Deploy',
      createdAt: '2023-04-20T11:30:00Z',
      openIssues: 23,
      size: 2048,
      isPrivate: false,
      isFork: false,
    },
  ];
}

// Client-side hook for fetching projects
export function useGitHubProjects() {
  const [projects, setProjects] = useState<ProcessedProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);
        const data = await fetchTIVerseRepos();
        setProjects(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch projects');
        setProjects(getFallbackProjects());
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  return { projects, loading, error };
}