"use client";
import { useState } from "react";

// `children` here can be Server Component output. It arrives already rendered.
export function Toggle({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="space-y-3">
      <button onClick={() => setOpen(!open)} className="rounded-md border px-3 py-1.5 text-sm">
        {open ? "Hide" : "Show"} team (client state)
      </button>
      {open && children}
    </div>
  );
}
