import Link from "next/link";
import { C, Code, Demo, Lesson, Section } from "../_components/lesson";
import { Badge } from "./_components/badge";

export const metadata = { title: "Route Groups" };

export default function Page() {
  return (
    <Lesson
      title="Route Groups & Private Folders"
      summary={
        <>
          A folder in <b>(parentheses)</b> is a <b>route group</b>. It organizes your files but doesn&apos;t
          show up in the URL. Each group can have its own layout. A folder that starts with an{" "}
          <b>_underscore</b> is <b>private</b>. Next.js never turns it into a route.
        </>
      }
      files={[
        "src/app/learn/route-groups/(marketing)/layout.tsx",
        "src/app/learn/route-groups/(shop)/layout.tsx",
        "src/app/learn/route-groups/_components/badge.tsx",
      ]}
    >
      <Section title="The folder structure">
        <Code>{`
route-groups/
├── (marketing)/          ← group: NOT in the URL
│   ├── layout.tsx        ← green layout for about + pricing
│   ├── about/page.tsx    → /learn/route-groups/about
│   └── pricing/page.tsx  → /learn/route-groups/pricing
├── (shop)/
│   ├── layout.tsx        ← orange layout for cart only
│   └── cart/page.tsx     → /learn/route-groups/cart
└── _components/          ← private: never a route
    └── badge.tsx
`}</Code>
      </Section>
      <Section title="Try it">
        <Demo>
          <div className="flex flex-wrap gap-3 text-blue-600 underline">
            <Link href="/learn/route-groups/about">/about</Link>
            <Link href="/learn/route-groups/pricing">/pricing</Link>
            <Link href="/learn/route-groups/cart">/cart</Link>
          </div>
          <p className="mt-3 text-sm">
            About and pricing share the green marketing layout. Cart gets the orange shop layout. Neither
            group name shows up in the URL.
          </p>
        </Demo>
        <p>
          This badge is imported from the private <C>_components</C> folder: <Badge>I&apos;m private</Badge>
        </p>
      </Section>
      <p className="text-sm text-zinc-500">
        Your own <C>src/app/home/(signed-in)</C> folder is a route group too. That&apos;s why its page shows up at <C>/home</C>.
      </p>
    </Lesson>
  );
}
