"use client";

import { motion } from 'framer-motion';
import { Hop as Home, ArrowLeft, Search } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50 dark:from-indigo-950/50 dark:via-background dark:to-purple-950/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* 404 Number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-9xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              404
            </h1>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Page Not Found
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
            </p>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button size="lg" asChild>
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>
            <Button size="lg" variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/projects">
                <Search className="mr-2 h-4 w-4" />
                Browse Projects
              </Link>
            </Button>
          </motion.div>

          {/* Helpful Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="border-t border-border/50 pt-8"
          >
            <p className="text-sm text-muted-foreground mb-4">
              You might be looking for:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Link 
                href="/projects" 
                className="text-sm text-indigo-600 hover:text-indigo-700 hover:underline"
              >
                Open Source Projects
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link 
                href="/about" 
                className="text-sm text-indigo-600 hover:text-indigo-700 hover:underline"
              >
                About TIVerse
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link 
                href="/blog" 
                className="text-sm text-indigo-600 hover:text-indigo-700 hover:underline"
              >
                Blog & Insights
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link 
                href="/contact" 
                className="text-sm text-indigo-600 hover:text-indigo-700 hover:underline"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}