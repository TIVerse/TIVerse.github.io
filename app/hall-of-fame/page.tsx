"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Award, Star, GitCommit, Trophy, Medal, Users, Code2, Loader2, ExternalLink, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Contributor {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
  type?: string;
  site_admin?: boolean;
}

interface ContributorsData {
  contributors: Contributor[];
  totalContributors: number;
  totalRepos: number;
}

export default function HallOfFame() {
  const [contributorsData, setContributorsData] = useState<ContributorsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchContributors();
  }, []);

  const fetchContributors = async () => {
    try {
      // Get GitHub token from environment if available
      const githubToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
      
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
        { headers }
      );

      if (!reposResponse.ok) {
        throw new Error(`Failed to fetch repositories: ${reposResponse.status}`);
      }

      const repos = await reposResponse.json();

      // Fetch contributors from each repository
      const contributorsMap = new Map<string, Contributor>();

      await Promise.all(
        repos.map(async (repo: { name: string }) => {
          try {
            const contributorsResponse = await fetch(
              `https://api.github.com/repos/TIVerse/${repo.name}/contributors?per_page=100`,
              { headers }
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

      setContributorsData({
        contributors,
        totalContributors: contributors.length,
        totalRepos: repos.length,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch contributors');
    } finally {
      setLoading(false);
    }
  };

  const getContributorTier = (contributions: number) => {
    if (contributions >= 100) return { tier: 'Legend', color: 'text-yellow-500', icon: Trophy };
    if (contributions >= 50) return { tier: 'Champion', color: 'text-purple-500', icon: Medal };
    if (contributions >= 20) return { tier: 'Hero', color: 'text-blue-500', icon: Award };
    return { tier: 'Contributor', color: 'text-green-500', icon: Star };
  };

  const topContributors = contributorsData?.contributors.slice(0, 3) || [];
  const otherContributors = contributorsData?.contributors.slice(3) || [];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-background to-purple-50/30 dark:from-slate-950 dark:via-background dark:to-purple-900/20"></div>
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="relative">
                <Trophy className="h-16 w-16 text-amber-500" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-4 border-dashed border-amber-500/20 rounded-full"
                />
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-purple-600 to-blue-600">
              Hall of Fame
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-mono">
              Celebrating the brilliant minds building TIVerse
            </p>

            {!loading && contributorsData && (
              <div className="flex flex-wrap justify-center gap-6 mt-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold text-amber-500">
                    {contributorsData.totalContributors}
                  </div>
                  <div className="text-sm text-muted-foreground font-mono">Total Contributors</div>
                </motion.div>
                
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold text-purple-500">
                    {contributorsData.contributors.reduce((sum, c) => sum + c.contributions, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground font-mono">Total Contributions</div>
                </motion.div>
                
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold text-blue-500">
                    {contributorsData.totalRepos}
                  </div>
                  <div className="text-sm text-muted-foreground font-mono">Active Repositories</div>
                </motion.div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <CardHeader>
                      <Skeleton className="h-24 w-24 rounded-full mx-auto" />
                      <Skeleton className="h-6 w-32 mx-auto mt-4" />
                      <Skeleton className="h-4 w-24 mx-auto mt-2" />
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          ) : error ? (
            <Card className="border-destructive">
              <CardContent className="pt-6">
                <p className="text-center text-destructive">{error}</p>
              </CardContent>
            </Card>
          ) : contributorsData ? (
            <>
              {/* Top 3 Contributors */}
              {topContributors.length > 0 && (
                <ContributorsPodium contributors={topContributors} getContributorTier={getContributorTier} />
              )}

              {/* All Contributors Grid */}
              {otherContributors.length > 0 && (
                <ContributorsGrid contributors={otherContributors} getContributorTier={getContributorTier} />
              )}

              {/* Tiers Legend */}
              <TiersLegend />

              {/* CTA */}
              <CallToAction />
            </>
          ) : null}
        </div>
      </section>
    </div>
  );
}

function ContributorsPodium({ contributors, getContributorTier }: any) {
  return (
    <div className="mb-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-3"
      >
        <Medal className="h-8 w-8 text-amber-500" />
        Top Contributors
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {contributors.map((contributor: any, index: number) => {
          const tierInfo = getContributorTier(contributor.contributions);
          const TierIcon = tierInfo.icon;
          const scales = ['scale-95', 'scale-105', 'scale-95'];
          const orders = ['md:order-1', 'md:order-2', 'md:order-3'];
          
          return (
            <motion.div
              key={contributor.login}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={orders[index]}
            >
              <Card className={`relative overflow-hidden ${scales[index]} transition-transform hover:scale-110 cursor-pointer group`}
                onClick={() => window.open(contributor.html_url, '_blank')}
              >
                <div className={`absolute top-4 right-4 ${
                  index === 1 ? 'bg-amber-500' : index === 0 ? 'bg-gray-400' : 'bg-orange-600'
                } text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg shadow-lg z-10`}>
                  {index + 1}
                </div>

                <div className={`absolute inset-0 bg-gradient-to-br ${
                  index === 1 ? 'from-amber-500/10 to-yellow-500/10' : 
                  index === 0 ? 'from-gray-400/10 to-gray-500/10' : 
                  'from-orange-600/10 to-red-500/10'
                } opacity-0 group-hover:opacity-100 transition-opacity`} />

                <CardContent className="pt-12 pb-8 text-center relative">
                  <Avatar className={`h-32 w-32 mx-auto mb-6 border-4 ${
                    index === 1 ? 'border-amber-500' : index === 0 ? 'border-gray-400' : 'border-orange-600'
                  } shadow-xl`}>
                    <AvatarImage src={contributor.avatar_url} alt={contributor.login} />
                    <AvatarFallback className="text-3xl">{contributor.login[0].toUpperCase()}</AvatarFallback>
                  </Avatar>

                  <h3 className="text-2xl font-bold mb-2">{contributor.login}</h3>
                  
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <TierIcon className={`h-5 w-5 ${tierInfo.color}`} />
                    <Badge variant="secondary" className="font-mono">
                      {tierInfo.tier}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <GitCommit className="h-4 w-4 text-muted-foreground" />
                      <span className="text-2xl font-bold text-primary">{contributor.contributions}</span>
                      <span className="text-sm text-muted-foreground">contributions</span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-6 gap-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(contributor.html_url, '_blank');
                    }}
                  >
                    <Github className="h-4 w-4" />
                    View Profile
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function ContributorsGrid({ contributors, getContributorTier }: any) {
  return (
    <div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-3"
      >
        <Users className="h-8 w-8 text-blue-500" />
        All Contributors
      </motion.h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {contributors.map((contributor: any, index: number) => {
          const tierInfo = getContributorTier(contributor.contributions);
          const TierIcon = tierInfo.icon;
          
          return (
            <motion.div
              key={contributor.login}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card 
                className="hover:shadow-lg transition-all cursor-pointer group h-full"
                onClick={() => window.open(contributor.html_url, '_blank')}
              >
                <CardContent className="pt-6 text-center">
                  <Avatar className="h-20 w-20 mx-auto mb-3 border-2 border-primary/20 group-hover:border-primary/50 transition-colors">
                    <AvatarImage src={contributor.avatar_url} alt={contributor.login} />
                    <AvatarFallback>{contributor.login[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                  
                  <h3 className="font-semibold text-sm truncate mb-2" title={contributor.login}>
                    {contributor.login}
                  </h3>
                  
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <TierIcon className={`h-3 w-3 ${tierInfo.color}`} />
                    <span className="text-xs text-muted-foreground">{tierInfo.tier}</span>
                  </div>

                  <Badge variant="secondary" className="text-xs">
                    <GitCommit className="h-3 w-3 mr-1" />
                    {contributor.contributions}
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function TiersLegend() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mt-16"
    >
      <Card className="max-w-4xl mx-auto bg-gradient-to-br from-primary/5 to-purple-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Contribution Tiers
          </CardTitle>
          <CardDescription>Recognizing excellence at every level</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
              <Trophy className="h-8 w-8 text-yellow-500" />
              <div>
                <div className="font-semibold">Legend</div>
                <div className="text-xs text-muted-foreground">100+ contributions</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
              <Medal className="h-8 w-8 text-purple-500" />
              <div>
                <div className="font-semibold">Champion</div>
                <div className="text-xs text-muted-foreground">50+ contributions</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
              <Award className="h-8 w-8 text-blue-500" />
              <div>
                <div className="font-semibold">Hero</div>
                <div className="text-xs text-muted-foreground">20+ contributions</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
              <Star className="h-8 w-8 text-green-500" />
              <div>
                <div className="font-semibold">Contributor</div>
                <div className="text-xs text-muted-foreground">1+ contributions</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function CallToAction() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="mt-16 text-center"
    >
      <Card className="max-w-2xl mx-auto bg-gradient-to-br from-blue-500/10 to-purple-500/10">
        <CardContent className="pt-8 pb-8">
          <Code2 className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h3 className="text-2xl font-bold mb-3">Join Our Community!</h3>
          <p className="text-muted-foreground mb-6">
            Start contributing to TIVerse projects and see your name in the Hall of Fame
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              onClick={() => window.open('https://github.com/TIVerse', '_blank')}
            >
              <Github className="h-5 w-5 mr-2" />
              View Repositories
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.open('https://github.com/TIVerse', '_blank')}
            >
              <Star className="h-5 w-5 mr-2" />
              Contributing Guide
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
