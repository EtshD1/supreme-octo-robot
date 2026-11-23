"use client";
import { useState } from "react";

export function BuggyWidget() {
  const [broken, setBroken] = useState(false);
  if (broken) throw new Error("BuggyWidget crashed while rendering!");
  return (
    <button onClick={() => setBroken(true)} className="rounded-md bg-red-600 px-3 py-1.5 text-sm text-white">
      Click to crash this widget
    </button>
  );
}
