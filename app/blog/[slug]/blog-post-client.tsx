"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import Link from "next/link";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import type { BlogPost } from "@/lib/mdx";

interface BlogPostClientProps {
  post: BlogPost;
  mdxSource: MDXRemoteSerializeResult;
}

export default function BlogPostClient({ post, mdxSource }: BlogPostClientProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // MDX element mappings for better UX/styling without the typography plugin
  const components = {
    a: (props: any) => {
      const href = props?.href as string | undefined;
      const isInternal = href?.startsWith("/");
      const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
      const prefixed = isInternal && basePath && basePath !== "/" ? `${basePath}${href}` : href;
      return (
        <a
          {...props}
          href={prefixed}
          className={`text-[#38BDF8] hover:underline ${props.className || ""}`}
          target={isInternal ? undefined : "_blank"}
          rel={isInternal ? undefined : "noopener noreferrer"}
        />
      );
    },
    pre: (props: any) => (
      <pre
        {...props}
        className={`overflow-x-auto rounded-lg bg-white/5 border border-white/10 p-4 ${props.className || ""}`}
      />
    ),
    code: (props: any) => (
      <code
        {...props}
        className={`rounded bg-white/10 px-1.5 py-0.5 ${props.className || ""}`}
      />
    ),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F172A] via-[#1e293b] to-[#0F172A] py-20">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center text-[#38BDF8] hover:underline mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </motion.div>

        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-12"
        >
          <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/20 mb-4">
            {post.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {post.title}
          </h1>
          <p className="text-xl text-gray-400 mb-6">{post.description}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              <span suppressHydrationWarning>{formattedDate}</span>
            </div>
            {post.readTime && (
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>{post.readTime}</span>
              </div>
            )}
          </div>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="max-w-none"
        >
          <div className="p-8 rounded-xl glass mdx-content">
            <MDXRemote {...mdxSource} components={components} />
          </div>
        </motion.div>
      </article>
    </div>
  );
}
