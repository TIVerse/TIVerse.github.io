"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Twitter, MapPin, Phone, Send, MessageSquare, Users, Code, Terminal, Brackets, ChevronRight, ExternalLink, Coffee, Zap, Shield, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const contactMethods = [
  {
    icon: Mail,
    title: 'email_support',
    description: 'General inquiries and technical support',
    contact: 'hello@tiverse.dev',
    href: 'mailto:hello@tiverse.dev',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-950/50',
    borderColor: 'border-emerald-500/30',
    syntax: 'await sendEmail("hello@tiverse.dev");',
  },
  {
    icon: Github,
    title: 'github_issues',
    description: 'Bug reports, feature requests, contributions',
    contact: '@tiverse',
    href: 'https://github.com/tiverse',
    color: 'text-blue-400',
    bgColor: 'bg-blue-950/50',
    borderColor: 'border-blue-500/30',
    syntax: 'git clone https://github.com/tiverse',
  },
  {
    icon: Twitter,
    title: 'social_updates',
    description: 'Latest updates and community discussions',
    contact: '@tiverse',
    href: 'https://twitter.com/tiverse',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-950/50',
    borderColor: 'border-cyan-500/30',
    syntax: 'follow("@tiverse").then(getUpdates);',
  },
];

const reasons = [
  {
    icon: Code,
    title: 'technical_support',
    description: 'Get help with implementation, troubleshooting, and best practices',
    syntax: 'debug(issue).then(resolve);',
  },
  {
    icon: Users,
    title: 'partnership_inquiry',
    description: 'Explore collaboration opportunities and enterprise solutions',
    syntax: 'const partnership = await collaborate();',
  },
  {
    icon: MessageSquare,
    title: 'general_questions',
    description: 'Questions about TIVerse projects, roadmap, and community',
    syntax: 'ask(question).expect(detailed_answer);',
  },
  {
    icon: Coffee,
    title: 'open_source_contrib',
    description: 'Contributing to projects, reporting bugs, suggesting features',
    syntax: 'git commit -m "feat: awesome contribution"',
  },
];

