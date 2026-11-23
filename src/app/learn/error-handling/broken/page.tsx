import { Suspense } from "react";
import { connection } from "next/server";

// This component throws on every request. connection() makes sure it only runs
// at request time, so `next build` doesn't fail trying to pre-render it.
async function Crash(): Promise<React.ReactNode> {
  await connection();
  throw new Error("💥 Something broke while loading this page!");
}

export default function BrokenPage() {
  return (
    <Suspense fallback={<p>Loading something fragile...</p>}>
      <Crash />
    </Suspense>
  );
}
