/**
 * Shared UI for every lesson page.
 *
 * 💡 This folder starts with an underscore (`_components`).
 * That makes it a PRIVATE FOLDER: Next.js will never turn it into a route,
 * so it's a safe place to keep components next to the pages that use them.
 */
import type { ReactNode } from "react";

export function Lesson({
  title,
  summary,
  files = [],
  children,
}: {
  title: string;
  summary: ReactNode;
  files?: string[];
  children: ReactNode;
}) {
  return (
    <article className="space-y-10">
      <header className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <div className="max-w-2xl leading-7 text-zinc-600 dark:text-zinc-400">{summary}</div>
        {files.length > 0 && (
          <div className="rounded-lg bg-zinc-100 p-4 text-sm dark:bg-zinc-900">
            <p className="mb-2 font-semibold">📂 Open these files to follow along</p>
            <ul className="space-y-1 font-mono text-xs">
              {files.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        )}
      </header>
      {children}
    </article>
  );
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="space-y-3 leading-7 text-zinc-700 dark:text-zinc-300">{children}</div>
    </section>
  );
}

export function Demo({ label = "Live demo", children }: { label?: string; children: ReactNode }) {
  return (
    <div className="relative rounded-xl border-2 border-dashed border-blue-300 p-5 pt-7 dark:border-blue-800">
      <span className="absolute -top-3 left-4 rounded bg-blue-600 px-2 py-0.5 text-xs font-semibold text-white">
        {label}
      </span>
      {children}
    </div>
  );
}

export function Code({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm text-zinc-100">
      <code>{children.trim()}</code>
    </pre>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-lg border-l-4 border-amber-400 bg-amber-50 p-3 text-sm dark:bg-amber-950/40">
      {children}
    </p>
  );
}

/** Inline code */
export function C({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-[0.85em] dark:bg-zinc-800">
      {children}
    </code>
  );
}

export function Skeleton({ text = "Loading..." }: { text?: string }) {
  return <p className="animate-pulse text-zinc-400">⏳ {text}</p>;
}
