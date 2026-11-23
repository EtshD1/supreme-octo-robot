"use client";
import { useState } from "react";

export function Greeting({ name, visits }: { name: string; visits: number }) {
  const [width, setWidth] = useState<number | null>(null);

  return (
    <div className="flex flex-wrap items-center gap-3 text-sm">
      <p>
        Hi <b>{name}</b>, you have <b>{visits}</b> visits (these props came from the server).
      </p>
      {/* `window` only exists in the browser. It's safe to read in an event handler. */}
      <button onClick={() => setWidth(window.innerWidth)} className="rounded-md border px-3 py-1.5">
        {width ? `Your window is ${width}px wide` : "Measure my window (browser API)"}
      </button>
    </div>
  );
}
