import { NextResponse } from 'next/server';

interface Contributor {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

interface Repository {
  name: string;
}

export async function GET() {
  try {
    // Get GitHub token from environment variables
    const githubToken = process.env.GITHUB_TOKEN || process.env.NEXT_PUBLIC_GITHUB_TOKEN;
    
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'TIVerse-Website',
    };

    // Add authorization header if token is available
    if (githubToken) {
      headers['Authorization'] = `Bearer ${githubToken}`;
    }

    // Fetch repositories from TIVerse organization
    const reposResponse = await fetch(
      'https://api.github.com/orgs/TIVerse/repos?per_page=100',
      {
        headers,
        cache: 'no-store', // Disable caching to always fetch fresh data
      }
    );

    if (!reposResponse.ok) {
      const errorText = await reposResponse.text();
      console.error('GitHub API Error:', reposResponse.status, errorText);
      throw new Error(`Failed to fetch repositories: ${reposResponse.status}`);
    }

    const repos: Repository[] = await reposResponse.json();
    console.log(`Found ${repos.length} repositories`);

    // Fetch contributors from each repository
    const contributorsMap = new Map<string, Contributor>();

    await Promise.all(
      repos.map(async (repo) => {
        try {
          const contributorsResponse = await fetch(
            `https://api.github.com/repos/TIVerse/${repo.name}/contributors?per_page=100`,
            {
              headers,
              cache: 'no-store', // Disable caching to always fetch fresh data
            }
          );

          if (contributorsResponse.ok) {
            const repoContributors: Contributor[] = await contributorsResponse.json();
            console.log(`Repo ${repo.name}: ${repoContributors.length} contributors`);
            
            repoContributors.forEach((contributor) => {
              const existing = contributorsMap.get(contributor.login);
              if (existing) {
                existing.contributions += contributor.contributions;
              } else {
                contributorsMap.set(contributor.login, { ...contributor });
              }
            });
          } else {
            console.error(`Failed to fetch contributors for ${repo.name}:`, contributorsResponse.status);
          }
        } catch (error) {
          console.error(`Error fetching contributors for ${repo.name}:`, error);
        }
      })
    );

    // Convert map to array and sort by contributions
    const contributors = Array.from(contributorsMap.values())
      .sort((a, b) => b.contributions - a.contributions);

    console.log(`Total unique contributors: ${contributors.length}`);

    return NextResponse.json({
      contributors,
      totalContributors: contributors.length,
      totalRepos: repos.length,
    });
  } catch (error) {
    console.error('Error fetching contributors:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contributors' },
      { status: 500 }
    );
  }
}
