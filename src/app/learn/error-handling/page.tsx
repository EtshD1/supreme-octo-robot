import Link from "next/link";
import { C, Code, Demo, Lesson, Section } from "../_components/lesson";
import { SafeBoundary } from "./_components/safe-boundary";
import { BuggyWidget } from "./_components/buggy-widget";

export const metadata = { title: "Errors & Not Found" };

export default function Page() {
  const link = "text-blue-600 underline";
  return (
    <Lesson
      title="Errors & Not Found"
      summary={
        <>
          Special files handle the bad cases for you. <C>error.tsx</C> catches errors thrown in a route
          segment. <C>not-found.tsx</C> is shown when you call <C>notFound()</C> or the URL doesn&apos;t
          match anything. <C>catchError()</C> creates an error boundary you can wrap around any component.
        </>
      }
      files={[
        "src/app/learn/error-handling/broken/error.tsx",
        "src/app/learn/error-handling/broken/page.tsx",
        "src/app/learn/error-handling/users/[id]/page.tsx",
        "src/app/learn/error-handling/users/[id]/not-found.tsx",
        "src/app/learn/error-handling/_components/safe-boundary.tsx",
        "src/app/not-found.tsx",
      ]}
    >
      <Section title="1. error.tsx: route-level error boundary">
        <Code>{`
broken/
├── error.tsx   ← "use client". Shown when anything in this segment throws.
└── page.tsx    ← throws an Error
`}</Code>
        <Demo>
          <Link className={link} href="/learn/error-handling/broken">Open a page that crashes →</Link>
        </Demo>
      </Section>

      <Section title="2. notFound() + not-found.tsx">
        <p>
          Call <C>notFound()</C> when a record doesn&apos;t exist. Next.js renders the nearest{" "}
          <C>not-found.tsx</C> and sends a 404 status.
        </p>
        <Demo>
          <ul className="list-disc space-y-1 pl-5">
            <li><Link className={link} href="/learn/error-handling/users/1">/users/1 (exists)</Link></li>
            <li><Link className={link} href="/learn/error-handling/users/99">/users/99 (missing → local not-found.tsx)</Link></li>
            <li><Link className={link} href="/learn/this-page-does-not-exist">/learn/this-page-does-not-exist (global not-found.tsx)</Link></li>
          </ul>
        </Demo>
      </Section>

      <Section title="3. catchError(): component-level boundary">
        <p>
          Wrap any part of the UI so one broken widget doesn&apos;t take down the whole page. Only the part
          inside the boundary shows the fallback.
        </p>
        <Demo>
          <SafeBoundary title="Widget crashed">
            <BuggyWidget />
          </SafeBoundary>
          <p className="mt-3 text-xs text-zinc-500">↑ Only this box breaks. The rest of the page keeps working.</p>
        </Demo>
      </Section>

      <Section title="Also good to know">
        <ul className="list-disc space-y-1 pl-5">
          <li><C>global-error.tsx</C> catches errors in the root layout itself. It must render its own <C>&lt;html&gt;</C>.</li>
          <li><C>error.tsx</C> doesn&apos;t catch errors in the <C>layout.tsx</C> of its own segment. Those go to the parent.</li>
          <li>In production, error messages from the server are hidden. You get an <C>error.digest</C> ID to match with your server logs.</li>
        </ul>
      </Section>
    </Lesson>
  );
}
