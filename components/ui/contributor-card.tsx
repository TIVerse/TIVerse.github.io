"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { GitHubContributor } from "@/lib/github";

interface ContributorCardProps {
  contributor: GitHubContributor;
  index: number;
}

export function ContributorCard({ contributor, index }: ContributorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ scale: 1.05 }}
      className="group"
    >
      <a
        href={contributor.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="block p-4 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-[#38BDF8]/50 transition-all"
      >
        <div className="flex items-center space-x-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#38BDF8]/20 group-hover:ring-[#38BDF8] transition-all">
            <Image
              src={contributor.avatar_url}
              alt={contributor.login}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-medium truncate group-hover:text-[#38BDF8] transition-colors">
              {contributor.login}
            </p>
            <p className="text-gray-400 text-sm">
              {contributor.contributions} contributions
            </p>
          </div>
          <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-[#38BDF8] transition-colors" />
        </div>
      </a>
    </motion.div>
  );
}
