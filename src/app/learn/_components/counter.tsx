"use client";
/**
 * A CLIENT COMPONENT.
 * The "use client" line above lets this component use state, effects and
 * event handlers. It is still rendered to HTML on the server first, then
 * "hydrated" in the browser so the button works.
 */
import { useState } from "react";

export function Counter({ label = "Count" }: { label?: string }) {
  const [count, setCount] = useState(0);
  return (
    <button
      onClick={() => setCount((c) => c + 1)}
      className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
    >
      {label}: {count}
    </button>
  );
}
