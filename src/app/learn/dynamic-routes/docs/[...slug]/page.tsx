/**
 * CATCH-ALL ROUTE: /learn/dynamic-routes/docs/[...slug]
 *
 * There's no generateStaticParams here, so the slug is only known at request time.
 * With Cache Components turned on, request-time data has to sit inside <Suspense>.
 * Everything outside the boundary is pre-rendered into a fast "static shell".
 */
import { Suspense } from "react";
import Link from "next/link";

export default function DocsPage({ params }: PageProps<"/learn/dynamic-routes/docs/[...slug]">) {
  return (
    <div className="space-y-4">
      <Link href="/learn/dynamic-routes" className="text-sm text-blue-600 underline">← Back</Link>
      <h1 className="text-3xl font-bold">Docs (catch-all)</h1>
      {/* We pass the params PROMISE down and await it inside the boundary. */}
      <Suspense fallback={<p>Loading breadcrumbs...</p>}>
        <Breadcrumbs params={params} />
      </Suspense>
    </div>
  );
}

async function Breadcrumbs({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  return (
    <div className="space-y-2">
      <p className="font-mono text-sm">params.slug = {JSON.stringify(slug)}</p>
      <p className="text-lg">{["docs", ...slug].join(" / ")}</p>
    </div>
  );
}
