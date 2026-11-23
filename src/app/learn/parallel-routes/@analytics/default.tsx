// Rendered when the current URL has no matching page in the @analytics slot
// (for example, a hard reload on /learn/parallel-routes/settings).
export default function Default() {
  return <p className="text-sm text-zinc-500">@analytics/default.tsx (no page for this URL)</p>;
}
