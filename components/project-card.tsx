"use client";

import { motion } from "framer-motion";
import { Star, GitFork, ExternalLink } from "lucide-react";
import type { GitHubRepo } from "@/lib/github";

interface ProjectCardProps {
  repo: GitHubRepo;
  index: number;
}

export function ProjectCard({ repo, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group relative"
    >
      <div className="h-full p-6 rounded-xl card glass transition-all duration-300 shine-on-hover glow-hover">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#38BDF8] transition-colors">
              {repo.name}
            </h3>
            {repo.description && (
              <p className="text-gray-400 text-sm line-clamp-2">
                {repo.description}
              </p>
            )}
          </div>
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 p-2 rounded-lg bg-white/5 hover:bg-[#38BDF8]/20 transition-colors"
          >
            <ExternalLink className="w-5 h-5 text-[#38BDF8]" />
          </a>
        </div>

        {/* Topics/Tags */}
        {repo.topics && repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {repo.topics.slice(0, 3).map((topic) => (
              <span
                key={topic}
                className="px-2 py-1 text-xs rounded-full bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/20"
              >
                {topic}
              </span>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center space-x-4 text-sm text-gray-400">
          {repo.language && (
            <div className="flex items-center space-x-1">
              <span
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: getLanguageColor(repo.language),
                }}
              />
              <span>{repo.language}</span>
            </div>
          )}
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4" />
            <span>{repo.stargazers_count}</span>
          </div>
          <div className="flex items-center space-x-1">
            <GitFork className="w-4 h-4" />
            <span>{repo.forks_count}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Language color mapping
function getLanguageColor(language: string): string {
  const colors: Record<string, string> = {
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    Python: "#3572A5",
    Rust: "#dea584",
    Go: "#00ADD8",
    Java: "#b07219",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Shell: "#89e051",
    Ruby: "#701516",
  };

  return colors[language] || "#8b949e";
}
