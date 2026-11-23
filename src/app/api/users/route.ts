/**
 * ROUTE HANDLER: /api/users
 * A route.ts file exports functions named after HTTP methods: GET, POST, PUT, PATCH, DELETE...
 * It returns a standard Web `Response`. There's no page here, only an API endpoint.
 *
 * ⚠️ A folder can't have both route.ts and page.tsx.
 */
import { NextResponse, type NextRequest } from "next/server";
import { getUsers } from "@/lib/data";

// GET /api/users?role=Engineer
export async function GET(request: NextRequest) {
  const role = request.nextUrl.searchParams.get("role");
  const users = await getUsers();
  const result = role ? users.filter((u) => u.role === role) : users;
  return NextResponse.json(result);
}

// POST /api/users   body: { "name": "Linus" }
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body?.name) {
    return NextResponse.json({ error: "`name` is required" }, { status: 400 });
  }

  // Pretend we saved it to a database:
  const created = { id: crypto.randomUUID(), name: body.name, role: "New hire" };
  return NextResponse.json(created, { status: 201 });
}
