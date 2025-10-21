"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { getOrgRepos, getLanguages, type GitHubRepo } from "@/lib/github";
import { constructMetadata } from "@/lib/seo";

export default function ProjectsPage() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<GitHubRepo[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const [reposData, languagesData] = await Promise.all([
        getOrgRepos(),
        getLanguages(),
      ]);
      setRepos(reposData);
      setFilteredRepos(reposData);
      setLanguages(languagesData);
      setLoading(false);
    }
    loadData();
  }, []);

  useEffect(() => {
    let filtered = repos;

    // Filter by language
    if (selectedLanguage !== "all") {
      filtered = filtered.filter(repo => repo.language === selectedLanguage);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(repo =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        repo.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredRepos(filtered);
  }, [selectedLanguage, searchQuery, repos]);

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
            title="Our Projects"
            subtitle="Explore all open-source projects from the TIVerse ecosystem"
            centered
          />
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8 space-y-4"
        >
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#38BDF8] transition-colors"
            />
          </div>

          {/* Language Filter */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            <Filter className="text-gray-400 w-5 h-5 flex-shrink-0" />
            <button
              onClick={() => setSelectedLanguage("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                selectedLanguage === "all"
                  ? "bg-[#38BDF8] text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              All
            </button>
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  selectedLanguage === lang
                    ? "bg-[#38BDF8] text-white"
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-[#38BDF8] border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 text-gray-400">Loading projects...</p>
          </div>
        ) : filteredRepos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRepos.map((repo, index) => (
              <ProjectCard key={repo.id} repo={repo} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-400 text-lg">No projects found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedLanguage("all");
              }}
              className="mt-4 text-[#38BDF8] hover:underline"
            >
              Clear filters
            </button>
          </motion.div>
        )}

        {/* Stats Summary */}
        {!loading && filteredRepos.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center text-gray-400"
          >
            <p>
              Showing {filteredRepos.length} of {repos.length} projects
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
