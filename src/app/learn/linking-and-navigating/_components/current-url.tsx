"use client";
import { usePathname, useSearchParams } from "next/navigation";

export function CurrentUrl() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 font-mono text-sm">
      <dt className="text-zinc-500">usePathname()</dt>
      <dd>{pathname}</dd>
      <dt className="text-zinc-500">useSearchParams()</dt>
      <dd>{searchParams.toString() || "(empty, try the ?tab=demo link above)"}</dd>
    </dl>
  );
}
