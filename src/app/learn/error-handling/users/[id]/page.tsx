import Link from "next/link";
import { notFound } from "next/navigation";
import { getUser, users } from "@/lib/data";

export function generateStaticParams() {
  return users.map((u) => ({ id: u.id }));
}

async function getCachedUser(id: string) {
  "use cache";
  return getUser(id);
}

export default async function UserPage({ params }: PageProps<"/learn/error-handling/users/[id]">) {
  const { id } = await params;
  const user = await getCachedUser(id);

  if (!user) notFound(); // → renders ./not-found.tsx

  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-bold">{user.name}</h1>
      <p>{user.role} · {user.email}</p>
      <Link href="/learn/error-handling" className="text-sm text-blue-600 underline">← Back</Link>
    </div>
  );
}
