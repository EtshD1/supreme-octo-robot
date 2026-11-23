/**
 * PARALLEL ROUTES
 * Folders that start with @ are "slots": @team and @analytics.
 * Each slot is passed to this layout as a prop with the same name, next to `children`.
 * Every slot loads on its own, and each one can have its own loading.tsx and error.tsx.
 */
import Link from "next/link";
import { C, Lesson } from "../_components/lesson";

export default function ParallelLayout({ children, team, analytics }: LayoutProps<"/learn/parallel-routes">) {
  return (
    <Lesson
      title="Parallel Routes"
      summary={
        <>
          Parallel routes render several pages in one layout at the same time. Each <C>@folder</C> becomes a
          prop on the layout. This is great for dashboards: each panel loads and fails on its own.
        </>
      }
      files={[
        "src/app/learn/parallel-routes/layout.tsx",
        "src/app/learn/parallel-routes/@team/page.tsx",
        "src/app/learn/parallel-routes/@analytics/page.tsx",
        "src/app/learn/parallel-routes/@analytics/loading.tsx",
        "src/app/learn/parallel-routes/@team/default.tsx",
      ]}
    >
      <nav className="flex gap-3 text-sm text-blue-600 underline">
        <Link href="/learn/parallel-routes">Dashboard</Link>
        <Link href="/learn/parallel-routes/settings">Settings (sub-page)</Link>
      </nav>
      <div className="rounded-xl border-2 border-zinc-300 p-4 dark:border-zinc-700">
        <p className="mb-2 text-xs font-semibold text-zinc-500">children</p>
        {children}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border-2 border-sky-400 p-4">
          <p className="mb-2 text-xs font-semibold text-sky-600">@team</p>
          {team}
        </div>
        <div className="rounded-xl border-2 border-pink-400 p-4">
          <p className="mb-2 text-xs font-semibold text-pink-600">@analytics</p>
          {analytics}
        </div>
      </div>
    </Lesson>
  );
}
