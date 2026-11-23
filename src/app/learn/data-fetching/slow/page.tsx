// This page awaits slow data at the top level. There's no <Suspense> here,
// because loading.tsx next to this file already provides one.
import Link from "next/link";
import { connection } from "next/server";
import { delay } from "@/lib/data";

export default async function SlowPage() {
  await connection();
  await delay(2000);
  return (
    <div className="space-y-3">
      <h1 className="text-3xl font-bold">Done loading! 🎉</h1>
      <p>For 2 seconds you saw <code>loading.tsx</code>. Now you see <code>page.tsx</code>.</p>
      <Link href="/learn/data-fetching" className="text-blue-600 underline">← Back to the lesson</Link>
    </div>
  );
}
