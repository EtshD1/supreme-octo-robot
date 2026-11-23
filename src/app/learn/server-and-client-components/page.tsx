/**
 * This page is a SERVER COMPONENT (the default in the app/ folder).
 *  ✅ can be async and await data directly
 *  ✅ can use secrets (API keys, DB) because it never ships to the browser
 *  ❌ can't use useState, useEffect, onClick, or browser APIs
 */
import { cacheLife } from "next/cache";
import { getUsers } from "@/lib/data";
import { C, Code, Demo, Lesson, Section } from "../_components/lesson";
import { Counter } from "../_components/counter";
import { Toggle } from "./_components/toggle";
import { Greeting } from "./_components/greeting";

export const metadata = { title: "Server & Client Components" };

// Runs on the server only. Imagine this reading process.env.SECRET_KEY.
async function TeamList() {
  "use cache";
  cacheLife("hours");
  const users = await getUsers();
  console.log("👋 TeamList rendered. You'll see this log in your TERMINAL, not the browser.");
  return (
    <ul className="list-disc pl-5 text-sm">
      {users.map((u) => <li key={u.id}>{u.name}</li>)}
    </ul>
  );
}

export default function Page() {
  return (
    <Lesson
      title="Server & Client Components"
      summary={
        <>
          Every component in <C>app/</C> is a <b>Server Component</b> unless you mark its file with{" "}
          <C>&quot;use client&quot;</C>. Server Components fetch data and render HTML on the server, and they
          send no JavaScript to the browser. Client Components add interactivity like state, effects and
          click handlers.
        </>
      }
      files={[
        "src/app/learn/server-and-client-components/page.tsx",
        "src/app/learn/_components/counter.tsx",
        "src/app/learn/server-and-client-components/_components/toggle.tsx",
        "src/app/learn/server-and-client-components/_components/greeting.tsx",
      ]}
    >
      <Section title="1. A Client Component">
        <p>Add <C>&quot;use client&quot;</C> at the top of the file. Then you can use hooks and event handlers.</p>
        <Code>{`
"use client";
import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
`}</Code>
        <Demo><Counter /></Demo>
      </Section>

      <Section title="2. Server → Client: pass props">
        <p>
          A Server Component can render a Client Component and pass it props. Props must be{" "}
          <b>serializable</b>: strings, numbers, plain objects, arrays, Dates, Promises. Functions aren&apos;t
          allowed (except Server Actions).
        </p>
        <Demo><Greeting name="Ada" visits={3} /></Demo>
      </Section>

      <Section title="3. Client wrapping Server: the children pattern">
        <p>
          A Client Component can&apos;t <i>import</i> a Server Component. It <b>can</b> receive one as{" "}
          <C>children</C>. Below, the toggle runs in the browser. The team list inside it was rendered on the
          server.
        </p>
        <Code>{`
<Toggle>            {/* client: has state */}
  <TeamList />      {/* server: fetched data, no JS shipped */}
</Toggle>
`}</Code>
        <Demo>
          <Toggle>
            <TeamList />
          </Toggle>
        </Demo>
      </Section>

      <Section title="Rule of thumb">
        <p>
          Start with Server Components. Add <C>&quot;use client&quot;</C> only on the small leaf components that
          need interactivity, like buttons, inputs and toggles. That keeps the JavaScript you send to the
          browser small.
        </p>
      </Section>
    </Lesson>
  );
}
