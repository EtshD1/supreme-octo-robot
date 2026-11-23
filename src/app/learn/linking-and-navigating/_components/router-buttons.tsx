"use client";
import { useRouter } from "next/navigation"; // ⚠️ next/navigation, NOT next/router (that's the old Pages Router)

export function RouterButtons() {
  const router = useRouter();
  const btn = "rounded-md border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900";

  return (
    <div className="flex flex-wrap gap-2">
      <button className={btn} onClick={() => router.push("/learn/dynamic-routes")}>
        router.push(&quot;/learn/dynamic-routes&quot;)
      </button>
      <button className={btn} onClick={() => router.back()}>router.back()</button>
      {/* refresh() re-runs the Server Components for this page without losing client state */}
      <button className={btn} onClick={() => router.refresh()}>router.refresh()</button>
    </div>
  );
}
