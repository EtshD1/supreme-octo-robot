/**
 * PAGE for /learn/pages-and-layouts
 * A page is just a React component exported as `default`.
 * By default it's a SERVER component: it runs on the server and sends HTML.
 */
export default function Page() {
  return (
    <div className="space-y-2 text-sm">
      <p className="font-semibold">page.tsx (index)</p>
      <p>
        Click both counters a few times, then switch to the First or Second page. The layout counter
        keeps its number. The template counter goes back to 0.
      </p>
    </div>
  );
}
