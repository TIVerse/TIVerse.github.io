import { notFound } from 'next/navigation';
import { Calendar, Clock, User, Download, ExternalLink, ArrowLeft, Users, BookOpen, Share2 } from 'lucide-react';
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
    <div className="pt-16 min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <section className="border-b border-border/50 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/research">
            <Button variant="ghost" size="sm" className="mb-6 font-mono">
              <ArrowLeft className="mr-2 h-4 w-4" />
              back to research
            </Button>
          </Link>

          <div className="max-w-4xl">
            <div className="flex items-center space-x-2 mb-4">
              <Badge variant="secondary" className="font-mono">{document.category}</Badge>
              <Badge variant="outline" className="font-mono">{document.status}</Badge>
              {document.doi && (
                <Badge variant="outline" className="font-mono text-xs">DOI: {document.doi}</Badge>
              )}
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              {document.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span className="font-mono">{document.authors.join(', ')}</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span className="font-mono">{new Date(document.date).toLocaleDateString()}</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span className="font-mono">{document.readTime}</span>
              </div>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              {document.abstract}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {document.tags.map((tag: string) => (
                <Badge key={tag} variant="outline" className="font-mono">
                  #{tag}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              {document.pdfUrl && (
                <Button variant="default" className="font-mono" asChild>
                  <a href={document.pdfUrl} target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </a>
                </Button>
              )}
              {document.externalUrl && (
                <Button variant="outline" className="font-mono" asChild>
                  <a href={document.externalUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View on arXiv
                  </a>
                </Button>
              )}
              <Button variant="outline" className="font-mono">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <MarkdownRenderer content={document.content} showTOC={true} />
        </div>
      </section>

      {/* Related Research */}
      <section className="py-12 border-t border-border/50 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6 font-mono">
            <span className="text-cyan-500">{">"}</span> Related Research
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
