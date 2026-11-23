/**
 * METADATA
 * Export a `metadata` object (static) or a `generateMetadata` function (dynamic)
 * from a page or layout. Next.js turns it into <title>, <meta> and <link> tags in <head>.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { C, Code, Lesson, Section } from "../_components/lesson";

export const metadata: Metadata = {
  title: "Metadata & SEO", // the /learn layout's template turns this into "Metadata & SEO | Next.js Lessons"
  description: "How to set titles, descriptions and social images in Next.js.",
  keywords: ["nextjs", "metadata", "seo"],
  openGraph: {
    title: "Metadata in Next.js",
    description: "Titles, descriptions and Open Graph images.",
    type: "article",
  },
};

export default function Page() {
  const link = "text-blue-600 underline";
  return (
    <Lesson
      title="Metadata & SEO"
      summary={
        <>
          You don&apos;t write <C>&lt;head&gt;</C> tags by hand. Export metadata from any page or layout and
          Next.js merges it down the tree. Special files like <C>opengraph-image.tsx</C>,{" "}
          <C>sitemap.ts</C> and <C>robots.ts</C> handle the rest.
        </>
      }
      files={[
        "src/app/learn/metadata/page.tsx",
        "src/app/learn/metadata/opengraph-image.tsx",
        "src/app/learn/layout.tsx (title template)",
        "src/app/learn/dynamic-routes/posts/[slug]/page.tsx (generateMetadata)",
        "src/app/sitemap.ts",
        "src/app/robots.ts",
      ]}
    >
      <Section title="1. Static metadata">
        <Code>{`
export const metadata: Metadata = {
  title: "Metadata & SEO",
  description: "How to set titles, descriptions and social images in Next.js.",
  openGraph: { title: "...", type: "article" },
};
`}</Code>
        <p>Right-click this page and choose <b>View Page Source</b> to find these tags in <C>&lt;head&gt;</C>.</p>
      </Section>

      <Section title="2. Title templates">
        <Code>{`
// app/learn/layout.tsx
export const metadata = {
  title: { template: "%s | Next.js Lessons", default: "Next.js Lessons" },
};
`}</Code>
        <p>Every child page sets only its own title. The layout adds the rest.</p>
      </Section>

      <Section title="3. Dynamic metadata with generateMetadata">
        <Code>{`
export async function generateMetadata({ params }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  return { title: post.title, description: post.body };
}
`}</Code>
        <p>
          Open a <Link className={link} href="/learn/dynamic-routes/posts/hello-nextjs">blog post</Link> and
          look at the browser tab title.
        </p>
      </Section>

      <Section title="4. File-based metadata">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <C>opengraph-image.tsx</C>: generates the preview image people see when this page is shared.{" "}
            <a className={link} href="/learn/metadata/opengraph-image" target="_blank">See this page&apos;s image</a>
          </li>
          <li><C>sitemap.ts</C>: <a className={link} href="/sitemap.xml" target="_blank">/sitemap.xml</a></li>
          <li><C>robots.ts</C>: <a className={link} href="/robots.txt" target="_blank">/robots.txt</a></li>
          <li><C>favicon.ico</C>, <C>icon.png</C>, <C>apple-icon.png</C>: drop the file in and it&apos;s linked for you.</li>
        </ul>
      </Section>
    </Lesson>
  );
}
