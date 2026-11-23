"use client";
/**
 * usePathname() is a client-side hook, so this small piece is a Client Component.
 * The rest of the sidebar stays a Server Component. Keep "use client" at the leaves!
 *
 * 💡 On dynamic routes (like /posts/[slug]) the pathname is only known at request time.
 * With Cache Components, anything that reads it must sit inside <Suspense>.
 * The fallback (a plain link) goes into the pre-rendered shell, and the
 * highlighted version streams in once the URL is known.
 */
import { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const base = "block rounded px-2 py-1";
const idle = `${base} text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900`;
const activeCls = `${base} bg-blue-600 font-medium text-white`;

type Props = { href: string; children: React.ReactNode };

export function NavLink(props: Props) {
  return (
    <Suspense fallback={<Link href={props.href} className={idle}>{props.children}</Link>}>
      <ActiveAwareLink {...props} />
    </Suspense>
  );
}

function ActiveAwareLink({ href, children }: Props) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(href + "/");
  return (
    <Link href={href} className={active ? activeCls : idle}>
      {children}
    </Link>
  );
}
