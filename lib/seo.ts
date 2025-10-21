/**
 * SEO configuration and metadata utilities for TIVerse
 */

export const siteConfig = {
  name: "TIVerse",
  title: "TIVerse - Engineering the Future of Open Infrastructure",
  description:
    "TIVerse is an open-source ecosystem by Tonmoy Infrastructure & Vision, led by Eshan Roy. Building innovative tools and infrastructure for developers worldwide.",
  url: "https://tiverse.dev",
  ogImage: "https://tiverse.dev/og-image.png",
  links: {
    github: "https://github.com/tiverse",
    email: "eshanized@proton.me",
  },
  creator: {
    name: "Eshan Roy",
    role: "CEO @ Tonmoy Infrastructure",
    github: "https://github.com/eshanized",
  },
};

export function constructMetadata({
  title = siteConfig.title,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
} = {}) {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
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
      creator: "@eshanized",
    },
    metadataBase: new URL(siteConfig.url),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
