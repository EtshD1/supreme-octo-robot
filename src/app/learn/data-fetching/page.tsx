import { Suspense } from "react";
import Link from "next/link";
import { getPosts, getUser, getUsers } from "@/lib/data";
import { C, Code, Demo, Lesson, Section, Skeleton } from "../_components/lesson";
import { PostList } from "./_components/post-list";

export const metadata = { title: "Data Fetching" };

// ── 1. Fetch in an async Server Component ─────────────────────────────
// No useEffect, no loading state to manage. Just await.
async function UserList() {
  const users = await getUsers(); // could be fetch(), a DB query, an ORM call...
  return (
    <ul className="list-disc pl-5 text-sm">
      {users.map((u) => <li key={u.id}>{u.name} ({u.email})</li>)}
    </ul>
  );
}

// Small helper that measures how long some async work takes.
async function timed<T>(work: () => Promise<T>) {
  const start = performance.now();
  const result = await work();
  return { result, ms: Math.round(performance.now() - start) };
}

// ── 2a. Sequential: each await waits for the one before it ─────────────
async function Sequential() {
  const { result, ms } = await timed(async () => {
    const user = await getUser("1"); // 500ms
    const posts = await getPosts();  // +800ms, because it only starts after getUser finishes
    return { user, posts };
  });
  return <Timing label="Sequential" ms={ms} detail={`${result.user?.name} + ${result.posts.length} posts`} />;
}

// ── 2b. Parallel: start both requests, then await them together ───────
async function Parallel() {
  const { result, ms } = await timed(() =>
    Promise.all([getUser("1"), getPosts()]) // both start now. Total ≈ max(500, 800)
  );
  const [user, posts] = result;
  return <Timing label="Parallel" ms={ms} detail={`${user?.name} + ${posts.length} posts`} />;
}

export default function Page() {
  // ── 3. Start a request on the server, finish it in a Client Component ──
  // Note: no `await`. We pass the Promise itself down as a prop.
  const postsPromise = getPosts();

  return (
    <Lesson
      title="Data Fetching"
      summary={
        <>
          In the App Router you fetch data <b>directly inside Server Components</b> with{" "}
          <C>async/await</C>. Wrap slow parts in <C>&lt;Suspense&gt;</C> so the rest of the page shows up
          right away.
        </>
      }
      files={[
        "src/app/learn/data-fetching/page.tsx",
        "src/app/learn/data-fetching/_components/post-list.tsx",
        "src/app/learn/data-fetching/slow/page.tsx",
        "src/app/learn/data-fetching/slow/loading.tsx",
        "src/lib/data.ts",
      ]}
    >
      <Section title="1. async Server Components">
        <Code>{`
async function UserList() {
  const users = await getUsers();   // or: await fetch("https://api.example.com/users")
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}

<Suspense fallback={<p>Loading...</p>}>
  <UserList />
</Suspense>
`}</Code>
        <Demo>
          <Suspense fallback={<Skeleton text="Loading users..." />}>
            <UserList />
          </Suspense>
        </Demo>
      </Section>

      <Section title="2. Sequential vs. parallel requests">
        <p>
          When requests don&apos;t depend on each other, start them together with <C>Promise.all</C>.
          Otherwise you build a slow &quot;waterfall&quot;.
        </p>
        <Demo>
          <div className="grid gap-3 sm:grid-cols-2">
            <Suspense fallback={<Skeleton text="Sequential..." />}><Sequential /></Suspense>
            <Suspense fallback={<Skeleton text="Parallel..." />}><Parallel /></Suspense>
          </div>
        </Demo>
      </Section>

      <Section title="3. Streaming a Promise to a Client Component with use()">
        <p>
          Start the request on the server, pass the <b>Promise</b> as a prop, and unwrap it on the client
          with React&apos;s <C>use()</C> hook. The nearest <C>&lt;Suspense&gt;</C> shows the fallback while
          it waits.
        </p>
        <Demo>
          <Suspense fallback={<Skeleton text="Streaming posts to the client..." />}>
            <PostList postsPromise={postsPromise} />
          </Suspense>
        </Demo>
      </Section>

      <Section title="4. Route-level loading with loading.tsx">
        <p>
          Put a <C>loading.tsx</C> file next to a <C>page.tsx</C> and Next.js wraps the page in{" "}
          <C>&lt;Suspense&gt;</C> for you. Open{" "}
          <Link href="/learn/data-fetching/slow" className="text-blue-600 underline">/learn/data-fetching/slow</Link>
          . That page takes 2 seconds to load.
        </p>
      </Section>

      <Section title="5. Fetching in the browser">
        <p>
          You can still fetch from Client Components (with <C>useEffect</C>, SWR or React Query). You usually
          call one of your own <Link href="/learn/route-handlers" className="text-blue-600 underline">Route Handlers</Link>{" "}
          for that. Use it for data that changes while the user is on the page, like live search.
        </p>
      </Section>
    </Lesson>
  );
}

function Timing({ label, ms, detail }: { label: string; ms: number; detail: string }) {
  return (
    <div className="rounded-lg bg-zinc-100 p-3 dark:bg-zinc-900">
      <p className="text-xs font-semibold uppercase">{label}</p>
      <p className="font-mono text-2xl">{ms}ms</p>
      <p className="text-xs text-zinc-500">{detail}</p>
    </div>
  );
}
