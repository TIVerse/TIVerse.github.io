"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Github, Star, GitFork, Users, Code2, Server, MonitorDot, BarChart3 } from "lucide-react";
import { useEffect, useState } from "react";
import { ProjectCard } from "@/components/project-card";
import { StatCard } from "@/components/ui/stat-card";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { getOrgStats, getFeaturedRepos, type GitHubRepo, type GitHubOrgStats } from "@/lib/github";

export default function Home() {
  const [stats, setStats] = useState<GitHubOrgStats>({ totalStars: 0, totalForks: 0, totalRepos: 0, totalContributors: 0 });
  const [featuredRepos, setFeaturedRepos] = useState<GitHubRepo[]>([]);

  useEffect(() => {
    async function loadData() {
      const [statsData, reposData] = await Promise.all([
        getOrgStats(),
        getFeaturedRepos(),
      ]);
      setStats(statsData);
      setFeaturedRepos(reposData);
    }
    loadData();
  }, []);

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 animated-gradient opacity-50" />
        <div className="absolute inset-0 aurora pointer-events-none" aria-hidden="true" />
        <div className="absolute inset-0 bg-[#0F172A]/70" />
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden" suppressHydrationWarning>
          {[...Array(20)].map((_, i) => {
            // Use index-based positions for consistent SSR/client rendering
            const seedX = (i * 97 + 13) % 100;
            const seedY = (i * 73 + 29) % 100;
            const duration = 15 + (i % 10);
            
            return (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-[#38BDF8] rounded-full"
                initial={{
                  left: `${seedX}%`,
                  top: `${seedY}%`,
                }}
                animate={{
                  left: [`${seedX}%`, `${(seedX + 50) % 100}%`],
                  top: [`${seedY}%`, `${(seedY + 50) % 100}%`],
                }}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "linear",
                }}
                style={{ willChange: "left, top" }}
              />
            );
          })}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h1 className="text-6xl md:text-8xl font-bold mb-4">
                <span className="gradient-text">TIVerse</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              Engineering the Future of Open Infrastructure
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg text-gray-400 mb-12"
            >
              An open-source ecosystem by Tonmoy Infrastructure & Vision • Led by Eshan Roy
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button href="/projects" variant="primary" icon={Code2}>
                Explore Projects
              </Button>
              <Button href="https://github.com/tiverse" variant="outline" icon={Github}>
                View on GitHub
              </Button>
              <Button href="/contribute" variant="secondary" icon={ArrowRight}>
                Start Contributing
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-[#38BDF8] rounded-full flex justify-center"
          >
            <motion.div className="w-1 h-3 bg-[#38BDF8] rounded-full mt-2" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard icon={Star} label="Total Stars" value={stats.totalStars} index={0} />
            <StatCard icon={GitFork} label="Total Forks" value={stats.totalForks} index={1} />
            <StatCard icon={Code2} label="Public Repos" value={stats.totalRepos} index={2} />
            <StatCard icon={Users} label="Contributors" value="50+" index={3} />
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-gradient-to-b from-[#0F172A] to-[#1e293b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Featured Projects"
            subtitle="Explore our innovative open-source tools and infrastructure"
            centered
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRepos.length > 0 ? (
              featuredRepos.map((repo, index) => (
                <ProjectCard key={repo.id} repo={repo} index={index} />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-400 py-12">
                <p>Loading featured projects...</p>
              </div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <Link
              href="/projects"
              className="inline-flex items-center text-[#38BDF8] hover:text-[#38BDF8]/80 transition-colors group"
            >
              View All Projects
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Ecosystem Diagram Section */}
      <section className="py-20 bg-[#1e293b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Ecosystem"
            subtitle="Building a comprehensive suite of tools for modern infrastructure"
            centered
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-12 relative"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Infrastructure", desc: "Cloud-native tools and platforms", Icon: Server },
                { title: "Development", desc: "Developer tools and frameworks", Icon: MonitorDot },
                { title: "Analytics", desc: "Monitoring and insights", Icon: BarChart3 },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="p-8 rounded-xl card glass text-center hover:scale-105 transition-transform shine-on-hover glow-hover"
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-[#38BDF8]/10 flex items-center justify-center">
                      <item.Icon className="w-8 h-8 text-[#38BDF8]" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-[#1e293b] to-[#0F172A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Join the TIVerse Community
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Contribute to open-source, build innovative tools, and shape the future of infrastructure
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/community" variant="primary" icon={Users}>
                Join Community
              </Button>
              <Button href="/contribute" variant="secondary" icon={Github}>
                Start Contributing
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
