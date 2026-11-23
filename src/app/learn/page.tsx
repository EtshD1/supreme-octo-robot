import Link from "next/link";
import { groups, lessons } from "./lessons";
import { C } from "./_components/lesson";

export default function LearnIndex() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold">Learn Next.js by example</h1>
        <p className="max-w-2xl leading-7 text-zinc-600 dark:text-zinc-400">
          Each lesson is a real page in this app. Read the explanation, try the demo, then open the
          files listed at the top of the lesson. Everything lives in <C>src/app/learn</C>, and the fake
          database is in <C>src/lib/data.ts</C>.
        </p>
      </header>
      {groups.map((group) => (
        <section key={group}>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500">{group}</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {lessons
              .filter((l) => l.group === group)
              .map((l) => (
                <Link
                  key={l.slug}
                  href={`/learn/${l.slug}`}
                  className="rounded-lg border border-zinc-200 p-4 hover:border-blue-500 dark:border-zinc-800"
                >
                  <p className="font-medium">{l.title}</p>
                  <p className="font-mono text-xs text-zinc-500">/learn/{l.slug}</p>
                </Link>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
