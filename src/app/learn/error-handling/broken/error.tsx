"use client"; // Error boundaries must be Client Components.
import Link from "next/link";

export default function ErrorPage({ error, retry }: { error: unknown; retry: () => void }) {
  const message = error instanceof Error ? error.message : String(error);
  return (
    <div className="space-y-3 rounded-xl border-2 border-red-400 bg-red-50 p-6 dark:bg-red-950/30">
      <h2 className="text-xl font-bold text-red-700 dark:text-red-400">This is error.tsx</h2>
      <p className="font-mono text-sm">{message}</p>
      <div className="flex gap-3">
        {/* retry() renders the segment again, which helps when the error was temporary */}
        <button onClick={() => retry()} className="rounded-md bg-red-600 px-3 py-1.5 text-sm text-white">
          Try again
        </button>
        <Link href="/learn/error-handling" className="text-sm underline">← Back to the lesson</Link>
      </div>
    </div>
  );
}
