import Link from "next/link";

// Only pages inside (shop) get this layout.
export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-4 rounded-xl border-4 border-orange-400 p-6">
      <p className="text-sm font-bold text-orange-600">(shop)/layout.tsx</p>
      <nav className="flex gap-3 text-sm text-blue-600 underline">
        <Link href="/learn/route-groups">← Lesson</Link>
        <Link href="/learn/route-groups/about">About (other group)</Link>
      </nav>
      {children}
    </div>
  );
}
