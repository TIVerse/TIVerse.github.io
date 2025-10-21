"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/mdx";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="h-full p-6 rounded-xl card glass transition-all duration-300 shine-on-hover glow-hover">
          {/* Category Badge */}
          <div className="mb-4">
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/20">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#38BDF8] transition-colors">
            {post.title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {post.description}
          </p>

          {/* Meta */}
          <div className="flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span suppressHydrationWarning>{formattedDate}</span>
              </div>
              {post.readTime && (
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              )}
            </div>
            <ArrowRight className="w-5 h-5 text-[#38BDF8] group-hover:translate-x-2 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
