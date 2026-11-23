import { connection } from "next/server";
import { delay } from "@/lib/data";

// This slot is slow on purpose, and it renders on every request.
export default async function AnalyticsSlot() {
  await connection(); // "render this at request time, not at build time"
  await delay(2000);
  return (
    <ul className="space-y-1 text-sm">
      <li>📈 Visitors today: 1,284</li>
      <li>⏱️ Avg. session: 3m 12s</li>
      <li>🛒 Conversions: 4.2%</li>
    </ul>
  );
}
