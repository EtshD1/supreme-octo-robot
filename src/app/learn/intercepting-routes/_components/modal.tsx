"use client";
import { useRouter } from "next/navigation";

// Closing the modal just goes back in history, so the URL returns to the gallery.
export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <div onClick={() => router.back()} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-zinc-900">
        {children}
        <button onClick={() => router.back()} className="mt-4 rounded-md border px-3 py-1.5 text-sm">
          Close
        </button>
      </div>
    </div>
  );
}
