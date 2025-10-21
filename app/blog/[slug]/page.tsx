import { notFound } from "next/navigation";
import { serialize } from "next-mdx-remote/serialize";
import { getPostBySlug, getAllPosts } from "@/lib/mdx";
import BlogPostClient from "./blog-post-client";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }

  const mdxSource = await serialize(post.content);

  return <BlogPostClient post={post} mdxSource={mdxSource} />;
}

// Pre-render all blog posts at build time
export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}
