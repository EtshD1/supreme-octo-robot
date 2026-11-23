"use client";
import { catchError, type ErrorInfo } from "next/error";

// The fallback gets (props, { error, retry, reset }).
function Fallback({ title }: { title: string }, { error, reset }: ErrorInfo) {
  return (
    <div className="space-y-2 rounded-lg border-2 border-red-400 p-4">
      <p className="font-semibold text-red-600">{title}</p>
      <p className="font-mono text-xs">{error instanceof Error ? error.message : String(error)}</p>
      {/* reset() just re-renders the children. Use retry() to also re-fetch server data. */}
      <button onClick={() => reset()} className="rounded-md border px-3 py-1 text-sm">Reset widget</button>
    </div>
  );
}

// catchError turns the fallback into a wrapper component: <SafeBoundary title="...">children</SafeBoundary>
export const SafeBoundary = catchError(Fallback);
