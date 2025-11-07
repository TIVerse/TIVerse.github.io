import { notFound } from 'next/navigation';
import { Calendar, Clock, Download, ExternalLink, ArrowLeft, Users, BookOpen, Share2, Quote, FileText, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MarkdownRenderer } from '@/components/markdown-renderer';
import { getResearchDocumentBySlug, getAllResearchDocuments } from '@/lib/research';

export default async function ResearchDocumentPage({ params }: { params: { slug: string } }) {
  const document = await getResearchDocumentBySlug(params.slug);

  if (!document) {
    notFound();
  }

  return (
    <div className="pt-16 min-h-screen">
      {/* Hero Header with Paper Texture */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.05),transparent_50%)]"></div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link href="/research">
            <Button variant="ghost" size="sm" className="mb-8 font-mono hover:bg-accent/50 transition-all group">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              cd ../research
            </Button>
          </Link>

          {/* Paper Card Container */}
          <div className="max-w-5xl mx-auto">
            <Card className="border-2 border-border/50 shadow-2xl bg-background/95 backdrop-blur-sm overflow-hidden">
              {/* Decorative Header Bar */}
              <div className="h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></div>
              
              <div className="p-8 md:p-12">
                {/* Status Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <Badge variant="secondary" className="font-mono text-xs px-3 py-1">
                    <FileText className="mr-1 h-3 w-3" />
                    {document.category}
                  </Badge>
                  <Badge 
                    variant={document.status === 'published' ? 'default' : 'outline'} 
                    className="font-mono text-xs px-3 py-1"
                  >
                    <Sparkles className="mr-1 h-3 w-3" />
                    {document.status}
                  </Badge>
                  {document.doi && (
                    <Badge variant="outline" className="font-mono text-xs px-3 py-1">
                      DOI: {document.doi}
                    </Badge>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-[1.1] tracking-tight">
                  {document.title}
                </h1>

                {/* Authors as Cards */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {document.authors.map((author: string, index: number) => (
                    <div 
                      key={index}
                      className="flex items-center gap-2 px-4 py-2 bg-accent/50 rounded-lg border border-border/50 hover:bg-accent transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                        {author.charAt(0)}
                      </div>
                      <span className="font-medium text-sm">{author}</span>
                    </div>
                  ))}
                </div>

                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8 pb-8 border-b border-border/50">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-cyan-500" />
                    <span className="font-mono">{new Date(document.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <Separator orientation="vertical" className="h-4" />
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span className="font-mono">{document.readTime}</span>
                  </div>
                  <Separator orientation="vertical" className="h-4" />
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-purple-500" />
                    <span className="font-mono">{document.authors.length} {document.authors.length === 1 ? 'Author' : 'Authors'}</span>
                  </div>
                </div>

                {/* Abstract with Quote Styling */}
                <div className="relative mb-8">
                  <Quote className="absolute -left-4 -top-4 h-8 w-8 text-cyan-500/20" />
                  <div className="pl-6 border-l-4 border-gradient-to-b from-cyan-500 to-blue-500">
                    <h2 className="text-sm font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-3">Abstract</h2>
                    <p className="text-lg leading-relaxed text-foreground/90">
                      {document.abstract}
                    </p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {document.tags.map((tag: string) => (
                    <Badge 
                      key={tag} 
                      variant="outline" 
                      className="font-mono text-xs px-3 py-1 hover:bg-accent transition-colors cursor-pointer"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  {document.pdfUrl && (
                    <Button 
                      variant="default" 
                      className="font-mono bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all" 
                      asChild
                    >
                      <a href={document.pdfUrl} target="_blank" rel="noopener noreferrer">
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </a>
                    </Button>
                  )}
                  {document.externalUrl && (
                    <Button variant="outline" className="font-mono border-2 hover:bg-accent" asChild>
                      <a href={document.externalUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View on arXiv
                      </a>
                    </Button>
                  )}
                  <Button variant="outline" className="font-mono border-2 hover:bg-accent">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Content with Academic Paper Styling */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <MarkdownRenderer content={document.content} showTOC={true} />
        </div>
      </section>

      {/* Citation Section */}
      <section className="py-12 border-t-2 border-border/50 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <h2 className="text-2xl font-bold mb-6 font-mono flex items-center gap-2">
            <Quote className="h-6 w-6 text-cyan-500" />
            How to Cite
          </h2>
          <Card className="p-6 bg-slate-900 dark:bg-slate-950 border-slate-700">
            <code className="text-sm text-cyan-400 font-mono leading-relaxed block">
              {document.authors.join(', ')}. ({new Date(document.date).getFullYear()}). {document.title}. 
              <span className="text-blue-400"> TIVerse Research</span>
              {document.doi && <span className="text-purple-400">. https://doi.org/{document.doi}</span>}
            </code>
          </Card>
        </div>
      </section>

      {/* Related Research */}
      <section className="py-12 border-t border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <h2 className="text-2xl font-bold mb-6 font-mono flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-cyan-500" />
            Related Research
          </h2>
          <p className="text-muted-foreground">More research papers coming soon...</p>
        </div>
      </section>
    </div>
  );
}

export async function generateStaticParams() {
  const documents = await getAllResearchDocuments();
  return documents.map((doc) => ({
    slug: doc.slug,
  }));
}
