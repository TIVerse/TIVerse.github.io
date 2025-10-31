"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowRight, Tag, Search, Terminal, Code, Brackets, ChevronRight, Github, ExternalLink, Heart, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { fetchDevToArticles, type ProcessedArticle } from '@/lib/devto';

const fallbackPosts = [
  {
    id: 1,
    title: 'Building Scalable CLI Tools with TypeScript',
    excerpt: 'Learn how we designed TI-CLI to handle complex development workflows while maintaining excellent developer experience.',
    content: 'In this comprehensive guide, we\'ll walk through the architecture decisions and best practices that went into building TI-CLI...',
    author: 'TIVerse Team',
    date: '2024-01-20',
    readTime: '8 min read',
    category: 'Development',
    tags: ['typescript', 'cli', 'architecture', 'devtools'],
    featured: true,
    codeSnippet: 'const cli = new TI_CLI({ config: "./ti.config.js" });',
  },
  {
    id: 2,
    title: 'The Future of Configuration Management',
    excerpt: 'Exploring modern approaches to application configuration with TI-Config and emerging industry patterns.',
    content: 'Configuration management has evolved significantly over the past few years. With the rise of cloud-native applications...',
    author: 'TIVerse Team',
    date: '2024-01-18',
    readTime: '6 min read',
    category: 'Infrastructure',
    tags: ['config', 'devops', 'cloud-native'],
    featured: false,
    codeSnippet: 'await config.load({ env: "production" });',
  },
  {
    id: 3,
    title: 'Streamlining Deployments with TI-Deploy',
    excerpt: 'How we simplified Kubernetes deployments and what it means for development teams adopting cloud-native practices.',
    content: 'Deployment complexity has been a significant pain point for many development teams. Our journey with TI-Deploy...',
    author: 'TIVerse Team',
    date: '2024-01-15',
    readTime: '10 min read',
    category: 'DevOps',
    tags: ['kubernetes', 'deployment', 'automation'],
    featured: true,
    codeSnippet: 'kubectl apply -f ./deploy/production.yaml',
  },
  {
    id: 4,
    title: 'Open Source Sustainability: Lessons Learned',
    excerpt: 'Reflections on maintaining open source projects and building sustainable communities around developer tools.',
    content: 'After years of maintaining open source projects, we\'ve learned valuable lessons about sustainability...',
    author: 'TIVerse Team',
    date: '2024-01-12',
    readTime: '5 min read',
    category: 'Community',
    tags: ['open-source', 'community', 'sustainability'],
    featured: false,
    codeSnippet: 'git commit -m "feat: community-driven development"',
  },
  {
    id: 5,
    title: 'Security Best Practices in Modern Development',
    excerpt: 'Essential security practices every development team should implement, featuring insights from TI-Security.',
    content: 'Security should be an integral part of the development process, not an afterthought. In this post...',
    author: 'TIVerse Team',
    date: '2024-01-10',
    readTime: '12 min read',
    category: 'Security',
    tags: ['security', 'best-practices', 'development'],
    featured: false,
    codeSnippet: 'const secure = await encrypt(data, { algorithm: "AES-256" });',
  },
  {
    id: 6,
    title: 'Monitoring Made Simple: TI-Monitor Deep Dive',
    excerpt: 'A technical deep dive into TI-Monitor\'s architecture and how it simplifies application monitoring.',
    content: 'Application monitoring doesn\'t have to be complex. With TI-Monitor, we\'ve focused on simplicity...',
    author: 'TIVerse Team',
    date: '2024-01-08',
    readTime: '9 min read',
    category: 'Monitoring',
    tags: ['monitoring', 'observability', 'metrics'],
    featured: false,
    codeSnippet: 'monitor.track("api_response_time", { duration: 150 });',
  },
];

