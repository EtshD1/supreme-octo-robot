/**
 * DYNAMIC ROUTE: /learn/dynamic-routes/posts/[slug]
 *
 * Three things to notice:
 * 1. generateStaticParams: tells Next.js which slugs to pre-build at build time.
 * 2. generateMetadata: sets the <title> from the post itself.
 * 3. notFound(): shows the 404 page when the post doesn't exist.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cacheLife } from "next/cache";
import { getPost, getUser, posts } from "@/lib/data";

// Cache the data so the page can be fully pre-rendered (see the Caching lesson).
async function getCachedPost(slug: string) {
  "use cache";
  cacheLife("hours");
  const post = await getPost(slug);
  const author = post ? await getUser(post.authorId) : null;
  return post ? { ...post, author } : null;
}

// 1️⃣ Build these pages ahead of time. Any other slug is rendered on its first request.
export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

// 2️⃣ Dynamic <title> and description for each post.
export async function generateMetadata({ params }: PageProps<"/learn/dynamic-routes/posts/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getCachedPost(slug);
  return { title: post?.title ?? "Post not found", description: post?.body };
}

// `params` is a Promise. Await it to read the values.
export default async function PostPage({ params }: PageProps<"/learn/dynamic-routes/posts/[slug]">) {
  const { slug } = await params;
  const post = await getCachedPost(slug);

  // 3️⃣ Render the nearest not-found.tsx (here, the root src/app/not-found.tsx).
  if (!post) notFound();

  return (
    <article className="space-y-4">
      <Link href="/learn/dynamic-routes" className="text-sm text-blue-600 underline">← Back</Link>
      <p className="font-mono text-xs text-zinc-500">params.slug = &quot;{slug}&quot;</p>
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-sm text-zinc-500">by {post.author?.name}</p>
      <p className="leading-7">{post.body}</p>
      <p className="text-sm text-zinc-500">
        Look at the browser tab. Its title comes from <code>generateMetadata</code>.
      </p>
    </article>
  );
}
