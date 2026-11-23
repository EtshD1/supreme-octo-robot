import { Suspense } from "react";
import Link from "next/link";
import { C, Code, Demo, Lesson, Note, Section, Skeleton } from "../_components/lesson";
import { RouterButtons } from "./_components/router-buttons";
import { CurrentUrl } from "./_components/current-url";

export const metadata = { title: "Linking & Navigating" };

export default function Page() {
  return (
    <Lesson
      title="Linking & Navigating"
      summary={
        <>
          Use <C>&lt;Link&gt;</C> for normal navigation. Use <C>useRouter()</C> when you need to navigate
          from code. Use <C>redirect()</C> on the server. Navigating with these swaps only the parts of the
          page that changed. The browser doesn&apos;t do a full reload.
        </>
      }
      files={[
        "src/app/learn/linking-and-navigating/page.tsx",
        "src/app/learn/linking-and-navigating/_components/router-buttons.tsx",
        "src/app/learn/linking-and-navigating/_components/current-url.tsx",
        "src/app/learn/linking-and-navigating/old-page/page.tsx",
      ]}
    >
      <Section title="1. The <Link> component">
        <p>
          <C>&lt;Link&gt;</C> renders a normal <C>&lt;a&gt;</C> tag. When a link scrolls into view, Next.js{" "}
          <b>prefetches</b> the page in the background, so the click feels instant.
        </p>
        <Code>{`
import Link from "next/link";

<Link href="/learn/caching">Caching lesson</Link>

// href can be an object too:
<Link href={{ pathname: "/learn/search-params", query: { category: "tech" } }}>Tech products</Link>

// opt out of prefetching:
<Link href="/learn/rendering" prefetch={false}>Rendering</Link>
`}</Code>
        <Demo>
          <ul className="list-disc space-y-1 pl-5 text-blue-600 underline">
            <li><Link href="/learn/caching">Caching lesson</Link></li>
            <li>
              <Link href={{ pathname: "/learn/search-params", query: { category: "tech" } }}>
                Tech products (object href)
              </Link>
            </li>
            <li><Link href="/learn/rendering" prefetch={false}>Rendering (no prefetch)</Link></li>
            <li><Link href="/learn/linking-and-navigating?tab=demo#hooks">Same page with ?tab=demo</Link></li>
          </ul>
        </Demo>
      </Section>

      <Section title="2. Navigating from code with useRouter()">
        <p>
          <C>useRouter()</C> is a client hook. It gives you <C>push</C>, <C>replace</C>, <C>back</C>,{" "}
          <C>forward</C> and <C>refresh</C>.
        </p>
        <Demo>
          <RouterButtons />
        </Demo>
      </Section>

      <Section title="3. Reading the URL: usePathname() and useSearchParams()">
        <p id="hooks">
          These client hooks read the current URL. <C>useSearchParams()</C> only has a value at request
          time, so the component that calls it is wrapped in <C>&lt;Suspense&gt;</C>.
        </p>
        <Demo>
          <Suspense fallback={<Skeleton text="Reading URL..." />}>
            <CurrentUrl />
          </Suspense>
        </Demo>
      </Section>

      <Section title="4. Redirecting on the server">
        <p>
          Call <C>redirect()</C> inside a Server Component, Server Action or Route Handler. Try{" "}
          <Link className="text-blue-600 underline" href="/learn/linking-and-navigating/old-page">
            /old-page
          </Link>
          . Its <C>page.tsx</C> only calls <C>redirect()</C>.
        </p>
        <Note>
          If a redirect never changes, you can also put it in <C>next.config.ts</C> under{" "}
          <C>redirects()</C>. That way it runs before any rendering happens.
        </Note>
      </Section>
    </Lesson>
  );
}
