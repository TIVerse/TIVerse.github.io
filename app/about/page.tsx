"use client";

import { motion } from 'framer-motion';
import { Target, Eye, Users, Heart, Code, Lightbulb, Terminal, Brackets, ChevronRight, GitBranch, Cpu, Database } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const values = [
  {
    icon: Code,
    title: 'open_source_first',
    description: 'We believe in the power of open source to drive innovation and create lasting value for the global developer community.',
    syntax: 'const philosophy = "open_source";',
  },
  {
    icon: Users,
    title: 'community_driven',
    description: 'Our projects are shaped by the needs and feedback of developers worldwide, fostering collaboration and shared growth.',
    syntax: 'let community = developers.unite();',
  },
  {
    icon: Lightbulb,
    title: 'innovation_focus',
    description: 'We push the boundaries of what\'s possible, creating tools that solve real problems and enable new possibilities.',
    syntax: 'while (problems.exist()) { innovate(); }',
  },
  {
    icon: Heart,
    title: 'developer_experience',
    description: 'Every tool we build prioritizes the developer experience, making complex tasks simple and enjoyable.',
    syntax: 'return experience.optimize();',
  },
];

const milestones = [
  {
    year: '2020',
    title: 'git init',
    description: 'TIVerse was founded with a vision to democratize access to high-quality infrastructure tools.',
    command: 'mkdir tiverse && cd tiverse',
    status: 'committed',
  },
  {
    year: '2021',
    title: 'first_release',
    description: 'Launched our first open-source project, gaining 1000+ stars within the first month.',
    command: 'git tag v1.0.0 && git push origin main',
    status: 'deployed',
  },
  {
    year: '2022',
    title: 'scale_up',
    description: 'Reached 50+ contributors and 10,000+ monthly active users across all projects.',
    command: 'npm run scale --production',
    status: 'running',
  },
  {
    year: '2023',
    title: 'enterprise_adoption',
    description: 'Major companies began adopting TIVerse tools in their production environments.',
    command: 'docker deploy --env=production',
    status: 'stable',
  },
  {
    year: '2024',
    title: 'global_impact',
    description: 'Achieved 1M+ monthly downloads and established partnerships with leading tech companies.',
    command: 'kubectl scale --replicas=global',
    status: 'active',
  },
];

const stats = [
  { label: 'repositories', value: '50+', icon: GitBranch, color: 'text-blue-400' },
  { label: 'github_stars', value: '10K+', icon: Code, color: 'text-cyan-400' },
  { label: 'contributors', value: '100+', icon: Users, color: 'text-emerald-400' },
  { label: 'downloads', value: '1M+', icon: Database, color: 'text-purple-400' },
];

