import { C, Code, Demo, Lesson, Note, Section } from "../_components/lesson";
import { ApiTester } from "./_components/api-tester";

export const metadata = { title: "Route Handlers" };

export default function Page() {
  const link = "font-mono text-sm text-blue-600 underline";
  return (
    <Lesson
      title="Route Handlers (API endpoints)"
      summary={
        <>
          A <C>route.ts</C> file creates an API endpoint instead of a page. Export a function for each HTTP
          method you want to support, like <C>GET</C> or <C>POST</C>. Use these for webhooks, mobile apps,
          third-party callers, or fetching from the browser.
        </>
      }
      files={["src/app/api/users/route.ts", "src/app/api/users/[id]/route.ts", "src/app/learn/route-handlers/_components/api-tester.tsx"]}
    >
      <Section title="The basics">
        <Code>{`
// app/api/users/route.ts
export async function GET(request: NextRequest) {
  const users = await getUsers();
  return Response.json(users);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return Response.json({ created: body }, { status: 201 });
}
`}</Code>
      </Section>

      <Section title="Open these in a new tab (GET)">
        <Demo>
          <ul className="space-y-1">
            <li><a className={link} href="/api/users" target="_blank">/api/users</a></li>
            <li><a className={link} href="/api/users?role=Admiral" target="_blank">/api/users?role=Admiral</a></li>
            <li><a className={link} href="/api/users/2" target="_blank">/api/users/2</a></li>
            <li><a className={link} href="/api/users/99" target="_blank">/api/users/99 (404)</a></li>
          </ul>
        </Demo>
      </Section>

      <Section title="Call them from the browser">
        <Demo>
          <ApiTester />
        </Demo>
        <Note>
          Only need to change data from your own UI? A <b>Server Action</b> is usually simpler. Reach for a
          Route Handler when something <i>outside</i> your React UI needs a URL to call.
        </Note>
      </Section>
    </Lesson>
  );
}
