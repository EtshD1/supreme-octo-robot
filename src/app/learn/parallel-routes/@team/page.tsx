import { cacheLife } from "next/cache";
import { getUsers } from "@/lib/data";

// A slot is a full page, so it can fetch its own data.
export default async function TeamSlot() {
  "use cache";
  cacheLife("hours");
  const users = await getUsers();
  return (
    <ul className="space-y-1 text-sm">
      {users.map((u) => (
        <li key={u.id}>👤 {u.name} <span className="text-zinc-500">({u.role})</span></li>
      ))}
    </ul>
  );
}
