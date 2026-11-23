import Link from "next/link";

// Shown when users/[id]/page.tsx calls notFound().
export default function UserNotFound() {
  return (
    <div className="space-y-2 rounded-xl border-2 border-amber-400 p-6">
      <h1 className="text-2xl font-bold">User not found 🕵️</h1>
      <p className="text-sm">This is <code>users/[id]/not-found.tsx</code>, the 404 page for this route only.</p>
      <Link href="/learn/error-handling" className="text-sm text-blue-600 underline">← Back</Link>
    </div>
  );
}
