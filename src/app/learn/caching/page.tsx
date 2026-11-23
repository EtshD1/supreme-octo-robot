import { Suspense } from "react";
import { connection } from "next/server";
import { cacheLife, cacheTag } from "next/cache";
import { getUsers } from "@/lib/data";
import { C, Code, Demo, Lesson, Note, Section, Skeleton } from "../_components/lesson";
import { refreshClock } from "./actions";

export const metadata = { title: "Caching" };

// ── DATA-LEVEL cache: cache what a function returns ────────────────────
async function getCachedUsers() {
  "use cache";
  cacheLife("hours"); // how long the result stays fresh
  cacheTag("users");  // a label so you can clear it on demand
  return getUsers();
}

// ── UI-LEVEL cache: cache a whole component's output ──────────────────
async function CachedClock() {
  "use cache";
  cacheLife("hours");
  cacheTag("clock");
  return <Clock label="Cached clock" time={new Date().toLocaleTimeString()} />;
}

// ── NOT cached: runs again on every request ─────────────────────────
async function LiveClock() {
  await connection();
  return <Clock label="Live clock" time={new Date().toLocaleTimeString()} />;
}

async function UserCount() {
  const users = await getCachedUsers();
  return <p className="text-sm">getCachedUsers() returned <b>{users.length}</b> users (instantly after the first call).</p>;
}

export default function Page() {
  return (
    <Lesson
      title="Caching with use cache"
      summary={
        <>
          With Cache Components turned on, <b>nothing is cached unless you ask</b>. Add the{" "}
          <C>&quot;use cache&quot;</C> directive to a function or component, set how long it stays fresh with{" "}
          <C>cacheLife()</C>, label it with <C>cacheTag()</C>, and clear it after a change with{" "}
          <C>updateTag()</C> or <C>revalidateTag()</C>.
        </>
      }
      files={["src/app/learn/caching/page.tsx", "src/app/learn/caching/actions.ts"]}
    >
      <Section title="1. Cached vs. not cached">
        <p>Reload the page a few times. The cached clock stays the same. The live clock changes every time.</p>
        <Demo>
          <div className="grid gap-3 sm:grid-cols-2">
            <CachedClock />
            <Suspense fallback={<Skeleton />}>
              <LiveClock />
            </Suspense>
          </div>
          {/* A form can call a Server Action directly. No API route, no fetch(). */}
          <form action={refreshClock} className="mt-4">
            <button className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700">
              updateTag(&quot;clock&quot;): clear the cached clock
            </button>
          </form>
        </Demo>
      </Section>

      <Section title="2. Data-level caching">
        <Code>{`
async function getCachedUsers() {
  "use cache";
  cacheLife("hours");
  cacheTag("users");
  return db.users.findMany();
}
`}</Code>
        <Demo>
          <UserCount />
        </Demo>
        <p>
          The function&apos;s <b>arguments are part of the cache key</b>. So <C>getUser(&quot;1&quot;)</C>{" "}
          and <C>getUser(&quot;2&quot;)</C> are cached separately.
        </p>
      </Section>

      <Section title="3. cacheLife() profiles">
        <Code>{`
cacheLife("seconds")  // changes all the time
cacheLife("minutes")
cacheLife("hours")
cacheLife("days")
cacheLife("weeks")
cacheLife("max")      // almost never changes
cacheLife({ stale: 60, revalidate: 300, expire: 3600 }) // custom, in seconds
`}</Code>
      </Section>

      <Section title="4. Clearing the cache">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <C>updateTag(&quot;posts&quot;)</C>: only in Server Actions. The user sees their own change right
            away (&quot;read your own writes&quot;).
          </li>
          <li>
            <C>revalidateTag(&quot;posts&quot;, &quot;max&quot;)</C>: works in Server Actions <i>and</i>{" "}
            Route Handlers (for example, a CMS webhook). It serves the old data while fetching new data in
            the background.
          </li>
          <li><C>revalidatePath(&quot;/blog&quot;)</C>: clears everything cached for one URL.</li>
          <li><C>refresh()</C>: re-renders the current page without clearing any tagged cache.</li>
        </ul>
        <Note>
          Reading <C>cookies()</C> or <C>headers()</C> inside <C>&quot;use cache&quot;</C> isn&apos;t
          allowed. The cache is shared by every user. Read them outside and pass the values in as arguments,
          or use <C>&quot;use cache: private&quot;</C>.
        </Note>
      </Section>
    </Lesson>
  );
}

function Clock({ label, time }: { label: string; time: string }) {
  return (
    <div className="rounded-lg bg-zinc-100 p-3 dark:bg-zinc-900">
      <p className="text-xs font-semibold uppercase">{label}</p>
      <p className="font-mono text-2xl">{time}</p>
    </div>
  );
}
