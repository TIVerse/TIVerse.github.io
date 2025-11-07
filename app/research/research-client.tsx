"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Search, Users, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { ResearchDocument } from '@/lib/research';

const categories = ['All', 'Infrastructure', 'AI/ML', 'DevOps', 'Security'];

interface Props {
  initialDocuments: ResearchDocument[];
}

export default function ResearchClientPage({ initialDocuments }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredDocuments = initialDocuments.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.abstract.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredDocuments = filteredDocuments.filter(doc => doc.featured);
  const regularDocuments = filteredDocuments.filter(doc => !doc.featured);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-background via-purple-50/30 to-teal-50/30 dark:from-blue-950 dark:via-background dark:via-purple-950/30 dark:to-teal-950/30"></div>

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <div className="inline-flex items-center space-x-3 mb-6 px-4 py-2 bg-background/80 backdrop-blur-sm border border-border/50 rounded-lg shadow-lg glow-blue">
              <div className="flex space-x-1.5">
                <div className="w-2.5 h-2.5 bg-gradient-to-r from-red-400 to-red-500 rounded-full shadow-lg shadow-red-400/50"></div>
                <div className="w-2.5 h-2.5 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full shadow-lg shadow-yellow-400/50"></div>
                <div className="w-2.5 h-2.5 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
              </div>
              <span className="text-xs font-mono text-muted-foreground">research_and_development.tsx</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6">
              R&D <span className="font-mono bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 bg-clip-text text-transparent">Research</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              <span className="font-mono text-emerald-500">{"/* "}</span>
              Cutting-edge research in distributed systems, AI/ML, and infrastructure
              <span className="font-mono text-emerald-500">{" */"}</span>
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { label: 'publications', value: initialDocuments.length, color: 'blue' },
                { label: 'categories', value: categories.length - 1, color: 'cyan' },
                { label: 'featured', value: initialDocuments.filter(d => d.featured).length, color: 'emerald' },
                { label: 'open_access', value: '100%', color: 'blue' },
              ].map((stat) => (
                <div key={stat.label} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg blur-xl"></div>
                  <div className="relative bg-slate-900/90 backdrop-blur-sm border border-blue-500/30 rounded-lg p-6 glow-blue">
                    <div className="text-xs font-mono text-blue-400 mb-2">{">"} {stat.label}</div>
                    <div className="text-3xl font-bold font-mono text-purple-400">{stat.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-slate-950 border-b border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col space-y-4">
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                <span className="text-xs font-mono text-emerald-400">$</span>
                <Search className="h-4 w-4 text-cyan-400" />
              </div>
              <Input
                placeholder="grep -i 'search_term' research/*"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-400 font-mono"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48 bg-slate-900/50 border-slate-700 text-white font-mono">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-slate-700">
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat} className="text-white font-mono">{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Featured Research */}
      {featuredDocuments.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Research</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredDocuments.map((doc) => (
                <Link key={doc.slug} href={`/research/${doc.slug}`}>
                  <Card className="h-full hover:shadow-xl transition-all group cursor-pointer">
                    <CardHeader>
                      <div className="flex justify-between mb-3">
                        <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">featured</Badge>
                        <Badge variant="secondary">{doc.category}</Badge>
                      </div>
                      <CardTitle className="group-hover:text-blue-600 transition-colors">{doc.title}</CardTitle>
                      <CardDescription className="mt-2">{doc.abstract}</CardDescription>
                      <div className="flex flex-wrap gap-2 mt-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Users className="h-3 w-3"/>{doc.authors[0]}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3"/>{new Date(doc.date).toLocaleDateString()}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3"/>{doc.readTime}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {doc.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">#{tag}</Badge>
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full">
                        <BookOpen className="mr-2 h-4 w-4" />Read Paper
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Research */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">All Publications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularDocuments.map((doc) => (
              <Link key={doc.slug} href={`/research/${doc.slug}`}>
                <Card className="h-full hover:shadow-xl transition-all group cursor-pointer">
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2">{doc.category}</Badge>
                    <CardTitle className="text-lg group-hover:text-cyan-600 transition-colors">{doc.title}</CardTitle>
                    <CardDescription className="text-sm">{doc.abstract.substring(0, 100)}...</CardDescription>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {doc.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">#{tag}</Badge>
                      ))}
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
