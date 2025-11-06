# TIVerse - Tonmoy Infrastructure & Vision

A modern, production-ready website for TIVerse, showcasing our open-source ecosystem, projects, mission, and vision. Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

![TIVerse Website](https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2850&q=80)

## 🚀 Features

- **Modern Design**: Clean, developer-focused UI with glassmorphism effects and subtle animations
- **Responsive**: Fully responsive design optimized for all devices
- **Performance**: Built with Next.js 13+ App Router for optimal performance
- **Accessibility**: WCAG compliant with semantic HTML and keyboard navigation
- **SEO Optimized**: Complete meta tags, Open Graph, and structured data
- **Dark/Light Mode**: System-aware theme switching with persistent preferences
- **Type Safety**: Full TypeScript coverage with strict mode enabled
- **Animation**: Smooth animations and micro-interactions with Framer Motion

## 🛠️ Tech Stack

- **Framework**: Next.js 13+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn/UI
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Theme**: next-themes
- **Deployment**: Vercel (optimized build configuration)

## 📁 Project Structure

```
tiverse-website/
├── app/                    # Next.js App Router
│   ├── about/             # About page
│   ├── blog/              # Blog listing
│   ├── contact/           # Contact form
│   ├── projects/          # Projects showcase
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── not-found.tsx      # 404 page
├── components/
│   ├── ui/                # Shadcn/UI components
│   ├── layout/            # Layout components (header, footer)
│   └── theme-provider.tsx # Theme provider
├── lib/
│   └── utils.ts           # Utility functions
├── public/                # Static assets
└── styles/
    └── globals.css        # Global styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/tiverse/website.git
cd tiverse-website
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 Customization

### Brand Colors

The website uses TIVerse's signature color palette defined in `tailwind.config.ts`:

- **Primary**: `#4F46E5` (Indigo 600)
- **Secondary**: Various shades of purple and indigo
- **Accent**: Complementary colors for highlights

### Content Updates

- **Projects**: Update the projects array in `app/projects/page.tsx`
- **Blog Posts**: Add new posts to the blogPosts array in `app/blog/page.tsx`
- **Company Info**: Modify content in `app/about/page.tsx`

### Styling

The website uses Tailwind CSS with custom design tokens. Key styling files:

- `app/globals.css` - Global styles and CSS variables
- `tailwind.config.ts` - Tailwind configuration and custom colors
- `components.json` - Shadcn/UI configuration

## 📝 Adding Content

### New Blog Post

Add a new post object to the `blogPosts` array in `app/blog/page.tsx`:

```typescript
{
  id: 7,
  title: 'Your Post Title',
  excerpt: 'Brief description...',
  content: 'Full content...',
  author: 'TIVerse Team',
  date: '2024-01-20',
  readTime: '5 min read',
  category: 'Development',
  tags: ['tag1', 'tag2'],
  featured: false,
}
```

### New Project

Add a new project to the `projects` array in `app/projects/page.tsx`:

```typescript
{
  id: 7,
  name: 'Project Name',
  description: 'Project description...',
  stars: 1234,
  forks: 89,
  watchers: 45,
  language: 'TypeScript',
  languageColor: 'bg-blue-500',
  category: 'Category',
  status: 'stable',
  lastUpdate: '2024-01-20',
  topics: ['topic1', 'topic2'],
  license: 'MIT',
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to a Git repository (GitHub, GitLab, Bitbucket)
2. Import your project on [Vercel](https://vercel.com)
3. Configure environment variables if needed
4. Deploy!

The website is optimized for Vercel with automatic deployments on push.

### Other Platforms

The website exports as a static site and can be deployed to:

- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting provider

Run the build command:
```bash
npm run build
```

The `out` directory contains the static files ready for deployment.

## 📊 Analytics

To add analytics, install your preferred solution:

### Vercel Analytics
```bash
npm install @vercel/analytics
```

### Plausible
```bash
npm install next-plausible
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for local development:

```env
# GitHub API Token (Optional but recommended to avoid rate limiting)
# Create a personal access token at https://github.com/settings/tokens
# No special permissions needed for public repository access
GITHUB_TOKEN=your_github_token_here

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Note**: The GitHub token is optional but highly recommended for the Hall of Fame page. Without it, the GitHub API has a rate limit of 60 requests/hour. With a token, you get 5000 requests/hour. You can create a token at [https://github.com/settings/tokens](https://github.com/settings/tokens) - no special permissions are needed for accessing public repositories.

### SEO Configuration

Update metadata in `app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: 'TIVerse - Your Title',
  description: 'Your description...',
  // ... other metadata
}
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components by [Shadcn/UI](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)
- Animations by [Framer Motion](https://www.framer.com/motion/)

## 📞 Support

- 📧 Email: hello@tiverse.dev
- 🐙 GitHub: [@tiverse](https://github.com/tiverse)
- 🐦 Twitter: [@tiverse](https://twitter.com/tiverse)

---

**TIVerse** - Empowering developers with open-source tools that are performant, reliable, and built for the real world.