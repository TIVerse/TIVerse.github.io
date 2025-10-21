import { getAllPosts, getCategories } from "@/lib/mdx";
import BlogClient from "./blog-client";

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getCategories();

  return <BlogClient posts={posts} categories={categories} />;
}
