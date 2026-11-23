// loading.tsx = an automatic <Suspense fallback={<Loading />}> around page.tsx.
// It appears instantly when you navigate, while the page renders.
export default function Loading() {
  return (
    <div className="space-y-3">
      <div className="h-9 w-64 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-4 w-96 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
      <p className="text-sm text-zinc-500">⏳ This is loading.tsx</p>
    </div>
  );
}
