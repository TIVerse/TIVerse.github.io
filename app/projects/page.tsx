"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Star, GitFork, Eye, Github, ExternalLink, ListFilter as Filter, Loader as Loader2, CircleAlert as AlertCircle, Calendar, Code, Package, Terminal, Brackets, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchTIVerseRepos, type ProcessedProject } from '@/lib/github';
import Link from 'next/link';

export default function Projects() {
  const [projects, setProjects] = useState<ProcessedProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');

  // Load projects from GitHub
  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);
        const data = await fetchTIVerseRepos();
        setProjects(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  // Generate filter options from actual data
  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category))).sort()];
  const statuses = ['All', ...Array.from(new Set(projects.map(p => p.status))).sort()];
  const languages = ['All', ...Array.from(new Set(projects.map(p => p.language).filter(Boolean))).sort()];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || project.status === selectedStatus;
    const matchesLanguage = selectedLanguage === 'All' || project.language === selectedLanguage;

    return matchesSearch && matchesCategory && matchesStatus && matchesLanguage;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'stable': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'beta': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'alpha': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTimeSince = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  };

  return (
    <div className="pt-16">
      {/* Hero Section with Terminal Aesthetic */}
      <section className="relative overflow-hidden">
        {/* Grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        {/* Gradient overlays - Vibrant */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-background via-purple-50/30 to-teal-50/30 dark:from-blue-950 dark:via-background dark:via-purple-950/30 dark:to-teal-950/30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(96,165,250,0.15),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(96,165,250,0.2),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(167,139,250,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_80%,rgba(167,139,250,0.15),transparent_50%)]"></div>

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Terminal-style status badge */}
            <div className="inline-flex items-center space-x-3 mb-6 px-4 py-2 bg-background/80 backdrop-blur-sm border border-border/50 rounded-lg shadow-lg glow-blue">
              <div className="flex space-x-1.5">
                <div className="w-2.5 h-2.5 bg-gradient-to-r from-red-400 to-red-500 rounded-full shadow-lg shadow-red-400/50"></div>
                <div className="w-2.5 h-2.5 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full shadow-lg shadow-yellow-400/50"></div>
                <div className="w-2.5 h-2.5 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
              </div>
              <span className="text-xs font-mono text-muted-foreground">projects.repository.tsx</span>
            </div>

            {/* Code-style title */}
            <div className="mb-6 space-y-2">
              <div className="text-left max-w-fit mx-auto">
                <span className="text-sm font-mono text-muted-foreground/70">1 </span>
                <span className="text-sm font-mono text-blue-500">const</span>
                <span className="text-sm font-mono text-foreground"> projects = await </span>
                <span className="text-sm font-mono text-purple-500">fetchRepos</span>
                <span className="text-sm font-mono text-foreground">();</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground tracking-tight leading-[1.1]">
                Open Source{" "}
                <span className="relative inline-block">
                  <span className="font-mono bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 bg-clip-text text-transparent">
                    Projects
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 rounded-full"></span>
                </span>
              </h1>

              <div className="text-left max-w-fit mx-auto">
                <span className="text-sm font-mono text-muted-foreground/70">2 </span>
                <span className="text-sm font-mono text-blue-500">return</span>
                <span className="text-sm font-mono text-foreground"> projects.</span>
                <span className="text-sm font-mono text-purple-500">filter</span>
                <span className="text-sm font-mono text-foreground">(</span>
                <span className="text-sm font-mono text-blue-500">production_ready</span>
                <span className="text-sm font-mono text-foreground">);</span>
              </div>
            </div>

            {/* Code comment style description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed"
            >
              <div className="flex items-start space-x-2">
                <span className="text-emerald-500 font-mono">{"/*"}</span>
                <p className="flex-1">
                  Discover our collection of tools and libraries that power modern development workflows.
                  All open source, all production-ready. Live data from GitHub API.
                </p>
                <span className="text-emerald-500 font-mono">{"*/"}</span>
              </div>
            </motion.div>

            {/* Terminal-style command buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <Button size="lg" className="font-mono bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 hover:from-blue-700 hover:via-purple-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all group glow-blue">
                <span className="mr-2">$</span>
                git clone --recursive
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="font-mono border-2 hover:bg-accent" asChild>
                <Link href="https://github.com/tiverse" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  browse --remote-origin
                </Link>
              </Button>
            </motion.div>

            {/* Terminal-style Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 max-w-4xl mx-auto"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="relative bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-sm border border-blue-500/30 rounded-lg p-6 hover:border-blue-500/60 transition-all glow-blue">
                  <div className="text-xs font-mono text-blue-400 mb-2">{">"} repos.length</div>
                  <div className="text-3xl lg:text-4xl font-bold font-mono text-purple-400 mb-1">
                    {projects.length}+
                  </div>
                  <div className="text-xs font-mono text-muted-foreground/70">// repositories</div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-teal-500/10 rounded-lg blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="relative bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6 hover:border-purple-500/60 transition-all glow-purple">
                  <div className="text-xs font-mono text-purple-400 mb-2">{">"} stars.total()</div>
                  <div className="text-3xl lg:text-4xl font-bold font-mono text-teal-400 mb-1">
                    {projects.reduce((acc, p) => acc + p.stars, 0).toLocaleString()}+
                  </div>
                  <div className="text-xs font-mono text-muted-foreground/70">// github stars</div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-emerald-500/10 rounded-lg blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="relative bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-sm border border-teal-500/30 rounded-lg p-6 hover:border-teal-500/60 transition-all glow-teal">
                  <div className="text-xs font-mono text-teal-400 mb-2">{">"} languages.count</div>
                  <div className="text-3xl lg:text-4xl font-bold font-mono text-emerald-400 mb-1">
                    {languages.length - 1}+
                  </div>
                  <div className="text-xs font-mono text-muted-foreground/70">// languages</div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-emerald-500/10 rounded-lg blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="relative bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-sm border border-blue-500/30 rounded-lg p-6 hover:border-blue-500/60 transition-all glow-blue">
                  <div className="text-xs font-mono text-blue-400 mb-2">{">"} forks.sum()</div>
                  <div className="text-3xl lg:text-4xl font-bold font-mono text-purple-400 mb-1">
                    {projects.reduce((acc, p) => acc + p.forks, 0)}+
                  </div>
                  <div className="text-xs font-mono text-muted-foreground/70">// contributions</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Filters with Terminal Interface */}
      <section className="py-8 bg-slate-950 border-b border-slate-800 relative overflow-hidden">
        {/* Code grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          {/* Terminal header */}
          <div className="flex items-center space-x-3 mb-6 px-4 py-2 bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-lg w-fit">
            <div className="flex space-x-1.5">
              <div className="w-2.5 h-2.5 bg-red-400 rounded-full"></div>
              <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full"></div>
              <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse"></div>
            </div>
            <span className="text-xs font-mono text-slate-400">filter.interface.ts</span>
          </div>

          <div className="flex flex-col space-y-4">
            {/* Search with terminal styling */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                <span className="text-xs font-mono text-emerald-400">$</span>
                <Search className="h-4 w-4 text-cyan-400" />
              </div>
              <Input
                placeholder="grep -i 'search_term' projects/*"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-400 font-mono"
              />
            </div>

            {/* Filter Controls with code syntax */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono text-cyan-400">filter</span>
                <span className="text-xs font-mono text-slate-400">(</span>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full sm:w-48 bg-slate-900/50 border-slate-700 text-white font-mono">
                    <SelectValue placeholder="category" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-700">
                    {categories.map(category => (
                      <SelectItem key={category} value={category} className="text-white font-mono">{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className="text-xs font-mono text-slate-400">,</span>
              </div>

              <div className="flex items-center space-x-2">
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-full sm:w-48 bg-slate-900/50 border-slate-700 text-white font-mono">
                    <SelectValue placeholder="status" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-700">
                    {statuses.map(status => (
                      <SelectItem key={status} value={status} className="text-white font-mono">{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className="text-xs font-mono text-slate-400">,</span>
              </div>

              <div className="flex items-center space-x-2">
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="w-full sm:w-48 bg-slate-900/50 border-slate-700 text-white font-mono">
                    <SelectValue placeholder="language" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-700">
                    {languages.map(language => (
                      <SelectItem key={language} value={language} className="text-white font-mono">{language}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className="text-xs font-mono text-slate-400">)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid with Terminal Theme */}
      <section className="py-16 relative overflow-hidden">
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          {/* Loading State with Terminal Aesthetic */}
          {loading && (
            <div className="space-y-6">
              <div className="flex items-center justify-center py-8">
                <div className="flex items-center space-x-3 px-4 py-2 bg-background/80 backdrop-blur-sm border border-border/50 rounded-lg">
                  <Loader2 className="h-6 w-6 animate-spin text-cyan-400" />
                  <span className="font-mono text-muted-foreground">
                    <span className="text-cyan-400">await</span> fetchRepos<span className="text-yellow-400">()</span>...
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="h-full bg-background/50 backdrop-blur-sm border-border/50">
                    <CardHeader>
                      {/* Terminal window header */}
                      <div className="flex items-center justify-between mb-3 pb-3 border-b border-border/30">
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-muted rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-muted rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-muted rounded-full animate-pulse"></div>
                          </div>
                          <Skeleton className="h-3 w-20" />
                        </div>
                        <Github className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <Skeleton className="h-5 w-32 mb-2" />
                      <Skeleton className="h-4 w-full" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                          <Skeleton className="h-4 w-16" />
                          <Skeleton className="h-4 w-12" />
                          <Skeleton className="h-4 w-12" />
                        </div>
                        <div className="flex space-x-1">
                          <Skeleton className="h-5 w-12" />
                          <Skeleton className="h-5 w-16" />
                          <Skeleton className="h-5 w-14" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Error State with Terminal Style */}
          {error && !loading && (
            <Alert className="mb-8 bg-red-950/50 border-red-800 text-red-200">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono text-red-400">ERROR:</span>
                <AlertCircle className="h-4 w-4" />
              </div>
              <AlertDescription className="font-mono">
                <span className="text-red-400">throw new Error(</span>"{error}"<span className="text-red-400">);</span>
                <br />
                <span className="text-yellow-400">// Fallback:</span> Showing cached data instead.
              </AlertDescription>
            </Alert>
          )}

          {/* Projects Content */}
          {!loading && (
            <>
              <div className="mb-8 flex items-center justify-between">
                <div className="text-sm font-mono text-muted-foreground">
                  <span className="text-cyan-400">console.log(</span>
                  `Showing ${filteredProjects.length} of ${projects.length} projects`
                  <span className="text-cyan-400">);</span>
                  {!error && (
                    <div className="mt-1">
                      <span className="text-emerald-400">// </span>
                      <span className="text-green-600">✓ Live from GitHub API</span>
                    </div>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.location.reload()}
                  className="font-mono border-border/50 hover:bg-muted/50"
                >
                  <span className="mr-2 text-cyan-400">$</span>
                  <Github className="mr-2 h-4 w-4" />
                  git fetch --all
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link href={project.url} target="_blank" rel="noopener noreferrer">
                      <Card className="h-full hover:shadow-xl transition-all duration-300 group border-border/50 bg-background/50 backdrop-blur-sm cursor-pointer">
                        <CardHeader>
                          {/* Terminal window header */}
                          <div className="flex items-center justify-between mb-3 pb-3 border-b border-border/30">
                            <div className="flex items-center space-x-2">
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                              </div>
                              <span className="text-xs font-mono text-muted-foreground/70">{project.name}.repo</span>
                            </div>
                            <div className="flex space-x-1">
                              <Github className="h-4 w-4 text-muted-foreground group-hover:text-cyan-600 transition-colors" />
                              <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-orange-600 transition-colors" />
                            </div>
                          </div>

                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="font-mono text-lg group-hover:text-cyan-600 transition-colors">
                                {project.name}
                              </CardTitle>
                              <div className="flex items-center space-x-2 mt-2">
                                <Badge className={`text-xs font-mono ${getStatusColor(project.status)}`}>
                                  {project.status}
                                </Badge>
                                <Badge variant="secondary" className="font-mono">
                                  {project.category}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <CardDescription className="text-sm leading-relaxed mt-3">
                            <span className="font-mono text-emerald-500 text-xs">{"// "}</span>
                            {project.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {/* Stats with terminal styling */}
                            <div className="flex items-center justify-between text-sm font-mono text-muted-foreground">
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-1.5">
                                  <div className={`w-2.5 h-2.5 rounded-full ${project.languageColor}`}></div>
                                  <span>{project.language}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Star className="h-4 w-4 text-yellow-500" />
                                  <span>{project.stars.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <GitFork className="h-4 w-4 text-blue-500" />
                                  <span>{project.forks}</span>
                                </div>
                              </div>
                            </div>

                            {/* Additional Stats */}
                            <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                              <div className="flex items-center space-x-3">
                                <div className="flex items-center space-x-1">
                                  <Eye className="h-3 w-3" />
                                  <span>{project.watchers}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <AlertCircle className="h-3 w-3" />
                                  <span>{project.openIssues} issues</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Package className="h-3 w-3" />
                                  <span>{(project.size / 1024).toFixed(1)}MB</span>
                                </div>
                              </div>
                            </div>

                            {/* Topics with code styling */}
                            <div className="flex flex-wrap gap-1">
                              {project.topics.slice(0, 4).map(topic => (
                                <Badge key={topic} variant="outline" className="text-xs font-mono">
                                  #{topic}
                                </Badge>
                              ))}
                              {project.topics.length > 4 && (
                                <Badge variant="outline" className="text-xs font-mono">
                                  +{project.topics.length - 4}
                                </Badge>
                              )}
                            </div>

                            {/* Footer with terminal command style */}
                            <div className="flex items-center justify-between text-xs font-mono text-muted-foreground pt-2 border-t border-border/30">
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-3 w-3" />
                                <span title={formatDate(project.lastUpdate)}>
                                  {getTimeSince(project.lastUpdate)}
                                </span>
                              </div>
                              <span className="text-blue-400">{project.license}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {filteredProjects.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <div className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-lg p-8 max-w-md mx-auto">
                    <div className="text-sm font-mono text-muted-foreground mb-4">
                      <span className="text-red-400">if</span> (projects.length === <span className="text-yellow-400">0</span>) {"{"}
                      <br />
                      <span className="ml-4 text-cyan-400">return</span> <span className="text-green-400">"No matches found"</span>;
                      <br />
                      {"}"}
                    </div>
                    <Button 
                      variant="outline" 
                      className="font-mono"
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('All');
                        setSelectedStatus('All');
                        setSelectedLanguage('All');
                      }}
                    >
                      <span className="mr-2">$</span>
                      reset --filters
                    </Button>
                  </div>
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA with Terminal Theme */}
      <section className="relative py-24 overflow-hidden">
        {/* Terminal-style gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 via-blue-500/20 to-orange-500/20"></div>

        {/* Code line numbers effect */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-slate-950/50 border-r border-slate-700/50 hidden lg:block">
          <div className="flex flex-col items-end pr-4 pt-24 space-y-6 text-xs font-mono text-slate-600">
            {[...Array(8)].map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
        </div>

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Code-style CTA */}
            <div className="mb-8 space-y-4">
              <div className="flex items-start justify-center space-x-3 text-left">
                <span className="text-sm font-mono text-emerald-400">{"// "}</span>
                <div>
                  <div className="text-sm font-mono text-cyan-400 mb-2">
                    <span className="text-blue-400">async function</span> contribute() {"{"}
                  </div>
                </div>
              </div>

              <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4 px-8">
                Ready to Contribute?
              </h2>

              <div className="flex items-center justify-center space-x-2 text-sm font-mono">
                <span className="text-emerald-400">{"/*"}</span>
                <p className="text-lg lg:text-xl text-white/90 max-w-2xl leading-relaxed">
                  We welcome contributions from developers of all skill levels. 
                  Check out our contribution guidelines and join our growing community.
                </p>
                <span className="text-emerald-400">{"*/"}</span>
              </div>

              <div className="flex items-start justify-center space-x-3 text-left mt-6">
                <div className="text-sm font-mono text-cyan-400">
                  {"}"};
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Button size="lg" className="font-mono bg-blue-600 hover:bg-blue-700 text-white shadow-xl group" asChild>
                <Link href="https://github.com/tiverse" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  <span className="mr-2">$</span>
                  git clone
                  <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="font-mono border-2 border-slate-400 text-white hover:bg-white hover:text-slate-900" asChild>
                <Link href="/contact">
                  <span className="mr-2">{">"}</span>
                  contact.us()
                </Link>
              </Button>
            </div>

            {/* Terminal prompt at bottom */}
            <div className="mt-12 inline-flex items-center space-x-2 px-4 py-2 bg-slate-950/50 backdrop-blur-sm border border-slate-700/50 rounded-lg">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-xs font-mono text-emerald-400">tiverse@projects:~$</span>
              <span className="text-xs font-mono text-slate-400 animate-pulse">_</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}