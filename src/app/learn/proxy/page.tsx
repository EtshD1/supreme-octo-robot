import { Suspense } from "react";
import Link from "next/link";
import { headers } from "next/headers";
import { C, Code, Demo, Lesson, Note, Section, Skeleton } from "../_components/lesson";
import { logIn } from "./actions";

export const metadata = { title: "Proxy" };

async function Greeting() {
  const h = await headers();
  return <p className="font-mono text-sm">x-proxy-greeting: &quot;{h.get("x-proxy-greeting")}&quot;</p>;
}

async function DeniedBanner({ searchParams }: { searchParams: Promise<{ denied?: string | string[] }> }) {
  const { denied } = await searchParams;
  if (!denied) return null;
  return (
    <p className="rounded-lg bg-red-100 p-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
      🚫 proxy.ts redirected you here because you don&apos;t have the <code>learn-admin</code> cookie.
    </p>
  );
}

export default function Page({ searchParams }: PageProps<"/learn/proxy">) {
  return (
    <Lesson
      title="Proxy (formerly Middleware)"
      summary={
        <>
          <C>proxy.ts</C> sits at the root of your project (or <C>src/</C>). It runs <b>before</b> a request
          reaches any page or route, so it can redirect, rewrite, or add headers and cookies. In Next.js 16
          it was renamed from <C>middleware.ts</C>.
        </>
      }
      files={["src/proxy.ts", "src/app/learn/proxy/page.tsx", "src/app/learn/proxy/actions.ts"]}
    >
      <Suspense>
        <DeniedBanner searchParams={searchParams} />
      </Suspense>

      <Section title="1. Adding headers">
        <p>The proxy added this header to the request. The page reads it with <C>headers()</C>:</p>
        <Demo>
          <Suspense fallback={<Skeleton />}>
            <Greeting />
          </Suspense>
        </Demo>
      </Section>

      <Section title="2. Redirecting (an auth gate)">
        <Code>{`
if (pathname.startsWith("/learn/proxy/admin") && !request.cookies.has("learn-admin")) {
  return NextResponse.redirect(new URL("/learn/proxy?denied=1", request.url));
}
`}</Code>
        <Demo>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/learn/proxy/admin" className="text-blue-600 underline">Go to /admin without logging in</Link>
            <form action={logIn}>
              <button className="rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white">Log in (set cookie) → /admin</button>
            </form>
          </div>
        </Demo>
      </Section>

      <Section title="3. Matching routes">
        <p>
          <C>export const config = &#123; matcher: &quot;/learn/proxy/:path*&quot; &#125;</C> limits the proxy to
          the URLs you list. Leave it out and the proxy runs on every request, including images and other
          static files.
        </p>
        <Note>
          Use the proxy for quick checks, like &quot;does this cookie exist?&quot;. Check real permissions
          again close to the data, in Server Components, Server Actions and Route Handlers.
        </Note>
      </Section>
    </Lesson>
  );
}
