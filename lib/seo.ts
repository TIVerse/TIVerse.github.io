/**
 * SEO configuration and metadata utilities for TIVerse
 */

export const siteConfig = {
  name: "TIVerse",
  title: "TIVerse - Open Source Infrastructure & Developer Tools by Tonmoy Infrastructure",
  description:
    "TIVerse is an open-source ecosystem by Tonmoy Infrastructure & Vision (TIVerse), led by Eshan Roy. Building innovative developer tools, cloud infrastructure, and open-source projects for developers worldwide. Explore our GitHub organization and contribute to cutting-edge technology.",
  keywords: [
    "TIVerse",
    "Tonmoy Infrastructure",
    "Eshan Roy",
    "open source",
    "developer tools",
    "cloud infrastructure",
    "GitHub organization",
    "open source projects",
    "software development",
    "infrastructure as code",
    "DevOps tools",
    "TIVerse GitHub",
    "Tonmoy Infrastructure Vision",
  ],
  url: "https://tiverse.github.io",
  ogImage: "https://tiverse.github.io/og-image.png",
  links: {
    github: "https://github.com/tiverse",
    githubOrg: "https://github.com/tiverse",
    email: "eshanized@proton.me",
    twitter: "https://twitter.com/eshanized",
  },
  creator: {
    name: "Eshan Roy",
    role: "CEO & Founder @ Tonmoy Infrastructure",
    github: "https://github.com/eshanized",
    twitter: "@eshanized",
  },
  organization: {
    name: "Tonmoy Infrastructure & Vision",
    legalName: "TIVerse",
    url: "https://tiverse.github.io",
    logo: "https://tiverse.github.io/logo.svg",
    foundingDate: "2024",
    description: "Open-source infrastructure and developer tools organization",
  },
};

export function constructMetadata({
  title = siteConfig.title,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  noIndex = false,
  canonical,
}: {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
  canonical?: string;
} = {}) {
  return {
    title,
    description,
    keywords: siteConfig.keywords.join(", "),
    authors: [{ name: siteConfig.creator.name, url: siteConfig.creator.github }],
    creator: siteConfig.creator.name,
    publisher: siteConfig.organization.name,
    alternates: {
      canonical: canonical || siteConfig.url,
    },
    openGraph: {
      title,
      description,
      url: canonical || siteConfig.url,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${title} - TIVerse Open Source`,
        },
      ],
      locale: "en_US",
      type: "website",
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: siteConfig.creator.twitter,
      site: siteConfig.creator.twitter,
    },
    metadataBase: new URL(siteConfig.url),
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large" as const,
            "max-snippet": -1,
          },
        },
    verification: {
      google: "google-site-verification-code", // Add your verification code
    },
  };
}

/**
 * Generate JSON-LD structured data for organization
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.organization.legalName,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    logo: siteConfig.organization.logo,
    description: siteConfig.description,
    foundingDate: siteConfig.organization.foundingDate,
    founder: {
      "@type": "Person",
      name: siteConfig.creator.name,
      jobTitle: siteConfig.creator.role,
      url: siteConfig.creator.github,
    },
    sameAs: [
      siteConfig.links.github,
      siteConfig.links.twitter,
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: siteConfig.links.email,
      contactType: "Customer Service",
    },
  };
}

/**
 * Generate JSON-LD structured data for website
 */
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    alternateName: siteConfig.organization.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      "@type": "Organization",
      name: siteConfig.organization.legalName,
      logo: {
        "@type": "ImageObject",
        url: siteConfig.organization.logo,
      },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/projects?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}
