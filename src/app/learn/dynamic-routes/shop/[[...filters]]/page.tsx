/**
 * OPTIONAL CATCH-ALL: /learn/dynamic-routes/shop/[[...filters]]
 * Matches /shop AND /shop/anything/else.
 */
import { Suspense } from "react";
import Link from "next/link";

export default function ShopPage({ params }: PageProps<"/learn/dynamic-routes/shop/[[...filters]]">) {
  return (
    <div className="space-y-4">
      <Link href="/learn/dynamic-routes" className="text-sm text-blue-600 underline">← Back</Link>
      <h1 className="text-3xl font-bold">Shop (optional catch-all)</h1>
      <Suspense fallback={<p>Reading filters...</p>}>
        {/* Another way to read params inside Suspense: .then() right in the JSX */}
        {params.then(({ filters }) => (
          <div className="space-y-2">
            <p className="font-mono text-sm">params.filters = {JSON.stringify(filters ?? null)}</p>
            <p>{filters ? `Filtering by: ${filters.join(", ")}` : "No filters. Showing everything."}</p>
          </div>
        ))}
      </Suspense>
    </div>
  );
}
