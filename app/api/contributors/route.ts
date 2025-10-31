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
    // Fetch repositories from TIVerse organization
    const reposResponse = await fetch(
      'https://api.github.com/orgs/TIVerse/repos?per_page=100',
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'TIVerse-Website',
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!reposResponse.ok) {
      throw new Error('Failed to fetch repositories');
    }

    const repos: Repository[] = await reposResponse.json();

    // Fetch contributors from each repository
    const contributorsMap = new Map<string, Contributor>();

    await Promise.all(
      repos.map(async (repo) => {
        try {
          const contributorsResponse = await fetch(
            `https://api.github.com/repos/TIVerse/${repo.name}/contributors?per_page=100`,
            {
              headers: {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'TIVerse-Website',
              },
              next: { revalidate: 3600 },
            }
          );

          if (contributorsResponse.ok) {
            const repoContributors: Contributor[] = await contributorsResponse.json();
            
            repoContributors.forEach((contributor) => {
              const existing = contributorsMap.get(contributor.login);
              if (existing) {
                existing.contributions += contributor.contributions;
              } else {
                contributorsMap.set(contributor.login, { ...contributor });
              }
            });
          }
        } catch (error) {
          console.error(`Error fetching contributors for ${repo.name}:`, error);
        }
      })
    );

    // Convert map to array and sort by contributions
    const contributors = Array.from(contributorsMap.values())
      .sort((a, b) => b.contributions - a.contributions);

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
