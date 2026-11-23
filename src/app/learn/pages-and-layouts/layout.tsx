/**
 * NESTED LAYOUT
 * This layout sits inside the /learn layout, which sits inside the root layout:
 *
 *   app/layout.tsx  →  app/learn/layout.tsx  →  app/learn/pages-and-layouts/layout.tsx  →  page.tsx
 *
 * Layouts keep their state when you move between child pages.
 */
import Link from "next/link";
import { Counter } from "../_components/counter";
import { Lesson } from "../_components/lesson";

export default function PagesLayout({ children }: LayoutProps<"/learn/pages-and-layouts">) {
  return (
    <Lesson
      title="Pages, Layouts & Templates"
      summary={
        <>
          A folder becomes a URL segment. A <b>page.tsx</b> inside it makes that URL public. A{" "}
          <b>layout.tsx</b> wraps the page and stays mounted while you navigate. A{" "}
          <b>template.tsx</b> also wraps the page, but it re-mounts on every navigation.
        </>
      }
      files={[
        "src/app/learn/pages-and-layouts/layout.tsx",
        "src/app/learn/pages-and-layouts/template.tsx",
        "src/app/learn/pages-and-layouts/page.tsx",
        "src/app/learn/pages-and-layouts/first/page.tsx",
        "src/app/learn/pages-and-layouts/second/page.tsx",
      ]}
    >
      <div className="space-y-4 rounded-xl border-2 border-emerald-400 p-4">
        <p className="text-sm font-semibold text-emerald-600">layout.tsx (keeps its state)</p>
        <Counter label="Layout counter" />
        <nav className="flex gap-3 text-sm text-blue-600 underline">
          <Link href="/learn/pages-and-layouts">Index page</Link>
          <Link href="/learn/pages-and-layouts/first">First page</Link>
          <Link href="/learn/pages-and-layouts/second">Second page</Link>
        </nav>
        {children}
      </div>
    </Lesson>
  );
}
