/**
 * TEMPLATE
 * Same idea as a layout, except Next.js creates a NEW instance of it every time
 * you navigate. Its state resets. Handy for enter animations or per-page logging.
 */
import { Counter } from "../_components/counter";

export default function PagesTemplate({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-4 rounded-xl border-2 border-purple-400 p-4">
      <p className="text-sm font-semibold text-purple-600">template.tsx (resets on navigation)</p>
      <Counter label="Template counter" />
      <div className="rounded-xl border-2 border-zinc-300 p-4 dark:border-zinc-700">{children}</div>
    </div>
  );
}
