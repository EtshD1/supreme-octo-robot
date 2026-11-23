/**
 * ONE PAGE, THREE KINDS OF RENDERING (Partial Prerendering)
 *
 *  STATIC   plain JSX, no data            → rendered once at BUILD time
 *  CACHED   "use cache"                   → rendered at build time, refreshed on a schedule
 *  DYNAMIC  connection(), cookies(), etc. → rendered on EVERY request and streamed in
 *
 * Next.js sends the static + cached parts immediately (the "static shell"),
 * with <Suspense> fallbacks where the dynamic parts will stream in.
 */
import { Suspense } from "react";
import { connection } from "next/server";
import { cacheLife } from "next/cache";
import { delay } from "@/lib/data";
import { C, Code, Demo, Lesson, Note, Section, Skeleton } from "../_components/lesson";

export const metadata = { title: "Rendering" };

// CACHED: same result for everyone, refreshed at most every minute.
async function CachedTime() {
  "use cache";
  cacheLife("minutes");
  return <Stamp color="amber" label="Cached (use cache)" time={new Date().toLocaleTimeString()} />;
}

// DYNAMIC: connection() says "wait for a real request". New value every reload.
async function DynamicTime() {
  await connection();
  return <Stamp color="rose" label="Dynamic (connection)" time={new Date().toLocaleTimeString()} />;
}

// STREAMING: a slow dynamic component. The rest of the page doesn't wait for it.
async function SlowComponent() {
  await connection();
  await delay(2500);
  return <Stamp color="violet" label="Slow + streamed (2.5s)" time={new Date().toLocaleTimeString()} />;
}

export default function Page() {
  return (
    <Lesson
      title="Static, Dynamic & Streaming"
      summary={
        <>
          You don&apos;t pick &quot;static&quot; or &quot;dynamic&quot; for a whole page anymore. With Cache
          Components, each <i>component</i> is static, cached or dynamic. Next.js sends what it can right away
          and <b>streams</b> the rest. This is called <b>Partial Prerendering</b>.
        </>
      }
      files={["src/app/learn/rendering/page.tsx", "next.config.ts (cacheComponents: true)"]}
    >
      <Demo label="Reload the page a few times and compare">
        <div className="grid gap-3 sm:grid-cols-2">
          {/* STATIC: no data, so it's baked into the HTML at build time. */}
          <Stamp color="emerald" label="Static (build time)" time="This text never changes" />

          <CachedTime />

          <Suspense fallback={<Skeleton text="Waiting for request..." />}>
            <DynamicTime />
          </Suspense>

          <Suspense fallback={<Skeleton text="Streaming slow component..." />}>
            <SlowComponent />
          </Suspense>
        </div>
      </Demo>

      <Section title="What to remember">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Static</b>: the default for anything that doesn&apos;t read data.</li>
          <li><b>Cached</b>: add <C>&quot;use cache&quot;</C> + <C>cacheLife()</C>. It&apos;s included in the static shell.</li>
          <li>
            <b>Dynamic</b>: anything that reads <C>cookies()</C>, <C>headers()</C>, <C>searchParams</C>,{" "}
            <C>connection()</C> or uncached data. It <u>must</u> sit inside <C>&lt;Suspense&gt;</C>.
          </li>
          <li><b>Streaming</b>: each Suspense boundary shows up as soon as it&apos;s ready.</li>
        </ul>
        <Code>{`
<Suspense fallback={<Skeleton />}>   // fallback goes in the static shell
  <DynamicThing />                   // streams in at request time
</Suspense>
`}</Code>
        <Note>
          Run <C>npm run build</C> and look at the route table. <b>○</b> means fully static. <b>◐</b> means
          partially prerendered: a static shell plus streamed dynamic parts.
        </Note>
      </Section>
    </Lesson>
  );
}

const colors = {
  emerald: "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30",
  amber: "border-amber-400 bg-amber-50 dark:bg-amber-950/30",
  rose: "border-rose-400 bg-rose-50 dark:bg-rose-950/30",
  violet: "border-violet-400 bg-violet-50 dark:bg-violet-950/30",
};

function Stamp({ color, label, time }: { color: keyof typeof colors; label: string; time: string }) {
  return (
    <div className={`rounded-lg border-l-4 p-3 ${colors[color]}`}>
      <p className="text-xs font-semibold uppercase">{label}</p>
      <p className="font-mono text-lg">{time}</p>
    </div>
  );
}
