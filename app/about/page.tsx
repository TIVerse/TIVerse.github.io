"use client";

import { motion } from "framer-motion";
import { Target, Rocket, Users, Heart, Award, Zap } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

const milestones = [
  { year: "2023", title: "Foundation", description: "TIVerse ecosystem initiated by Tonmoy Infrastructure" },
  { year: "2024", title: "Growth", description: "Expanded to multiple open-source projects" },
  { year: "2025", title: "Innovation", description: "Launching next-generation infrastructure tools" },
  { year: "Future", title: "Vision", description: "Building the future of open infrastructure" },
];

const values = [
  {
    icon: Heart,
    title: "Open Source First",
    description: "We believe in the power of open collaboration and transparent development",
  },
  {
    icon: Rocket,
    title: "Innovation Driven",
    description: "Pushing boundaries with cutting-edge technology and creative solutions",
  },
  {
    icon: Users,
    title: "Community Focused",
    description: "Building tools for developers, by developers, with developers",
  },
  {
    icon: Award,
    title: "Quality Excellence",
    description: "Committed to delivering production-grade, well-tested solutions",
  },
  {
    icon: Zap,
    title: "Performance First",
    description: "Optimizing for speed, efficiency, and scalability in everything we build",
  },
  {
    icon: Target,
    title: "Mission Focused",
    description: "Engineering infrastructure that empowers the next generation of developers",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F172A] via-[#1e293b] to-[#0F172A]">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeading
              title="About TIVerse"
              subtitle="Building the future of open infrastructure, one commit at a time"
              centered
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-12 p-8 rounded-xl glass text-center max-w-4xl mx-auto"
          >
            <p className="text-xl text-gray-300 leading-relaxed">
              TIVerse is an open-source ecosystem by{" "}
              <span className="text-[#38BDF8] font-semibold">Tonmoy Infrastructure & Vision</span>,
              dedicated to building innovative tools and infrastructure for the modern web.
              Led by{" "}
              <a
                href="https://github.com/eshanized"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#38BDF8] font-semibold hover:underline"
              >
                Eshan Roy
              </a>
              , CEO @ Tonmoy Infrastructure, we're on a mission to empower developers worldwide
              with production-grade, open-source solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-gradient-to-b from-transparent to-[#0F172A]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Vision"
            subtitle="Engineering the future of open infrastructure"
            centered
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="p-8 rounded-xl glass">
              <h3 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <Target className="w-8 h-8 text-[#38BDF8] mr-3" />
                Mission
              </h3>
              <p className="text-gray-300 leading-relaxed">
                To create a comprehensive suite of open-source tools that simplify infrastructure
                management, enhance developer productivity, and foster innovation across the
                global tech community.
              </p>
            </div>

            <div className="p-8 rounded-xl glass">
              <h3 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <Rocket className="w-8 h-8 text-[#38BDF8] mr-3" />
                Philosophy
              </h3>
              <p className="text-gray-300 leading-relaxed">
                We believe in open collaboration, transparent development, and community-driven
                innovation. Every line of code we write is a step towards democratizing
                technology and making powerful tools accessible to everyone.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Journey"
            subtitle="Key milestones in the TIVerse story"
            centered
          />

          <div className="mt-12 relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-[#38BDF8] to-[#818CF8]" />

            {/* Timeline Items */}
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`flex items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className="flex-1 md:text-right md:pr-12">
                    {index % 2 === 0 && (
                      <div className="p-6 rounded-xl glass">
                        <h3 className="text-2xl font-bold text-[#38BDF8] mb-2">{milestone.year}</h3>
                        <h4 className="text-xl font-semibold text-white mb-2">{milestone.title}</h4>
                        <p className="text-gray-400">{milestone.description}</p>
                      </div>
                    )}
                  </div>

                  <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-[#38BDF8] border-4 border-[#0F172A] flex-shrink-0">
                    <div className="w-4 h-4 rounded-full bg-white" />
                  </div>

                  <div className="flex-1 md:pl-12">
                    {index % 2 !== 0 && (
                      <div className="p-6 rounded-xl glass">
                        <h3 className="text-2xl font-bold text-[#38BDF8] mb-2">{milestone.year}</h3>
                        <h4 className="text-xl font-semibold text-white mb-2">{milestone.title}</h4>
                        <p className="text-gray-400">{milestone.description}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-b from-[#0F172A]/50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Values"
            subtitle="The principles that guide everything we do"
            centered
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-xl glass text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#38BDF8]/10 mb-4">
                  <value.icon className="w-8 h-8 text-[#38BDF8]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <SectionHeading title="Leadership" centered />

            <div className="mt-12 p-8 rounded-xl glass-strong">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-3xl font-bold text-white mb-2">Eshan Roy</h3>
                <p className="text-xl text-[#38BDF8] mb-4">CEO @ Tonmoy Infrastructure</p>
                <p className="text-gray-300 leading-relaxed max-w-2xl mx-auto">
                  Leading the vision for TIVerse, Eshan is dedicated to building open-source
                  infrastructure that empowers developers and drives innovation across the
                  global tech ecosystem.
                </p>
                <div className="mt-6">
                  <a
                    href="https://github.com/eshanized"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[#38BDF8] hover:underline"
                  >
                    View GitHub Profile →
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
