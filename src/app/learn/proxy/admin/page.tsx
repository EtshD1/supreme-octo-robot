import Link from "next/link";
import { logOut } from "../actions";

// You only get here if proxy.ts let you through.
export default function AdminPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">🔐 Admin area</h1>
      <p>You have the <code>learn-admin</code> cookie, so proxy.ts let you through.</p>
      <div className="flex gap-3">
        <form action={logOut}>
          <button className="rounded-md bg-red-600 px-3 py-1.5 text-sm text-white">Log out (delete cookie)</button>
        </form>
        <Link href="/learn/proxy" className="text-sm text-blue-600 underline">← Back</Link>
      </div>
    </div>
  );
}