const stats = [
  { label: 'response_time', value: '<24h', icon: Clock, color: 'text-emerald-400' },
  { label: 'support_channels', value: '3+', icon: MessageSquare, color: 'text-blue-400' },
  { label: 'community_size', value: '1K+', icon: Users, color: 'text-cyan-400' },
  { label: 'uptime', value: '99.9%', icon: Zap, color: 'text-purple-400' },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    type: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="pt-16">
      {/* Hero Section with Terminal Aesthetic */}
      <section className="relative overflow-hidden">
        {/* Grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-background to-blue-50/30 dark:from-slate-950 dark:via-background dark:to-slate-900"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.08),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.12),transparent_50%)]"></div>

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Terminal-style status badge */}
            <div className="inline-flex items-center space-x-3 mb-6 px-4 py-2 bg-background/80 backdrop-blur-sm border border-border/50 rounded-lg shadow-lg">
              <div className="flex space-x-1.5">
                <div className="w-2.5 h-2.5 bg-red-400 rounded-full"></div>
                <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full"></div>
                <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse"></div>
              </div>
              <span className="text-xs font-mono text-muted-foreground">contact.interface.tsx</span>
            </div>

            {/* Code-style title */}
            <div className="mb-6 space-y-2">
              <div className="text-left max-w-fit mx-auto">
                <span className="text-sm font-mono text-muted-foreground/70">1 </span>
                <span className="text-sm font-mono text-cyan-500">const</span>
                <span className="text-sm font-mono text-foreground"> contact = </span>
                <span className="text-sm font-mono text-purple-500">initializeConnection</span>
                <span className="text-sm font-mono text-foreground">();</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground tracking-tight leading-[1.1]">
                Get in{" "}
                <span className="relative inline-block">
                  <span className="font-mono bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
                    Touch
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 rounded-full"></span>
                </span>
              </h1>

              <div className="text-left max-w-fit mx-auto">
                <span className="text-sm font-mono text-muted-foreground/70">2 </span>
                <span className="text-sm font-mono text-cyan-500">return</span>
                <span className="text-sm font-mono text-foreground"> contact.</span>
                <span className="text-sm font-mono text-purple-500">establish</span>
                <span className="text-sm font-mono text-foreground">(</span>
                <span className="text-sm font-mono text-blue-500">secure_channel</span>
                <span className="text-sm font-mono text-foreground">);</span>
              </div>
            </div>

            {/* Code comment style description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed"
            >
              <div className="flex items-start space-x-2">
                <span className="text-emerald-500 font-mono">{"/*"}</span>
                <p className="flex-1">
                  Have questions, want to collaborate, or need support? We'd love to hear from you.
                  Reach out and let's build something amazing together. Our team is here to help with technical questions, partnerships, and community support.
                </p>
                <span className="text-emerald-500 font-mono">{"*/"}</span>
              </div>
            </motion.div>

            {/* Terminal-style command buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <Button size="lg" className="font-mono bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all group">
                <span className="mr-2">$</span>
                send --message
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="font-mono border-2 hover:bg-accent" asChild>
                <Link href="https://github.com/tiverse" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  open --github-issues
                </Link>
              </Button>
            </motion.div>

            {/* Terminal-style Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 max-w-4xl mx-auto"
            >
              {stats.map((stat, index) => (
                <div key={stat.label} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg blur-xl group-hover:blur-2xl transition-all"></div>
                  <div className="relative bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-sm border border-blue-500/30 rounded-lg p-6 hover:border-blue-500/60 transition-all">
                    <div className="text-xs font-mono text-blue-400 mb-2 flex items-center space-x-2">
                      <stat.icon className="h-3 w-3" />
                      <span>{">"} {stat.label}</span>
                    </div>
                    <div className={`text-3xl lg:text-4xl font-bold font-mono ${stat.color} mb-1`}>
                      {stat.value}
                    </div>
                    <div className="text-xs font-mono text-muted-foreground/70">// guaranteed</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods with Terminal Interface */}
      <section className="py-16 relative overflow-hidden">
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            {/* Terminal-style header */}
            <div className="inline-flex items-center space-x-2 mb-4 px-4 py-2 bg-background/80 backdrop-blur-sm border border-border/50 rounded-lg">
              <span className="text-xs font-mono text-cyan-500">const</span>
              <span className="text-xs font-mono text-blue-500">channels</span>
              <span className="text-xs font-mono text-muted-foreground">= getContactMethods();</span>
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Communication Channels
            </h2>
            <div className="text-xl text-muted-foreground max-w-2xl mx-auto">
              <span className="font-mono text-emerald-500">{"// "}</span>
              Choose your preferred method to connect with our team. All channels are actively monitored.
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={method.href} target={method.href.startsWith('http') ? '_blank' : undefined} rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 group cursor-pointer border-border/50 bg-background/50 backdrop-blur-sm hover:border-blue-500/60">
                    <CardHeader>
                      {/* Terminal window header */}
                      <div className="flex items-center justify-between mb-3 pb-3 border-b border-border/30">
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                          </div>
                          <span className="text-xs font-mono text-muted-foreground/70">{method.title}.channel</span>
                        </div>
                        <div className="flex space-x-1">
                          <method.icon className={`h-4 w-4 ${method.color} group-hover:scale-110 transition-transform`} />
                          {method.href.startsWith('http') && (
                            <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-cyan-600 transition-colors" />
                          )}
                        </div>
                      </div>

                      <CardTitle className="font-mono text-lg group-hover:text-blue-600 transition-colors">
                        {method.title}
                      </CardTitle>

                      {/* Code snippet */}
                      <div className="mt-3 p-2 bg-slate-900/20 dark:bg-slate-950/40 rounded border font-mono text-xs">
                        <span className="text-emerald-400">$ </span>
                        <span className="text-cyan-400">{method.syntax}</span>
                      </div>

                      <CardDescription className="text-sm leading-relaxed mt-3">
                        <span className="font-mono text-emerald-500 text-xs">{"// "}</span>
                        {method.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Badge className={`font-mono text-xs ${method.bgColor} ${method.color} border-0`}>
                          {method.contact}
                        </Badge>
                        <div className="flex items-center space-x-1 text-xs font-mono text-muted-foreground">
                          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                          <span>online</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content with Terminal Layout */}
      <section className="py-16 bg-muted/30 relative overflow-hidden">
        {/* Code grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"></div>

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form with Terminal Styling */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-background/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  {/* Terminal window header */}
                  <div className="flex items-center justify-between mb-3 pb-3 border-b border-border/30">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                      </div>
                      <span className="text-xs font-mono text-muted-foreground/70">contact_form.tsx</span>
                    </div>
                    <Send className="h-4 w-4 text-muted-foreground" />
                  </div>

                  <CardTitle className="font-mono">Send Message</CardTitle>
                  <CardDescription>
                    <span className="font-mono text-emerald-500 text-xs">{"// "}</span>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="font-mono text-sm">name *</Label>
                        <Input
                          id="name"
                          placeholder="your_full_name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="font-mono"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="font-mono text-sm">email *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@domain.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="font-mono"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company" className="font-mono text-sm">company</Label>
                      <Input
                        id="company"
                        placeholder="optional_company_name"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        className="font-mono"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="type" className="font-mono text-sm">inquiry_type</Label>
                      <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                        <SelectTrigger className="font-mono">
                          <SelectValue placeholder="select_inquiry_type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technical" className="font-mono">technical_support</SelectItem>
                          <SelectItem value="partnership" className="font-mono">partnership_inquiry</SelectItem>
                          <SelectItem value="contribution" className="font-mono">open_source_contrib</SelectItem>
                          <SelectItem value="general" className="font-mono">general_questions</SelectItem>
                          <SelectItem value="media" className="font-mono">media_press</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="font-mono text-sm">subject *</Label>
                      <Input
                        id="subject"
                        placeholder="brief_subject_line"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        className="font-mono"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="font-mono text-sm">message *</Label>
                      <Textarea
                        id="message"
                        placeholder="/* Tell us how we can help you... */"
                        rows={6}
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        className="font-mono"
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full font-mono bg-blue-600 hover:bg-blue-700">
                      <span className="mr-2">$</span>
                      send --message
                      <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Why Contact Us with Terminal Cards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <div className="inline-flex items-center space-x-2 mb-4 px-4 py-2 bg-background/80 backdrop-blur-sm border border-border/50 rounded-lg">
                  <span className="text-xs font-mono text-cyan-500">const</span>
                  <span className="text-xs font-mono text-blue-500">reasons</span>
                  <span className="text-xs font-mono text-muted-foreground">= getContactReasons();</span>
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-4 font-mono">
                  Why Reach Out?
                </h2>
                <p className="text-muted-foreground mb-6">
                  <span className="font-mono text-emerald-500 text-sm">{"// "}</span>
                  We're here to help with everything from technical questions to partnership opportunities.
                </p>
              </div>

              <div className="space-y-4">
                {reasons.map((reason, index) => (
                  <motion.div
                    key={reason.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="bg-background/50 backdrop-blur-sm border-border/50 group hover:shadow-lg transition-all">
                      <CardContent className="p-4">
                        {/* Terminal header */}
                        <div className="flex items-center justify-between mb-3 pb-2 border-b border-border/20">
                          <div className="flex items-center space-x-2">
                            <div className="flex space-x-1">
                              <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                              <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                            </div>
                            <span className="text-xs font-mono text-muted-foreground/70">{reason.title}.ts</span>
                          </div>
                          <reason.icon className="h-4 w-4 text-blue-600 group-hover:scale-110 transition-transform" />
                        </div>

                        <div className="flex items-start space-x-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground mb-1 font-mono">
                              {reason.title}
                            </h3>
                            
                            {/* Code snippet */}
                            <div className="mb-2 p-2 bg-slate-900/20 dark:bg-slate-950/40 rounded border font-mono text-xs">
                              <span className="text-emerald-400">$ </span>
                              <span className="text-cyan-400">{reason.syntax}</span>
                            </div>
                            
                            <p className="text-sm text-muted-foreground">
                              <span className="font-mono text-emerald-500 text-xs">{"// "}</span>
                              {reason.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Response Time Card */}
              <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 border-indigo-200 dark:border-indigo-800">
                <CardContent className="p-6">
                  {/* Terminal header */}
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-indigo-200/50 dark:border-indigo-800/50">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                      </div>
                      <span className="text-xs font-mono text-muted-foreground/70">sla.config.ts</span>
                    </div>
                    <Clock className="h-4 w-4 text-indigo-600" />
                  </div>

                  <h3 className="font-semibold text-foreground mb-2 font-mono">
                    response_time_sla
                  </h3>
                  
                  {/* Code snippet */}
                  <div className="mb-3 p-2 bg-slate-900/20 dark:bg-slate-950/40 rounded border font-mono text-xs">
                    <span className="text-emerald-400">const </span>
                    <span className="text-cyan-400">sla = {"{"} maxResponseTime: "24h" {"}"}</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    <span className="font-mono text-emerald-500 text-xs">{"// "}</span>
                    We typically respond within 24 hours during business days. 
                    For urgent technical issues, check our GitHub issues first.
                  </p>
                  <Button variant="outline" size="sm" className="font-mono" asChild>
                    <Link href="https://github.com/tiverse" target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      open --github-issues
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Office Hours Card */}
              <Card className="bg-background/50 backdrop-blur-sm border-border/50">
                <CardContent className="p-6">
                  {/* Terminal header */}
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-border/30">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                      </div>
                      <span className="text-xs font-mono text-muted-foreground/70">office_hours.json</span>
                    </div>
                    <Shield className="h-4 w-4 text-muted-foreground" />
                  </div>

                  <h3 className="font-semibold text-foreground mb-2 font-mono">
                    availability_schedule
                  </h3>
                  
                  {/* Code snippet */}
                  <div className="mb-3 p-2 bg-slate-900/20 dark:bg-slate-950/40 rounded border font-mono text-xs">
                    <span className="text-emerald-400">{"{"}</span>
                    <br />
                    <span className="ml-2 text-cyan-400">"weekdays": "9:00-18:00 EST",</span>
                    <br />
                    <span className="ml-2 text-cyan-400">"weekend": "limited"</span>
                    <br />
                    <span className="text-emerald-400">{"}"}</span>
                  </div>
                  
                  <div className="space-y-1 text-sm text-muted-foreground font-mono">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                    <p>Weekend: Limited availability</p>
                    <p>Holidays: Closed</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA with Terminal Theme */}
      <section className="relative py-24 overflow-hidden">
        {/* Terminal-style gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-cyan-500/20 to-emerald-500/20"></div>

        {/* Code line numbers effect */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-slate-950/50 border-r border-slate-700/50 hidden lg:block">
          <div className="flex flex-col items-end pr-4 pt-24 space-y-6 text-xs font-mono text-slate-600">
            {[...Array(8)].map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
        </div>

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Code-style CTA */}
            <div className="mb-8 space-y-4">
              <div className="flex items-start justify-center space-x-3 text-left">
                <span className="text-sm font-mono text-emerald-400">{"// "}</span>
                <div>
                  <div className="text-sm font-mono text-cyan-400 mb-2">
                    <span className="text-blue-400">async function</span> startConversation() {"{"}
                  </div>
                </div>
              </div>

              <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4 px-8">
                Ready to Start Building?
              </h2>

              <div className="flex items-center justify-center space-x-2 text-sm font-mono">
                <span className="text-emerald-400">{"/*"}</span>
                <p className="text-lg lg:text-xl text-white/90 max-w-2xl leading-relaxed">
                  Whether you have questions, need support, or want to collaborate, 
                  we're here to help you succeed with TIVerse tools.
                </p>
                <span className="text-emerald-400">{"*/"}</span>
              </div>

              <div className="flex items-start justify-center space-x-3 text-left mt-6">
                <div className="text-sm font-mono text-cyan-400">
                  {"}"};
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Button size="lg" className="font-mono bg-blue-600 hover:bg-blue-700 text-white shadow-xl group" asChild>
                <Link href="mailto:hello@tiverse.dev">
                  <Mail className="mr-2 h-4 w-4" />
                  <span className="mr-2">$</span>
                  send --email
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="font-mono border-2 border-slate-400 text-white hover:bg-white hover:text-slate-900" asChild>
                <Link href="/projects">
                  <span className="mr-2">{">"}</span>
                  explore.projects()
                </Link>
              </Button>
            </div>

            {/* Terminal prompt at bottom */}
            <div className="mt-12 inline-flex items-center space-x-2 px-4 py-2 bg-slate-950/50 backdrop-blur-sm border border-slate-700/50 rounded-lg">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-xs font-mono text-emerald-400">tiverse@contact:~$</span>
              <span className="text-xs font-mono text-slate-400 animate-pulse">_</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}