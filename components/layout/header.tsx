"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Twitter, Terminal, Code as Code2, Brackets, ChevronRight, Trophy, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Home', href: '/', icon: Terminal },
  { name: 'About', href: '/about', icon: Code2 },
  { name: 'Projects', href: '/projects', icon: Brackets },
  { name: 'R&D', href: '/research', icon: BookOpen },
  { name: 'Hall of Fame', href: '/hall-of-fame', icon: Trophy },
  { name: 'Blog', href: '/blog', icon: Terminal },
  { name: 'Contact', href: '/contact', icon: ChevronRight },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-500',
        scrolled
          ? 'bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-black/5'
          : 'bg-transparent'
      )}
    >
      {/* Code-style top border */}
      <div className="h-1 bg-gradient-to-r from-cyan-500 via-blue-400 to-orange-500"></div>
      
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with terminal aesthetic */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center group"
          >
            <Link href="/">
              <Logo size={40} showText={true} />
            </Link>
          </motion.div>

          {/* Desktop Navigation with code-style indicators */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-1">
              {navigation.map((item, index) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        'group relative flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium font-mono transition-all duration-300',
                        isActive
                          ? 'text-cyan-600 bg-cyan-50/80 dark:text-cyan-400 dark:bg-cyan-950/50 shadow-sm'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      )}
                    >
                      {/* Code bracket indicator */}
                      <span className={cn(
                        'text-xs transition-colors duration-300',
                        isActive ? 'text-cyan-500' : 'text-muted-foreground/50 group-hover:text-muted-foreground'
                      )}>
                        {'{'}
                      </span>
                      
                      <Icon className={cn(
                        'h-4 w-4 transition-colors duration-300',
                        isActive ? 'text-cyan-500' : 'text-muted-foreground/70 group-hover:text-foreground'
                      )} />
                      
                      <span className="relative">
                        {item.name}
                        {/* Active indicator line */}
                        {isActive && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-orange-400 rounded-full"
                            initial={false}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        )}
                      </span>
                      
                      <span className={cn(
                        'text-xs transition-colors duration-300',
                        isActive ? 'text-cyan-500' : 'text-muted-foreground/50 group-hover:text-muted-foreground'
                      )}>
                        {'}'}
                      </span>
                      
                      {/* Hover effect */}
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right side with terminal-style elements */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Status indicator */}
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-muted/50 rounded-lg border border-border/50">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-xs font-mono text-muted-foreground">online</span>
            </div>
            
            {/* Social links with hover effects */}
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 hover:bg-cyan-50 hover:text-cyan-600 dark:hover:bg-cyan-950 transition-colors"
                asChild
              >
                <Link
                  href="https://github.com/tiverse"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-orange-950 transition-colors"
                asChild
              >
                <Link
                  href="https://twitter.com/tiverse"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            {/* Separator */}
            <div className="w-px h-6 bg-border/50"></div>
            
            {/* Theme toggle with enhanced styling */}
            <ThemeToggle />
          </div>

          {/* Mobile menu button with terminal styling */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="h-9 w-9 border border-border/50 hover:bg-muted/50"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-4 w-4" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-4 w-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation with terminal aesthetic */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-xl border border-border/50 rounded-lg mt-2 shadow-xl">
                {/* Terminal header */}
                <div className="flex items-center justify-between px-3 py-2 border-b border-border/50 mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">navigation.menu</span>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">~/</span>
                </div>
                
                {navigation.map((item, index) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          'flex items-center space-x-3 px-3 py-2.5 rounded-md text-base font-medium font-mono transition-all duration-300',
                          isActive
                            ? 'text-cyan-600 bg-cyan-50/80 dark:text-cyan-400 dark:bg-cyan-950/50'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        <span className={cn(
                          'text-sm',
                          isActive ? 'text-cyan-500' : 'text-muted-foreground/50'
                        )}>
                          $
                        </span>
                        <Icon className="h-4 w-4" />
                        <span>{item.name.toLowerCase()}</span>
                        {isActive && (
                          <div className="ml-auto w-2 h-2 bg-cyan-500 rounded-full"></div>
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
                
                {/* Mobile social links */}
                <div className="flex items-center justify-center space-x-4 px-3 py-3 border-t border-border/50 mt-2">
                  <Link
                    href="https://github.com/tiverse"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    <span>github</span>
                  </Link>
                  <div className="w-px h-4 bg-border/50"></div>
                  <Link
                    href="https://twitter.com/tiverse"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Twitter className="h-4 w-4" />
                    <span>twitter</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}