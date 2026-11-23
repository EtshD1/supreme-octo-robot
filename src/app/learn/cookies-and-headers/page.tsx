/**
 * RUNTIME APIs: cookies() and headers()
 * They read the incoming request, so they only work at request time,
 * inside <Suspense>. Everything else on the page can still be pre-rendered.
 */
import { Suspense } from "react";
import { cookies, headers } from "next/headers";
import { C, Code, Demo, Lesson, Note, Section, Skeleton } from "../_components/lesson";
import { clearTheme, setTheme } from "./actions";

export const metadata = { title: "Cookies & Headers" };

async function ThemeCookie() {
  const cookieStore = await cookies();
  const theme = cookieStore.get("lesson-theme")?.value;
  return (
    <p className="text-sm">
      Cookie <C>lesson-theme</C> = <b>{theme ?? "(not set)"}</b>
    </p>
  );
}

async function RequestHeaders() {
  const h = await headers();
  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 break-all font-mono text-xs">
      <dt className="text-zinc-500">user-agent</dt><dd>{h.get("user-agent")}</dd>
      <dt className="text-zinc-500">accept-language</dt><dd>{h.get("accept-language")}</dd>
      <dt className="text-zinc-500">host</dt><dd>{h.get("host")}</dd>
    </dl>
  );
}

export default function Page() {
  const btn = "rounded-md border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900";
  return (
    <Lesson
      title="Cookies & Headers"
      summary={
        <>
          <C>cookies()</C> and <C>headers()</C> from <C>next/headers</C> read the incoming request on the
          server. They&apos;re <b>async</b>, and they make the component that calls them render at request
          time. That&apos;s why each one sits in its own <C>&lt;Suspense&gt;</C>.
        </>
      }
      files={["src/app/learn/cookies-and-headers/page.tsx", "src/app/learn/cookies-and-headers/actions.ts"]}
    >
      <Section title="Reading cookies">
        <Code>{`
const cookieStore = await cookies();
const theme = cookieStore.get("lesson-theme")?.value;
`}</Code>
        <Demo>
          <Suspense fallback={<Skeleton />}>
            <ThemeCookie />
          </Suspense>
          <div className="mt-3 flex flex-wrap gap-2">
            {/* One Server Action, different values: the button's name/value is sent with the form */}
            <form action={setTheme} className="flex gap-2">
              <button name="theme" value="light" className={btn}>Set &quot;light&quot;</button>
              <button name="theme" value="dark" className={btn}>Set &quot;dark&quot;</button>
            </form>
            <form action={clearTheme}>
              <button className={btn}>Delete cookie</button>
            </form>
          </div>
        </Demo>
        <Note>
          You can only <b>set</b> or <b>delete</b> cookies in a Server Action or Route Handler (or in{" "}
          <C>proxy.ts</C>). Rendering a page can only read them.
        </Note>
      </Section>

      <Section title="Reading headers">
        <Code>{`
const h = await headers();
h.get("user-agent");
`}</Code>
        <Demo>
          <Suspense fallback={<Skeleton />}>
            <RequestHeaders />
          </Suspense>
        </Demo>
      </Section>
    </Lesson>
  );
}
