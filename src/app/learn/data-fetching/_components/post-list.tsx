"use client";
import { use } from "react";
import type { Post } from "@/lib/data";

// use() "unwraps" a Promise. While it's pending, the nearest <Suspense> fallback shows.
export function PostList({ postsPromise }: { postsPromise: Promise<Post[]> }) {
  const posts = use(postsPromise);
  return (
    <ul className="list-disc pl-5 text-sm">
      {posts.map((p) => <li key={p.slug}>{p.title}</li>)}
    </ul>
  );
}