const categories = ['All', 'Development', 'Infrastructure', 'DevOps', 'Community', 'Security', 'Monitoring', 'AI/ML', 'Design', 'Career'];

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [blogPosts, setBlogPosts] = useState<ProcessedArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    async function loadArticles() {
      try {
        setIsLoading(true);
        // Try to fetch from dev.to
        const articles = await fetchDevToArticles('eshanized');
        
        if (articles.length > 0) {
          setBlogPosts(articles);
          setUsingFallback(false);
        } else {
          // If no articles found, use fallback posts
          setBlogPosts(fallbackPosts);
          setUsingFallback(true);
        }
      } catch (error) {
        console.error('Error loading articles:', error);
        // On error, use fallback posts
        setBlogPosts(fallbackPosts);
        setUsingFallback(true);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadArticles();
  }, []);
  
  // Ensure fallback posts match the ProcessedArticle type
  const fallbackPosts: ProcessedArticle[] = [
    {
      id: 1,
      title: 'Building Scalable CLI Tools with TypeScript',
      excerpt: 'Learn how we designed TI-CLI to handle complex development workflows while maintaining excellent developer experience.',
      content: 'In this comprehensive guide, we\'ll walk through the architecture decisions and best practices that went into building TI-CLI...',
      author: 'TIVerse Team',
      date: '2024-01-20',
      readTime: '8 min read',
      category: 'Development',
      tags: ['typescript', 'cli', 'architecture', 'devtools'],
      featured: true,
      codeSnippet: 'const cli = new TI_CLI({ config: "./ti.config.js" });',
      reactions: 42,
      comments: 5,
    },
      {
      id: 2,
      title: 'The Future of Configuration Management',
      excerpt: 'Exploring modern approaches to application configuration with TI-Config and emerging industry patterns.',
      content: 'Configuration management has evolved significantly over the past few years. With the rise of cloud-native applications...',
      author: 'TIVerse Team',
      date: '2024-01-18',
      readTime: '6 min read',
      category: 'Infrastructure',
      tags: ['config', 'devops', 'cloud-native'],
      featured: false,
      codeSnippet: 'await config.load({ env: "production" });',
      reactions: 28,
      comments: 3,
    },
    {
      id: 3,
      title: 'Streamlining Deployments with TI-Deploy',
      excerpt: 'How we simplified Kubernetes deployments and what it means for development teams adopting cloud-native practices.',
      content: 'Deployment complexity has been a significant pain point for many development teams. Our journey with TI-Deploy...',
      author: 'TIVerse Team',
      date: '2024-01-15',
      readTime: '10 min read',
      category: 'DevOps',
      tags: ['kubernetes', 'deployment', 'automation'],
      featured: true,
      codeSnippet: 'kubectl apply -f ./deploy/production.yaml',
      reactions: 35,
      comments: 7,
    },
    {
      id: 4,
      title: 'Open Source Sustainability: Lessons Learned',
      excerpt: 'Reflections on maintaining open source projects and building sustainable communities around developer tools.',
      content: 'After years of maintaining open source projects, we\'ve learned valuable lessons about sustainability...',
      author: 'TIVerse Team',
      date: '2024-01-12',
      readTime: '5 min read',
      category: 'Community',
      tags: ['open-source', 'community', 'sustainability'],
      featured: false,
      codeSnippet: 'git commit -m "feat: community-driven development"',
      reactions: 52,
      comments: 12,
    },
    {
      id: 5,
      title: 'Security Best Practices in Modern Development',
      excerpt: 'Essential security practices every development team should implement, featuring insights from TI-Security.',
      content: 'Security should be an integral part of the development process, not an afterthought. In this post...',
      author: 'TIVerse Team',
      date: '2024-01-10',
      readTime: '12 min read',
      category: 'Security',
      tags: ['security', 'best-practices', 'development'],
      featured: false,
      codeSnippet: 'const secure = await encrypt(data, { algorithm: "AES-256" });',
      reactions: 47,
      comments: 8,
    },
    {
      id: 6,
      title: 'Monitoring Made Simple: TI-Monitor Deep Dive',
      excerpt: 'A technical deep dive into TI-Monitor\'s architecture and how it simplifies application monitoring.',
      content: 'Application monitoring doesn\'t have to be complex. With TI-Monitor, we\'ve focused on simplicity...',
      author: 'TIVerse Team',
      date: '2024-01-08',
      readTime: '9 min read',
      category: 'Monitoring',
      tags: ['monitoring', 'observability', 'metrics'],
      featured: false,
      codeSnippet: 'monitor.track("api_response_time", { duration: 150 });',
      reactions: 31,
      comments: 4,
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="pt-16">
      {/* Hero Section with Terminal Aesthetic */}
      <section className="relative overflow-hidden">
        {/* Grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-background to-blue-50/30 dark:from-slate-950 dark:via-background dark:to-slate-900"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.08),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.12),transparent_50%)]"></div>

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Terminal-style status badge */}
            <div className="inline-flex items-center space-x-3 mb-6 px-4 py-2 bg-background/80 backdrop-blur-sm border border-border/50 rounded-lg shadow-lg">
              <div className="flex space-x-1.5">
                <div className="w-2.5 h-2.5 bg-red-400 rounded-full"></div>
                <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full"></div>
                <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse"></div>
              </div>
              <span className="text-xs font-mono text-muted-foreground">blog.insights.tsx</span>
            </div>

            {/* Code-style title */}
            <div className="mb-6 space-y-2">
              <div className="text-left max-w-fit mx-auto">
                <span className="text-sm font-mono text-muted-foreground/70">1 </span>
                <span className="text-sm font-mono text-cyan-500">const</span>
                <span className="text-sm font-mono text-foreground"> insights = await </span>
                <span className="text-sm font-mono text-purple-500">fetchBlogPosts</span>
                <span className="text-sm font-mono text-foreground">();</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground tracking-tight leading-[1.1]">
                Developer{" "}
                <span className="relative inline-block">
                  <span className="font-mono bg-gradient-to-r from-cyan-600 via-blue-500 to-orange-500 bg-clip-text text-transparent">
                    Insights
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-600 via-blue-500 to-orange-500 rounded-full"></span>
                </span>
              </h1>

              <div className="text-left max-w-fit mx-auto">
                <span className="text-sm font-mono text-muted-foreground/70">2 </span>
                <span className="text-sm font-mono text-cyan-500">return</span>
                <span className="text-sm font-mono text-foreground"> insights.</span>
                <span className="text-sm font-mono text-purple-500">filter</span>
                <span className="text-sm font-mono text-foreground">(</span>
                <span className="text-sm font-mono text-blue-500">technical_depth</span>
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
                  Technical insights, project updates, and thoughts on the future of developer infrastructure.
                  Deep dives into architecture, best practices, and lessons learned from building production systems.
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
              <Button size="lg" className="font-mono bg-gradient-to-r from-cyan-600 to-orange-600 hover:from-cyan-700 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all group">
                <span className="mr-2">$</span>
                cat latest_posts.md
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="font-mono border-2 hover:bg-accent" asChild>
                <Link href="https://github.com/tiverse" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  view --source-code
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
                <div className="relative bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-sm border border-blue-500/30 rounded-lg p-6 hover:border-blue-500/60 transition-all">
                  <div className="text-xs font-mono text-blue-400 mb-2">{">"} posts.length</div>
                  <div className="text-3xl lg:text-4xl font-bold font-mono text-cyan-400 mb-1">
                    {blogPosts.length}+
                  </div>
                  <div className="text-xs font-mono text-muted-foreground/70">// articles</div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 rounded-lg blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="relative bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-6 hover:border-cyan-500/60 transition-all">
                  <div className="text-xs font-mono text-cyan-400 mb-2">{">"} categories.size</div>
                  <div className="text-3xl lg:text-4xl font-bold font-mono text-emerald-400 mb-1">
                    {categories.length - 1}+
                  </div>
                  <div className="text-xs font-mono text-muted-foreground/70">// topics</div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-lg blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="relative bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-sm border border-emerald-500/30 rounded-lg p-6 hover:border-emerald-500/60 transition-all">
                  <div className="text-xs font-mono text-emerald-400 mb-2">{">"} featured.count</div>
                  <div className="text-3xl lg:text-4xl font-bold font-mono text-blue-400 mb-1">
                    {blogPosts.filter(p => p.featured).length}
                  </div>
                  <div className="text-xs font-mono text-muted-foreground/70">// featured</div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-emerald-500/10 rounded-lg blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="relative bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-sm border border-blue-500/30 rounded-lg p-6 hover:border-blue-500/60 transition-all">
                  <div className="text-xs font-mono text-blue-400 mb-2">{">"} readTime.avg</div>
                  <div className="text-3xl lg:text-4xl font-bold font-mono text-cyan-400 mb-1">
                    {Math.round(blogPosts.reduce((acc, p) => acc + parseInt(p.readTime), 0) / blogPosts.length)}
                  </div>
                  <div className="text-xs font-mono text-muted-foreground/70">// min read</div>
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
            <span className="text-xs font-mono text-slate-400">search.filter.ts</span>
          </div>

          <div className="flex flex-col space-y-4">
            {/* Search with terminal styling */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                <span className="text-xs font-mono text-emerald-400">$</span>
                <Search className="h-4 w-4 text-cyan-400" />
              </div>
              <Input
                placeholder="grep -i 'search_term' blog_posts/*"
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
                <span className="text-xs font-mono text-slate-400">)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts with Terminal Theme */}
      {featuredPosts.length > 0 && (
        <section className="py-16 relative overflow-hidden">
          {/* Subtle grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]"></div>

          <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              {/* Terminal-style header */}
              <div className="inline-flex items-center space-x-2 mb-4 px-4 py-2 bg-background/80 backdrop-blur-sm border border-border/50 rounded-lg">
                <span className="text-xs font-mono text-cyan-500">const</span>
                <span className="text-xs font-mono text-blue-500">featured</span>
                <span className="text-xs font-mono text-muted-foreground">= posts.filter(p {'=>'} p.featured);</span>
              </div>

              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Featured Articles
              </h2>
              <div className="text-xl text-muted-foreground max-w-2xl mx-auto">
                <span className="font-mono text-emerald-500">{"// "}</span>
                Our most popular and impactful technical deep dives, handpicked for developers.
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={`/blog/${post.id}`}>
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
                            <span className="text-xs font-mono text-muted-foreground/70">{post.title.toLowerCase().replace(/\s+/g, '_')}.md</span>
                          </div>
                          <div className="flex space-x-1">
                            <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 font-mono text-xs">
                              featured
                            </Badge>
                            <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-cyan-600 transition-colors" />
                          </div>
                        </div>

                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="font-mono text-lg group-hover:text-blue-600 transition-colors mb-2">
                              {post.title}
                            </CardTitle>
                            <div className="flex items-center space-x-2 mb-3">
                              <Badge variant="secondary" className="font-mono text-xs">
                                {post.category}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        {/* Code snippet preview */}
                        <div className="mb-3 p-2 bg-slate-900/20 dark:bg-slate-950/40 rounded border font-mono text-xs">
                          <span className="text-emerald-400">$ </span>
                          <span className="text-cyan-400">{post.codeSnippet}</span>
                        </div>

                        <CardDescription className="text-sm leading-relaxed">
                          <span className="font-mono text-emerald-500 text-xs">{"// "}</span>
                          {post.excerpt}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {/* Stats */}
                          <div className="flex items-center justify-between text-sm font-mono text-muted-foreground">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <User className="h-4 w-4" />
                                <span>{post.author}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>{new Date(post.date).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>{post.readTime}</span>
                              </div>
                            </div>
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1">
                            {post.tags.slice(0, 3).map(tag => (
                              <Badge key={tag} variant="outline" className="text-xs font-mono">
                                #{tag}
                              </Badge>
                            ))}
                            {post.tags.length > 3 && (
                              <Badge variant="outline" className="text-xs font-mono">
                                +{post.tags.length - 3}
                              </Badge>
                            )}
                          </div>

                          <Button variant="outline" className="w-full font-mono group-hover:bg-indigo-50 group-hover:border-indigo-200 transition-colors">
                            <span className="mr-2">$</span>
                            cat article.md
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regular Posts with Terminal Grid */}
      <section className="py-16 bg-muted/30 relative overflow-hidden">
        {/* Code grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"></div>

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            {/* Code-style section header */}
            <div className="inline-block mb-4">
              <div className="flex items-center space-x-2 text-sm font-mono text-muted-foreground/70">
                <span className="text-cyan-500">const</span>
                <span className="text-blue-500">allPosts</span>
                <span className="text-muted-foreground">= posts.sort((a, b) {'=>'} new Date(b.date) - new Date(a.date));</span>
              </div>
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              All Articles
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              <span className="font-mono text-emerald-500">{"// "}</span>
              Browse our complete collection of technical articles, tutorials, and insights.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/blog/${post.id}`}>
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
                          <span className="text-xs font-mono text-muted-foreground/70">{post.id.toString().padStart(2, '0')}.md</span>
                        </div>
                        <Code className="h-4 w-4 text-muted-foreground group-hover:text-cyan-600 transition-colors" />
                      </div>

                      <Badge variant="secondary" className="w-fit mb-2 font-mono text-xs">
                        {post.category}
                      </Badge>
                      <CardTitle className="text-lg font-mono group-hover:text-cyan-600 transition-colors">
                        {post.title}
                      </CardTitle>

                      {/* Code snippet preview */}
                      <div className="mt-3 p-2 bg-slate-900/20 dark:bg-slate-950/40 rounded border font-mono text-xs">
                        <span className="text-emerald-400">$ </span>
                        <span className="text-cyan-400">{post.codeSnippet}</span>
                      </div>

                      <CardDescription className="text-sm leading-relaxed mt-3">
                        <span className="font-mono text-emerald-500 text-xs">{"// "}</span>
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Stats */}
                        <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(post.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1">
                          {post.tags.slice(0, 2).map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs font-mono">
                              #{tag}
                            </Badge>
                          ))}
                          {post.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs font-mono">
                              +{post.tags.length - 2}
                            </Badge>
                          )}
                        </div>

                        <Button variant="outline" size="sm" className="w-full font-mono group-hover:bg-indigo-50 group-hover:border-indigo-200 transition-colors">
                          <span className="mr-2">$</span>
                          read --article
                          <ArrowRight className="ml-2 h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-lg p-8 max-w-md mx-auto">
                <div className="text-sm font-mono text-muted-foreground mb-4">
                  <span className="text-red-400">if</span> (posts.length === <span className="text-yellow-400">0</span>) {"{"}
                  <br />
                  <span className="ml-4 text-cyan-400">return</span> <span className="text-green-400">"No articles found"</span>;
                  <br />
                  {"}"}
                </div>
                <Button 
                  variant="outline" 
                  className="font-mono"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                >
                  <span className="mr-2">$</span>
                  reset --filters
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter CTA with Terminal Theme */}
      <section className="relative py-24 overflow-hidden">
        {/* Terminal-style gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-cyan-500/20 to-emerald-500/20"></div>

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
                    <span className="text-blue-400">async function</span> subscribe() {"{"}
                  </div>
                </div>
              </div>

              <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4 px-8">
                Stay Updated with Latest Insights
              </h2>

              <div className="flex items-center justify-center space-x-2 text-sm font-mono">
                <span className="text-emerald-400">{"/*"}</span>
                <p className="text-lg lg:text-xl text-white/90 max-w-2xl leading-relaxed">
                  Get the latest technical insights, architecture deep dives, and developer tools updates directly in your inbox.
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
                <Link href="/contact">
                  <span className="mr-2">$</span>
                  npm subscribe
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="font-mono border-2 border-slate-400 text-white hover:bg-white hover:text-slate-900" asChild>
                <Link href="https://github.com/tiverse" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  <span className="mr-2">{">"}</span>
                  follow.github()
                </Link>
              </Button>
            </div>

            {/* Terminal prompt at bottom */}
            <div className="mt-12 inline-flex items-center space-x-2 px-4 py-2 bg-slate-950/50 backdrop-blur-sm border border-slate-700/50 rounded-lg">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-xs font-mono text-emerald-400">tiverse@blog:~$</span>
              <span className="text-xs font-mono text-slate-400 animate-pulse">_</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}