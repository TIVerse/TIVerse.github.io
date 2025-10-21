# TIVerse Website

<div align="center">
  <h1>🌌 TIVerse</h1>
  <p><strong>Engineering the Future of Open Infrastructure</strong></p>
  
  <p>
    <a href="https://github.com/tiverse"><img src="https://img.shields.io/badge/GitHub-tiverse-38BDF8?style=for-the-badge&logo=github" alt="GitHub"></a>
    <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js"></a>
    <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" alt="TypeScript"></a>
  </p>
</div>

---

## 📖 About

TIVerse is an open-source ecosystem by **Tonmoy Infrastructure & Vision**, led by **Eshan Roy** (CEO @ Tonmoy Infrastructure). This website serves as the central hub for all TIVerse projects, showcasing our tools, community, and vision for the future of infrastructure.

## ✨ Features

- 🎨 **Modern UI**: Glassmorphism design with smooth animations powered by Framer Motion
- 📱 **Responsive**: Fully optimized for all devices
- 🔗 **GitHub Integration**: Live data fetching from GitHub API
- 📝 **MDX Blog**: Built-in blog system with MDX support
- 🚀 **SEO Optimized**: Complete meta tags, sitemap, and robots.txt
- ⚡ **Performance**: Built with Next.js 15 App Router and Turbopack
- 🎭 **Dark Mode**: Beautiful dark theme by default with toggle option

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org)
- **Styling**: [TailwindCSS v4](https://tailwindcss.com)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev)
- **Content**: [MDX](https://mdxjs.com) with next-mdx-remote
- **SEO**: next-seo, automatic sitemap generation
- **Linting**: [Biome](https://biomejs.dev)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## 📁 Project Structure

```
tiverse-website/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── blog/              # Blog listing & individual posts
│   ├── community/         # Community & contributors
│   ├── contact/           # Contact page
│   ├── contribute/        # Contribution guide
│   ├── projects/          # Projects listing
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── sitemap.ts         # Sitemap generation
│   └── robots.ts          # Robots.txt
├── components/            # React components
│   ├── layout/           # Layout components (Navbar, Footer)
│   ├── ui/               # Reusable UI components
│   └── project-card.tsx  # Project card component
├── lib/                   # Utility functions
│   ├── github.ts         # GitHub API integration
│   ├── mdx.ts            # MDX utilities
│   ├── seo.ts            # SEO configuration
│   └── utils.ts          # Helper functions
├── content/blog/          # MDX blog posts
├── public/                # Static assets
└── styles/                # Global styles
```

## 📝 Content Management

### Adding Blog Posts

Create MDX files in `content/blog/`:

```mdx
---
title: "Your Post Title"
description: "Post description"
date: "2025-01-20"
category: "Announcements"
author: "Your Name"
---

# Your Content Here

Write your blog post content in MDX format...
```

### GitHub Integration

The website automatically fetches:
- Organization repositories
- Contributors
- Good first issues
- Organization statistics

Data is cached for 1 hour to optimize API usage.

## 🎨 Customization

### Theme Colors

Edit `app/globals.css`:

```css
:root {
  --background: #0F172A;
  --foreground: #ededed;
  --accent: #38BDF8;
}
```

### Site Configuration

Edit `lib/seo.ts`:

```typescript
export const siteConfig = {
  name: "TIVerse",
  title: "TIVerse - Engineering the Future of Open Infrastructure",
  description: "...",
  url: "https://tiverse.dev",
  // ...
};
```

## 🚢 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tiverse/web)

1. Push your code to GitHub
2. Import the project to Vercel
3. Deploy automatically with every push

### Other Platforms

Build the production bundle:

```bash
npm run build
```

The output will be in the `.next` folder. You can deploy to any platform that supports Next.js.

## 📄 License

This project is part of the TIVerse ecosystem. See individual repositories for license information.

## 🤝 Contributing

We welcome contributions! Please check out our [Contributing Guide](/contribute) for guidelines.

## 💬 Community

- **GitHub**: [github.com/tiverse](https://github.com/tiverse)
- **Discussions**: [GitHub Discussions](https://github.com/orgs/tiverse/discussions)
- **Email**: eshanized@proton.me

## 👨‍💼 Leadership

**Eshan Roy** - CEO @ Tonmoy Infrastructure  
[GitHub](https://github.com/eshanized)

---

<div align="center">
  <p>Built with ❤️ by the TIVerse Team</p>
  <p>© 2025 TIVerse - Tonmoy Infrastructure & Vision</p>
</div>
