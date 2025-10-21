"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, MessageCircle, Github, Award } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContributorCard } from "@/components/ui/contributor-card";
import { Button } from "@/components/ui/button";
import { getAllContributors, type GitHubContributor } from "@/lib/github";

export default function CommunityPage() {
  const [contributors, setContributors] = useState<GitHubContributor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadContributors() {
      setLoading(true);
      const data = await getAllContributors();
      setContributors(data);
      setLoading(false);
    }
    loadContributors();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F172A] via-[#1e293b] to-[#0F172A] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <SectionHeading
            title="Community"
            subtitle="Meet the amazing people building the TIVerse ecosystem"
            centered
          />
        </motion.div>

        {/* Community Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          <div className="p-6 rounded-xl glass text-center">
            <Users className="w-12 h-12 text-[#38BDF8] mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-white mb-2">{contributors.length}+</h3>
            <p className="text-gray-400">Contributors</p>
          </div>
          <div className="p-6 rounded-xl glass text-center">
            <Github className="w-12 h-12 text-[#38BDF8] mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-white mb-2">Open Source</h3>
            <p className="text-gray-400">100% Transparent</p>
          </div>
          <div className="p-6 rounded-xl glass text-center">
            <MessageCircle className="w-12 h-12 text-[#38BDF8] mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-white mb-2">Active</h3>
            <p className="text-gray-400">Growing Community</p>
          </div>
        </motion.div>

        {/* Join Community Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 p-8 rounded-xl glass-strong text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Community</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Connect with developers, share ideas, and collaborate on exciting open-source projects
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="https://github.com/orgs/tiverse/discussions" variant="primary" icon={MessageCircle}>
              GitHub Discussions
            </Button>
            <Button href="https://github.com/tiverse" variant="secondary" icon={Github}>
              Follow on GitHub
            </Button>
          </div>
        </motion.div>

        {/* Hall of Fame - Top Contributors */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center mb-4">
              <Award className="w-8 h-8 text-[#FFD700] mr-2" />
              <h2 className="text-3xl font-bold text-white">Hall of Fame</h2>
            </div>
            <p className="text-gray-400">Top contributors to the TIVerse ecosystem</p>
          </motion.div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-12 h-12 border-4 border-[#38BDF8] border-t-transparent rounded-full animate-spin" />
              <p className="mt-4 text-gray-400">Loading contributors...</p>
            </div>
          ) : contributors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {contributors.slice(0, 12).map((contributor, index) => (
                <ContributorCard key={contributor.id} contributor={contributor} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400">Be the first to contribute!</p>
            </div>
          )}
        </div>

        {/* All Contributors */}
        {contributors.length > 12 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 text-center">All Contributors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {contributors.slice(12).map((contributor, index) => (
                <ContributorCard key={contributor.id} contributor={contributor} index={index + 12} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Become a Contributor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-16 p-8 rounded-xl glass text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Become a Contributor</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Your name could be here! Start contributing to TIVerse projects and join our
            amazing community of developers.
          </p>
          <Button href="/contribute" variant="primary">
            Start Contributing
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
