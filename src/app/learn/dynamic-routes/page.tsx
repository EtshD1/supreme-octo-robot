import Link from "next/link";
import { posts } from "@/lib/data";
import { C, Code, Demo, Lesson, Section } from "../_components/lesson";

export const metadata = { title: "Dynamic Routes" };

export default function Page() {
  const link = "text-blue-600 underline";
  return (
    <Lesson
      title="Dynamic Routes"
      summary={
        <>
          Put a folder name in square brackets, like <C>[slug]</C>, and it matches any value in that part of
          the URL. Your page gets the value through the <C>params</C> prop.
        </>
      }
      files={[
        "src/app/learn/dynamic-routes/posts/[slug]/page.tsx",
        "src/app/learn/dynamic-routes/docs/[...slug]/page.tsx",
        "src/app/learn/dynamic-routes/shop/[[...filters]]/page.tsx",
      ]}
    >
      <Section title="1. [slug]: one segment">
        <Code>{`
posts/[slug]/page.tsx   →   /posts/hello-nextjs    params = { slug: "hello-nextjs" }
`}</Code>
        <Demo>
          <ul className="list-disc space-y-1 pl-5">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link className={link} href={`/learn/dynamic-routes/posts/${p.slug}`}>{p.title}</Link>
              </li>
            ))}
            <li>
              <Link className={link} href="/learn/dynamic-routes/posts/does-not-exist">
                A post that doesn&apos;t exist (shows the 404 page)
              </Link>
            </li>
          </ul>
        </Demo>
      </Section>

      <Section title="2. [...slug]: catch-all">
        <Code>{`
docs/[...slug]/page.tsx   →   /docs/a/b/c    params = { slug: ["a", "b", "c"] }
                              /docs          ❌ 404 (needs at least one segment)
`}</Code>
        <Demo>
          <ul className="list-disc space-y-1 pl-5">
            <li><Link className={link} href="/learn/dynamic-routes/docs/getting-started">/docs/getting-started</Link></li>
            <li><Link className={link} href="/learn/dynamic-routes/docs/api/components/link">/docs/api/components/link</Link></li>
          </ul>
        </Demo>
      </Section>

      <Section title="3. [[...filters]]: optional catch-all">
        <Code>{`
shop/[[...filters]]/page.tsx   →   /shop            params = { filters: undefined }
                                   /shop/tech/cheap params = { filters: ["tech", "cheap"] }
`}</Code>
        <Demo>
          <ul className="list-disc space-y-1 pl-5">
            <li><Link className={link} href="/learn/dynamic-routes/shop">/shop</Link></li>
            <li><Link className={link} href="/learn/dynamic-routes/shop/tech/under-100">/shop/tech/under-100</Link></li>
          </ul>
        </Demo>
      </Section>
    </Lesson>
  );
}
