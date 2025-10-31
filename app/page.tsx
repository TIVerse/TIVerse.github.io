"use client";

import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { ArrowRight, Github, Star, GitFork, Users, Code as Code2, Zap, Shield, Terminal, Box, Circle, Triangle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { fetchTIVerseRepos, type ProcessedProject } from '@/lib/github';

const features = [
  {
    icon: Code2,
    title: 'Developer-First',
    description: 'Tools built by developers, for developers. Every solution is crafted with the developer experience in mind.',
  },
  {
    icon: Zap,
    title: 'High Performance',
    description: 'Optimized for speed and efficiency. Our tools are designed to handle real-world scale and complexity.',
  },
  {
    icon: Shield,
    title: 'Production Ready',
    description: 'Battle-tested in production environments. Reliable, secure, and maintainable solutions you can trust.',
  },
];

// Floating code snippets for background animation
const floatingCodeSnippets = [
  { code: 'const future = await build();', delay: 0, duration: 20, x: 5, y: 15 },
  { code: 'function innovate() { }', delay: 2, duration: 25, x: 75, y: 25 },
  { code: 'git commit -m "epic"', delay: 4, duration: 18, x: 20, y: 65 },
  { code: 'npm run awesome', delay: 1, duration: 22, x: 85, y: 45 },
  { code: 'cargo build --release', delay: 3, duration: 24, x: 10, y: 85 },
  { code: 'let magic = true;', delay: 5, duration: 19, x: 65, y: 75 },
  { code: 'async/await magic', delay: 6, duration: 21, x: 40, y: 35 },
  { code: 'import { innovation }', delay: 7, duration: 23, x: 90, y: 60 },
];

// Floating code snippet component
const FloatingCodeSnippet = ({ code, delay, duration, x, y }: { code: string; delay: number; duration: number; x: number; y: number }) => {
  return (
    <motion.div
      className="absolute text-sm font-mono text-cyan-600/40 dark:text-cyan-400/30 whitespace-nowrap pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
      }}
      initial={{ 
        opacity: 0,
        y: 0
      }}
      animate={{
        y: [0, -50, 0],
        opacity: [0, 0.8, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {code}
    </motion.div>
  );
};

// Animated geometric shapes
const AnimatedShape = ({ type, delay, x, y }: { type: 'circle' | 'square' | 'triangle'; delay: number; x: number; y: number }) => {
  const randomRotation = Math.random() * 360;
  
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
      }}
      initial={{ 
        rotate: randomRotation,
        opacity: 0,
        scale: 0
      }}
      animate={{
        rotate: [randomRotation, randomRotation + 360],
        opacity: [0, 0.4, 0],
        scale: [0, 1, 0],
      }}
      transition={{
        duration: 15,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {type === 'circle' && (
        <div className="w-20 h-20 rounded-full border-2 border-cyan-500/60 dark:border-cyan-400/40" />
      )}
      {type === 'square' && (
        <div className="w-20 h-20 border-2 border-orange-500/60 dark:border-orange-400/40" />
      )}
      {type === 'triangle' && (
        <div className="w-0 h-0 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-b-[70px] border-b-blue-500/60 dark:border-b-blue-400/40" />
      )}
    </motion.div>
  );
};

export default function Home() {
  const [projects, setProjects] = useState<ProcessedProject[]>([]);
  const [totalStats, setTotalStats] = useState({
    totalProjects: 0,
    totalStars: 0,
    totalForks: 0,
    totalContributors: 100, // Estimated
  });
  const [typedText, setTypedText] = useState('');
  const fullText = 'Open Source';
  
  // Typing animation effect
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 150);
    
    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await fetchTIVerseRepos();
        setProjects(data.slice(0, 3)); // Show top 3 projects
        
        // Calculate real stats
        const stats = data.reduce((acc, project) => ({
          totalProjects: acc.totalProjects + 1,
          totalStars: acc.totalStars + project.stars,
          totalForks: acc.totalForks + project.forks,
          totalContributors: acc.totalContributors,
        }), { totalProjects: 0, totalStars: 0, totalForks: 0, totalContributors: 100 });
        
        setTotalStats(stats);
      } catch (error) {
        console.error('Error loading projects:', error);
        // Keep default empty state
      }
    }

    loadProjects();
  }, []);

  return (
    <div className="pt-16">
      {/* Hero Section with Code Terminal Aesthetic */}
      <section className="relative overflow-hidden">
        {/* Grid pattern background */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        {/* Animated Gradient overlays */}
        <motion.div 
          className="absolute inset-0 z-[1] bg-gradient-to-br from-cyan-50 via-background to-orange-50/30 dark:from-cyan-950 dark:via-background dark:to-orange-950"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
        <motion.div 
          className="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.25),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.3),transparent_50%)]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div 
          className="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_70%_80%,rgba(251,146,60,0.2),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_80%,rgba(251,146,60,0.25),transparent_50%)]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0.9, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Floating code snippets */}
        <div className="absolute inset-0 z-[3]">
          {floatingCodeSnippets.map((snippet, index) => (
            <FloatingCodeSnippet key={index} {...snippet} />
          ))}
        </div>
        
        {/* Animated geometric shapes */}
        <div className="absolute inset-0 z-[3]">
          <AnimatedShape type="circle" delay={0} x={12} y={18} />
          <AnimatedShape type="square" delay={2} x={88} y={12} />
          <AnimatedShape type="triangle" delay={4} x={22} y={78} />
          <AnimatedShape type="circle" delay={6} x={78} y={68} />
          <AnimatedShape type="square" delay={8} x={45} y={42} />
          <AnimatedShape type="triangle" delay={10} x={60} y={28} />
          <AnimatedShape type="circle" delay={12} x={35} y={85} />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
          <div className="text-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Terminal-style status badge */}
              <div className="inline-flex items-center space-x-3 mb-6 px-4 py-2 bg-background/80 backdrop-blur-sm border border-border/50 rounded-lg shadow-lg">
                <div className="flex space-x-1.5">
                  <div className="w-2.5 h-2.5 bg-red-400 rounded-full"></div>
                  <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full"></div>
                  <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse"></div>
                </div>
                <span className="text-xs font-mono text-muted-foreground">status: building_in_public</span>
              </div>

              {/* Code-style title */}
              <div className="mb-6 space-y-2">
                <div className="text-left max-w-fit mx-auto">
                  <span className="text-sm font-mono text-muted-foreground/70">1 </span>
                  <span className="text-sm font-mono text-cyan-500">const</span>
                  <span className="text-sm font-mono text-foreground"> mission = </span>
                  <span className="text-sm font-mono text-blue-500">"</span>
                </div>

                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground tracking-tight leading-[1.1]">
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    Building the Future of{" "}
                  </motion.span>
                  <motion.span 
                    className="relative inline-block"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 100 }}
                  >
                    <span className="font-mono bg-gradient-to-r from-cyan-600 via-blue-500 to-orange-500 bg-clip-text text-transparent">
                      {typedText}
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
                        className="inline-block w-0.5 h-12 ml-1 bg-gradient-to-b from-cyan-600 to-orange-500 align-middle"
                      />
                    </span>
                    <motion.span 
                      className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-600 via-blue-500 to-orange-500 rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 1.8 }}
                      style={{ transformOrigin: 'left' }}
                    ></motion.span>
                  </motion.span>
                </h1>

                <div className="text-left max-w-fit mx-auto">
                  <span className="text-sm font-mono text-blue-500">"</span>
                  <span className="text-sm font-mono text-muted-foreground/70">;</span>
                </div>
              </div>
            </motion.div>

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
                  Empowering developers with open-source tools that are performant, reliable, and built for the real world.
                </p>
                <span className="text-emerald-500 font-mono">{"*/"}</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              {/* Terminal-style buttons with enhanced animations */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="font-mono bg-gradient-to-r from-cyan-600 to-orange-600 hover:from-cyan-700 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all group relative overflow-hidden" asChild>
                  <Link href="/projects">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                      animate={{
                        x: ['-100%', '200%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                    />
                    <span className="mr-2 relative z-10">$</span>
                    <span className="relative z-10">explore --projects</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform relative z-10" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" variant="outline" className="font-mono border-2 hover:bg-accent group" asChild>
                  <Link href="https://github.com/tiverse" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                    git clone github
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Terminal-style Stats with enhanced animations */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 max-w-4xl mx-auto">
              <motion.div 
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ y: -5 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-lg blur-xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                />
                <div className="relative bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-6 hover:border-cyan-500/60 transition-all">
                  <motion.div 
                    className="text-xs font-mono text-cyan-400 mb-2"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {">"}  projects.length
                  </motion.div>
                  <motion.div 
                    className="text-3xl lg:text-4xl font-bold font-mono text-orange-400 mb-1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.6 }}
                  >
                    {totalStats.totalProjects}+
                  </motion.div>
                  <div className="text-xs font-mono text-muted-foreground/70">// active repos</div>
                </div>
              </motion.div>

              <motion.div 
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-lg blur-xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: 0.5,
                  }}
                />
                <div className="relative bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-sm border border-orange-500/30 rounded-lg p-6 hover:border-orange-500/60 transition-all">
                  <motion.div 
                    className="text-xs font-mono text-orange-400 mb-2"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  >
                    {">"}  stars.count()
                  </motion.div>
                  <motion.div 
                    className="text-3xl lg:text-4xl font-bold font-mono text-amber-400 mb-1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.7 }}
                  >
                    {totalStats.totalStars.toLocaleString()}+
                  </motion.div>
                  <div className="text-xs font-mono text-muted-foreground/70">// github stars</div>
                </div>
              </motion.div>

              <motion.div 
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg blur-xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: 1,
                  }}
                />
                <div className="relative bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-sm border border-blue-500/30 rounded-lg p-6 hover:border-blue-500/60 transition-all">
                  <motion.div 
                    className="text-xs font-mono text-blue-400 mb-2"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                  >
                    {">"}  contributors.size
                  </motion.div>
                  <motion.div 
                    className="text-3xl lg:text-4xl font-bold font-mono text-cyan-400 mb-1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.8 }}
                  >
                    {totalStats.totalContributors}+
                  </motion.div>
                  <div className="text-xs font-mono text-muted-foreground/70">// developers</div>
                </div>
              </motion.div>

              <motion.div 
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                whileHover={{ y: -5 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-lg blur-xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: 1.5,
                  }}
                />
                <div className="relative bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-sm border border-orange-500/30 rounded-lg p-6 hover:border-orange-500/60 transition-all">
                  <motion.div 
                    className="text-xs font-mono text-orange-400 mb-2"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.9 }}
                  >
                    {">"}  forks.total
                  </motion.div>
                  <motion.div 
                    className="text-3xl lg:text-4xl font-bold font-mono text-amber-400 mb-1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.9 }}
                  >
                    {totalStats.totalForks}+
                  </motion.div>
                  <div className="text-xs font-mono text-muted-foreground/70">// contributions</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Code Structure */}
      <section className="py-24 bg-muted/30 relative overflow-hidden">
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
                <span className="text-cyan-500">interface</span>
                <span className="text-blue-500">Features</span>
                <span className="text-muted-foreground">{"{"}</span>
              </div>
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Choose TIVerse?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              <span className="font-mono text-emerald-500">{"// "}</span>
              We believe in building tools that empower developers to create amazing things.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all border-border/50 bg-background/50 backdrop-blur-sm group">
                  <CardHeader>
                    {/* Code bracket decoration */}
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-xs font-mono text-muted-foreground/50">{"{"}</span>
                      <span className="text-xs font-mono text-blue-500">0{index + 1}</span>
                    </div>

                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/10 to-orange-500/10 border border-cyan-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:border-cyan-500/40 transition-colors">
                      <feature.icon className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <CardTitle className="font-mono">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                    <div className="mt-4">
                      <span className="text-xs font-mono text-muted-foreground/50">{"}"}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Closing bracket for interface */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <span className="text-sm font-mono text-muted-foreground/70">{"}"}</span>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects with Terminal Theme */}
      <section className="py-24 relative overflow-hidden">
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
              <span className="text-xs font-mono text-cyan-500">class</span>
              <span className="text-xs font-mono text-blue-500">FeaturedProjects</span>
              <span className="text-xs font-mono text-muted-foreground">{"{ }"}</span>
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Featured Projects
            </h2>
            <div className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              <span className="font-mono text-emerald-500">{"/* "}</span>
              Discover our most popular open-source projects that are making a difference in the developer community. Live data from GitHub.
              <span className="font-mono text-emerald-500">{" */"}</span>
            </div>
            <Button variant="outline" className="font-mono" asChild>
              <Link href="/projects">
                <span className="mr-2">$</span>
                view --all-projects
              </Link>
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.length > 0 ? projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={project.url} target="_blank" rel="noopener noreferrer">
                  <Card className="h-full hover:shadow-xl transition-all border-border/50 bg-background/50 backdrop-blur-sm group cursor-pointer">
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
                        <Github className="h-4 w-4 text-muted-foreground group-hover:text-cyan-600 transition-colors" />
                      </div>

                      <CardTitle className="font-mono text-lg group-hover:text-cyan-600 transition-colors">
                        {project.name}
                      </CardTitle>
                      <CardDescription className="text-sm">{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-4 text-xs font-mono text-muted-foreground">
                        <div className="flex items-center space-x-1.5">
                          <div className={`w-2.5 h-2.5 rounded-full ${project.languageColor}`}></div>
                          <span>{project.language}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3.5 w-3.5" />
                          <span>{project.stars.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <GitFork className="h-3.5 w-3.5" />
                          <span>{project.forks}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            )) : (
              [...Array(3)].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full border-border/50 bg-background/50 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-3 pb-3 border-b border-border/30">
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-muted rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-muted rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-muted rounded-full animate-pulse"></div>
                          </div>
                          <div className="h-3 bg-muted rounded w-20 animate-pulse"></div>
                        </div>
                        <Github className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="h-5 bg-muted rounded w-32 animate-pulse mb-2"></div>
                      <div className="h-4 bg-muted rounded w-full animate-pulse"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-4 text-xs font-mono text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <div className="w-2.5 h-2.5 rounded-full bg-muted animate-pulse"></div>
                          <div className="h-3 bg-muted rounded w-12 animate-pulse"></div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3.5 w-3.5" />
                          <div className="h-3 bg-muted rounded w-6 animate-pulse"></div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <GitFork className="h-3.5 w-3.5" />
                          <div className="h-3 bg-muted rounded w-4 animate-pulse"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section with Code Block Theme */}
      <section className="relative py-24 overflow-hidden">
        {/* Terminal-style gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 via-blue-500/20 to-orange-500/20"></div>

        {/* Code line numbers effect */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-slate-950/50 border-r border-slate-700/50 hidden lg:block">
          <div className="flex flex-col items-end pr-4 pt-24 space-y-6 text-xs font-mono text-slate-600">
            {[...Array(12)].map((_, i) => (
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
                    <span className="text-blue-400">function</span> buildAmazing() {"{"}
                  </div>
                </div>
              </div>

              <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4 px-8">
                Ready to Build Something Amazing?
              </h2>

              <div className="flex items-center justify-center space-x-2 text-sm font-mono">
                <span className="text-emerald-400">{"/*"}</span>
                <p className="text-lg lg:text-xl text-white/90 max-w-2xl leading-relaxed">
                  Join thousands of developers who are already using TIVerse tools to build the next generation of applications.
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
              <Button size="lg" className="font-mono bg-gradient-to-r from-cyan-600 to-orange-600 hover:from-cyan-700 hover:to-orange-700 text-white shadow-xl group" asChild>
                <Link href="/projects">
                  <span className="mr-2">$</span>
                  npm start
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="font-mono border-2 border-slate-400 text-white hover:bg-white hover:text-slate-900" asChild>
                <Link href="/about">
                  <span className="mr-2">{">"}</span>
                  learn.more()
                </Link>
              </Button>
            </div>

            {/* Terminal prompt at bottom */}
            <div className="mt-12 inline-flex items-center space-x-2 px-4 py-2 bg-slate-950/50 backdrop-blur-sm border border-slate-700/50 rounded-lg">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-xs font-mono text-emerald-400">tiverse@developer:~$</span>
              <span className="text-xs font-mono text-slate-400 animate-pulse">_</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}