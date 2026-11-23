import Link from "next/link";

// Only pages inside (marketing) get this layout.
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-4 rounded-xl border-4 border-emerald-400 p-6">
      <p className="text-sm font-bold text-emerald-600">(marketing)/layout.tsx</p>
      <nav className="flex gap-3 text-sm text-blue-600 underline">
        <Link href="/learn/route-groups">← Lesson</Link>
        <Link href="/learn/route-groups/about">About</Link>
        <Link href="/learn/route-groups/pricing">Pricing</Link>
        <Link href="/learn/route-groups/cart">Cart (other group)</Link>
      </nav>
      {children}
    </div>
  );
}
