/**
 * LAYOUT for everything under /learn.
 * A layout wraps its pages and STAYS MOUNTED while you navigate between them,
 * so this sidebar never re-renders or loses state when you switch lessons.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { groups, lessons } from "./lessons";
import { NavLink } from "./_components/nav-link";

// Metadata in a layout applies to every page below it.
// `template` lets child pages set just "Caching" and get "Caching | Next.js Lessons".
export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"), // your real domain in production (used for OG image URLs)
  title: { template: "%s | Next.js Lessons", default: "Next.js Lessons" },
  description: "Small, runnable examples of every core Next.js feature.",
};

export default function LearnLayout({ children }: LayoutProps<"/learn">) {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-8 md:flex-row">
      <aside className="shrink-0 md:w-60">
        <Link href="/learn" className="mb-4 block text-lg font-bold">
          📚 Next.js Lessons
        </Link>
        <nav className="space-y-5 text-sm">
          {groups.map((group) => (
            <div key={group}>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-zinc-500">{group}</p>
              <ul className="space-y-0.5">
                {lessons
                  .filter((l) => l.group === group)
                  .map((l) => (
                    <li key={l.slug}>
                      <NavLink href={`/learn/${l.slug}`}>{l.title}</NavLink>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
