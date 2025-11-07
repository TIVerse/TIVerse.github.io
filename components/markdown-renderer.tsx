"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, Hash } from 'lucide-react';
import { cn } from '@/lib/utils';
import 'highlight.js/styles/github-dark.css';
import 'katex/dist/katex.min.css';

interface TOCItem {
  level: number;
  text: string;
  id: string;
}

interface MarkdownRendererProps {
  content: string;
  showTOC?: boolean;
  className?: string;
}

export function MarkdownRenderer({ content, showTOC = true, className }: MarkdownRendererProps) {
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Extract table of contents
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const tocItems: TOCItem[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');

      tocItems.push({ level, text, id });
    }

    setToc(tocItems);

    // Setup intersection observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -80% 0px',
      }
    );

    // Observe all headings
    setTimeout(() => {
      const headings = document.querySelectorAll('.markdown-content h1, .markdown-content h2, .markdown-content h3, .markdown-content h4, .markdown-content h5, .markdown-content h6');
      headings.forEach((heading) => observer.observe(heading));
    }, 100);

    return () => observer.disconnect();
  }, [content]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={cn('grid grid-cols-1 lg:grid-cols-4 gap-8', className)}>
      {/* Table of Contents */}
      {showTOC && toc.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-1"
        >
          <Card className="sticky top-24 p-6 bg-background/50 backdrop-blur-sm border-border/50">
            <div className="flex items-center space-x-2 mb-4 pb-3 border-b border-border/50">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
              </div>
              <span className="text-xs font-mono text-muted-foreground">table_of_contents.ts</span>
            </div>

            <h3 className="text-sm font-mono font-semibold mb-4 text-foreground">
              <span className="text-cyan-500">{">"}</span> Contents
            </h3>

            <nav className="space-y-2">
              {toc.map((item, index) => (
                <button
                  key={index}
                  onClick={() => scrollToHeading(item.id)}
                  className={cn(
                    'w-full text-left text-sm transition-all duration-200 hover:text-cyan-600 group flex items-start space-x-2',
                    item.level === 1 && 'font-semibold',
                    item.level === 2 && 'pl-2',
                    item.level === 3 && 'pl-4 text-xs',
                    item.level >= 4 && 'pl-6 text-xs',
                    activeId === item.id
                      ? 'text-cyan-600 font-medium'
                      : 'text-muted-foreground'
                  )}
                >
                  <Hash className={cn(
                    'h-3 w-3 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity',
                    activeId === item.id && 'opacity-100'
                  )} />
                  <span className="flex-1 font-mono">{item.text}</span>
                </button>
              ))}
            </nav>
          </Card>
        </motion.div>
      )}

      {/* Markdown Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={cn(
          'markdown-content',
          showTOC && toc.length > 0 ? 'lg:col-span-3' : 'lg:col-span-4'
        )}
      >
        <Card className="p-8 lg:p-12 bg-background/50 backdrop-blur-sm border-border/50">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[
              rehypeKatex,
              rehypeHighlight,
              rehypeSlug,
              [rehypeAutolinkHeadings, { behavior: 'wrap' }],
            ]}
            components={{
              h1: ({ node, ...props }) => (
                <h1 className="text-4xl font-bold mt-8 mb-4 text-foreground font-mono border-b border-border/50 pb-3" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="text-3xl font-bold mt-8 mb-4 text-foreground font-mono" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 className="text-2xl font-semibold mt-6 mb-3 text-foreground font-mono" {...props} />
              ),
              h4: ({ node, ...props }) => (
                <h4 className="text-xl font-semibold mt-4 mb-2 text-foreground font-mono" {...props} />
              ),
              h5: ({ node, ...props }) => (
                <h5 className="text-lg font-semibold mt-4 mb-2 text-foreground font-mono" {...props} />
              ),
              h6: ({ node, ...props }) => (
                <h6 className="text-base font-semibold mt-4 mb-2 text-foreground font-mono" {...props} />
              ),
              p: ({ node, ...props }) => (
                <p className="my-4 text-foreground leading-relaxed" {...props} />
              ),
              a: ({ node, ...props }) => (
                <a 
                  className="text-cyan-600 hover:text-cyan-700 underline underline-offset-2 font-medium transition-colors" 
                  target="_blank"
                  rel="noopener noreferrer"
                  {...props} 
                />
              ),
              ul: ({ node, ...props }) => (
                <ul className="my-4 ml-6 list-disc space-y-2 text-foreground" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol className="my-4 ml-6 list-decimal space-y-2 text-foreground" {...props} />
              ),
              li: ({ node, ...props }) => (
                <li className="text-foreground leading-relaxed" {...props} />
              ),
              blockquote: ({ node, ...props }) => (
                <blockquote className="my-4 pl-4 border-l-4 border-cyan-500 italic text-muted-foreground bg-muted/30 py-2 pr-4 rounded-r" {...props} />
              ),
              code: ({ node, inline, className, children, ...props }: any) => {
                const match = /language-(\w+)/.exec(className || '');
                return !inline ? (
                  <div className="relative my-4 rounded-lg overflow-hidden border border-border/50">
                    {match && (
                      <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-700">
                        <span className="text-xs font-mono text-slate-400">{match[1]}</span>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                        </div>
                      </div>
                    )}
                    <pre className="!bg-slate-900 !m-0 p-4 overflow-x-auto">
                      <code className={cn('!bg-transparent font-mono text-sm', className)} {...props}>
                        {children}
                      </code>
                    </pre>
                  </div>
                ) : (
                  <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-sm text-cyan-600" {...props}>
                    {children}
                  </code>
                );
              },
              pre: ({ node, ...props }) => (
                <div {...props} />
              ),
              table: ({ node, ...props }) => (
                <div className="my-6 overflow-x-auto">
                  <table className="w-full border-collapse border border-border/50 rounded-lg overflow-hidden" {...props} />
                </div>
              ),
              thead: ({ node, ...props }) => (
                <thead className="bg-muted" {...props} />
              ),
              tbody: ({ node, ...props }) => (
                <tbody {...props} />
              ),
              tr: ({ node, ...props }) => (
                <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors" {...props} />
              ),
              th: ({ node, ...props }) => (
                <th className="px-4 py-3 text-left font-mono font-semibold text-foreground border-r border-border/50 last:border-r-0" {...props} />
              ),
              td: ({ node, ...props }) => (
                <td className="px-4 py-3 text-foreground border-r border-border/50 last:border-r-0" {...props} />
              ),
              hr: ({ node, ...props }) => (
                <hr className="my-8 border-border/50" {...props} />
              ),
              img: ({ node, ...props }) => (
                <img className="my-6 rounded-lg border border-border/50 max-w-full h-auto" {...props} />
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </Card>
      </motion.div>
    </div>
  );
}
