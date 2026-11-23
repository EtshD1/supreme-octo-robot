/**
 * DYNAMIC ROUTE HANDLER: /api/users/[id]
 * The second argument holds the route params (a Promise, same as in pages).
 */
import { getUser } from "@/lib/data";

export async function GET(_request: Request, ctx: RouteContext<"/api/users/[id]">) {
  const { id } = await ctx.params;
  const user = await getUser(id);

  if (!user) {
    return Response.json({ error: `User ${id} not found` }, { status: 404 });
  }
  return Response.json(user, {
    headers: { "x-lesson": "route-handlers" }, // you control the headers, status and body
  });
}
