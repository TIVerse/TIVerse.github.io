"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Send, MapPin, Building } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:eshanized@proton.me?subject=${formData.subject}&body=${formData.message}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F172A] via-[#1e293b] to-[#0F172A] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <SectionHeading
            title="Get in Touch"
            subtitle="Have questions or want to collaborate? We'd love to hear from you"
            centered
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="p-6 rounded-xl glass">
              <div className="flex items-center mb-4">
                <Building className="w-6 h-6 text-[#38BDF8] mr-3" />
                <h3 className="text-xl font-semibold text-white">Organization</h3>
              </div>
              <p className="text-gray-300 mb-2">Tonmoy Infrastructure & Vision</p>
              <p className="text-gray-400 text-sm">Building the future of open infrastructure</p>
            </div>

            <div className="p-6 rounded-xl glass">
              <div className="flex items-center mb-4">
                <Mail className="w-6 h-6 text-[#38BDF8] mr-3" />
                <h3 className="text-xl font-semibold text-white">Email</h3>
              </div>
              <a
                href="mailto:eshanized@proton.me"
                className="text-[#38BDF8] hover:underline break-all"
              >
                eshanized@proton.me
              </a>
            </div>

            <div className="p-6 rounded-xl glass">
              <div className="flex items-center mb-4">
                <Github className="w-6 h-6 text-[#38BDF8] mr-3" />
                <h3 className="text-xl font-semibold text-white">GitHub</h3>
              </div>
              <a
                href="https://github.com/tiverse"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#38BDF8] hover:underline"
              >
                github.com/tiverse
              </a>
            </div>

            <div className="p-6 rounded-xl glass">
              <div className="flex items-center mb-4">
                <MapPin className="w-6 h-6 text-[#38BDF8] mr-3" />
                <h3 className="text-xl font-semibold text-white">Location</h3>
              </div>
              <p className="text-gray-300">Global</p>
              <p className="text-gray-400 text-sm mt-1">Remote-first organization</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="p-8 rounded-xl glass-strong">
              <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#38BDF8] transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#38BDF8] transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#38BDF8] transition-colors"
                    placeholder="What is this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#38BDF8] transition-colors resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#38BDF8] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#38BDF8]/90 transition-colors flex items-center justify-center"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
