"use client";
import { useState } from "react";

// Plain client-side fetch() to our own Route Handlers.
export function ApiTester() {
  const [name, setName] = useState("Linus Torvalds");
  const [result, setResult] = useState<string>("// response will appear here");

  async function call(method: "GET" | "POST") {
    const res = await fetch("/api/users", {
      method,
      headers: { "Content-Type": "application/json" },
      body: method === "POST" ? JSON.stringify({ name }) : undefined,
    });
    const data = await res.json();
    setResult(`${method} /api/users → ${res.status}\n\n${JSON.stringify(data, null, 2)}`);
  }

  const btn = "rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700";
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <button className={btn} onClick={() => call("GET")}>GET /api/users</button>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-md border border-zinc-300 bg-transparent px-3 py-1.5 text-sm dark:border-zinc-700"
        />
        <button className={btn} onClick={() => call("POST")}>POST /api/users</button>
      </div>
      <pre className="max-h-64 overflow-auto rounded-lg bg-zinc-900 p-3 text-xs text-zinc-100">{result}</pre>
    </div>
  );
}
