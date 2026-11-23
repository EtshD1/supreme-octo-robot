// GLOBAL 404 page: shown for any URL that doesn't match a route.
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md space-y-3 py-24 text-center">
      <p className="text-6xl font-bold">404</p>
      <p>This is <code>src/app/not-found.tsx</code>. There&apos;s no page at this URL.</p>
      <Link href="/learn" className="text-blue-600 underline">Back to the lessons</Link>
    </div>
  );
}
