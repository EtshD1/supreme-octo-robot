"use client";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { postMessage, type FormState } from "../actions";

const initialState: FormState = { ok: false, message: "" };

export function GuestbookForm() {
  // state = whatever postMessage returned last time
  const [state, formAction] = useActionState(postMessage, initialState);

  return (
    // key: when a post succeeds, remount the form so the inputs clear.
    <form action={formAction} key={state.ok ? state.message : "form"} className="space-y-3">
      <div>
        <input
          name="author"
          placeholder="Your name"
          defaultValue={state.fields?.author}
          className="w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm dark:border-zinc-700"
        />
        {state.errors?.author && <p className="mt-1 text-xs text-red-600">{state.errors.author}</p>}
      </div>
      <div>
        <textarea
          name="text"
          placeholder="Say hi..."
          defaultValue={state.fields?.text}
          rows={3}
          className="w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm dark:border-zinc-700"
        />
        {state.errors?.text && <p className="mt-1 text-xs text-red-600">{state.errors.text}</p>}
      </div>
      <SubmitButton />
      {state.message && (
        <p className={`text-sm ${state.ok ? "text-emerald-600" : "text-red-600"}`}>{state.message}</p>
      )}
    </form>
  );
}

// useFormStatus must be called from a component INSIDE the <form>.
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
    >
      {pending ? "Posting..." : "Post message"}
    </button>
  );
}
