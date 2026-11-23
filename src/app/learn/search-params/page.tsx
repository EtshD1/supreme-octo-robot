/**
 * SEARCH PARAMS: /learn/search-params?q=mug&category=kitchen
 *
 * Pages get a `searchParams` prop. Like params, it's a Promise.
 * Search params are only known at request time, so we await them inside <Suspense>.
 */
import { Suspense } from "react";
import Link from "next/link";
import Form from "next/form";
import { getProducts } from "@/lib/data";
import { C, Code, Demo, Lesson, Section, Skeleton } from "../_components/lesson";

export const metadata = { title: "Search Params" };

const categories = ["tech", "kitchen", "home"];

export default function Page({ searchParams }: PageProps<"/learn/search-params">) {
  return (
    <Lesson
      title="Search Params"
      summary={
        <>
          The part of the URL after <C>?</C> is perfect for filters, search and pagination. Users can
          bookmark and share it. Server pages read it from the <C>searchParams</C> prop. Client Components
          use <C>useSearchParams()</C>.
        </>
      }
      files={["src/app/learn/search-params/page.tsx"]}
    >
      <Section title="Reading searchParams">
        <Code>{`
export default function Page({ searchParams }: PageProps<"/learn/search-params">) {
  return (
    <Suspense fallback={<Skeleton />}>
      <Results searchParams={searchParams} />
    </Suspense>
  );
}

async function Results({ searchParams }) {
  const { q, category } = await searchParams;  // values are string | string[] | undefined
  const products = await getProducts({ q, category });
  ...
}
`}</Code>
      </Section>

      <Section title="Demo: a product filter">
        <Demo>
          <Suspense fallback={<Skeleton text="Loading products..." />}>
            <Shop searchParams={searchParams} />
          </Suspense>
        </Demo>
      </Section>

      <Section title="next/form">
        <p>
          <C>&lt;Form action=&quot;/some/path&quot;&gt;</C> from <C>next/form</C> works like a normal GET
          form. It puts the inputs into the URL as search params, then does a client-side navigation instead
          of a full page reload.
        </p>
      </Section>
    </Lesson>
  );
}

async function Shop({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q : undefined;
  const category = typeof params.category === "string" ? params.category : undefined;
  const products = await getProducts({ q, category });

  const pill = (active: boolean) =>
    `rounded-full px-3 py-1 text-xs font-medium ${active ? "bg-blue-600 text-white" : "bg-zinc-200 dark:bg-zinc-800"}`;

  return (
    <div className="space-y-4">
      {/* Search box: submitting changes the URL to ?q=...&category=... */}
      <Form action="/learn/search-params" className="flex gap-2">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search products..."
          className="flex-1 rounded-md border border-zinc-300 bg-transparent px-3 py-1.5 text-sm dark:border-zinc-700"
        />
        {category && <input type="hidden" name="category" value={category} />}
        <button className="rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white">Search</button>
      </Form>

      {/* Category filter: plain <Link>s with a query object */}
      <div className="flex flex-wrap gap-2">
        <Link href={{ pathname: "/learn/search-params", query: q ? { q } : {} }} className={pill(!category)}>All</Link>
        {categories.map((c) => (
          <Link
            key={c}
            href={{ pathname: "/learn/search-params", query: { ...(q && { q }), category: c } }}
            className={pill(category === c)}
          >
            {c}
          </Link>
        ))}
      </div>

      <p className="font-mono text-xs text-zinc-500">searchParams = {JSON.stringify(params)}</p>

      {products.length === 0 ? (
        <p className="text-sm">No products match.</p>
      ) : (
        <ul className="grid gap-2 sm:grid-cols-2">
          {products.map((p) => (
            <li key={p.id} className="flex justify-between rounded-lg bg-zinc-100 p-3 text-sm dark:bg-zinc-900">
              <span>{p.name} <span className="text-xs text-zinc-500">({p.category})</span></span>
              <b>${p.price}</b>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
