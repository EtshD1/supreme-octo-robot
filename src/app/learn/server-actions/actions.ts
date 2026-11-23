"use server";
/**
 * SERVER ACTIONS
 * "use server" at the top marks every export as a Server Action: a function
 * that runs on the server but can be called from the browser (by a <form> or a button).
 * Next.js creates the API endpoint for you.
 *
 * ⚠️ Treat every Server Action like a public API endpoint: validate the input
 * and check that the user is allowed to do this.
 */
import { updateTag } from "next/cache";
import { addMessage, clearMessages } from "@/lib/data";

export type FormState = {
  ok: boolean;
  message: string;
  errors?: { author?: string; text?: string };
  fields?: { author: string; text: string };
};

// When you use useActionState, the action receives (previousState, formData).
export async function postMessage(_prev: FormState, formData: FormData): Promise<FormState> {
  const author = String(formData.get("author") ?? "").trim();
  const text = String(formData.get("text") ?? "").trim();

  // 1. Validate. (In real apps, a library like Zod helps here.)
  const errors: FormState["errors"] = {};
  if (author.length < 2) errors.author = "Name must be at least 2 characters.";
  if (text.length < 3) errors.text = "Message must be at least 3 characters.";
  if (Object.keys(errors).length) {
    return { ok: false, message: "Please fix the errors below.", errors, fields: { author, text } };
  }

  // 2. Mutate (save to the "database").
  await addMessage(author, text);

  // 3. Clear the cached message list so the new message shows up right away.
  updateTag("guestbook");

  return { ok: true, message: `Thanks, ${author}! Your message was posted.` };
}

// A Server Action can also take no arguments and be used as a plain <form action>.
export async function clearGuestbook() {
  await clearMessages();
  updateTag("guestbook");
}
