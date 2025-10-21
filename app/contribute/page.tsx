"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, Code2, BookOpen, Bug, Lightbulb } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { getGoodFirstIssues, type GitHubIssue } from "@/lib/github";

const contributionWays = [
  {
    icon: Code2,
    title: "Code Contributions",
    description: "Submit pull requests, fix bugs, add features, or improve performance",
    color: "#38BDF8",
  },
  {
    icon: BookOpen,
    title: "Documentation",
    description: "Help improve our docs, write tutorials, or create examples",
    color: "#818CF8",
  },
  {
    icon: Bug,
    title: "Bug Reports",
    description: "Report issues, help with testing, or provide detailed bug reports",
    color: "#F472B6",
  },
  {
    icon: Lightbulb,
    title: "Feature Ideas",
    description: "Suggest new features, improvements, or share your vision",
    color: "#FBBF24",
  },
];

const guidelines = [
  "Fork the repository and create a new branch for your changes",
  "Follow the existing code style and conventions",
  "Write clear, descriptive commit messages",
  "Add tests for new features or bug fixes",
  "Update documentation as needed",
  "Submit a pull request with a detailed description",
  "Be respectful and constructive in all interactions",
  "Wait for code review and address feedback promptly",
];

export default function ContributePage() {
  const [issues, setIssues] = useState<GitHubIssue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadIssues() {
      setLoading(true);
      const data = await getGoodFirstIssues();
      setIssues(data);
      setLoading(false);
    }
    loadIssues();
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
            title="Contribute to TIVerse"
            subtitle="Help us build the future of open infrastructure"
            centered
          />
        </motion.div>

        {/* Ways to Contribute */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Ways to Contribute</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contributionWays.map((way, index) => (
              <motion.div
                key={way.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-xl glass text-center"
              >
                <div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                  style={{ backgroundColor: `${way.color}20` }}
                >
                  <way.icon className="w-8 h-8" style={{ color: way.color }} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{way.title}</h3>
                <p className="text-gray-400 text-sm">{way.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Good First Issues */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Good First Issues</h2>
            <p className="text-gray-400">Perfect for first-time contributors</p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-12 h-12 border-4 border-[#38BDF8] border-t-transparent rounded-full animate-spin" />
              <p className="mt-4 text-gray-400">Loading issues...</p>
            </div>
          ) : issues.length > 0 ? (
            <div className="space-y-4">
              {issues.slice(0, 10).map((issue, index) => (
                <motion.a
                  key={issue.id}
                  href={issue.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="block p-4 rounded-xl glass hover:border-[#38BDF8]/50 transition-all group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-white font-medium mb-2 group-hover:text-[#38BDF8] transition-colors">
                        {issue.title}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {issue.labels.map((label) => (
                          <span
                            key={label.name}
                            className="px-2 py-1 text-xs rounded-full"
                            style={{
                              backgroundColor: `#${label.color}20`,
                              color: `#${label.color}`,
                              borderColor: `#${label.color}40`,
                              borderWidth: "1px",
                            }}
                          >
                            {label.name}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-[#38BDF8] transition-colors ml-4 flex-shrink-0" />
                  </div>
                </motion.a>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 p-8 rounded-xl glass">
              <p className="text-gray-400 mb-4">No good first issues available right now.</p>
              <p className="text-gray-500 text-sm">
                Check back later or browse all issues on GitHub.
              </p>
            </div>
          )}

          {issues.length > 0 && (
            <div className="text-center mt-8">
              <Button
                href="https://github.com/search?q=org%3Ativerse+label%3A%22good+first+issue%22+state%3Aopen&type=issues"
                variant="secondary"
                icon={Github}
              >
                View All Issues
              </Button>
            </div>
          )}
        </motion.div>

        {/* Contribution Guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Contribution Guidelines</h2>
            <p className="text-gray-400">Follow these best practices when contributing</p>
          </div>

          <div className="max-w-3xl mx-auto p-8 rounded-xl glass">
            <ul className="space-y-4">
              {guidelines.map((guideline, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="flex items-start"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#38BDF8] text-white flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-gray-300">{guideline}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Get Started CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="p-8 rounded-xl glass-strong text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Contribute?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join our community of developers and start making an impact today
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="https://github.com/tiverse" variant="primary" icon={Github}>
              Explore Repositories
            </Button>
            <Button href="https://github.com/orgs/tiverse/discussions" variant="secondary" icon={ExternalLink}>
              Join Discussions
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
