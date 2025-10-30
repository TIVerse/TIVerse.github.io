"use client";

import Link from 'next/link';
import { Github, Twitter, Mail, Heart, Terminal, Code, Brackets, ChevronRight, ExternalLink, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const navigationSections = [
    {
      title: 'navigation',
      items: [
        { name: 'home', href: '/', icon: Terminal },
        { name: 'about', href: '/about', icon: Code },
        { name: 'projects', href: '/projects', icon: Brackets },
        { name: 'blog', href: '/blog', icon: Terminal },
        { name: 'contact', href: '/contact', icon: ChevronRight },
      ]
    },
    {
      title: 'projects',
      items: [
        { name: 'open_source', href: '/projects', icon: Github },
        { name: 'infrastructure', href: '/projects', icon: Code },
        { name: 'developer_tools', href: '/projects', icon: Terminal },
        { name: 'contribute', href: '/contact', icon: Coffee },
      ]
    },
    {
      title: 'resources',
      items: [
        { name: 'documentation', href: '/blog', icon: Code },
        { name: 'api_reference', href: '/projects', icon: Brackets },
        { name: 'community', href: '/contact', icon: Coffee },
        { name: 'support', href: '/contact', icon: Mail },
      ]
    }
  ];

  const socialLinks = [
    {
      name: 'github',
      href: 'https://github.com/tiverse',
      icon: Github,
      color: 'hover:text-blue-400 hover:bg-blue-950/50',
      handle: '@tiverse'
    },
    {
      name: 'twitter',
      href: 'https://twitter.com/tiverse',
      icon: Twitter,
      color: 'hover:text-cyan-400 hover:bg-cyan-950/50',
      handle: '@tiverse'
    },
    {
      name: 'email',
      href: 'mailto:hello@tiverse.dev',
      icon: Mail,
      color: 'hover:text-emerald-400 hover:bg-emerald-950/50',
      handle: 'hello@tiverse.dev'
    }
  ];

  return (
    <footer className="relative bg-slate-950 border-t border-slate-800 overflow-hidden">
      {/* Code grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-slate-950 to-cyan-950/20"></div>
      
      {/* Terminal-style top border */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-500"></div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Terminal Header */}
        <div className="mb-12">
          <div className="inline-flex items-center space-x-3 mb-6 px-4 py-2 bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-lg">
            <div className="flex space-x-1.5">
              <div className="w-2.5 h-2.5 bg-red-400 rounded-full"></div>
              <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full"></div>
              <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse"></div>
            </div>
            <span className="text-xs font-mono text-slate-400">footer.component.tsx</span>
          </div>

          {/* Brand Section with Terminal Aesthetic */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-12">
            {/* Logo and Description */}
            <div className="lg:max-w-md">
              <div className="mb-4">
                <Logo size={48} showText={true} />
              </div>

              {/* Code comment style description */}
              <div className="space-y-2 mb-6">
                <div className="flex items-start space-x-2 text-sm font-mono">
                  <span className="text-emerald-400">{"/*"}</span>
                  <div className="flex-1 text-slate-300 leading-relaxed">
                    Empowering developers with open-source tools that are performant, reliable, and built for the real world.
                  </div>
                </div>
                <div className="flex items-end space-x-2 text-sm font-mono">
                  <span className="text-emerald-400 ml-2">{"*/"}</span>
                </div>
              </div>

              {/* Status indicators */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center space-x-2 px-3 py-1.5 bg-slate-900/60 border border-slate-700/50 rounded-lg">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-xs font-mono text-slate-400">status: active</span>
                </div>
                <div className="flex items-center space-x-2 px-3 py-1.5 bg-slate-900/60 border border-slate-700/50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-xs font-mono text-slate-400">build: passing</span>
                </div>
                <div className="flex items-center space-x-2 px-3 py-1.5 bg-slate-900/60 border border-slate-700/50 rounded-lg">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-xs font-mono text-slate-400">version: 2024.1</span>
                </div>
              </div>
            </div>

            {/* Social Links with Terminal Style */}
            <div className="lg:text-right">
              <div className="mb-4">
                <span className="text-sm font-mono text-cyan-400">const</span>
                <span className="text-sm font-mono text-slate-300"> socialLinks = </span>
                <span className="text-sm font-mono text-yellow-400">{"["}</span>
              </div>
              
              <div className="space-y-3 mb-4">
                {socialLinks.map((social, index) => (
                  <div key={social.name} className="flex items-center justify-start lg:justify-end space-x-3">
                    <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
                      <span className="text-slate-600">{index === 0 ? '  ' : '  '}</span>
                      <span className="text-blue-400">"{social.name}"</span>
                      <span className="text-slate-500">:</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`h-9 px-3 font-mono text-xs border border-slate-700/50 bg-slate-900/40 backdrop-blur-sm ${social.color} transition-all group`}
                      asChild
                    >
                      <Link
                        href={social.href}
                        target={social.href.startsWith('http') ? '_blank' : undefined}
                        rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        <social.icon className="h-4 w-4 mr-2" />
                        <span>{social.handle}</span>
                        {social.href.startsWith('http') && (
                          <ExternalLink className="h-3 w-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="text-sm font-mono text-yellow-400 lg:text-right">
                {"];"}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Sections with Code Structure */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {navigationSections.map((section, sectionIndex) => (
            <div key={section.title} className="space-y-4">
              {/* Section header with code syntax */}
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-sm font-mono text-purple-400">interface</span>
                <span className="text-sm font-mono text-cyan-400 capitalize">{section.title}</span>
                <span className="text-sm font-mono text-slate-500">{"{"}</span>
              </div>

              {/* Navigation items */}
              <div className="space-y-2 ml-4">
                {section.items.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.name} className="group">
                      <Link
                        href={item.href}
                        className="flex items-center space-x-3 text-sm font-mono text-slate-400 hover:text-slate-200 transition-colors py-1"
                      >
                        <span className="text-slate-600 text-xs">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        {Icon && <Icon className="h-3 w-3 text-slate-500 group-hover:text-cyan-400 transition-colors" />}
                        <span className="group-hover:text-cyan-400 transition-colors">
                          {item.name}
                        </span>
                        <span className="text-slate-600">;</span>
                      </Link>
                    </div>
                  );
                })}
              </div>

              {/* Closing bracket */}
              <div className="text-sm font-mono text-slate-500">{"}"}</div>
            </div>
          ))}
        </div>

        {/* Terminal Command Line */}
        <div className="mb-8">
          <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-xs font-mono text-emerald-400">tiverse@developer</span>
              <span className="text-xs font-mono text-slate-500">:</span>
              <span className="text-xs font-mono text-blue-400">~/projects</span>
              <span className="text-xs font-mono text-slate-400">$</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="text-cyan-400">npm</span>
              <span className="text-slate-300">install</span>
              <span className="text-yellow-400">@tiverse/tools</span>
              <span className="text-slate-500">--save</span>
              <div className="w-2 h-4 bg-slate-400 animate-pulse ml-1"></div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Copyright with code comment style */}
            <div className="flex items-center space-x-2 text-sm font-mono">
              <span className="text-emerald-400">{"// "}</span>
              <span className="text-slate-400">
                © {currentYear} TIVerse. All rights reserved.
              </span>
            </div>

            {/* Made with love section */}
            <div className="flex items-center space-x-2 text-sm font-mono">
              <span className="text-slate-500">{"{"}</span>
              <span className="text-slate-400">made with</span>
              <div className="flex items-center space-x-1">
                <Heart className="h-4 w-4 text-red-400 animate-pulse" />
                <span className="text-slate-500">+</span>
                <Coffee className="h-4 w-4 text-yellow-600" />
              </div>
              <span className="text-slate-400">for developers</span>
              <span className="text-slate-500">{"}"}</span>
            </div>

            {/* Version info */}
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-slate-900/60 border border-slate-700/50 rounded-lg">
              <span className="text-xs font-mono text-slate-500">v</span>
              <span className="text-xs font-mono text-cyan-400">2024.1.0</span>
              <div className="w-1 h-1 bg-emerald-400 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Terminal cursor at bottom */}
        <div className="mt-6 flex justify-center">
          <div className="flex items-center space-x-2 px-3 py-1 bg-slate-900/40 border border-slate-700/30 rounded">
            <span className="text-xs font-mono text-slate-500">EOF</span>
            <div className="w-2 h-3 bg-slate-400 animate-pulse"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}