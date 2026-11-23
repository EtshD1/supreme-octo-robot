// Lives in a private folder (_components), so /learn/route-groups/_components is NOT a route.
export function Badge({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full bg-zinc-200 px-2 py-0.5 text-xs font-medium dark:bg-zinc-800">{children}</span>;
}
