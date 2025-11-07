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
      {/* Table of Contents - Enhanced */}
      {showTOC && toc.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-1"
        >
          <div className="sticky top-24 space-y-4">
            <Card className="p-6 border-2 border-border/50 shadow-xl bg-gradient-to-br from-background via-background to-accent/5 overflow-hidden">
              <div className="relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-2xl"></div>
                
                <div className="flex items-center space-x-2 mb-4 pb-3 border-b border-border/50">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">table_of_contents.ts</span>
                </div>

                <h3 className="text-sm font-mono font-bold mb-4 text-cyan-600 dark:text-cyan-400 flex items-center relative z-10">
                  <span className="text-lg mr-2">{"📑"}</span> Contents
                </h3>

                <nav className="space-y-1 relative z-10">
                  {toc.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => scrollToHeading(item.id)}
                      className={cn(
                        'w-full text-left text-xs py-2 px-3 rounded-md transition-all duration-200 group flex items-start space-x-2 relative',
                        item.level === 1 && 'font-bold',
                        item.level === 2 && 'pl-5',
                        item.level === 3 && 'pl-8 text-xs',
                        item.level >= 4 && 'pl-11 text-xs',
                        activeId === item.id
                          ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-600 dark:text-cyan-400 border-l-2 border-cyan-500'
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                      )}
                    >
                      {activeId === item.id && (
                        <span className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-blue-500 rounded-r"></span>
                      )}
                      <Hash className={cn(
                        'h-3 w-3 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0',
                        activeId === item.id && 'opacity-100'
                      )} />
                      <span className="flex-1 font-mono">{item.text}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </Card>
            
            {/* Progress Indicator */}
            <Card className="p-4 border border-border/50 bg-gradient-to-br from-background to-accent/5">
              <div className="text-xs font-mono text-muted-foreground mb-2 flex items-center justify-between">
                <span>Reading Progress</span>
                <span className="text-cyan-600 dark:text-cyan-400 font-bold">
                  {Math.min(Math.round((toc.findIndex(item => item.id === activeId) + 1) / toc.length * 100), 100)}%
                </span>
              </div>
              <div className="w-full bg-accent/30 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 transition-all duration-300 rounded-full"
                  style={{ width: `${Math.min((toc.findIndex(item => item.id === activeId) + 1) / toc.length * 100, 100)}%` }}
                ></div>
              </div>
            </Card>
          </div>
        </motion.div>
      )}

      {/* Markdown Content - Enhanced Academic Paper Style */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={cn(
          'markdown-content',
          showTOC && toc.length > 0 ? 'lg:col-span-3' : 'lg:col-span-4'
        )}
      >
        <Card className="p-8 lg:p-12 border-2 border-border/50 shadow-xl bg-background/95 backdrop-blur-sm overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
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
                <h1 className="text-4xl font-bold mt-12 mb-6 text-foreground relative pb-4 border-b-2 border-gradient-to-r from-cyan-500 to-blue-500" {...props}>
                  <span className="relative z-10">{props.children}</span>
                  <div className="absolute bottom-0 left-0 w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
                </h1>
              ),
              h2: ({ node, ...props }) => (
                <h2 className="text-3xl font-bold mt-10 mb-5 text-foreground relative pl-4 border-l-4 border-cyan-500" {...props}>
                  <span className="relative z-10">{props.children}</span>
                </h2>
              ),
              h3: ({ node, ...props }) => (
                <h3 className="text-2xl font-semibold mt-8 mb-4 text-foreground flex items-center gap-2" {...props}>
                  <span className="text-cyan-500">{"#"}</span>
                  {props.children}
                </h3>
              ),
              h4: ({ node, ...props }) => (
                <h4 className="text-xl font-semibold mt-6 mb-3 text-foreground/90" {...props} />
              ),
              h5: ({ node, ...props }) => (
                <h5 className="text-lg font-semibold mt-4 mb-2 text-foreground/90" {...props} />
              ),
              h6: ({ node, ...props }) => (
                <h6 className="text-base font-semibold mt-4 mb-2 text-foreground/80 uppercase tracking-wide" {...props} />
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
                <blockquote className="my-6 pl-6 pr-4 py-4 border-l-4 border-cyan-500 italic text-muted-foreground bg-gradient-to-r from-cyan-50/50 to-blue-50/30 dark:from-cyan-950/20 dark:to-blue-950/10 rounded-r-lg shadow-sm" {...props}>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl text-cyan-500/40">❝</span>
                    <div className="flex-1">{props.children}</div>
                  </div>
                </blockquote>
              ),
              code: ({ node, inline, className, children, ...props }: any) => {
                const match = /language-(\w+)/.exec(className || '');
                return !inline ? (
                  <div className="relative my-6 rounded-xl overflow-hidden border-2 border-border/50 shadow-lg">
                    {match && (
                      <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 border-b border-slate-700">
                        <div className="flex items-center gap-2">
                          <div className="flex space-x-1.5">
                            <div className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 transition-colors cursor-pointer"></div>
                            <div className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 transition-colors cursor-pointer"></div>
                            <div className="w-3 h-3 bg-emerald-500 rounded-full hover:bg-emerald-400 transition-colors cursor-pointer"></div>
                          </div>
                          <span className="text-xs font-mono text-slate-400 ml-2">{match[1]}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-slate-500 uppercase">code</span>
                        </div>
                      </div>
                    )}
                    <pre className="!bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 !m-0 p-6 overflow-x-auto">
                      <code className={cn('!bg-transparent font-mono text-sm leading-relaxed', className)} {...props}>
                        {children}
                      </code>
                    </pre>
                  </div>
                ) : (
                  <code className="px-2 py-1 rounded-md bg-cyan-100 dark:bg-cyan-950/30 font-mono text-sm text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800/50" {...props}>
                    {children}
                  </code>
                );
              },
              pre: ({ node, children, ...props }) => (
                <>{children}</>
              ),
              table: ({ node, ...props }) => (
                <div className="my-8 overflow-x-auto rounded-xl border-2 border-border/50 shadow-lg">
                  <table className="w-full border-collapse" {...props} />
                </div>
              ),
              thead: ({ node, ...props }) => (
                <thead className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 backdrop-blur-sm" {...props} />
              ),
              tbody: ({ node, ...props }) => (
                <tbody className="bg-background/50" {...props} />
              ),
              tr: ({ node, ...props }) => (
                <tr className="border-b border-border/30 hover:bg-accent/50 transition-all duration-200" {...props} />
              ),
              th: ({ node, ...props }) => (
                <th className="px-6 py-4 text-left font-mono font-bold text-sm text-foreground border-r border-border/30 last:border-r-0 uppercase tracking-wider" {...props} />
              ),
              td: ({ node, ...props }) => (
                <td className="px-6 py-4 text-foreground/90 border-r border-border/20 last:border-r-0" {...props} />
              ),
              hr: ({ node, ...props }) => (
                <hr className="my-8 border-border/50" {...props} />
              ),
              img: ({ node, alt, ...props }) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="my-6 rounded-lg border border-border/50 max-w-full h-auto" alt={alt || ''} {...props} />
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