export default function About() {
  return (
    <div className="pt-16">
      {/* Hero Section with Terminal Aesthetic */}
      <section className="relative overflow-hidden">
        {/* Grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-background to-blue-50/30 dark:from-slate-950 dark:via-background dark:to-slate-900"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_50%)]"></div>

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
              <span className="text-xs font-mono text-muted-foreground">about.component.tsx</span>
            </div>

            {/* Code-style title */}
            <div className="mb-6 space-y-2">
              <div className="text-left max-w-fit mx-auto">
                <span className="text-sm font-mono text-muted-foreground/70">1 </span>
                <span className="text-sm font-mono text-cyan-500">class</span>
                <span className="text-sm font-mono text-foreground"> TIVerse </span>
                <span className="text-sm font-mono text-yellow-500">extends</span>
                <span className="text-sm font-mono text-foreground"> Innovation </span>
                <span className="text-sm font-mono text-muted-foreground">{"{"}</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground tracking-tight leading-[1.1]">
                About{" "}
                <span className="relative inline-block">
                  <span className="font-mono bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
                    TIVerse
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 rounded-full"></span>
                </span>
              </h1>

              <div className="text-left max-w-fit mx-auto">
                <span className="text-sm font-mono text-muted-foreground">{"}"}</span>
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
                  We're on a mission to build the infrastructure that powers the next generation of applications.
                  Through open source, we're creating tools that are accessible, reliable, and built for scale.
                </p>
                <span className="text-emerald-500 font-mono">{"*/"}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision with Code Structure */}
      <section className="py-24 relative overflow-hidden">
        {/* Code grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"></div>

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-background/50 backdrop-blur-sm border-border/50 group">
                <CardHeader>
                  {/* Terminal window header */}
                  <div className="flex items-center justify-between mb-3 pb-3 border-b border-border/30">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                      </div>
                      <span className="text-xs font-mono text-muted-foreground/70">mission.ts</span>
                    </div>
                    <Target className="h-4 w-4 text-muted-foreground group-hover:text-blue-600 transition-colors" />
                  </div>

                  <div className="mb-4">
                    <div className="text-xs font-mono text-muted-foreground/70 mb-2">
                      <span className="text-cyan-500">const</span> mission = {"{"}
                    </div>
                    <CardTitle className="text-2xl font-mono ml-4">our_mission</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed ml-4 mb-4">
                    To democratize access to world-class infrastructure tools by building open-source solutions 
                    that are performant, reliable, and accessible to developers everywhere. We believe that great 
                    tools shouldn't be a privilege—they should be a foundation for innovation.
                  </CardDescription>
                  <div className="text-xs font-mono text-muted-foreground/70">
                    {"};"}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-background/50 backdrop-blur-sm border-border/50 group">
                <CardHeader>
                  {/* Terminal window header */}
                  <div className="flex items-center justify-between mb-3 pb-3 border-b border-border/30">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                      </div>
                      <span className="text-xs font-mono text-muted-foreground/70">vision.ts</span>
                    </div>
                    <Eye className="h-4 w-4 text-muted-foreground group-hover:text-purple-600 transition-colors" />
                  </div>

                  <div className="mb-4">
                    <div className="text-xs font-mono text-muted-foreground/70 mb-2">
                      <span className="text-purple-500">async function</span> vision() {"{"}
                    </div>
                    <CardTitle className="text-2xl font-mono ml-4">our_vision</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed ml-4 mb-4">
                    A world where every developer has access to enterprise-grade infrastructure tools, 
                    enabling them to focus on what matters most—building amazing products. We envision 
                    an ecosystem where open source drives innovation and collaboration across the globe.
                  </CardDescription>
                  <div className="text-xs font-mono text-muted-foreground/70">
                    {"}"};
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values with Code Interface */}
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
                <span className="text-blue-500">CoreValues</span>
                <span className="text-muted-foreground">{"{"}</span>
              </div>
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              <span className="font-mono text-emerald-500">{"// "}</span>
              The principles that guide everything we do and shape our approach to building tools for the developer community.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-background/50 backdrop-blur-sm border-border/50 group hover:shadow-xl transition-all">
                  <CardHeader>
                    {/* Code bracket decoration */}
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-xs font-mono text-muted-foreground/50">{"{"}</span>
                      <span className="text-xs font-mono text-blue-500">0{index + 1}</span>
                    </div>

                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:border-blue-500/40 transition-colors">
                      <value.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    
                    <CardTitle className="font-mono text-lg">{value.title}</CardTitle>
                    
                    {/* Code syntax */}
                    <div className="text-xs font-mono text-emerald-500 bg-slate-900/20 dark:bg-slate-950/40 px-2 py-1 rounded border">
                      {value.syntax}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed">
                      {value.description}
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

      {/* Timeline with Terminal Theme */}
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
              <span className="text-xs font-mono text-cyan-500">git</span>
              <span className="text-xs font-mono text-blue-500">log</span>
              <span className="text-xs font-mono text-muted-foreground">--oneline</span>
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Our Journey
            </h2>
            <div className="text-xl text-muted-foreground max-w-2xl mx-auto">
              <span className="font-mono text-emerald-500">{"/* "}</span>
              From humble beginnings to a global community of developers building the future together.
              <span className="font-mono text-emerald-500">{" */"}</span>
            </div>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-cyan-400 to-emerald-500 transform md:-translate-x-px"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full transform -translate-x-2 md:-translate-x-2 border-2 border-background shadow-lg"></div>
                  
                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <Card className="bg-background/50 backdrop-blur-sm border-border/50 group">
                      <CardHeader>
                        {/* Terminal window header */}
                        <div className="flex items-center justify-between mb-3 pb-3 border-b border-border/30">
                          <div className="flex items-center space-x-2">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                              <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                            </div>
                            <span className="text-xs font-mono text-muted-foreground/70">{milestone.year}.log</span>
                          </div>
                          <Badge className={`text-xs font-mono ${
                            milestone.status === 'active' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200' :
                            milestone.status === 'stable' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                            milestone.status === 'running' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                            'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                          }`}>
                            {milestone.status}
                          </Badge>
                        </div>

                        <div className="flex items-center space-x-2 mb-2">
                          <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 text-sm font-semibold font-mono rounded-full">
                            {milestone.year}
                          </span>
                        </div>
                        <CardTitle className="font-mono">{milestone.title}</CardTitle>
                        
                        {/* Command line */}
                        <div className="mt-3 p-2 bg-slate-900/20 dark:bg-slate-950/40 rounded border font-mono text-xs">
                          <span className="text-emerald-400">$ </span>
                          <span className="text-cyan-400">{milestone.command}</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base">
                          {milestone.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats with Terminal Dashboard */}
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
            className="text-center mb-12"
          >
            {/* Terminal header */}
            <div className="inline-flex items-center space-x-3 mb-6 px-4 py-2 bg-slate-950/50 backdrop-blur-sm border border-slate-700/50 rounded-lg">
              <div className="flex space-x-1.5">
                <div className="w-2.5 h-2.5 bg-red-400 rounded-full"></div>
                <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full"></div>
                <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse"></div>
              </div>
              <span className="text-xs font-mono text-slate-400">dashboard.metrics.ts</span>
            </div>

            <div className="mb-8 space-y-4">
              <div className="flex items-start justify-center space-x-3 text-left">
                <span className="text-sm font-mono text-emerald-400">{"// "}</span>
                <div>
                  <div className="text-sm font-mono text-cyan-400 mb-2">
                    <span className="text-blue-400">const</span> impact = await getMetrics();
                  </div>
                </div>
              </div>

              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Impact by the Numbers
              </h2>

              <div className="flex items-center justify-center space-x-2 text-sm font-mono">
                <span className="text-emerald-400">{"/*"}</span>
                <p className="text-lg lg:text-xl text-white/90 max-w-2xl leading-relaxed">
                  Our community continues to grow, and together we're making a real difference in the developer ecosystem.
                </p>
                <span className="text-emerald-400">{"*/"}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg blur-xl group-hover:blur-2xl transition-all"></div>
                  <div className="relative bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-sm border border-blue-500/30 rounded-lg p-6 hover:border-blue-500/60 transition-all">
                    <div className="text-xs font-mono text-blue-400 mb-2 flex items-center space-x-2">
                      <stat.icon className="h-3 w-3" />
                      <span>{">"} {stat.label}</span>
                    </div>
                    <div className={`text-3xl lg:text-4xl font-bold font-mono ${stat.color} mb-1`}>
                      {stat.value}
                    </div>
                    <div className="text-xs font-mono text-muted-foreground/70">// and counting</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Terminal prompt at bottom */}
            <div className="mt-12 inline-flex items-center space-x-2 px-4 py-2 bg-slate-950/50 backdrop-blur-sm border border-slate-700/50 rounded-lg">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-xs font-mono text-emerald-400">tiverse@about:~$</span>
              <span className="text-xs font-mono text-slate-400 animate-pulse">_</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}