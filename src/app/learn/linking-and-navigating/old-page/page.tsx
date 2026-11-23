import { redirect } from "next/navigation";

// Visiting /learn/linking-and-navigating/old-page sends you somewhere else.
// redirect() throws internally, so nothing after it runs.
export default function OldPage() {
  redirect("/learn/linking-and-navigating?from=old-page");
}
