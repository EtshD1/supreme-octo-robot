"use server";
/**
 * A SERVER ACTIONS file. Every exported function runs on the server, and you can
 * call it from a <form action={...}> or from a click handler.
 */
import { updateTag } from "next/cache";

export async function refreshClock() {
  // Throw away every cache entry tagged "clock". The next render computes it again.
  updateTag("clock");
}
