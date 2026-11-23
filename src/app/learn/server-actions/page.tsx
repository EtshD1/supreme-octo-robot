import { cacheLife, cacheTag } from "next/cache";
import { getMessages } from "@/lib/data";
import { C, Code, Demo, Lesson, Section } from "../_components/lesson";
import { GuestbookForm } from "./_components/guestbook-form";
import { clearGuestbook } from "./actions";

export const metadata = { title: "Server Actions & Forms" };

// Reading: cached and tagged "guestbook". The Server Action clears this tag after each write.
async function Messages() {
  "use cache";
  cacheLife("hours");
  cacheTag("guestbook");
  const messages = await getMessages();

  if (messages.length === 0) return <p className="text-sm text-zinc-500">No messages yet.</p>;
  return (
    <ul className="space-y-2">
      {messages.map((m) => (
        <li key={m.id} className="rounded-lg bg-zinc-100 p-3 text-sm dark:bg-zinc-900">
          <b>{m.author}</b>: {m.text}
        </li>
      ))}
    </ul>
  );
}

export default function Page() {
  return (
    <Lesson
      title="Server Actions & Forms"
      summary={
        <>
          A <b>Server Action</b> is an async function marked <C>&quot;use server&quot;</C>. Pass it to{" "}
          <C>&lt;form action=&#123;...&#125;&gt;</C> and Next.js sends the form to the server for you. You
          don&apos;t need an API route or <C>fetch()</C>. The form even works before JavaScript has loaded.
        </>
      }
      files={[
        "src/app/learn/server-actions/actions.ts",
        "src/app/learn/server-actions/_components/guestbook-form.tsx",
        "src/app/learn/server-actions/page.tsx",
      ]}
    >
      <Section title="The flow">
        <Code>{`
1. User submits <form action={postMessage}>
2. postMessage(formData) runs ON THE SERVER: validate → save → updateTag("guestbook")
3. Next.js re-renders the page with fresh data and sends it back, all in ONE round trip
4. useActionState gives the form the returned { ok, message, errors }
`}</Code>
      </Section>

      <Section title="Guestbook demo">
        <Demo>
          <div className="grid gap-6 md:grid-cols-2">
            <GuestbookForm />
            <div className="space-y-3">
              <Messages />
              <form action={clearGuestbook}>
                <button className="text-xs text-red-600 underline">Clear all messages</button>
              </form>
            </div>
          </div>
        </Demo>
        <p className="text-sm">
          Try submitting an empty form to see server-side validation. Messages live in server memory, so
          they reset when you restart the dev server.
        </p>
      </Section>

      <Section title="Hooks that help">
        <ul className="list-disc space-y-1 pl-5">
          <li><C>useActionState(action, initialState)</C>: gives you the returned state and a <C>pending</C> flag.</li>
          <li><C>useFormStatus()</C>: called inside a form&apos;s child to read <C>pending</C> (for a submit button).</li>
          <li><C>useOptimistic()</C>: shows the result right away, before the server answers.</li>
        </ul>
        <p>
          After a mutation you can also call <C>redirect(&quot;/somewhere&quot;)</C> from the action to send
          the user to another page.
        </p>
      </Section>
    </Lesson>
  );
}
